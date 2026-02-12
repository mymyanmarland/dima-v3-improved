import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const symbols = ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT","ADAUSDT","DOGEUSDT"];
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(symbols))}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Binance API error: ${response.status} - ${text}`);
    }
    const cryptoData = await response.json();

    // Fetch gold (PAXG as gold proxy)
    let goldData = null;
    try {
      const goldRes = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=PAXGUSDT");
      if (goldRes.ok) goldData = await goldRes.json();
    } catch {}

    const allData = goldData ? [...cryptoData, { ...goldData, symbol: "XAUUSDT" }] : cryptoData;

    return new Response(JSON.stringify(allData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching prices:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
