"use client"

import { useState, useEffect } from "react"
import { ChevronRight, X, Filter } from "lucide-react"
import { propertyService } from "@/app/api/get-properties"
import { type House, HouseCard } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const [majorRegion, setMajorRegion] = useState("서울")
  const [subRegion, setSubRegion] = useState("강남/역삼/삼성")
  const [showAllSubRegions, setShowAllSubRegions] = useState(false)
  const [properties, setProperties] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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
      "동대문/성동/중랑/광진",
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

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterElement = document.getElementById("region-filter")
      if (isFilterOpen && filterElement && !filterElement.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFilterOpen])

  // Prevent scrolling when filter is open on mobile
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFilterOpen])

  const handleMajorRegionChange = (region: string) => {
    setMajorRegion(region)
    setSubRegion(subRegionsMap[region][0]) // Set first sub-region as default
    setShowAllSubRegions(false) // Reset show all flag when changing major region
  }

  const handleSubRegionChange = (region: string) => {
    setSubRegion(region)
    setShowAllSubRegions(false)
    if (window.innerWidth < 768) {
      setIsFilterOpen(false) // Close filter on mobile after selection
    }
  }

  const handleShowAllClick = () => {
    setShowAllSubRegions(true)
    if (window.innerWidth < 768) {
      setIsFilterOpen(false) // Close filter on mobile after selection
    }
  }

  // Extract district name for display
  const getDisplayLocation = () => {
    if (showAllSubRegions) {
      return majorRegion + " 전체"
    } else {
      return subRegion
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-16 px-3 sm:px-6">
        {/* Breadcrumb */}
        <div className="pt-6 max-w-7xl mx-auto px-4 py-2 flex items-center text-sm">
          <a href="#" className="text-gray-500">
            홈
          </a>
          <span className="mx-1 text-gray-400">›</span>
          <a href="#" className="text-gray-500">
            부동산
          </a>
        </div>

        {/* Title and Mobile Filter Button */}
        <div className="max-w-7xl mx-auto px-4 pb-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            {majorRegion} {showAllSubRegions ? "전체" : getDisplayLocation()} 부동산
          </h1>
          <button
            className="md:hidden flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="h-4 w-4" />
            필터
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row">
          {/* Mobile Filter Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
              isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Sidebar - Desktop (always visible) and Mobile (slide in from bottom) */}
          <div
            id="region-filter"
            className={`
              md:w-64 md:mr-8 md:static md:block md:translate-y-0 md:pb-0
              fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-2xl md:rounded-none
              transform transition-transform duration-300 ease-in-out
              ${isFilterOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}
              max-h-[80vh] md:max-h-none overflow-auto
              shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:shadow-none
            `}
          >
            {/* Mobile Filter Header */}
            <div className="flex justify-between items-center p-4 border-b md:hidden">
              <h3 className="font-medium">지역 선택</h3>
              <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="md:sticky overflow-hidden p-4 md:p-0">
              {/* Region Filter */}
              <div className="flex flex-col md:flex-row rounded-xl shadow-md overflow-hidden">
                {/* Major Regions */}
                <div className="w-full md:w-1/3">
                  {majorRegions.map((region, index) => (
                    <button
                      key={region}
                      className={`w-full text-left px-4 py-3.5 text-sm transition-all duration-200 ${
                        majorRegion === region ? "bg-gray-900 text-white font-medium" : "bg-gray-50 hover:bg-gray-100"
                      } ${index === 0 ? "md:rounded-tl-xl" : ""} ${index === majorRegions.length - 1 ? "md:rounded-bl-xl" : ""}`}
                      onClick={() => handleMajorRegionChange(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>

                {/* Sub Regions */}
                <div className="w-full md:w-2/3 bg-white">
                  <div className="flex justify-between items-center py-2.5 px-4 border-b border-gray-100">
                    <span className="text-lg font-medium">{majorRegion}</span>
                    <button
                      className={`text-sm flex items-center text-gray-600 hover:text-gray-900 transition-colors ${showAllSubRegions ? "font-bold" : ""}`}
                      onClick={handleShowAllClick}
                    >
                      전체 <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="max-h-[300px] md:max-h-[500px] overflow-y-auto">
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
          <div className="flex-1 mt-6 md:mt-0 pb-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">해당 지역에 매물이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {properties.map((house) => (
                  <HouseCard key={house.id} house={house} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
