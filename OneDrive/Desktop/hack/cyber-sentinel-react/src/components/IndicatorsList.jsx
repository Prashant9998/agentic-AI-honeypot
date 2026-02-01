import React from 'react';

function IndicatorsList({ indicators }) {
    const totalCount =
        indicators.upi_ids.length +
        indicators.urls.length +
        indicators.phones.length +
        indicators.keywords.length;

    return (
        <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-title">⚠️ EXTRACTED ARTIFACTS</div>
            <div className="indicator-list">
                {totalCount === 0 ? (
                    <div className="empty-state">NO ARTIFACTS CAPTURED</div>
                ) : (
                    <>
                        {indicators.upi_ids.map((upi, index) => (
                            <div key={`upi-${index}`} className="indicator-item">
                                <span className="indicator-type">UPI ID</span>
                                <span className="indicator-value">{upi}</span>
                            </div>
                        ))}
                        {indicators.urls.map((url, index) => (
                            <div key={`url-${index}`} className="indicator-item">
                                <span className="indicator-type">URL</span>
                                <span className="indicator-value">
                                    {url.length > 40 ? url.substring(0, 40) + '...' : url}
                                </span>
                            </div>
                        ))}
                        {indicators.phones.map((phone, index) => (
                            <div key={`phone-${index}`} className="indicator-item">
                                <span className="indicator-type">PHONE</span>
                                <span className="indicator-value">{phone}</span>
                            </div>
                        ))}
                        {indicators.keywords.map((keyword, index) => (
                            <div key={`keyword-${index}`} className="indicator-item">
                                <span className="indicator-type">KEYWORD</span>
                                <span className="indicator-value">{keyword}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default IndicatorsList;
