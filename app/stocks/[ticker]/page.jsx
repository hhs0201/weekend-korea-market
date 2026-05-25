"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Header from "../../../components/Header";
import SettingsPanel from "../../../components/SettingsPanel";
import MiniChart from "../../../components/MiniChart";
import CommunityBoard from "../../../components/CommunityBoard";
import BottomNav from "../../../components/BottomNav";
import { getStockByTicker } from "../../../data/market";

const stockCategories = ["종목 토론", "월요일 예상", "뉴스/공시", "질문"];

function makeDefaultStockPosts(stock) {
  return [
    {
      id: `${stock.ticker}-seed-1`,
      title: `${stock.name}, 월요일 시초가 어떻게 보세요?`,
      content: `${stock.name}의 주말 관심도가 높아지고 있어요. 현재가와 해외 흐름을 같이 보면서 월요일 대응 전략을 나눠보세요.`,
      category: "월요일 예상",
      likes: 24,
      liked: false,
      author: "월요일대기중",
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 15,
      updatedAt: null
    },
    {
      id: `${stock.ticker}-seed-2`,
      title: `${stock.ticker} 관련 뉴스 흐름 정리`,
      content: "주말에 확인한 뉴스와 커뮤니티 분위기를 정리해두는 글입니다. 추가로 볼 만한 자료가 있으면 댓글로 공유해주세요.",
      category: "뉴스/공시",
      likes: 17,
      liked: false,
      author: "시장체크러",
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 42,
      updatedAt: null
    }
  ];
}

export default function StockDetailPage() {
  const params = useParams();
  const ticker = String(params?.ticker || "").toUpperCase();
  const stock = getStockByTicker(ticker);
  const [darkMode, setDarkMode] = useState(false);
  const defaultStockPosts = useMemo(() => stock ? makeDefaultStockPosts(stock) : [], [stock]);

  if (!stock) {
    return (
      <main className={clsx(darkMode && "dark")}>
        <div className="min-h-screen bg-[#f5f7fb] text-slate-950 dark:bg-[#06080d] dark:text-white">
          <SettingsPanel darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="mx-auto max-w-4xl px-4 py-16">
            <Link href="/" className="text-sm font-black text-emerald-700 dark:text-emerald-200">홈으로 돌아가기</Link>
            <h1 className="mt-6 text-3xl font-black">종목을 찾을 수 없습니다</h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400">입력한 티커가 현재 관심종목 목록에 없습니다.</p>
          </div>
        </div>
      </main>
    );
  }

  const up = stock.trend === "up";

  return (
    <main className={clsx(darkMode && "dark")}>
      <div className="min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-950 dark:bg-[#06080d] dark:text-white">
        <div className="noise" />
        <SettingsPanel darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
          <Header />
          <div className="py-8">
            <Link href="/#stocks" className="text-sm font-black text-emerald-700 dark:text-emerald-200">← 관심종목으로 돌아가기</Link>
            <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass rounded-3xl p-6">
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">{stock.region} · {stock.ticker}</p>
                <h1 className="mt-2 text-4xl font-black sm:text-5xl">{stock.name}</h1>
                <p className="mt-4 max-w-2xl leading-7 text-slate-500 dark:text-slate-400">
                  {stock.name} 전용 페이지입니다. 가격 흐름, AI 브리핑, 뉴스 분위기와 해당 종목 커뮤니티를 한곳에서 확인하세요.
                </p>
              </div>
              <div className="glass rounded-3xl p-6">
                <p className="text-sm font-black text-slate-500 dark:text-slate-400">현재가</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <strong className="text-4xl font-black">{stock.price}</strong>
                  <span className={up ? "rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-black text-emerald-700 dark:text-emerald-200" : "rounded-full bg-rose-400/15 px-3 py-1 text-sm font-black text-rose-600 dark:text-rose-200"}>{stock.change}</span>
                </div>
                <div className="mt-6">
                  <MiniChart points={up ? "8,34 32,30 54,22 78,24 100,14 116,16" : "8,18 32,17 54,21 78,20 100,28 116,31"} trend={stock.trend} />
                </div>
              </div>
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-3">
              <InfoCard title="AI 브리핑" text={`${stock.name}은 주말 커뮤니티 언급량이 높은 종목입니다. ${up ? "단기 투자심리는 우호적이지만 과열 구간에서는 분할 접근이 필요해요." : "가격 변동성이 커진 만큼 월요일 장 초반 수급을 확인하는 전략이 좋아 보여요."}`} />
              <InfoCard title="관련 뉴스" text={`${stock.ticker} 관련 뉴스와 해외장 흐름이 투자심리에 영향을 주고 있습니다. 실적, 환율, 업종 수급을 함께 확인하세요.`} />
              <InfoCard title="투자 심리" text={`커뮤니티 관심 점수는 ${stock.score}점, 언급량은 ${stock.mentions}입니다. 주말 대화량 기준으로 상위 관심 종목입니다.`} />
            </section>

            <section className="mt-10">
              <div className="mb-5">
                <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">종목 전용 커뮤니티</p>
                <h2 className="mt-2 text-3xl font-black">{stock.name} 게시판</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">이 게시판의 글과 댓글은 {stock.ticker} 종목에만 저장됩니다.</p>
              </div>
              <CommunityBoard
                boardId={`stock:${stock.ticker}`}
                categories={stockCategories}
                defaultPosts={defaultStockPosts}
                emptyText={`${stock.name} 게시판에 아직 글이 없습니다. 첫 의견을 남겨보세요.`}
              />
            </section>
          </div>
        </div>
        <BottomNav />
      </div>
    </main>
  );
}

function InfoCard({ title, text }) {
  return (
    <article className="glass rounded-2xl p-5">
      <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">{title}</p>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
    </article>
  );
}
