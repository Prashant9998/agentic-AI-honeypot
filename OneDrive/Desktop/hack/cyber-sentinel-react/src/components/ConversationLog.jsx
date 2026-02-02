import React, { useEffect, useRef } from 'react';

function ConversationLog({ conversation, onContinue, onVoiceToggle, onStop, isActive, voiceActive, voiceSupported }) {
    const logRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to bottom
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [conversation]);

    return (
        <div className="card" style={{ marginTop: '20px' }}>
            <div className="card-title">💬 TERMINAL LOG</div>
            <div className="conversation" ref={logRef}>
                {conversation.length === 0 ? (
                    <div className="empty-state">SYSTEM IDLE. AWAITING INPUT...</div>
                ) : (
                    conversation.map((msg, index) => (
                        <div key={index} className={`message ${msg.type}`}>
                            {msg.turn !== null && msg.type === 'ai' && (
                                <div className="turn-counter">
                                    AI User speaking (Turn {msg.turn}/20)
                                </div>
                            )}
                            <div className="message-label">
                                {msg.type === 'scammer' ? '🚨 SCAMMER' : msg.type === 'ai' ? '🤖 AI AGENT' : 'ℹ️ SYSTEM'}
                            </div>
                            <div className="message-text">{msg.text}</div>
                        </div>
                    ))
                )}
            </div>
            <div className="btn-group" style={{ marginTop: '15px' }}>
                <button
                    className="btn-secondary"
                    onClick={onContinue}
                    disabled={!isActive}
                >
                    ⏭️ NEXT CYCLE
                </button>
                <button
                    className={voiceActive ? 'btn-danger' : 'btn-success'}
                    onClick={onVoiceToggle}
                    disabled={!isActive}
                >
                    {voiceActive ? '🔴 TERMINATE VOICE' : '🎤 ENGAGE VOICE'}
                </button>
                <button
                    className="btn-danger"
                    onClick={onStop}
                    disabled={!isActive}
                >
                    ⏹️ TERMINATE
                </button>
            </div>
        </div>
    );
}

export default ConversationLog;
