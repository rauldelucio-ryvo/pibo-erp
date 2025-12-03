export const api = {
    baseUrl: typeof window !== 'undefined' ? '/api' : 'http://localhost:8080/api',

    async get(endpoint: string) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    },

    async post(endpoint: string, body: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async patch(endpoint: string, body: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};
