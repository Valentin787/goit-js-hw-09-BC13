import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector("#datetime-picker"),
  btnStart: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
  form:document.querySelectorAll(".field")
}

let inputTime = 0;
let resultTime = 0;
refs.btnStart.disabled = true
flatpickr("#datetime-picker", {
})

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.input.addEventListener("input", event => {
  inputTime = new Date(event.currentTarget.value);
  resultTime = inputTime.getTime() - Date.now();
  if (inputTime.getTime() < Date.now()) {
    refs.btnStart.disabled = true
    Notify.failure("Please choose a date in the future(" );
    return
  }
  refs.btnStart.disabled = false;
  Notify.success("Good Choice (^~^) !!!")

})

  
refs.btnStart.addEventListener("click", event => {

  const timerId = setInterval(() => {

  refs.days.textContent = String(convertMs(resultTime).days).padStart(2, 0);
  refs.hours.textContent = String(convertMs(resultTime).hours).padStart(2, 0);
  refs.minutes.textContent = String(convertMs(resultTime).minutes).padStart(2, 0);
  refs.seconds.textContent = String(convertMs(resultTime).seconds).padStart(2, 0); 
  
  resultTime -= 1000
  }, 1000)
  event.currentTarget.disabled = true
  
})

