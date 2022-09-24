let QuestionAnswer;

let NumberCorrect =0;

let qNum=0;

let json_obj="";

let done = false;

let arrScoreData = [];

let pdf = new jsPDF('p','pt','a4');

let userAnswers = [];
  
function update(idname) {
    var width = document.getElementById(idname).innerText;
    // console.log(width);
    width = parseFloat(width);
    // console.log(width);

    width+=10;
    // qNum=width;

    if (width > 100) {

        width=0;
    }

    document.getElementById(idname).style.width = width + '%';
    document.getElementById(idname).innerHTML = width * 1 + '%';
}

function reduce(idname) {
    var width = document.getElementById(idname).textContent;
    // console.log(width);
    width = parseFloat(width);
    // console.log(width);

    width-=10;

    if (width < 0) {
        width=0;
    }

    document.getElementById(idname).style.width = width + '%';
    document.getElementById(idname).innerHTML = width * 1 + '%';
}

function printJSON(yourUrl){

    var json_obj = JSON.parse(Get(yourUrl));
    console.log(json_obj);

  
}

function randomArrayShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function returnJSON(yourUrl){

    var json_obj = JSON.parse(Get(yourUrl));
    return json_obj;

  
}

function getData(yourUrl){
  json_obj = returnJSON(yourUrl);
  console.log(json_obj);
  
  
  
}

function updateData(quesNum){
  let i = quesNum;
  // console.log(json_obj.results[i]);

  let details = json_obj.results[i].category;
  let question = json_obj.results[i].question;
  let correct = json_obj.results[i].correct_answer;
  let ic1 = json_obj.results[i].incorrect_answers[0];
  let ic2 = json_obj.results[i].incorrect_answers[1];
  let ic3 = json_obj.results[i].incorrect_answers[2];

  const answersArr = [correct,ic1,ic2,ic3];
  // console.log(answersArr);
 
  const shuffleArr = randomArrayShuffle(answersArr);
  // console.log(shuffleArr);

  QuestionAnswer = correct;
    
  // console.log(details);
  // console.log(question);
  // console.log(correct);
  // console.log(ic1);
  // console.log(ic2);
  // console.log(ic3);

  pdf.text(question);

  setQuestion(question, details, correct, shuffleArr);
}

function setQuestion(question, details, correct, answersArr){
  const q = document.querySelector("#question");
  q.innerHTML = question;

  const d = document.querySelector("#details");
  d.innerHTML ="Category: " + details;

  const ans1 = document.querySelector("#ans1");
  ans1.innerHTML = answersArr[0];

  const ans2 = document.querySelector("#ans2");
  ans2.innerHTML = answersArr[1];

  const ans3 = document.querySelector("#ans3");
  ans3.innerHTML = answersArr[2];

  const ans4 = document.querySelector("#ans4");
  ans4.innerHTML = answersArr[3];
  
  
}

function checkAnswer(buttonid){
  let button = document.getElementById(buttonid).innerHTML;
  button = button.replace("&amp;",/&/g).replace("&gt;",/>/g).replace("&lt;",/</g).replace("&quot;",/"/g).replace("&apos;",/'/);
  QuestionAnswer = QuestionAnswer.replace("&amp;",/&/g).replace("&gt;",/>/g).replace("&lt;",/</g).replace("&quot;",/"/g).replace("&apos;",/'/);
  if(button == QuestionAnswer){
    NumberCorrect++;
    // console.log(NumberCorrect);
    userAnswers[qNum] = '\u{1F7E9}';
    
  }else{
    userAnswers[qNum] = '\u{1F7E5}';
  }

  userAnswers[qNum] += ' '+button;

  if(qNum==9){
    document.getElementById("ans1").setAttribute('disabled','disabled');
    document.getElementById("ans2").setAttribute('disabled','disabled');
    document.getElementById("ans3").setAttribute('disabled','disabled');
    document.getElementById("ans4").setAttribute('disabled','disabled');
    update('myprogressBar_QuestionProgress');
    // update('myprogressBar_QuestionProgress');
    // console.log('done');
    done = true;
    
    
  }
  else{
  
    // console.log(qNum);
    qNum++;
    // console.log(document.getElementById('myprogressBar_QuestionProgress').innerText);
    updateData(qNum);
    update('myprogressBar_QuestionProgress');
  
  }

  if(done){
    setTimeout(function(){
    modal.style.display = "block";
    let modalText = document.getElementById("modalText");
    updateLocalStorage();
    chart();
    let avgScore = localStorage.getItem('scoreAvg');
    modalText.innerHTML = NumberCorrect+ " out of 10 Correct!" + "<br>"+ "Average Score: " +     parseFloat(avgScore).toFixed(3);
      span.onclick = function() {
      modal.style.display = "none";
      }

    // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
}

    }, 500); //end of delay
   
  }

}

function updateLocalStorage(){
  let numGames = localStorage.getItem('games');
  numGames++;
  localStorage.setItem('games', numGames);

  localStorage.setItem('LastGameScore', NumberCorrect);
  
  let avgScore = localStorage.getItem('scoreAvg');
  let newAvg = (avgScore*(numGames-1)+NumberCorrect)/(numGames);
  
  localStorage.setItem('scoreAvg', newAvg);
    if(NumberCorrect==0){
        let num0 = localStorage.getItem('score0');
        num1++;
        localStorage.setItem('score0', num0);

    }
    if(NumberCorrect==1){
    let num1 = localStorage.getItem('score1');
      num1++;
      localStorage.setItem('score1', num1);

    }
    if(NumberCorrect==2){
    let num2 = localStorage.getItem('score2');
      num2++;
      localStorage.setItem('score2', num2);

    }
    if(NumberCorrect==3){
    let num3 = localStorage.getItem('score3');
      num3++;
      localStorage.setItem('score3', num3);

    }
    if(NumberCorrect==4){
    let num4 = localStorage.getItem('score4');
      num4++;
      localStorage.setItem('score4', num4);

    }
    if(NumberCorrect==5){
    let num5 = localStorage.getItem('score5');
      num5++;
      localStorage.setItem('score5', num5);

    }
    if(NumberCorrect==6){
    let num6 = localStorage.getItem('score6');
      num6++;
      localStorage.setItem('score6', num6);

    }
    if(NumberCorrect==7){
    let num7 = localStorage.getItem('score7');
      num7++;
      localStorage.setItem('score7', num7);

    }
    if(NumberCorrect==8){
    let num8 = localStorage.getItem('score8');
      num8++;
      localStorage.setItem('score8', num8);

    }
    if(NumberCorrect==9){
    let num9 = localStorage.getItem('score9');
      num9++;
      localStorage.setItem('score9', num9);

    }
    if(NumberCorrect==10){
    let num10 = localStorage.getItem('score10');
      num10++;
      localStorage.setItem('score10', num10);

    }
    let num0 = localStorage.getItem('score0');
    let num1 = localStorage.getItem('score1');
    let num2 = localStorage.getItem('score2');
    let num3 = localStorage.getItem('score3');
    let num4 = localStorage.getItem('score4');
    let num5 = localStorage.getItem('score5');
    let num6 = localStorage.getItem('score6');
    let num7 = localStorage.getItem('score7');
    let num8 = localStorage.getItem('score8');
    let num9 = localStorage.getItem('score9');
    let num10 = localStorage.getItem('score10');


    arrScoreData = [num0,num1,num2,num3,num4,num5,num6,num7,num8,num9,num10];


}

function getLocalData(){
  let num0 = localStorage.getItem('score0');
    let num1 = localStorage.getItem('score1');
    let num2 = localStorage.getItem('score2');
    let num3 = localStorage.getItem('score3');
    let num4 = localStorage.getItem('score4');
    let num5 = localStorage.getItem('score5');
    let num6 = localStorage.getItem('score6');
    let num7 = localStorage.getItem('score7');
    let num8 = localStorage.getItem('score8');
    let num9 = localStorage.getItem('score9');
    let num10 = localStorage.getItem('score10');


    arrScoreData = [num0,num1,num2,num3,num4,num5,num6,num7,num8,num9,num10];
}

// function runModal(){
//   let modalText = document.getElementById("modalText");
//   let lastScore = localStorage.getItem("LastGameScore");
//       getLocalData();
//       chart();
//       let avgScore = localStorage.getItem('scoreAvg');
//       modalText.innerHTML = "Last Game Score: "+ "<br>"+ lastScore+ " out of 10 Correct!" + "<br>"+ "Average Score: " + parseFloat(avgScore).toFixed(3);
//   modal.style.display = "block";
//   var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
//   span.onclick = function() {
//   modal.style.display = "none";
//   }

// // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

  
// }

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function chart(){
    var ctx = document.getElementById('myChart');

    const myChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: ['Zero','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
            datasets: [{
                label: 'Score Distribution',
                data: arrScoreData,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)',
                    'rgba(76, 175, 80, 0.4)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(76, 175, 80, 1)'
                ],
                borderWidth: 1
            }]
        },

        options: {

            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// function saveAspdf() {
        
//             pdf.save('web.pdf');
//     }

function copyText() {
  
  let resultString = "That Quiz Game"+ '\n'+NumberCorrect+ " out of 10 Correct! " + '\n';
  for(let j = 0; j<10; j++){
    resultString += userAnswers[j] + '\n';
  }
  
  navigator.clipboard.writeText(resultString);
}



