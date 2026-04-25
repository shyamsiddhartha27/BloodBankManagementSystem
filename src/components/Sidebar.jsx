import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  Droplets, 
  ClipboardList,
  Heart
} from 'lucide-react'

const Sidebar = () => {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/donors', icon: Users, label: 'Donors' },
    { to: '/patients', icon: UserSquare2, label: 'Patients' },
    { to: '/stock', icon: Droplets, label: 'Blood Stock' },
    { to: '/requests', icon: ClipboardList, label: 'Requests' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Heart className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">LifeFlow</h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}
            `}
          >
            <link.icon size={20} />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-xl">
          <p className="text-xs text-slate-500 mb-1">Blood Center v1.0</p>
          <p className="text-sm font-semibold text-slate-700">Health Portal</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
