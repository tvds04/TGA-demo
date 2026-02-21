import { useState } from 'react'
import { Users, Calendar, ChevronRight, Check, MessageCircle } from 'lucide-react'
import { groups, events, recentMessages } from '../data'

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('groups')
  const [rsvpState, setRsvpState] = useState({ 2: true }) // event 2 is pre-RSVP'd

  const toggleRsvp = (id) =>
    setRsvpState(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white px-5 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-xl font-extrabold text-tga-charcoal tracking-tight">Community</h1>
        <p className="text-xs text-tga-muted mt-0.5">Connect with farmers and TGA</p>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex gap-2 px-4 pt-3 pb-2 bg-white">
        {[
          { id: 'groups', label: 'Groups & Chats' },
          { id: 'events', label: 'Events' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 rounded-xl text-sm font-semibold transition-colors"
            style={{
              backgroundColor: activeTab === tab.id ? '#4A6228' : '#F8F5EF',
              color: activeTab === tab.id ? 'white' : '#6B6B6B',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto phone-scroll" style={{ backgroundColor: '#F8F5EF' }}>

        {activeTab === 'groups' && (
          <div className="px-4 py-3 flex flex-col gap-3">
            {/* Recent messages preview */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest mb-3">Recent Activity</p>
              {recentMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 items-start ${i < recentMessages.length - 1 ? 'mb-3 pb-3 border-b border-gray-50' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(143,174,107,0.25)' }}
                  >
                    <span className="text-[10px] font-extrabold" style={{ color: '#4A6228' }}>{msg.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span className="text-[11px] font-bold text-tga-charcoal">{msg.sender}</span>
                      <span className="text-[10px] text-tga-muted">in {msg.group}</span>
                      <span className="text-[10px] text-tga-muted ml-auto">{msg.time}</span>
                    </div>
                    <p className="text-[11px] text-tga-muted leading-relaxed line-clamp-2">{msg.message}</p>
                  </div>
                </div>
              ))}
              <button
                className="w-full mt-2 py-2 rounded-xl text-xs font-semibold border transition-colors"
                style={{ borderColor: '#4A6228', color: '#4A6228', backgroundColor: 'transparent' }}
              >
                Open Full Chat
              </button>
            </div>

            {/* Groups list */}
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest px-1">Your Groups</p>
            {groups.map(group => (
              <button
                key={group.id}
                className="bg-white rounded-2xl p-4 shadow-sm text-left flex items-center gap-3 w-full active:scale-[0.98] transition-transform"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(74,98,40,0.1)' }}
                >
                  {group.name === 'TGA Announcements'
                    ? <MessageCircle size={20} style={{ color: '#4A6228' }} />
                    : <Users size={20} style={{ color: '#4A6228' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-tga-charcoal">{group.name}</p>
                  <p className="text-[11px] text-tga-muted mt-0.5">{group.members} members &bull; {group.description}</p>
                </div>
                {group.unread > 0 ? (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#4A6228' }}
                  >
                    <span className="text-[10px] font-bold text-white">{group.unread}</span>
                  </div>
                ) : (
                  <ChevronRight size={15} className="text-tga-muted flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="px-4 py-3 flex flex-col gap-3 pb-6">
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest px-1">Upcoming Events</p>
            {events.map(event => {
              const isRsvpd = rsvpState[event.id] ?? event.rsvpd
              const iconBg =
                event.type === 'retreat'  ? '#4A6228' :
                event.type === 'buyer'    ? 'rgba(155,140,0,0.18)' :
                                            'rgba(143,174,107,0.25)'
              const iconColor =
                event.type === 'retreat' ? 'white' :
                event.type === 'buyer'   ? '#7a6e00' :
                                           '#4A6228'

              return (
                <div key={event.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: iconBg }}
                    >
                      <Calendar size={20} style={{ color: iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-tga-charcoal leading-snug">{event.title}</p>
                      <p className="text-[11px] text-tga-muted mt-0.5">{event.date} &bull; {event.time}</p>
                      <p className="text-[11px] text-tga-muted">{event.location}</p>
                      <p className="text-[11px] text-tga-charcoal/70 mt-2 leading-relaxed">{event.description}</p>
                      <button
                        onClick={() => toggleRsvp(event.id)}
                        className="mt-3 px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                        style={{
                          backgroundColor: isRsvpd ? 'rgba(143,174,107,0.2)' : '#4A6228',
                          color: isRsvpd ? '#4A6228' : 'white',
                        }}
                      >
                        {isRsvpd ? (
                          <><Check size={12} strokeWidth={3} /> RSVP'd</>
                        ) : (
                          'RSVP Now'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
