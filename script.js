// Language validation patterns
const languagePatterns = {
    python: /^\s*print\s*\(\s*["']Hello World["']\s*\)\s*$/i,
    javascript: /^\s*console\.log\s*\(\s*["']Hello World["']\s*\)\s*;?\s*$/i,
    java: /^\s*System\.out\.println\s*\(\s*["']Hello World["']\s*\)\s*;\s*$/i,
    cpp: /^\s*cout\s*<<\s*["']Hello World["']\s*;?\s*$/i,
    csharp: /^\s*Console\.WriteLine\s*\(\s*["']Hello World["']\s*\)\s*;\s*$/i,
    ruby: /^\s*puts\s+["']Hello World["']\s*$/i,
    php: /^\s*echo\s+["']Hello World["']\s*;?\s*$/i,
    go: /^\s*fmt\.Println\s*\(\s*["']Hello World["']\s*\)\s*$/i,
    rust: /^\s*println!\s*\(\s*["']Hello World["']\s*\)\s*;?\s*$/i
};

// Motivational messages
const motivationalMessages = [
    "Every expert was once a beginner. Start with 'Hello World' and build your way up! 🌱",
    "Rome wasn't built in a day, and neither are great programs. Master the basics first! 💪",
    "The journey of a thousand lines begins with a single 'Hello World'. Take it one step at a time! 🚶",
    "Even the most complex software started with simple code. Embrace the fundamentals! 📚",
    "Great developers know that mastering the basics is the foundation of excellence. Start small! 🏗️",
    "Before you run, you must walk. Before you code complex apps, master 'Hello World'! 👣",
    "The secret to success? Start simple, practice consistently, and grow gradually! 🌟",
    "Every programming legend began exactly where you are now. Start with the basics! 🎯",
    "Small steps lead to giant leaps. Begin your coding journey with 'Hello World'! 🚀",
    "Patience and practice make perfect. Start with the fundamentals and watch yourself grow! 🌳"
];

// DOM elements
const codeEditor = document.getElementById('code-editor');
const languageSelect = document.getElementById('language-select');
const runBtn = document.getElementById('run-btn');
const outputDisplay = document.getElementById('output-display');
const blastContainer = document.getElementById('blast-container');
const blastMessage = document.getElementById('blast-message');
const closeBlastBtn = document.getElementById('close-blast');
const particlesContainer = document.getElementById('particles');
const clearParticlesBtn = document.getElementById('clear-particles-btn');

// Event listeners
runBtn.addEventListener('click', runCode);
closeBlastBtn.addEventListener('click', closeBlast);
clearParticlesBtn.addEventListener('click', clearScatteredParticles);

// Update placeholder based on language
languageSelect.addEventListener('change', updatePlaceholder);

function updatePlaceholder() {
    const language = languageSelect.value;
    const placeholders = {
        python: 'print("Hello World")',
        javascript: 'console.log("Hello World");',
        java: 'System.out.println("Hello World");',
        cpp: 'cout << "Hello World";',
        csharp: 'Console.WriteLine("Hello World");',
        ruby: 'puts "Hello World"',
        php: 'echo "Hello World";',
        go: 'fmt.Println("Hello World")',
        rust: 'println!("Hello World");'
    };

    codeEditor.value = placeholders[language];
}

function runCode() {
    const code = codeEditor.value;
    const language = languageSelect.value;
    const pattern = languagePatterns[language];

    // Clear previous output
    outputDisplay.innerHTML = '';

    // Validate code
    if (pattern.test(code)) {
        // Success! Show Hello World
        showSuccess();
    } else {
        // Trigger blast animation
        triggerBlast();
    }
}

function showSuccess() {
    outputDisplay.innerHTML = '<p class="output-success">Hello World</p>';

    // Add a subtle success animation
    outputDisplay.style.animation = 'none';
    setTimeout(() => {
        outputDisplay.style.animation = 'slideUp 0.3s ease-out';
    }, 10);
}

function triggerBlast() {
    // Show blast container
    blastContainer.classList.remove('hidden');
    setTimeout(() => {
        blastContainer.classList.add('active');
    }, 10);

    // Play explosion sound
    playExplosionSound();

    // Set random motivational message
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    blastMessage.textContent = randomMessage;

    // Create particles
    createParticles();

    // Show error in output
    outputDisplay.innerHTML = '<p class="output-error">❌ Compilation Error: Only "Hello World" is allowed!</p>';
}

function createParticles() {
    // Clear existing particles
    particlesContainer.innerHTML = '';

    const colors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6', '#ec4899'];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const startX = 50;
        const startY = 30;
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        particlesContainer.appendChild(particle);
    }

    // After particles finish animating, scatter them across the screen
    setTimeout(() => {
        scatterParticles();
    }, 1500);
}

function scatterParticles() {
    // Create scattered particles that remain on screen
    const scatterCount = 30;
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6', '#ec4899'];

    for (let i = 0; i < scatterCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'scattered-particle';

        // Random position across the viewport
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 5 + Math.random() * 10;
        const rotation = Math.random() * 360;

        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.opacity = '0';

        document.body.appendChild(particle);

        // Fade in the scattered particle
        setTimeout(() => {
            particle.style.opacity = '0.8';
        }, i * 20);
    }

    // Show clear particles button
    clearParticlesBtn.style.display = 'inline-block';
}

function playExplosionSound() {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator for the explosion sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Create noise for the explosion
    const bufferSize = audioContext.sampleRate * 1.5; // 1.5 seconds
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate explosion sound (descending frequency + noise)
    for (let i = 0; i < bufferSize; i++) {
        const t = i / audioContext.sampleRate;
        const freq = 200 - (150 * t / 1.5); // Descending frequency
        const envelope = Math.exp(-t * 3); // Exponential decay

        // Mix sine wave and noise
        const sine = Math.sin(2 * Math.PI * freq * t) * envelope;
        const noise = (Math.random() * 2 - 1) * 0.3 * Math.exp(-t * 2);

        data[i] = (sine + noise) * 0.3;
    }

    // Create buffer source
    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set initial gain
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    // Play sound
    source.start(0);

    // Clean up
    source.onended = () => {
        source.disconnect();
        gainNode.disconnect();
    };
}

function closeBlast() {
    blastContainer.classList.remove('active');
    setTimeout(() => {
        blastContainer.classList.add('hidden');
        // Clear only the explosion particles, keep scattered ones
        particlesContainer.innerHTML = '';
    }, 300);
}

function clearScatteredParticles() {
    const scatteredParticles = document.querySelectorAll('.scattered-particle');
    scatteredParticles.forEach(particle => {
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 300);
    });

    // Hide clear particles button
    clearParticlesBtn.style.display = 'none';
}

// Close blast on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blastContainer.classList.contains('active')) {
        closeBlast();
    }
});

// Initialize with Python placeholder
updatePlaceholder();
