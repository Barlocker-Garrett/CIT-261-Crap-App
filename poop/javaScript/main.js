var httpRequest;

// This NumContent object is used for the splicing, this acts "like" an ENUM
var NumContent;
var Content = [];
              
function loadContent() {
    makeRequest('content.json');
}

function makeRequest(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents();
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
    NumContent = Object.freeze({"total":JSON.parse(localStorage.Content).length, 
                                "jokes":16, 
                                "facts":20});
                            
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
        document.getElementById("pun").innerHTML = "";
    }
    
    Content.splice(index, 1);
    console.log(Content); //THIS SHOWS IN THE CONSOLE THAT IT WORKS
}

function changeToMain () {
	document.getElementById('card').style.display='none';
	document.getElementById('home').style.display='initial';
}

function changeToFacts() {
    document.getElementById('Topic').title = 'Facts';
    document.getElementById('title').innerHTML = "POOP FACTS";
    document.getElementById('card').style.display = "initial";
    document.getElementById('home').style.display='none';
    loadObjectsFromLocal(true);
}

function changeToJokes() {
    document.getElementById('Topic').title = 'Jokes';
    document.getElementById('title').innerHTML = "POOP JOKES";
    document.getElementById('card').style.display = "initial";
    document.getElementById('home').style.display='none';
    loadObjectsFromLocal(true);
}

//show card has been flipped

var cards = document.querySelectorAll(".card.effect__click");
var len;
for ( var i = 0, len = cards.length; i < len; i++) {
	var card = cards[i];
	clickListener(card);
}
	
function clickListener(card) {
	card.addEventListener("click", function() {
		var c = this.classList;
		if (c.contains("flipped") === true) {
			c.remove("flipped");
			loadObjectsFromLocal();
		}
		else {
			 c.add("flipped");
		}
	});
}
