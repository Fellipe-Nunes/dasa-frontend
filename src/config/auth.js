const TOKEN_KEY = 'asgard-health'

const getToken = () => localStorage.getItem(TOKEN_KEY)

const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)

const removeToken = () => localStorage.removeItem(TOKEN_KEY)

const isAuthenticated = () => {
    return getToken () !== null
}

export {
    getToken,
    saveToken,
    removeToken,
    isAuthenticated
}