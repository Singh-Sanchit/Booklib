document.getElementById("submitButton").addEventListener("click", addBook);

function addBook() {
  var name = document.getElementById("name").value;
  var desc = document.getElementById("description").value;

  fetch(key + "books", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      description: desc,
      status: 0
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      books();
    });
}
