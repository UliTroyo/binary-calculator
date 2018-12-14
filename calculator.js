function Button(e) {
  this.name = e;
  this.e = document.getElementById(e);
  this.face = this.e.getElementsByClassName('btn-fill')[0];
  this.top = this.e.querySelectorAll('.btn-top');
}
Button.prototype.onMouseOver = function() {
  this.face.style.fill = 'hsl(73, 54%, 92%)'; //whitish
};
Button.prototype.onMouseOut = function() {
  this.face.style.fill = 'hsl(73, 54%, 78%)'; //greenish-yellow
};
Button.prototype.onMouseDown = function() {
  this.top.forEach(el => {
    let x, y;
    {
      if (el.tagName == 'path') {
        el.style.transform = 'translate(-8px, 8px)';
      } else {
        x = Number(el.getAttribute('x')) - 8;
        y = Number(el.getAttribute('y')) + 8;
        el.setAttribute('x', x);
        el.setAttribute('y', y);
      }
    }
  });
  setTimeout(() => {
    `u`;
    this.top.forEach(el => {
      let x, y;
      {
        if (el.tagName == 'path') {
          el.style.transform = 'translate(0, 0)';
        } else {
          x = Number(el.getAttribute('x')) + 8;
          y = Number(el.getAttribute('y')) - 8;
          el.setAttribute('x', x);
          el.setAttribute('y', y);
        }
      }
    });
  }, 200);
};

const one = new Button('one');
const plus = new Button('plus');
const minus = new Button('minus');
const zero = new Button('zero');
const multiply = new Button('multiply');
const divide = new Button('divide');
const clear = new Button('clear');
const equals = new Button('equals');

const buttons = [one, plus, minus, zero, multiply, divide, clear, equals];

buttons.forEach(button => {
  button.e.addEventListener(
    'mouseover',
    function() {
      button.onMouseOver();
    },
    false
  );
  button.e.addEventListener(
    'mouseout',
    function() {
      button.onMouseOut();
    },
    false
  );
  button.e.addEventListener(
    'mousedown',
    function() {
      button.onMouseDown();
    },
    false
  );
});
