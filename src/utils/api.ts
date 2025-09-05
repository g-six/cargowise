export async function fetchData(url: string, options?: {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT'
    signal?: AbortSignal
}, body?: Record<string, any>) {
    const access_token = localStorage.getItem('access_token') || ''
    const response = await fetch(url, {
        ...options,
        headers: access_token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        } : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}