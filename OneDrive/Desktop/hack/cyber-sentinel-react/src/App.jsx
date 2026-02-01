import { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import ScamInput from './components/ScamInput';
import ConversationLog from './components/ConversationLog';
import IntelligencePanel from './components/IntelligencePanel';
import IndicatorsList from './components/IndicatorsList';
import RiskAssessment from './components/RiskAssessment';
import ReportView from './components/ReportView';
import ApiTester from './components/ApiTester';
import { detectScamType, extractIndicators } from './utils/scamDetection';
import { generateAIResponse, generateScammerResponse } from './utils/aiResponses';
import { VoiceHandler, speakText } from './utils/voiceHandler';

const MAX_TURNS = 20;

function App() {
    const [currentPage, setCurrentPage] = useState('honeypot'); // 'honeypot' or 'api-tester'
    const [scamInput, setScamInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [indicators, setIndicators] = useState({
        upi_ids: [],
        urls: [],
        phones: [],
        keywords: []
    });
    const [scamType, setScamType] = useState('Unknown');
    const [isActive, setIsActive] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [voiceActive, setVoiceActive] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [scammerLastMessage, setScammerLastMessage] = useState('');

    const voiceHandlerRef = useRef(new VoiceHandler());

    // Add message to conversation
    const addMessage = (text, type, turn = null) => {
        const newMessage = {
            type,
            text,
            timestamp: new Date(),
            turn
        };

        setConversation(prev => [...prev, newMessage]);
        setMessageCount(prev => prev + 1);
    };

    // Initialize honeypot
    const handleInitialize = () => {
        const input = scamInput.trim();

        if (!input) {
            alert('Please paste a scam message first!');
            return;
        }

        // Reset state
        setConversation([]);
        setIndicators({ upi_ids: [], urls: [], phones: [], keywords: [] });
        setMessageCount(0);
        setIsActive(true);
        setCurrentTurn(0);
        setShowReport(false);

        // Detect scam type
        const detectedType = detectScamType(input);
        setScamType(detectedType);

        // Extract initial indicators
        const { indicators: newIndicators } = extractIndicators(input, { upi_ids: [], urls: [], phones: [], keywords: [] });
        setIndicators(newIndicators);

        // Add to conversation
        setScammerLastMessage(input);
        addMessage(input, 'scammer');
        addMessage('HONEYPOT ACTIVATED. AI AGENT DEPLOYED...', 'system');

        // Generate first AI response
        setTimeout(() => {
            setCurrentTurn(1);
            const aiResponse = generateAIResponse(input);
            addMessage(aiResponse, 'ai', 1);
        }, 1000);
    };

    // Continue conversation
    const handleContinue = () => {
        if (!isActive) return;

        addMessage('SIMULATING SCAMMER RESPONSE...', 'system');

        setTimeout(() => {
            // Generate simulated scammer response
            const scammerResponse = generateScammerResponse(scamType);
            setScammerLastMessage(scammerResponse);
            addMessage(scammerResponse, 'scammer');

            // Extract indicators
            const { indicators: updatedIndicators } = extractIndicators(scammerResponse, indicators);
            setIndicators(updatedIndicators);

            // AI responds
            setTimeout(() => {
                const newTurn = currentTurn + 1;
                setCurrentTurn(newTurn);
                const aiResponse = generateAIResponse(scammerResponse);
                addMessage(aiResponse, 'ai', newTurn);

                // Check if max turns reached
                if (newTurn >= MAX_TURNS) {
                    addMessage(`MAXIMUM TURNS (${MAX_TURNS}) REACHED. INTELLIGENCE GATHERED.`, 'system');
                    handleStop();
                }
            }, 1500);
        }, 1000);
    };

    // Toggle voice call
    const handleVoiceToggle = () => {
        const voiceHandler = voiceHandlerRef.current;

        if (!voiceHandler.isSupported()) {
            alert('Speech Recognition not supported in this browser.\\n\\nPlease use:\\n✅ Google Chrome\\n✅ Microsoft Edge\\n\\nMake sure you\'re accessing via HTTPS or localhost.');
            return;
        }

        if (!voiceActive) {
            // Start voice
            setVoiceActive(true);
            addMessage('📞 VOICE CHANNEL OPEN. ENGAGING TARGET...', 'system');

            const success = voiceHandler.start(
                (transcript) => {
                    // On voice result
                    addMessage(`🎤 YOU (Voice): ${transcript}`, 'ai');

                    // Extract indicators
                    const { indicators: updatedIndicators } = extractIndicators(transcript, indicators);
                    setIndicators(updatedIndicators);

                    // Generate scammer response
                    setTimeout(() => {
                        const scammerResponse = generateScammerResponse(scamType);
                        setScammerLastMessage(scammerResponse);
                        addMessage(scammerResponse, 'scammer');

                        const { indicators: finalIndicators } = extractIndicators(scammerResponse, updatedIndicators);
                        setIndicators(finalIndicators);

                        // Speak the response
                        speakText(scammerResponse);
                        addMessage('🔊 AI SPEAKING...', 'system');
                    }, 1000);
                },
                (error) => {
                    // On error
                    addMessage(`❌ VOICE ERROR: ${error}`, 'system');
                    if (error === 'no-speech') {
                        addMessage('⚠️ No speech detected. Please speak clearly.', 'system');
                    }
                }
            );

            if (!success) {
                setVoiceActive(false);
                addMessage('❌ FAILED TO INITIALIZE AUDIO SUBSYSTEM', 'system');
            }
        } else {
            // Stop voice
            setVoiceActive(false);
            voiceHandler.stop();
            addMessage('📞 VOICE CHANNEL CLOSED', 'system');
        }
    };

    // Stop honeypot
    const handleStop = () => {
        setIsActive(false);
        setVoiceActive(false);
        voiceHandlerRef.current.stop();
        addMessage('HONEYPOT STOPPED. SESSION TERMINATED.', 'system');
    };

    // Clear all
    const handleReset = () => {
        if (confirm('This will clear all data. Continue?')) {
            setScamInput('');
            setConversation([]);
            setIndicators({ upi_ids: [], urls: [], phones: [], keywords: [] });
            setScamType('Unknown');
            setMessageCount(0);
            setIsActive(false);
            setCurrentTurn(0);
            setVoiceActive(false);
            setShowReport(false);
            voiceHandlerRef.current.stop();
        }
    };

    // View report
    const handleViewReport = () => {
        if (conversation.length === 0) {
            alert('No data to generate report. Start honeypot first.');
            return;
        }
        setShowReport(true);
    };

    // Back to main
    const handleBackToMain = () => {
        setShowReport(false);
    };

    // Calculate total indicators for display
    const totalIndicators =
        indicators.upi_ids.length +
        indicators.urls.length +
        indicators.phones.length +
        indicators.keywords.length;

    return (
        <div className="container">
            <Header />

            {/* Page Toggle Button */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    className={currentPage === 'honeypot' ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => setCurrentPage('honeypot')}
                    style={{ marginRight: '10px', width: 'auto', minWidth: '150px' }}
                >
                    🛡️ Honeypot
                </button>
                <button
                    className={currentPage === 'api-tester' ? 'btn-primary' : 'btn-secondary'}
                    onClick={() => setCurrentPage('api-tester')}
                    style={{ width: 'auto', minWidth: '150px' }}
                >
                    🧪 API Tester
                </button>
            </div>

            {currentPage === 'api-tester' ? (
                <ApiTester onBack={() => setCurrentPage('honeypot')} />
            ) : !showReport ? (
                <div id="mainView">
                    <div className="main-grid">
                        {/* LEFT COLUMN */}
                        <div>
                            <ScamInput
                                scamInput={scamInput}
                                setScamInput={setScamInput}
                                onInitialize={handleInitialize}
                                onReset={handleReset}
                            />

                            <ConversationLog
                                conversation={conversation}
                                onContinue={handleContinue}
                                onVoiceToggle={handleVoiceToggle}
                                onStop={handleStop}
                                isActive={isActive}
                                voiceActive={voiceActive}
                                voiceSupported={voiceHandlerRef.current.isSupported()}
                            />
                        </div>

                        {/* RIGHT COLUMN */}
                        <div>
                            <IntelligencePanel
                                scamType={scamType}
                                messageCount={messageCount}
                                indicatorCount={totalIndicators}
                            />

                            <IndicatorsList indicators={indicators} />

                            <RiskAssessment
                                indicators={indicators}
                                onViewReport={handleViewReport}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <ReportView
                    conversation={conversation}
                    indicators={indicators}
                    scamType={scamType}
                    messageCount={messageCount}
                    onBack={handleBackToMain}
                />
            )}
        </div>
    );
}

export default App;
