import { ArrowUpRight, Radio, Users } from "lucide-react";
import { motion } from "framer-motion";
import { marketCards } from "../data/market";
import MiniChart from "./MiniChart";

export default function Hero() {
  return (
    <section className="grid min-h-[680px] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/15 px-4 py-2 text-sm font-black text-emerald-800 dark:text-emerald-100">
          <Radio className="h-4 w-4 animate-pulse" />
          주말에도 켜져 있는 한국 투자자들의 시장
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-slate-950 dark:text-white sm:text-6xl">위켄드 코리아 마켓</h1>
        <p className="mt-6 max-w-2xl text-xl font-black text-slate-800 dark:text-slate-100 sm:text-2xl">주말에도 시장은 멈추지 않는다</p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400 sm:text-lg">
          월요일 개장을 기다리는 한국 투자자들이 선물, 환율, AI 브리핑, 종목 커뮤니티를 한곳에서 확인하는 주말 투자 라운지입니다.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#market" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 dark:bg-white dark:text-slate-950">
            지금 시장 분위기 보기
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#community" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white">
            주말 커뮤니티 입장하기
            <Users className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="glass relative rounded-2xl p-5">
        <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">실시간 주말 시그널</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">월요일 개장 전 분위기</h2>
        <div className="mt-5 grid gap-3">
          {marketCards.slice(0, 3).map((item) => (
            <div key={item.name} className="grid items-center gap-3 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:grid-cols-[1fr_120px_auto]">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.name}</p>
                <strong className="mt-1 block text-lg text-slate-950 dark:text-white">{item.value}</strong>
              </div>
              <MiniChart points={item.points} trend={item.trend} />
              <span className={item.trend === "up" ? "font-black text-emerald-700 dark:text-emerald-200" : "font-black text-rose-600 dark:text-rose-200"}>{item.change}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
