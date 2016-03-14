var httpRequest;

// This NumContent object is used for the splicing, this acts "like" an ENUM
var NumContent;
              
function loadContent() {
    makeRequest('content.json');
    NumContent = Object.freeze({"total":JSON.parse(localStorage.Content).length, 
                  "jokes":9, 
                  "facts":20});
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
            Content = JSON.parse(httpRequest.responseText);
            if (localStorage.getItem("Content") !== null) {
                loadObjectsFromLocal();
            }
        }
        if (localStorage.getItem("Content") === null) {
            localStorage.setItem("Content", JSON.stringify(Content));
            loadObjectsFromLocal();
        }
    }
}

function loadObjectsFromLocal(reset) {
    if (Content.length < 1 || reset === true) {
        Content.splice(0,NumContent.total);
        Content = JSON.parse(localStorage.Content);
    }
    if (document.getElementById('Topic').title === 'Jokes') {
        Content.splice(NumContent.jokes, NumContent.total);
    // THE 29 IN THE ELSE IF IS THE TOTAL NUMBER OF JOKES AND FACTS
    } else if (document.getElementById('Topic').title === 'Facts' && Content.length === NumContent.total) {
        Content.splice(0, NumContent.jokes);
    }
    selectContent();
}

function selectContent() {
    var index;

    index = Math.floor(Math.random() * Content.length);
    
    if(document.getElementById('Topic').title === 'Jokes') {
        document.getElementById("text").innerHTML = Content[index].joke;
        document.getElementById("pun").innerHTML = Content[index].pun;
    }
    else if (document.getElementById('Topic').title === 'Facts') {
        document.getElementById("text").innerHTML = Content[index].fact;
    }
    
    Content.splice(index, 1);
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