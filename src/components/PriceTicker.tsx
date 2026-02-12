import { useEffect, useState } from "react";

interface PriceData {
  symbol: string;
  label: string;
  price: string;
  change: number;
}

const FALLBACK_DATA: PriceData[] = [
  { symbol: "BTC", label: "Bitcoin", price: "$104,250", change: 1.2 },
  { symbol: "ETH", label: "Ethereum", price: "$2,480", change: -0.8 },
  { symbol: "BNB", label: "BNB", price: "$650", change: 0.5 },
  { symbol: "SOL", label: "Solana", price: "$172", change: 2.1 },
  { symbol: "XRP", label: "XRP", price: "$2.45", change: -1.3 },
  { symbol: "ADA", label: "Cardano", price: "$0.78", change: 0.9 },
  { symbol: "DOGE", label: "Dogecoin", price: "$0.26", change: 3.2 },
  { symbol: "🥇", label: "ရွှေ (XAU)", price: "$2,910", change: 0.4 },
  { symbol: "🥈", label: "ငွေ (XAG)", price: "$32.50", change: -0.2 },
];

const PriceTicker = () => {
  const [prices, setPrices] = useState<PriceData[]>(FALLBACK_DATA);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch crypto prices
        const cryptoRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,dogecoin&vs_currencies=usd&include_24hr_change=true"
        );
        if (!cryptoRes.ok) throw new Error("Crypto API failed");
        const cryptoData = await cryptoRes.json();

        const updated: PriceData[] = [
          { symbol: "BTC", label: "Bitcoin", price: `$${cryptoData.bitcoin?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.bitcoin?.usd_24h_change ?? 0 },
          { symbol: "ETH", label: "Ethereum", price: `$${cryptoData.ethereum?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.ethereum?.usd_24h_change ?? 0 },
          { symbol: "BNB", label: "BNB", price: `$${cryptoData.binancecoin?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.binancecoin?.usd_24h_change ?? 0 },
          { symbol: "SOL", label: "Solana", price: `$${cryptoData.solana?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.solana?.usd_24h_change ?? 0 },
          { symbol: "XRP", label: "XRP", price: `$${cryptoData.ripple?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.ripple?.usd_24h_change ?? 0 },
          { symbol: "ADA", label: "Cardano", price: `$${cryptoData.cardano?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.cardano?.usd_24h_change ?? 0 },
          { symbol: "DOGE", label: "Dogecoin", price: `$${cryptoData.dogecoin?.usd?.toLocaleString() ?? "N/A"}`, change: cryptoData.dogecoin?.usd_24h_change ?? 0 },
          { symbol: "🥇", label: "ရွှေ (XAU)", price: "$2,910", change: 0.4 },
          { symbol: "🥈", label: "ငွေ (XAG)", price: "$32.50", change: -0.2 },
        ];

        // Try gold price
        try {
          const goldRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether-gold,silver-token&vs_currencies=usd&include_24hr_change=true");
          if (goldRes.ok) {
            const goldData = await goldRes.json();
            if (goldData["tether-gold"]?.usd) {
              updated[7] = { symbol: "🥇", label: "ရွှေ (XAU)", price: `$${goldData["tether-gold"].usd.toLocaleString()}`, change: goldData["tether-gold"].usd_24h_change ?? 0 };
            }
          }
        } catch {}

        setPrices(updated);
      } catch (err) {
        console.warn("Price fetch failed, using fallback data");
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate for seamless loop
  const tickerItems = [...prices, ...prices];

  return (
    <div className="w-full overflow-hidden bg-secondary/40 border-b border-border/50 backdrop-blur-sm">
      <div className="ticker-track flex items-center gap-8 py-1.5 whitespace-nowrap">
        {tickerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs shrink-0">
            <span className="font-semibold text-foreground">{item.symbol}</span>
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-mono font-medium text-foreground">{item.price}</span>
            <span className={`font-mono text-[10px] ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {item.change >= 0 ? "▲" : "▼"} {Math.abs(item.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
