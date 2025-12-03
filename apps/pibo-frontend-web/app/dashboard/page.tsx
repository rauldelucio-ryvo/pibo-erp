'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-600">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 sidebar-gradient text-white shadow-xl z-10">
        <div className="p-6 font-bold text-2xl tracking-tight">Pibo ERP</div>
        <nav className="mt-8 space-y-2 px-4">
          <a href="#" className="block py-3 px-4 rounded-lg bg-white/10 text-white font-medium">Dashboard</a>
          <a href="/vendas" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Vendas</a>
          <a href="/financeiro" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Financeiro</a>
          <a href="/crm" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">CRM</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4 glass-panel px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-slate-600">Tenant: Minha Empresa</span>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cards */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Vendas Hoje</h3>
            <p className="text-4xl font-bold text-slate-800 mt-4">R$ 12.450</p>
            <div className="mt-4 text-green-600 text-sm font-medium flex items-center">
              <span>+12%</span>
              <span className="ml-2 text-slate-400">vs yesterday</span>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Notas Emitidas</h3>
            <p className="text-4xl font-bold text-slate-800 mt-4">142</p>
            <div className="mt-4 text-blue-600 text-sm font-medium flex items-center">
              <span>Processing</span>
              <span className="ml-2 text-slate-400">5 pending</span>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Contas a Pagar</h3>
            <p className="text-4xl font-bold text-slate-800 mt-4 text-red-500">R$ 4.200</p>
            <div className="mt-4 text-slate-400 text-sm font-medium">
              Due within 7 days
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
