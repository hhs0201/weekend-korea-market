"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import SettingsPanel from "../components/SettingsPanel";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Lounge from "../components/Lounge";
import MarketDashboard from "../components/MarketDashboard";
import BriefingNews from "../components/BriefingNews";
import Community from "../components/Community";
import Sentiment from "../components/Sentiment";
import TrendingStocks from "../components/TrendingStocks";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import { useAuth, useTheme } from "./providers";
import { loadWatchlist, saveWatchlist } from "../lib/watchlistStore";

export default function Home() {
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistReady, setWatchlistReady] = useState(false);
  const { user } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const userId = user?.id || "guest";

  useEffect(() => {
    setWatchlistReady(false);
    setWatchlist(loadWatchlist(userId));
    setWatchlistReady(true);
  }, [userId]);

  useEffect(() => {
    if (watchlistReady) saveWatchlist(userId, watchlist);
  }, [userId, watchlist, watchlistReady]);

  const toggleWatch = (ticker) => {
    setWatchlist((current) => current.includes(ticker) ? current.filter((item) => item !== ticker) : [...current, ticker]);
    requestAnimationFrame(() => document.getElementById("stocks")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  return (
    <main className={clsx(darkMode && "dark")}>
      <div className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-950 dark:bg-[#06080d] dark:text-white">
        <div className="noise" />
        <SettingsPanel darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
          <Header />
          <Hero />
          <Ticker />
          <Lounge />
          <MarketDashboard />
          <BriefingNews />
          <Community />
          <Sentiment />
          <TrendingStocks watchlist={watchlist} onToggleWatch={toggleWatch} />
          <Footer />
        </div>
        <BottomNav />
      </div>
    </main>
  );
}
