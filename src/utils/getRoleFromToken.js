import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};