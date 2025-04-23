"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronRight, MessageCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MapWithMarker from "@/components/map-with-marker"
import Link from "next/link"
import { Subdivision } from "@/types/type"
import { formatPrice } from "@/lib/utils"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function House() {
  const params = useParams();
  const id = params.id as string;
  const [subdivision, setSubdivision] = useState<Subdivision | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const fetchSubdivision = async () => {
      try {
        const { data, error } = await supabase
          .from('subdivisions')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setSubdivision(data)
      } catch (error) {
        console.error('Error fetching subdivision:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubdivision()
  }, [id])

  const images = subdivision?.images || ["/house1.png", "/house2.png", "/house3.png"]

  if (loading) {
    return (
      <>
        <Header />
        <div className="h-16"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 mb-12 font-sans">
          <div className="flex justify-center items-center h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!subdivision) {
    return (
      <>
        <Header />
        <div className="h-16"></div>
        <div className="max-w-7xl mx-auto px-4 py-6 mb-12 font-sans">
          <div className="flex justify-center items-center h-[500px]">
            <p className="text-gray-500">매물 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="h-16"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 mb-12 font-sans">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4">
          <span>홈</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span>부동산</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-gray-700">{subdivision.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[300px] sm:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <Image src={images[imageIndex] || "/placeholder.svg"} alt="Property image" fill className="object-fit" />
              {/* <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                1/7 전체보기
              </div> */}
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white/70 hover:scale-105 transition-transform duration-200 rounded-full p-1 cursor-pointer"
                onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center">
              {/* <div className="w-9 sm:w-12 h-9 sm:h-12 rounded-full overflow-hidden relative bg-orange-100">
                
              </div> */}
              <div className="px-2 flex items-center justify-between w-full">
                <div className="font-medium">{subdivision.title}</div>
                <div className="text-sm sm:text-sm text-gray-500">{subdivision.address}</div>
              </div>
            </div>

            {/* Safety Check Section */}
            <div className="mt-4 border-t border-gray-200 pt-4 pb-6 sm:pb-0">
              <h2 className="text-lg font-bold mb-2">이 집의 위험요소</h2>
              <p className="text-sm text-gray-600 mb-4">처음 이 집을 살펴볼때 우리 위험확인 주의사항만 가져왔어요</p>

              {/* <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <span className="text-orange-500">👍</span>
                </div>
                <div>
                  <p className="font-medium text-green-800">모두 안전하다는 것을 확인했어요</p>
                  <p className="text-sm text-green-700">주의해야할 내역만 조회시 확인을 마쳤어요</p>
                </div>
              </div> */}

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">가처분</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">
                  집에 대한 권리에 가선 사람에 없을 확인시, 주의하세요,
                  법원에 제기된 뒤시 명령으로 집이어는 것이에요
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">가압류</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">
                  집주인이 돈을 갚지 않았기 때문에
                  돈을 빌려준 사람이 집재로 처분하는 것이에요
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">압류</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">
                  집주인이 세금 같은 오래 가진 연체액이
                  세무서 등이 집을 팔아서 변상해요 해요
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">가등기</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">
                  매도인과 소유권을 취득하기 전에 미리 생각하니,
                  집주인이 집을 담보로 돈을 빌린 경우 있어에요
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">경매개시결정</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">
                  집주인이 돈을 갚지 않았기 때문에
                  법원이 집을 경매로 사람들 오게 하려해요
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">임차권등기</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">집주인이 세금 임대인에게 보증금을 돌려주지 않았어요</div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="font-medium">신탁부동산</div>
                  <button className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">해당 내역이 없어요</button>
                </div>
                <div className="text-sm text-gray-500 pl-1 pb-2">집주인이 어떤 회사에게 이 집의 관리를 맡겼기 때문에 집주인은 전월세 계약을 할 권한이 없어요.</div>
              </div>
            </div>
          </div>

          {/* Right column - Details */}
          <div className="lg:w-1/2">
            <div className="text-sm text-gray-500 mb-1">{subdivision.property_type}</div>

            <div className="mb-2">
              <h1 className="text-2xl font-bold">
                <span className="text-orange-500">분양중</span> {formatPrice(subdivision.price || 0)} ~
              </h1>
            </div>

            <div className="border-gray-200 py-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">건축물 용도</td>
                    <td className="py-2 font-medium">{subdivision.property_type}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">전체 세대수</td>
                    <td className="py-2 font-medium">{subdivision.units_number}세대</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">지상 / 지하</td>
                    <td className="py-2 font-medium">{subdivision.up_floor}층 / {subdivision.down_floor}층</td>
                  </tr>
                  
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">입주 예정일</td>
                    <td className="py-2 font-medium">{subdivision.move_in_date}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">분양 시작일</td>
                    <td className="py-2 font-medium">{subdivision.sales_start_date}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">분양가 상한 제한 여부</td>
                    <td className="py-2 font-medium">{subdivision.is_price_limit ? "가능" : "불가능"}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">면적별 제공 타입</td>
                    <td className="py-2 font-medium">{subdivision.size?.map(size => `${size.type} ${size.units}m²`).join(", ")}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">편의시설</td>
                    <td className="py-2 font-medium">{subdivision.amenities?.join(", ")}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">택지 유형</td>
                    <td className="py-2 font-medium">{subdivision.land_type}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">단지 내 커뮤니티 시설</td>
                    <td className="py-2 font-medium">{subdivision.communityes?.join(", ")}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">세대당 주차대수</td>
                    <td className="py-2 font-medium">{subdivision.parking}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">건폐율</td>
                    <td className="py-2 font-medium">{subdivision.building_coverage_ratio}</td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">용적율</td>
                    <td className="py-2 font-medium">{subdivision.floor_area_ratio}</td>
                  </tr>
                  

                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2">상세 내용</h2>
              <p>

              </p>
            </div>

            

            <div className="mt-2 text-xs text-gray-500">
              <p>관심 21 · 조회 923 · 채팅 3</p>
            </div>

            {/* <div className="mt-4 h-[200px] bg-gray-100 rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <MapPin className="w-6 h-6 mr-2" />
                지도 영역
              </div>
            </div> */}

            <MapWithMarker address={subdivision.address || ""} />
            

            <div className="mt-4 text-sm">
              <p>{subdivision.address}</p>
            </div>
            

            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">시행/시공/대행/신탁 정보</h2>
              <table className="w-full text-sm text-gray-500">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500 w-1/3">시행사</td>
                    <td className="py-2 font-medium">{subdivision.developer}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">시공사</td>
                    <td className="py-2 font-medium">{subdivision.constructor}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">대행사</td>
                    <td className="py-2 font-medium">{subdivision.agency}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">신탁사</td>
                    <td className="py-2 font-medium">{subdivision.trust_company}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-6">
              <Link href="https://de7j3.channel.io/home" className="w-full text-center bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-3 rounded-lg mt-6 font-medium">
                문의하기
              </Link>
              <button className="bg-none text-black py-2 rounded-lg mt-6 font-medium">
                <MessageCircle className="stroke-[1.5] w-6 h-6" />
              </button>
            </div>

            
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}