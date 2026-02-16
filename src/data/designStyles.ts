export interface DesignStyle {
  id: string;
  label: string;
  desc: string;
}

export interface DesignStyleCategory {
  category: string;
  emoji: string;
  styles: DesignStyle[];
}

export const DESIGN_STYLE_CATEGORIES: DesignStyleCategory[] = [
  {
    category: "Classic & Foundational",
    emoji: "🏛️",
    styles: [
      { id: "modern-minimal", label: "✨ Modern Minimal", desc: "Clean, spacious, whitespace-focused" },
      { id: "flat-design", label: "📐 Flat Design", desc: "No shadows, bold colors, simple shapes" },
      { id: "material-design", label: "🎯 Material Design", desc: "Google's elevation & motion system" },
      { id: "skeuomorphism", label: "🖼️ Skeuomorphism", desc: "Realistic textures & 3D effects" },
      { id: "swiss-design", label: "🇨🇭 Swiss / International", desc: "Grid-based, Helvetica, structured" },
    ],
  },
  {
    category: "Modern Trends",
    emoji: "🔮",
    styles: [
      { id: "glassmorphism", label: "🔮 Glassmorphism", desc: "Frosted glass, blur, transparency" },
      { id: "neomorphism", label: "🌑 Neomorphism", desc: "Soft inner/outer shadows, embossed" },
      { id: "claymorphism", label: "🧸 Claymorphism", desc: "3D clay-like, soft rounded shapes" },
      { id: "aurora-ui", label: "🌌 Aurora UI", desc: "Gradient mesh, ethereal glow effects" },
      { id: "bento-grid", label: "🍱 Bento Grid", desc: "Card-based modular grid layout" },
    ],
  },
  {
    category: "Bold & Artistic",
    emoji: "🎨",
    styles: [
      { id: "brutalist", label: "🏗️ Brutalist", desc: "Raw HTML, bold typography, anti-design" },
      { id: "maximalist", label: "💥 Maximalist", desc: "Dense, layered, visually overwhelming" },
      { id: "art-deco", label: "🏛️ Art Deco", desc: "Gold accents, geometric patterns, luxury" },
      { id: "bauhaus", label: "🔶 Bauhaus", desc: "Primary colors, geometric, functional" },
      { id: "pop-art", label: "🎨 Pop Art", desc: "Bright colors, comic-book style, halftone" },
    ],
  },
  {
    category: "Retro & Nostalgic",
    emoji: "🕹️",
    styles: [
      { id: "retro-pixel", label: "🕹️ Retro / Pixel", desc: "8-bit, nostalgic gaming aesthetic" },
      { id: "vaporwave", label: "🌴 Vaporwave", desc: "80s/90s aesthetic, neon, pink/purple" },
      { id: "synthwave", label: "🎵 Synthwave", desc: "Neon grids, sunset gradients, retro-futuristic" },
      { id: "y2k", label: "💿 Y2K", desc: "2000s web style, chrome, bubble fonts" },
      { id: "win95", label: "🖥️ Windows 95", desc: "Retro OS UI, pixel borders, grey panels" },
      { id: "geocities", label: "🌐 GeoCities / Web 1.0", desc: "Nostalgic old web, animated GIFs" },
    ],
  },
  {
    category: "Dark & Premium",
    emoji: "🌙",
    styles: [
      { id: "dark-premium", label: "🌙 Dark Premium", desc: "Luxurious dark theme, subtle accents" },
      { id: "dark-neon", label: "💜 Dark Neon", desc: "Dark background, vibrant neon accents" },
      { id: "cyberpunk", label: "🤖 Cyberpunk", desc: "Glitch effects, neon, futuristic dystopia" },
      { id: "hacker-terminal", label: "💚 Hacker Terminal", desc: "Green-on-black, monospace, matrix" },
      { id: "midnight-luxe", label: "🌃 Midnight Luxe", desc: "Deep navy, gold accents, premium feel" },
    ],
  },
  {
    category: "Light & Soft",
    emoji: "🌸",
    styles: [
      { id: "pastel-soft", label: "🌸 Pastel Soft", desc: "Light pastel colors, gentle, airy" },
      { id: "cotton-candy", label: "🍭 Cotton Candy", desc: "Pink & blue gradients, dreamy" },
      { id: "neutral-warm", label: "☕ Neutral Warm", desc: "Beige, cream, earthy warm tones" },
      { id: "scandinavian", label: "🏔️ Scandinavian", desc: "White, wood tones, hygge simplicity" },
      { id: "zen-minimal", label: "🧘 Zen Minimal", desc: "Ultra-clean, breathing room, calm" },
    ],
  },
  {
    category: "Colorful & Playful",
    emoji: "🌈",
    styles: [
      { id: "gradient-rich", label: "🌈 Gradient Rich", desc: "Bold color transitions, vibrant" },
      { id: "playful-fun", label: "🎈 Playful / Fun", desc: "Rounded shapes, colorful, bouncy" },
      { id: "memphis", label: "🔺 Memphis Design", desc: "Geometric shapes, squiggles, bold" },
      { id: "candy-ui", label: "🍬 Candy UI", desc: "Sweet colors, glossy buttons, cheerful" },
      { id: "rainbow", label: "🌈 Rainbow", desc: "Multi-color spectrum, pride-inspired" },
    ],
  },
  {
    category: "Nature & Organic",
    emoji: "🌿",
    styles: [
      { id: "organic", label: "🌿 Organic / Natural", desc: "Earth tones, leaf shapes, natural" },
      { id: "botanical", label: "🌺 Botanical", desc: "Plant illustrations, green palette" },
      { id: "ocean", label: "🌊 Ocean", desc: "Blue gradients, wave patterns, aquatic" },
      { id: "forest", label: "🌲 Forest", desc: "Deep greens, wood textures, rustic" },
      { id: "sunset", label: "🌅 Sunset / Golden Hour", desc: "Orange, pink, warm gradient sky" },
    ],
  },
  {
    category: "Professional & Corporate",
    emoji: "💼",
    styles: [
      { id: "corporate-pro", label: "💼 Corporate Pro", desc: "Professional, trustworthy, clean" },
      { id: "fintech", label: "💰 Fintech", desc: "Trust-focused, data-rich, charts" },
      { id: "healthcare", label: "🏥 Healthcare", desc: "Calming blue/green, accessibility-first" },
      { id: "legal", label: "⚖️ Legal / Formal", desc: "Serif fonts, muted tones, authoritative" },
      { id: "startup", label: "🚀 Startup Modern", desc: "Bold hero, gradient CTA, energetic" },
    ],
  },
  {
    category: "Editorial & Content",
    emoji: "📰",
    styles: [
      { id: "editorial", label: "📰 Editorial", desc: "Magazine-like, strong typography" },
      { id: "newspaper", label: "📄 Newspaper", desc: "Column layout, serif, print-inspired" },
      { id: "blog-modern", label: "📝 Blog Modern", desc: "Reading-focused, clean typography" },
      { id: "portfolio-creative", label: "🎭 Portfolio Creative", desc: "Full-screen sections, bold imagery" },
    ],
  },
  {
    category: "Futuristic & Tech",
    emoji: "🚀",
    styles: [
      { id: "sci-fi", label: "🚀 Sci-Fi", desc: "HUD elements, holographic, space-themed" },
      { id: "holographic", label: "✨ Holographic", desc: "Iridescent, rainbow reflections, chrome" },
      { id: "tech-dashboard", label: "📊 Tech Dashboard", desc: "Data-dense, dark, real-time metrics" },
      { id: "ai-futuristic", label: "🤖 AI Futuristic", desc: "Neural network visuals, blue glow" },
      { id: "blockchain", label: "⛓️ Blockchain", desc: "Crypto aesthetic, dark, neon accents" },
    ],
  },
  {
    category: "Cultural & Themed",
    emoji: "🌍",
    styles: [
      { id: "japanese-minimal", label: "🗾 Japanese Minimal", desc: "Wabi-sabi, asymmetry, muted" },
      { id: "arabic-geometric", label: "🕌 Arabic Geometric", desc: "Islamic patterns, ornate, gold" },
      { id: "chinese-modern", label: "🏮 Chinese Modern", desc: "Red & gold, modern eastern fusion" },
      { id: "african-vibrant", label: "🌍 African Vibrant", desc: "Bold patterns, warm colors, Kente" },
      { id: "indian-festive", label: "🪔 Indian Festive", desc: "Rangoli patterns, rich colors, ornate" },
    ],
  },
  {
    category: "Special & Unique",
    emoji: "💎",
    styles: [
      { id: "comic-book", label: "💬 Comic Book", desc: "Speech bubbles, halftone, panels" },
      { id: "hand-drawn", label: "✏️ Hand Drawn", desc: "Sketch-like, doodle borders, informal" },
      { id: "paper-craft", label: "📎 Paper / Craft", desc: "Paper textures, cutout shapes, tactile" },
      { id: "3d-immersive", label: "🎮 3D Immersive", desc: "WebGL, parallax, depth layers" },
      { id: "monochrome", label: "⬛ Monochrome", desc: "Single color + shades, high contrast" },
      { id: "duotone", label: "🟣 Duotone", desc: "Two-tone color overlay, bold photos" },
      { id: "split-screen", label: "↔️ Split Screen", desc: "Two-panel layout, contrast sides" },
      { id: "asymmetric", label: "🔀 Asymmetric", desc: "Off-grid layout, creative positioning" },
    ],
  },
];

// Flat list for AI suggest and prompt generation
export const DESIGN_STYLES = DESIGN_STYLE_CATEGORIES.flatMap((c) => c.styles);
