export {}

declare global {
  namespace kakao.maps {
    function load(callback: () => void): void

    class LatLng {
      constructor(latitude: number, longitude: number)
    }

    interface MapOptions {
      center: LatLng
      level?: number
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions)
      setCenter(latlng: LatLng): void
    }

    interface MarkerOptions {
      map: Map
      position: LatLng
    }

    class Marker {
      constructor(options: MarkerOptions)
    }

    namespace services {
      type Status = "OK" | "ZERO_RESULT" | "ERROR"

      interface AddressResult {
        x: string
        y: string
      }

      type AddressSearchCallback = (
        result: AddressResult[],
        status: Status
      ) => void

      class Geocoder {
        addressSearch(address: string, callback: AddressSearchCallback): void
      }
    }
  }

  interface Window {
    kakao: typeof kakao
  }

  const kakao: {
    maps: typeof kakao.maps
  }
}

export {}

declare global {
  interface Window {
    ChannelIO?: (...args: any[]) => void
    ChannelIOInitialized?: boolean
  }
}
