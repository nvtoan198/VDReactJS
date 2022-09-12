
const loginUserBackend = ({username, password}) => {
    if(username === 'admin' && password === '123456789'){
        return {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            phone: '123456789'
        };
        // luu thong nay vao localStorage de kiem tra user da dang nhap ?
    }
    return null;
}
export const apiUser = {
    loginUserBackend
}