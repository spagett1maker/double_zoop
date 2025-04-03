import type { House } from "@/components/ui/card"

// Types for property data
export interface PropertyListing {
  id: string
  type: "원룸" | "투룸" | "오피스텔" | "아파트" | "상가" | "빌라"
  dealType: "월세" | "전세" | "매매"
  price: {
    deposit?: number // 보증금 (억)
    monthly?: number // 월세 (만)
    sale?: number // 매매가 (억)
  }
  size: {
    pyeong: number // 평수
    squareMeters?: number // 제곱미터
  }
  floor?: number
  address: {
    region: string // 주요 지역 (서울, 부산 등)
    district: string // 구/동 (강남, 역삼 등)
    detail?: string // 상세 주소 정보
  }
  managementFee?: number // 관리비 (만원)
  description?: string
  features?: string[]
  isVerified?: boolean
  hasInsurance?: boolean
  postedDate: Date
  likes: number
  views: number
  chats: number
  images: string[]
}

// Mock property data
const mockProperties: PropertyListing[] = [
  {
    id: "1",
    type: "상가",
    dealType: "월세",
    price: {
      deposit: 1.8, // 1억 8천
      monthly: 140, // 140만원
    },
    size: {
      pyeong: 51.6,
      squareMeters: 170.5,
    },
    floor: 1,
    address: {
      region: "서울",
      district: "강남",
      detail: "강남역 11번출구 도보 2분거리",
    },
    managementFee: 8,
    isVerified: true,
    hasInsurance: true,
    postedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21일 전
    likes: 5,
    views: 120,
    chats: 3,
    images: ["/1.jpg"],
  },
  {
    id: "2",
    type: "투룸",
    dealType: "전세",
    price: {
      deposit: 3.7,
    },
    size: {
      pyeong: 7.8,
    },
    floor: 3,
    address: {
      region: "서울",
      district: "논현",
      detail: "논현동 중심가",
    },
    managementFee: 10,
    isVerified: false,
    hasInsurance: true,
    postedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1개월 전
    likes: 4,
    views: 95,
    chats: 2,
    images: ["/1.jpg"],
  },
  {
    id: "3",
    type: "투룸",
    dealType: "전세",
    price: {
      deposit: 3.8,
    },
    size: {
      pyeong: 16.0,
    },
    floor: 3,
    address: {
      region: "서울",
      district: "삼성",
      detail: "삼성동 아파트 단지 인근",
    },
    managementFee: 13,
    isVerified: true,
    hasInsurance: false,
    postedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1개월 전
    likes: 19,
    views: 210,
    chats: 8,
    images: ["/1.jpg"],
  },
  {
    id: "4",
    type: "투룸",
    dealType: "전세",
    price: {
      deposit: 7,
    },
    size: {
      pyeong: 24.0,
    },
    floor: 4,
    address: {
      region: "서울",
      district: "논현",
      detail: "학동역 인근",
    },
    managementFee: 0, // 직접 문의
    isVerified: false,
    hasInsurance: false,
    postedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30일 전
    likes: 24,
    views: 180,
    chats: 5,
    images: ["/1.jpg"],
  },
  {
    id: "5",
    type: "원룸",
    dealType: "월세",
    price: {
      deposit: 0.5,
      monthly: 55,
    },
    size: {
      pyeong: 6.5,
    },
    floor: 2,
    address: {
      region: "서울",
      district: "역삼",
      detail: "역삼역 도보 5분",
    },
    managementFee: 5,
    isVerified: true,
    hasInsurance: true,
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
    likes: 42,
    views: 320,
    chats: 15,
    images: ["/1.jpg"],
  },
  {
    id: "6",
    type: "오피스텔",
    dealType: "전세",
    price: {
      deposit: 2.8,
    },
    size: {
      pyeong: 12.5,
    },
    floor: 8,
    address: {
      region: "서울",
      district: "삼성",
      detail: "봉은사로 인근",
    },
    managementFee: 12,
    isVerified: false,
    hasInsurance: true,
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7일 전
    likes: 28,
    views: 175,
    chats: 6,
    images: ["/1.jpg"],
  },
  {
    id: "7",
    type: "아파트",
    dealType: "매매",
    price: {
      sale: 12.5,
    },
    size: {
      pyeong: 32.0,
    },
    floor: 12,
    address: {
      region: "서울",
      district: "청담",
      detail: "청담동 고급 아파트",
    },
    managementFee: 25,
    isVerified: true,
    hasInsurance: false,
    postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14일 전
    likes: 56,
    views: 430,
    chats: 12,
    images: ["/1.jpg"],
  },
  {
    id: "8",
    type: "빌라",
    dealType: "월세",
    price: {
      deposit: 1.0,
      monthly: 85,
    },
    size: {
      pyeong: 18.0,
    },
    floor: 3,
    address: {
      region: "서울",
      district: "압구정",
      detail: "압구정로데오 인근",
    },
    managementFee: 10,
    isVerified: true,
    hasInsurance: true,
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5일 전
    likes: 32,
    views: 240,
    chats: 9,
    images: ["/1.jpg"],
  },
]

// Convert PropertyListing to House format
export const convertToHouse = (property: PropertyListing): House => {
  // Format price string based on deal type
  let priceString = ""
  if (property.dealType === "월세") {
    priceString = `월세 ${property.price.deposit}억 ${property.price.monthly}만`
  } else if (property.dealType === "전세") {
    priceString = `전세 ${property.price.deposit}억`
  } else {
    priceString = `매매 ${property.price.sale}억`
  }

  return {
    id: property.id,
    imageUrl: property.images[0],
    category: property.type,
    price: priceString,
    size: `${property.size.pyeong}평`,
    floor: property.floor ? `${property.floor}층` : "",
    info: property.description || "",
    location: property.address.district,
    uploadedAt: property.postedDate,
    guarantee_tag: property.hasInsurance || false,
    safety_tag: property.isVerified || false,
    chats: property.chats,
    likes: property.likes,
  }
}

// Mock API service
export const propertyService = {
  // Get properties with optional filtering
  getProperties: async (filters: {
    region?: string
    district?: string
    type?: string
    dealType?: string
  }): Promise<House[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter properties based on criteria
    const filteredProperties = mockProperties.filter((property) => {
      // Filter by region
      if (filters.region && property.address.region !== filters.region) {
        return false
      }

      // Filter by district (check if the district contains any part of the filter)
      if (filters.district) {
        const districts = filters.district.split("/")
        const matchesDistrict = districts.some((d) => property.address.district.includes(d))
        if (!matchesDistrict) return false
      }

      // Filter by property type
      if (filters.type && property.type !== filters.type) {
        return false
      }

      // Filter by deal type
      if (filters.dealType && property.dealType !== filters.dealType) {
        return false
      }

      return true
    })

    // Convert to House format
    return filteredProperties.map(convertToHouse)
  },
}

