'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://159.65.237.156:8080';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', tenantName: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log(`Attempting registration to: ${API_URL}/auth/register`);

            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            console.log('Register response status:', res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error('Registration error:', errorText);
                throw new Error(errorText || 'Registration failed');
            }

            console.log('Registration successful');
            alert('Registration successful! Please login.');
            router.push('/login');
        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>

                <p className="mt-4 text-center text-sm text-slate-500">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
}
