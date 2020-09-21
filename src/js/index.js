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

    const createHtmlForEmail = (data) => {
      return `<div>
        <div>
          name: <b>${data.form__name}</b>
        </div>
        <div>
          phone: <b>${data.form__phone}</b>
        </div>
        <div>
          email: <b>${data.form__email}</b>
        </div>
        <div>
          company: <b>${data.form__company}</b>
        </div>
      </div>`
    }

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
        const letterData = () => {
          let data = {}
          const inputs = Array.from(form.querySelectorAll('.form__input input'))
          inputs.map(input => {
            let key = input.getAttribute('name')
            data[key] = input.value
          })

          return {
            to: 'info@Sinclair-Pharma.ru',
            subject: 'Cinclair form',
            text: 'Cinclair',
            html: createHtmlForEmail(data)
          }
        }
        
        fetch('https://api.42.works/mailer', {
          method: 'POST',
          body: JSON.stringify(letterData()),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('success')
          $('.form__footer').addClass('success')
        })
        .catch((err) => {
          console.log('error')
        })
      }
    })
  }
})
