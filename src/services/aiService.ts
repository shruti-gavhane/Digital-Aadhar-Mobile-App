const API_KEY = "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";

// ✅ BEST FREE MODEL (MOST RELIABLE)
const MODEL = "meta-llama/llama-3-8b-instruct";


// 🔍 Scam Detection
export const detectScam = async (text: string) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "Classify as SAFE or SCAM with reason."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await res.json();
    console.log("DETECT:", data);

    // ❌ if API returns error
    if (data.error) {
      return "⚠️ AI unavailable. Try later.";
    }

    return data?.choices?.[0]?.message?.content ||
           "⚠️ Could not analyze.";

  } catch (err) {
    console.error(err);
    return "⚠️ Error analyzing message";
  }
};



// 💬 Scam Chat
export const generateScamMessage = async (conversation: string) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `
You are a scammer.

Rules:
- Message must be VERY SHORT (max 15 words)
- Sound like WhatsApp/SMS
- Use urgency
- Ask for OTP/money
- No long text

Example:
"Your account blocked. Send OTP now."
`
          },
          {
            role: "user",
            content: conversation
          }
        ]
      })
    });

    const data = await res.json();
    console.log("CHAT:", data);

    // ❌ if API returns error
    if (data.error) {
      return getFallbackReply(conversation);
    }

    return data?.choices?.[0]?.message?.content ||
           getFallbackReply(conversation);

  } catch (err) {
    console.error(err);
    return getFallbackReply(conversation);
  }
};



// 🔥 OFFLINE FALLBACK (VERY IMPORTANT)
const getFallbackReply = (conversation: string) => {
  const replies = [
    "Your account will be blocked today. Verify now.",
    "Click this link immediately to avoid suspension.",
    "You must confirm your identity within 10 minutes.",
    "Share OTP to complete verification.",
    "This is urgent. Failure will result in account freeze."
  ];

  return replies[Math.floor(Math.random() * replies.length)];
};