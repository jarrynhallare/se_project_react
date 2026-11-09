export default function checkResponse(response) {
    if (!response.ok) {
        return Promise.reject(new Error(`Error: ${response.status}`));
    }
    return response.json();
}