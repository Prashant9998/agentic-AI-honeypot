import React from 'react';

function IntelligencePanel({ scamType, messageCount, indicatorCount }) {
    return (
        <div className="card">
            <div className="card-title">🔍 REAL-TIME INTELLIGENCE</div>
            <div style={{ marginBottom: '15px' }}>
                {scamType === 'Unknown' ? (
                    <div className="empty-state">NO DATA DETECTED</div>
                ) : (
                    <div className="scam-type-badge">📍 {scamType}</div>
                )}
            </div>
            <div className="stats">
                <div className="stat-box">
                    <div className="stat-value">{messageCount}</div>
                    <div className="stat-label">PACKETS</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">{indicatorCount}</div>
                    <div className="stat-label">THREATS</div>
                </div>
            </div>
        </div>
    );
}

export default IntelligencePanel;
