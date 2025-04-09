
import Image from 'next/image'

export default function Blog() {
  return (
    <section className='w-full mx-auto max-w-[1280px] pt-[50px] pb-[50px]/'>
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-[60px]">
        <span className='text-orange-500'>Articles</span> and Blog
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg overflow-hidden bg-white">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/blog1.jpg"
              alt="Glass building architecture"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-4 pl-1">
            <p className="text-sm text-gray-500 mb-2">May 9, 2024</p>
            <h3 className="font-medium text-xl">비버처럼 성실하게, 그리고 견고하게</h3>
            <div className='items-center flex justify-center py-[6px] px-[12px] relative bg-orange-100 max-w-max rounded-full mt-5 ml-[-2px]'>
              <p className="text-orange-500 font-semibold text-xs">READ MORE</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden bg-white">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/blog2.jpg"
              alt="Orange building architecture"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-4 pl-1">
            <p className="text-sm text-gray-500 mb-2">May 9, 2024</p>
            <h3 className="font-medium text-xl">전세사기 특별법이 만료된다면?</h3>
            <div className='items-center flex justify-center py-[6px] px-[12px] relative bg-orange-100 max-w-max rounded-full mt-5 ml-[-2px]'>
              <p className="text-orange-500 font-semibold text-xs">READ MORE</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden bg-white">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src="/blog3.jpg"
              alt="Red architectural structure"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-4 pl-1">
            <p className="text-sm text-gray-500 mb-2">May 9, 2024</p>
            <h3 className="font-medium text-xl">전세 보증금 반환 보증 HUG, HF, SGI 차이</h3>
            <div className='items-center flex justify-center py-[6px] px-[12px] relative bg-orange-100 max-w-max rounded-full mt-5 ml-[-2px]'>
              <p className="text-orange-500 font-semibold text-xs">READ MORE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}