'use strict';

// Objects //

const Calculator = Object.seal({
  operand: '',
  pendingOp: '',
  phrase: '0',
  state: 'idle',
  changeStateTo(newState) {
    this.state = newState;
  },
  clearOperations() {
    this.setOpButton('');
    this.pendingOp = '';
  },
  handleClick(btn) {
    console.log(`${btn} was pressed.`);
    this.transitions[this.state].handle(btn);
  },
  logState() {
    console.log(`
      state: ${this.state}, 
      operand: ${this.operand}, 
      pending: ${this.pendingOp}, 
      phrase: ${this.phrase}
    `);
  },
  removeActive() {
    document
      .getElementById(this.pendingOp)
      .querySelector('.btn-fill')
      .classList.remove('active-btn');
  },
  assignActive(btn) {
    this.pendingOp = btn;
    document
      .getElementById(this.pendingOp)
      .querySelector('.btn-fill')
      .classList.add('active-btn');
  },
  setOpButton(btn) {
    if (this.pendingOp === '') {
      if (btn in Buttons) {
        this.assignActive(btn);
      }
    } else if (this.pendingOp in Buttons && this.pending !== btn) {
      if (btn in Buttons) {
        this.removeActive();
        this.assignActive(btn);
      } else {
        this.removeActive();
      }
    }
  },
  start() {
    this.changeStateTo('idle');
    this.phrase = '0';
    this.clearOperations();
    this.updateScreen();
  },
  updatePhrase(number) {
    if (this.phrase === '0') {
      number == 1 ? (this.phrase = '1') : (this.phrase = '0');
    } else {
      this.phrase += number;
    }
    if (this.phrase.length > 8) {
      this.phrase = this.phrase.substring(
        this.phrase.length - 8,
        this.phrase.length
      );
    }
    this.updateScreen();
  },
  updateScreen() {
    const screenText = this.phrase.padEnd(8, ' ');
    document.getElementById('screen-text').textContent = screenText;
  },
  transitions: {
    idle: {
      handle(btn) {
        switch (btn) {
          case 'clear':
            Calculator.start();
            break;
          case 'divide':
          case 'minus':
          case 'multiply':
          case 'plus':
            Calculator.changeStateTo('operation');
            if (Calculator.operand !== '') {
              Calculator.setOpButton(btn);
              Calculator.phrase = '0';
              Calculator.logState();
            } else {
              Calculator.operand = Calculator.phrase;
              Calculator.setOpButton(btn);
              Calculator.phrase = '0';
              Calculator.logState();
            }
            break;
          case 'one':
          case 'zero':
            Calculator.updatePhrase(Buttons[btn]);
            Calculator.changeStateTo('number');
            break;
          default:
            break;
        }
      }
    },
    number: {
      handle(btn) {
        switch (btn) {
          case 'clear':
            Calculator.start();
            break;
          case 'divide':
          case 'minus':
          case 'multiply':
          case 'plus':
            Calculator.changeStateTo('operation');
            Calculator.operand = Calculator.phrase;
            Calculator.setOpButton(btn);
            Calculator.phrase = '0';
            Calculator.logState();
            break;
          case 'one':
          case 'zero':
            Calculator.updatePhrase(Buttons[btn]);
            Calculator.logState();
            break;
          default:
            break;
        }
      }
    },
    operation: {
      handle(btn) {
        switch (btn) {
          case 'clear':
            if (Calculator.phrase == 0) {
              Calculator.start();
            } else {
              Calculator.phrase = '0';
              Calculator.updateScreen();
            }
            Calculator.logState();
            break;
          case 'equals':
            const operand = parseInt(Calculator.operand, 2);
            const phrase = parseInt(Calculator.phrase, 2);
            let total = 0;
            switch (Calculator.pendingOp) {
              case 'divide':
                total = operand / phrase;
                break;
              case 'minus':
                total = operand - phrase;
                break;
              case 'multiply':
                total = operand * phrase;
                break;
              case 'plus':
                total = operand + phrase;
                break;
            }
            Calculator.phrase = total.toString(2);
            Calculator.updateScreen();
            Calculator.changeStateTo('idle');
            Calculator.operand = Calculator.phrase;
            Calculator.setOpButton('');
            Calculator.phrase = '0';
            Calculator.logState();
            break;
          case 'divide':
          case 'minus':
          case 'multiply':
          case 'plus':
            Calculator.setOpButton(btn);
            break;
          case 'one':
          case 'zero':
            Calculator.updatePhrase(Buttons[btn]);
            Calculator.logState();
            break;
          default:
            break;
        }
      }
    }
  }
});

const Buttons = Object.freeze({
  clear: 'c',
  divide: '/',
  equals: '=',
  minus: '-',
  multiply: '*',
  one: '1',
  plus: '+',
  zero: '0'
});

function Button(btn) {
  this.id = btn;
  this.key = Buttons[btn];
  this.group = document.getElementById(btn);
  this.fill = group.querySelector('path.btn-fill');
  this.highlight = group.querySelector('path.btn-highlight');
  this.shadow = group.querySelector('path.btn-shadow');
  this.text = group.querySelector('text.btn-text');
}

function generateButtons() {
  for (let b in Buttons) {
    a;
  }
}

// Functions //

function buttonDownAnim(collection) {
  for (let c of collection) {
    if (c.classList.contains('btn-top')) {
      let x, y;
      if (c.tagName == 'path') {
        c.style.transform = 'translate(-8px, 8px)';
      } else {
        x = Number(c.getAttribute('x')) - 8;
        y = Number(c.getAttribute('y')) + 8;
        c.setAttribute('x', x);
        c.setAttribute('y', y);
      }
    }
  }
}

function buttonUpAnim(collection) {
  for (let c of collection) {
    if (c.classList.contains('btn-top')) {
      let x, y;
      if (c.tagName == 'path') {
        c.style.transform = 'translate(0, 0)';
      } else {
        x = Number(c.getAttribute('x')) + 8;
        y = Number(c.getAttribute('y')) - 8;
        c.setAttribute('x', x);
        c.setAttribute('y', y);
      }
    }
  }
}

function onButtonPress(e) {
  Calculator.handleClick(e.target.closest('g').id);
  const collection = e.target.closest('g').children;
  buttonDownAnim(collection);
  setTimeout(() => {
    buttonUpAnim(collection);
  }, 200);
}

function onKeyPress(e) {
  if (Object.values(Buttons).includes(e.key)) {
    const key = Object.keys(Buttons).find(k => Buttons[k] === e.key);
    Calculator.handleClick(key);
    const btnTop = document.getElementById(key).children;
    buttonDownAnim(collection);
    setTimeout(() => {
      buttonUpAnim(collection);
    }, 200);
  }
}

function onMouseOut(e) {
  const t = e.target;
  const op = Calculator.pendingOp;
  if (op !== '' && op === t.closest('g').id) {
    t.closest('path.btn-top').style.fill = 'blue'; //blue
  } else {
    t.closest('path.btn-top').style.fill = 'hsl(73, 54%, 78%)'; //green-yellow
  }
}

function onMouseOver(e) {
  const t = e.target;
  const op = Calculator.pendingOp;
  if (op !== '' && op === t.closest('g').id) {
    t.closest('path.btn-top').style.fill = 'lightblue'; // blue whitish
  } else {
    t.closest('path.btn-top').style.fill = 'hsl(73, 54%, 92%)'; //whitish
  }
}

// Listeners //

const calcButtons = document.getElementById('calc-buttons');
calcButtons.addEventListener('mouseover', e => onMouseOver(e), false);
calcButtons.addEventListener('mouseout', e => onMouseOut(e), false);
calcButtons.addEventListener('mousedown', e => onButtonPress(e), false);
document.addEventListener('keypress', e => onKeyPress(e), false);

// Initialize //

generateButtons();
Calculator.start();
