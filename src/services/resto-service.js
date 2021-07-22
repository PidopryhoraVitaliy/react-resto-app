export default class RestoService {

    constructor() {
        this._apiBase = 'http://localhost:3000';
    }

    getResource = async (url) => {
        const res = await fetch(this._apiBase + url);
        if (!res.ok) {
            throw new Error(`Cannot fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getMenuItems = async () => {
        return await this.getResource(`/menu/`);
    }
    
    
    setResource = async (url, data) => {
        const res = await fetch(this._apiBase + url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`Cannot fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    addOrder = async (order) => {
        const res = await this.setResource('/orders/', order);
        return res.length === 0 ? false : true;
    }

}