// Agentic AI Response Generator
export function generateAIResponse(scammerMessage) {
    const lower = scammerMessage.toLowerCase();

    // Detect what scammer is asking for
    const needsUPI = lower.includes('upi') || lower.includes('pay') || lower.includes('send') || lower.includes('@');
    const needsLink = lower.includes('link') || lower.includes('click') || lower.includes('website') || lower.includes('http');
    const needsOTP = lower.includes('otp') || lower.includes('code') || lower.includes('verification');
    const needsKYC = lower.includes('kyc') || lower.includes('verify') || lower.includes('document');
    const needsPhone = lower.includes('call') || lower.includes('number') || lower.includes('contact');

    // Confused responses based on context
    if (needsUPI) {
        const responses = [
            "UPI ka full naam kya hai sir? Payment app kaun sa use karna hai?",
            "Mere paas Google Pay hai. UPI ID kaise banaye? Step by step batao na.",
            "UPI mein amount kitna enter karna hai? Screenshot bhej do please.",
            "Payment successful nahi ho raha. Error aa raha hai. Kya karu?",
            "UPI pin yaad nahi aa raha. Reset kaise kare? Help kar do."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (needsLink) {
        const responses = [
            "Link open nahi ho rahi. Dobara bhejo please. Ya screenshot bhejo kya dikhta hai.",
            "Link par click kiya but kuch nahi hua. Kya karna hai ab?",
            "Link secure hai na? Mera phone hang nahi hoga? Thoda dar lag raha hai.",
            "Isme kaunsa app download karna hai? Name spelling batao.",
            "Link mein password maang raha hai. Kya enter karu?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (needsOTP) {
        const responses = [
            "OTP kahan aayega? SMS mein ya WhatsApp mein? Abhi tak nahi aaya.",
            "OTP ka expire time kitna hai? Jaldi batao kya enter karna hai.",
            "4 digit ka hai ya 6 digit ka? Confirm kar lo.",
            "OTP ke baad kya hoga? Payment ho jayegi automatically?",
            "OTP galat ho gaya lagta hai. Resend ka option kahan hai?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (needsKYC) {
        const responses = [
            "KYC ke liye kaunse documents chahiye? Aadhaar chalega?",
            "Photo kaise upload karu? Camera se lu ya gallery se?",
            "Mera KYC kitne din mein complete hoga? Urgent hai kya?",
            "KYC form bharna hai kya? Link ya app download karna padega?",
            "Bina KYC ke kya problem hogi? Service band ho jayegi kya?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (needsPhone) {
        const responses = [
            "Aapka official number kya hai? Main wapas call karunga verify karne ke liye.",
            "Aap kis company se bol rahe ho? Customer care number confirm kar do.",
            "Toll-free number hai kya? Main landline se call karunga.",
            "WhatsApp number bhi hai kya? SMS better hai mujhe.",
            "Call recording chal rahi hai? Security ke liye zaruri hai."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Generic confused responses
    const genericResponses = [
        "Thoda samajh nahi aaya. Hindi mein explain karo please.",
        "Wait karo, pen le leta hu notes ke liye. Phir se batao.",
        "Mere bete ko phone de du? Wo techie hai, samjha dega.",
        "Pehle aap apna naam aur company ka naam batao. Trust ke liye.",
        "Mujhe customer care se verify karna hai. Official email bhejo.",
        "Itna jaldi kyu hai? Kal nahi kar sakte kya ye sab?",
        "Ye sab safe hai na? Fraud toh nahi hai? News mein dekha tha aise scam.",
        "Aapke manager ka number do. Main unhe confirm karunga.",
        "Process samajh nahi aa rahi. Video tutorial hai kya?",
        "Koi charges toh nahi lagega na? Free service hai guarantee se?"
    ];

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Generate Scammer Response (Simulation)
export function generateScammerResponse(scamType) {
    if (scamType.includes('UPI')) {
        const responses = [
            "Sir, refund ke liye aapko ravi.sharma@ybl par Rs.1 send karna hoga for verification. Then 5000 credited hoga.",
            "Google Pay open karo aur hamara UPI ID add karo: support2023@paytm. Amount Rs.10 send karo testing ke liye.",
            "Link par click karo: https://refund-portal.tk/claim aur apna UPI PIN enter karo to activate cashback."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (scamType.includes('KYC')) {
        const responses = [
            "Sir apka KYC expire ho gaya hai. Update karne ke liye is link par jao: www.kyc-update-now.xyz aur Aadhaar details bharo.",
            "Verification ke liye call karo: +91-9876543210. OTP share karna hoga warna account block ho jayega 24 hours mein.",
            "KYC form download karo is link se: bit.ly/kyc2024 aur submit karo urgently. Service discontinue ho jayegi."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else {
        const responses = [
            "Ji sir, process complete karne ke liye hamari website par jao: secure-verify.in aur login karo with OTP.",
            "Customer care number hai: 8888777766. Call karke OTP confirm karo taki issue resolve ho.",
            "Link: https://bit.ly/urgent-action click karke immediately action lo warna penalty lagega."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
