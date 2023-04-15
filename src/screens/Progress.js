import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import CustomStep from "../components/Step";

function Payment() {

    const steps = ["Submitting", "Payment", "Review", "Done"];

    return (<div className="progressPage center">
        <ProgressBar
            percent={66}
            filledBackground="linear-gradient(to right, #24a3e5, #05628c)"
        >
            {steps.map((step, index) => {
                return (
                    <Step transition="scale">
                        {({ accomplished }) => (
                            <CustomStep key={index} label={step} index={index + 1} accomplished={accomplished} />
                        )}
                    </Step>)
            })}
        </ProgressBar>
        <h1>Payment is done</h1>
        <h3>Thank you</h3>
        <a href="/" className="center">Back to home</a>
    </div>);
}

export default Payment;
