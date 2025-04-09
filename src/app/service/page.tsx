
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HouseCard } from "@/components/ui/card";
import QASection from "@/components/qa";
import Blog from "@/components/blog";
import BrandAboutSection from "@/components/brand";
import CTASectionWithImage from "@/components/cta";
import BrandSection from "@/components/collabo";

const houses = [
  {
    id: "1",
    imageUrl: "/1.jpg",
    category: "아파트",
    price: "전세 5억 5,000",
    size: "30평",
    floor: "3층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: false,
    safety_tag: false,
    chats: 5,
    likes: 10,
  },
  {
    id: "2",
    imageUrl: "/1.jpg",
    category: "원룸",
    price: "전세 2억 750",
    size: "15평",
    floor: "2층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: true,
    safety_tag: true,
    chats: 5,
    likes: 10,
  },
  {
    id: "3",
    imageUrl: "/1.jpg",
    category: "아파트",
    price: "전세 2억 1,000",
    size: "30평",
    floor: "3층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: true,
    safety_tag: false,
    chats: 5,
    likes: 10,
  },
  {
    id: "4",
    imageUrl: "/1.jpg",
    category: "원룸",
    price: "전세 2억",
    size: "15평",
    floor: "2층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: false,
    safety_tag: true,
    chats: 5,
    likes: 10,
  },
  {
    id: "1",
    imageUrl: "/1.jpg",
    category: "아파트",
    price: "전세 5억 5,000",
    size: "30평",
    floor: "3층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: false,
    safety_tag: false,
    chats: 5,
    likes: 10,
  },
  {
    id: "2",
    imageUrl: "/1.jpg",
    category: "원룸",
    price: "전세 2억 750",
    size: "15평",
    floor: "2층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: true,
    safety_tag: true,
    chats: 5,
    likes: 10,
  },
  {
    id: "3",
    imageUrl: "/1.jpg",
    category: "아파트",
    price: "전세 2억 1,000",
    size: "30평",
    floor: "3층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: true,
    safety_tag: false,
    chats: 5,
    likes: 10,
  },
  {
    id: "4",
    imageUrl: "/1.jpg",
    category: "원룸",
    price: "전세 2억",
    size: "15평",
    floor: "2층",
    info: "신축 건물, 주차 가능",
    location: "서울시 강남구",
    uploadedAt: new Date(),
    guarantee_tag: false,
    safety_tag: true,
    chats: 5,
    likes: 10,
  },
];

export default function Service() {
  return (
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

      <BrandAboutSection />
      <BrandSection />
      <Blog />
      <QASection />
      <CTASectionWithImage />
    </div>
  );
}
