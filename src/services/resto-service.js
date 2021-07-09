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
        return await this.getResource(`/menu`);
    }
    
}