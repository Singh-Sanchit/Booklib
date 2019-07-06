var url = "http://localhost:3000/auth/verify";

window.onload = authenticate();

function authenticate() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  if (isLoggedIn) {
    var userid = sessionStorage.getItem("userid");
    console.log(userid);
  } else {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          sessionStorage.setItem("isLoggedIn", true); //Set
          sessionStorage.setItem("userid", data._id); //Set userid
          isLoggedIn = sessionStorage.getItem("isLoggedIn");
          userid = sessionStorage.getItem("userid");
          console.log(isLoggedIn);
        } else {
          console.log("Please LogIn");
        }
      });
  }
}
