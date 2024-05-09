//title page
let previousTitle = document.title;

window.addEventListener("blur", () => {
  previousTitle = document.title;
  document.title = "More About Dario"
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