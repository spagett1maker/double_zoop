import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className=" py-16 px-6 md:px-12 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left section */}
          <div className="md:col-span-6">
            <p className="text-sm mb-3">Contact</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-8">
              <span className="text-orange-500">Beaver&apos;</span>s House
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center text-white bg-orange-500 rounded-full px-6 py-3 font-medium transition-colors"
            >
              Let&apos;s talk
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Middle section - Navigation */}
          <div className="md:col-span-3">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:underline underline-offset-4">
                  집 보러가기
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:underline underline-offset-4">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline underline-offset-4">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline underline-offset-4">
                  로그인
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section - App & Social */}
          <div className="md:col-span-3">
            <div className="mb-8">
              <p className="font-medium mb-4">Download Our App</p>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <span>App Store</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <span>Google Play</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-sm flex justify-between">
          <p>&copy; {new Date().getFullYear()} Beaver&apos;s House. All rights reserved.</p>
          <div>
            hi
          </div>
        </div>
      </div>
    </footer>
  )
}

