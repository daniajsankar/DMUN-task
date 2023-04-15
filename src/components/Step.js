import React from 'react'

const Step = ({ label, index, accomplished = false }) => {
    return (
        <div className={`stepWrapper ${accomplished ? "accomplished" : ""}`}>
            <div className="step">
                <span className="stepCount">{index}</span>
            </div>
            <div className="stepsLabelContainer">
                <span className="stepLabel">{label}</span>
            </div>
        </div >
    )
}

export default Step
