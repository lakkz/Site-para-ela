/* script.js - typing, carta e final com partículas */

document.addEventListener("DOMContentLoaded", () => {
  // ------- FRASES e TYPING -------
  const phrases = [
    "Lembro do seu sorriso como meu lugar favorito.",
    "Você transforma dias comuns em memórias incríveis.",
    "Obrigado por cada risada, cada abraço e cada cuidado.",
    "Com você, aprendi que amor é presença e carinho.",
    "Quero construir muitos capítulos ao seu lado."
  ];
  const typingEl = document.getElementById("typingText");
  const nextPhraseBtn = document.getElementById("nextPhrase");
  let phraseIndex = 0;

  function typePhrase(text, cb) {
    typingEl.textContent = "";
    let i = 0;
    const speed = 28; // ms por caractere
    const t = setInterval(() => {
      typingEl.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(t);
        if (typeof cb === "function") setTimeout(cb, 300);
      }
    }, speed);
  }

  // inicia com a primeira frase
  typePhrase(phrases[phraseIndex]);

  nextPhraseBtn.addEventListener("click", () => {
    phraseIndex++;
    if (phraseIndex < phrases.length) {
      typePhrase(phrases[phraseIndex]);
    } else {
      // quando termina as frases, mostra sugestão final
      typePhrase("Chegou a hora da última surpresa... ✨");
      nextPhraseBtn.disabled = true;
      nextPhraseBtn.style.opacity = 0.6;
    }
  });

  // ------- CARTINHA SECRETA -------
  const openLetterBtn = document.getElementById("openLetterBtn");
  const letterModal = document.getElementById("letterModal");
  const closeLetterBtn = document.getElementById("closeLetter");

  openLetterBtn.addEventListener("click", () => {
    letterModal.classList.remove("hidden");
    letterModal.setAttribute("aria-hidden","false");
  });
  closeLetterBtn.addEventListener("click", closeLetter);
  letterModal.addEventListener("click", (e) => {
    if (e.target === letterModal) closeLetter();
  });
  function closeLetter(){
    letterModal.classList.add("hidden");
    letterModal.setAttribute("aria-hidden","true");
  }

  // ------- MÚSICA toggle -------
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  let musicPlaying = false;
  musicToggle.addEventListener("click", () => {
    if (!musicPlaying) {
      bgMusic.play().catch(()=>{}); // alguns browsers exigem interação
      musicToggle.textContent = "🔊";
      musicPlaying = true;
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🎵";
      musicPlaying = false;
    }
  });

  // ------- FINAL: coração cresce, explode em partículas e mostra texto -------
  const triggerFinal = document.getElementById("triggerFinal");
  const heart = document.getElementById("heartFinal");
  const finalText = document.getElementById("finalText");
  const finalArea = document.getElementById("finalArea");

  function randomRange(min,max){ return Math.random()*(max-min)+min; }

  function spawnParticles(cx, cy, count=30) {
    for (let i=0;i<count;i++){
      const p = document.createElement("div");
      p.className = "particle";
      p.style.background = `hsl(${randomRange(330,355)}deg ${randomRange(60,90)}% ${randomRange(45,65)}%)`;
      finalArea.appendChild(p);
      // Trajetória
      const angle = randomRange(0, Math.PI*2);
      const dist = randomRange(60, 180);
      const dx = Math.cos(angle)*dist;
      const dy = Math.sin(angle)*dist;
      p.style.left = cx + "px";
      p.style.top = cy + "px";
      // animação via JS
      p.animate([
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.6)`, opacity: 0 }
      ], {
        duration: randomRange(900,1700),
        easing: "cubic-bezier(.2,.7,.2,1)"
      });
      // remove depois
      setTimeout(()=>{ p.remove(); }, 1800);
    }
  }

  function doFinal(){
    // anima heart grow
    heart.style.transition = "transform 650ms cubic-bezier(.2,.8,.2,1)";
    heart.style.transform = "rotate(-45deg) scale(1.6)";
    // toca som se tiver (opcional)
    try { bgMusic.play().catch(()=>{}); } catch(e){}

    // após crescer, explode
    setTimeout(()=>{
      // posição do centro do coração relativo ao finalArea
      const rect = heart.getBoundingClientRect();
      const areaRect = finalArea.getBoundingClientRect();
      const cx = rect.left + rect.width/2 - areaRect.left;
      const cy = rect.top + rect.height/2 - areaRect.top;

      spawnParticles(cx, cy, 36);

      // esconda o coração e mostre o texto
      heart.style.transform = "rotate(-45deg) scale(0)";
      finalText.classList.remove("hidden");
      finalText.style.animation = "fadeIn 800ms forwards";
      finalText.style.opacity = 1;
      // adiciona classe para ajustar visual
      finalText.style.transform = "translateY(0)";
      // opcional: mostrar botão de fechar/encerrar
      showEndButton();
    }, 800);
  }

  function showEndButton(){
    // criar botão de fim (caso queira fechar)
    if (document.getElementById("endButton")) return;
    const b = document.createElement("button");
    b.id = "endButton";
    b.textContent = "Fim ❤️";
    b.className = "big-btn";
    b.style.marginTop = "12px";
    finalArea.appendChild(b);
    b.addEventListener("click", () => {
      // tenta fechar; se não fechar, apenas exibe mensagem
      window.close();
      // se não fechou, mostra aviso
      setTimeout(()=>{
        alert("Se a aba não fechou automaticamente, pode fechar manualmente ❤️");
      }, 300);
    });
  }

  triggerFinal.addEventListener("click", () => {
    // desabilita botão e inicia
    triggerFinal.disabled = true;
    triggerFinal.style.opacity = 0.6;
    doFinal();
  });

});