'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function ProdutosPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [form, setForm] = useState({ name: '', sku: '', price: 0, stockQuantity: 0 });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await api.get('/estoque/products');
            setProducts(data);
        } catch (e) { console.error(e); }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/estoque/products', form);
            setForm({ name: '', sku: '', price: 0, stockQuantity: 0 });
            loadProducts();
        } catch (e) { alert('Error creating product'); }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 sidebar-gradient text-white shadow-xl z-10">
                <div className="p-6 font-bold text-2xl tracking-tight">Pibo ERP</div>
                <nav className="mt-8 space-y-2 px-4">
                    <a href="/dashboard" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Dashboard</a>
                    <a href="#" className="block py-3 px-4 rounded-lg bg-white/10 text-white font-medium">Produtos</a>
                    <a href="/vendas" className="block py-3 px-4 rounded-lg hover:bg-white/5 text-slate-300 transition-colors">Vendas</a>
                </nav>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Gerenciar Produtos</h1>

                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="font-bold mb-4">Novo Produto</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-4 gap-4">
                        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" required />
                        <input placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="border p-2 rounded" required />
                        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="border p-2 rounded" required />
                        <input type="number" placeholder="Stock" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: Number(e.target.value) })} className="border p-2 rounded" required />
                        <button type="submit" className="col-span-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Adicionar Produto</button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4">{p.name}</td>
                                    <td className="px-6 py-4">{p.sku}</td>
                                    <td className="px-6 py-4">R$ {p.price}</td>
                                    <td className="px-6 py-4">{p.stockQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
