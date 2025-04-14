"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [role, setRole] = useState<"tenant" | "landlord">("tenant")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const { signUp, session, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already logged in
    if (!isLoading && session) {
      router.push("/")
    }
  }, [session, isLoading, router])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (!nickname.trim()) {
      setError("Nickname is required")
      setLoading(false)
      return
    }

    try {
      const { error, data } = await signUp(email, password, role, nickname)
      console.log("Sign up data:", data)

      if (error) {
        setError(error.message)
      } else {
        setMessage("Check your email for the confirmation link!")
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
          {message && <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-500">{message}</div>}

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-500">
                이메일
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

            <div className="mb-4">
              <label htmlFor="nickname" className="mb-1 block text-sm font-medium text-gray-500">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Beaver"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-500">
                비밀번호
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

            <div className="mb-6">
              <span className="mb-2 block text-sm font-medium text-gray-700"></span>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="tenant"
                    name="role"
                    value="tenant"
                    checked={role === "tenant"}
                    onChange={() => setRole("tenant")}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="tenant" className="cursor-pointer text-sm text-gray-700">
                    임차인
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="landlord"
                    name="role"
                    value="landlord"
                    checked={role === "landlord"}
                    onChange={() => setRole("landlord")}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="landlord" className="cursor-pointer text-sm text-gray-700">
                    임대인
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`font-medium mb-4 w-full rounded-md bg-orange-500 px-4 py-2 text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loading}
            >
              {loading ? "회원가입 중.." : "회원가입"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
