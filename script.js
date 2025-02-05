let curr= 0;
let total = 0;
let wrong = 0;

fetch("/questions")
  .then((response) => response.json())
  .then((data) => {
    question(data);
  });

function question(data){
    if(curr>=data.length){
        document.getElementById("option").innerHtml="";
        document.getElementById("question").innerHtml="Game over!";
        document.getElementById("score").innerHTML="";
    
    document.getElementById("total").textContent=
    "your marks:"+ total +"wrong: " + wrong;
    return;
    }

  
  let q = data[curr];
  document.getElementById("question").innerHTML = q.question;
  let choices = document.getElementById("option");
  choices.innerHTML = "";
  

  for (let i = 0; i < q.options.length; i++) {
    let btn = document.createElement("button");
    btn.innerHTML = q.options[i]; 
    btn.setAttribute("data-answer", q.options[i]); 
    btn.onclick = function () {
      let sel= this.getAttribute("data-answer");
      if (sel === q.answer) {
        total++;
        document.getElementById("score").innerHTML =
          "Score: " + total + " Wrong: " + wrong;
      } else {
        wrong++;
        document.getElementById("score").innerHTML =
          "Score: " + total + " Wrong: " + wrong;
      }
      curr++;
      question(data);
    };
    choices.appendChild(btn);
  }
}