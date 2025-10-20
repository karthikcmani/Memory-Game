function gamestart(){
  let timer;
  clearInterval(timer);//stop the timer

  document.getElementById("btn").innerHTML="Restart";//change button text to restart after first click
  time=0;//reset timer
  moves=0;
  match=0;
  document.getElementById("timer").innerText="Time: 00:00:00";//reset timer display
  document.getElementById("moves").innerText="Moves: 0";//reset moves display
  timer=setInterval(()=>{
    time++;
    h=Math.floor(time/3600);
    m=Math.floor(time%3600/60);
    s=time%60;
    if(h<10) h='0'+h;
    if(m<10) m='0'+m;
    if(s<10) s='0'+s;
  document.getElementById("timer").innerHTML=`Time: ${h}:${m}:${s}`;
  },1000);
     const overlay=document.getElementById("overlay");
      const win=document.getElementById("win");
      overlay.style.display="none";
      win.style.display="none";//display win screen
let lockBoard=false;//to prevent clicking when two cards are flipped
let flippedCards=[];//array to hold flipped cards
const board= document.getElementById("board");//get board element
board.innerHTML="";//clear board before new game if it is a restart 
const list=["❤️","🙂","🍕","🍔","🍟","🌭","🍿","🥨","❤️","🙂","🍕","🍔","🍟","🌭","🍿","🥨"];//creating list of elements
// const list=["❤️","🙂","🍕","❤️","🙂","🍕"];//creating list of elements
list.sort(()=>Math.floor(Math.random()*list.length)-2);
list.forEach(item=>{//for each item in the list
  
  
  const card=document.createElement('div');//create a div element for each item in html throught js
  card.classList.add('card');//add class card to each div element 
  
  // card.innerText=item;//add the item from the list to the div element
  card.dataset.symbol=item;//add symbol to data set of each card
  //card.innerHTML=card.dataset.symbol;//add symbol to data set of each card
  card.innerHTML="";//clear the card content
//card before flipped------------------<
// when start game-------------------->  
card.innerHTML=card.dataset.symbol;
card.classList.add('flipped');
setTimeout(()=>{
card.innerHTML="";//clear the card content
card.classList.remove('flipped');
},1500);
card.addEventListener('click',()=>{//add event listener to each card
  
  if(lockBoard||flippedCards.includes(card)|| card.classList.contains('flipped')) return;//to prevent clicking the same card twice

  console.log("clicked");
  card.innerHTML=card.dataset.symbol;

card.classList.add('flipped');//add class flipped to the card when clicked
flippedCards.push(card);
if(flippedCards.length==2){
  
  moves++;
  document.getElementById("moves").innerText="Moves: "+moves;//update moves display
  lockBoard=true;//lock the board when two cards are flipped
    if(flippedCards[0].dataset.symbol===flippedCards[1].dataset.symbol){
    console.log("match");
    match++;
    if(match==list.length/2){
      clearInterval(timer);//stop the timer
     overlay.style.displsy="block";
     win.style.display="block";
      document.getElementById("wintime").innerHTML=`Time: ${h}:${m}:${s}`;//display win time
      document.getElementById("winmoves").innerHTML= `Moves: ${moves}`; //display win moves
      document.getElementById("winbtn").innerHTML=`Play Again!`;//change button text to play again
  
    }
    flippedCards[0].classList.add('matched');
    flippedCards[1].classList.add('matched');
    lockBoard=false;//unlock the board
    flippedCards=[];//clear the flipped cards array
  }
  else{
    console.log("no match");//if no match
    setTimeout(()=>{
      flippedCards[0].innerHTML="";
      flippedCards[1].innerHTML="";
      flippedCards[0].classList.remove('flipped');
      flippedCards[1].classList.remove('flipped');
      lockBoard=false;//unlock the board after cards are flipped back
      flippedCards=[];
      
    },1000);
  }
}

});
  board.appendChild(card);//append each card to the board element 
});



}