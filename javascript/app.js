'use strict';
var catalogArray = [];  // store all images and it's information
var left = document.getElementById('left-image');
var midImage = document.getElementById('mid-image');
var right = document.getElementById('right-image');

var imagesContainer = document.getElementsByClassName('catalog-img');
var rounds = 25;

var resultButton = document.getElementById('result-btn');
var resultContainer = document.getElementById('result-container');

var chartCanvas = document.getElementById('chart-canvas').getContext('2d');

var lastImagesAppeared = [];

// model declrations 
function Catalog(name, path) {
    this.name = name;
    this.path = 'images/' + path;
    this.counter = 0;
    this.imageAppearance = 0;
    catalogArray.push(this);
}

function isClicked(image) {
    image.counter++;
    localStorage.setItem('images', JSON.stringify(catalogArray))
    console.log(image)
    return image.counter;
};
function isAppeared(image) {
    return image.imageAppearance++;
};

// add data using cosntructor
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
function isImageShown(index) {
    for (var i = 0; i < lastImagesAppeared.length; i++) {
        if (lastImagesAppeared[i].name === catalogArray[index].name) {
            return true;
        }
    }
    return false;
}

function randomImage() {
    do {   // keep checking that item appeared
        var randLeft = Math.floor(Math.random() * catalogArray.length);
    } while (isImageShown(randLeft));

    do {
        var randMid = Math.floor(Math.random() * catalogArray.length);
        var randRight = Math.floor(Math.random() * catalogArray.length);
    } while (randLeft === randRight || randLeft === randMid || randRight === randMid || isImageShown(randRight) || isImageShown(randMid))

    // count number of appearance
    isAppeared(catalogArray[randLeft])
    isAppeared(catalogArray[randMid])
    isAppeared(catalogArray[randRight])

    //  inject images into html
    left.setAttribute('src', catalogArray[randLeft].path);
    left.setAttribute('alt', catalogArray[randLeft].name);

    midImage.setAttribute('src', catalogArray[randMid].path);
    midImage.setAttribute('alt', catalogArray[randMid].name);

    right.setAttribute('src', catalogArray[randRight].path);
    right.setAttribute('alt', catalogArray[randRight].name);

    lastImagesAppeared = [];
    lastImagesAppeared.push(
        catalogArray[randLeft],
        catalogArray[randMid],
        catalogArray[randRight]
    )
}

function generateResults() {
    var ul = document.createElement('ul');
    var heading = document.createElement('h2')
    heading.textContent = 'Result';
    ul.append(heading)
    resultContainer.append(ul);
    for (i = 0; i < catalogArray.length; i++) {
        var li = document.createElement('li');
        li.textContent = catalogArray[i].name + ' had ' + catalogArray[i].counter + ' votes, and was seen ' + catalogArray[i].imageAppearance + ' times.';
        ul.append(li);
    }
}

function CheckAttempts() {  // give user attempts 
    rounds--;
    if (rounds > 0) {
        for (var i = 0; i < imagesContainer.length; i++) {
            imagesContainer[i].addEventListener('click', trackClick)
        }
    } else {
        for (var i = 0; i < imagesContainer.length; i++) {
            imagesContainer[i].removeEventListener('click', trackClick)
            addChart()
        }
        storeImages()
    }
}

function trackClick() {     // method will listen to event when image clicked
    for (var i = 0; i < catalogArray.length; i++) {
        var imgSrc = this.getAttribute('src');
        if (imgSrc === catalogArray[i].path) {
            isClicked(catalogArray[i])
            CheckAttempts()
        }
    }
    randomImage();
}

function addChart() {   // represent data visually
    var imagesName = []
    var representAppearanceVisually = [];
    var representCountsVisually = []

    for (var i = 0; i < catalogArray.length; i++) {
        imagesName.push(catalogArray[i].name)
        representAppearanceVisually.push(catalogArray[i].imageAppearance)
        representCountsVisually.push(catalogArray[i].counter)
    }
    new Chart(chartCanvas, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: imagesName,  // items name in the chart
            datasets: [{
                label: 'Image Appearance times',    // chart title
                backgroundColor: '#ff577f',
                borderColor: 'rgb(255, 99, 132)',
                data: representAppearanceVisually   // data
            }, {
                label: 'Image clicked times',
                backgroundColor: '#f05454',
                borderColor: 'rgb(255, 99, 132)',
                data: representCountsVisually
            }]
        },
        // Configuration options go here
        options: {}
    });
}

function storeImages() {
    localStorage.setItem('images', JSON.stringify(catalogArray));
}

function checkAndRestore() {
    if (localStorage.length > 0) { // check if the local storage has any values in it
        catalogArray = JSON.parse(localStorage.getItem('images')); // restore the data from the local storage
        // generateResults()
    }
}
// execute code
randomImage(); // add first 3 images 
for (var i = 0; i < imagesContainer.length; i++) {
    imagesContainer[i].addEventListener('click', trackClick)
}

resultButton.addEventListener('click', generateResults) // generate result in list

checkAndRestore()
