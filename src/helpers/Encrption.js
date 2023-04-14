

import CryptoJS from "crypto-js";

const secretPass = process.env.REACT_APP_ENCRYPTION_SECRET_PASS;

const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        secretPass
    ).toString();

    return (data);
};
const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return (data);
};

export { encryptData, decryptData }