import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "위켄드 코리아 마켓",
  description: "주말에도 한국 투자자가 시장과 연결되어 있는 프리미엄 투자 플랫폼"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
