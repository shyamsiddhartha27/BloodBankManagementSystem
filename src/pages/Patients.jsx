import { useState } from 'react'
import { PATIENTS } from '../data/dummyData'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Patients = () => {
  const [patients, setPatients] = useState(PATIENTS)

  const handleDelete = (id) => {
    if (window.confirm('Remove patient record?')) {
      setPatients(patients.filter(p => p.id !== id))
      toast.success('Patient record removed')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patient Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage patients requiring blood units.</p>
        </div>
        <button className="btn-primary" onClick={() => toast.success('Add Patient Modal')}>
          <Plus size={20} />
          <span>Register Patient</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Patient ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Blood Group</th>
                <th className="table-header">Units Required</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="table-cell font-mono text-xs font-bold text-slate-400">{patient.id}</td>
                  <td className="table-cell font-semibold text-slate-700">{patient.name}</td>
                  <td className="table-cell">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-xs">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="table-cell font-bold text-slate-700">{patient.unitsRequired} Units</td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default Patients
