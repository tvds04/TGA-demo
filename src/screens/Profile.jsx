import { ChevronRight, Leaf, Star, Globe, Bell, Shield, HelpCircle, Award, TrendingUp } from 'lucide-react'
import { farmer } from '../data'

export default function ProfileScreen() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Green header */}
      <div className="flex-shrink-0 px-5 pt-4 pb-5" style={{ backgroundColor: '#4A6228' }}>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#8FAE6B' }}
          >
            <span className="text-2xl font-extrabold" style={{ color: '#4A6228' }}>{farmer.initials}</span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight">{farmer.name}</h1>
            <p className="text-sm" style={{ color: '#8FAE6B' }}>{farmer.farm}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {farmer.location} &bull; {farmer.acres} acres
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          >
            <Leaf size={12} style={{ color: '#8FAE6B' }} />
            <span className="text-xs font-medium" style={{ color: '#8FAE6B' }}>{farmer.partner}</span>
          </div>
          <div
            className="flex items-center rounded-full px-3 py-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          >
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Member since {farmer.joinedYear}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll" style={{ backgroundColor: '#F8F5EF' }}>
        {/* Stats row */}
        <div className="px-4 pt-4 pb-2 grid grid-cols-3 gap-2">
          {[
            { label: 'Lbs\nDelivered',     value: farmer.lbsDelivered.toLocaleString() },
            { label: 'Lbs Donated\nto Food Shelves', value: farmer.lbsDonated },
            { label: 'Season\nRevenue',     value: `$${(farmer.totalRevenue/1000).toFixed(1)}k` },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className="text-lg font-extrabold text-tga-charcoal leading-none">{stat.value}</p>
              <p className="text-[10px] text-tga-muted leading-tight mt-1 whitespace-pre-line">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Premium upgrade CTA */}
        {!farmer.premium && (
          <div
            className="mx-4 mt-2 rounded-2xl p-4 shadow-md"
            style={{ backgroundColor: '#4A6228' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Star size={16} fill="#9B8C00" style={{ color: '#9B8C00' }} />
              <p className="text-sm font-bold text-white">Upgrade to Premium</p>
            </div>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'rgba(143,174,107,0.85)' }}>
              Unlock the full lesson library, UMN certifications, advanced pricing tools, and fulfillment benchmarking.
            </p>
            <button className="w-full py-2.5 bg-white rounded-xl text-sm font-bold active:scale-95 transition-transform" style={{ color: '#4A6228' }}>
              View Premium Plans
            </button>
          </div>
        )}

        {/* Preferences */}
        <div className="px-4 mt-3">
          <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest mb-2 px-1">Preferences</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-3">
            {[
              { Icon: Globe,       label: 'Language',     value: 'English',            color: '#4A6228' },
              { Icon: Bell,        label: 'Notifications',value: 'On',                 color: '#9B8C00' },
              { Icon: TrendingUp,  label: 'Crop Profile', value: `${farmer.crops.length} crops`, color: '#8FAE6B' },
            ].map(({ Icon, label, value, color }, i) => (
              <button
                key={label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-gray-50' : ''}`}
              >
                <Icon size={16} style={{ color }} />
                <span className="flex-1 text-[13px] text-tga-charcoal text-left font-medium">{label}</span>
                <span className="text-xs text-tga-muted">{value}</span>
                <ChevronRight size={14} className="text-tga-muted" />
              </button>
            ))}
          </div>

          <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest mb-2 px-1">Support</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            {[
              { Icon: Award,       label: 'My Certifications',   color: '#9B8C00' },
              { Icon: Shield,      label: 'Privacy & Data',      color: '#6B6B6B' },
              { Icon: HelpCircle,  label: 'Contact TGA Support', color: '#6B6B6B' },
            ].map(({ Icon, label, color }, i) => (
              <button
                key={label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-gray-50' : ''}`}
              >
                <Icon size={16} style={{ color }} />
                <span className="flex-1 text-[13px] text-tga-charcoal text-left font-medium">{label}</span>
                <ChevronRight size={14} className="text-tga-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
