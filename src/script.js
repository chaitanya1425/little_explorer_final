// Sound effects
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const successSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => console.log("Audio play blocked"));
}

function playSuccess() {
  successSound.currentTime = 0;
  successSound.play().catch(e => console.log("Audio play blocked"));
}

// Voice Learning
window.speakWord = function(word) {
  playClick();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-IN';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
  
  // Visual feedback
  const chips = document.querySelectorAll('.voice-chip');
  chips.forEach(chip => {
    if (chip.innerText.includes(word)) {
      chip.style.background = '#ffd54f';
      setTimeout(() => chip.style.background = '', 500);
    }
  });
}

// Daily Culture Card
const dailyItems = [
  { title: "Diwali Fact", text: "Diwali is celebrated by over 1 billion people worldwide!" },
  { title: "Sanskrit Shloka", text: "Ahimsa Paramo Dharma - Non-violence is the highest duty." },
  { title: "Value of the Day", text: "Always touch the feet of your elders to seek their blessings." },
  { title: "National Bird", text: "The Peacock was declared the National Bird of India in 1963." },
  { title: "Yoga Fact", text: "Yoga originated in India more than 5,000 years ago!" }
];

function updateDailyCard() {
  const item = dailyItems[Math.floor(Math.random() * dailyItems.length)];
  const titleEl = document.getElementById('daily-title');
  const textEl = document.getElementById('daily-text');
  if (titleEl && textEl) {
    titleEl.innerText = item.title;
    textEl.innerText = item.text;
  }
}
updateDailyCard();

// Interactive Festival Animations
window.triggerFestivalAnim = function(type, event) {
  playClick();
  const container = document.getElementById(`${type}-area`);
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const emojis = {
    diwali: ['✨', '🪔', '🌟'],
    holi: ['🎨', '💦', '🌈'],
    raksha: ['🧵', '❤️', '🎁'],
    ganesh: ['🐘', '🍬', '🌸'],
    makar: ['🪁', '🌤️', '🧵']
  };

  for (let i = 0; i < 8; i++) {
    const splash = document.createElement('div');
    splash.className = 'splash';
    splash.innerText = emojis[type][Math.floor(Math.random() * emojis[type].length)];
    splash.style.left = x + 'px';
    splash.style.top = y + 'px';
    
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200;
    splash.style.setProperty('--tx', `${tx}px`);
    splash.style.setProperty('--ty', `${ty}px`);
    
    container.appendChild(splash);
    setTimeout(() => splash.remove(), 600);
  }
  
  checkBadge('explorer');
}

// Map Info
const mapData = {
  'North India': {
    festival: 'Lohri, Baisakhi',
    food: 'Paratha, Chole Bhature',
    dress: 'Salwar Kameez, Kurta Pajama'
  },
  'West India': {
    festival: 'Ganesh Chaturthi, Navratri',
    food: 'Dhokla, Vada Pav',
    dress: 'Sari, Dhoti'
  },
  'East India': {
    festival: 'Durga Puja, Bihu',
    food: 'Rosogolla, Fish Curry',
    dress: 'Mekhela Sador, Dhoti-Panjabi'
  },
  'South India': {
    festival: 'Onam, Pongal',
    food: 'Idli, Dosa, Sambar',
    dress: 'Lungi, Mundu, Sari'
  },
  'Central India': {
    festival: 'Bastariya Dussehra',
    food: 'Dal Bafla, Poha',
    dress: 'Chanderi Sari, Bandhani'
  }
};

window.showStateInfo = function(region) {
  playClick();
  const data = mapData[region];
  const infoCard = document.getElementById('state-info');
  infoCard.innerHTML = `
    <h3 style="color: var(--primary);">${region} 📍</h3>
    <p><strong>Festival:</strong> ${data.festival}</p>
    <p><strong>Food:</strong> ${data.food}</p>
    <p><strong>Dress:</strong> ${data.dress}</p>
  `;
  checkBadge('scholar');
}

// Rangoli Tool
const canvas = document.getElementById('rangoli-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let color = '#ff1744';

  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
    checkBadge('artist');
  });
  canvas.addEventListener('mousemove', draw);

  window.setRangoliColor = function(c) {
    color = c;
    playClick();
  }

  function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  window.clearRangoli = function() {
    playClick();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.downloadRangoli = function() {
    playClick();
    const link = document.createElement('a');
    link.download = 'my-rangoli.png';
    link.href = canvas.toDataURL();
    link.click();
  }
}

// Badges System
const badges = JSON.parse(localStorage.getItem('bharat_badges') || '{}');

function checkBadge(type) {
  if (!badges[type]) {
    badges[type] = true;
    localStorage.setItem('bharat_badges', JSON.stringify(badges));
    unlockBadgeUI(type);
  }
}

function unlockBadgeUI(type) {
  const el = document.getElementById(`badge-${type}`);
  if (el && el.classList.contains('locked')) {
    el.classList.remove('locked');
    el.classList.add('unlocked');
    playSuccess();
    // Show notification
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background:var(--accent); padding:15px 30px; border-radius:50px; font-weight:bold; z-index:3000; box-shadow:var(--shadow);';
    toast.innerText = `🏆 New Badge Unlocked: ${el.querySelector('h4').innerText}!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

// Load Badges on Start
function loadBadges() {
  Object.keys(badges).forEach(type => {
    const el = document.getElementById(`badge-${type}`);
    if (el) {
      el.classList.remove('locked');
      el.classList.add('unlocked');
    }
  });
}
loadBadges();

// AI Chatbot Logic
import { GoogleGenAI } from "@google/genai";

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

if (chatToggle) {
  chatToggle.onclick = () => {
    playClick();
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
  };
}

if (chatClose) {
  chatClose.onclick = () => {
    chatWindow.style.display = 'none';
  };
}

async function handleChat() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  chatInput.value = '';
  playClick();

  const loadingMsg = addMessage('Thinking...', 'bot');

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: text,
      config: {
        systemInstruction: "You are Bharat Buddy, a friendly cartoon elephant guide for kids aged 4-10. Answer questions about Indian culture, festivals, and values in very simple, happy, and short sentences. Use emojis! If asked something non-cultural, politely steer back to India."
      }
    });

    loadingMsg.remove();
    const botReply = response.text || "I'm a bit sleepy! Ask me again? 🐘";
    addMessage(botReply, 'bot');
    
    // Voice response
    const utterance = new SpeechSynthesisUtterance(botReply);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);

  } catch (error) {
    if (loadingMsg) loadingMsg.remove();
    addMessage("Oops! My trunk is tangled. Try again! 🐘", 'bot');
  }
}

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

if (chatSend) chatSend.onclick = handleChat;
if (chatInput) chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleChat(); };

// Data for Modals
const contentData = {
  diwali: {
    title: "Diwali - Festival of Lights",
    text: "Diwali is one of the biggest festivals in India! It celebrates the victory of light over darkness and good over evil. People light lamps (diyas), burst crackers, and eat yummy sweets.",
    importance: "It marks the return of Lord Rama to Ayodhya after 14 years."
  },
  holi: {
    title: "Holi - Festival of Colors",
    text: "Holi is a super fun festival where everyone plays with colors and water! It's a time to celebrate spring and friendship.",
    importance: "It celebrates the story of Prahlad and the arrival of spring."
  },
  raksha: {
    title: "Raksha Bandhan",
    text: "This festival celebrates the bond between brothers and sisters. Sisters tie a colorful thread called 'Rakhi' on their brother's wrist.",
    importance: "It's a promise of protection and love."
  },
  ganesh: {
    title: "Ganesh Chaturthi",
    text: "We welcome Lord Ganesha, the elephant-headed God, into our homes with music and modaks!",
    importance: "Ganesha is the God of wisdom and new beginnings."
  },
  makar: {
    title: "Makar Sankranti",
    text: "Look at the sky! It's full of colorful kites. We eat sweets made of sesame (til) and jaggery (gul).",
    importance: "It marks the transition of the sun into the zodiac sign of Capricorn."
  },
  story1: {
    title: "The Lion and the Rabbit",
    text: "Once, a clever rabbit saved all the animals from a greedy lion by tricking him into jumping into a well, thinking his own reflection was another lion.",
    moral: "Intelligence is stronger than physical strength."
  },
  story2: {
    title: "The Thirsty Crow",
    text: "A thirsty crow found a pitcher with very little water. He dropped pebbles into it one by one until the water level rose and he could drink.",
    moral: "Where there's a will, there's a way."
  },
  audio_gayatri: {
    title: "Gayatri Mantra",
    text: "The Gayatri Mantra is a sacred chant that brings peace and wisdom.",
    shlokaText: "Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat",
    meaning: "O Divine Mother, may your light illuminate our intellect and lead us on the righteous path.",
    importance: "It is one of the oldest and most powerful mantras in the world."
  },
  audio_guru: {
    title: "Guru Mantra",
    text: "The Guru Mantra honors our teachers who guide us.",
    shlokaText: "Gurur Brahma Gurur Vishnuh Gurur Devo Maheshvarah, Guruh Sakshat Parabrahma Tasmai Shri Gurave Namah",
    meaning: "The teacher is like Brahma, Vishnu, and Shiva. I bow to the teacher who is the supreme reality.",
    importance: "This prayer honors our teachers who guide us from darkness to light."
  }
};

// Back to Top Logic
const backToTop = document.getElementById('backToTop');
window.onscroll = () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
};

backToTop.onclick = () => {
  playClick();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Modal Logic
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

function openModal(id) {
  playClick();
  const data = contentData[id];
  if (data) {
    modalTitle.innerText = data.title;
    modalBody.innerHTML = `
      <p style="font-size: 1.3rem; margin-bottom: 20px;">${data.text}</p>
      ${data.importance ? `<p><strong>Importance:</strong> ${data.importance}</p>` : ''}
      ${data.moral ? `<p style="color: #d84315; font-weight: bold; font-size: 1.4rem; margin-top: 20px;">Moral: ${data.moral}</p>` : ''}
    `;
    modal.style.display = 'flex';
  }
  
  if (id.startsWith('story')) checkBadge('story');
}

closeModal.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Shloka Audio with TTS
window.playShloka = function(id) {
  playClick();
  const data = contentData[id];
  if (data) {
    const utterance = new SpeechSynthesisUtterance(data.shlokaText + ". Meaning: " + data.meaning);
    utterance.lang = 'hi-IN'; // Try Hindi first
    utterance.rate = 0.8;
    
    // Fallback if Hindi voice not available or for better clarity
    utterance.onstart = () => {
      console.log("Speaking shloka...");
    };
    
    window.speechSynthesis.speak(utterance);
    openModal(id);
  }
};

// Quiz Game Logic
const quizQuestions = [
  {
    question: "Which festival is known as the 'Festival of Colors'?",
    options: ["Diwali", "Holi", "Onam", "Eid"],
    answer: 1
  },
  {
    question: "What is the traditional greeting in India?",
    options: ["Hello", "Namaste", "Hi", "Bonjour"],
    answer: 1
  },
  {
    question: "Which animal is the National Animal of India?",
    options: ["Lion", "Elephant", "Tiger", "Peacock"],
    answer: 2
  },
  {
    question: "What should we tie on a brother's wrist during Raksha Bandhan?",
    options: ["Watch", "Bracelet", "Rakhi", "Ribbon"],
    answer: 2
  },
  {
    question: "Who is known as the 'Father of the Nation' in India?",
    options: ["Subhash Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

window.startQuiz = function() {
  playClick();
  document.getElementById('quiz-start-screen').style.display = 'none';
  document.getElementById('quiz-game-screen').style.display = 'block';
  showQuestion();
};

function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  document.getElementById('quiz-score').innerText = `Score: ${score}`;
  document.getElementById('quiz-question').innerText = q.question;
  
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';
  
  q.options.forEach((opt, index) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, btn) {
  const q = quizQuestions[currentQuestionIndex];
  const options = document.querySelectorAll('.quiz-option');
  
  // Disable all options
  options.forEach(opt => opt.style.pointerEvents = 'none');
  
  if (selectedIndex === q.answer) {
    score++;
    btn.classList.add('correct');
    playSuccess();
  } else {
    btn.classList.add('wrong');
    options[q.answer].classList.add('correct');
    playClick();
  }
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  document.getElementById('quiz-game-screen').style.display = 'none';
  document.getElementById('quiz-result-screen').style.display = 'block';
  
  const resultTitle = document.getElementById('quiz-result-title');
  const resultText = document.getElementById('quiz-result-text');
  
  if (score === quizQuestions.length) {
    resultTitle.innerText = "Wow! You are a Quiz Master! 🏆";
    resultText.innerText = `Perfect score: ${score}/${quizQuestions.length}! You know so much about India!`;
    checkBadge('quiz');
  } else if (score >= 3) {
    resultTitle.innerText = "Great Job! 🌟";
    resultText.innerText = `You got ${score}/${quizQuestions.length} correct. Keep exploring!`;
    checkBadge('quiz');
  } else {
    resultTitle.innerText = "Good Effort! 👍";
    resultText.innerText = `You got ${score}/${quizQuestions.length} correct. Try again to learn more!`;
  }
}

window.resetQuiz = function() {
  playClick();
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('quiz-result-screen').style.display = 'none';
  document.getElementById('quiz-start-screen').style.display = 'block';
};

// Add event listeners to all cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    if (id) openModal(id);
    else playClick();
  });
});

// Create floating clouds
const hero = document.querySelector('.floating-elements');
if (hero) {
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.top = Math.random() * 80 + '%';
    cloud.style.animationDelay = Math.random() * 10 + 's';
    cloud.style.transform = `scale(${0.5 + Math.random()})`;
    hero.appendChild(cloud);
  }
}
