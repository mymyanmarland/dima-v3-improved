import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseUser.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminUserId = claimsData.claims.sub;

    // Check if caller is admin
    const { data: adminRole } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", adminUserId)
      .eq("role", "admin")
      .maybeSingle();

    if (!adminRole) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, userId, ...params } = await req.json();

    let result: Record<string, unknown> = {};

    switch (action) {
      case "ban_user": {
        const { reason, bannedUntil } = params;
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            is_banned: true,
            ban_reason: reason || "Admin action",
            banned_until: bannedUntil || null,
          })
          .eq("user_id", userId);
        if (error) throw error;
        result = { success: true, message: "User banned" };
        break;
      }

      case "unban_user": {
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            is_banned: false,
            ban_reason: null,
            banned_until: null,
          })
          .eq("user_id", userId);
        if (error) throw error;
        result = { success: true, message: "User unbanned" };
        break;
      }

      case "set_access_expiry": {
        const { expiresAt } = params;
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ access_expires_at: expiresAt || null })
          .eq("user_id", userId);
        if (error) throw error;
        result = { success: true, message: "Access expiry set" };
        break;
      }

      case "reset_password": {
        // Get user email via admin API
        const { data: userData, error: userErr } = await supabaseAdmin.auth.admin.getUserById(userId);
        if (userErr || !userData?.user?.email) throw new Error("User not found");

        const { error: resetErr } = await supabaseAdmin.auth.admin.generateLink({
          type: "recovery",
          email: userData.user.email,
          options: { redirectTo: `${req.headers.get("origin") || "https://dima-v2.lovable.app"}/reset-password` },
        });
        if (resetErr) throw resetErr;
        result = { success: true, message: `Password reset link sent to ${userData.user.email}` };
        break;
      }

      case "get_users_detail": {
        // Fetch all users with their emails from auth
        const { data: authUsers, error: authErr } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        if (authErr) throw authErr;
        
        const userMap: Record<string, { email: string; last_sign_in: string | null }> = {};
        (authUsers?.users || []).forEach((u) => {
          userMap[u.id] = { email: u.email || "", last_sign_in: u.last_sign_in_at || null };
        });
        result = { users: userMap };
        break;
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Admin action error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
