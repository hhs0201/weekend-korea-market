export default function Lounge() {
  const rooms = [
    ["토론 1위", "3,482명", "반도체 대기실", "삼성전자, SK하이닉스, 엔비디아 흐름을 같이 보는 방"],
    ["급상승", "1,906명", "우주주 라운지", "로켓랩과 ASTS를 주말 내내 추적하는 투자자 모임"],
    ["전략 공유", "2,214명", "월요일 시초가 회의", "갭상, 갭하, 보합 시나리오를 가볍게 점검해요"],
    ["차분한 방", "894명", "현금 비중 상담소", "불안한 주말에 포지션을 다시 정리하는 공간"]
  ];

  return (
    <section className="grid gap-5 py-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="glass flex min-h-[260px] flex-col justify-between rounded-2xl p-6">
        <div>
          <p className="text-sm font-black text-emerald-700 dark:text-emerald-200"><span className="live-dot" /> 지금 위켄드 라운지</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 dark:text-white">장 닫힌 토요일 밤에도 투자자들은 여기서 월요일을 준비해요</h2>
          <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">흩어진 선물, 환율, 뉴스, 종목 수다를 하나의 흐름으로 묶었습니다. 숫자는 차갑게, 대화는 따뜻하게 이어지는 한국 투자자들의 주말 거점입니다.</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["실시간 접속|24,812명", "오늘 새 글|8,436개", "월요일 투표|상승 54%"].map((item) => {
            const [label, value] = item.split("|");
            return <div key={label} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p><strong className="mt-2 block text-xl text-slate-950 dark:text-white">{value}</strong></div>;
          })}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">지금 바로 올라오는 이야기</p>
        <div className="mt-3 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-black dark:bg-white/10">나</div>
            <span className="flex-1 text-sm text-slate-500 dark:text-slate-400">월요일에 가장 궁금한 종목이나 전략을 남겨보세요</span>
            <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950">글쓰기</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold text-slate-500 dark:text-slate-300">
            {["#반도체", "#환율체크", "#월요일시초가", "#미장복기", "#현금비중"].map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/5">{tag}</span>)}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {rooms.map(([rank, count, title, desc]) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex justify-between text-sm font-black text-emerald-700 dark:text-emerald-200"><span>{rank}</span><span>{count}</span></div>
              <h3 className="mt-3 font-black text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
