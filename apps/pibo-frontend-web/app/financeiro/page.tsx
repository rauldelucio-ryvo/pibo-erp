'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function FinanceiroPage() {
    const [bills, setBills] = useState<any[]>([]);
    const [cnabContent, setCnabContent] = useState('');

    useEffect(() => {
        loadBills();
    }, []);

    const loadBills = async () => {
        try {
            const data = await api.get('/financeiro/contas-receber');
            setBills(data);
        } catch (e) { console.error(e); }
    };

    const processCnab = async () => {
        try {
            await api.post('/financeiro/cnab/process', { content: cnabContent });
            alert('CNAB Processed!');
            loadBills();
        } catch (e) { alert('Error processing CNAB'); }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-slate-800 text-white">
                <div className="p-4 font-bold text-xl">Pibo ERP</div>
                <nav className="mt-4">
                    <a href="/dashboard" className="block py-2.5 px-4 hover:bg-slate-700">Dashboard</a>
                    <a href="/vendas" className="block py-2.5 px-4 hover:bg-slate-700">Vendas</a>
                    <a href="#" className="block py-2.5 px-4 bg-slate-700">Financeiro</a>
                    <a href="/crm" className="block py-2.5 px-4 hover:bg-slate-700">CRM</a>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Financeiro</h1>

                <div className="mb-8 bg-white p-4 rounded shadow">
                    <h3 className="font-bold mb-2">Processar CNAB</h3>
                    <textarea
                        value={cnabContent}
                        onChange={e => setCnabContent(e.target.value)}
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Paste CNAB content here (ID|VALUE|DATE)"
                    />
                    <button onClick={processCnab} className="bg-green-600 text-white px-4 py-2 rounded">Processar Arquivo</button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">{bill.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{bill.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">R$ {bill.value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bill.isReceived ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {bill.isReceived ? 'PAID' : 'PENDING'}
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
