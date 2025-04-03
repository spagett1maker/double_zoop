

import Image from "next/image";
import Link from "next/link";
import { Heart, House, MessageCircle } from "lucide-react";

export interface House {
  id: string;
  imageUrl: string;
  category: string;
  price: string;
  size: string;
  floor: string;
  info: string;
  location: string;
  uploadedAt: Date;
  guarantee_tag: boolean;
  safety_tag: boolean;
  chats: number;
  likes: number;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위 차이 계산

  const units = [
    { label: "년 전", seconds: 60 * 60 * 24 * 365 },
    { label: "개월 전", seconds: 60 * 60 * 24 * 30 },
    { label: "일 전", seconds: 60 * 60 * 24 },
    { label: "시간 전", seconds: 60 * 60 },
    { label: "분 전", seconds: 60 },
    { label: "방금 전", seconds: 0.1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.seconds);
    if (value > 0) {
      return `${value}${unit.label}`;
    }
  }

  return "방금 전";
}


export function HouseCard({ house }: { house: House }) {
  return (
    <Link href="/" className="flex flex-col overflow-hidden gap-3 cursor-pointer mb-6">
      <div className="relative aspect-6/5">
        <Image src={house.imageUrl || "/placeholder.svg"} alt={house.category} fill className="object-cover rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="relative">
          <div className="text-sm text-gray-700">{house.category}</div>
          <div className="text-lg font-semibold">{house.price}</div>
          <div className="flex text-base">
            <div className="">{house.size}</div>
            <div className="ml-1">·</div>
            <div className="ml-1">{house.floor}</div>
          </div>
        </div>
        <div className="flex gap-2 py-[2px]">
          {house.safety_tag && (
            <div className="flex items-center gap-1 text-[12px] bg-[#e7f9f3] text-[#068C6D] font-medium rounded-lg py-1 px-2">
              <House className="w-4 h-4 text-[#068C6D]" /> 집주인 인증
            </div>
          )}
          {house.guarantee_tag && (
            <div className="flex items-center gap-1 text-[12px] bg-[#ffddc8] text-[#f37021] font-medium rounded-lg py-1 px-2">
              <House className="w-4 h-4 text-[#f37021]" /> 보증보험 가입 가능
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="flex gap-1 text-sm text-gray-600">
            <div>{house.location}</div>
            <div>·</div>
            <div>{formatRelativeTime(house.uploadedAt)}</div>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex gap-1 items-center text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{house.chats}</span>
            </div>
            <div className="flex gap-1 items-center text-gray-600">
              <Heart className="w-4 h-4" />
              <span className="text-s">{house.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}