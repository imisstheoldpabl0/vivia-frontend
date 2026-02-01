'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/shared/Navigation';
import { WizardProgress } from '@/components/list-property/WizardProgress';
import { StepContainer } from '@/components/list-property/StepContainer';
import { TypeStep } from '@/components/list-property/steps/TypeStep';
import { LocationStep } from '@/components/list-property/steps/LocationStep';
import { DetailsStep } from '@/components/list-property/steps/DetailsStep';
import { PhotosStep } from '@/components/list-property/steps/PhotosStep';
import { PreviewStep } from '@/components/list-property/steps/PreviewStep';
import { Button } from '@/components/ui/Button';
import { WizardFormData } from '@/types/property';

const steps = [
  { id: 1, label: 'Tipo' },
  { id: 2, label: 'Ubicación' },
  { id: 3, label: 'Detalles' },
  { id: 4, label: 'Fotos' },
  { id: 5, label: 'Publicar' },
];

const initialFormData: WizardFormData = {
  type: null,
  listingType: 'buy',
  address: '',
  neighborhood: '',
  city: 'Madrid',
  price: 0,
  size: 0,
  bedrooms: 0,
  bathrooms: 0,
  floor: 0,
  description: '',
  features: [],
  images: [],
};

export default function ListPropertyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const updateFormData = useCallback((data: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== null;
      case 2:
        return formData.address.length > 0 && formData.neighborhood.length > 0;
      case 3:
        return (
          formData.price > 0 &&
          formData.size > 0 &&
          formData.description.length >= 50
        );
      case 4:
        return formData.images.length >= 1;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsPublished(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TypeStep data={formData} onUpdate={updateFormData} />;
      case 2:
        return <LocationStep data={formData} onUpdate={updateFormData} />;
      case 3:
        return <DetailsStep data={formData} onUpdate={updateFormData} />;
      case 4:
        return <PhotosStep data={formData} onUpdate={updateFormData} />;
      case 5:
        return <PreviewStep data={formData} />;
      default:
        return null;
    }
  };

  // Success state
  if (isPublished) {
    return (
      <main className="min-h-screen bg-bg">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center py-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-semibold text-text mb-4"
            >
              ¡Anuncio publicado!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted mb-8"
            >
              Tu propiedad ha sido enviada para revisión. Te notificaremos cuando esté activa.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Button onClick={() => router.push('/search')}>
                Ver propiedades
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(initialFormData);
                  setCurrentStep(1);
                  setIsPublished(false);
                }}
              >
                Publicar otra
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />

      <div className="pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-semibold text-text mb-2">
              Publica tu propiedad
            </h1>
            <p className="text-muted">
              Completa los siguientes pasos para publicar tu anuncio
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <WizardProgress steps={steps} currentStep={currentStep} />
          </motion.div>

          {/* Step content */}
          <div className="min-h-[400px]">
            <StepContainer stepKey={currentStep} direction={direction}>
              {renderStep()}
            </StepContainer>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
              Anterior
            </Button>

            <div className="text-sm text-muted">
              Paso {currentStep} de {steps.length}
            </div>

            {currentStep < 5 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Siguiente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            ) : (
              <Button onClick={handlePublish} isLoading={isSubmitting}>
                Publicar anuncio
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
