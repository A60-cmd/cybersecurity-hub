const quizzes = {
  easy: [
    { q: "What does HTTPS stand for?", options: ["Hyper Transfer Text Secure", "HyperText Transfer Protocol Secure", "High Tech Protocol Security"], answer: 1, explanation: "HTTPS = HyperText Transfer Protocol Secure. It uses SSL/TLS for encryption." },
    { q: "Which of the following is a strong password?", options: ["12345678", "Password123", "D$9g!kQ2*7"], answer: 2, explanation: "Strong passwords use randomness, length, and symbols." },
    { q: "Which is an example of malware?", options: ["Excel", "Trojan", "Linux"], answer: 1, explanation: "Trojan is malicious software disguised as legitimate." },
    { q: "Phishing is mainly done through?", options: ["Emails & fake sites", "Hardware failure", "Wi-Fi routers"], answer: 0, explanation: "Phishing is mostly carried out via fake emails and websites." },
    { q: "What does a firewall do?", options: ["Detects malware", "Blocks unauthorized traffic", "Encrypts emails"], answer: 1, explanation: "Firewalls filter and block suspicious incoming/outgoing traffic." },
    { q: "VPN is used to?", options: ["Play games faster", "Create a secure connection", "Increase WiFi speed"], answer: 1, explanation: "VPN secures your connection by encrypting internet traffic." },
    { q: "Which is an example of social engineering?", options: ["Brute force attack", "Tailgating", "SQL Injection"], answer: 1, explanation: "Tailgating is a physical social engineering technique." },
    { q: "What is the safest way to connect to public Wi-Fi?", options: ["Without protection", "With VPN", "By turning off antivirus"], answer: 1, explanation: "VPN ensures safety on public Wi-Fi." },
    { q: "Antivirus helps in?", options: ["Making PC faster", "Detecting malware", "Hacking passwords"], answer: 1, explanation: "Antivirus detects and removes malware." },
    { q: "Two-factor authentication adds?", options: ["Extra time", "Extra security", "Extra apps"], answer: 1, explanation: "2FA adds an additional security layer." }
  ],
  medium: [
    { q: "Which attack overloads a server with traffic?", options: ["SQL Injection", "Phishing", "DDoS"], answer: 2, explanation: "DDoS floods servers with traffic to cause downtime." },
    { q: "What does hashing ensure?", options: ["Integrity", "Confidentiality", "Availability"], answer: 0, explanation: "Hashing ensures data integrity." },
    { q: "MITM stands for?", options: ["Made In The Machine", "Man In The Middle", "Malware In The Main"], answer: 1, explanation: "MITM is Man-in-the-Middle attack." },
    { q: "A honeypot is?", options: ["A trap for attackers", "A fake app", "A strong firewall"], answer: 0, explanation: "Honeypots are systems designed to lure attackers." },
    { q: "What’s SQL Injection?", options: ["Code injection into databases", "Spam attack", "Overheating servers"], answer: 0, explanation: "SQL Injection manipulates database queries via unvalidated input." },
    { q: "Zero-day exploits are?", options: ["Already patched bugs", "Newly discovered vulnerabilities", "Fake viruses"], answer: 1, explanation: "Zero-day = unpatched new vulnerabilities." },
    { q: "IDS stands for?", options: ["Intrusion Detection System", "Internet Data Service", "Information Defense Software"], answer: 0, explanation: "IDS monitors and alerts on suspicious traffic." },
    { q: "What is brute force attack?", options: ["Guessing passwords repeatedly", "Flooding servers", "Using malware"], answer: 0, explanation: "Brute force guesses passwords systematically." },
    { q: "DNS Spoofing is?", options: ["Corrupting DNS records", "Fixing DNS servers", "Optimizing Wi-Fi"], answer: 0, explanation: "DNS spoofing redirects users to malicious sites." },
    { q: "Digital forensics is used to?", options: ["Hack attackers", "Investigate cyber crimes", "Create software"], answer: 1, explanation: "Forensics analyzes systems for legal evidence." }
  ],
  hard: [
    { q: "Buffer overflow attacks exploit?", options: ["Excess memory writes", "Slow servers", "Weak passwords"], answer: 0, explanation: "Buffer overflow overwrites memory." },
    { q: "Which framework maps adversary behavior?", options: ["NIST CSF", "MITRE ATT&CK", "OWASP"], answer: 1, explanation: "MITRE ATT&CK documents attacker TTPs." },
    { q: "Symmetric encryption uses?", options: ["One key", "Two keys", "No keys"], answer: 0, explanation: "Symmetric encryption uses the same key for encrypt/decrypt." },
    { q: "APT refers to?", options: ["Advanced Persistent Threat", "Advanced Password Trick", "All Public Traffic"], answer: 0, explanation: "APT = stealthy long-term targeted cyberattack." },
    { q: "Ransomware mainly does?", options: ["Encrypts data & demands ransom", "Steals passwords only", "Deletes all OS files"], answer: 0, explanation: "Ransomware encrypts data and asks for payment." },
    { q: "Elliptic Curve Cryptography is?", options: ["Symmetric", "Asymmetric", "Hashing"], answer: 1, explanation: "ECC is asymmetric public-key cryptography." },
    { q: "What is Kerberos?", options: ["Authentication protocol", "Firewall", "Malware"], answer: 0, explanation: "Kerberos is a secure authentication protocol." },
    { q: "Side-channel attack exploits?", options: ["Timing/Power leaks", "SQL queries", "Passwords directly"], answer: 0, explanation: "Side-channel attacks use indirect info (timing, power use)." },
    { q: "SOC stands for?", options: ["System Operating Code", "Security Operations Center", "Secure Online Cloud"], answer: 1, explanation: "SOC = Security Operations Center." },
    { q: "CIA triad stands for?", options: ["Confidentiality, Integrity, Availability", "Cybersecurity, Internet, Access", "Code, Info, Auth"], answer: 0, explanation: "CIA triad is the core model in cybersecurity." }
  ]
};

let timer;
let timeLeft = 300; // 5 min

function loadQuiz(level) {
  const quizBox = document.getElementById("quiz-container");
  const questions = quizzes[level];
  timeLeft = 300;
  clearInterval(timer);

  let html = `
    <div class="timer">⏳ Time Left: <span id="time">05:00</span></div>
    <div class="progress"><div class="progress-bar" id="progress-bar"></div></div>
    <h2>${level.toUpperCase()} Quiz</h2><form id="quiz-form">`;

  questions.forEach((q, i) => {
    html += `<div class="question">
              <p>Q${i+1}: ${q.q}</p>
              <div class="options">`;
    q.options.forEach((opt, j) => {
      html += `<label><input type="radio" name="q${i}" value="${j}" onchange="updateProgress('${level}')"> ${opt}</label>`;
    });
    html += `</div></div>`;
  });

  html += `<button type="button" class="submit-btn" onclick="submitQuiz('${level}')">Submit</button></form>`;
  quizBox.innerHTML = html;

  startTimer(level);
}

function startTimer(level) {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz(level);
    } else {
      timeLeft--;
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const seconds = String(timeLeft % 60).padStart(2, '0');
      document.getElementById("time").textContent = `${minutes}:${seconds}`;
    }
  }, 1000);
}

function updateProgress(level) {
  const questions = quizzes[level];
  let answered = 0;
  questions.forEach((_, i) => {
    if (document.querySelector(`input[name="q${i}"]:checked`)) answered++;
  });
  const progress = Math.round((answered / questions.length) * 100);
  document.getElementById("progress-bar").style.width = progress + "%";
}

function submitQuiz(level) {
  clearInterval(timer);
  const questions = quizzes[level];
  let score = 0;
  let resultsHtml = `<h2>${level.toUpperCase()} Quiz Results</h2>`;

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
      resultsHtml += `<p>Q${i+1}: ✅ Correct! <span class="explanation">${q.explanation}</span></p>`;
    } else {
      resultsHtml += `<p>Q${i+1}: ❌ Incorrect. <span class="explanation">${q.explanation}</span></p>`;
    }
  });

  resultsHtml += `<div class="result">Your Score: ${score} / ${questions.length}</div>`;
  document.getElementById("quiz-container").innerHTML = resultsHtml;

  saveScore(level, score, questions.length);
  displayLeaderboard();
}

function saveScore(level, score, total) {
  const entry = { level, score, total, date: new Date().toLocaleString() };
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function displayLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  list.innerHTML = leaderboard.map(e => 
    `<li>[${e.level.toUpperCase()}] ${e.score}/${e.total} — ${e.date}</li>`
  ).join("");
}

displayLeaderboard();
