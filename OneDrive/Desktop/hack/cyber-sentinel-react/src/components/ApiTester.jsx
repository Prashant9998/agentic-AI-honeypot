import { useState, useEffect } from 'react';
import './ApiTester.css';

function ApiTester({ onBack }) {
    const [apiUrl, setApiUrl] = useState('');
    const [apiKey, setApiKey] = useState('honeypot123');
    const [serverStatus, setServerStatus] = useState({ online: false, message: '⏳ Checking server status...' });

    // Login
    const [loginUsername, setLoginUsername] = useState('testuser');
    const [loginPassword, setLoginPassword] = useState('test123');
    const [loginResponse, setLoginResponse] = useState('Click "Test Login" to test...');

    // IVR
    const [ivrCallerId, setIvrCallerId] = useState('+919876543210');
    const [ivrInput, setIvrInput] = useState('My account is blocked');
    const [ivrResponse, setIvrResponse] = useState('Click "Test IVR" to test...');

    // KYC
    const [kycAadhaar, setKycAadhaar] = useState('123456789012');
    const [kycPan, setKycPan] = useState('ABCDE1234F');
    const [kycResponse, setKycResponse] = useState('Click "Test KYC" to test...');

    // Auth
    const [authResponse, setAuthResponse] = useState('Click "Test Unauthorized Access"...');

    useEffect(() => {
        // Auto-detect API base URL
        setApiUrl(window.location.origin);
        // Check server status
        checkServerStatus();
    }, []);

    const checkServerStatus = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/health`);
            const data = await response.json();

            if (response.ok) {
                setServerStatus({
                    online: true,
                    message: `✅ Server Online - ${data.total_interactions} total interactions logged`
                });
            } else {
                setServerStatus({
                    online: false,
                    message: '❌ Server Offline - Start with: py honeypot_api.py'
                });
            }
        } catch (error) {
            setServerStatus({
                online: false,
                message: '❌ Server Offline - Start with: py honeypot_api.py'
            });
        }
    };

    const testLogin = async () => {
        setLoginResponse('<span class="warning">⏳ Sending request...</span>');

        try {
            const response = await fetch(`${apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ username: loginUsername, password: loginPassword })
            });

            const data = await response.json();
            setLoginResponse(formatResponse(response, data));
        } catch (error) {
            setLoginResponse(`<span class="error">❌ Error: ${error.message}</span>`);
        }
    };

    const testIVR = async () => {
        setIvrResponse('<span class="warning">⏳ Sending request...</span>');

        try {
            const response = await fetch(`${apiUrl}/api/ivr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ caller_id: ivrCallerId, input: ivrInput })
            });

            const data = await response.json();
            setIvrResponse(formatResponse(response, data));
        } catch (error) {
            setIvrResponse(`<span class="error">❌ Error: ${error.message}</span>`);
        }
    };

    const testKYC = async () => {
        setKycResponse('<span class="warning">⏳ Sending request...</span>');

        try {
            const response = await fetch(`${apiUrl}/api/kyc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey
                },
                body: JSON.stringify({ aadhaar: kycAadhaar, pan: kycPan })
            });

            const data = await response.json();
            setKycResponse(formatResponse(response, data));
        } catch (error) {
            setKycResponse(`<span class="error">❌ Error: ${error.message}</span>`);
        }
    };

    const testUnauthorized = async () => {
        setAuthResponse('<span class="warning">⏳ Testing without API key...</span>');

        try {
            const response = await fetch(`${apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: 'hacker', password: 'password' })
            });

            const data = await response.json();

            if (response.status === 401) {
                setAuthResponse(`
          <span class="badge-success">PASSED</span>
          <span class="success">Authentication working correctly!</span><br><br>
          <strong>Status:</strong> ${response.status} Unauthorized<br>
          <strong>Response:</strong><pre>${JSON.stringify(data, null, 2)}</pre>
        `);
            } else {
                setAuthResponse(`
          <span class="badge-error">FAILED</span>
          <span class="error">Authentication not working - should return 401</span><br><br>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        `);
            }
        } catch (error) {
            setAuthResponse(`<span class="error">❌ Error: ${error.message}</span>`);
        }
    };

    const formatResponse = (response, data) => {
        let html = '';

        if (response.ok) {
            html += '<span class="badge-success">SUCCESS</span>';
            html += `<span class="success">Status: ${response.status} OK</span><br><br>`;
            html += '<strong style="color: #6366f1;">Response Data:</strong><br>';
            html += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } else {
            html += '<span class="badge-error">ERROR</span>';
            html += `<span class="error">Status: ${response.status}</span><br><br>`;
            html += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }

        return html;
    };

    const testAll = async () => {
        await checkServerStatus();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testLogin();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testIVR();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testKYC();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testUnauthorized();

        alert('✅ All tests completed! Check each section for results.');
    };

    return (
        <div className="api-tester-container">
            <h1>🛡️ Honeypot API Tester</h1>
            <p className="subtitle">FastAPI Edition - Test all endpoints before deployment</p>

            {onBack && (
                <button className="back-button" onClick={onBack}>
                    ← Back to Honeypot
                </button>
            )}

            <div className={`server-status ${serverStatus.online ? 'status-online' : 'status-offline'}`}>
                {serverStatus.message}
            </div>

            <div className="api-card">
                <div className="card-title">⚙️ Configuration</div>
                <label>API Base URL</label>
                <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                />

                <label>API Key (X-API-KEY)</label>
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
            </div>

            <div className="api-grid">
                <div className="api-card">
                    <div className="card-title">🏦 Test Login Endpoint</div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        placeholder="Enter username"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password"
                    />

                    <button onClick={testLogin}>🚀 Test Login</button>

                    <div className="response-section">
                        <div className="card-title" style={{ fontSize: '1rem' }}>Response:</div>
                        <div className="response-box" dangerouslySetInnerHTML={{ __html: loginResponse }} />
                    </div>
                </div>

                <div className="api-card">
                    <div className="card-title">📞 Test IVR Endpoint</div>
                    <label>Caller ID</label>
                    <input
                        type="text"
                        value={ivrCallerId}
                        onChange={(e) => setIvrCallerId(e.target.value)}
                        placeholder="Phone number"
                    />

                    <label>User Input</label>
                    <input
                        type="text"
                        value={ivrInput}
                        onChange={(e) => setIvrInput(e.target.value)}
                        placeholder="IVR input"
                    />

                    <button onClick={testIVR}>🚀 Test IVR</button>

                    <div className="response-section">
                        <div className="card-title" style={{ fontSize: '1rem' }}>Response:</div>
                        <div className="response-box" dangerouslySetInnerHTML={{ __html: ivrResponse }} />
                    </div>
                </div>

                <div className="api-card">
                    <div className="card-title">🆔 Test KYC Endpoint</div>
                    <label>Aadhaar Number</label>
                    <input
                        type="text"
                        value={kycAadhaar}
                        onChange={(e) => setKycAadhaar(e.target.value)}
                        placeholder="12-digit Aadhaar"
                    />

                    <label>PAN Number</label>
                    <input
                        type="text"
                        value={kycPan}
                        onChange={(e) => setKycPan(e.target.value)}
                        placeholder="PAN (e.g., ABCDE1234F)"
                    />

                    <button onClick={testKYC}>🚀 Test KYC</button>

                    <div className="response-section">
                        <div className="card-title" style={{ fontSize: '1rem' }}>Response:</div>
                        <div className="response-box" dangerouslySetInnerHTML={{ __html: kycResponse }} />
                    </div>
                </div>

                <div className="api-card">
                    <div className="card-title">🔐 Test Authentication</div>
                    <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Test unauthorized access (without API key)
                    </p>

                    <button
                        onClick={testUnauthorized}
                        style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                    >
                        🚫 Test Unauthorized Access
                    </button>

                    <div className="response-section">
                        <div className="card-title" style={{ fontSize: '1rem' }}>Response:</div>
                        <div className="response-box" dangerouslySetInnerHTML={{ __html: authResponse }} />
                    </div>
                </div>
            </div>

            <div className="api-card">
                <div className="card-title">🧪 Test All Endpoints</div>
                <button
                    onClick={testAll}
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', fontSize: '1.2rem' }}
                >
                    ✅ Run All Tests
                </button>
            </div>
        </div>
    );
}

export default ApiTester;
