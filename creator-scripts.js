// ONE LINE OF JS — Add to your creator-script.js
document.addEventListener('click', e => {
  if (e.target.matches('.stepper-btn')) {
    const stepper = e.target.closest('.stepper');
    const valueEl = stepper.querySelector('.stepper-value');
    let value = parseInt(valueEl.dataset.value) || 0;
    
    if (e.target.classList.contains('increment')) value++;
    if (e.target.classList.contains('decrement')) value--;
    
    // Optional: Add min/max
    const min = parseInt(stepper.dataset.min) || -Infinity;
    const max = parseInt(stepper.dataset.max) || Infinity;
    value = Math.max(min, Math.min(max, value));
    
    valueEl.textContent = value;
    valueEl.dataset.value = value;
  }
});