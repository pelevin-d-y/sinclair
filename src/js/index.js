import module from './module'
import jquery from 'jquery'
window.$ = window.jQuery = jquery;

$(() => {
  const menu = document.querySelector('.navigation__wrapper');
  const triggers = Array.from(document.querySelectorAll('.menu-trigger'));
  
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      menu.classList.toggle('menu-show')
    })
  })
})

