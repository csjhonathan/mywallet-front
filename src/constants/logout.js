function logOut(){
  
    const logOut = {
        token : undefined,
        username : undefined
    };

    localStorage.setItem('myWalletData', JSON.stringify(logOut));
}

export default logOut;