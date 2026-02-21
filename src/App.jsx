import { useState } from 'react'
import { Home, Users, BarChart2, BookOpen, User } from 'lucide-react'
import OnboardingScreen from './screens/Onboarding'
import HomeScreen from './screens/Home'
import CommunityScreen from './screens/Community'
import InsightsScreen from './screens/Insights'
import EducationScreen from './screens/Education'
import ProfileScreen from './screens/Profile'

const tabs = [
  { id: 'home',      label: 'Home',      Icon: Home },
  { id: 'community', label: 'Community', Icon: Users },
  { id: 'insights',  label: 'Insights',  Icon: BarChart2 },
  { id: 'education', label: 'Learn',     Icon: BookOpen },
  { id: 'profile',   label: 'Profile',   Icon: User },
]

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  return (
    // Full-screen dark green background with subtle dot pattern
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#3a4d1f',
        backgroundImage: 'radial-gradient(circle, rgba(143,174,107,0.18) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col bg-white overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          border: '8px solid #1a1a1a',
          boxShadow: '0 60px 120px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Status bar */}
        <div className="flex-shrink-0 h-12 bg-white flex items-center justify-between px-7 pt-1 relative">
          <span className="text-[13px] font-semibold text-tga-charcoal tracking-tight">9:41</span>
          {/* Dynamic island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-7 bg-gray-900 rounded-full" />
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex gap-[2px] items-end h-3">
              {[40, 55, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm bg-tga-charcoal"
                  style={{ height: `${h * 0.12}px` }}
                />
              ))}
            </div>
            {/* Battery */}
            <div className="w-6 h-[11px] border-[1.5px] border-tga-charcoal rounded-[3px] relative ml-0.5">
              <div className="absolute left-[2px] top-[1px] bottom-[1px] bg-tga-charcoal rounded-[1px]" style={{ width: '70%' }} />
              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[3px] h-[5px] bg-tga-charcoal rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {!onboardingComplete ? (
            <OnboardingScreen onComplete={() => setOnboardingComplete(true)} />
          ) : (
            <>
              {/* Active screen */}
              <div className="flex-1 overflow-hidden min-h-0">
                {activeTab === 'home'      && <HomeScreen />}
                {activeTab === 'community' && <CommunityScreen />}
                {activeTab === 'insights'  && <InsightsScreen />}
                {activeTab === 'education' && <EducationScreen />}
                {activeTab === 'profile'   && <ProfileScreen />}
              </div>

              {/* Bottom tab bar */}
              <div className="flex-shrink-0 bg-white border-t border-gray-100">
                <div className="flex">
                  {tabs.map(({ id, label, Icon }) => {
                    const active = activeTab === id
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all duration-150"
                      >
                        <Icon
                          size={21}
                          strokeWidth={active ? 2.5 : 1.8}
                          style={{ color: active ? '#4A6228' : '#6B6B6B' }}
                        />
                        <span
                          className="text-[10px] font-medium"
                          style={{ color: active ? '#4A6228' : '#6B6B6B' }}
                        >
                          {label}
                        </span>
                        {active && (
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#4A6228' }} />
                        )}
                      </button>
                    )
                  })}
                </div>
                {/* Home indicator */}
                <div className="flex justify-center py-1.5">
                  <div className="w-32 h-1 bg-gray-200 rounded-full" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Demo label below phone */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs font-medium tracking-[0.2em] uppercase select-none">
        GrowTogether &mdash; Case Competition Demo
      </div>
    </div>
  )
}
