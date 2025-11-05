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
let charIndex = 0;
let isTyping = false;

function typePhrase() {
  if (charIndex < phrases[phraseIndex].length) {
    typingEl.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typePhrase, 50); // velocidade de digitação (em ms)
  } else {
    isTyping = false; // terminou de digitar
  }
}

nextPhraseBtn.addEventListener("click", () => {
  if (isTyping) return; // impede clique durante a digitação

  phraseIndex = (phraseIndex + 1) % phrases.length; // passa pra próxima frase
  typingEl.textContent = ""; // limpa texto anterior
  charIndex = 0;
  isTyping = true;
  typePhrase();
});

// começa com a primeira frase
isTyping = true;
typePhrase();
  // ------- MÚSICA toggle -------
const music = document.getElementById('music');
const toggle = document.getElementById('musicToggle');

toggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = '🔇 Pausar música'; // muda o ícone para mutar 
  } else {
    music.pause();
    musicToggle.textContent = '🎵 Voltar música'; // muda o ícone para tocar
  }
});
});
