'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function ClientesPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [form, setForm] = useState({ name: '', email: '', company: '' });

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const data = await api.get('/crm/leads');
            setLeads(data);
        } catch (e) { console.error(e); }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/crm/leads', form);
            setForm({ name: '', email: '', company: '' });
            loadLeads();
        } catch (e) { alert('Error creating lead'); }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 sidebar-gradient text-white shadow-xl z-10">
                <div className="p-6 font-bold text-2xl tracking-tight">Pibo ERP</div>
                <nav className="mt-8 space-y-2 px-4">
                    <a href="/dashboard" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Dashboard</a>
                    <a href="#" className="block py-3 px-4 rounded-lg bg-white/10 text-white font-medium">Clientes</a>
                    <a href="/crm" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">CRM</a>
                </nav>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Gerenciar Clientes</h1>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="font-bold mb-4">Novo Cliente</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-3 gap-4">
                        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" required />
                        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border p-2 rounded" required />
                        <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="border p-2 rounded" required />
                        <button type="submit" className="col-span-3 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Adicionar Cliente</button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leads.map(l => (
                                <tr key={l.id}>
                                    <td className="px-6 py-4">{l.name}</td>
                                    <td className="px-6 py-4">{l.email}</td>
                                    <td className="px-6 py-4">{l.company}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
