window.onload = books();
var adminid;
function books() {
  fetch(key + "books")
    .then(res => res.json())
    .then(res => {
      var output = "";
      var admintableoutput = "";

      console.log(res);

      res.forEach(element => {
        if (!element.active) {
          output += `
			<button type="button" style="margin:20px;padding:10px;"class="btn btn-primary" id="${
        element._id
      }" onclick="like('${element._id}');">
				${element.name} <span class="badge badge-light" id="count">${
            element.count.length
          }</span>
			</button>
			`;
        }
      });
      if (document.getElementById("getBooks") != null) {
        document.getElementById("getBooks").innerHTML = output;
      }
      res.forEach(element => {
        if (!element.active) {
          admintableoutput += `
									<tr>
										<th scope="row">${element.name}</th>
										<td>${element.description}</td>
										<td>${element.count.length}</td>
										<td>          <button type="submit" name="button" class="btn btn-success" id="${
                      element._id
                    }" onclick="showForm('${
            element._id
          }')">Approve <i class="fa fa-angle-right"></i></button>
										</td>
									</tr>
				`;
        }
      });
      document.getElementById("adminTable").innerHTML = admintableoutput;
    });
}

function like(idd) {
  var id = idd;
  //   console.log(id);
  var userid = sessionStorage.getItem("userid");
  console.log(userid);
  console.log(key + "books/upvote/" + id);
  fetch(key + "books/upvote/" + id, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      userid: userid
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById(id).className = "btn btn-dark";
      books();
    });

  //	count++;
  //	console.log(count);
  //document.getElementById(element.name).className="btn btn-dark";
  //document.getElementById('count').innerHTML = count;
}

function showForm(idd) {
  window.adminid = idd;

  document.getElementById("sendInfo").style.display = "block";
}

document.getElementById("adminsend").addEventListener("click", sendData => {
  console.log(key + "books/" + adminid);
  var name = document.getElementById("adminname").value;
  var desc = document.getElementById("admindescription").value;
  var image = document.getElementById("adminimage").value;

  console.log(key + "books/" + adminid);
  fetch(key + "books/" + adminid, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      description: desc,
      active: true,
      image: image
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Request Submitted Successfully!");
    });
});
