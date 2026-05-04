import { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, UserSquare2, Droplets, ClipboardList, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const [statsData, setStatsData] = useState({ donors: 0, patients: 0, stock: [], requests: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data from MySQL DB endpoints concurrently
        const [donorsRes, patientsRes, stockRes, requestsRes] = await Promise.all([
          axios.get('/api/donors'),
          axios.get('/api/patients'),
          axios.get('/api/bloodstock'),
          axios.get('/api/requests')
        ])
        setStatsData({
          donors: donorsRes.data.length,
          patients: patientsRes.data.length,
          stock: stockRes.data,
          requests: requestsRes.data
        })
      } catch (error) {
        console.error("Failed to load dashboard data", error)
      }
    }
    fetchData()
  }, [])

  const totalUnits = statsData.stock.reduce((acc, curr) => acc + curr.units, 0)
  const pendingRequests = statsData.requests.filter(r => r.status === 'Pending').length

  const stats = [
    { label: 'Total Donors', value: statsData.donors, icon: Users, color: 'bg-blue-500' },
    { label: 'Total Patients', value: statsData.patients, icon: UserSquare2, color: 'bg-green-500' },
    { label: 'Available Blood Units', value: totalUnits, icon: Droplets, color: 'bg-primary' },
    { label: 'Pending Requests', value: pendingRequests, icon: ClipboardList, color: 'bg-orange-500' },
  ]

  const lowStock = statsData.stock.filter(s => s.units < 5)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hospital Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Live metrics strictly fetched from your MySQL database.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-medium border border-green-100">
          <TrendingUp size={16} />
          <span>DB Connected & Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            </div>
            <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Critical Low Stock</h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">ACTION REQUIRED</span>
          </div>
          <div className="space-y-4">
            {lowStock.length === 0 ? <p className="text-slate-500 text-sm p-4 bg-slate-50 rounded-xl">All stock levels are healthy.</p> : lowStock.map((stock, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {stock.blood_group}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Blood Group {stock.blood_group}</p>
                    <p className="text-xs text-slate-500">Inventory levels below threshold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{stock.units} Units</p>
                  <p className="text-xs text-slate-400">Target: 10+</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Requests</h3>
          <div className="space-y-4">
            {statsData.requests.length === 0 ? <p className="text-slate-500 text-sm p-4 border border-slate-100 rounded-xl">No recent requests in database.</p> : [...statsData.requests].reverse().slice(0, 4).map((req, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${req.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                  <div>
                    <p className="font-semibold text-slate-700">Request #{req.request_id}</p>
                    <p className="text-xs text-slate-500">Patient: {req.patient_id} • Group: {req.blood_group}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  req.status === 'Completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
