import jquery from 'jquery'
window.$ = window.jQuery = jquery;
import 'jquery-validation'

$(() => {
  const menu = document.querySelector('.navigation__wrapper');
  const triggers = Array.from(document.querySelectorAll('.menu-trigger'));
  
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      menu.classList.toggle('menu-show')
    })
  })
  
  if ($("#main-form")[0]) {

    $.validator.methods.phone = function( value, element ) {
      return this.optional( element ) || /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test( value );
    }
    $("#main-form").validate({
      onkeyup: false, // по каким событиям происходит валидация
      onclick: false,
      rules:{
        form__name: {
          required: true
        },
        form__phone: {
          phone: true
        },
        form__email: {
          required: true,
          email: true
        },
        form__company: {}
      },
      messages: {
        form__name: {
          required: 'Укажите ваше имя'
        },
        form__phone: {
          phone: 'Введите валидный номер'
        },
        form__email: {
          required: 'Укажите ваш email',
          email: 'Некорректрый email'
        }
      },
      showErrors: function(errorMap, errorList) { // для показа ошибок последовательно
        if (errorList.length) {
          var s = errorList.shift();
          var n = [];
          console.log('n', n)
          n.push(s);
          this.errorList = n;
        }
        this.defaultShowErrors();
      },
      errorPlacement: function ($error, $element) { // место куда вставлять ошибки
          $('.form__errors').append($error)
      },
      submitHandler: (form) => { // что сделать когда форма провалидирована
        console.log('submit')
        $('.form__footer').addClass('success')
      }
    })
  }
})
