import { tickerItems } from "../data/market";

export default function Ticker() {
  return (
    <div className="glass mb-14 overflow-hidden rounded-xl py-3">
      <div className="flex w-max animate-ticker gap-8 whitespace-nowrap px-4">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm font-black text-slate-800 dark:text-slate-200">{item}</span>
        ))}
      </div>
    </div>
  );
}
