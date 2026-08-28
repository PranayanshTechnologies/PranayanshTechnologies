import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions, engagementModels } from "../../data/engagementModels";
import type { QuizOption } from "../../types/content";

export function EngagementModelQuiz() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<QuizOption[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  function handleSelectOption(option: QuizOption) {
    const updated = [...selectedAnswers];
    updated[currentStep] = option;
    setSelectedAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function handlePrevStep() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
  }

  // Calculate winner model based on frequency of affinities
  const recommendedModelId = (() => {
    if (selectedAnswers.length === 0) return "dedicated-crew";
    const counts: Record<string, number> = {};
    selectedAnswers.forEach((ans) => {
      counts[ans.modelAffinity] = (counts[ans.modelAffinity] || 0) + 1;
    });

    let winner = "dedicated-crew";
    let max = -1;
    for (const [key, val] of Object.entries(counts)) {
      if (val > max) {
        max = val;
        winner = key;
      }
    }
    return winner;
  })();

  const winningModel = engagementModels.find((m) => m.id === recommendedModelId) || engagementModels[0];
  const question = quizQuestions[currentStep];

  function handleProceedToQuote() {
    navigate("/get-a-quote", {
      state: {
        serviceId: winningModel.id,
        projectDescription: `Recommended via Engagement Model Diagnostic (${winningModel.name}). Answers: ${selectedAnswers
          .map((a) => a.label)
          .join(" | ")}`,
      },
    });
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {!quizFinished ? (
        <div>
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Engagement Model Diagnostic
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Find Your Ideal Collaboration Model
              </h3>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
              Step {currentStep + 1} of {quizQuestions.length}
            </span>
          </div>

          {/* Step Indicator Bar */}
          <div className="mt-4 flex gap-2">
            {quizQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  idx <= currentStep ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-800"
                }`}
              />
            ))}
          </div>

          {/* Question Body */}
          <div className="mt-8">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-50">
              {question.question}
            </h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{question.context}</p>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {question.options.map((opt) => {
                const isSelected = selectedAnswers[currentStep]?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full rounded-2xl border p-4 sm:p-5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/70 shadow-md ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/60"
                        : "border-gray-200 bg-white hover:border-brand-300 hover:bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                          {opt.label}
                        </p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {opt.description}
                        </p>
                      </div>
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        {isSelected && <span className="text-xs">✓</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-30 dark:text-gray-400 dark:hover:text-gray-100"
            >
              ← Previous Question
            </button>
            <span className="text-xs text-gray-400">Select an option to advance automatically</span>
          </div>
        </div>
      ) : (
        /* Result State */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                ✓ Diagnostic Complete
              </span>
              <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-gray-50 sm:text-3xl">
                Your Ideal Match: {winningModel.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ↻ Retake Quiz
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: Summary & Benefits */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {winningModel.description}
              </p>

              <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Why this model fits your answers:
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-gray-700 dark:text-gray-300">
                  {winningModel.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Operational Details & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-brand-200 bg-brand-50/50 p-5 dark:border-brand-900 dark:bg-gray-800/80">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Governance:</span>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {winningModel.managementResponsibility}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Billing Model:</span>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {winningModel.billingStructure}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Onboarding Speed:</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">
                    {winningModel.onboardingTime}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleProceedToQuote}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-700"
                >
                  Configure Quote for {winningModel.name}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

