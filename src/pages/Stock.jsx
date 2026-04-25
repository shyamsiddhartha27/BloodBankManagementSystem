import { useState } from 'react'
import { BLOOD_STOCK } from '../data/dummyData'
import { Droplets, AlertTriangle, ArrowUpRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Stock = () => {
  const [stocks, setStocks] = useState(BLOOD_STOCK)

  const updateUnits = (group) => {
    const amount = prompt('Enter new unit count for ' + group)
    if (amount !== null && !isNaN(amount)) {
      setStocks(stocks.map(s => s.group === group ? { ...s, units: parseInt(amount) } : s))
      toast.success(`Updated ${group} stock to ${amount} units`)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time blood unit availability across all groups.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stocks.map((stock, i) => (
          <div key={i} className={`glass-card p-6 rounded-3xl border-2 transition-all duration-300 group ${
            stock.units < 5 ? 'border-primary/20 bg-primary/[0.02]' : 'border-transparent hover:border-slate-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${
                stock.units < 5 ? 'bg-primary text-white animate-pulse' : 'bg-slate-100 text-slate-600'
              }`}>
                <Droplets size={24} />
              </div>
              {stock.units < 5 && (
                <div className="flex items-center gap-1 text-primary">
                  <AlertTriangle size={16} />
                  <span className="text-[10px] font-bold uppercase">Low</span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Group {stock.group}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-slate-800">{stock.units}</h3>
                <span className="text-slate-400 font-bold text-sm">Units</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <button 
                onClick={() => updateUnits(stock.group)}
                className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors group-hover:bg-slate-50 rounded-xl"
              >
                <span>Update Stock</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">Automated Procurement</h3>
            <p className="text-slate-400 text-sm">The system automatically flags groups falling below 5 units and notifies nearby donors. Current low stock groups: {stocks.filter(s => s.units < 5).map(s => s.group).join(', ')}.</p>
          </div>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-colors shrink-0">
            Order Supplies
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default Stock
