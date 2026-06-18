function login() {
    const username =
        document
        .getElementById( "username" )
        .value
        .trim();

    const password =
        document
        .getElementById( "password" )
        .value
        .trim();

    if ( username === "admin" && password === "1234" ) 
        {
            document
            .getElementById( "loginPage" )
            .style.display = "none";
            
            document
            .getElementById( "app" )
            .style.display = "flex";

            loadPage( "dashboard" );

        }
    else { alert( "Username atau Password salah!" ); }
}

function logout() { location.reload(); }

function checkLogin() {
    document
        .getElementById( "loginPage" )
        .style.display = "flex";
    document
        .getElementById( "app" )
        .style.display = "none";
}