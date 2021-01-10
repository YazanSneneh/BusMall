var catalogArray = [];

var left = document.getElementById('left-image');
var midImage = document.getElementById('mid-image');
var right = document.getElementById('right-image');
var imagesContainer = document.getElementsByClassName('catalog-img');
var rounds = 5;
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
    var randLeft = Math.floor(Math.random() * 19);
    do {
        var randMid = Math.floor(Math.random() * 19);
        var randRight = Math.floor(Math.random() * 19);
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
if (rounds >= 0) {
    for (var i = 0; i < imagesContainer.length; i++) {  // loop  images and add event listener for each one
        imagesContainer[i].addEventListener('click', function () {
            for (var i = 0; i < catalogArray.length; i++) {
                var imgSrc = this.getAttribute('src');
                if (imgSrc === catalogArray[i].path) {
                    catalogArray[i].isClicked();
                    // console.log(catalogArray[i].name + ' : ' + catalogArray[i].counter);
                    console.log(rounds)
                }
            }
            rounds = rounds - 1;
            randomImage();
        })
    }
} else {
    for (var i = 0; i < imagesContainer.length; i++) {
        imagesContainer[i].removeEventListener('click')
    }
}



randomImage();
resultButton.addEventListener('click', generateResults)