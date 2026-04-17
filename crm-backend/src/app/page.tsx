import { 
  Users, 
  Store, 
  Calendar, 
  DollarSign, 
  Settings, 
  LayoutDashboard,
  Bell,
  Search
} from 'lucide-react';

export default function CRMDashboard() {
  const stats = [
    { title: 'Total Clients', value: '1,240', icon: Users, color: 'text-blue-500' },
    { title: 'Active Shops', value: '85', icon: Store, color: 'text-orange-500' },
    { title: 'Bookings Today', value: '450', icon: Calendar, color: 'text-green-500' },
    { title: 'Total Revenue', value: '$12,500', icon: DollarSign, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold text-amber-500 mb-10">BarberHub CRM</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 text-white bg-slate-800 p-3 rounded-xl border border-slate-700">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-slate-400 p-3 hover:text-white transition-colors">
            <Store size={20} />
            <span>Shops</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-slate-400 p-3 hover:text-white transition-colors">
            <Users size={20} />
            <span>Users</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-slate-400 p-3 hover:text-white transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              placeholder="Search data..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold border border-amber-200">
              JA
            </div>
          </div>
        </header>

        <main className="p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Platform Analytics</h2>
            <p className="text-slate-500">Real-time overview of your BarberHub ecosystem.</p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500">{stat.title}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Recent Shop Registrations</h3>
              <button className="text-amber-600 font-semibold text-sm hover:underline">View all</button>
            </div>
            <div className="p-0">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Shop Name</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Owner</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">The Golden Scissor</td>
                    <td className="p-4 text-slate-600">John Barber</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Pending</span>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">Oct 17, 2026</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Elite Grooming Hub</td>
                    <td className="p-4 text-slate-600">Maria Stylist</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">Oct 16, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
