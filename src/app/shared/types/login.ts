export interface DecodedToken {
    authorities: string;
    sub: string;
}

export interface LoginResponse {
    token: string;
}