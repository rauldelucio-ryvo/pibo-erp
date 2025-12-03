'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', tenantName: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error(await res.text());

            alert('Registration successful! Please login.');
            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
            <form onSubmit={handleRegister} className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-96 border border-white/50">
                <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Create Account</h1>

                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">{error}</div>}

                <div className="mb-4">
                    <label className="block text-slate-600 text-sm font-bold mb-2">Full Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-slate-600 text-sm font-bold mb-2">Company Name</label>
                    <input
                        type="text"
                        value={form.tenantName}
                        onChange={(e) => setForm({ ...form, tenantName: e.target.value })}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-slate-600 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-slate-600 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
                    Register
                </button>

                <p className="mt-4 text-center text-sm text-slate-500">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
}
