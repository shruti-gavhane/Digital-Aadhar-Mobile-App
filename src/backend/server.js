const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // IMPORTANT
app.use(express.json());

app.post('/api/scam', (req, res) => {
  const { type } = req.body;

  let message = "";

  if (type === "elderly") {
    message = "Your pension account will be blocked today. Share OTP immediately.";
  } else if (type === "student") {
    message = "You got ₹10,000 scholarship. Click link to claim.";
  } else {
    message = "Urgent! Your account will be blocked in 1 hour.";
  }

  res.json({ message });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));