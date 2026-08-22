"use client";

import React, { useState } from 'react';
import { BUDGET_RANGES, PROJECT_TYPES } from './ProjectFormData';
import ContactFooter from '../ContactFooter';


export const ProjectForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    projectType: '',
    companyName: '',
    clientName: '',
    clientEmail: '',
    projectIdea: '',
    budgetRange: '',
  });

  // Handlers
  const handleSelectType = (type: string) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const handleSelectBudget = (budget: string) => {
    setFormData((prev) => ({ ...prev, budgetRange: budget }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Validation per step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== '';
      case 2:
        return formData.companyName.trim() !== '';
      case 3:
        return (
          formData.clientName.trim() !== '' &&
          formData.clientEmail.trim() !== ''
        );
      case 4:
        return formData.projectIdea.trim() !== '';
      case 5:
        return formData.budgetRange !== '';
      default:
        return false;
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F9F8F6] text-[#111111] px-6 sm:px-12 md:px-16 lg:px-24 py-12 lg:py-8 flex flex-col justify-between select-none">
      
      {/* =========================================================
          HEADER & PROGRESS BAR
          ========================================================= */}
      <div data-intake="header" className="w-full max-w-4xl mx-auto space-y-4 z-20">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-widest text-black/60 uppercase">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-black">PROJECT / INTAKE_001</span>
            <span className="text-black/30">//</span>
            <span className="text-[9px] text-black/40">ALYOXA</span>
          </div>
          <div>
            {!isSubmitted ? (
              <span>0{currentStep} — 05</span>
            ) : (
              <span>COMPLETE</span>
            )}
          </div>
        </div>

        {/* Thin Minimal Progress Line */}
        <div className="w-full h-[1px] bg-black/10 relative overflow-hidden">
          <div
            data-intake="progress-line"
            className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out"
            style={{
              width: isSubmitted ? '100%' : `${(currentStep / 5) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* =========================================================
          MAIN INTAKE CONTAINER (NO OUTER CARDS)
          ========================================================= */}
      <div className="w-full max-w-3xl mx-auto my-auto py-8 z-20">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Header intro section */}
            <div data-intake="intro" className="space-y-3 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl  font-bold tracking-tight text-black uppercase">
                START A PROJECT.
              </h2>
              <p className="text-xs sm:text-sm  text-black/60 max-w-lg">
                Tell us what you're building, where you're going, and how we can help bring it to life.
              </p>
            </div>

            {/* =========================================================
                DYNAMIC STEPS (TARGETABLE FOR ANIMATIONS)
                ========================================================= */}
            <div data-intake="step-container" className="min-h-[260px] flex flex-col justify-center">
              
              {/* -----------------------------------------------------
                  STEP 01: PROJECT TYPE
                  ----------------------------------------------------- */}
              {currentStep === 1 && (
                <div data-intake="step-1" className="space-y-6">
                  <label className="block text-xs sm:text-sm font-mono tracking-widest uppercase text-black/50">
                    [ 01 ] WHAT ARE WE BUILDING?
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleSelectType(type)}
                          className={`px-5 py-4 text-left text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 border flex items-center justify-between ${
                            isSelected
                              ? 'border-black bg-black text-white'
                              : 'border-black/15 bg-transparent text-black/80 hover:border-black/40'
                          }`}
                        >
                          <span>{type}</span>
                          {isSelected && (
                            <span className="text-white text-[9px]">•</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------
                  STEP 02: COMPANY / BRAND NAME
                  ----------------------------------------------------- */}
              {currentStep === 2 && (
                <div data-intake="step-2" className="space-y-6">
                  <label className="block text-xs sm:text-sm font-mono tracking-widest uppercase text-black/50">
                    [ 02 ] WHO ARE WE BUILDING IT FOR?
                  </label>

                  <div className="pt-4 space-y-2">
                    <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest block">
                      COMPANY / BRAND / PROJECT NAME
                    </span>
                    <input
                      type="text"
                      autoFocus
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      placeholder="Type company or project identity..."
                      className="w-full bg-transparent border-b border-black/20 focus:border-black pb-3 text-lg sm:text-2xl  text-black focus:outline-none transition-colors rounded-none placeholder:text-black/20"
                    />
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------
                  STEP 03: CLIENT NAME & EMAIL
                  ----------------------------------------------------- */}
              {currentStep === 3 && (
                <div data-intake="step-3" className="space-y-8">
                  <label className="block text-xs sm:text-sm font-mono tracking-widest uppercase text-black/50">
                    [ 03 ] WHAT'S YOUR NAME?
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest block">
                        YOUR NAME
                      </span>
                      <input
                        type="text"
                        autoFocus
                        value={formData.clientName}
                        onChange={(e) =>
                          setFormData({ ...formData, clientName: e.target.value })
                        }
                        placeholder="First & last name"
                        className="w-full bg-transparent border-b border-black/20 focus:border-black pb-3 text-base sm:text-xl  text-black focus:outline-none transition-colors rounded-none placeholder:text-black/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest block">
                        EMAIL
                      </span>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, clientEmail: e.target.value })
                        }
                        placeholder="name@domain.com"
                        className="w-full bg-transparent border-b border-black/20 focus:border-black pb-3 text-base sm:text-xl  text-black focus:outline-none transition-colors rounded-none placeholder:text-black/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------
                  STEP 04: PROJECT IDEA & BRIEF
                  ----------------------------------------------------- */}
              {currentStep === 4 && (
                <div data-intake="step-4" className="space-y-6">
                  <label className="block text-xs sm:text-sm font-mono tracking-widest uppercase text-black/50">
                    [ 04 ] TELL US ABOUT THE IDEA.
                  </label>

                  <div className="pt-2 space-y-2">
                    <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest block">
                      THE IDEA, THE PROBLEM, THE GOAL...
                    </span>
                    <textarea
                      rows={5}
                      autoFocus
                      value={formData.projectIdea}
                      onChange={(e) =>
                        setFormData({ ...formData, projectIdea: e.target.value })
                      }
                      placeholder="Outline the scope, objectives, timeline, or vision..."
                      className="w-full bg-transparent border-b border-black/20 focus:border-black pb-3 text-sm sm:text-base  text-black focus:outline-none transition-colors rounded-none resize-none placeholder:text-black/20 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------
                  STEP 05: BUDGET RANGE
                  ----------------------------------------------------- */}
              {currentStep === 5 && (
                <div data-intake="step-5" className="space-y-6">
                  <label className="block text-xs sm:text-sm font-mono tracking-widest uppercase text-black/50">
                    [ 05 ] WHAT RANGE ARE WE WORKING WITH?
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {BUDGET_RANGES.map((budget) => {
                      const isSelected = formData.budgetRange === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => handleSelectBudget(budget)}
                          className={`px-4 py-4 text-center text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 border ${
                            isSelected
                              ? 'border-black bg-black text-white'
                              : 'border-black/15 bg-transparent text-black/80 hover:border-black/40'
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* =========================================================
                NAVIGATION & CONTROLS
                ========================================================= */}
            <div data-intake="controls" className="pt-6 border-t border-black/10 flex items-center justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-[10px] font-mono text-black/50 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    <span>←</span>
                    <span>PREVIOUS</span>
                  </button>
                )}
              </div>

              <div>
                {currentStep < 5 ? (
                  <button
                    type="button"
                    disabled={!isStepValid()}
                    onClick={handleNext}
                    className={`px-6 py-3 text-[10px] font-mono tracking-widest uppercase transition-all duration-200 border flex items-center gap-3 ${
                      isStepValid()
                        ? 'bg-black text-white border-black hover:bg-black/80 cursor-pointer'
                        : 'bg-black/5 text-black/30 border-black/10 cursor-not-allowed'
                    }`}
                  >
                    <span>NEXT</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid()}
                    className={`px-8 py-4 text-[11px] font-mono tracking-widest uppercase transition-all duration-200 border flex items-center gap-4 ${
                      isStepValid()
                        ? 'bg-black text-white border-black hover:bg-black/80 cursor-pointer shadow-md'
                        : 'bg-black/5 text-black/30 border-black/10 cursor-not-allowed'
                    }`}
                  >
                    <span>START THE PROJECT</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>

          </form>
        ) : (
          /* =========================================================
             CONFIRMATION / SUCCESS STATE
             ========================================================= */
          <div data-intake="success" className="py-12 space-y-8 text-center sm:text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-black/40 tracking-widest uppercase block">
                [ TRANSMISSION COMPLETE ]
              </span>
              <h2 className="text-4xl sm:text-6xl  font-bold tracking-tight text-black uppercase">
                PROJECT RECEIVED.
              </h2>
              <p className="text-xs sm:text-sm  text-black/70 max-w-md leading-relaxed">
                Thanks for reaching out. We'll review the brief and get back to you soon.
              </p>
            </div>

            <div className="pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-[9px] font-mono text-black/40 uppercase tracking-widest">
              <div>REF. ALYOXA_001</div>
              <div>STATUS / RECEIVED</div>
              <div>READY WHEN YOU ARE</div>
            </div>
          </div>
        )}
      </div>

        <ContactFooter/>
    </section>
  );
};

export default ProjectForm;