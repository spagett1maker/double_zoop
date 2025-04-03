import Image from "next/image"

export default function BrandSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto">
      {/* Korean Heading */}
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          비버의 안전한 집을 위해 함께 노력합니다.
        </h2>
      </div>

      {/* Logos - First Row */}
      <div className="flex justify-center gap-24 mb-12 items-center">
        <div className="flex justify-center ">
          <Image
            src="/collabor/1.png"
            alt="Kakao"
            width={120}
            height={40}
            className="h-24 object-contain"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/collabor/2.png"
            alt="KB 국민은행"
            width={220}
            height={40}
            className="h-24 object-contain"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/collabor/3.png"
            alt="KB 증권"
            width={220}
            height={40}
            className="h-24 object-contain"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/collabor/4.png"
            alt="KT"
            width={220}
            height={40}
            className="h-24 object-contain"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/collabor/5.png"
            alt="신한카드"
            width={220}
            height={40}
            className="h-32 object-contain"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/collabor/6.png"
            alt="삼성제"
            width={120}
            height={40}
            className="h-24 object-contain"
          />
        </div>
      </div>
    </section>
  )
}

