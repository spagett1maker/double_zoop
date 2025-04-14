
import QASection from "@/components/qa";
import Blog from "@/components/blog";
import BrandAboutSection from "@/components/brand";
import CTASectionWithImage from "@/components/cta";
import CollaboSection from "@/components/collabo";
import Headers from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";

export default function Service() {
  return (
    <>
    <Headers />
    <div>
      {/* <div className="pt-16 pb-4 min-h-auto max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 p-12">
          {houses.map((house, index) => (
            <HouseCard key={index} house={house} />
          ))}
        </div>
        <div className="w-full justify-end flex px-4">
          <Link href="/house" className="cursor-pointer pr-6 group">
            <div className="flex text-orange-500 font-semibold gap-[2px]">
              <p className="">안심 전세 매물 보러가기 </p>
              <ArrowRight className="stroke-[1.5] transition-transform duration-300 group-hover:translate-x-1"/>
            </div>
          </Link>
        </div>
      </div> */}
      <HeroSection />
      <CollaboSection />

      <BrandAboutSection />
      <Blog />
      <QASection />
      <CTASectionWithImage />
    </div>
    <Footer />
    </>

  );
}
