

const myAudio = document.createElement("audio");
myAudio.src = "./sounds/impact1.wav";
const myAudio2 = document.createElement("audio");
myAudio2.src = "./sounds/goodhit.wav";
const myAudio3 = document.createElement("audio");
myAudio3.src = "./sounds/bgsound.wav";

const rate1 = document.querySelector(".rate1");
const rate2 = document.querySelector(".rate2");
const rate3 = document.querySelector(".rate3");
const rate4 = document.querySelector(".rate4");
const rate5 = document.querySelector(".rate5");
const instructions = document.querySelector(".instructions")
const instruct = document.querySelector(".instruct");
const diff = document.querySelector(".diff");
const message_ovr = document.querySelector(".message_ovr");
const message2 = document.querySelector(".message2");
const message3 = document.querySelector(".message3");
const message4 = document.querySelector(".message4");
const message5 = document.querySelector(".message5");
const scoreOutput = document.querySelector(".score");
const badLeft = document.querySelector(".badLeft");
const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");
const hypeMsg = document.querySelector(".hypeMsg");
const basket = document.querySelector(".basket");
const container = document.querySelector(".container");
const baddy = document.querySelector(".baddy");
const poison = document.querySelector(".poison");
const bat = document.querySelector(".bat");
const difficulty = document.querySelector(".difficulty");

const boundBasket = basket.getBoundingClientRect();
let boundContainer = container.getBoundingClientRect();


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}

let player = {
    score: 0,
    totalBad: 0,
    totalPoison: 0, 
    totalBat: 0,                   
    inPlay: false,
    speed: 10,
    
}


//btn.addEventListener("click", startGame);
//btn.addEventListener("click", clock);
btn2.addEventListener("click", function(){location.reload()});

document.addEventListener("keydown", pressKeyOn);
document.addEventListener("keyup", pressKeyOff);

// *****START GAME (EASY ) *************/

function startGame1(){
    
    myAudio3.play();
    message_ovr.style.display = "none";
    difficulty.style.display = "none";
    instruct.style.display ="none";
    message4.style.display = "none";
    message5.style.display ="none";
    diff.textContent = "Player1: *NEWB*";
    diff.classList.add("blinking1");
    btn.style.display = "none";
    btn2.style.display = "none";
    basket.style.display = "block";
    container.classList.add("container_gameplay");
    player.score = 0;
    player.totalBad = 125;
    player.totalPoison = 80; 
    player.totalBat = 40;
    player.totalUfo = 40;  
    player.speed = 13;                    
    player.inPlay = true;
    scoreUpdate();

// setup badguys (ratio - spawned at a time) //

    setupBadGuys(5);
    setupPoison(3);
    setupBat(1);
    setupUfo(1)
    requestAnimationFrame(playGame);   

}        
    
/// *****END START GAME (EASY) *************/ 

// *****START GAME (NORMAL ) *************/

function startGame2(){
    
    myAudio3.play();
    message_ovr.style.display = "none";
    difficulty.style.display = "none";
    message4.style.disply = "none";
    diff.textContent = "PLAYER1: *NORMAL*";
    diff.classList.add("blinking2");
    btn.style.display = "none";
    btn2.style.display = "none";
    basket.style.display = "block";
    instruct.style.display = "none";
    container.classList.add("container_gameplay2");
    player.score = 0;
    player.totalBad = 125;
    player.totalPoison = 80; 
    player.totalBat = 60;
    player.totalUfo = 50;                      
    player.inPlay = true;
    player.speed = 12;
    scoreUpdate();
    
// setup badguys (ratio - spawned at a time) //

    setupBadGuys(6);
    setupPoison(3);   
    setupBat(2); 
    setupUfo(1);                          
    requestAnimationFrame(playGame);   

}        
    
/// *****END START GAME (NORMAL) *************/

// *****START GAME (HARD) *************/

function startGame3(){
    
    myAudio3.play();
    message_ovr.style.display = "none";
    difficulty.style.display = "none";
    message4.style.disply = "none";
    diff.textContent = "*Player1: *NINJA*";
    diff.classList.add("blinking3");
    btn.style.display = "none";
    btn2.style.display = "none";
    instruct.style.display = "none";
    basket.style.display = "block";
    basket.classList.add("basket2");
    container.classList.add("container_gameplay3");
    player.score = 0;
    player.totalBad = 125;
    player.totalPoison = 80;  
    player.totalBat = 60;
    player.totalUfo = 60;
    player.speed = 11;                     
    player.inPlay = true;
    scoreUpdate();
    
// setup badguys (ratio - spawned at a time) //

    setupBadGuys(6);
    setupPoison(4);    
    setupBat(2);
    setupUfo(2);                          
    requestAnimationFrame(playGame);   

}        
    
/// *****END START GAME (HARD) *************/


function setupPoison(amt){                          
    for(let x=0; x<amt; x++){                       
        makePoison();                               
    }                                               
}                                                    

function setupBadGuys(num){
    for(let x=0; x<num; x++){
        makeBad();
    }
}

function setupBat(numbat){
   for(let x=0; x<numbat; x++){
       makeBat();
   }
}

function setupUfo(numufo){
   for(let x=0; x<numufo; x++){
       makeUfo();
   }
}

function makePoison(){                               
    if(player.totalPoison > 0){
        let temp = player.totalPoison;               
        player.totalPoison--;
        
        let poison = document.createElement("div");   
         
        poison.classList.add("poison");     
        
        // RANDOMIZE POISON // 

        if(player.score%2 == 0){
            poison.classList.add("rat");
        }
            else if (player.score%3 == 0){
                poison.classList.add("fish");
            }

            else if (player.score%5 == 0){
                poison.classList.add("uwear");
            }

            else if (player.score%7 == 0){
                poison.classList.add("poison");
            }

            else 
                (poison.classList.add("garb"));

        poison.x = Math.floor(Math.random() * boundContainer.width * 0.9); 
        
        poison.y = (Math.floor(Math.random() * 500)*-1) - 200;
        
/**
*!  LOWER SPEED for TROUBLESHOOTING COLLISION*/

        poison.speed = Math.ceil(Math.random() * 10) +3;  // FOR TESTING MAY25
        //poison.speed = 1;
       
        

        container.appendChild(poison);
        poison.style.left = poison.x + "px";
        poison.style.top = poison.y + "px";

    }            

// ***** HYPE (PERFORMANCE/TAUNT) TEXTBAR ***********/             

            var hype1 = "Weak, Just Give UP!"
            var hype2 = "* You Suck Newb! *"
            var hype3 = "Mediocre Effort Brah!"
            var hype4 = "* Call the VET! *"
            var hype5 = "!Push it to the Max!"
            
            if(player.score <= 10) {
                message3.textContent = hype1;

            } else if( player.score > 10 && player.score < 30){
                message3.textContent = hype2;
            }else if (player.score >= 30 && player.score < 55){
                (message3.textContent = hype3);
            }else if(player.score >= 55 && player.score < 85){
                (message3.textContent = hype4);
            }else if(player.score >= 85){
                (message3.textContent = hype5);
            }

            //** SCORE COLOR (RED/GREEN SNIPPET) ***//

            if(player.score < 0){
                scoreOutput.classList.add("scoredn")
            } else if (player.score >= 0){
                scoreOutput.classList.remove("scoredn")
                scoreOutput.classList.add("score") 
            }


  //***********END HYPE BAR ******************/          

            
        

    
}        

///// BAT EXPERIMENT ////////

function makeBat(){                               
    if(player.totalBat > 0){
        let temp = player.totalBat;               
        player.totalBat--;
        
        let bat = document.createElement("div");   
         
        bat.classList.add("bat");  

        if(player.score%2 !== 0){
       
       bat.classList.add("bat2");
       }
        else if (player.score%3 == 0){
       
       bat.classList.add("bat3");
   
   }


         bat.x = Math.floor(Math.random() * (boundContainer.width - 150)* -1); 
        //  if(bat.x < 0){ 
        //     bat.x = 50};
        //bat.x = 100;
        bat.y = (Math.floor(Math.random() * boundContainer.height)* 0.9);

/**
*! LOWER SPEED for COLLISION TESTING may25 */
        bat.speed = Math.ceil(Math.random() * 10) +3;
        //bat.speed = 1;  
        

        container.appendChild(bat);
        bat.style.left = bat.x + "px";
        bat.style.top = bat.y + "px";

    }

}


function batMover(f){
    f.x += f.speed;
    
    if(isCollide(basket,f)){
        player.score = player.score - 1;
        container.removeChild(f);
        myAudio.play();
        scoreUpdate();
        makeBat();
        console.log("BATS!!!!!");
    
     
    }

    if(f.x > (boundContainer.width *0.85)){           
        f.x = -150;
                    
    f.y = Math.floor(Math.random()* (boundContainer.height * 0.85));
        f.style.top = f.y + "px";
    }    

    

    f.style.left = f.x + "px";
}    

/// RIght to left badguy new /////////////////

function makeUfo(){                               
    if(player.totalUfo > 0){
        let temp = player.totalUfo;               
        player.totalUfo--;
        
        let ufo = document.createElement("div");   
         
        ufo.classList.add("ufo");  
   
        ufo.x = (boundContainer.width + 200); 
        
        ufo.y = (Math.floor(Math.random() * boundContainer.height)* 0.9);

/**
*! LOWER SPEED for COLLISION TESTING may25 */
        ufo.speed = (Math.ceil(Math.random() * 10) +3);
        //ufo.speed = 1;  

        container.appendChild(ufo);
        ufo.style.left = ufo.x + "px";
        ufo.style.top = ufo.y + "px";

    }

}


function ufoMover(u){
    u.x -= u.speed;
    
    if(isCollide(basket,u)){
        player.score = player.score - 1;
        container.removeChild(u);
        myAudio.play();
        scoreUpdate();
        makeUfo();
        console.log("UFO!!!!!");
    
     
    }

    if(u.x < (boundContainer.width * 0.06)){           
        u.x = boundContainer.width + 300;
                    
    u.y = Math.floor(Math.random()* (boundContainer.height * 0.85));
        u.style.top = u.y + "px";
    }    
    u.style.left = u.x + "px";
}    

////end ufo right to left badguy /// 


function makeBad(){
    if(player.totalBad > 0){
        let temp = player.totalBad;
        player.totalBad--;
        
        scoreUpdate();
        let div = document.createElement("div");
        
        div.classList.add("baddy");
        div.x = Math.floor(Math.random() * boundContainer.width - 100);

        div.y = (Math.floor(Math.random() * boundContainer.height)*-1) - 200;
        
        div.speed = Math.ceil(Math.random() * 10) +3;    
        //div.speed = 1;
        
        
        
        container.appendChild(div);
        div.style.left = div.x + "px";
        div.style.top = div.y + "px";

    }
}

function playGame(){
    if(player.inPlay == true){
        
        if(keys.ArrowDown && boundBasket.y < (boundContainer.height - boundBasket.height)){
            boundBasket.y += player.speed;
        }
        if(keys.ArrowUp && boundBasket.y > boundContainer.height*0.5){     /// toilet upper limit set as height
            boundBasket.y -= player.speed;
        }
        if(keys.ArrowLeft && boundBasket.x > 0){
            boundBasket.x -= player.speed;
        }
        if(keys.ArrowRight && boundBasket.x < (boundContainer.width - boundBasket.width)){
            boundBasket.x += player.speed;
        }

        basket.style.left = boundBasket.x + "px";
        basket.style.top = boundBasket.y + "px";

        requestAnimationFrame(playGame);

        let tempBat = document.querySelectorAll(".bat");

        let tempPoison = document.querySelectorAll(".poison");
              
        let tempEnemy = document.querySelectorAll(".baddy");

        let tempUfo = document.querySelectorAll(".ufo");
        
// END GAME IF score <-20 or out of poops //        
        
        if(tempEnemy.length == 0 | player.score <= -20){
            endGame();
           
        }else{

            for(let i=0; i< tempEnemy.length; i++){
                bgMover(tempEnemy[i]);
            }

            for(let i=0; i<tempPoison.length; i++){
                poisonMover(tempPoison[i]);
            } 

            for(let i=0; i<tempBat.length; i++){
                batMover(tempBat[i]);
            } 

            for(let i=0; i<tempUfo.length; i++){
                ufoMover(tempUfo[i]);
            } 
       }
    }
}    

function endGame(){
    container.classList.add("ghost1");
    container.classList.add("container_endgame");      
    message_ovr.style.display = "block";
    basket.style.display = "none";
    message_ovr.textContent = "Game Over!"
    player.totalBad = 0;
    message2.textContent = "Your score is " + scoreOutput.innerHTML + " in " + minutesLabel.innerHTML + ":" + secondsLabel.innerHTML ;
    btn2.style.display = "inline";  

// POST GAME RANKING BASED ON FINAL SCORE //     
    
    let rank = " ";
    if(player.score < 10){
        rank = "stank";
    } else if (player.score >= 10 && player.score < 30){
        rank = "prospect";
    } else if (player.score >= 30 && player.score < 55){
        rank = "private"; 
    } else if (player.score >= 55 && player.score < 85){
        rank = "veteran";
    } else if (player.score >=85){
        rank = "ninja";
    }      

    message4.style.display ="block";
    message4.textContent = "Your rank is: " + rank;
    message5.style.display = "block";
    
    if (rank == "stank") {
        rate1.classList.add("rating")
    }else if(rank == "prospect") {
        rate2.classList.add("rating");
    }else if(rank == "private"){
        rate3.classList.add("rating");
    }else if(rank == "veteran"){
        rate4.classList.add("rating");
    }else if(rank == "ninja"){
        rate5.classList.add("rating");
    }
               
    player.inPlay == false;
    
}

// POOP MOVER FUNC //

function bgMover(e){
    e.y += e.speed;
    
    if(isCollide(basket, e)){
        player.score++;
        container.removeChild(e);
        scoreUpdate();
        makeBad();
        console.log("hit");
        
        myAudio2.play();

                    
    }
    
    
    if(e.y > (boundContainer.height * 0.8)){          
        e.y = -100;
                
    e.x = Math.floor(Math.random()* boundContainer.width *0.9);
        e.style.left = e.x + "px";
      
    }

    // collision moved from here // 
   
    e.style.top = e.y + "px";
}    

// JUNK MOVER FUNC //

function poisonMover(p){
    p.y += p.speed;
     
    if(isCollide(basket, p)){
        player.score = player.score - 2;
        myAudio.play();
        container.removeChild(p);
        scoreUpdate();
        makePoison();
        console.log("POISON!!!!!");
        
    }
    
    if(p.y > (boundContainer.height * 0.77)){     
        p.y = -150;

        p.x = Math.floor(Math.random()* boundContainer.width * 0.9);
        p.style.left = p.x + "px";
    }

    // iscollide moved from here // MAY 25
    
    p.style.top = p.y + "px";
}    


// CHECK COLLISION SNIPPET ///

function isCollide(a, b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}    


// launch animation

function scoreUpdate(){
    scoreOutput.textContent = player.score;
    badLeft.textContent = player.totalBad;
}


// KEY PRESS EVENTS SETUP

function pressKeyOn(event) {
    //console.log(event.key);
    event.preventDefault();
    keys[event.key] = true;
}

function pressKeyOff(event) {
    //console.log(event.key);
    event.preventDefault();
    keys[event.key] = false;
}

// TIMER

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");



function clock(){
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timeout = setInterval(setTime, 1000);

 

function setTime() {
    //var minutesLabel = document.getElementById("minutes");
    //var secondsLabel = document.getElementById("seconds");
    //var totalSeconds = 0;
    //var timeout = setInterval(setTime, 1000);
++totalSeconds;

if(totalSeconds%40 == 0){
    myAudio3.play();
}  

secondsLabel.innerHTML = pad(totalSeconds % 60);
minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

let tempEnemy = document.querySelectorAll(".baddy");
if(tempEnemy.length == 0 | player.score <= -20){          
    clearInterval(timeout);
 
}

}
function resetTime(){
    totalSeconds = 0;
    setTime();
}


function pad(val) {
var valString = val + "";
if (valString.length < 2) {
    return "0" + valString;
    } else {
    return valString;
    }
}
}
/// end timer



