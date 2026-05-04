import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Search, Trash2, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', blood_group: '', units_required: '' })

  useEffect(() => { fetchPatients() }, [])

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/api/patients')
      setPatients(res.data)
    } catch (e) { toast.error('Failed to load patients') }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Remove patient record?')) {
      try {
        await axios.delete(`/api/patients/${id}`)
        setPatients(patients.filter(p => p.patient_id !== id))
        toast.success('Patient removed')
      } catch (e) { toast.error('Failed to delete patient') }
    }
  }

  const handleAddPatient = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/patients', formData)
      toast.success('Patient registered')
      setIsModalOpen(false)
      setFormData({ name: '', blood_group: '', units_required: '' })
      fetchPatients()
    } catch (e) { toast.error('Failed to register patient') }
  }

  const filtered = patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patient Management</h2>
          <p className="text-slate-500 text-sm">Manage patients requiring blood units.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> <span>Register Patient</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Search patients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead><tr><th className="p-4 font-bold text-slate-600">ID</th><th className="p-4 font-bold text-slate-600">Name</th><th className="p-4 font-bold text-slate-600">Blood Group</th><th className="p-4 font-bold text-slate-600">Units Required</th><th className="p-4 text-right font-bold text-slate-600">Actions</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.patient_id} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 font-mono text-xs font-bold text-slate-400">{p.patient_id}</td>
                <td className="p-4 font-bold text-slate-700">{p.name}</td>
                <td className="p-4"><span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold">{p.blood_group}</span></td>
                <td className="p-4 font-bold text-slate-700">{p.units_required} Units</td>
                <td className="p-4 text-right"><button onClick={() => handleDelete(p.patient_id)} className="text-slate-400 hover:text-primary"><Trash2 size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center p-6 text-slate-500">No patients found.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Register Patient</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <input type="text" placeholder="Patient Name" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <select required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.blood_group} onChange={e => setFormData({...formData, blood_group: e.target.value})}>
                <option value="">Select Required Blood Group</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
              <input type="number" placeholder="Units Required" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.units_required} onChange={e => setFormData({...formData, units_required: e.target.value})} />
              <button type="submit" className="w-full btn-primary py-3 rounded-xl mt-4">Save Patient</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default Patients
