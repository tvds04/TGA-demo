import { useState } from 'react'
import { Check, Lock, Play, BookOpen, Clock, Award, ChevronRight } from 'lucide-react'
import { modules } from '../data'

export default function EducationScreen() {
  const [expandedId, setExpandedId] = useState(3) // open the in-progress module by default

  const completedCount = modules.level1.filter(m => m.completed).length
  const totalL1 = modules.level1.length
  const progressPct = Math.round((completedCount / totalL1) * 100)
  // SVG circle math
  const R = 22
  const circumference = 2 * Math.PI * R

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-5 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-xl font-extrabold text-tga-charcoal tracking-tight">Learning Hub</h1>
        <p className="text-xs text-tga-muted mt-0.5">Powered by TGA &times; University of Minnesota</p>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll" style={{ backgroundColor: '#F8F5EF' }}>
        {/* Progress card */}
        <div className="mx-4 mt-4 rounded-2xl p-4 shadow-md" style={{ backgroundColor: '#4A6228' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold" style={{ color: '#8FAE6B' }}>Level 1 Progress</p>
              <p className="text-white text-[17px] font-extrabold">{completedCount} of {totalL1} complete</p>
            </div>
            {/* Circular progress */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                <circle
                  cx="28" cy="28" r={R}
                  fill="none"
                  stroke="rgba(143,174,107,0.25)"
                  strokeWidth="4"
                />
                <circle
                  cx="28" cy="28" r={R}
                  fill="none"
                  stroke="#8FAE6B"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progressPct / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-extrabold">
                {progressPct}%
              </span>
            </div>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(143,174,107,0.2)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${progressPct}%`, backgroundColor: '#8FAE6B', transition: 'width 0.6s ease' }}
            />
          </div>
          <p className="text-[11px] mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Complete all Level 1 modules to unlock wholesale certification eligibility
          </p>
        </div>

        {/* Level 1 */}
        <div className="px-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest">Level 1 — Free</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(143,174,107,0.2)', color: '#4A6228' }}
            >
              Wholesale Readiness
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {modules.level1.map(mod => {
              const expanded = expandedId === mod.id
              return (
                <button
                  key={mod.id}
                  onClick={() => setExpandedId(expanded ? null : mod.id)}
                  className="bg-white rounded-2xl p-4 text-left w-full shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    {/* Status icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor:
                          mod.completed ? '#4A6228' :
                          mod.progress > 0 ? 'rgba(143,174,107,0.2)' :
                          '#F8F5EF',
                      }}
                    >
                      {mod.completed
                        ? <Check size={15} color="white" strokeWidth={3} />
                        : mod.progress > 0
                          ? <Play size={13} fill="#4A6228" style={{ color: '#4A6228' }} />
                          : <BookOpen size={15} style={{ color: '#6B6B6B' }} />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-semibold leading-snug"
                        style={{ color: mod.completed ? '#6B6B6B' : '#1A1A1A' }}
                      >
                        {mod.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <Clock size={10} className="text-tga-muted" />
                        <span className="text-[10px] text-tga-muted">{mod.duration}</span>
                        {mod.completed && (
                          <span className="text-[10px] font-semibold" style={{ color: '#4A6228' }}>
                            Quiz: {mod.quizScore}%
                          </span>
                        )}
                        {mod.progress > 0 && !mod.completed && (
                          <span className="text-[10px] font-semibold" style={{ color: '#9B8C00' }}>
                            {mod.progress}% done
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-tga-muted flex-shrink-0 transition-transform duration-200"
                      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </div>

                  {/* Expanded state */}
                  {expanded && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {mod.progress > 0 && !mod.completed && (
                        <>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-[10px] text-tga-muted">Progress</span>
                            <span className="text-[10px] font-semibold" style={{ color: '#4A6228' }}>{mod.progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ backgroundColor: '#E5E7EB' }}>
                            <div className="h-full rounded-full" style={{ width: `${mod.progress}%`, backgroundColor: '#4A6228' }} />
                          </div>
                          <button
                            className="w-full py-2 rounded-xl text-xs font-bold text-white"
                            style={{ backgroundColor: '#4A6228' }}
                          >
                            Continue Learning
                          </button>
                        </>
                      )}
                      {!mod.completed && !mod.progress && (
                        <button
                          className="w-full py-2 rounded-xl text-xs font-bold border"
                          style={{ borderColor: '#4A6228', color: '#4A6228', backgroundColor: 'transparent' }}
                        >
                          Start Module
                        </button>
                      )}
                      {mod.completed && (
                        <p className="text-[11px] text-tga-muted text-center">
                          Completed &bull; Quiz score: {mod.quizScore}%
                        </p>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Level 2 — Premium */}
        <div className="px-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest">Level 2 — Premium</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(155,140,0,0.15)', color: '#7a6e00' }}
            >
              Advanced Planning
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-3 opacity-70">
            {modules.level2.map(mod => (
              <div key={mod.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F8F5EF' }}>
                  <Lock size={14} style={{ color: '#8B1A1A' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-tga-charcoal leading-snug">{mod.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-tga-muted" />
                    <span className="text-[10px] text-tga-muted">{mod.duration}</span>
                  </div>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'rgba(139,26,26,0.1)', color: '#8B1A1A' }}
                >
                  Premium
                </span>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div
            className="rounded-2xl p-4 mb-4 border"
            style={{ backgroundColor: 'rgba(155,140,0,0.07)', borderColor: 'rgba(155,140,0,0.25)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Award size={18} style={{ color: '#9B8C00' }} />
              <p className="text-sm font-bold text-tga-charcoal">Unlock Premium Learning</p>
            </div>
            <p className="text-xs text-tga-muted mb-3 leading-relaxed">
              Access advanced business planning, UMN certifications, advisor Q&amp;A sessions, and the full cost calculator.
            </p>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white active:scale-95 transition-transform"
              style={{ backgroundColor: '#9B8C00' }}
            >
              Upgrade to Premium
            </button>
          </div>

          {/* Level 3 */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest">Level 3 — Premium</p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(139,26,26,0.1)', color: '#8B1A1A' }}
            >
              UMN Certifications
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-6 opacity-60">
            {modules.level3.map(mod => (
              <div key={mod.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F8F5EF' }}>
                  <Award size={16} style={{ color: '#8B1A1A' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-tga-charcoal leading-snug">{mod.title}</p>
                  <p className="text-[10px] text-tga-muted mt-0.5">{mod.duration}</p>
                </div>
                <Lock size={13} style={{ color: '#8B1A1A' }} className="flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
