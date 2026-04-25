import { useState } from 'react'
import { REQUESTS } from '../data/dummyData'
import { CheckCircle2, Clock, Search, ExternalLink } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Requests = () => {
  const [requests, setRequests] = useState(REQUESTS)

  const handleComplete = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Completed' } : r))
    toast.success('Request marked as completed')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Blood Requests</h2>
        <p className="text-slate-500 text-sm mt-1">Track and process blood unit requests from hospital departments.</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{requests.filter(r => r.status === 'Pending').length} Pending</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>{requests.filter(r => r.status === 'Completed').length} Completed</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Request ID</th>
                <th className="table-header">Patient ID</th>
                <th className="table-header">Blood Group</th>
                <th className="table-header text-center">Units</th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="table-cell font-mono text-xs font-bold text-slate-400">{req.id}</td>
                  <td className="table-cell font-semibold text-slate-700">{req.patientId}</td>
                  <td className="table-cell">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-xs">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td className="table-cell text-center font-bold text-slate-700">{req.units}</td>
                  <td className="table-cell">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-primary/10 text-primary'
                    }`}>
                      {req.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} className="animate-pulse" />}
                      {req.status}
                    </div>
                  </td>
                  <td className="table-cell text-right">
                    {req.status === 'Pending' ? (
                      <button 
                        onClick={() => handleComplete(req.id)}
                        className="text-primary hover:bg-primary/5 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ml-auto transition-all"
                      >
                        <CheckCircle2 size={18} />
                        <span>Complete</span>
                      </button>
                    ) : (
                      <button className="text-slate-400 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ml-auto transition-all">
                        <ExternalLink size={18} />
                        <span>View Details</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Requests
