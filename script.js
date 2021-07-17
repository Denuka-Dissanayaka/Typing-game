const wordH1 = document.querySelector('#word');
const textField = document.querySelector('#text');
const timer = document.querySelector('#time');
const scoreBoard = document.querySelector('#score');
const difficulty = document.querySelector('#difficulty');
const endGame = document.querySelector('#end-game-container');
const settingBar = document.querySelector('#settings');
const settingBtn = document.querySelector('#settings-btn');


// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];
let pushWord = true;
let wordCheck = [];
let word;
let score = 0;
let time = 10;

function generateNum() {
  return Math.floor(Math.random() * 20);
}

function wordPushHandler() {
  while (pushWord) {
    let num = generateNum();
    word = words[num];
    if (!wordCheck.includes(word)) {
      wordCheck.push(word);
      wordH1.textContent = word;
      pushWord = false;
      //console.log(wordCheck)
    }

  }
}

wordPushHandler();

function addTimeFunc() {
  if (difficulty.value === 'easy') {
    time += 6
  } else if (difficulty.value === 'medium') {
    time += 4;
  } else {
    time += 3;
  }
}

textField.addEventListener('input', () => {
  let x = textField.value
  if (x === word) {
    score++;
    scoreBoard.textContent = score;
    addTimeFunc();
    x = '';
    textField.value = '';
    pushWord = true;
    wordPushHandler();
    if (wordCheck.length === 20) {
      wordCheck = [];
    }
  }

})

function reloadFunc() {
  const h1 = document.createElement('h1');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  h1.textContent = 'Time ran out';
  btn.textContent = 'Reload';
  p.textContent = `Your final score is ${score}`;
  endGame.appendChild(h1);
  endGame.appendChild(p);
  endGame.appendChild(btn);

  btn.addEventListener('click', () => {
    endGame.innerHTML = '';
    pushWord = true;
    wordCheck = [];
    word = '';
    score = 0;
    time = 10;
    scoreBoard.textContent = score;
    textField.value = '';
    wordPushHandler();
    endGame.style.display = 'none';
    countTimeFunc();
  })

}

function countTimeFunc() {
  const countTime = setInterval(() => {
    if (time > 0) {
      time--;
      timer.textContent = `${time}s`;
    } else {
      endGame.style.display = 'flex';
      reloadFunc();
      clearInterval(countTime);
      // return;
    }

  }, 1000)

}

countTimeFunc();

settingBtn.addEventListener('click', () => {
  settingBar.classList.toggle('hide');
})


