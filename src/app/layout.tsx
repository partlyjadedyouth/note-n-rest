/**
 * 루트 레이아웃 컴포넌트
 *
 * 모든 페이지에 적용되는 기본 레이아웃을 정의
 * - 글꼴 설정
 * - 메타데이터 설정
 * - 전역 스타일 적용
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 페이지 컨텐츠
 */

import { Inter } from "next/font/google";
import "./globals.css";

// Inter 글꼴 설정 (라틴 문자셋)
const inter = Inter({ subsets: ["latin"] });

// 전역 메타데이터 설정
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang 속성 설정 및 hydration 경고 억제
    <html lang="en" className="light" suppressHydrationWarning>
      {/* Inter 글꼴과 배경색, 텍스트 색상 적용 */}
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
