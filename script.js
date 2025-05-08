const userInput = document.getElementById("userInput");
const chatOutput = document.getElementById("chatbox");
const voiceBtn = document.getElementById("voiceBtn");
const sendBtn = document.getElementById("sendBtn");

// Utility: Speak text
const speakMessage = (message) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.voice = synth.getVoices()[0]; // You can customize the voice
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.pitch = 1;
  synth.speak(utterance);
};

// Add user/bot message to chat window
function addMessage(text, sender = "user") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatOutput.appendChild(msg);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Astra typing animation
function typeMessage(text) {
  const msg = document.createElement("div");
  msg.className = "message bot";
  chatOutput.appendChild(msg);

  let i = 0;
  const typing = setInterval(() => {
    msg.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typing);
      speakMessage(text);
    }
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }, 30);
}

// Greet user on load
function wishMe() {
  const hour = new Date().getHours();
  if (hour < 12) speakMessage("Good Morning Sir...");
  else if (hour < 17) speakMessage("Good Afternoon Sir...");
  else speakMessage("Good Evening Sir...");
}

window.addEventListener("load", () => {
  speakMessage("Initializing Astra...");
  wishMe();
});

// Voice input setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript;
  addMessage(transcript, "user");
  takeCommand(transcript.toLowerCase());
};

voiceBtn.addEventListener("click", () => {
  recognition.start();
});

// Send button and Enter key input
sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// Handle typed input
function handleUserInput() {
  const input = userInput.value.trim();
  if (input === "") return;
  addMessage(input, "user");
  userInput.value = "";
  takeCommand(input.toLowerCase());
}

// Here is the Space for Additional Functionality 

// Utility: Random thank you reply
const thankYouReply = () => {
  const responses = [
    "You're most welcome!",
    "Happy to help!",
    "Anytime! Let me know if you need anything else.",
    "Glad I could assist you!",
    "It's my pleasure!",
    "You're most welcome! If you need anything else, I am always here to help."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Utility: Random jokes
const randomjokes = () => {
  const jokes = [
    "टीचर: बताओ पृथ्वी से आसमान तक क्या है? छात्र: सर छत!",
    "पप्पू डॉक्टर के पास: जब मैं चाय पीता हूँ तो आँख में दर्द होता है। डॉक्टर: कभी चम्मच निकाल कर पीकर देखो!",
    "राजू: मुझे शादी नहीं करनी यार। दोस्त: क्यों? राजू: बीवी से तो माँ अच्छी है, कम से कम प्यार से मारती है!",
    "संता: बीवी का जन्मदिन भूल गया था... अब खुद की सालगिरह ICU में मना रहा हूँ!",
    "बॉयलर: मैं तुम्हारे बिना अधूरा हूँ... कप: जा पहले दूध तो उबाल!",
    "पप्पू ATM में गया, स्क्रीन पर लिखा था: 'Please insert your card'... पप्पू ने लिखा: 'Dear ATM, card डाल दिया है, अब पैसे दे दो!'",
    "गब्बर: कितने आदमी थे? बच्चा: दो सर! गब्बर: Homework किया? बच्चा: नहीं सर... गब्बर: बहुत नाइंसाफी है!",
    "मास्टरजी: इतनी देर से कहां थे? छात्र: मास्टर जी नींद नहीं आ रही थी तो सोने चला गया!",
    "राजू: भगवान मुझे लैपटॉप दे दो... भगवान: पहले वो पुराना पंखा तो ठीक से इस्तेमाल कर!",
    "टीचर: इतने दिन कहां थे? छात्र: घर पर ही था, ऑनलाइन क्लास में NETWORK नहीं था!"
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
};

//Utility: Help
const helpMe = () => {
  const help = [
        "How can I assist you today?",
        "Of course! What do you need help with today?",
        "What do you need help with?",
        "I'm here to help. What can I do for you?",
        "Tell me what you need, and I'll assist you.",
        "Sure! What would you like help with?",
        "Feel free to ask me anything!",
        "How can I make your day easier?",
        "What can I do to help you right now?",
        "I'm ready to assist! What's your request?",
        "I'm at your service. What can I help you with?",
        "What can I do for you today?",
        "Tell me how I can assist you.",
        "Need help with something? Let me know!",
        "I'm here for you—what do you need help with?",
        "How can I support you today?",
        "What can I assist you with right now?",
        "Let me know how I can make things better for you!",
        "I'm ready to lend a hand. What do you need?",
        "You’ve got my attention. What do you need help with?",
        "I’m ready to solve any problem you have. What’s up?"
  ];
  return help[Math.floor(Math.random() * help.length)];
};

// Astra Utility: Random Motivational Quotes
const randomMotivation = () => {
  const quotes = [
    "Believe in yourself and all that you are.",
    "Don't watch the clock; do what it does. Keep going.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The key to success is to focus on goals, not obstacles.",
    "Don't stop when you're tired. Stop when you're done.",
    "Stay positive, work hard, make it happen.",
    "Doubt kills more dreams than failure ever will.",
    "Little things make big days.",
    "Your only limit is your mind.",
    "The way to get started is to quit talking and begin doing.",
    "Don't limit your challenges. Challenge your limits.",
    "Work hard in silence, let your success make the noise.",
    "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    "It always seems impossible until it's done."
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};
// Astra Utility: Advanced Calculator
const advancedCalculator = (expression) => {
  try {
    // Replacing verbal commands with mathematical operators
    expression = expression
      .replace(/plus/gi, "+")
      .replace(/minus/gi, "-")
      .replace(/multiplied by|times/gi, "*")
      .replace(/divided by/gi, "/")
      .replace(/into/gi, "*")
      .replace(/over/gi, "/")
      .replace(/power of/gi, "**")
      .replace(/square root of/gi, "Math.sqrt")
      .replace(/cube root of/gi, "Math.cbrt")
      .replace(/percent of/gi, "*0.01*");

    // Handle Math.sqrt and Math.cbrt separately
    if (expression.includes("Math.sqrt") || expression.includes("Math.cbrt")) {
      // Example: Math.sqrt(25)
      const number = expression.match(/\d+/);
      if (expression.includes("Math.sqrt")) {
        return `The square root is ${Math.sqrt(Number(number))}`;
      } else if (expression.includes("Math.cbrt")) {
        return `The cube root is ${Math.cbrt(Number(number))}`;
      }
    }

    // Basic evaluation
    if (/^[\d+\-*/().\s^]+$/.test(expression)) {
      const result = eval(expression);
      return `The answer is ${result}`;
    } else {
      return "Sorry, I can only perform basic and intermediate calculations.";
    }
  } catch (error) {
    return "There was an error in your calculation. Please try again.";
  }
};




// Command logic
// Calculator Mode Tracker
let calculatorMode = false;

// Modified takeCommand function
function takeCommand(message) {
  if (calculatorMode) {
    if (message.includes("exit calculator mode") || message.includes("leave calculator mode")) {
      calculatorMode = false;
      typeMessage("Exited calculator mode. I'm back to normal operations, Boss.");
    } else {
      const calcResult = advancedCalculator(message);
      typeMessage(calcResult);
    }
    return;
  }

  // Normal command handling
  if (message.includes("calculator mode")) {
    calculatorMode = true;
    typeMessage("Calculator mode activated. You can now tell me calculations to solve. Say 'exit calculator mode' when done.");
  }
  else if (message.includes("hello") ||
      message.includes("hey") ||
      message.includes("hi") ||
      message.includes("listen")) {
    typeMessage("Hello Sir, how can I help you?");
  }
  else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString();
    typeMessage("The current time is " + time);
  }
  else if (message.includes("date")) {
    const date = new Date().toLocaleDateString();
    typeMessage("Today's date is " + date);
  }
  else if (message.includes("your name")) {
    typeMessage("My name is Astra, your virtual assistant.");
  }
  else if (message.includes("who am i") || message.includes("who i am")) {
    typeMessage("You are my Boss");
  }
  else if (message.includes("thank you") ||
           message.includes("thanks") ||
           message.includes("thankyou") ||
           message.includes("thank you so much")) {
    const reply = thankYouReply();
    typeMessage(reply);
  }
  else if (message.includes("tell me a joke") ||
           message.includes("jokes") ||
           message.includes("entertain me") ||
           message.includes("make me laugh")) {
    const jokeReply = randomjokes();
    typeMessage(jokeReply);
  }
  else if (message.includes("help me") ||
           message.includes("help") ||
           message.includes("i am in trouble") ||
           message.includes("solve") ||
           message.includes("can you help me")) {
    const helpRequest = helpMe();
    typeMessage(helpRequest);
  }
  else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    typeMessage("Opening Youtube...");
  }
  else if (message.includes("open whatsapp")) {
    window.open("https://whatsapp.com", "_blank");
    typeMessage("Opening Whatsapp...");
  }
  else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    typeMessage("Opening Facebook...");
  }
  else if (message.includes("open instagram")) {
    window.open("https://instagram.com", "_blank");
    typeMessage("Opening Instagram...");
  }
  else if (message.includes("open spotify")) {
    window.open("https://spotify.com", "_blank");
    typeMessage("Opening Spotify...");
  }
  else if (message.includes("lets do it")) {
    //window.open("https://play.google.com", "_blank");
    typeMessage("टीचर: बताओ पृथ्वी से आसमान तक क्या है? बच्चा: सर छत!");
  }
  else if (message.includes("dark mode")) {
    document.body.classList.add("dark-mode");
    typeMessage("Dark mode activated.");
  }
  else if (message.includes("light mode")) {
    document.body.classList.remove("dark-mode");
    typeMessage("Light mode activated.");
  } else if (message.includes("calculate") ||
         message.includes("what is") ||
         message.includes("solve") ||
         message.includes("square root") ||
         message.includes("cube root") ||
         message.includes("power of") ||
         message.includes("percent")) {
  const expression = message
    .replace(/(calculate|what is|solve|square root|cube root|power of|percent)/gi, "")
    .trim();
  if (expression) {
    const calcResult = advancedCalculator(expression);
    typeMessage(calcResult);
   } else {
    typeMessage("Please provide a calculation for me to solve.");
   }
  }else {
    typeMessage("Sorry, I couldn't understand that. Please try something else.");
  }
}
// End of the Code

  hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  sidebar.style.left = sidebar.style.left === "0px" ? "-260px" : "0px";
});
