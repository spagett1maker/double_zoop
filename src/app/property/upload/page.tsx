'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BasicInfo from '@/components/property/upload/BasicInfo';
import LocationInfo from '@/components/property/upload/LocationInfo';
import DetailInfo from '@/components/property/upload/DetailInfo';
import ImageUpload from '@/components/property/upload/ImageUpload';
import { supabase } from '@/lib/supabase';
import type { Property } from '@/lib/supabase';
import { Stepper, StepperItem, StepperIndicator, StepperTitle, StepperSeparator, StepperTrigger } from "@/components/ui/stepper"
import Header from '@/components/header';

interface FormData {
  basicInfo: {
    title: string;
    propertyType: string;
    transactionType: string;
    price: string;
    description: string;
  };
  locationInfo: {
    address: string;
    detailAddress: string;
    zipCode: string;
    latitude: string;
    longitude: string;
  };
  detailInfo: {
    size: string;
    rooms: string;
    bathrooms: string;
    floor: string;
    totalFloors: string;
    parkingAvailable: boolean;
    elevator: boolean;
    moveInDate: string;
    features: string[];
  };
  images: string[];
}

const steps = [
  { id: 1, title: '기본 정보' },
  { id: 2, title: '위치 정보' },
  { id: 3, title: '상세 정보' },
  { id: 4, title: '이미지 업로드' },
];

export default function PropertyUploadPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      title: '',
      propertyType: '',
      transactionType: '',
      price: '',
      description: '',
    },
    locationInfo: {
      address: '',
      detailAddress: '',
      zipCode: '',
      latitude: '',
      longitude: '',
    },
    detailInfo: {
      size: '',
      rooms: '',
      bathrooms: '',
      floor: '',
      totalFloors: '',
      parkingAvailable: false,
      elevator: false,
      moveInDate: '',
      features: [],
    },
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = async (section: keyof FormData, data: FormData[keyof FormData]) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));

    // 마지막 단계에서 모든 데이터를 저장
    if (section === 'images') {
      await handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);

      const propertyData: Property = {
        // Basic Info
        title: formData.basicInfo.title,
        property_type: formData.basicInfo.propertyType,
        transaction_type: formData.basicInfo.transactionType,
        price: Number(formData.basicInfo.price),
        description: formData.basicInfo.description,

        // Location Info
        address: formData.locationInfo.address,
        detail_address: formData.locationInfo.detailAddress,
        zip_code: formData.locationInfo.zipCode,
        latitude: formData.locationInfo.latitude,
        longitude: formData.locationInfo.longitude,

        // Detail Info
        size: Number(formData.detailInfo.size),
        rooms: Number(formData.detailInfo.rooms),
        bathrooms: Number(formData.detailInfo.bathrooms),
        floor: Number(formData.detailInfo.floor),
        total_floors: Number(formData.detailInfo.totalFloors),
        parking_available: formData.detailInfo.parkingAvailable,
        elevator: formData.detailInfo.elevator,
        move_in_date: formData.detailInfo.moveInDate,
        features: formData.detailInfo.features,

        // Images
        images: formData.images,
      };

      const { data, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

      if (error) throw error;

      // 성공적으로 저장되면 상세 페이지로 이동
      router.push(`/property/${data.id}`);
    } catch (error) {
      console.error('Error saving property:', error);
      alert('매물 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo onNext={handleNext} updateFormData={updateFormData} data={formData.basicInfo} />;
      case 2:
        return <LocationInfo onNext={handleNext} onPrev={handlePrev} updateFormData={updateFormData} data={formData.locationInfo} />;
      case 3:
        return <DetailInfo onNext={handleNext} onPrev={handlePrev} updateFormData={updateFormData} data={formData.detailInfo} />;
      case 4:
        return (
          <ImageUpload
            onPrev={handlePrev}
            updateFormData={updateFormData}
            data={formData.images}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto py-8 px-4 pt-20">
        <div className="mb-8">
          <div className="mt-6">
            <Stepper defaultValue={currentStep} orientation="horizontal">
              {steps.map((step, index) => (
                <StepperItem key={step.id} step={step.id} completed={step.id < currentStep}>
                  <StepperTrigger>
                    <StepperIndicator />
                    <StepperTitle>{step.title}</StepperTitle>
                  </StepperTrigger>
                  {index < steps.length - 1 && <StepperSeparator />}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>
        {renderStep()}
      </div>
    </>
    
  );
} 