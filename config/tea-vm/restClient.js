class RestClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        return this._handleResponse(response);
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify(data)
        });
        return this._handleResponse(response);
    }

    async put(endpoint, data) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: this.defaultHeaders,
            body: JSON.stringify(data)
        });
        return this._handleResponse(response);
    }

    async delete(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: this.defaultHeaders
        });
        return this._handleResponse(response);
    }

    async _handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    }

    setHeader(key, value) {
        this.defaultHeaders[key] = value;
    }
}

// Export for use in TeaVM
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RestClient;
}