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
  { board: "실시간 수다", title: "월요일 반도체 갭상 가능성, 여러분은 어떻게 보세요?", likes: 248, comments: 61, time: "2분 전", hot: true },
  { board: "자유게시판", title: "엔비디아는 흔들렸는데 하이닉스 심리는 아직 살아있는 듯", likes: 192, comments: 44, time: "5분 전", hot: true },
  { board: "환율/매크로", title: "다음주 현금 비중 30%면 너무 보수적인가요?", likes: 157, comments: 38, time: "9분 전" },
  { board: "자유게시판", title: "삼성전자 눌림이면 담아야 할지 같이 봐주세요", likes: 139, comments: 29, time: "14분 전" },
  { board: "실시간 수다", title: "주말인데 장 열린 것처럼 계속 호가창 찾고 있음", likes: 111, comments: 21, time: "18분 전" },
  { board: "환율/매크로", title: "환율 1,520원대면 성장주 진입은 조금 기다려야 할까요?", likes: 96, comments: 18, time: "23분 전" }
];

export const stocks = [
  { region: "국내", name: "삼성전자", ticker: "005930", finnhubSymbol: "005930.KS", price: "294,250원", change: "-1.75%", mentions: "18.4만", score: 96, trend: "down" },
  { region: "국내", name: "SK하이닉스", ticker: "000660", finnhubSymbol: "000660.KS", price: "1,941,000원", change: "+0.05%", mentions: "15.7만", score: 94, trend: "up" },
  { region: "국내", name: "NAVER", ticker: "035420", finnhubSymbol: "035420.KS", price: "247,000원", change: "+1.12%", mentions: "9.2만", score: 88, trend: "up" },
  { region: "국내", name: "카카오", ticker: "035720", finnhubSymbol: "035720.KS", price: "61,800원", change: "-0.48%", mentions: "7.4만", score: 79, trend: "down" },
  { region: "국내", name: "현대차", ticker: "005380", finnhubSymbol: "005380.KS", price: "306,500원", change: "+0.86%", mentions: "8.1만", score: 84, trend: "up" },
  { region: "국내", name: "기아", ticker: "000270", finnhubSymbol: "000270.KS", price: "132,400원", change: "+0.42%", mentions: "6.9만", score: 81, trend: "up" },
  { region: "국내", name: "LG에너지솔루션", ticker: "373220", finnhubSymbol: "373220.KS", price: "421,500원", change: "-0.95%", mentions: "7.8만", score: 80, trend: "down" },
  { region: "국내", name: "삼성바이오로직스", ticker: "207940", finnhubSymbol: "207940.KS", price: "1,120,000원", change: "+0.71%", mentions: "5.8만", score: 77, trend: "up" },
  { region: "국내", name: "셀트리온", ticker: "068270", finnhubSymbol: "068270.KS", price: "228,000원", change: "+1.34%", mentions: "6.4만", score: 82, trend: "up" },
  { region: "국내", name: "POSCO홀딩스", ticker: "005490", finnhubSymbol: "005490.KS", price: "462,000원", change: "-0.22%", mentions: "4.8만", score: 73, trend: "down" },
  { region: "국내", name: "한화에어로스페이스", ticker: "012450", finnhubSymbol: "012450.KS", price: "765,000원", change: "+2.18%", mentions: "8.7만", score: 89, trend: "up" },
  { region: "국내", name: "두산에너빌리티", ticker: "034020", finnhubSymbol: "034020.KS", price: "74,600원", change: "+1.05%", mentions: "7.1만", score: 83, trend: "up" },
  { region: "국내", name: "LIG넥스원", ticker: "079550", finnhubSymbol: "079550.KS", price: "398,500원", change: "+1.92%", mentions: "5.9만", score: 86, trend: "up" },
  { region: "국내", name: "HD현대일렉트릭", ticker: "267260", finnhubSymbol: "267260.KS", price: "623,000원", change: "+2.64%", mentions: "6.8만", score: 90, trend: "up" },
  { region: "국내", name: "에코프로비엠", ticker: "247540", finnhubSymbol: "247540.KQ", price: "182,700원", change: "-1.36%", mentions: "6.1만", score: 74, trend: "down" },
  { region: "국내", name: "알테오젠", ticker: "196170", finnhubSymbol: "196170.KQ", price: "412,000원", change: "+3.12%", mentions: "8.4만", score: 91, trend: "up" },
  { region: "국내", name: "삼성SDI", ticker: "006400", finnhubSymbol: "006400.KS", price: "338,000원", change: "-0.74%", mentions: "4.2만", score: 70, trend: "down" },
  { region: "국내", name: "LG화학", ticker: "051910", finnhubSymbol: "051910.KS", price: "354,500원", change: "-0.31%", mentions: "3.9만", score: 68, trend: "down" },
  { region: "국내", name: "삼성물산", ticker: "028260", finnhubSymbol: "028260.KS", price: "188,600원", change: "+0.29%", mentions: "3.2만", score: 66, trend: "up" },
  { region: "국내", name: "KB금융", ticker: "105560", finnhubSymbol: "105560.KS", price: "123,800원", change: "+0.67%", mentions: "3.6만", score: 72, trend: "up" },
  { region: "국내", name: "신한지주", ticker: "055550", finnhubSymbol: "055550.KS", price: "71,200원", change: "+0.36%", mentions: "2.8만", score: 65, trend: "up" },
  { region: "국내", name: "현대모비스", ticker: "012330", finnhubSymbol: "012330.KS", price: "312,000원", change: "+0.58%", mentions: "2.9만", score: 69, trend: "up" },
  { region: "국내", name: "삼성전기", ticker: "009150", finnhubSymbol: "009150.KS", price: "226,500원", change: "+1.08%", mentions: "4.0만", score: 76, trend: "up" },
  { region: "국내", name: "SK스퀘어", ticker: "402340", finnhubSymbol: "402340.KS", price: "216,000원", change: "+2.04%", mentions: "4.4만", score: 78, trend: "up" },
  { region: "국내", name: "하이브", ticker: "352820", finnhubSymbol: "352820.KS", price: "238,500원", change: "-0.62%", mentions: "3.4만", score: 67, trend: "down" },
  { region: "국내", name: "JYP Ent.", ticker: "035900", finnhubSymbol: "035900.KQ", price: "89,400원", change: "+0.43%", mentions: "2.5만", score: 63, trend: "up" },
  { region: "국내", name: "레인보우로보틱스", ticker: "277810", finnhubSymbol: "277810.KQ", price: "318,000원", change: "+1.74%", mentions: "5.0만", score: 82, trend: "up" },
  { region: "국내", name: "로보티즈", ticker: "108490", finnhubSymbol: "108490.KQ", price: "94,200원", change: "+2.26%", mentions: "3.7만", score: 75, trend: "up" },
  { region: "국내", name: "HLB", ticker: "028300", finnhubSymbol: "028300.KQ", price: "126,800원", change: "-1.18%", mentions: "4.6만", score: 71, trend: "down" },
  { region: "국내", name: "펩트론", ticker: "087010", finnhubSymbol: "087010.KQ", price: "172,400원", change: "+2.87%", mentions: "4.3만", score: 80, trend: "up" },
  { region: "해외", name: "테슬라", ticker: "TSLA", finnhubSymbol: "TSLA", price: "$426.01", change: "+1.95%", mentions: "9.8만", score: 82, trend: "up" },
  { region: "해외", name: "엔비디아", ticker: "NVDA", finnhubSymbol: "NVDA", price: "$215.33", change: "-1.90%", mentions: "13.2만", score: 91, trend: "down" },
  { region: "해외", name: "애플", ticker: "AAPL", finnhubSymbol: "AAPL", price: "$271.49", change: "+0.44%", mentions: "8.5만", score: 84, trend: "up" },
  { region: "해외", name: "마이크로소프트", ticker: "MSFT", finnhubSymbol: "MSFT", price: "$510.08", change: "+0.38%", mentions: "7.9만", score: 83, trend: "up" },
  { region: "해외", name: "아마존", ticker: "AMZN", finnhubSymbol: "AMZN", price: "$226.12", change: "+0.72%", mentions: "6.8만", score: 80, trend: "up" },
  { region: "해외", name: "알파벳", ticker: "GOOGL", finnhubSymbol: "GOOGL", price: "$180.44", change: "-0.16%", mentions: "5.9만", score: 77, trend: "down" },
  { region: "해외", name: "메타", ticker: "META", finnhubSymbol: "META", price: "$642.31", change: "+0.91%", mentions: "6.6만", score: 81, trend: "up" },
  { region: "해외", name: "AMD", ticker: "AMD", finnhubSymbol: "AMD", price: "$164.82", change: "+1.33%", mentions: "7.1만", score: 85, trend: "up" },
  { region: "해외", name: "팔란티어", ticker: "PLTR", finnhubSymbol: "PLTR", price: "$168.40", change: "+2.84%", mentions: "8.9만", score: 89, trend: "up" },
  { region: "해외", name: "브로드컴", ticker: "AVGO", finnhubSymbol: "AVGO", price: "$282.73", change: "+0.65%", mentions: "5.5만", score: 78, trend: "up" },
  { region: "해외", name: "슈퍼마이크로컴퓨터", ticker: "SMCI", finnhubSymbol: "SMCI", price: "$49.80", change: "-1.42%", mentions: "4.7만", score: 70, trend: "down" },
  { region: "해외", name: "로켓랩", ticker: "RKLB", finnhubSymbol: "RKLB", price: "$135.76", change: "+8.20%", mentions: "5.2만", score: 78, trend: "up" },
  { region: "해외", name: "AST 스페이스모바일", ticker: "ASTS", finnhubSymbol: "ASTS", price: "$105.86", change: "+10.01%", mentions: "4.9만", score: 76, trend: "up" },
  { region: "해외", name: "리게티 컴퓨팅", ticker: "RGTI", finnhubSymbol: "RGTI", price: "$35.42", change: "+4.72%", mentions: "4.1만", score: 75, trend: "up" },
  { region: "해외", name: "아이온큐", ticker: "IONQ", finnhubSymbol: "IONQ", price: "$61.18", change: "+3.36%", mentions: "5.8만", score: 84, trend: "up" },
  { region: "해외", name: "사운드하운드 AI", ticker: "SOUN", finnhubSymbol: "SOUN", price: "$18.42", change: "+2.21%", mentions: "3.8만", score: 72, trend: "up" },
  { region: "해외", name: "로빈후드", ticker: "HOOD", finnhubSymbol: "HOOD", price: "$112.75", change: "+1.64%", mentions: "4.5만", score: 79, trend: "up" },
  { region: "해외", name: "코인베이스", ticker: "COIN", finnhubSymbol: "COIN", price: "$361.20", change: "-0.92%", mentions: "5.1만", score: 76, trend: "down" },
  { region: "해외", name: "넷플릭스", ticker: "NFLX", finnhubSymbol: "NFLX", price: "$1,138.22", change: "+0.51%", mentions: "3.5만", score: 73, trend: "up" },
  { region: "해외", name: "월마트", ticker: "WMT", finnhubSymbol: "WMT", price: "$103.44", change: "+0.27%", mentions: "2.6만", score: 64, trend: "up" },
  { region: "해외", name: "JP모건", ticker: "JPM", finnhubSymbol: "JPM", price: "$302.19", change: "+0.33%", mentions: "2.7만", score: 66, trend: "up" },
  { region: "해외", name: "비자", ticker: "V", finnhubSymbol: "V", price: "$361.10", change: "-0.24%", mentions: "2.2만", score: 62, trend: "down" },
  { region: "해외", name: "일라이릴리", ticker: "LLY", finnhubSymbol: "LLY", price: "$1,012.45", change: "+1.08%", mentions: "3.9만", score: 76, trend: "up" },
  { region: "해외", name: "노보노디스크", ticker: "NVO", finnhubSymbol: "NVO", price: "$89.64", change: "+0.74%", mentions: "3.1만", score: 69, trend: "up" },
  { region: "해외", name: "마이크론", ticker: "MU", finnhubSymbol: "MU", price: "$168.32", change: "+1.45%", mentions: "5.7만", score: 82, trend: "up" },
  { region: "해외", name: "퀄컴", ticker: "QCOM", finnhubSymbol: "QCOM", price: "$182.54", change: "+0.88%", mentions: "4.2만", score: 74, trend: "up" },
  { region: "해외", name: "인텔", ticker: "INTC", finnhubSymbol: "INTC", price: "$38.20", change: "-0.61%", mentions: "3.6만", score: 65, trend: "down" },
  { region: "해외", name: "마라톤 디지털", ticker: "MARA", finnhubSymbol: "MARA", price: "$24.16", change: "-1.27%", mentions: "2.9만", score: 63, trend: "down" },
  { region: "해외", name: "스트래티지", ticker: "MSTR", finnhubSymbol: "MSTR", price: "$1,872.40", change: "+2.06%", mentions: "4.8만", score: 79, trend: "up" },
  { region: "해외", name: "유아이패스", ticker: "PATH", finnhubSymbol: "PATH", price: "$16.80", change: "+0.98%", mentions: "2.3만", score: 61, trend: "up" },
  { region: "해외", name: "크라우드스트라이크", ticker: "CRWD", finnhubSymbol: "CRWD", price: "$512.55", change: "+1.18%", mentions: "3.4만", score: 72, trend: "up" }
];

export function getStockByTicker(ticker) {
  return stocks.find((stock) => stock.ticker.toUpperCase() === ticker.toUpperCase());
}
