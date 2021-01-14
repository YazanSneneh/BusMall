'use strict';
var leftProduct = document.getElementById('left-image');
var midProduct = document.getElementById('mid-image');
var rightProduct = document.getElementById('right-image');
var resultButton = document.getElementById('result-btn');
var container = document.getElementById('images-container')
var resultContainer = document.getElementById('result-container');
var barChart = document.getElementById('chart-canvas').getContext('2d');

var productArray = []; // objects list
var rounds = 25;   // user attempts times

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> model declrations 
function Product(name, path) {
    this.name = name;
    this.path = 'images/' + path;
    this.counter = 0;
    this.imageAppearance = 0;
    productArray.push(this);

}
//  products functions
function isClicked(product) {
    product.counter++;
    console.log(` ${product.name} click times : ${product.counter}`)
    return product.counter
};
function timesShown(product) {
    product.imageAppearance++;
    // console.log(` ${product.name} appearance times : ${product.imageAppearance}`)
    return product.imageAppearance;

};

// products
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
function pickProducts() {
    var left = Math.floor(Math.random() * productArray.length);
    var mid = Math.floor(Math.random() * productArray.length);
    var right = Math.floor(Math.random() * productArray.length);
    displayProducts(left, mid, right)
}
// add images to html
function displayProducts(left, mid, right) {
    leftProduct.setAttribute('src', productArray[left].path);
    timesShown(productArray[left])

    midProduct.setAttribute('src', productArray[mid].path)
    timesShown(productArray[mid])

    rightProduct.setAttribute('src', productArray[right].path)
    timesShown(productArray[right])
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> event functions
function trackUserPicks(event) {
    rounds--;    // user attempts
    if (rounds > 0) {
        var userChoice = event.target
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
    console.log(rounds)
}

function displayResultList() {  // display a report for each item
    var ul = document.createElement('ul');
    resultContainer.append(ul);
    for (var i = 0; i < productArray.length; i++) {
        var li = document.createElement('li');
        li.textContent = productArray[i].name + ' had ' + productArray[i].counter + ' votes, and was seen ' + productArray[i].imageAppearance + ' times.';
        ul.append(li);
    }
}

function CreateChart() {
    var productsLabel = []
    var productsClicked = []
    var productsSeen = []
    for (var i = 0; i < productArray.length; i++) {
        productsLabel.push(productArray[i].name)
        productsClicked.push(productArray[i].counter);
        productsSeen.push(productArray[i].imageAppearance);
    }

    var chart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: productsLabel,
            datasets: [{
                label: '# Clicked',
                data: productsClicked,
                backgroundColor: '#ff884b',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }, {
                label: '# Seen',
                data: productsSeen,
                backgroundColor: '#ff577f',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> executable code

container.addEventListener('click', trackUserPicks)  // listen to images clicked
resultButton.addEventListener('click', displayResultList) // listen to show results button
pickProducts()   // display images