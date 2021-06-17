/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
/*
  app - это контейнер для всех ваших домашних заданий
  Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер
 
  Пример:
    const newDiv = document.createElement('div');
    homeworkContainer.appendChild(newDiv);
  */

const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
let nameCook = '';
let valueCook = '';

addNameInput.addEventListener('input', (e) => {
  nameCook = e.target.value;
});

addValueInput.addEventListener('input', (e) => {
  valueCook = e.target.value;
});

addButton.addEventListener('click', () => {
  document.cookie = `${nameCook}=${valueCook}`;
  showCookie();
});

const cookies = document.cookie.split('; ');

const tableContent = cookies.map((item) => {
  const [name, value] = item.split('=');
  const tableItem = document.createElement('tr');

  const tableItemButton = document.createElement('td');
  const tableItemName = document.createElement('td');
  const tableItemValue = document.createElement('td');
  const button = document.createElement('button');
  button.textContent = 'Delete';
  tableItemName.textContent = name;
  tableItemValue.textContent = value;

  tableItem.appendChild(tableItemName);
  tableItem.appendChild(tableItemValue);
  tableItem.appendChild(tableItemButton.appendChild(button));
  return tableItem;
});

const showCookie = () => {
  while (listTable.firstChild) {
    listTable.removeChild(listTable.firstChild);
  }

  for (let i = 0; i < tableContent.length; i++) {
    listTable.appendChild(tableContent[i]);
  }
};

showCookie();

filterNameInput.addEventListener('input', function (e) {
  const value = e.target.value;

  const valueFilter = (word) => {
    return word.childNodes[0].textContent.includes(value);
  };

  while (listTable.firstChild) {
    listTable.removeChild(listTable.firstChild);
  }

  const result = [...tableContent].filter(valueFilter);
  console.log(result.length);

  if (result.length !== 0) {
    for (let i = 0; i < result.length; i++) {
      listTable.appendChild(result[i]);
    }
    console.log(listTable.childNodes);
  } else {
    listTable.innerHTML = '<p>NO MATCHES</p>';
  }
  if (value === '') {
    showCookie();
  }
});

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const cookieName = e.target.parentNode.childNodes[0].textContent;
    document.cookie =
      cookieName +
      '=;' +
      'expires=expires=Thu, 01 Jan 1970 00:00:01 GMT;' +
      'path=/home/abakhar/Documents/js-loft/course-javascript/projects/cookie';
    showCookie();
  }
});
