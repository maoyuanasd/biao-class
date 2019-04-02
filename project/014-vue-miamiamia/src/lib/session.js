import store from './store';
let url=document.scripts[0].baseURI;
url=url.substring(0,url.indexOf('web'))
function loggedIn() {
    return localStorage.getItem('sessionId');
}

function login(sessionId, user, redirect) {
    localStorage.setItem('sessionId', sessionId);
    store.set('user', user);
    if (!redirect){
        location.reload();
        return;
    }
    
    location.reload();
    location.href = url+'web/index.html#'+redirect;
}

function logout(redirect = '/#/login') {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    location.reload();
    location.href = url+'web/index.html#'+redirect;
}
function isAdmin(){
    return user() && user().IS_ADMIN;
}
function user() {
    return store.get('user') || '';
}
export default {
    user,
    login,
    logout,
    loggedIn,
    isAdmin
};