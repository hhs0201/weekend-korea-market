export const marketCards = [
  { name: "나스닥 선물", value: "29,558.80", change: "+0.25%", trend: "up", note: "AI 대형주 온기 지속", points: "8,36 28,28 48,32 68,16 92,22 116,10" },
  { name: "S&P500 선물", value: "7,491.00", change: "+0.24%", trend: "up", note: "기술주 중심 매수세", points: "8,34 30,30 52,26 74,28 96,16 116,18" },
  { name: "다우 선물", value: "50,579.70", change: "+0.58%", trend: "up", note: "산업재와 금융주 견조", points: "8,38 28,34 50,36 72,24 94,20 116,12" },
  { name: "비트코인", value: "$75,488", change: "-0.42%", trend: "down", note: "위험자산 숨 고르기", points: "8,14 30,18 52,15 72,24 94,28 116,34" },
  { name: "이더리움", value: "$3,950", change: "+0.31%", trend: "up", note: "스테이킹 수급 안정", points: "8,32 30,26 52,30 74,20 96,14 116,16" },
  { name: "원/달러 환율", value: "1,520.22원", change: "+1.11%", trend: "down", note: "환율 부담이 다시 확대", points: "8,18 28,20 50,16 74,24 96,30 116,28" },
  { name: "코스피 예상", value: "7,410선", change: "+0.35%", trend: "up", note: "반도체가 지수 방어", points: "8,36 28,28 48,24 68,26 92,18 116,14" },
  { name: "코스닥 예상", value: "1,145선", change: "-0.12%", trend: "down", note: "바이오·2차전지 선별", points: "8,20 28,18 48,24 68,22 92,30 116,34" }
];

export const tickerItems = [
  "삼성전자 294,250 -1.75%",
  "SK하이닉스 1,941,000 +0.05%",
  "테슬라 426.01 +1.95%",
  "엔비디아 215.33 -1.90%",
  "로켓랩 135.76 +8.20%",
  "ASTS 105.86 +10.01%",
  "원/달러 1,520.22 +1.11%",
  "비트코인 75,488 -0.42%"
];

export const aiBriefs = [
  "미국 반도체 강세가 이어지며 삼성전자와 SK하이닉스 투자심리에 우호적인 흐름이 만들어지고 있어요.",
  "원/달러 환율이 1,520원대까지 올라오며 월요일 성장주는 장 초반 변동성이 커질 수 있습니다.",
  "코스피는 반도체 수급이 받쳐주되, 단기 급등 피로감 때문에 강보합 출발 가능성이 높아 보여요.",
  "엔비디아가 실적 발표 이후 흔들렸지만, HBM·전력 인프라 종목에 대한 국내 투자자 관심은 여전히 뜨겁습니다."
];

export const news = [
  { category: "미국증시", title: "나스닥 선물 반등, AI 대형주가 주말 투자심리 되살려", time: "12분 전" },
  { category: "반도체", title: "HBM 공급 부족 우려 지속, 국내 메모리 대표주 관심 집중", time: "28분 전" },
  { category: "환율", title: "달러 강세 재개에 외국인 수급 방향이 월요일 핵심 변수", time: "43분 전" },
  { category: "비트코인", title: "비트코인 약세에도 장기 보유 지표는 아직 안정권", time: "1시간 전" },
  { category: "우주주", title: "로켓랩·AST 스페이스모바일, 국내 커뮤니티 언급량 동반 상승", time: "1시간 전" },
  { category: "금리", title: "미 국채 금리 방향성 둔화, 성장주 밸류에이션 부담은 남아", time: "2시간 전" }
];

export const posts = [
  { board: "월요일 예상", title: "월요일 반도체 갭상 가능성, 여러분은 어떻게 보세요?", likes: 248, comments: 61, time: "2분 전", hot: true },
  { board: "인기 종목 토론", title: "엔비디아는 흔들렸는데 하이닉스 심리는 아직 살아있는 듯", likes: 192, comments: 44, time: "5분 전", hot: true },
  { board: "다음주 전략", title: "다음주 현금 비중 30%면 너무 보수적인가요?", likes: 157, comments: 38, time: "9분 전" },
  { board: "이번주 복기", title: "삼성전자 눌림이면 담아야 할지 같이 봐주세요", likes: 139, comments: 29, time: "14분 전" },
  { board: "자유 게시판", title: "주말인데 장 열린 것처럼 계속 호가창 찾고 있음", likes: 111, comments: 21, time: "18분 전" },
  { board: "실시간 커뮤니티", title: "환율 1,520원대면 성장주 진입은 조금 기다려야 할까요?", likes: 96, comments: 18, time: "23분 전" }
];

export const stocks = [
  { region: "국내", name: "삼성전자", ticker: "005930", price: "294,250원", mentions: "18.4만", score: 96, trend: "down" },
  { region: "국내", name: "SK하이닉스", ticker: "000660", price: "1,941,000원", mentions: "15.7만", score: 94, trend: "up" },
  { region: "해외", name: "엔비디아", ticker: "NVDA", price: "$215.33", mentions: "13.2만", score: 91, trend: "down" },
  { region: "해외", name: "테슬라", ticker: "TSLA", price: "$426.01", mentions: "9.8만", score: 82, trend: "up" },
  { region: "해외", name: "로켓랩", ticker: "RKLB", price: "$135.76", mentions: "5.2만", score: 78, trend: "up" },
  { region: "해외", name: "AST 스페이스모바일", ticker: "ASTS", price: "$105.86", mentions: "4.9만", score: 76, trend: "up" }
];
