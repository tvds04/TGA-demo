import { useState } from 'react'
import { ChevronRight, Check, Leaf } from 'lucide-react'

const CROPS = [
  "Hmong Eggplant", "Thai Basil", "Bitter Melon", "Lemongrass",
  "Bok Choy", "Napa Cabbage", "Garlic Chives", "Hot Peppers",
  "Snap Peas", "Cherry Tomatoes", "Kale", "Swiss Chard",
  "Cilantro", "Green Onions", "Daikon Radish", "Taro Root",
]

const GOALS = [
  "Increase wholesale revenue",
  "Improve fulfillment rate",
  "Learn business planning",
  "Connect with other farmers",
  "Expand crop variety",
  "Get certified through UMN",
]

const LANGUAGES = [
  { code: 'en',  label: 'English',  native: 'English' },
  { code: 'hmn', label: 'Hmong',    native: 'Hmoob' },
  { code: 'es',  label: 'Spanish',  native: 'Espanol' },
  { code: 'so',  label: 'Somali',   native: 'Somali' },
]

const TECH_LEVELS = [
  { value: 1, label: "Not very comfortable",   desc: "I prefer simple, guided steps" },
  { value: 2, label: "Somewhat comfortable",   desc: "I use apps and text regularly" },
  { value: 3, label: "Very comfortable",       desc: "I pick up new technology easily" },
]

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [selectedCrops, setSelectedCrops] = useState(["Hmong Eggplant", "Thai Basil", "Bitter Melon", "Lemongrass"])
  const [selectedGoals, setSelectedGoals] = useState(["Increase wholesale revenue", "Learn business planning"])
  const [language, setLanguage] = useState('en')
  const [techLevel, setTechLevel] = useState(2)

  const toggleCrop = (crop) =>
    setSelectedCrops(prev => prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop])

  const toggleGoal = (goal) =>
    setSelectedGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal])

  // ── Welcome ──────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-5">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#4A6228' }}
        >
          <Leaf size={38} color="white" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-tga-charcoal tracking-tight">GrowTogether</h1>
          <p className="text-tga-muted text-sm mt-1 font-medium">by The Good Acre</p>
        </div>

        <p className="text-tga-charcoal text-[15px] leading-relaxed max-w-xs">
          Your personalized hub for TGA tools, market insights, and your farmer community.
        </p>

        <button
          onClick={() => setStep(1)}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          style={{ backgroundColor: '#4A6228' }}
        >
          Get Started
          <ChevronRight size={18} />
        </button>

        <p className="text-tga-muted text-xs">Takes about 1 minute to set up your experience</p>
      </div>
    )
  }

  // ── Completion ────────────────────────────────────────────
  if (step === 5) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4A6228' }}>
          <Check size={34} color="white" strokeWidth={3} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-tga-charcoal">You're all set!</h2>
          <p className="text-tga-muted mt-2 text-sm leading-relaxed">
            Your feed has been personalized for your crops, goals, and preferences.
          </p>
        </div>

        <div className="w-full bg-tga-offwhite rounded-2xl p-4 text-left border border-gray-100">
          <p className="text-[10px] font-semibold text-tga-muted uppercase tracking-widest mb-2">Your Profile Summary</p>
          <p className="text-sm font-semibold text-tga-charcoal">
            {selectedCrops.slice(0, 3).join(', ')}
            {selectedCrops.length > 3 ? ` +${selectedCrops.length - 3} more` : ''}
          </p>
          <p className="text-xs text-tga-muted mt-1">
            {selectedGoals[0]}
            {selectedGoals.length > 1 ? ` & ${selectedGoals.length - 1} more goal${selectedGoals.length > 2 ? 's' : ''}` : ''}
          </p>
          <p className="text-xs text-tga-muted mt-0.5">
            {LANGUAGES.find(l => l.code === language)?.label} &bull; Tech comfort:{' '}
            {TECH_LEVELS.find(t => t.value === techLevel)?.label.split(' ')[0].toLowerCase()}
          </p>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-md active:scale-95 transition-transform"
          style={{ backgroundColor: '#4A6228' }}
        >
          Go to My Feed
        </button>
      </div>
    )
  }

  // ── Steps 1-4 ─────────────────────────────────────────────
  const totalSteps = 4
  const canContinue =
    (step === 1 && selectedCrops.length > 0) ||
    (step === 2 && selectedGoals.length > 0) ||
    step === 3 ||
    step === 4

  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="px-6 pt-4 pb-2 flex-shrink-0">
        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{ backgroundColor: i < step ? '#4A6228' : '#E5E7EB' }}
            />
          ))}
        </div>
        <p className="text-xs text-tga-muted">Step {step} of {totalSteps}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto phone-scroll px-6 pb-4">

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-tga-charcoal mb-1">What do you grow?</h2>
            <p className="text-sm text-tga-muted mb-4">Select all that apply. We'll filter your feed accordingly.</p>
            <div className="flex flex-wrap gap-2">
              {CROPS.map(crop => {
                const selected = selectedCrops.includes(crop)
                return (
                  <button
                    key={crop}
                    onClick={() => toggleCrop(crop)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all active:scale-95"
                    style={{
                      backgroundColor: selected ? '#4A6228' : 'white',
                      color: selected ? 'white' : '#1A1A1A',
                      borderColor: selected ? '#4A6228' : '#E5E7EB',
                    }}
                  >
                    {selected && <Check size={11} className="inline mr-1" strokeWidth={3} />}
                    {crop}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-tga-charcoal mb-1">What are your goals?</h2>
            <p className="text-sm text-tga-muted mb-4">Select everything that matters to you this season.</p>
            <div className="flex flex-col gap-2">
              {GOALS.map(goal => {
                const selected = selectedGoals.includes(goal)
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className="px-4 py-3 rounded-xl text-sm font-medium border text-left flex items-center gap-3 transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: selected ? 'rgba(74,98,40,0.05)' : 'white',
                      borderColor: selected ? '#4A6228' : '#E5E7EB',
                      color: '#1A1A1A',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: selected ? '#4A6228' : '#D1D5DB',
                        backgroundColor: selected ? '#4A6228' : 'transparent',
                      }}
                    >
                      {selected && <Check size={10} color="white" strokeWidth={3} />}
                    </div>
                    {goal}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-tga-charcoal mb-1">Preferred language</h2>
            <p className="text-sm text-tga-muted mb-4">GrowTogether is available in 4 languages from day one.</p>
            <div className="flex flex-col gap-2">
              {LANGUAGES.map(lang => {
                const selected = language === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="px-4 py-4 rounded-xl text-sm font-medium border text-left flex items-center justify-between transition-all"
                    style={{
                      backgroundColor: selected ? 'rgba(74,98,40,0.05)' : 'white',
                      borderColor: selected ? '#4A6228' : '#E5E7EB',
                    }}
                  >
                    <div>
                      <span className="font-semibold text-tga-charcoal">{lang.label}</span>
                      {lang.native !== lang.label && (
                        <span className="text-tga-muted ml-2 text-xs">{lang.native}</span>
                      )}
                    </div>
                    {selected && <Check size={17} strokeWidth={2.5} style={{ color: '#4A6228' }} />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-tga-charcoal mb-1">Tech comfort level</h2>
            <p className="text-sm text-tga-muted mb-4">We'll adjust how content and tools are presented to you.</p>
            <div className="flex flex-col gap-3">
              {TECH_LEVELS.map(level => {
                const selected = techLevel === level.value
                return (
                  <button
                    key={level.value}
                    onClick={() => setTechLevel(level.value)}
                    className="px-4 py-4 rounded-xl border text-left transition-all"
                    style={{
                      backgroundColor: selected ? 'rgba(74,98,40,0.05)' : 'white',
                      borderColor: selected ? '#4A6228' : '#E5E7EB',
                    }}
                  >
                    <p className="text-sm font-semibold" style={{ color: selected ? '#4A6228' : '#1A1A1A' }}>
                      {level.label}
                    </p>
                    <p className="text-xs text-tga-muted mt-0.5">{level.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="px-6 pb-4 flex-shrink-0">
        <button
          onClick={() => setStep(s => s + 1)}
          disabled={!canContinue}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform disabled:opacity-50"
          style={{ backgroundColor: '#4A6228' }}
        >
          {step === totalSteps ? 'Finish Setup' : 'Continue'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
