export function getBearerToken() {
    const auth = localStorage.getItem('auth');
    if(!auth || !auth?.token) {
        return null;
    }
    return auth.token;
}
