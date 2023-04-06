const validateEmail = (email) => {
    //TODO regex check
    const emailRegex = /^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}$ /;
    if(emailRegex.test(email))
        return true;
    return false; 
}
const isEmpty = (feild) => {
    return !feild;
}

module.exports = {validateEmail, isEmpty};