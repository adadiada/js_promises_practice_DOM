'use strict';

const div = document.createElement('div');

div.setAttribute('data-qa', 'notification');

const appendElement = function (element, text, className) {
  element.textContent = text;
  element.classList.add(className);
  document.body.append(element);
};
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let leftClicked = false;
let rightClicked = false;
let thirdPromiseResolved = false;
const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked && !thirdPromiseResolved) {
      thirdPromiseResolved = true;
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

firstPromise
  .then((message) => appendElement(div, message, 'success'))
  .catch((message) => appendElement(div, message, 'error'));
secondPromise.then((message) => appendElement(div, message, 'success'));
thirdPromise.then((message) => appendElement(div, message, 'success'));
