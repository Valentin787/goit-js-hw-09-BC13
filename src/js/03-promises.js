import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),
  inputFirst: document.querySelector("[name=delay]"),
  inputDelay: document.querySelector("[name=step]"),
  inputAmount: document.querySelector("[name=amount]"),
  btnSub: document.querySelector("[type=submit]")
}
function createPromise(position, delay) {
  console.log(`Delay`,delay);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
      resolve(({ position, delay }))
    } else {
      reject(({ position, delay }));
    }}, delay)
   })  
}

refs.form.addEventListener("submit", event => {
  event.preventDefault();

  let data = {
    firstDelay: +event.target[0].value,
    delayStep: +event.target[1].value,
    amount: +event.target[2].value
  }
  for (let i = 1; i <= data.amount; i += 1){

    createPromise(i, data.firstDelay + i * data.delayStep)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms` )
    })
  }
})


