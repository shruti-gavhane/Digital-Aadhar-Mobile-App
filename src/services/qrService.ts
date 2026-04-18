export const analyzeQR = async (url: string) => {
  const lower = url.toLowerCase();

  // 🔥 UPI Detection (same logic as your Angular file)
  if (
    lower.startsWith("upi://") ||
    lower.includes("pa=") ||
    (lower.includes("@") && (lower.includes("ok") || lower.includes("upi"))) ||
    lower.includes("pay?")
  ) {
    const match = url.match(/pa=([^&]+)/);
    const upiId = match ? match[1] : "Unknown";

    return {
      safe: true,
      message: `UPI Payment QR detected. Receiver: ${upiId}`
    };
  }

  // 🔥 Backend API call (replace with your API)
  try {
    const res = await fetch("YOUR_API_URL/check-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    return {
      safe: data.isSafe,
      message: data.reason
    };

  } catch {
    return {
      safe: false,
      message: "Error analyzing QR"
    };
  }
};