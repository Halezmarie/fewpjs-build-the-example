// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// const body = document.querySelector("body");
const mediaPosts = document.getElementsByClassName("media-post");
Array.from(mediaPosts).forEach(function(post) {
  post.addEventListener("click", handleClick);
})

function handleClick(event) {
  if (event.target.nodeName === "SPAN") {
    targetId = event.path[4].id; 
    mimicServerCall()
    .then(() => {
      const heart = document.getElementById(targetId).children[2].children[0].children[0].children[0]
      if (heart.innerHTML === EMPTY_HEART) {
        heart.innerHTML = FULL_HEART;
        heart.classList.add("activated-heart");
      } else {
        heart.innerHTML = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      };
    })
    .catch((error) => {
      const modal = document.getElementById("modal");
      modal.classList.remove("hidden");
      modal.innerHTML += error;
      setTimeout(removeHidden, 5000);
      
      function removeHidden() {
        modal.classList.add("hidden");
      }
    })
  }
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}