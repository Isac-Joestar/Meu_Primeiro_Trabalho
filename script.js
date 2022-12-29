var ulMenu = document.querySelector('#ul_menu')
var fechar = document.querySelector('.fechar')
var abrir = document.querySelector('.abrir')
var nav = document.querySelector('#nav')

document.querySelector('.btn_menu').addEventListener('click', ()=>{
  // console.log(abrir)
  // console.log(fechar)
  if(abrir.style.display == 'flex' ||
    abrir.style.display == 'undefined' ||
    abrir.style.display == ''){
        
        abrir.style.display = 'none'
        fechar.style.display = 'flex'
        ulMenu.classList.remove('of')
        nav.classList.add('change_bg')
     }else{
        fechar.style.display = 'none'
        abrir.style.display = 'flex'

        nav.classList.remove('change_bg')
        setTimeout(()=>{
          ulMenu.classList.add('of')  
        },500)
        
                  
    }
  
})



// scroll automatico suave
document.querySelector('#div_logo a').
addEventListener('click', (event)=>{
  event.preventDefault();
  smoothScrollTo(0, -80, 700)
})

const menuItems = document.querySelectorAll('#ul_menu a[href^="#"]');
 
menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick)
})

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;

}

function scrollToIdOnClick(event) {
  
  event.preventDefault();
  const to = getScrollTopByHref(event.target) - 80;
  scrollToPosition(to);
}

function scrollToPosition(to) {
//   window.scroll({
//     top: to,
//     behavior: "smooth",
//   });
  smoothScrollTo(0, to, 700);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};





// Animação scroll
const debounce = function(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


const target = document.querySelectorAll('[data-animate]')
const animationClass = 'anime';

function animeScroll(){
  const windowTop = window.pageYOffset + (window.innerHeight * 3.6 / 4);
  target.forEach((e)=>{
    // console.log(e.offsetTop)
    if((windowTop) > e.offsetTop){
      e.classList.add(animationClass)
    }else{
      e.classList.remove(animationClass)
    }
  })
}
animeScroll();
if(target.length){
  window.addEventListener('scroll', debounce(()=>{
    animeScroll();
  }, 15));
}





