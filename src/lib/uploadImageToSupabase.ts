import { supabase } from "@/lib/supabase-client"
import type { UploadedImage, UploadedImageWithUrl } from "@/components/image-upload"

export const uploadImagesToSupabase = async (
  images: UploadedImage[],
  userId: string
): Promise<UploadedImageWithUrl[]> => {
  const uploadedImages: UploadedImageWithUrl[] = []

  if (!userId) {
    throw new Error("User ID is required for uploading images.")
  }

  for (const image of images) {
    const fileExt = image.name.split(".").pop()
    const filePath = `${userId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(filePath, image)

    if (uploadError) {
      console.error("이미지 업로드 실패:", uploadError.message)
      throw uploadError
    }

    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(filePath)

    if (!data?.publicUrl) {
      throw new Error("퍼블릭 URL을 가져올 수 없습니다.")
    }

    uploadedImages.push({
      ...image,
      url: data.publicUrl,
    })
  }
  console.log("업로드된 이미지:", uploadedImages)

  return uploadedImages
}