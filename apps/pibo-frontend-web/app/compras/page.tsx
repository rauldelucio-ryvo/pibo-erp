'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function ComprasPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [form, setForm] = useState({ supplierId: '', totalValue: 0 });

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await api.get('/compras/orders');
            setOrders(data);
        } catch (e) { console.error(e); }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/compras/orders', {
                ...form,
                items: [{ productId: 'test-prod', quantity: 10, unitCost: 50 }] // Mock items
            });
            setForm({ supplierId: '', totalValue: 0 });
            loadOrders();
        } catch (e) { alert('Error creating purchase order'); }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 sidebar-gradient text-white shadow-xl z-10">
                <div className="p-6 font-bold text-2xl tracking-tight">Pibo ERP</div>
                <nav className="mt-8 space-y-2 px-4">
                    <a href="/dashboard" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Dashboard</a>
                    <a href="#" className="block py-3 px-4 rounded-lg bg-white/10 text-white font-medium">Compras</a>
                    <a href="/produtos" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Produtos</a>
                </nav>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Gestão de Compras</h1>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="font-bold mb-4">Novo Pedido de Compra</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
                        <input placeholder="Supplier ID" value={form.supplierId} onChange={e => setForm({ ...form, supplierId: e.target.value })} className="border p-2 rounded" required />
                        <input type="number" placeholder="Total Value" value={form.totalValue} onChange={e => setForm({ ...form, totalValue: Number(e.target.value) })} className="border p-2 rounded" required />
                        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Criar Pedido</button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map(o => (
                                <tr key={o.id}>
                                    <td className="px-6 py-4 text-xs text-gray-500">{o.id}</td>
                                    <td className="px-6 py-4">{o.supplierId}</td>
                                    <td className="px-6 py-4">R$ {o.totalValue}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            {o.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
