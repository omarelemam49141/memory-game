document.querySelector('.start-game span').onclick = function () {
    let x = prompt("Enter your name, please");

    let name = document.querySelector('.welcome span');
    if (x == "" || x == null) {
        name.innerHTML = "Unkown";
    } else {
        name.innerHTML = x;
    }

    document.querySelector('.start-game').remove();
}

let images = Array.from(document.querySelectorAll('.content .image-container'));

//shuffle images
let arrayOfNumbers,
    flabbedArray = [],
    allImages = document.querySelector('.content'),
    duration = 1000,
    wrongTries = 0,
    triesContainer = document.querySelector('.tries span'),
    rightTries = 0,
    wrongAudio = document.querySelector('.wrong-audio'),
    rightAudio = document.querySelector('.right-audio'),
    winGame = document.querySelector('.win-game'),
    loseGame = document.querySelector('.lose-game');


//put tries
triesContainer.innerHTML = wrongTries;

//call shuffle images function
shuffleImages(images);

//set the order of the images & handling the clicking
images.forEach((image, index) => {
    //shufling
    image.style.order = arrayOfNumbers[index];

    //clicking
    image.addEventListener('click', () => {
        //flab the image
        image.classList.add('flabbed');

        //add the image to the flabbed array
        flabbedArray = images.filter((item) => item.classList.contains('flabbed'));

        //handling the clicking 3shan msh hesa heya
        clickHandling(flabbedArray);

        //checkMatching
        if (flabbedArray.length == 2) {
            checkMatch(flabbedArray[0], flabbedArray[1]);
        }
    })
})

//checkMatch function
function checkMatch(image1, image2) {
    if (image1.dataset.tech == image2.dataset.tech) {
        //increase right tries
        rightTries++;

        //play the right audio
        rightAudio.play();

        //check if he wins 
        if (rightTries === 10) {
            winGame.style.display = "flex";
        }

        //remove flabbed class
        image1.classList.remove('flabbed');
        image2.classList.remove('flabbed');

        //add matched class
        image1.classList.add('matched');
        image2.classList.add('matched');
    } else {
        //increase wrong tries
        wrongTries++;
        triesContainer.innerHTML = wrongTries;

        //check if he loses
        if (wrongTries === 30) {
            loseGame.style.display = "flex";
        }

        //remove flabbed class
        setTimeout(() => {
            image1.classList.remove('flabbed');
            image2.classList.remove('flabbed');
        }, 1000);
        
        //play the wrong audio
        wrongAudio.play();
    }
}

//handling clicking
function clickHandling(flabbedArray) {
    //stop clicking
    if (flabbedArray.length == 2) {
        allImages.classList.add('stopClicking');
    }

    //resume the clicking
    setTimeout(()=>{
        allImages.classList.remove('stopClicking')
    }, duration)
}


//shuffle images function
function shuffleImages(arr) {
    //variables
    let rNumber;

    //make array consists of numbers tto the arr length
    arrayOfNumbers = [...Array(arr.length).keys()];
    
    arrayOfNumbers.forEach((number, index) => {
        //get random number
        rNumber = Math.floor(Math.random() * arr.length);
        
        //swap the number with the random number
        [arrayOfNumbers[index], arrayOfNumbers[rNumber]] = [arrayOfNumbers[rNumber], arrayOfNumbers[index]];
    });
}


