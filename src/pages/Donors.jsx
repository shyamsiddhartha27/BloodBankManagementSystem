import { useState } from 'react'
import { DONORS } from '../data/dummyData'
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Donors = () => {
  const [donors, setDonors] = useState(DONORS)
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      setDonors(donors.filter(d => d.id !== id))
      toast.success('Donor deleted successfully')
    }
  }

  const filteredDonors = donors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Donor Management</h2>
          <p className="text-slate-500 text-sm mt-1">View and manage all registered blood donors.</p>
        </div>
        <button className="btn-primary" onClick={() => toast.success('Add Donor Modal would open')}>
          <Plus size={20} />
          <span>Add New Donor</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by name or blood group..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-center">Donor ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Age</th>
                <th className="table-header">Blood Group</th>
                <th className="table-header">Phone</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="table-cell text-center font-mono text-xs font-bold text-slate-400">{donor.id}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {donor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-slate-700">{donor.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">{donor.age} yrs</td>
                  <td className="table-cell">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-xs">
                      {donor.bloodGroup}
                    </span>
                  </td>
                  <td className="table-cell">{donor.phone}</td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        onClick={() => handleDelete(donor.id)}
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
        
        {filteredDonors.length === 0 && (
          <div className="p-12 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-500">No donors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Donors
