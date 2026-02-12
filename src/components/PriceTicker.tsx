import { useEffect, useState } from "react";

interface PriceData {
  symbol: string;
  label: string;
  price: string;
  change: number;
}

const BINANCE_SYMBOLS = [
  { symbol: "BTCUSDT", label: "Bitcoin", display: "BTC" },
  { symbol: "ETHUSDT", label: "Ethereum", display: "ETH" },
  { symbol: "BNBUSDT", label: "BNB", display: "BNB" },
  { symbol: "SOLUSDT", label: "Solana", display: "SOL" },
  { symbol: "XRPUSDT", label: "XRP", display: "XRP" },
  { symbol: "ADAUSDT", label: "Cardano", display: "ADA" },
  { symbol: "DOGEUSDT", label: "Dogecoin", display: "DOGE" },
  { symbol: "XAUUSDT", label: "ရွှေ (XAU)", display: "🥇" },
];

const PriceTicker = () => {
  const [prices, setPrices] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr?symbols=" +
            encodeURIComponent(JSON.stringify(BINANCE_SYMBOLS.map((s) => s.symbol)))
        );
        if (!response.ok) throw new Error("Binance API failed");
        const data = await response.json();

        const updated: PriceData[] = BINANCE_SYMBOLS.map((sym) => {
          const ticker = data.find((d: any) => d.symbol === sym.symbol);
          if (!ticker) return { symbol: sym.display, label: sym.label, price: "N/A", change: 0 };

          const price = parseFloat(ticker.lastPrice);
          const change = parseFloat(ticker.priceChangePercent);

          let formatted: string;
          if (price >= 1000) formatted = `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          else if (price >= 1) formatted = `$${price.toFixed(2)}`;
          else formatted = `$${price.toFixed(4)}`;

          return { symbol: sym.display, label: sym.label, price: formatted, change };
        });

        setPrices(updated);
      } catch (err) {
        console.warn("Binance price fetch failed:", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  if (prices.length === 0) return null;

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
