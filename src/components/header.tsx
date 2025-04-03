"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${hasScrolled ? "border-b border-gray-200" : ""} fixed w-full z-50 bg-white`}>
      <div className="container mx-auto max-w-[1280px] px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="mr-8 cursor-pointer">
            <p className="text-2xl font-bold">
              <span className="text-orange-500">Beaver</span>'s House
            </p>
          </Link>
          
        </div>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10 px-10 font-medium">
            <Link href="/house" className="">
              <p className="font-sm">집 보러가기</p>
            </Link>
            <Link href="/" className="">
              <p>서비스 소개</p>
            </Link>
            <Link href="/" className="">
              <p>문의하기</p>
            </Link>
          </nav>
          <button className=" hover:bg-black text-black/90 hover:text-white font-medium border mr-3 rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
            로그인
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
            앱 다운로드
          </button>
        </div>
      </div>
    </header>
  )
}