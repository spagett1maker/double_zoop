"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase-client"
import ImageUpload from "@/components/image-upload"
import type { UploadedImage } from "@/components/image-upload"
import Header from "@/components/header"
import { uploadImagesToSupabase } from "@/lib/uploadImageToSupabase"
import { Subdivision, Risk } from '@/types/type'

export default function SubdivisionUploadPage() {
  const { user, session, isLoading } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<Subdivision>({
    subdivision_name: "",
    area: "",
    address_category: "",
    title: "",
    property_type: "",
    price: 0,
    description: "",
    address: "",
    units_number: 0,
    building_number: 0,
    move_in_date: "",
    sales_start_date: "",
    size: [],
    up_floor: 0,
    down_floor: 0,
    parking: "",
    building_coverage_ratio: "",
    floor_area_ratio: "",
    land_type: "",
    developer: "",
    constructor: "",
    agency: "",
    trust_company: "",
    is_price_limit: false,
    amenities: [],
    communityes: [],
    tags: [false, false, false],
    risk: {
      "전매제한 여부": false,
      "전매제한 기간": "",
      "실거주 의무 여부": false,
      "실거주 의무 기간": "",
      "역세권": "",
      "학군": "",
      "착공일": "",
      "규제 지역 여부": false,
      "계약금 비율": 0
    },
    images: []
  })

  const [images, setImages] = useState<UploadedImage[]>([])

  useEffect(() => {
    if (!isLoading) {
      console.log("user:", user)
    }
  }, [isLoading, session, user, router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target
    const name = target.name as keyof Subdivision
  
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.type === "number"
        ? Number(target.value)
        : target.value
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRiskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target
    const name = target.name as keyof Risk
  
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.type === "number"
        ? Number(target.value)
        : target.value
  
    setFormData((prev) => {
      if (!prev.risk) {
        return {
          ...prev,
          risk: {
            "전매제한 여부": false,
            "전매제한 기간": "",
            "실거주 의무 여부": false,
            "실거주 의무 기간": "",
            "역세권": "",
            "학군": "",
            "착공일": "",
            "규제 지역 여부": false,
            "계약금 비율": 0,
            [name]: value
          }
        }
      }
      return {
        ...prev,
        risk: {
          ...prev.risk,
          [name]: value
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (images.length < 3) {
      alert("최소 3장의 사진을 업로드해주세요.")
      return
    }

    setSubmitting(true)

    try {
      const imageUrls = await uploadImagesToSupabase(images)
      
      await supabase.from('subdivisions').insert([
        {
          ...formData,
          images: imageUrls,
        },
      ])

      alert("분양이 성공적으로 등록되었습니다!")
      router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("분양 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16">
        <main className="container mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">분양 등록하기</h1>
            <p className="text-gray-600">분양 정보를 입력해주세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">기본 정보</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="subdivision_name" className="mb-1 block text-sm font-medium text-gray-700">
                    사업명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subdivision_name"
                    name="subdivision_name"
                    type="text"
                    required
                    value={formData.subdivision_name || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="area" className="mb-1 block text-sm font-medium text-gray-700">
                    사업지/권역 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    required
                    value={formData.area || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="address_category" className="mb-1 block text-sm font-medium text-gray-700">
                    주소 카테고리(강남/서초, 강동/송파 그 카테고리임.) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address_category"
                    name="address_category"
                    type="text"
                    required
                    value={formData.address_category || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                    사업병 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="property_type" className="mb-1 block text-sm font-medium text-gray-700">
                    건축물용도 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="property_type"
                    name="property_type"
                    value={formData.property_type || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="아파트">아파트</option>
                    <option value="오피스텔">오피스텔</option>
                    <option value="빌라">빌라</option>
                    <option value="단독주택">단독주택</option>
                    <option value="상가">상가</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                    가격 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            {/* Property Information */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">부동산 정보</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="units_number" className="mb-1 block text-sm font-medium text-gray-700">
                    전체 세대수 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="units_number"
                    name="units_number"
                    type="number"
                    value={formData.units_number || 0}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="building_number" className="mb-1 block text-sm font-medium text-gray-700">
                    동 개수 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="building_number"
                    name="building_number"
                    type="number"
                    value={formData.building_number || 0}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="move_in_date" className="mb-1 block text-sm font-medium text-gray-700">
                    입주 예정일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="move_in_date"
                    name="move_in_date"
                    type="date"
                    value={formData.move_in_date || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="sales_start_date" className="mb-1 block text-sm font-medium text-gray-700">
                    분양 시작일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="sales_start_date"
                    name="sales_start_date"
                    type="date"
                    value={formData.sales_start_date || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="up_floor" className="mb-1 block text-sm font-medium text-gray-700">
                    지상 층수 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="up_floor"
                    name="up_floor"
                    type="number"
                    value={formData.up_floor || 0}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="down_floor" className="mb-1 block text-sm font-medium text-gray-700">
                    지하 층수 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="down_floor"
                    name="down_floor"
                    type="number"
                    value={formData.down_floor || 0}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="parking" className="mb-1 block text-sm font-medium text-gray-700">
                    주차(평균 주차대수) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parking"
                    name="parking"
                    type="text"
                    value={formData.parking || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="building_coverage_ratio" className="mb-1 block text-sm font-medium text-gray-700">
                    건폐율(BCR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="building_coverage_ratio"
                    name="building_coverage_ratio"
                    type="text"
                    value={formData.building_coverage_ratio || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="floor_area_ratio" className="mb-1 block text-sm font-medium text-gray-700">
                    용적율(FAR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="floor_area_ratio"
                    name="floor_area_ratio"
                    type="text"
                    value={formData.floor_area_ratio || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="land_type" className="mb-1 block text-sm font-medium text-gray-700">
                    택지 유형 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="land_type"
                    name="land_type"
                    type="text"
                    value={formData.land_type || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            {/* Company Information */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">회사 정보</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="developer" className="mb-1 block text-sm font-medium text-gray-700">
                    시행사 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="developer"
                    name="developer"
                    type="text"
                    value={formData.developer || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="constructor" className="mb-1 block text-sm font-medium text-gray-700">
                    시공사 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="constructor"
                    name="constructor"
                    type="text"
                    value={formData.constructor || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="agency" className="mb-1 block text-sm font-medium text-gray-700">
                    대행사 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="agency"
                    name="agency"
                    type="text"
                    value={formData.agency || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="trust_company" className="mb-1 block text-sm font-medium text-gray-700">
                    신탁사 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="trust_company"
                    name="trust_company"
                    type="text"
                    value={formData.trust_company || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            {/* Risk Information */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">위험 정보</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <input
                    id="전매제한 여부"
                    name="전매제한 여부"
                    type="checkbox"
                    checked={formData.risk?.["전매제한 여부"] || false}
                    onChange={handleRiskChange}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="전매제한 여부" className="text-sm font-medium text-gray-700">
                    전매제한 여부
                  </label>
                </div>

                <div>
                  <label htmlFor="전매제한 기간" className="mb-1 block text-sm font-medium text-gray-700">
                    전매제한 기간
                  </label>
                  <input
                    id="전매제한 기간"
                    name="전매제한 기간"
                    type="text"
                    value={formData.risk?.["전매제한 기간"] || ""}
                    onChange={handleRiskChange}
                    placeholder="예: 5년"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="실거주 의무 여부"
                    name="실거주 의무 여부"
                    type="checkbox"
                    checked={formData.risk?.["실거주 의무 여부"] || false}
                    onChange={handleRiskChange}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="실거주 의무 여부" className="text-sm font-medium text-gray-700">
                    실거주 의무 여부
                  </label>
                </div>

                <div>
                  <label htmlFor="실거주 의무 기간" className="mb-1 block text-sm font-medium text-gray-700">
                    실거주 의무 기간
                  </label>
                  <input
                    id="실거주 의무 기간"
                    name="실거주 의무 기간"
                    type="text"
                    value={formData.risk?.["실거주 의무 기간"] || ""}
                    onChange={handleRiskChange}
                    placeholder="예: 3년"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="역세권" className="mb-1 block text-sm font-medium text-gray-700">
                    역세권
                  </label>
                  <input
                    id="역세권"
                    name="역세권"
                    type="text"
                    value={formData.risk?.["역세권"] || ""}
                    onChange={handleRiskChange}
                    placeholder="예: 강남역 도보 10분"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="학군" className="mb-1 block text-sm font-medium text-gray-700">
                    학군
                  </label>
                  <input
                    id="학군"
                    name="학군"
                    type="text"
                    value={formData.risk?.["학군"] || ""}
                    onChange={handleRiskChange}
                    placeholder="예: 강남초등학교"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="착공일" className="mb-1 block text-sm font-medium text-gray-700">
                    착공일
                  </label>
                  <input
                    id="착공일"
                    name="착공일"
                    type="text"
                    value={formData.risk?.["착공일"] || ""}
                    onChange={handleRiskChange}
                    placeholder="예: 2024년 3월 1일"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="규제 지역 여부"
                    name="규제 지역 여부"
                    type="checkbox"
                    checked={formData.risk?.["규제 지역 여부"] || false}
                    onChange={handleRiskChange}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="규제 지역 여부" className="text-sm font-medium text-gray-700">
                    규제 지역 여부
                  </label>
                </div>

                <div>
                  <label htmlFor="계약금 비율" className="mb-1 block text-sm font-medium text-gray-700">
                    계약금 비율
                  </label>
                  <input
                    id="계약금 비율"
                    name="계약금 비율"
                    type="number"
                    value={formData.risk?.["계약금 비율"] || 0}
                    onChange={handleRiskChange}
                    placeholder="예: 20"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">태그</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    id="tag1"
                    type="checkbox"
                    checked={formData.tags?.[0] || false}
                    onChange={(e) => {
                      const newTags = [...(formData.tags || [false, false, false])]
                      newTags[0] = e.target.checked
                      setFormData(prev => ({ ...prev, tags: newTags }))
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="tag1" className="text-sm font-medium text-gray-700">
                    즉시입주
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="tag2"
                    type="checkbox"
                    checked={formData.tags?.[1] || false}
                    onChange={(e) => {
                      const newTags = [...(formData.tags || [false, false, false])]
                      newTags[1] = e.target.checked
                      setFormData(prev => ({ ...prev, tags: newTags }))
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="tag2" className="text-sm font-medium text-gray-700">
                    전매여부
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="tag3"
                    type="checkbox"
                    checked={formData.tags?.[2] || false}
                    onChange={(e) => {
                      const newTags = [...(formData.tags || [false, false, false])]
                      newTags[2] = e.target.checked
                      setFormData(prev => ({ ...prev, tags: newTags }))
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="tag3" className="text-sm font-medium text-gray-700">
                    다주택여부
                  </label>
                </div>
              </div>
            </section>

            {/* Size */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">평형 정보</h2>
              <div className="space-y-4">
                {formData.size?.map((size, index) => (
                  <div key={index} className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        평형
                      </label>
                      <input
                        type="text"
                        value={size.type}
                        onChange={(e) => {
                          const newSize = [...(formData.size || [])]
                          newSize[index] = {
                            ...size,
                            type: e.target.value
                          }
                          setFormData(prev => ({ ...prev, size: newSize }))
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        세대 수
                      </label>
                      <input
                        type="number"
                        value={size.units}
                        onChange={(e) => {
                          const newSize = [...(formData.size || [])]
                          newSize[index] = {
                            ...size,
                            units: Number(e.target.value)
                          }
                          setFormData(prev => ({ ...prev, size: newSize }))
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        분양가 (만원)
                      </label>
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => {
                          const newSize = [...(formData.size || [])]
                          newSize[index] = {
                            ...size,
                            price: Number(e.target.value)
                          }
                          setFormData(prev => ({ ...prev, size: newSize }))
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      size: [...(prev.size || []), { type: "", units: 0, price: 0 }]
                    }))
                  }}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  평형 추가
                </button>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">편의시설</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="newAmenity"
                    placeholder="편의시설을 입력하세요"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('newAmenity') as HTMLInputElement
                      const newAmenity = input.value.trim()
                      if (newAmenity && !formData.amenities?.includes(newAmenity)) {
                        setFormData(prev => ({
                          ...prev,
                          amenities: [...(prev.amenities || []), newAmenity]
                        }))
                        input.value = ''
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities?.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{amenity}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            amenities: (prev.amenities || []).filter((_, i) => i !== index)
                          }))
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Communities */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">커뮤니티</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="newCommunity"
                    placeholder="커뮤니티 시설을 입력하세요"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('newCommunity') as HTMLInputElement
                      const newCommunity = input.value.trim()
                      if (newCommunity && !formData.communityes?.includes(newCommunity)) {
                        setFormData(prev => ({
                          ...prev,
                          communityes: [...(prev.communityes || []), newCommunity]
                        }))
                        input.value = ''
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.communityes?.map((community, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{community}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            communityes: (prev.communityes || []).filter((_, i) => i !== index)
                          }))
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Image Upload */}
            <section className="rounded-lg bg-white py-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">사진 업로드</h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    매물 사진 (최소 3장) <span className="text-red-500">*</span>
                  </label>
                  <ImageUpload
                    images={images}
                    setImages={setImages}
                    maxFiles={10}
                    label="사진을 여기에 끌어다 놓거나 클릭하여 업로드하세요"
                  />
                  {images.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      {images.length}장의 사진이 업로드되었습니다 (최소 3장 필요)
                    </p>
                  )}
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {submitting ? "등록 중..." : "등록하기"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}