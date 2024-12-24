//scroll-up
document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp(){
  var CurrentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (CurrentScroll > 0){
      window.scrollTo(0,0);
  }
}
buttonUp = document.getElementById("button-up");

window.onscroll = function (){
  var scroll = document.documentElement.scrollTop;

  if (scroll > 1800){
    buttonUp.style.transform = "scale(1)";
  }else if (scroll < 1800){
    buttonUp.style.transform = "scale(0)";
  }
}

//title page
let previousTitle = document.title;

window.addEventListener("blur", () => {
  previousTitle = document.title;
  document.title = "Regresa para saber más"
})

window.addEventListener("focus", () => {
  document.title = previousTitle;
})
//footer message effect
let text = document.getElementById("thanks");
let str = text.innerHTML;

text.innerHTML = "";

let speed = 200;
let i=0;

//function

function typeWriter(){
  if(i<str.length){
    text.innerHTML += str.charAt(i);
    i++;
    setTimeout(typeWriter,speed);
  }
}

setTimeout(typeWriter, speed);