
// "use client"

// import { useEffect } from "react"

// export default function ChannelService() {
//   useEffect(() => {
//     const w = window as any

//     if (w.ChannelIO) {
//       console.warn("ChannelIO already initialized")
//       return
//     }

//     // ✅ 타입 명시
//     type ChannelInitFn = {
//       (...args: any[]): void
//       q?: any[]
//       c?: (args: any) => void
//     }

//     const ch: ChannelInitFn = function (...args: any[]) {
//       ch.c!(args)
//     }

//     ch.q = []
//     ch.c = function (args: any) {
//       ch.q!.push(args)
//     }

//     w.ChannelIO = ch

//     function loadScript() {
//       if (w.ChannelIOInitialized) return
//       w.ChannelIOInitialized = true
//       const s = document.createElement("script")
//       s.type = "text/javascript"
//       s.async = true
//       s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"
//       const x = document.getElementsByTagName("script")[0]
//       x?.parentNode?.insertBefore(s, x)
//     }

//     if (document.readyState === "complete") {
//       loadScript()
//     } else {
//       window.addEventListener("DOMContentLoaded", loadScript)
//       window.addEventListener("load", loadScript)
//     }

//     // boot 실행
//     w.ChannelIO("boot", {
//       pluginKey: "e7ebc6e0-9e37-4d7e-aa33-b20a04dd6fd5",
//     })

//     return () => {
//       w.ChannelIO?.("shutdown")
//     }
//   }, [])

//   return null
// }
"use client"

import { useEffect } from "react"
import { getChannelBootOption } from "@/lib/channel"

interface ChannelUser {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
}

interface ChannelServiceProps {
  user?: ChannelUser
}

type ChannelInitFn = ((...args: any[]) => void) & {
  q?: any[]
  c?: (args: any) => void
}

declare global {
  interface Window {
    ChannelIO?: ChannelInitFn
    ChannelIOInitialized?: boolean
  }
}

export default function ChannelService({ user }: ChannelServiceProps) {
  useEffect(() => {
    if (typeof window === "undefined") return
    const w = window

    // 중복 초기화 방지
    if (w.ChannelIO) {
      w.ChannelIO("shutdown")
      delete w.ChannelIO
    }

    // ChannelIO 초기 정의
    const ch: ChannelInitFn = function (...args: any[]) {
      ch.c?.(args)
    }
    ch.q = []
    ch.c = function (args: any) {
      ch.q?.push(args)
    }

    w.ChannelIO = ch

    // SDK 로드
    const loadScript = () => {
      if (w.ChannelIOInitialized) return
      w.ChannelIOInitialized = true

      const s = document.createElement("script")
      s.type = "text/javascript"
      s.async = true
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"
      const x = document.getElementsByTagName("script")[0]
      x?.parentNode?.insertBefore(s, x)
    }

    if (document.readyState === "complete") {
      loadScript()
    } else {
      window.addEventListener("DOMContentLoaded", loadScript)
      window.addEventListener("load", loadScript)
    }

    // 부트 실행
    w.ChannelIO("boot", getChannelBootOption(user))

    return () => {
      w.ChannelIO?.("shutdown")
    }
  }, [user])

  return null
}
