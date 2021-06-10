/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую функцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Запрещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
  let result;
  if (Array.isArray(array) === false || array.length === 0) {
    throw new Error('empty array');
  } else if (typeof fn !== 'function') {
    throw new Error('fn is not a function');
  } else {
    for (let i = 0; i < array.length; i++) {
      if (fn(array[i]) === false) {
        result = false;
      } else result = true;
    }
    return result;
  }
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую функцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Запрещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
  let result;
  if (Array.isArray(array) === false || array.length === 0) {
    throw new Error('empty array');
  } else if (typeof fn !== 'function') {
    throw new Error('fn is not a function');
  } else {
    for (let i = 0; i < array.length; i++) {
      if (fn(array[i]) === true) {
        result = true;
        break;
      } else result = false;
    }
  }
  return result;
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизвестное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
  const arr = [];
  if (typeof fn !== 'function') {
    throw new Error('fn is not a function');
  } else if (args.length === 0) {
    return [];
  } else {
    for (let i = 0; i < args.length; i++) {
      try {
        fn(args[i]);
      } catch (e) {
        arr.push(args[i]);
      }
    }
    return arr;
  }
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
  let obj = {};
  if (typeof number !== 'number') {
    throw new Error('number is not a number');
  } else {
    obj = {
      sum: (...arr) => {
        let sum = number;
        for (let i = 0; i < arr.length; i++) {
          sum = sum + arr[i];
        }
        return sum;
      },
      dif: function (...arr) {
        let sum = number;
        for (let i = 0; i < arr.length; i++) {
          sum = sum - arr[i];
        }
        return sum;
      },
      div: function (...arr) {
        let div = number;
        const ifArrHasZerro = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
              return true;
            }
          }
        };
        if (number === 0 || ifArrHasZerro(arr)) {
          throw new Error('division by 0');
        } else {
          for (let i = 0; i < arr.length; i++) {
            div = div / arr[i];
          }
          return div;
        }
      },
      mul: function (...arr) {
        let mul = number;
        for (let i = 0; i < arr.length; i++) {
          mul = mul * arr[i];
        }
        return mul;
      },
    };
  }

  return obj;
}

/* При решении задач, постарайтесь использовать отладчик */

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };