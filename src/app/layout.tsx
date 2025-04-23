import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';


import { AuthProvider } from "../contexts/auth-context";
import ChannelService from "@/components/channel-talk";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beaver's House | 안전한 전세, 비버가 찾아드립니다",
  description: "누구나 실수하기 마련이지만 , 집은 그럴 수 없으니까. 안전한 전세 비버가 찾아드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js'
          integrity={"!!!integridy!!!"}
          crossOrigin='anonymous'
        ></Script>
        <Analytics />
        <SpeedInsights />
        <AuthProvider>
          {children}
          <ChannelService/>

        </AuthProvider>
      </body>
    </html>
  );
}
