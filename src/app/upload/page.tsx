"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase-client"

import ImageUpload from "@/components/image-upload"
import type { UploadedImage } from "@/components/image-upload"
import Header from "@/components/header"
import { uploadImagesToSupabase } from "@/lib/uploadImageToSupabase"

// Form state
  type FormData = {
    price: string
    name: string
    buildingType: string
    grossArea: string
    netArea: string
    rooms: number
    bathrooms: number
    floor: string
    direction: string
    maintenanceFee: number
    approvalDate: string
    loanAvailable: boolean
    moveInDate: string
    petAllowed: boolean
    parkingSpaces: string
    elevator: boolean
    description: string
    address: string
    locationDetails: string
  }
// Legal checkboxes state
  type LegalChecks = {
    가처분: boolean
    가압류: boolean
    압류: boolean
    가등기: boolean
    경매개시결정: boolean
    임차권등기: boolean
    신탁부동산: boolean
    체납이력: boolean
  }
  const convertLegalChecks = (original: LegalChecks) => ({
    injunction: original["가처분"],
    provisionalSeizure: original["가압류"],
    seizure: original["압류"],
    provisionalRegistration: original["가등기"],
    auctionStarted: original["경매개시결정"],
    leaseRegistration: original["임차권등기"],
    trustProperty: original["신탁부동산"],
    taxDelinquency: original["체납이력"],
  })
  
// Images state
  // type UploadedImage = {
  //   id?: string
  //   url: string
  //   file?: File
  // }
export type UploadedImageWithUrl = UploadedImage & {
  url: string
}



  

export default function PropertyUploadPage() {
  const { user, session, isLoading, profile } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    price: "",
    name: "",
    buildingType: "",
    grossArea: "",
    netArea: "",
    rooms: 0,
    bathrooms: 0,
    floor: "",
    direction: "남향",
    maintenanceFee: 0,
    approvalDate: "",
    loanAvailable: false,
    moveInDate: "",
    petAllowed: false,
    parkingSpaces: "",
    elevator: false,
    description: "",
    address: "",
    locationDetails: "",
  })

  // Tags state
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const availableTags = [
    { id: 1, name: "보증보험가입가능", color: "#f37021" },
    { id: 2, name: "안전검증완료", color: "#4CAF50" },
  ]

  const [legalChecks, setLegalChecks] = useState<LegalChecks>({
    가처분: false,
    가압류: false,
    압류: false,
    가등기: false,
    경매개시결정: false,
    임차권등기: false,
    신탁부동산: false,
    체납이력: false,
  })

  const [images, setImages] = useState<UploadedImage[]>([])
  //const [floorPlanImage, setFloorPlanImage] = useState<UploadedImage | null>(null)

  useEffect(() => {
    // Check if user is authenticated and is a landlord
    if (!isLoading) {
      
      console.log("user:", user)
    }
  }, [isLoading, session, user, router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target
    const name = target.name as keyof typeof formData
  
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleTagToggle = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const handleLegalCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setLegalChecks({
      ...legalChecks,
      [name]: checked,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (images.length < 3) {
      alert("최소 3장의 사진을 업로드해주세요.")
      return
    }

    setSubmitting(true)

    console.log("Form data:", formData)
    console.log(typeof formData)
    console.log("images:", images)

    try {
      const uploaded = await uploadImagesToSupabase(images, user?.id || "")
      const imageUrls = uploaded.map((img) => img.url)
      console.log("Uploaded image URLs:", imageUrls)
      console.log(typeof imageUrls)
      console.log("Selected tags:", selectedTags)
      console.log("Legal checks:", legalChecks)
      await supabase.from('properties').insert([
        {
          ...formData,
          landlord_id: user?.id,
          landlord_email: user?.email,
          landlord_nickname: profile?.nickname,
          images: imageUrls,
          tags: selectedTags,
          legalchecks: convertLegalChecks(legalChecks),
        },
      ])
      

      alert("매물이 성공적으로 등록되었습니다!")
      // Redirect to dashboard or property listing page
      //router.push("/")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("매물 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
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

  // If no session or not a landlord, the useEffect will redirect


  // Rest of the component remains the same as before
  // ...

  return (
    <>
    <Header />
    <div className="min-h-screen pt-16 ">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Form content remains the same as before */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">매물 등록하기</h1>
          <p className="text-gray-600">부동산 매물 정보를 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form sections remain the same */}
          {/* ... */}

          {/* Basic Property Information */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">기본 정보</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                  가격 (만원) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="예: 5000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                  매물명 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="예: 강남 역세권 신축 아파트"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="buildingType" className="mb-1 block text-sm font-medium text-gray-700">
                  건물 유형 <span className="text-red-500">*</span>
                </label>
                <select
                  id="buildingType"
                  name="buildingType"
                  required
                  value={formData.buildingType}
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
                <label htmlFor="grossArea" className="mb-1 block text-sm font-medium text-gray-700">
                  공급면적 (m²) <span className="text-red-500">*</span>
                </label>
                <input
                  id="grossArea"
                  name="grossArea"
                  type="number"
                  step="0.01"
                  required
                  value={formData.grossArea}
                  onChange={handleInputChange}
                  placeholder="예: 84.12"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="netArea" className="mb-1 block text-sm font-medium text-gray-700">
                  전용면적 (m²) <span className="text-red-500">*</span>
                </label>
                <input
                  id="netArea"
                  name="netArea"
                  type="number"
                  step="0.01"
                  required
                  value={formData.netArea}
                  onChange={handleInputChange}
                  placeholder="예: 59.5"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="rooms" className="mb-1 block text-sm font-medium text-gray-700">
                  방 개수 <span className="text-red-500">*</span>
                </label>
                <input
                  id="rooms"
                  name="rooms"
                  type="number"
                  required
                  value={formData.rooms}
                  onChange={handleInputChange}
                  placeholder="예: 3"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="mb-1 block text-sm font-medium text-gray-700">
                  욕실 개수 <span className="text-red-500">*</span>
                </label>
                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  required
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="예: 2"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="floor" className="mb-1 block text-sm font-medium text-gray-700">
                  층수 <span className="text-red-500">*</span>
                </label>
                <input
                  id="floor"
                  name="floor"
                  type="text"
                  required
                  value={formData.floor}
                  onChange={handleInputChange}
                  placeholder="예: 8층 / 지하 1층"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="direction" className="mb-1 block text-sm font-medium text-gray-700">
                  방향 <span className="text-red-500">*</span>
                </label>
                <select
                  id="direction"
                  name="direction"
                  required
                  value={formData.direction}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value="남향">남향</option>
                  <option value="북향">북향</option>
                  <option value="동향">동향</option>
                  <option value="서향">서향</option>
                  <option value="남동향">남동향</option>
                  <option value="남서향">남서향</option>
                  <option value="북동향">북동향</option>
                  <option value="북서향">북서향</option>
                </select>
              </div>
            </div>
          </section>

          {/* Additional Property Details */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">추가 정보</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="maintenanceFee" className="mb-1 block text-sm font-medium text-gray-700">
                  관리비 (만원/월)
                </label>
                <input
                  id="maintenanceFee"
                  name="maintenanceFee"
                  type="number"
                  value={formData.maintenanceFee}
                  onChange={handleInputChange}
                  placeholder="예: 10"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="approvalDate" className="mb-1 block text-sm font-medium text-gray-700">
                  준공일
                </label>
                <input
                  id="approvalDate"
                  name="approvalDate"
                  type="date"
                  value={formData.approvalDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="moveInDate" className="mb-1 block text-sm font-medium text-gray-700">
                  입주 가능일
                </label>
                <input
                  id="moveInDate"
                  name="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="parkingSpaces" className="mb-1 block text-sm font-medium text-gray-700">
                  주차 공간
                </label>
                <input
                  id="parkingSpaces"
                  name="parkingSpaces"
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={handleInputChange}
                  placeholder="예: 1"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="loanAvailable"
                  name="loanAvailable"
                  type="checkbox"
                  checked={formData.loanAvailable}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="loanAvailable" className="text-sm font-medium text-gray-700">
                  대출 가능
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="petAllowed"
                  name="petAllowed"
                  type="checkbox"
                  checked={formData.petAllowed}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="petAllowed" className="text-sm font-medium text-gray-700">
                  반려동물 가능
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="elevator"
                  name="elevator"
                  type="checkbox"
                  checked={formData.elevator}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="elevator" className="text-sm font-medium text-gray-700">
                  엘리베이터
                </label>
              </div>
            </div>
          </section>

          {/* Location Information */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">위치 정보</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                  주소 <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="예: 서울시 강남구 테헤란로 123"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="locationDetails" className="mb-1 block text-sm font-medium text-gray-700">
                  위치 상세 정보
                </label>
                <input
                  id="locationDetails"
                  name="locationDetails"
                  type="text"
                  value={formData.locationDetails}
                  onChange={handleInputChange}
                  placeholder="예: 강남역에서 도보 10분 거리"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">상세 설명</h2>
            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                매물 설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="매물에 대한 상세한 설명을 입력해주세요."
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
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

              {/* <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">평면도 (선택사항)</label>
                <ImageUpload
                  images={floorPlanImage ? [floorPlanImage] : []}
                  setImages={(imgs: UploadedImage[]) => setFloorPlanImage(imgs[0] || null)}
                  maxFiles={1}
                  label="평면도를 여기에 끌어다 놓거나 클릭하여 업로드하세요"
                />
              </div> */}
            </div>
          </section>

          {/* Tags */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">태그</h2>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium text-white transition-colors ${
                    selectedTags.includes(tag.id) ? `bg-opacity-100` : `bg-opacity-60 hover:bg-opacity-80`
                  }`}
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </section>

          {/* Legal Analysis */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">법적 분석</h2>
            <p className="mb-4 text-sm text-gray-600">해당 매물에 적용되는 법적 상태를 모두 체크해주세요.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(Object.keys(legalChecks) as (keyof LegalChecks)[]).map((check) => (
                <div key={check} className="flex items-center space-x-2">
                  <input
                    id={check}
                    name={check}
                    type="checkbox"
                    checked={legalChecks[check]}
                    onChange={handleLegalCheckChange}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor={check} className="text-sm font-medium text-gray-700">
                    {check}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Landlord Information */}
          <section className="rounded-lg bg-white py-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">임대인 정보</h2>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                {/* Profile photo would go here */}
                <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {user?.user_metadata.role === "landlord" ? "임대인 (Landlord)" : ""}
                </p>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`rounded-md bg-orange-500 px-6 py-3 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                submitting ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {submitting ? "등록 중..." : "매물 등록하기"}
            </button>
          </div>
        </form>
      </main>
    </div>
    </>
  )
}
