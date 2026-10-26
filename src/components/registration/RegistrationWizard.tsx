import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getString } from '../../data/registrationStrings';
import { R1ListingType } from './R1ListingType';
import { R2TypeSelect } from './R2TypeSelect';
import { R3BasicInfo } from './R3BasicInfo';
import { R4Contact } from './R4Contact';
import { R5YourService } from './R5YourService';
import { R6ServicePreferences } from './R6ServicePreferences';
import { R7Credentials } from './R7Credentials';
import { R8ReviewAndSubmit } from './R8ReviewAndSubmit';
import { RegistrationSuccess } from './RegistrationSuccess';
import { ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const RegistrationWizard: React.FC = () => {
  const {
    registrationDraft,
    setRegistrationStep,
    submitRegistration,
    isRegistrationSubmitted,
    setPortal,
    registrationCompleteness,
  } = useApp();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (isRegistrationSubmitted) {
    return <RegistrationSuccess />;
  }

  const handleClearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setGeneralError(null);
  };

  const currentStep = registrationDraft.step || 1;

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};
    setGeneralError(null);

    if (step === 1) {
      if (!registrationDraft.listingType) {
        stepErrors.listingType = 'Please select whether you are registering as a Sports Professional or Sports Corporation.';
      }
    } else if (step === 2) {
      if (registrationDraft.listingType === 'Sports Professional' && !registrationDraft.professionalType) {
        stepErrors.professionalType = 'Please select a professional category to continue.';
      }
      if (registrationDraft.listingType === 'Sports Corporation' && !registrationDraft.corporationType) {
        stepErrors.corporationType = 'Please select a corporation category to continue.';
      }
    } else if (step === 3) {
      if (registrationDraft.listingType === 'Sports Professional') {
        if (!registrationDraft.firstName.trim()) stepErrors.firstName = 'First name is required.';
        if (!registrationDraft.lastName.trim()) stepErrors.lastName = 'Last name is required.';
        if (!registrationDraft.country) stepErrors.country = 'Country is required.';
        if (!registrationDraft.nationality) stepErrors.nationality = 'Nationality is required.';
        if (!registrationDraft.bio.trim()) stepErrors.bio = 'Please provide a brief bio.';
      } else {
        if (!registrationDraft.corporationTitle.trim()) stepErrors.corporationTitle = 'Official entity name is required.';
        if (!registrationDraft.country) stepErrors.country = 'Country is required.';
        if (!registrationDraft.registeredCity.trim()) stepErrors.registeredCity = 'Registered city is required.';
        if (!registrationDraft.description.trim()) stepErrors.description = 'Please provide an overview of your organization.';
      }
    } else if (step === 4) {
      if (!registrationDraft.email.trim() || !registrationDraft.email.includes('@')) {
        stepErrors.email = 'A valid contact email address is required.';
      }
      if (!registrationDraft.phone.trim()) {
        stepErrors.phone = 'A primary phone number is required.';
      }
    } else if (step === 5) {
      if (registrationDraft.listingType === 'Sports Professional') {
        if (!registrationDraft.position) stepErrors.position = 'Please select your role or position.';
        if (!registrationDraft.sport) stepErrors.sport = 'Please select your primary sport.';
      } else {
        if (!registrationDraft.primaryCategory) {
          stepErrors.primaryCategory = 'Please select your primary service or facility classification.';
        }
      }
    } else if (step === 8) {
      if (!registrationDraft.agreeTerms) {
        stepErrors.agreeTerms = 'Please review and accept the directory terms and safeguarding protocols.';
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setGeneralError(Object.values(stepErrors)[0]);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 8) {
        setRegistrationStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        submitRegistration();
      }
    }
  };

  const handleBack = () => {
    setGeneralError(null);
    setErrors({});
    if (currentStep > 1) {
      setRegistrationStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPortal(null);
    }
  };

  const stepTitles = [
    'Choose Listing Type',
    'Category & Sector',
    'Basic Information',
    'Contact & Channels',
    'Service Classification',
    'Service Preferences',
    'Credentials & Experience',
    'Review & Submit',
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header & Stepper */}
      <div className="bg-panel border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted">
              Step {currentStep} of 8
            </div>
            <h1 className="text-xl font-space font-bold text-heading mt-0.5">
              {stepTitles[currentStep - 1]}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-muted">
              Profile Completeness: <span className="text-heading font-bold">{registrationCompleteness}%</span>
            </div>
            <button
              onClick={() => setPortal(null)}
              className="text-muted hover:text-foreground underline"
            >
              Save & Exit
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-page h-1.5 mt-4 overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>

        {/* Step Indicator Tabs */}
        <div className="hidden md:grid grid-cols-8 gap-1 mt-3">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <button
                key={stepNum}
                onClick={() => {
                  if (stepNum < currentStep || validateStep(currentStep)) {
                    setRegistrationStep(stepNum);
                  }
                }}
                className={`text-start p-1.5 transition-colors ${
                  isCurrent
                    ? 'border-b-2 border-accent text-heading font-bold'
                    : isCompleted
                    ? 'text-muted hover:text-foreground'
                    : 'text-muted/40 cursor-not-allowed'
                }`}
                disabled={stepNum > currentStep}
              >
                <div className="text-[10px] font-mono uppercase truncate">
                  {stepNum}. {title.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Error Notice */}
      {generalError && (
        <div className="mb-6 bg-accent/10 border border-accent/30 p-4 text-xs text-accent flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-panel border border-border p-6 sm:p-8">
        {currentStep === 1 && <R1ListingType error={errors.listingType} />}
        {currentStep === 2 && <R2TypeSelect error={errors.professionalType || errors.corporationType} />}
        {currentStep === 3 && <R3BasicInfo errors={errors} onClearError={handleClearError} />}
        {currentStep === 4 && <R4Contact errors={errors} onClearError={handleClearError} />}
        {currentStep === 5 && <R5YourService errors={errors} onClearError={handleClearError} />}
        {currentStep === 6 && <R6ServicePreferences errors={errors} onClearError={handleClearError} />}
        {currentStep === 7 && <R7Credentials errors={errors} onClearError={handleClearError} />}
        {currentStep === 8 && <R8ReviewAndSubmit errors={errors} onClearError={handleClearError} />}

        {/* Navigation Footer */}
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 border border-border bg-page text-foreground font-mono text-xs uppercase tracking-wider hover:border-foreground/40 transition-colors flex items-center gap-2 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Cancel' : getString('reg.stepper.back', 'Back')}</span>
          </button>

          {currentStep < 8 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-accent text-white font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 min-h-[44px]"
            >
              <span>{getString('reg.stepper.next', 'Next')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-accent text-white font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{getString('reg.r8.submitButton', 'Submit for Verification')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
