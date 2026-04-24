
const API = {
    async getServices() {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        return await response.json();
    },

    async getService(id) {
        const response = await fetch(`/api/services/${id}`);
        if (!response.ok) throw new Error('Failed to fetch service detail');
        return await response.json();
    },

    async addService(serviceData) {
        const response = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        });
        return { ok: response.ok, data: await response.json() };
    },

    async saveService(id) {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        return { ok: response.ok, data: await response.json() };
    },

    async hireService(id) {
        const response = await fetch('/api/hire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        return { ok: response.ok, data: await response.json() };
    },

    async getSaved() {
        const response = await fetch('/api/saved');
        return await response.json();
    },

    async getHired() {
        const response = await fetch('/api/hired');
        return await response.json();
    }
};
