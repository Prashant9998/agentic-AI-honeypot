import React from 'react';
import { calculateRisk } from '../utils/scamDetection';

function RiskAssessment({ indicators, onViewReport }) {
    const risk = calculateRisk(indicators);
    const hasData = indicators.upi_ids.length + indicators.urls.length +
        indicators.phones.length + indicators.keywords.length > 0;

    return (
        <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-title">📊 RISK ASSESSMENT</div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                {!hasData ? (
                    <div className="empty-state">AWAITING ANALYSIS...</div>
                ) : (
                    <div className={`risk-badge risk-${risk.toLowerCase()}`}>
                        {risk} RISK
                    </div>
                )}
            </div>
            <button
                className="btn-primary"
                onClick={onViewReport}
                style={{ width: '100%', marginTop: '15px' }}
            >
                📄 EXPORT INTEL REPORT
            </button>
        </div>
    );
}

export default RiskAssessment;
