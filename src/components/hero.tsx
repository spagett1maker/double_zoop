import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-4 pt-32 pb-12 flex flex-col items-center">
      {/* Badge */}
      <div className="mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-500 text-sm font-medium">
          Beaver&apos;s House | 비버의 집
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl leading-snug font-bold text-center mb-12 max-w-4xl">
        아직 세상이 쉽지만은 않은,
        <br className="" />
        어른이들을 위한 안전한 집, 
        <br className="block sm:hidden" />
        <span className="text-orange-500">비버의 집</span>
      </h1>

      {/* Image */}
      <div className="w-full max-w-5xl">
        <div className="rounded-3xl overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Modern wooden and brick house"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
