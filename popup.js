  let yes = document.getElementById("submit");
  let no = document.getElementById("refuse");
  let hey = document.getElementById("hey");

  yes.addEventListener("click", function () {
      window.open('cartn.html', '_blank') 
  });
  no.addEventListener("click", function () {
    hey.textContent = "Thanks..";
    yes.style.visibility = "hidden"
    no.style.visibility = "hidden"
  })