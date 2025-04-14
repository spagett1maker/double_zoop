"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { signIn, session, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already logged in
    if (!isLoading && session) {
      router.push("/")
    }
  }, [session, isLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        setError(error.message)
      } else {
        // Successful login will update the session in the context
        // and the useEffect above will handle the redirect
        router.push("/")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // If still loading auth state or already logged in, show loading or nothing
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
      </div>
    )
  }

  if (session) {
    return null // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <header className={`fixed w-full z-50 bg-white`}>
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
                <p className="hover:font-semibold"></p>
              </Link>
              <Link href="/contact" className="">
                <p className="hover:font-semibold"></p>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-100 bg-gray-50 p-8">
          <h1 className="mb-6 text-center text-2xl font-bold">비버의 집에 오신 것을 환영합니다!</h1>

          {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="flex gap-1 items-center mb-1 text-sm font-medium text-gray-500">
                이메일
                <div className="w-1 h-1 rounded-full bg-[#eb534b]"></div>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="beaver@house.com"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-500">
                비밀번호
                <div className="w-1 h-1 rounded-full bg-[#eb534b]"></div>

              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className={`font-medium mb-4 w-full rounded-md bg-orange-500 px-4 py-2 text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className="font-medium text-orange-500 hover:text-orange-600">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
