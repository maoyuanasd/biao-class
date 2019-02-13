import store from './store'

function loggedIn() {
    return localStorage.getItem('sessionId')
}

function login(sessionId, user, redirect) {
    localStorage.setItem('sessionId', sessionId);
    store.set('user', user);
    if (!redirect){
       location.reload();
       return;
    }
    location.reload();
    location.href = redirect;
}

function logout(redirect='/login') {
    localStorage.removeItem('sessionId')
    localStorage.removeItem('user')
    location.hash = redirect;
    location.reload();
}
function isAdmin(){
    return user().IS_ADMIN;
}
function user() {
    return store.get('user');
}
export default {
    loggedIn,
    login,
    logout,
    user,
    isAdmin
}