"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Search } from "lucide-react"
import { propertyService } from "@/app/api/get-properties"
import { type House, HouseCard } from "@/components/ui/card"

export default function PropertyListingPage() {
  const [majorRegion, setMajorRegion] = useState("서울")
  const [subRegion, setSubRegion] = useState("강남/역삼/삼성")
  const [showAllSubRegions, setShowAllSubRegions] = useState(false)
  const [properties, setProperties] = useState<House[]>([])
  const [loading, setLoading] = useState(true)

  // Major regions in Korea
  const majorRegions = ["서울", "경기", "인천", "강원", "경상", "전라", "충청", "제주"]

  // Sub-regions mapped to major regions
  const subRegionsMap: Record<string, string[]> = {
    서울: [
      "강남/서초",
      "강동/송파",
      "동작/관악",
      "영등포/금천/구로",
      "강서/양천",
      "마포/서대문/은평",
      "종로/중구/용산",
      "성북/강북/도봉/노원",
      "동대문/성동/중랑/광진"
    ],
  }

  // Fetch properties when region changes
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const data = await propertyService.getProperties({
          region: majorRegion,
          district: showAllSubRegions ? undefined : subRegion,
        })
        setProperties(data)
      } catch (error) {
        console.error("Failed to fetch properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [majorRegion, subRegion, showAllSubRegions])

  const handleMajorRegionChange = (region: string) => {
    setMajorRegion(region)
    setSubRegion(subRegionsMap[region][0]) // Set first sub-region as default
    setShowAllSubRegions(false) // Reset show all flag when changing major region
  }

  const handleSubRegionChange = (region: string) => {
    setSubRegion(region)
    setShowAllSubRegions(false)
  }

  const handleShowAllClick = () => {
    setShowAllSubRegions(true)
  }

  // Extract district name for display
  const getDisplayLocation = () => {
    if (showAllSubRegions) {
      return majorRegion + " 전체"
    } //else if (subRegion.includes("/")) {
     // return subRegion.split("/")[0]
    //}
    else { return subRegion }
  }

  return (
    <div className="min-h-screen bg-white py-16">

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 mb-4">
        <div className="flex items-center">
          <div className="relative">
            <button className="flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2">
              <span className="mr-1">{getDisplayLocation()}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 relative">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <div className="flex-1 px-4">
                <input type="text" placeholder="검색어를 입력해주세요" className="w-full py-2 outline-none" />
              </div>
              <button className="bg-gray-100 p-3 rounded-full">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center text-sm">
        <a href="#" className="text-gray-500">
          홈
        </a>
        <span className="mx-1 text-gray-400">›</span>
        <a href="#" className="text-gray-500">
          부동산
        </a>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <h1 className="text-2xl font-bold">
          {majorRegion} {showAllSubRegions ? "전체" : getDisplayLocation()} 부동산
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 md:mr-8">
          <div className="sticky top-24 overflow-hidden">
            {/* Region Filter */}
            <div className="flex rounded-xl shadow-md overflow-hidden">
              {/* Major Regions */}
              <div className="w-1/3">
                {majorRegions.map((region, index) => (
                  <button
                    key={region}
                    className={`w-full text-left px-4 py-3.5 text-sm transition-all duration-200 ${
                      majorRegion === region ? "bg-gray-900 text-white font-medium" : "bg-gray-50 hover:bg-gray-100"
                    } ${index === 0 ? "rounded-tl-xl" : ""} ${index === majorRegions.length - 1 ? "rounded-bl-xl" : ""}`}
                    onClick={() => handleMajorRegionChange(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Sub Regions */}
              <div className="w-2/3 bg-white">
                <div className="flex justify-between items-center py-2.5 px-4 border-b border-gray-100">
                  <span className="text-lg font-medium">{majorRegion}</span>
                  <button
                    className={`text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors ${showAllSubRegions ? "font-bold" : ""}`}
                    onClick={handleShowAllClick}
                  >
                    전체 <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {subRegionsMap[majorRegion]?.map((region) => (
                    <button
                      key={region}
                      className={`w-full text-left px-5 py-3.5 text-sm transition-all duration-200 hover:bg-gray-50 ${
                        !showAllSubRegions && subRegion === region ? "font-medium text-gray-900" : "text-gray-700"
                      }`}
                      onClick={() => handleSubRegionChange(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="flex-1 mt-6 md:mt-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">해당 지역에 매물이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

