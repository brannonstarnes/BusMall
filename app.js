'use strict';

//declare global variables
let allImages = [];
let totalVotes = 0;

let leftImgEl = document.getElementById('left-pic');
let middleImgEl = document.getElementById('middle-pic');
let rightImgEl = document.getElementById('right-pic'); 

let listEl = document.getElementById('list');

//image object constructor

function ProductImage (name, url) {
  this.name = name;
  this.url = `images/lab/assets/${url}`;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  allImages.push(this);
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
new ProductImage('DogDuck', 'dog-duck.jpg');
new ProductImage('Dragon', 'dragon.jpg');
new ProductImage('Pen', 'pen.jpg');
new ProductImage('PetSweep', 'pet-sweep.jpg');
new ProductImage('Scissors', 'scissors.jpg');
new ProductImage('Shark', 'shark.jpg');
new ProductImage('Sweep', 'sweep.png');
new ProductImage('Tauntaun', 'tauntaun.jpg');
new ProductImage('Unicorn', 'unicorn.jpg');
new ProductImage('WaterCan', 'water-can.jpg');
new ProductImage('WineGlass', 'wine-glass.jpg');

//generate random number to select picture from array

function renderPictures() {
  let leftIndex = Math.floor(Math.random() * allImages.length);
  let middleIndex = Math.floor(Math.random() * allImages.length);
  let rightIndex = Math.floor(Math.random() * allImages.length);


  let left= allImages[leftIndex];
  let middle = allImages[middleIndex];
  let right = allImages[rightIndex];

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
  }
}


//create event handler
function handleClick(event){
  event.preventDefault();

  // increase number of votes
  totalVotes = totalVotes + 1;

  //Display Results if totalVotes = 25
  if(totalVotes == 25){
    activateButton();
  }else if(totalVotes < 25){

    //increase the times clicked
    let imageTarget = event.target;
    console.log(imageTarget.name);
    for ( let i = 0; i < allImages.length; i++ ){
      if (imageTarget.name === allImages[i].name){
        allImages[i].increaseClicks();
      }
    }
    //get new pics
    renderPictures();
  }
}

function activateButton(){
  let buttonEl = document.getElementById('button');
  buttonEl.innerText= "Click For Results";
  buttonEl.addEventListener('click', postResults)
}



function postResults(){
  for (let i = 0; i < allImages.length; i++){
    let perChosen = Math.floor((allImages[i].timesClicked / allImages[i].timesDisplayed) * 100);
    let newLI = document.createElement('li');
    newLI.innerText =  `${allImages[i].name}: ${allImages[i].timesClicked} clicks. ${perChosen}% selection rate.`;
    listEl.appendChild(newLI);
  }
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
console.log(allImages);