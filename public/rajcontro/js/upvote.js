var score = document.getElementsByClassName("scoreCounter");
var score1 = document.getElementById("scoreCounter1");
for (var i = 0; i < score.length; i++) {
  score[i].innerHTML = "0";
}
var scoreValue = 0;
score1.innerHTML = 0;
checkScore();

function upVote() {
  document.getElementById("upButton1").style.borderBottomColor = "#6CC576";
  document.getElementById("downButton1").style.borderTopColor = "#555";
  scoreValue++;
  score1.innerHTML = scoreValue;
  checkScore();
}

function downVote() {
  document.getElementById("downButton1").style.borderTopColor = "#FF586C";
  document.getElementById("upButton1").style.borderBottomColor = "#555";
  scoreValue--;
  score1.innerHTML = scoreValue;
  checkScore();
}

function checkScore() {
  if (scoreValue < 0) {
    score1.style.color = "#FF586C";
  } else if (scoreValue > 0) {
    score1.style.color = "#6CC576";
  } else {
    score1.style.color = "#666666";
  }
}

document.getElementById("submitBtn").addEventListener("click", function() {
  alert("Your respond has been recorded");
});
