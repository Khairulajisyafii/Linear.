// ==========================================
// Card Swap Toggle (Login <-> Register)
// ==========================================
const btnOpenRegister = document.getElementById("btnOpenRegister");
const btnBackToLogin = document.getElementById("btnBackToLogin");
const cardRegister = document.getElementById("cardRegister");
const cardLogin = document.getElementById("cardLogin");

if (btnOpenRegister && cardRegister && cardLogin) {
  btnOpenRegister.addEventListener("click", () => {
    cardLogin.classList.add("hidden-card");
    cardRegister.classList.remove("hidden-card");
  });
}

if (btnBackToLogin && cardRegister && cardLogin) {
  btnBackToLogin.addEventListener("click", () => {
    cardRegister.classList.add("hidden-card");
    cardLogin.classList.remove("hidden-card");
  });
}

// ==========================================
// Video + Typing Effect Sync (Left Panel)
// ==========================================
const typingEl = document.getElementById("typingText");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");

if (typingEl && video1 && video2) {
  const slides = [
    { video: video1, text: "Raih Mimpi\nAkademikmu." },
    { video: video2, text: "Bangun Karir\nProfesionalmu." }
  ];

  let currentSlide = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED = 70;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_TYPE = 3000;
  const PAUSE_AFTER_DELETE = 500;

  function switchVideo(index) {
    slides.forEach((s, i) => {
      s.video.classList.toggle("active", i === index);
    });
  }

  function typeEffect() {
    const currentText = slides[currentSlide].text;

    if (!isDeleting) {
      charIndex++;
      typingEl.innerHTML = currentText.substring(0, charIndex).replace(/\n/g, "<br>");
      if (charIndex === currentText.length) {
        setTimeout(() => { isDeleting = true; typeEffect(); }, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(typeEffect, TYPING_SPEED);
    } else {
      charIndex--;
      typingEl.innerHTML = currentText.substring(0, charIndex).replace(/\n/g, "<br>");
      if (charIndex === 0) {
        isDeleting = false;
        currentSlide = (currentSlide + 1) % slides.length;
        switchVideo(currentSlide);
        setTimeout(typeEffect, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(typeEffect, DELETING_SPEED);
    }
  }

  switchVideo(0);
  setTimeout(typeEffect, 800);
}

// ==========================================
// Bouncing Ball Title Animation (Ultra Smooth WAAPI)
// ==========================================
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function initBouncingTitle(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const ball = container.querySelector('.bounce-ball');
  const letters = Array.from(container.querySelectorAll('.bounce-letter'));
  if (!ball || letters.length === 0) return;
  
  // Set ball for hardware acceleration
  ball.style.willChange = 'transform, opacity';
  ball.style.transition = 'opacity 0.3s ease'; // Only opacity uses CSS transition now
  
  const JUMP_UP_MS = 160;
  const JUMP_DOWN_MS = 160;
  const SQUASH_MS = 100;
  const JUMP_HEIGHT = -15; // px above the letter (lower jump height)
  
  async function runAnimationLoop() {
    // Initial reset
    ball.style.opacity = '1';
    letters.forEach(l => l.classList.remove('active'));
    
    // Calculate exact pixel targets dynamically
    const targets = letters.map(l => {
       return {
         x: l.offsetLeft + l.offsetWidth / 2 - 8, // shifted 3px to the left for visual centering
         y: l.offsetTop - 3,
         el: l
       };
    });
    
    // Define off-screen landing spots (beristirahat tepat di sebelah huruf)
    const leftOff = { x: targets[0].x - 18, y: targets[0].y + 20, el: null };
    const rightOff = { x: targets[targets.length - 1].x + 20, y: targets[targets.length - 1].y + 20, el: null };
    
    let currentX = leftOff.x;
    let currentY = leftOff.y;
    ball.style.transform = `translate(${currentX}px, ${currentY}px)`;
    
    let isGreenPhase = true; // true = forward (green), false = backward (black)
    
    await sleep(300); // initial wait
    
    while (true) {
      // Define path for current phase
      let passTargets;
      if (isGreenPhase) {
        passTargets = [...targets, rightOff];
      } else {
        const revTargets = [...targets].reverse();
        passTargets = [...revTargets, leftOff];
      }
      
      for (let i = 0; i < passTargets.length; i++) {
        const target = passTargets[i];
        const midX = currentX + (target.x - currentX) / 2;
        const peakY = Math.min(currentY, target.y) + JUMP_HEIGHT;
        
        // Jump UP
        const jumpUp = ball.animate([
           { transform: `translate(${currentX}px, ${currentY}px) scale(1, 1)` },
           { transform: `translate(${midX}px, ${peakY}px) scale(0.9, 1.1)` }
        ], { duration: JUMP_UP_MS, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'forwards' });
        await jumpUp.finished;
        
        // Jump DOWN
        const jumpDown = ball.animate([
           { transform: `translate(${midX}px, ${peakY}px) scale(0.9, 1.1)` },
           { transform: `translate(${target.x}px, ${target.y}px) scale(1, 1)` }
        ], { duration: JUMP_DOWN_MS, easing: 'cubic-bezier(0.32, 0, 0.67, 0)', fill: 'forwards' });
        await jumpDown.finished;
        
        // IMPACT! Apply color if it's a letter
        if (target.el) {
           if (isGreenPhase) {
              target.el.classList.add('active');
           } else {
              target.el.classList.remove('active');
           }
        }
        
        // SQUASH effect
        const squash = ball.animate([
           { transform: `translate(${target.x}px, ${target.y}px) scale(1, 1)` },
           { transform: `translate(${target.x}px, ${target.y + 4}px) scale(1.4, 0.6)` },
           { transform: `translate(${target.x}px, ${target.y}px) scale(1, 1)` }
        ], { duration: SQUASH_MS, easing: 'ease-out', fill: 'forwards' });
        await squash.finished;
        
        currentX = target.x;
        currentY = target.y;
      }
      
      // Wait at the edge before turning around
      if (isGreenPhase) {
        await sleep(600); // Istirahat di ujung kanan (sebelah huruf terakhir)
      } else {
        await sleep(50); // Jangan istirahat di ujung kiri, langsung lanjut lompat (jeda minimal 50ms agar JS stabil)
      }
      
      isGreenPhase = !isGreenPhase;
    }
  }
  
  // Start the infinite loop
  runAnimationLoop();
}

// Inisialisasi animasi pada Login dan Register
initBouncingTitle("loginBounceTitle");
initBouncingTitle("registerBounceTitle");
