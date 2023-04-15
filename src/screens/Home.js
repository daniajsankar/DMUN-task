import React, { useEffect, useState } from "react";
import BackgroundImage from "../images/Building-Construction.jpeg"
import MobileInput from "../components/MobileInput/MobileInput";
import getStripe from '../lib/getStripe';
import { toast } from "react-toastify";
import { encryptData, decryptData } from "../helpers/Encrption";

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        restoreClientInfo();
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setClientInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    async function handleCheckout() {
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            successUrl: `http://localhost:3000/progress`,
            cancelUrl: `http://localhost:3000/`,
            customerEmail: email,
        });
        console.warn(error.message);
    }

    const restoreClientInfo = () => {
        setClientInfo({
            name: decryptData(localStorage.getItem("name")),
            email: decryptData(localStorage.getItem("email")),
            mobile: decryptData(localStorage.getItem("mobile")),
            address: decryptData(localStorage.getItem("address"))
        })
    }

    const storeClientInfo = () => {
        localStorage.setItem("name", encryptData(name));
        localStorage.setItem("email", encryptData(email));
        localStorage.setItem("mobile", encryptData(mobile));
        localStorage.setItem("address", encryptData(address));
    }

    const submit = (e) => {
        e.preventDefault();
        if (!mobileValidity) {
            toast.error("Please enter a valid mobile number", {
                position: "top-right",
                autoClose: 4000,
            });
            setMobileError(true);
            return;
        } else {
            setLoading(true);
            setMobileError(false);
            storeClientInfo();
            localStorage.setItem("registered", "yes");
            handleCheckout();
        }
    };
    return (
        <div className="app">
            <div className="background" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="overlay" />
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
                    <button type="submit" className="center">{loading ? <div className="loader" /> : "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
