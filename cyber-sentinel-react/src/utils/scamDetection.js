// Scam Type Detection
export function detectScamType(text) {
    const lower = text.toLowerCase();

    if (lower.includes('refund') || lower.includes('cashback') || lower.includes('credited')) {
        return 'UPI Refund Scam';
    } else if (lower.includes('kyc') || lower.includes('verify') || lower.includes('update') || lower.includes('expired')) {
        return 'KYC Update Scam';
    } else if (lower.includes('parcel') || lower.includes('courier') || lower.includes('delivery') || lower.includes('package')) {
        return 'Courier/Delivery Scam';
    } else if (lower.includes('computer') || lower.includes('virus') || lower.includes('antivirus') || lower.includes('technical')) {
        return 'Tech Support Scam';
    } else if (lower.includes('prize') || lower.includes('winner') || lower.includes('lottery') || lower.includes('congratulations')) {
        return 'Prize/Lottery Scam';
    } else if (lower.includes('loan') || lower.includes('approval') || lower.includes('credit')) {
        return 'Loan Approval Scam';
    }

    return 'Generic Scam';
}

// Indicator Extraction Engine
export function extractIndicators(text, existingIndicators) {
    const indicators = existingIndicators || {
        upi_ids: [],
        urls: [],
        phones: [],
        keywords: []
    };

    const newIndicators = {
        upi_ids: [],
        urls: [],
        phones: [],
        keywords: []
    };

    // UPI IDs
    const upiPattern = /[a-zA-Z0-9._-]+@(upi|ybl|paytm|oksbi|okicici|okaxis|okhdfcbank)/g;
    const upiMatches = text.match(upiPattern);
    if (upiMatches) {
        upiMatches.forEach(upi => {
            if (!indicators.upi_ids.includes(upi)) {
                indicators.upi_ids.push(upi);
                newIndicators.upi_ids.push(upi);
            }
        });
    }

    // URLs
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(com|in|net|org|xyz|tk|ml|ga|cf|click)[^\s]*|bit\.ly\/[^\s]+)/g;
    const urlMatches = text.match(urlPattern);
    if (urlMatches) {
        urlMatches.forEach(url => {
            if (!indicators.urls.includes(url)) {
                indicators.urls.push(url);
                newIndicators.urls.push(url);
            }
        });
    }

    // Phone numbers
    const phonePattern = /(\+91[-\s]?)?[6789]\d{9}/g;
    const phoneMatches = text.match(phonePattern);
    if (phoneMatches) {
        phoneMatches.forEach(phone => {
            if (!indicators.phones.includes(phone)) {
                indicators.phones.push(phone);
                newIndicators.phones.push(phone);
            }
        });
    }

    // Keywords
    const keywordList = ['otp', 'kyc', 'refund', 'urgent', 'verify', 'block', 'suspended', 'expire', 'click', 'link', 'activate', 'confirm', 'account', 'payment', 'transfer'];
    keywordList.forEach(keyword => {
        if (text.toLowerCase().includes(keyword) && !indicators.keywords.includes(keyword)) {
            indicators.keywords.push(keyword);
            newIndicators.keywords.push(keyword);
        }
    });

    return { indicators, newIndicators };
}

// Risk Scoring
export function calculateRisk(indicators) {
    const totalIndicators =
        indicators.upi_ids.length +
        indicators.urls.length +
        indicators.phones.length +
        (indicators.keywords.length > 5 ? 5 : indicators.keywords.length);

    if (totalIndicators >= 4) return 'HIGH';
    if (totalIndicators >= 2) return 'MEDIUM';
    return 'LOW';
}
