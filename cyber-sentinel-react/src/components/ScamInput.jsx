import React from 'react';

function ScamInput({ scamInput, setScamInput, onInitialize, onReset }) {
    return (
        <div className="card">
            <div className="card-title">📨 Scam Message Input</div>
            <textarea
                id="scamInput"
                value={scamInput}
                onChange={(e) => setScamInput(e.target.value)}
                placeholder={`Paste suspected scam message here...

Example:
Dear customer, your refund of Rs.5000 is pending. Send UPI to ravi@ybl to activate. Click: bit.ly/refund123`}
            />
            <div className="btn-group">
                <button className="btn-primary" onClick={onInitialize}>
                    🚀 INITIALIZE
                </button>
                <button className="btn-secondary" onClick={onReset}>
                    🔄 SYSTEM RESET
                </button>
            </div>
        </div>
    );
}

export default ScamInput;
