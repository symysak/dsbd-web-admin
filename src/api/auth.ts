export function login(username: string, password: string) {
    return new Promise(resolve => {
        resolve({
            id: 123,
            username,
            email: "sample@email.com",
        });
    });
}
