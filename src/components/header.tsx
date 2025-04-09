"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

import { Modal } from "@/components/ui/modal";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const handleDownloadClick = () => {
    setIsOpen(true)

    // Track the click event
    trackDownloadClick()

    // Simulate preparation process
    setTimeout(() => {
      // After preparation is complete, you could:
      // 1. Close the modal
      // 2. Redirect to download page
      // 3. Start the download
      setIsOpen(false)
    }, 3000)
  }

  const trackDownloadClick = () => {
    // This function would implement your tracking logic
    // For example:
    const userId = localStorage.getItem("userId") || "anonymous"
    const timestamp = new Date().toISOString()

    console.log(`Download clicked by ${userId} at ${timestamp}`)

    // In a real application, you would send this data to your analytics service
    // Example:
    // fetch('/api/track-download', {
    //   method: 'POST',
    //   body: JSON.stringify({ userId, timestamp }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
  }

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
              <span className="text-orange-500">Beaver</span>&apos;s House
            </p>
          </Link>
          
        </div>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10 px-10 font-medium">
            <Link href="/service" className="">
              <p className="hover:font-semibold">서비스 소개</p>
            </Link>
            <Link href="/contact" className="">
              <p className="hover:font-semibold">문의하기</p>
            </Link>
          </nav>
          <button className=" hover:bg-black text-black/90 hover:text-white font-medium border mr-3 rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
            로그인
          </button>
          <button onClick={handleDownloadClick} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-4 py-2 text-sm transition-colors ease-in-out cursor-pointer">
            앱 다운로드
          </button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-medium">준비중입니다 !</h3>
              <p className="text-sm text-gray-500 my-1">앱이 준비되면 알려드리겠습니다.</p>
              <Link href="/contact" className="text-orange-500 font-medium text-sm mt-4 hover:font-bold">알림 받기</Link>
            </div>
          </Modal>
        </div>
      </div>
    </header>
  )
}