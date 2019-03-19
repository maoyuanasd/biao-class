window.$user=null;
window.logout=logout;
boot();

function boot() {
    if (isLoggedIn()) {
        load();
    }else{
        render();
    }
}

function isLoggedIn() {
    return localStorage.getItem('session');
}

function load() {
    api('user/first', {
        where: {
            and: {
                id: isLoggedIn()
            }
        },
        only: ['id','username', 'name']
    }, r => {
       if(!r.data)
       return;
       $user=r.data;
       render();
    })
}
function logout(){
    localStorage.removeItem('session');
        location.reload();
}
function render(){
if($user){
    loggedIn.hidden=!(tourist.hidden=true);
    navItemName.innerText = $user.name || $user.username;
}else{
    loggedIn.hidden=!(tourist.hidden=false);
}
}