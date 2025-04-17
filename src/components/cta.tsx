
import Image from 'next/image'
export default function CTASectionWithImage() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl max-w-7xl mx-auto bg-white mb-20">
      {/* Background image of a modern property */}
      <div className="absolute inset-0 px-4">
        <div className="w-full h-full rounded-3xl overflow-hidden relative">

          <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
          <Image
            src="/cta_bg.jpg"
            fill
            alt="Modern luxury property"
            className=" object-cover object-center"
          />
        </div>
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-0 sm:px-4 py-14 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            안전한 전세, <br className="block sm:hidden"/><span className="text-orange-400">비버</span>가 찾아드려요 !
          </h2>

          <p className="text-base sm:text-xl font-medium text-gray-200 mb-10 max-w-2xl mx-auto">
            아직 세상이 쉽지만은 않는, 어른이들을 위한 안전한 집.
          </p>

          <button
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold text-base sm:text-lg px-5 sm:px-10 py-3 sm:py-4 h-auto rounded-full shadow-lg transition-all duration-300"
          >
            집 보러가기
          </button>
        </div>
      </div>
    </section>
  )
}


