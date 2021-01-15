'use strict';
var leftProduct = document.getElementById('left-image');
var midProduct = document.getElementById('mid-image');
var rightProduct = document.getElementById('right-image');
var resultButton = document.getElementById('result-btn');
var container = document.getElementById('images-container');
var resultContainer = document.getElementById('result-container');
var barChart = document.getElementById('chart-canvas').getContext('2d');
var productArray = []; // products list
var trackShownImages = [];
var rounds = 25;   // user attempts times

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> data model, propreties and methods 
function Product(name, path) {
    this.name = name;
    this.path = 'images/' + path;
    this.counter = 0;
    this.productAppearance = 0;
    productArray.push(this);
}
//  products functions
function isClicked(product) {
    product.counter++;
    setProductsToStorage()
    return product.counter
};
function timesShown(product) {
    product.productAppearance++;
    return product.productAppearance;
};
new Product('bag', 'bag.jpg');
new Product('banana', 'banana.jpg');
new Product('bathroom', 'bathroom.jpg');
new Product('boots', 'boots.jpg');
new Product('breakfast', 'breakfast.jpg');
new Product('bubblegum', 'bubblegum.jpg');
new Product('chair', 'chair.jpg');
new Product('cthulhu', 'cthulhu.jpg');
new Product('dog-duck', 'dog-duck.jpg');
new Product('dragon', 'dragon.jpg');
new Product('pen', 'pen.jpg');
new Product('pet-sweep', 'pet-sweep.jpg');
new Product('scissors', 'scissors.jpg');
new Product('shark', 'shark.jpg');
new Product('sweep', 'sweep.png');
new Product('unicorn', 'unicorn.jpg');
new Product('usb', 'usb.gif');
new Product('water-can', 'water-can.jpg');
new Product('wine-glass', 'wine-glass.jpg');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> functions declrations
function pickProducts() { // create randomly 3 products
    do {  // check if number appeared last round
        var left = Math.floor(Math.random() * productArray.length);
    } while (checkShownProducts(left));

    do { // check if left, right and mid uniqe and was not appeared last round
        var mid = Math.floor(Math.random() * productArray.length);
        var right = Math.floor(Math.random() * productArray.length);
    } while (left === mid || left === right || mid === right || checkShownProducts(mid) || checkShownProducts(right))

    // store data in array so later we ensure data dont appear next round 
    trackShownImages = [];
    trackShownImages = [left, mid, right];  // save numbers 
    displayProducts(left, mid, right);
}

function checkShownProducts(itemId) { // check if products appeard and don't pick it
    for (var i = 0; i < trackShownImages.length; i++) {
        if (itemId === trackShownImages[i]) {
            return true;
        }
    }
    return false;
}
// add products to html
function displayProducts(left, mid, right) {
    leftProduct.setAttribute('src', productArray[left].path);
    leftProduct.setAttribute('alt', productArray[left].name);
    timesShown(productArray[left])

    midProduct.setAttribute('src', productArray[mid].path)
    leftProduct.setAttribute('alt', productArray[mid].name);
    timesShown(productArray[mid])

    rightProduct.setAttribute('src', productArray[right].path)
    leftProduct.setAttribute('alt', productArray[right].name);
    timesShown(productArray[right])
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> event functions
function trackUserPicks(event) {
    rounds--;    // user attempts
    if (rounds > 0) {
        var userChoice = event.target;
        for (var i = 0; i < productArray.length; i++) {
            if (userChoice.getAttribute('src') === productArray[i].path) { // find image clicked, and count
                isClicked(productArray[i])
            }
        }
        pickProducts()  // display new different images
    } else {
        container.removeEventListener('click', trackUserPicks);
        CreateChart()
    }
}

function displayResultList() {  // display product List information
    var ul = document.createElement('ul');
    resultContainer.append(ul);
    for (var i = 0; i < productArray.length; i++) {
        var li = document.createElement('li');
        li.textContent = productArray[i].name + ' had ' + productArray[i].counter + ' votes, and was seen ' + productArray[i].productAppearance + ' times.';
        ul.append(li);
    }
}

function CreateChart() {  // present data visually using chart
    var productsLabel = [];
    var productsClicked = [];
    var productsSeen = [];
    for (var i = 0; i < productArray.length; i++) {
        productsLabel.push(productArray[i].name)
        productsClicked.push(productArray[i].counter);
        productsSeen.push(productArray[i].productAppearance);
    }

    var chart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: productsLabel,
            datasets: [{
                label: ' Clicked Products',
                data: productsClicked,
                backgroundColor: '#ff884b',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }, {
                label: 'Seen Products',
                data: productsSeen,
                backgroundColor: '#ff577f',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        }
    })
}
//  local Storage functions 
function setProductsToStorage() {
    localStorage.setItem('products', JSON.stringify(productArray));
}
function getProductsFromStorage() {
    if (localStorage.length > 0) {
        productArray = JSON.parse(localStorage.getItem('products'))
    }

}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> executable code
container.addEventListener('click', trackUserPicks)  // listen to images clicked
resultButton.addEventListener('click', displayResultList) // listen to show results button
pickProducts()   // display images
getProductsFromStorage();