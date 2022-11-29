//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const checkUsername = (userName) => {
    if (!userName)
        throw "You must provide a username!";
    userName = userName.toLowerCase().trim();
    if (typeof userName !== "string")
        throw "The username must be a VALID string!";
    else if (userName.trim().length === 0)
        throw "Username cannot be a EMPTY string!";
    else if (!/^([a-zA-Z0-9]{4,100})$/.test(userName))
        throw "Username can only contains alphanumeric characters! (at least 4 characters)";
    else
        return userName;
};

const checkPassword = (password) => {
    if (!password)
        throw "You must provide a password!";
    password = password.trim();
    if (typeof password !== "string")
        throw "The password must be a VALID string!";
    else if (password.trim().length === 0)
        throw "Password cannot be a EMPTY string!";
    else if (!/^([a-zA-Z0-9\W]{6,100})$/.test(password) || password.includes(" "))
        throw "Password should be at least 6 characters long with NO space!";
    else if (!/(?=.*[A-Z])/.test(password) ||
        !/(?=.*[0-9])/.test(password) ||
        !/(?=.*\W)/.test(password))
        throw "At least one uppercase character, one number, and one special character for password is needed!";
    else
        return password;
};

module.exports = {
    checkUsername,
    checkPassword
};