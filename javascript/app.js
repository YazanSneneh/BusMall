var catalogArray = [];

var left = document.getElementById('left-image');
var midImage = document.getElementById('mid-image');
var right = document.getElementById('right-image');
var imagesContainer = document.getElementsByClassName('catalog-img');
var rounds = 25;
var resultButton = document.getElementById('result-btn');
var resultContainer = document.getElementById('result-container');

// model declrations 
function Catalog(name, path) {
    this.name = name;
    this.path = 'images/' + path;
    this.counter = 0;
    this.imageAppearance = 0;
    catalogArray.push(this);
}

Catalog.prototype.isClicked = function () {
    return this.counter++;
};
Catalog.prototype.isAppeared = function () {
    return this.imageAppearance++;
};

// add data 
new Catalog('bag', 'bag.jpg');
new Catalog('banana', 'banana.jpg');
new Catalog('bathroom', 'bathroom.jpg');
new Catalog('boots', 'boots.jpg');
new Catalog('breakfast', 'breakfast.jpg');
new Catalog('bubblegum', 'bubblegum.jpg');
new Catalog('chair', 'chair.jpg');
new Catalog('cthulhu', 'cthulhu.jpg');
new Catalog('dog-duck', 'dog-duck.jpg');
new Catalog('dragon', 'dragon.jpg');
new Catalog('pen', 'pen.jpg');
new Catalog('pet-sweep', 'pet-sweep.jpg');
new Catalog('scissors', 'scissors.jpg');
new Catalog('shark', 'shark.jpg');
new Catalog('sweep', 'sweep.png');
new Catalog('unicorn', 'unicorn.jpg');
new Catalog('usb', 'usb.gif');
new Catalog('water-can', 'water-can.jpg');
new Catalog('wine-glass', 'wine-glass.jpg');

// functions declrations
// generate random 3 images
function randomImage() {
    var randLeft = Math.floor(Math.random() * catalogArray.length);
    do {
        var randMid = Math.floor(Math.random() * catalogArray.length);
        var randRight = Math.floor(Math.random() * catalogArray.length);
    } while (randLeft === randMid || randLeft === randRight || randMid === randRight)
    // count number of appearance
    catalogArray[randLeft].isAppeared()
    catalogArray[randMid].isAppeared()
    catalogArray[randRight].isAppeared()

    //  inject images into html
    left.setAttribute('src', catalogArray[randLeft].path);
    left.setAttribute('alt', catalogArray[randLeft].name);

    midImage.setAttribute('src', catalogArray[randMid].path);
    midImage.setAttribute('alt', catalogArray[randMid].name);

    right.setAttribute('src', catalogArray[randRight].path);
    right.setAttribute('alt', catalogArray[randRight].name);
}

function generateResults() {
    var ul = document.createElement('ul');
    resultContainer.append(ul);
    for (i = 0; i < catalogArray.length; i++) {
        var li = document.createElement('li');
        li.textContent = catalogArray[i].name + ' had ' + catalogArray[i].counter + ' votes, and was seen ' + catalogArray[i].imageAppearance + ' times.';
        ul.append(li);
    }
}

// executable code
function CheckAttempts() {  // give user attempts 
    rounds--;
    if (rounds >= 0) {
        for (var i = 0; i < imagesContainer.length; i++) {
            imagesContainer[i].addEventListener('click', trackClick)
        }
    } else {
        for (var i = 0; i < imagesContainer.length; i++) {
            imagesContainer[i].removeEventListener('click', trackClick)
        }
    }
}


function trackClick() {     // method will listen to event when image clicked
    for (var i = 0; i < catalogArray.length; i++) {
        var imgSrc = this.getAttribute('src');
        if (imgSrc === catalogArray[i].path) {
            catalogArray[i].isClicked();
            console.log(rounds)
            CheckAttempts()
        }
    }

    randomImage();
}


randomImage(); // add first 3 images 
for (var i = 0; i < imagesContainer.length; i++) {
    imagesContainer[i].addEventListener('click', trackClick)
}
resultButton.addEventListener('click', generateResults) // generate result in list