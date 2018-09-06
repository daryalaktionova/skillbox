const myForm = document.querySelector('#myForm');
const send = document.querySelector('#send');
const name = document.querySelector('#name');
const tel = document.querySelector('#tel');
const email = document.querySelector('#email');
const agreement = document.querySelector('#checkbox');
var fail = false;


/* Проверка валидности полей */

send.addEventListener('click', event => {
    event.preventDefault();

    validateField();

    function validateField() {
        let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        let regName = /^[а-яё]{30}|[a-z]{30}$/iu;
        
        if(!regName.test(name.value)) {
            tel.nextElementSibling.textContent = 'Некорректное имя';
            tel.style.border = "2px solid #FF6F81";
            if (name.value == '' || name.value == " ") {
                name.nextElementSibling.textContent = 'Вы не ввели имя';
                name.style.border = "2px solid #FF6F81";
            }
        } else {
            name.nextElementSibling.textContent = '';
            name.style.border = "2px solid #3D3BFF"
        }

        if (!regPhone.test(tel.value)) {
            tel.nextElementSibling.textContent = 'Некорректный номер телефона';
            tel.style.border = "2px solid #FF6F81";
            if (tel.value == '' || tel.value == " ") {
                tel.nextElementSibling.textContent = 'Вы не ввели телефон';
                tel.style.border = "2px solid #FF6F81";
            }
        } else {
            tel.nextElementSibling.textContent = '';
            tel.style.border = "2px solid #3D3BFF"
        }

        if(!regEmail.test(email.value)) {
            email.nextElementSibling.textContent = 'Некорректный email';
            email.style.border = "2px solid #FF6F81";
            if (email.value == '' || email.value == " ") {
                email.nextElementSibling.textContent = 'Вы не ввели email';
                email.style.border = "2px solid #FF6F81";
            }
        } else {
            email.nextElementSibling.textContent = '';
            email.style.border = "2px solid #3D3BFF"
        }  
    }

});


/*Проверка заполнения чекбокса */
agreement.addEventListener('click', event => {
    let checkboxFileld = document.querySelector('.form__field-checkbox');
    if(agreement.checked) {
        send.disabled = false;
        checkboxFileld.querySelector('.error-text').textContent = "";
    } else {
        send.disabled = true;
        checkboxFileld.querySelector('.error-text').textContent = "Нужно согласие на обработку жданных";
    }
})








