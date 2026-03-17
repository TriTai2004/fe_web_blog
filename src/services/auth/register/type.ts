
export interface RegisterRequest{
    email: string,
    password: string
}

export interface RegisterResponse {
    accessToken: string,
    tokenType: string,
    refreshToken: string,
    expiresIn: number,
    user: {
        id: string,
        email: string,
        role: string
    }
}