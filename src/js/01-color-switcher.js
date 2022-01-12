const refs = {
  btnStart: document.querySelector("[data-start]"),
  btnStop: document.querySelector("[data-stop]"),
  spanText: document.querySelector("a")
}
console.log(refs.spanText);
document.body.style.textAlign = "center";
let idTimerStart = null;

refs.btnStart.classList.add("btn-open");
refs.btnStop.classList.add("btn-stop");
refs.spanText.classList.add("text")

refs.btnStart.addEventListener("click", event => {
  
  event.currentTarget.disabled = true
   idTimerStart = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
  },1000)

})
refs.btnStop.addEventListener("click", event => {
  clearInterval(idTimerStart);
  refs.btnStart.disabled = false
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}