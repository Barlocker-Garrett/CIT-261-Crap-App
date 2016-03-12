var httpRequest;
var Jokes = JSON.parse(localStorage.Jokes || null) || {};
var Facts = JSON.parse(localStorage.Facts || null) || {};

function jokesOrFacts() {
    console.log(document.getElementById('Topic').title);
    if (document.getElementById('Topic').title === "Jokes"){
        makeRequest('jokes.json');
    }
    else if (document.getElementById('Topic').title === "Facts") {
        makeRequest('facts.json');
    }
}

function makeRequest(url) {
    httpRequest = new XMLHttpRequest();
    
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            Jokes = JSON.parse(httpRequest.responseText);
        }
        if (localStorage.getItem("Jokes") === null) {
            localStorage.setItem("Jokes", JSON.stringify(Jokes));
            loadLocalStorage();
        }
    }
}

function loadLocalStorage() {
    if (Jokes.length < 1) {
        Jokes = JSON.parse(localStorage.Jokes);
    }
    loadDataFromObject();
}

function loadDataFromObject() {
    var index;
    index = Math.floor(Math.random() * Jokes.length);
    
    document.getElementById("text").innerHTML = Jokes[index].text;
    document.getElementById("pun").innerHTML = Jokes[index].pun;
    Jokes.splice(index, 1);
    
    console.log(JSON.parse(localStorage.Jokes)); // THIS LINE
    console.log(Jokes);                          // AND THIS LINE ARE TO SHOW THAT IT WORKS
}