"use client"

//import { useParams } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { ChevronRight, MessageCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MapWithMarker from "@/components/map-with-marker"
import Link from "next/link"

export default function House() {
  // const params = useParams();
  // const id = params.id;

  const [imageIndex, setImageIndex] = useState(0)
  const images = ["/brand1.png", "/brand2.jpg", "/brand3.png"]

  return (
    <>
      <Header />
      <div className="h-16"></div>
      <div className="max-w-7xl mx-auto px-4 py-6 mb-12 font-sans">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>홈</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span>부동산</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-gray-700">오르평 월세 5,000원/45만원 - 삼성동역 도보7분 | 한국부동산</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <Image src={images[imageIndex] || "/placeholder.svg"} alt="Property image" fill className="object-fit" />
              {/* <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                1/7 전체보기
              </div> */}
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 rounded-full p-1"
                onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image src="/placeholder.svg" alt="Agent" fill className="object-cover" />
              </div>
              <div className="ml-3">
                <div className="font-medium">내외부동산중개사무소</div>
                <div className="text-sm text-gray-500">심성동</div>
              </div>
            </div>

            {/* Safety Check Section */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="text-lg font-bold mb-2">이 집의 위험요소</h2>
              <p className="text-sm text-gray-600 mb-4">처음 이 집을 살펴볼때 우리 위험확인 주의사항만 가져왔어요</p>

              <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <span className="text-orange-500">👍</span>
                </div>
                <div>
                  <p className="font-medium text-green-800">모두 안전하다는 것을 확인했어요</p>
                  <p className="text-sm text-green-700">주의해야할 내역만 조회시 확인을 마쳤어요</p>
                </div>
              </div>

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
            <div className="text-sm text-gray-500 mb-1">공인중개사 · 오르평 월세</div>

            <div className="mb-2">
              <h1 className="text-2xl font-bold">
                <span className="text-orange-500">판매중</span> 전세 1,700만원
              </h1>
              <p className="text-gray-600 mt-1">2개월 전 작성</p>
            </div>

            <div className="border-gray-200 py-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500 w-1/3">매물번호</td>
                    <td className="py-2 font-medium">1222807</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">건축물 용도</td>
                    <td className="py-2 font-medium">단독주택</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">전용면적</td>
                    <td className="py-2 font-medium">전용 31.4m² · 10평</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">방/욕실 수</td>
                    <td className="py-2 font-medium">방 1개 / 욕실 1개</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">층</td>
                    <td className="py-2 font-medium">2층 / 4층</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">방향</td>
                    <td className="py-2 font-medium">서남</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">관리비</td>
                    <td className="py-2 font-medium text-blue-500">10만원</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">사용승인일 (준공)</td>
                    <td className="py-2 font-medium">1996년 06월 07일 (29년차)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">대출가능여부</td>
                    <td className="py-2 font-medium">가능</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">입주 가능일</td>
                    <td className="py-2 font-medium">즉시 가능</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">반려동물</td>
                    <td className="py-2 font-medium">불가능</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">주차</td>
                    <td className="py-2 font-medium">불가능</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">내부 시설</td>
                    <td className="py-2 font-medium">에어컨, 가스렌지</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold mb-4">상세 내용</h2>
              <p>

              </p>
            </div>

            

            <div className="mt-4 text-xs text-gray-500">
              <p>관심 21 · 조회 923 · 채팅 3</p>
            </div>

            {/* <div className="mt-4 h-[200px] bg-gray-100 rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <MapPin className="w-6 h-6 mr-2" />
                지도 영역
              </div>
            </div> */}

            <MapWithMarker address="서울특별시 강남구 삼성로 119길 19" />
            

            <div className="mt-4 text-sm">
              <p>서울특별시 강남구 봉은사로73길 44 (삼성동) 삼성중앙역 도보7분</p>
            </div>
            

            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4">공인중개사 정보</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500 w-1/3">중개소</td>
                    <td className="py-2 font-medium">내외부동산중개사무소</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">대표</td>
                    <td className="py-2 font-medium">한원우</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">위치</td>
                    <td className="py-2 font-medium">서울특별시 강남구 삼성로119길 19 (삼성동)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">등록번호</td>
                    <td className="py-2 font-medium">71-9250-3105</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-500">전화번호</td>
                    <td className="py-2 font-medium">0264061400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-6">
              <Link href="https://de7j3.channel.io/home" className="w-full text-center bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-3 rounded-lg mt-6 font-medium">
                집주인에게 직접 연락하기
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