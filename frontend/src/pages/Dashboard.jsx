import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Users, Wallet, ShoppingCart, MessageCircle, TrendingUp, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DEMO_STATS = {
  totalClients: "6,389",
  accountBalance: "$ 46,760.89",
  newSales: "376",
  pendingContacts: 35,
};

const TABLE_DATA = [
  { name: 'Hans Burger', role: '10x Developer', amount: '$ 863.45', status: 'Approved', statusType: 'success', date: '6/10/2020', img: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ' },
  { name: 'Jolina Angelie', role: 'Unemployed', amount: '$ 369.95', status: 'Pending', statusType: 'warning', date: '6/10/2020', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6' },
  { name: 'Sarah Curry', role: 'Designer', amount: '$ 86.00', status: 'Denied', statusType: 'danger', date: '6/10/2020', img: 'https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ' },
];

const statusStyles = {
  success: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20',
  warning: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20',
  danger: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20',
};

const cards = [
  { label: 'Total Clients', value: DEMO_STATS.totalClients, icon: Users, gradient: 'from-purple-600 to-blue-600', change: '+12.5%', positive: true },
  { label: 'Account Balance', value: DEMO_STATS.accountBalance, icon: Wallet, gradient: 'from-emerald-500 to-teal-600', change: '+8.2%', positive: true },
  { label: 'New Sales', value: DEMO_STATS.newSales, icon: ShoppingCart, gradient: 'from-orange-500 to-pink-600', change: '-3.1%', positive: false },
  { label: 'Pending Contacts', value: DEMO_STATS.pendingContacts, icon: MessageCircle, gradient: 'from-cyan-500 to-blue-600', change: '+2', positive: true },
];

function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: "...",
    accountBalance: "Loading...",
    newSales: "...",
    pendingContacts: 35,
  });
  const [dbStatus, setDbStatus] = useState("Demo Mode");

  useEffect(() => {
    setStats(DEMO_STATS);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Resumen general de tu plataforma</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/[0.04] rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {dbStatus}
          </span>
          <Link
            to="/testimonios"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/30"
          >
            <Star className="w-4 h-4" />
            Testimonios
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="group relative bg-white dark:bg-white/[0.04] rounded-2xl border border-gray-200/50 dark:border-white/[0.06] p-5 hover:shadow-lg hover:shadow-purple-600/5 transition-all duration-300 stagger-item">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                  card.positive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                    : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'
                }`}>
                  {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-white/[0.04] rounded-2xl border border-gray-200/50 dark:border-white/[0.06] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200/50 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Transacciones Recientes</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Últimas 3 transacciones registradas</p>
            </div>
            <button className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors">
              Ver todas &rarr;
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 dark:text-gray-400 uppercase">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.06]">
              {TABLE_DATA.map((row, i) => (
                <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-white/[0.06]">
                        <img className="object-cover w-full h-full" src={row.img} alt="" loading="lazy" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{row.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{row.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[row.statusType]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
