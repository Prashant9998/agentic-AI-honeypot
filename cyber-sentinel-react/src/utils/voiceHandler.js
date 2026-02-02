// Voice Recognition Handler
export class VoiceHandler {
    constructor() {
        this.recognition = null;
        this.isActive = false;
        this.onResult = null;
        this.onError = null;

        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true; // Changed to true for better detection
            this.recognition.lang = 'hi-IN'; // Changed to Hindi-India for better recognition
            this.recognition.maxAlternatives = 3; // Get multiple alternatives

            this.recognition.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1];
                const transcript = lastResult[0].transcript;

                // Only trigger on final results to avoid duplicates
                if (lastResult.isFinal && transcript.trim().length > 0) {
                    console.log('Voice detected:', transcript);
                    if (this.onResult) {
                        this.onResult(transcript);
                    }
                }
            };

            this.recognition.onerror = (event) => {
                if (this.onError) {
                    this.onError(event.error);
                }
            };

            this.recognition.onend = () => {
                // Auto-restart if still active
                if (this.isActive) {
                    try {
                        this.recognition.start();
                    } catch (e) {
                        // Already running, ignore
                    }
                }
            };
        }
    }

    start(onResult, onError) {
        if (!this.recognition) {
            if (onError) {
                onError('Speech Recognition not supported');
            }
            return false;
        }

        this.onResult = onResult;
        this.onError = onError;
        this.isActive = true;

        try {
            this.recognition.start();
            return true;
        } catch (e) {
            this.isActive = false;
            if (onError) {
                onError('Failed to start recognition');
            }
            return false;
        }
    }

    stop() {
        this.isActive = false;
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    isSupported() {
        return !!this.recognition;
    }
}

// Text-to-Speech Handler
export function speakText(text) {
    if ('speechSynthesis' in window) {
        // Stop any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-IN'; // Indian English accent

        speechSynthesis.speak(utterance);
        return true;
    }
    return false;
}
