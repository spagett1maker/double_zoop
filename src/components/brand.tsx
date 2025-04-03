import { ChevronRight } from "lucide-react"

export default function BrandAboutSection() {
  return (
    <div className="relative bg-white min-h-max max-w-7xl mx-auto">

      <div className="container mx-auto px-4 pt-28 pb-18 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left column with OUR STORY heading */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="flex items-center">
                <div className="w-1.5 h-5 bg-orange-500 mr-4"></div>
                <h2 className="text-base font-bold tracking-wide">OUR STORY</h2>
              </div>
            </div>
          </div>

          {/* Right column with main content */}
          <div className="lg:col-span-10">
            {/* Decorative element */}
            <div className="w-20 h-1 bg-orange-500 mb-12" />

            {/* Main heading with gradient */}
            <h1 className="text-5xl font-bold mb-5 leading-tight">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                위험한 집 , 이젠 없다.
              </span>
            </h1>

            {/* Subheading with styled quotes - now horizontal */}
            <div className="flex flex-wrap items-center mb-12">
              <span className="text-orange-500 text-3xl font-serif">{'"'}</span>
              <h2 className="text-2xl md:text-3xl font-medium px-2">비버의 집</h2>
              <span className="text-orange-500 text-3xl font-serif">{'"'}</span>
              <h2 className="text-2xl md:text-3xl font-medium px-2">과 함께라면</h2>
            </div>

            {/* Main description with improved typography */}
            <p className="text-xl md:text-2xl font-medium text-gray-800 mb-12">
              지금까지 힘겹게 달려온 어른이를 위한 안전한 집 .
            </p>

            {/* Content paragraphs with better spacing and readability */}
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>비베도 우리와 마찬가지로 일정 시간가 되면 부모님과 함께 살던 터전에서 분가를 해요.</p>
              <p>
                분가를 하게 되면 강줄기를 따라 <span className="ㄴ">5km</span> 정도를
                이동하게 되요.
              </p>
              <p>작고 느린 비베가 부모님과 함께 지내던 안전한 집을 포기하고 가는 길인 만큼 위험 길은 아니에요.</p>
              <p>
                하지만 그 과정에서 평생 사랑하고 살을 함께할 반려도 만나고 새롭게 정착해 담과 집을 짓고 살아간답니다.
              </p>
            </div>

            {/* Call to action section */}
            <div
                className="mt-16 p-8 rounded-2xl parallax-element"
                data-depth="1"
                style={{
                  background: "linear-gradient(145deg, #fff6ed, #fff0e5)",
                  boxShadow:
                    "10px 10px 30px rgba(0,0,0,0.05), -5px -5px 30px rgba(255,255,255,0.8), inset 2px 2px 5px rgba(255,255,255,0.5)",
                  transform: "translateZ(35px)",
                }}
              >
                <h3
                  className="text-xl font-medium text-gray-800 mb-4"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.05)" }}
                >
                  우리 역시 마찬가지 아닐까요?
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  어렵고 힘들지만 어른이 된다는 건 그런 거니까요, 어른이 되느라 고생한 당신의 정착과 독립을 응원합니다!
                </p>
                <button
                  className="flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors cursor-pointer"
                  style={{
                    textShadow: "0 1px 2px rgba(249, 115, 22, 0.2)",
                    transform: "translateZ(5px)",
                  }}
                >
                  더 알아보기
                  <ChevronRight
                    className="w-4 h-4 ml-1"
                    style={{ filter: "drop-shadow(1px 1px 1px rgba(249, 115, 22, 0.3))" }}
                  />
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

