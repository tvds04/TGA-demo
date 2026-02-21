import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Calculator, ChevronRight, CheckCircle, AlertCircle, Package } from 'lucide-react'
import { farmer, orders, fulfillmentData, cropBenchmarks } from '../data'

const statusStyle = {
  confirmed: { bg: 'rgba(143,174,107,0.2)', text: '#4A6228' },
  pending:   { bg: 'rgba(155,140,0,0.15)',  text: '#7a6e00' },
}

// Custom tooltip for the bar chart
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-tga-charcoal mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.fill }}>
          {p.dataKey === 'you' ? 'You' : 'Network'}: {p.value}%
        </p>
      ))}
    </div>
  )
}

export default function InsightsScreen() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [calcInputs, setCalcInputs] = useState({
    crop: 'Hmong Eggplant',
    yield: '80',
    seed: '12',
    labor: '8',
    packaging: '18',
    other: '5',
  })
  const [calcResult, setCalcResult] = useState(null)

  const handleCalc = () => {
    const yieldLbs  = parseFloat(calcInputs.yield) || 0
    const totalCost = (parseFloat(calcInputs.seed)      || 0)
                    + (parseFloat(calcInputs.labor)     || 0) * 15
                    + (parseFloat(calcInputs.packaging) || 0)
                    + (parseFloat(calcInputs.other)     || 0)
    const costPerLb    = yieldLbs > 0 ? totalCost / yieldLbs : 0
    const bench        = cropBenchmarks[calcInputs.crop]
    const revenuePerLb = bench ? bench.price : 2.50
    const profitPerLb  = revenuePerLb - costPerLb
    const totalProfit  = profitPerLb * yieldLbs
    const margin       = revenuePerLb > 0 ? (profitPerLb / revenuePerLb) * 100 : 0

    setCalcResult({
      totalCost:    totalCost.toFixed(2),
      costPerLb:    costPerLb.toFixed(2),
      revenuePerLb: revenuePerLb.toFixed(2),
      profitPerLb:  profitPerLb.toFixed(2),
      totalProfit:  totalProfit.toFixed(2),
      margin:       margin.toFixed(1),
      profitable:   profitPerLb > 0,
    })
  }

  const set = (key) => (e) => setCalcInputs(p => ({ ...p, [key]: e.target.value }))

  // ── Calculator view ───────────────────────────────────────
  if (showCalculator) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        {/* Back header */}
        <div className="flex-shrink-0 bg-white px-5 pt-4 pb-3 border-b border-gray-100 flex items-center gap-3">
          <button onClick={() => { setShowCalculator(false); setCalcResult(null) }}>
            <ChevronRight size={22} className="text-tga-muted rotate-180" />
          </button>
          <div>
            <h1 className="text-lg font-extrabold text-tga-charcoal tracking-tight">Cost of Production</h1>
            <p className="text-xs text-tga-muted">MN specialty crop benchmarks included</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto phone-scroll px-4 py-4" style={{ backgroundColor: '#F8F5EF' }}>
          {/* Crop & yield */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest mb-3">Crop & Expected Yield</p>
            <div className="mb-3">
              <label className="text-xs text-tga-muted block mb-1">Crop</label>
              <select
                value={calcInputs.crop}
                onChange={set('crop')}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-tga-charcoal bg-white focus:outline-none"
                style={{ borderColor: '#E5E7EB' }}
              >
                {Object.keys(cropBenchmarks).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-tga-muted block mb-1">Expected Yield (lbs)</label>
              <input
                type="number"
                value={calcInputs.yield}
                onChange={set('yield')}
                className="w-full border rounded-xl px-3 py-2.5 text-[13px] text-tga-charcoal focus:outline-none"
                style={{ borderColor: '#E5E7EB' }}
              />
            </div>
          </div>

          {/* Costs */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <p className="text-[10px] font-bold text-tga-muted uppercase tracking-widest mb-3">Costs for This Batch</p>
            {[
              { key: 'seed',       label: 'Seeds & Plants ($)' },
              { key: 'labor',      label: 'Labor Hours (billed at $15/hr)' },
              { key: 'packaging',  label: 'Packaging & Materials ($)' },
              { key: 'other',      label: 'Other — water, utilities ($)' },
            ].map(field => (
              <div key={field.key} className="mb-3 last:mb-0">
                <label className="text-xs text-tga-muted block mb-1">{field.label}</label>
                <input
                  type="number"
                  value={calcInputs[field.key]}
                  onChange={set(field.key)}
                  className="w-full border rounded-xl px-3 py-2.5 text-[13px] text-tga-charcoal focus:outline-none"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleCalc}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-md mb-4 active:scale-95 transition-transform"
            style={{ backgroundColor: '#4A6228' }}
          >
            Calculate Profitability
          </button>

          {/* Results */}
          {calcResult && (
            <div
              className="bg-white rounded-2xl p-4 shadow-sm border-2"
              style={{ borderColor: calcResult.profitable ? '#8FAE6B' : '#8B1A1A' }}
            >
              <div className="flex items-center gap-2 mb-3">
                {calcResult.profitable
                  ? <CheckCircle size={18} style={{ color: '#4A6228' }} />
                  : <AlertCircle size={18} style={{ color: '#8B1A1A' }} />
                }
                <p className="text-sm font-bold text-tga-charcoal">
                  {calcResult.profitable ? 'Profitable Batch' : 'Below Break-Even'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: 'Total Cost',      value: `$${calcResult.totalCost}`,    highlight: false },
                  { label: 'Cost / lb',       value: `$${calcResult.costPerLb}`,    highlight: false },
                  { label: 'TGA Price / lb',  value: `$${calcResult.revenuePerLb}`, highlight: true },
                  { label: 'Profit Margin',   value: `${calcResult.margin}%`,       highlight: calcResult.profitable },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3"
                    style={{ backgroundColor: stat.highlight && calcResult.profitable ? 'rgba(74,98,40,0.07)' : '#F8F5EF' }}
                  >
                    <p className="text-[10px] text-tga-muted">{stat.label}</p>
                    <p
                      className="text-[17px] font-extrabold mt-0.5"
                      style={{ color: stat.highlight && calcResult.profitable ? '#4A6228' : '#1A1A1A' }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl px-3 py-3 text-center"
                style={{ backgroundColor: calcResult.profitable ? 'rgba(143,174,107,0.2)' : 'rgba(139,26,26,0.08)' }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: calcResult.profitable ? '#4A6228' : '#8B1A1A' }}
                >
                  {calcResult.profitable ? '+' : ''}${calcResult.totalProfit} total profit on {calcInputs.yield} lbs
                </p>
              </div>

              <p className="text-[10px] text-tga-muted mt-2.5 text-center leading-relaxed">
                TGA price benchmarks based on MN specialty crop data collected by TGA advisors during farm visits
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Main insights view ────────────────────────────────────
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 bg-white px-5 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-xl font-extrabold text-tga-charcoal tracking-tight">My Insights</h1>
        <p className="text-xs text-tga-muted mt-0.5">Season performance &bull; {farmer.farm}</p>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll" style={{ backgroundColor: '#F8F5EF' }}>
        {/* KPI cards */}
        <div className="px-4 pt-4 pb-2 grid grid-cols-3 gap-2">
          {[
            { label: 'Fulfillment Rate', value: `${farmer.fulfillmentRate}%`, sub: '+7% vs avg',   highlight: true },
            { label: 'Active Orders',    value: `${farmer.activeOrders}`,     sub: 'this week',    highlight: false },
            { label: 'Season Revenue',   value: `$${(farmer.totalRevenue/1000).toFixed(1)}k`, sub: '2024–25', highlight: false },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className="text-[18px] font-extrabold text-tga-charcoal leading-none">{kpi.value}</p>
              <p className="text-[10px] text-tga-muted leading-tight mt-1">{kpi.label}</p>
              <p
                className="text-[10px] font-semibold mt-0.5"
                style={{ color: kpi.highlight ? '#4A6228' : '#6B6B6B' }}
              >
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Fulfillment chart */}
        <div className="mx-4 mt-2 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-tga-charcoal">Fulfillment Rate</p>
            <div className="flex items-center gap-3">
              {[
                { color: '#4A6228', label: 'You' },
                { color: '#8FAE6B', label: 'Network avg' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-tga-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={145}>
            <BarChart data={fulfillmentData} barSize={14} barGap={3} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6B6B6B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: '#6B6B6B' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
              <Bar dataKey="you"     fill="#4A6228" radius={[5, 5, 0, 0]} />
              <Bar dataKey="network" fill="#8FAE6B" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active orders */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-tga-charcoal">Active Orders</p>
            <div className="flex items-center gap-1">
              <Package size={12} className="text-tga-muted" />
              <span className="text-xs text-tga-muted">{orders.length} orders</span>
            </div>
          </div>
          <div className="flex flex-col">
            {orders.map((order, i) => {
              const s = statusStyle[order.status]
              return (
                <div
                  key={order.id}
                  className={`flex items-center gap-3 py-2.5 ${i < orders.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[12px] font-semibold text-tga-charcoal">{order.crop}</p>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: s.bg, color: s.text }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-tga-muted mt-0.5">{order.buyer} &bull; {order.qty}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[11px] font-semibold text-tga-charcoal">Due {order.due}</p>
                    <p className="text-[10px] text-tga-muted">{order.id}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cost Calculator CTA */}
        <button
          onClick={() => setShowCalculator(true)}
          className="mx-4 mt-3 mb-6 flex items-center gap-3 p-4 rounded-2xl shadow-md w-[calc(100%-2rem)] active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#4A6228' }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          >
            <Calculator size={22} color="white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-white">Cost of Production Calculator</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(143,174,107,0.85)' }}>
              Minnesota specialty crop data included
            </p>
          </div>
          <ChevronRight size={18} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </button>
      </div>
    </div>
  )
}
