/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

export function createDiv() {
  //Rand number for size and position
  const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random(Math.random() * (max - min) + min);
  };
  //Rand color gen
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  //Creating div attributes
  const div = document.createElement('div');
  const styles = `
    background-color: ${getRandomColor()}; 
    width: ${randInt(100, 300) * 100}px; 
    height: ${randInt(100, 300) * 100}px; 
    top: ${randInt(200, 500) * 100}px; 
    left: ${randInt(200, 500) * 100}px;
    `;

  div.classList.add('draggable-div');
  div.style = styles;

  //Drag and drop
  div.ondragstart = function () {
    return false;
  };

  div.onmousedown = (e) => {
    console.log('Mouse down');

    move(e);
    function move(e) {
      console.log('X: ', e.pageX);
      console.log('Y: ', e.pageY);

      div.style.left = e.pageX - div.offsetWidth / 2 + 'px';
      div.style.top = e.pageY - div.offsetWidth / 2 + 'px';
    }

    document.onmousemove = (e) => {
      console.log('Mouse move');
      move(e);
    };

    div.onmouseup = function () {
      console.log('Mouse up');
      document.onmousemove = null;
      div.onmouseup = null;
    };
  };

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
