import { useState } from 'react'
import { Bell, TrendingUp, Users, BookOpen, Calendar, Megaphone, X, ChevronRight } from 'lucide-react'
import { farmer, feedItems } from '../data'

const tagColors = {
  green: { bg: 'rgba(74,98,40,0.1)',   text: '#4A6228' },
  gold:  { bg: 'rgba(155,140,0,0.12)', text: '#7a6e00' },
  sage:  { bg: 'rgba(143,174,107,0.2)',text: '#4A6228' },
}

const iconMap = {
  'trending-up': TrendingUp,
  'users':       Users,
  'book':        BookOpen,
  'calendar':    Calendar,
  'megaphone':   Megaphone,
}

export default function HomeScreen() {
  const [alertDismissed, setAlertDismissed] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = farmer.name.split(' ')[0]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Green header */}
      <div className="flex-shrink-0 px-5 pt-3 pb-5" style={{ backgroundColor: '#4A6228' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium" style={{ color: '#8FAE6B' }}>{greeting},</p>
            <h1 className="text-xl font-extrabold text-white tracking-tight">{firstName}!</h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
              <Bell size={17} color="white" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-tga-green" style={{ backgroundColor: '#9B8C00' }} />
            </button>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8FAE6B' }}>
              <span className="text-sm font-extrabold" style={{ color: '#4A6228' }}>{farmer.initials}</span>
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Fulfillment',    value: `${farmer.fulfillmentRate}%`, sub: '+7% vs avg' },
            { label: 'Active Orders',  value: farmer.activeOrders,          sub: 'this week' },
            { label: 'Lbs Delivered',  value: `${(farmer.lbsDelivered/1000).toFixed(1)}k`, sub: 'this season' },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl px-2 py-2.5 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <p className="text-[17px] font-extrabold text-white leading-none">{stat.value}</p>
              <p className="text-[10px] font-medium mt-1" style={{ color: '#8FAE6B' }}>{stat.label}</p>
              <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feed area */}
      <div className="flex-1 overflow-y-auto phone-scroll" style={{ backgroundColor: '#F8F5EF' }}>

        {/* Deadline banner */}
        {!alertDismissed && (
          <div className="mx-4 mt-4 rounded-2xl p-3 flex items-start gap-3 border" style={{ backgroundColor: 'rgba(155,140,0,0.08)', borderColor: 'rgba(155,140,0,0.25)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(155,140,0,0.18)' }}>
              <Calendar size={15} style={{ color: '#9B8C00' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold" style={{ color: '#7a6e00' }}>Deadline in 22 days</p>
              <p className="text-[11px] text-tga-charcoal mt-0.5 leading-relaxed">
                Spring crop plan due March 15 — contact Bryceson to schedule your planning session.
              </p>
            </div>
            <button onClick={() => setAlertDismissed(true)} className="text-tga-muted flex-shrink-0 p-0.5">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Section heading */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-tga-charcoal">Your Feed</h2>
          <span className="text-[11px] text-tga-muted">Filtered for your crops</span>
        </div>

        {/* Cards */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          {feedItems.map(item => {
            const Icon = iconMap[item.icon] || Megaphone
            const tc = tagColors[item.tagColor]
            const expanded = expandedCard === item.id

            return (
              <button
                key={item.id}
                onClick={() => setExpandedCard(expanded ? null : item.id)}
                className="bg-white rounded-2xl p-4 text-left w-full shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F8F5EF' }}>
                    <Icon size={16} style={{ color: '#4A6228' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: tc.bg, color: tc.text }}
                      >
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-tga-muted">{item.time}</span>
                    </div>
                    <p className="text-[13px] font-semibold text-tga-charcoal leading-snug">{item.title}</p>

                    {expanded && (
                      <p className="text-[12px] text-tga-muted mt-1.5 leading-relaxed">{item.body}</p>
                    )}

                    {item.progress !== undefined && expanded && (
                      <div className="mt-2.5">
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] text-tga-muted">Module progress</span>
                          <span className="text-[10px] font-semibold" style={{ color: '#4A6228' }}>{item.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E7EB' }}>
                          <div className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: '#4A6228' }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight
                    size={14}
                    className="flex-shrink-0 text-tga-muted transition-transform duration-200"
                    style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
