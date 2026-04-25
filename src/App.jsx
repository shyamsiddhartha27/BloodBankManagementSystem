import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Donors from './pages/Donors'
import Patients from './pages/Patients'
import Stock from './pages/Stock'
import Requests from './pages/Requests'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="donors" element={<Donors />} />
        <Route path="patients" element={<Patients />} />
        <Route path="stock" element={<Stock />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  )
}

export default App
