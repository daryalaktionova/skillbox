const myForm = document.querySelector('#myForm');
const send = document.querySelector('#send');
const name = document.querySelector('#name');
const tel = document.querySelector('#tel');
const email = document.querySelector('#email');
const agreement = document.querySelector('#checkbox');
const data = {
    name: name,
    phone: tel,
    to: email
  };



var fail = false;
var checkboxFileld = document.querySelector('.form__field-checkbox');



/* Проверка валидности полей */

send.addEventListener('click', event => {
    event.preventDefault();

    validateField();

    function validateField() {
        let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        
        if (name.value == '' || name.value == " ") {
            name.nextElementSibling.textContent = 'Вы не ввели имя';
            name.style.border = "2px solid #FF6F81";
            fail = true;
        } else {
            name.nextElementSibling.textContent = '';
            name.style.border = "2px solid #3D3BFF";
        }

        if (!regPhone.test(tel.value)) {
            tel.nextElementSibling.textContent = 'Некорректный номер телефона';
            tel.style.border = "2px solid #FF6F81";
            fail = true;
            if (tel.value == '' || tel.value == " ") {
                tel.nextElementSibling.textContent = 'Вы не ввели телефон';
                tel.style.border = "2px solid #FF6F81";
                fail = true;
            }
        } else {
            tel.nextElementSibling.textContent = '';
            tel.style.border = "2px solid #3D3BFF";
        }

        if(!regEmail.test(email.value)) {
            email.nextElementSibling.textContent = 'Некорректный email';
            email.style.border = "2px solid #FF6F81";
            fail = true;
            if (email.value == '' || email.value == " ") {
                email.nextElementSibling.textContent = 'Вы не ввели email';
                email.style.border = "2px solid #FF6F81";
                fail = true;
            }
        } else {
            email.nextElementSibling.textContent = '';
            email.style.border = "2px solid #3D3BFF";
        }  

        if(agreement.checked) {
            checkboxFileld.querySelector('.error-text').textContent = "";
        } else {
            checkboxFileld.querySelector('.error-text').textContent = "Нужно согласие на обработку данных";
            fail = true;
        }

        if(fail == true) {
            console.log('Ошибки!');
        }
    }

});




/*Проверка заполнения чекбокса */
agreement.addEventListener('click', event => {
    if(agreement.checked) {
        send.disabled = false;
        checkboxFileld.querySelector('.error-text').textContent = "";
    } else {
        send.disabled = true;
        checkboxFileld.querySelector('.error-text').textContent = "Нужно согласие на обработку данных";
    }
})


/* Отправка формы */


let _ajaxInquiry = (function(e){
    e.preventDefault();
    
    if(fail == false) {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let popupWindow = document.createElement('div');
        popupWindow.classList.add('popup--form');
        let contentText = document.createElement('div');
        contentText.classList.add('popup__content');

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'http://test.local/mail.php');   
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', () => {
            if(xhr.status>=400) {
                let content = 'Ошибка, данные не отправлены, попробуйте позже';
                contentText.innerHTML = content;
            } else {
                if(xhr.response.status) {
                let content = 'Сообщение отправлено';
                contentText.innerHTML = content;
                } else {
                    let content = 'Соединение с сервером не установлено';
                    contentText.innerHTML = content;
                }
        }
    })

        let closeIcon = document.createElement("a");
        closeIcon.classList.add("popup__close-button");
        closeIcon.innerHTML = 'Закрыть';
        closeIcon.href = "#";
        closeIcon.addEventListener("click", (function(e){
            e.preventDefault();
            _closePopup(overlay);
        }));

        overlay.appendChild(popupWindow);
        popupWindow.appendChild(contentText);
        popupWindow.appendChild(closeIcon);
        document.body.appendChild(overlay);

    }
    });
    
    let _closePopup = (function(overlay) {
		document.body.removeChild(overlay);
	});


    send.addEventListener('click', _ajaxInquiry)
    
    

















