# Weekend Korea Market

주말에도 시장과 연결되어 있고 싶은 한국 투자자를 위한 프리미엄 투자 커뮤니티 웹사이트입니다.

## 주요 기능

- 밝은 화면 기본값과 설정 패널 안의 다크 모드 전환
- 주말 시장 대시보드
- AI 마켓 브리핑
- 위켄드 뉴스 피드
- 실시간 커뮤니티 중심 화면
- 국내/해외 분리 인기 종목
- 관심종목 담기
- 모바일 하단 탭 내비게이션

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 배포 방법

1. GitHub에 이 프로젝트를 업로드합니다.
2. Vercel에서 `New Project`를 누릅니다.
3. GitHub 저장소를 선택합니다.
4. Framework Preset은 `Next.js`로 둡니다.
5. Build Command는 `npm run build`, Output Directory는 기본값으로 둡니다.
6. `Deploy`를 누릅니다.

## 참고

현재 시장 가격은 UI 시연용 정적 데이터입니다. 실제 서비스에서는 증권/환율/뉴스 API를 연결해 주기적으로 갱신하도록 확장하면 됩니다.
