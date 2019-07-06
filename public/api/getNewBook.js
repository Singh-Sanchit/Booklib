window.onload = fetchBooks();
function fetchBooks() {
  fetch(key + "books")
    .then(res => res.json())
    .then(res => {
      var output = "";

      console.log(res);

      res.forEach(element => {
        if (element.active) {
          output += `
			<div class="service-item relative" style="margin-bottom: 100px;">
									<img class="service-icon" src="${element.image}" alt="">
									<h5 class="service-title">${element.name}</h5>
									<div class="service-content">
                                    ${element.description} 
									</div>
									<a class="service-link scroll" onclick="makingItVisible();" target="_self"></a>
								</div>
			`;
        }
      });
      document.getElementById("addNewBooksHtml").innerHTML = output;
    });
}

function makingItVisible() {
  document.getElementById("makeMeVisible").style.display = "block";
}
