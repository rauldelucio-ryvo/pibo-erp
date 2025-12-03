'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function CrmPage() {
    const [opportunities, setOpportunities] = useState<any[]>([]);

    useEffect(() => {
        loadOpps();
    }, []);

    const loadOpps = async () => {
        try {
            const data = await api.get('/crm/opportunities');
            setOpportunities(data);
        } catch (e) { console.error(e); }
    };

    const moveStage = async (id: string, newStage: string) => {
        try {
            await api.patch(`/crm/opportunities/${id}/stage`, { stage: newStage });
            loadOpps();
        } catch (e) { alert('Invalid Transition!'); }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-slate-800 text-white">
                <div className="p-4 font-bold text-xl">Pibo ERP</div>
                <nav className="mt-4">
                    <a href="/dashboard" className="block py-2.5 px-4 hover:bg-slate-700">Dashboard</a>
                    <a href="/vendas" className="block py-2.5 px-4 hover:bg-slate-700">Vendas</a>
                    <a href="/financeiro" className="block py-2.5 px-4 hover:bg-slate-700">Financeiro</a>
                    <a href="#" className="block py-2.5 px-4 bg-slate-700">CRM</a>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">CRM Pipeline</h1>

                <div className="grid grid-cols-3 gap-4">
                    {['new', 'qualified', 'proposal', 'won'].map(stage => (
                        <div key={stage} className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold uppercase text-gray-500 mb-4">{stage}</h3>
                            {opportunities.filter(o => o.stage === stage).map(opp => (
                                <div key={opp.id} className="bg-blue-50 p-3 mb-2 rounded border border-blue-100">
                                    <div className="font-bold">{opp.title}</div>
                                    <div className="text-sm text-gray-600">R$ {opp.value}</div>
                                    <div className="mt-2 flex gap-2">
                                        {stage === 'new' && <button onClick={() => moveStage(opp.id, 'qualified')} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Qualify</button>}
                                        {stage === 'qualified' && <button onClick={() => moveStage(opp.id, 'proposal')} className="text-xs bg-purple-500 text-white px-2 py-1 rounded">Proposal</button>}
                                        {stage === 'proposal' && <button onClick={() => moveStage(opp.id, 'won')} className="text-xs bg-green-500 text-white px-2 py-1 rounded">Win</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
