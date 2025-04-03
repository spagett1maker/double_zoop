"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

type FAQItem = {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "집주인과 직접 거래를 해도 문제가 없나요?",
    answer:
      "법적으로 문제가 없으나 , 전세금 보증 보험 이나 전세 대출 상품을 이용하는데에 있어 제한이 있을 수 있으니 , 상세한 내용은 HUG나 금융기관에 확인하시길 권장드립니다.",
  },
  {
    id: "item-2",
    question: "어떤 방식으로 매물을 검증하나요?",
    answer:
      "비버의 집 내부 자체 권리분석 프로세스를 통해서 안전한 매물만을 취급하고 있습니다.",
  },
  {
    id: "item-3",
    question: "비버의 집은 어떤 서비스인가요?",
    answer:
      "안심전세 구해드립니다.",
  },
]

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId)
  }

  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          {/* Left column */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold">
              <span className="text-black">FAQ</span>
            </h2>
          </div>

          {/* Right column */}
          <div className="max-w-5xl">
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.id} className="rounded-2xl bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left text-lg font-medium"
                    aria-expanded={openItem === item.id}
                    aria-controls={`content-${item.id}`}
                  >
                    <span>{item.question}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 transition-transform duration-500 ease-in-out ${
                        openItem === item.id ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`content-${item.id}`}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={openItem !== item.id}
                  >
                    <div className="px-6 pb-5 text-gray-600">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

