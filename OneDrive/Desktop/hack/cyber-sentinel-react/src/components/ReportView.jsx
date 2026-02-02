import React from 'react';
import { calculateRisk } from '../utils/scamDetection';

function ReportView({ conversation, indicators, scamType, messageCount, onBack }) {
    const reportData = {
        scam_id: Date.now(),
        timestamp: new Date().toLocaleString(),
        scam_type: scamType,
        risk_level: calculateRisk(indicators),
        indicators: indicators,
        conversation_length: messageCount,
        total_indicators:
            indicators.upi_ids.length +
            indicators.urls.length +
            indicators.phones.length +
            indicators.keywords.length
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cyber-sentinel-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="card">
            <div className="report-header">
                <div className="card-title">📄 FORENSIC REPORT</div>
                <button className="btn-secondary" onClick={onBack}>
                    ← RETURN
                </button>
            </div>

            <div className="timestamp">GENERATED: {reportData.timestamp}</div>

            <div className="stats" style={{ margin: '20px 0' }}>
                <div className="stat-box">
                    <div className="stat-value">{reportData.conversation_length}</div>
                    <div className="stat-label">PACKETS</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">{reportData.total_indicators}</div>
                    <div className="stat-label">THREATS</div>
                </div>
            </div>

            <div className="scam-type-badge" style={{ margin: '20px 0' }}>
                📍 {reportData.scam_type}
            </div>

            <div className={`risk-badge risk-${reportData.risk_level.toLowerCase()}`} style={{ margin: '20px 0' }}>
                {reportData.risk_level} RISK
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '15px', fontFamily: "'Orbitron', sans-serif" }}>
                    FORENSIC ARTIFACTS
                </h3>

                {reportData.indicators.upi_ids.length > 0 && (
                    <p style={{ margin: '10px 0', color: 'var(--neon-amber)' }}>
                        🔸 UPI IDs: {reportData.indicators.upi_ids.join(', ')}
                    </p>
                )}

                {reportData.indicators.urls.length > 0 && (
                    <p style={{ margin: '10px 0', color: 'var(--neon-amber)' }}>
                        🔸 URLs: {reportData.indicators.urls.join(', ')}
                    </p>
                )}

                {reportData.indicators.phones.length > 0 && (
                    <p style={{ margin: '10px 0', color: 'var(--neon-amber)' }}>
                        🔸 Phone Numbers: {reportData.indicators.phones.join(', ')}
                    </p>
                )}

                {reportData.indicators.keywords.length > 0 && (
                    <p style={{ margin: '10px 0', color: 'var(--neon-amber)' }}>
                        🔸 Keywords: {reportData.indicators.keywords.join(', ')}
                    </p>
                )}
            </div>

            <div className="btn-group" style={{ marginTop: '20px' }}>
                <button className="btn-primary" onClick={handleExport}>
                    💾 DOWNLOAD JSON
                </button>
                <button className="btn-secondary" onClick={onBack}>
                    ← RETURN TO CONSOLE
                </button>
            </div>
        </div>
    );
}

export default ReportView;
