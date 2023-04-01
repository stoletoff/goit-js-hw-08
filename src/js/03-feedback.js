import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {}; 

// 1. Выполним делегирование по основной форме
// 2. Вешаем слушателя события  "input - для текстовых полей, и submit -
// для кнопки оптравки"

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));

// 3. Вызов функции "автозаполнения из localStorage, если значение STORAGE_KEY !== null"
populateTextArea();

// 4. Реализация ф-ции onTextInput

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  const formDataStringify = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataStringify);
}

// 5. Реализация ф-ции onFormSubmit
function onFormSubmit(event) {
  event.preventDefault(); // сброс дефолтных настроек браузера (отключаем перезагрузку);
  event.target.reset(); // сброс значений полей при нажатии на кнопку
  localStorage.removeItem(STORAGE_KEY); // удаление ключа из LocalStorage
}

// 6. Реализация ф-ции populateTextArea с проверкой на падение кода
function populateTextArea() {
  const messageJsonParse = localStorage.getItem(STORAGE_KEY);
  try {
    if (messageJsonParse) { // проверка на Null
      messageJsonParse = JSON.parse(messageJsonParse); // если код валидный (!== null) преобразуем JSON -> JS
      // Object.entries возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value],
      Object.entries(messageJsonParse).forEach(
        //Записываем значение ключей полученных из localStorage которые были преоброзаровано в JS {}.
        ([key, value]) => {
          formData[key] = value;
          form[key].value = value;
        }
      );
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
