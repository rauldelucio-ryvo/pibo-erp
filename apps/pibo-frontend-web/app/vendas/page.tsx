'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';

export default function VendasPage() {
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('');

    const handleCreateOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Processing...');
        try {
            await api.post('/vendas/orders', {
                customerId,
                totalValue: 100, // Mock value
                items: [{ productId, quantity: Number(quantity), unitPrice: 50 }]
            });
            setStatus('Order Created Successfully!');
        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-slate-800 text-white">
                <div className="p-4 font-bold text-xl">Pibo ERP</div>
                <nav className="mt-4">
                    <a href="/dashboard" className="block py-2.5 px-4 hover:bg-slate-700">Dashboard</a>
                    <a href="#" className="block py-2.5 px-4 bg-slate-700">Vendas</a>
                    <a href="/financeiro" className="block py-2.5 px-4 hover:bg-slate-700">Financeiro</a>
                    <a href="/crm" className="block py-2.5 px-4 hover:bg-slate-700">CRM</a>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Nova Venda</h1>

                <div className="bg-white p-6 rounded shadow-md max-w-lg">
                    <form onSubmit={handleCreateOrder}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Customer ID</label>
                            <input type="text" value={customerId} onChange={e => setCustomerId(e.target.value)} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product ID</label>
                            <input type="text" value={productId} onChange={e => setProductId(e.target.value)} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                            <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full p-2 border rounded" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Criar Pedido</button>
                    </form>

                    {status && (
                        <div className={`mt-4 p-3 rounded ${status.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {status}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
