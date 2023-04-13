import React, { useState } from "react";
import BackgroundImage from "../images/Building-Construction.jpeg"
import MobileInput from "../components/MobileInput/MobileInput";
import CryptoJS from "crypto-js";

const initialState = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    notes: ""
};

function Home() {
    const [{ name, mobile, email, address, notes }, setClientInfo] = useState(initialState);
    const [mobileError, setMobileError] = useState(false);
    const [mobileValidity, setValidity] = useState(false);
    const secretPass = "XkhZG4fW2t2W";

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

    const onChange = (e) => {
        const { name, value } = e.target;
        setClientInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        if (!mobileValidity) {
            setMobileError(true);
            return;
        } else {
            setMobileError(false);
        }
    };
    return (
        <div className="app">
            <img src={BackgroundImage} alt="Building-Construction" className="backgroundImage" />
            <div className="overlay">
                <form className="formBody" onSubmit={submit}>
                    <h2>New Construction Service Request</h2>
                    <div className="row">
                        <span>
                            Name:
                        </span>
                        <input required={true}
                            value={name}
                            name="name"
                            onChange={onChange} />
                    </div>
                    <div className="row">
                        <span>
                            Mobile:
                        </span>
                        <MobileInput
                            value={mobile}
                            setMobileError={setMobileError}
                            required={true}
                            mobileError={mobileError}
                            setValue={(value) => {
                                setMobileError(false);
                                onChange({
                                    target: { name: "mobile", value },
                                });
                            }}
                            setValidity={setValidity} />
                    </div>
                    <div className="row">
                        <span>
                            Email:
                        </span>
                        <input required={true}
                            type="email"
                            value={email}
                            name="email"
                            onChange={onChange} />
                    </div>
                    <div className="row">
                        <span>
                            Address:
                        </span>
                        <input
                            required={true}
                            value={address}
                            name="address"
                            onChange={onChange} />
                    </div>
                    <div className="row">
                        <span>
                            Notes:
                        </span>
                        <textarea
                            value={notes}
                            name="notes"
                            onChange={onChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
