export function getBearerToken() {
    const auth = localStorage.getItem('auth');
    if(auth === null) return null;
    const authObject = JSON.parse(auth);
    if(!authObject?.token) return null;
    return authObject.token;
}
