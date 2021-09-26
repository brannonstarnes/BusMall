'use strict';

//declare global variables
let allImages = [];
let totalVotes = 25;
let availableImages = [];

let leftImgEl = document.getElementById('left-pic');
let middleImgEl = document.getElementById('middle-pic');
let rightImgEl = document.getElementById('right-pic'); 

let listEl = document.getElementById('list');

let buttonClicked = false;
//image object constructor

function ProductImage (name, url) {
  this.name = name;
  this.url = `images/lab/assets/${url}`;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  allImages.push(this);
  availableImages.push(this);
  this.increaseClicks = function(){
    this.timesClicked = this.timesClicked + 1;
  };
}

//initialize each Object

new ProductImage('Bag', 'bag.jpg');
new ProductImage('Banana', 'banana.jpg');
new ProductImage('Bathroom', 'bathroom.jpg');
new ProductImage('Boots', 'boots.jpg');
new ProductImage('Breakfast', 'breakfast.jpg');
new ProductImage('Bubblegum', 'bubblegum.jpg');
new ProductImage('Chair', 'chair.jpg');
new ProductImage('Cthulu', 'cthulhu.jpg');
new ProductImage('Dog-Duck', 'dog-duck.jpg');
new ProductImage('Dragon', 'dragon.jpg');
new ProductImage('Pen', 'pen.jpg');
new ProductImage('Pet-Sweep', 'pet-sweep.jpg');
new ProductImage('Scissors', 'scissors.jpg');
new ProductImage('Shark', 'shark.jpg');
new ProductImage('Sweep', 'sweep.png');
new ProductImage('Tauntaun', 'tauntaun.jpg');
new ProductImage('Unicorn', 'unicorn.jpg');
new ProductImage('Water-Can', 'water-can.jpg');
new ProductImage('Wine-Glass', 'wine-glass.jpg');



let unavailableImgs = [];

//generate random number to select picture from array

function renderPictures() {
  let leftIndex = Math.floor(Math.random() * availableImages.length);
  let middleIndex = Math.floor(Math.random() * availableImages.length);
  let rightIndex = Math.floor(Math.random() * availableImages.length);


  let left= availableImages[leftIndex];
  let middle = availableImages[middleIndex];
  let right = availableImages[rightIndex];



  if (leftIndex === middleIndex || middleIndex === rightIndex ||leftIndex === rightIndex){
    renderPictures();
  } else{
    leftImgEl.src = left.url;
    leftImgEl.name = left.name;
    middleImgEl.src = middle.url;
    middleImgEl.name = middle.name;
    rightImgEl.src = right.url;
    rightImgEl.name = right.name;

    //number of times each image was displayed
    left.timesDisplayed = left.timesDisplayed + 1;
    middle.timesDisplayed = middle.timesDisplayed + 1;
    right.timesDisplayed = right.timesDisplayed + 1;

    //ADD FEATURE: CANNOT HAS SAME PIC IN CONSECUTIVE RENDERS
    unavailableImgs.push(left, middle, right);
    availableImages = [];
    for (let i = 0; i < allImages.length; i++){
      if(allImages[i] !== unavailableImgs[0] && allImages[i] !== unavailableImgs[1] && allImages[i] !== unavailableImgs[2]){
        availableImages.push(allImages[i]);
    } 
    


    }console.log(availableImages) 
    unavailableImgs = [];
  }
}

//create event handler
function handleClick(event){
  event.preventDefault();

  // increase number of votes
  totalVotes = totalVotes - 1;

  //Display Results Button if totalVotes = 25
  if(totalVotes === 0){
    activateButton();
  }else if(totalVotes > 0){

    //increase the times clicked
    let imageTarget = event.target;
    console.log(imageTarget.name);
    for ( let i = 0; i < allImages.length; i++ ){
      if (imageTarget.name === allImages[i].name){
        allImages[i].increaseClicks();
      }
    }
    //**************renderChart***********

    //get new pics
    renderPictures();
  }
}

function activateButton(){
  let buttonEl = document.getElementById('button');
  buttonEl.style.height = '80px';
  buttonEl.style.visibility = 'visible';
  buttonEl.innerText= "Click For Results";
  buttonEl.addEventListener('click', postResults);
}

function renderChart(){

  //grab canvas element
  let ctx = document.getElementById('my-chart').getContext('2d');
  const labels = [];
  const data = [];
  for (let i = 0; i < allImages.length; i++){
    labels.push(allImages[i].name);
    data.push(allImages[i].timesClicked);
  }
  //create new Chart, give it data
  let resultsChart = new CharacterData(ctx,)
}


function postResults(){
  if(buttonClicked !== true){
    for (let i = 0; i < allImages.length; i++){
      let perChosen = Math.floor((allImages[i].timesClicked / allImages[i].timesDisplayed) * 100);
      let newLI = document.createElement('li');
      newLI.innerText =  `${allImages[i].name}: ${allImages[i].timesClicked} clicks. Seen: ${allImages[i].timesDisplayed} times. ${perChosen}% selection rate.`;
      listEl.appendChild(newLI);
    }
  } document.getElementById('resultHeader').style.visibility = 'visible';
  listEl.style.overflow = 'scroll';
  listEl.style.border = 'thin solid black';
  buttonClicked = true;
}



// let highToLow = [];
// let highScore = allImages[0].timesClicked;


//find the "highest scoring"
// function tallyResults(){
//   for (let i = 0; i < allImages.length - highToLow.length; i++){
//     if (allImages[i].timesClicked > highScore){
//       highScore = allImages[i];
//     }
//   }highToLow.push(highScore);
// }



leftImgEl.addEventListener('click', handleClick);
middleImgEl.addEventListener('click', handleClick);
rightImgEl.addEventListener('click', handleClick);
renderPictures();