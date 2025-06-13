 let lastScrollY = window.scrollY;

function updateHeader() {
  const header = document.getElementById("header");
  const scrollY = window.scrollY;

  if (scrollY === 0) {
    // Força totalmente visível no topo
    header.style.transform = `translateY(0px)`;
    header.dataset.translateY = 0;
  } else {
    const diff = scrollY - lastScrollY;
    const currentTransform = parseFloat(header.dataset.translateY || "0");
    let newTransform = currentTransform - diff;

    newTransform = Math.max(Math.min(newTransform, 0), -60); // entre 0 e -60px
    header.style.transform = `translateY(${newTransform}px)`;
    header.dataset.translateY = newTransform;
  }

  lastScrollY = scrollY;
  requestAnimationFrame(updateHeader);
}

requestAnimationFrame(updateHeader);

const slider = document.getElementById('a');
let index = 0;
let autoScroll;
let userInteracted = false;
let cooldown;

function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (!userInteracted) {
      index = (index + 1) % slider.children.length;
      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: 'smooth'
      });
    }
  }, 4000); // a cada 4 segundos
}

function pauseAutoScroll() {
  clearInterval(autoScroll);
  userInteracted = true;
  clearTimeout(cooldown);
  cooldown = setTimeout(() => {
    userInteracted = false;
    startAutoScroll();
  }, 4000); // cooldown de 4 segundos após interação
}

// Detecta interações
['mousedown', 'touchstart', 'wheel'].forEach(evt => {
  slider.addEventListener(evt, pauseAutoScroll);
});

startAutoScroll();

const carousel = document.getElementById('a');
const images = carousel.querySelectorAll('.bbb');
const dots = document.querySelectorAll('#indic .dot');

function getActiveSlide() {
  const scrollLeft = carousel.scrollLeft;
  let closestIndex = 0;
  let closestDistance = Infinity;

  images.forEach((img, index) => {
    const imgLeft = img.offsetLeft;
    const distance = Math.abs(scrollLeft - imgLeft);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function updateIndicators() {
  const activeIndex = getActiveSlide();

  dots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.setAttribute('fill', '#A259FF'); // cor roxa ativa
    } else {
      dot.setAttribute('fill', '#61349A'); // cor cinza inativa
    }
  });
}

// Atualiza indicador ao rolar o carrossel
carousel.addEventListener('scroll', updateIndicators);

// Inicializa o indicador na carga da página
updateIndicators();

// Opcional: clique nas bolinhas para navegar no slide correspondente
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    carousel.scrollTo({
      left: images[index].offsetLeft,
      behavior: 'smooth'
    });
  });
});
