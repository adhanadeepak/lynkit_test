export const isAuthenticated = () => {
    // console.log('in here');
    if(localStorage['login'] && localStorage['login'] === '1'){
        return true;
    }
    else{
        return false;
    }


};