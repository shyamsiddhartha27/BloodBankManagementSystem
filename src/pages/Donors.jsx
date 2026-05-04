import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Search, Trash2, Filter, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Donors = () => {
  const [donors, setDonors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', age: '', blood_group: '', phone: '' })

  useEffect(() => {
    fetchDonors()
  }, [])

  const fetchDonors = async () => {
    try {
      const response = await axios.get('/api/donors')
      setDonors(response.data)
    } catch (error) {
      toast.error('Failed to load donors from database')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await axios.delete(`/api/donors/${id}`)
        setDonors(donors.filter(d => d.donor_id !== id))
        toast.success('Donor deleted successfully')
      } catch (error) {
        toast.error('Failed to delete donor')
      }
    }
  }

  const handleAddDonor = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/donors', formData)
      toast.success('Donor added successfully')
      setIsModalOpen(false)
      setFormData({ name: '', age: '', blood_group: '', phone: '' })
      fetchDonors() // Refresh the list after adding
    } catch (error) {
      toast.error('Failed to add donor')
    }
  }

  const filteredDonors = donors.filter(d => 
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.blood_group?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Donor Management</h2>
          <p className="text-slate-500 text-sm mt-1">View and manage all registered blood donors.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-4 font-bold text-slate-600">ID</th>
                <th className="p-4 font-bold text-slate-600">Name</th>
                <th className="p-4 font-bold text-slate-600">Age</th>
                <th className="p-4 font-bold text-slate-600">Blood Group</th>
                <th className="p-4 font-bold text-slate-600">Phone</th>
                <th className="p-4 font-bold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonors.map((donor) => (
                <tr key={donor.donor_id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-slate-400">{donor.donor_id}</td>
                  <td className="p-4 font-semibold text-slate-700">{donor.name}</td>
                  <td className="p-4">{donor.age} yrs</td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-xs">{donor.blood_group}</span>
                  </td>
                  <td className="p-4">{donor.phone}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(donor.donor_id)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDonors.length === 0 && <p className="text-center p-6 text-slate-500">No donors found.</p>}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Register New Donor</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-800"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddDonor} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="number" placeholder="Age" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
              <select required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.blood_group} onChange={e => setFormData({...formData, blood_group: e.target.value})}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
              <input type="text" placeholder="Phone Number" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <button type="submit" className="w-full btn-primary py-3 rounded-xl mt-4">Save Donor to Database</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Donors
