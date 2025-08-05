const pages = document.querySelectorAll('.page');
const nextButton = document.getElementById('nextButton');
let current = 0;

nextButton.addEventListener('click', () => {
    pages[current].classList.remove('active');
    current++;
    if (current < pages.length) {
        pages[current].classList.add('active');

        // Se for a última página (índice pages.length - 1)
        if (current === pages.length - 1) {
            // Esconde o botão para evitar cliques extras
            nextButton.style.display = 'none';

            // Fecha a página após 5 segundos
            setTimeout(() => {
                window.close();
            }, 5000);
        }
    } else {
        nextButton.style.display = 'none';
    }
});