import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle2, Clock, Plus, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ patient_id: '', blood_group: '', units_required: '' })

  useEffect(() => { fetchRequests() }, [])

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/requests')
      setRequests(res.data)
    } catch (e) { toast.error('Failed to load requests') }
  }

  const handleComplete = async (id) => {
    try {
      await axios.put(`/api/requests/${id}`, { status: 'Completed' })
      toast.success('Request marked as completed')
      fetchRequests()
    } catch (e) { toast.error('Failed to update request') }
  }

  const handleAddRequest = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/requests', formData)
      toast.success('Request created successfully! Stock deducted.')
      setIsModalOpen(false)
      setFormData({ patient_id: '', blood_group: '', units_required: '' })
      fetchRequests()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create request (Check stock or patient ID)')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Blood Requests</h2>
          <p className="text-slate-500 text-sm">Track and process blood unit requests using Database Transactions.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> <span>New Request</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden p-4">
        <table className="w-full text-left">
          <thead><tr><th className="p-4 font-bold text-slate-600">Req ID</th><th className="p-4 font-bold text-slate-600">Patient ID</th><th className="p-4 font-bold text-slate-600">Blood Group</th><th className="p-4 font-bold text-slate-600">Units</th><th className="p-4 font-bold text-slate-600">Status</th><th className="p-4 text-right font-bold text-slate-600">Actions</th></tr></thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.request_id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-mono text-xs font-bold text-slate-400">{req.request_id}</td>
                <td className="p-4 font-bold text-slate-700">{req.patient_id}</td>
                <td className="p-4"><span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold">{req.blood_group}</span></td>
                <td className="p-4 font-bold text-slate-700">{req.units_required}</td>
                <td className="p-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {req.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} className="animate-pulse" />}
                      {req.status}
                  </div>
                </td>
                <td className="p-4 text-right">
                  {req.status === 'Pending' && (
                    <button onClick={() => handleComplete(req.request_id)} className="text-primary hover:bg-primary/10 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 ml-auto transition-all">
                      <CheckCircle2 size={16} /> Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && <p className="text-center p-6 text-slate-500">No requests found.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Create Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddRequest} className="space-y-4">
              <input type="number" placeholder="Patient ID (must exist)" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.patient_id} onChange={e => setFormData({...formData, patient_id: e.target.value})} />
              <select required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.blood_group} onChange={e => setFormData({...formData, blood_group: e.target.value})}>
                <option value="">Select Blood Group Needed</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
              <input type="number" placeholder="Units Required" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.units_required} onChange={e => setFormData({...formData, units_required: e.target.value})} />
              <button type="submit" className="w-full btn-primary py-3 rounded-xl mt-4">Process Request Transaction</button>
              <p className="text-xs text-slate-500 mt-2 text-center">Note: This will perform a MySQL Transaction to check and deduct stock.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default Requests
