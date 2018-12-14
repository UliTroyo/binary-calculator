const buttons = document.querySelectorAll('.btn-top');

const poo = e => console.log(e);
const onHover = e => (e.target.style.fill = 'blue');
const onMouseOut = e => (e.target.style.fill = 'red');

buttons.forEach(e => {
  e.addEventListener('mouseover', e => onHover(e), true);
  e.addEventListener('mouseout', e => onMouseOut(e), true);
  e.addEventListener('click', e => poo(e), true);
});
