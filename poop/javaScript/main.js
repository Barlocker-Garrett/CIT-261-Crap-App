var httpRequest;

// This NumContent object is used for the splicing, this acts "like" an ENUM
var NumContent;

function loadContent() {
    makeRequest('content.json');
}

function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.open('GET', url);
    httpRequest.onreadystatechange = alertContents;
    httpRequest.send();
}

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            Content = JSON.parse(httpRequest.responseText);
            if (localStorage.getItem("Content") !== null ||
                    localStorage.getItem("Jokes") !== null ||
                    localStorage.getItem("Facts") !== null) {
                loadObjectsFromLocal();
            }
        }
        if (localStorage.getItem("Content") === null) {
            localStorage.setItem("Content", JSON.stringify(Content));
            loadObjectsFromLocal();
        }
    }
}

function loadObjectsFromLocal() {
    NumContent = Object.freeze({"total": JSON.parse(localStorage.Content).length,
        "jokes": 9,
        "facts": 20});
    
    if (Content.length < 1) {
        Content.splice(0, NumContent.total);
        Content = JSON.parse(localStorage.Content);
    }
    if (localStorage.getItem("Jokes") !== null && document.getElementById('Topic').title === 'Jokes'){
            if (Content.length === (NumContent.total))
            {
                Content.splice(NumContent.jokes, NumContent.total);
                localStorage.setItem("Jokes", JSON.stringify(Content));
            }
        Content = JSON.parse(localStorage.Jokes);
    }
    else if (document.getElementById('Topic').title === 'Jokes') {
        Content.splice(NumContent.jokes, NumContent.total);
        localStorage.setItem("Jokes", JSON.stringify(Content));
    } 
    
    if (localStorage.getItem("Facts") !== null && document.getElementById('Topic').title === 'Facts'){
            if (Content.length === (NumContent.total))
            {
                Content.splice(0, NumContent.jokes);
                localStorage.setItem("Facts", JSON.stringify(Content));
            }
        Content = JSON.parse(localStorage.Facts);
    }
    if (document.getElementById('Topic').title === 'Facts' && Content.length === NumContent.total) {
        Content.splice(0, NumContent.jokes);
        localStorage.setItem("Facts", JSON.stringify(Content));
    }
    selectContent();
}

function selectContent() {
    var index;

    index = Math.floor(Math.random() * Content.length);

    if (document.getElementById('Topic').title === 'Jokes') {
        document.getElementById("text").innerHTML = Content[index].joke;
        document.getElementById("pun").innerHTML = Content[index].pun;
    } else if (document.getElementById('Topic').title === 'Facts') {
        document.getElementById("text").innerHTML = Content[index].fact;
    }

    Content.splice(index, 1);
    if (document.getElementById('Topic').title === 'Jokes') {
        localStorage.removeItem("Jokes");
        localStorage.setItem("Jokes", JSON.stringify(Content));
    } else if (document.getElementById('Topic').title === 'Facts') {
        localStorage.removeItem("Facts");
        localStorage.setItem("Facts", JSON.stringify(Content));
    }

    console.log(Content); //THIS SHOWS IN THE CONSOLE THAT IT WORKS
}

function changeToFacts() {
    document.getElementById('Topic').title = 'Facts';
    loadObjectsFromLocal(true);
}

function changeToJokes() {
    document.getElementById('Topic').title = 'Jokes';
    loadObjectsFromLocal(true);
}

//show card has been flipped

var cards = document.querySelectorAll(".card.effect__click");
var len;
for (var i = 0, len = cards.length; i < len; i++) {
    var card = cards[i];
    clickListener(card);
}

function clickListener(card) {
    card.addEventListener("click", function () {
        var c = this.classList;
        if (c.contains("flipped") === true) {
            c.remove("flipped");
            loadObjectsFromLocal();
        } else {
            c.add("flipped");
        }
    });
}