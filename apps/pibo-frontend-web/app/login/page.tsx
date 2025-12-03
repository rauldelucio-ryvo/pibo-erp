'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Call API Gateway
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Invalid credentials');

            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            router.push('/dashboard');
        } catch (err) {
            setError('Login failed. Check your credentials.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
            <form onSubmit={handleLogin} className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-96 border border-white/50">
                <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Welcome Back</h1>

                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">{error}</div>}

                <div className="mb-4">
                    <label className="block text-slate-600 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-600 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
                    Login
                </button>

                <p className="mt-4 text-center text-sm text-slate-500">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </form>
        </div>
    );
}
