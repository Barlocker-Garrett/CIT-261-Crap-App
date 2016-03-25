var httpRequest;

// This NumContent object is used for the splicing, this acts "like" an ENUM
var NumContent;
var Content = []; // I think this is unneeded? -Garrett
              
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
            if (localStorage.getItem("Content") !== null &&
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
        "jokes": 50,
        "facts": 52});
    
    // IF WE NEED TO RESET THE CONTENT
    if (Content.length < 1) {  
        Content.splice(0, NumContent.total);
        Content = JSON.parse(localStorage.Content);
    }
    
    // IF THE CONTENT NEED TO BE LOADED FROM JOKES KEY
    if (localStorage.getItem("Jokes") !== null && document.getElementById('Topic').title === 'Jokes'){
            if (Content.length === (NumContent.total)){
                Content.splice(NumContent.jokes, NumContent.total);
                var Jokes = JSON.parse(localStorage.Jokes);
                // IF WE NEED TO RESET DON'T SAVE JOKES KEY INTO CONTENT
                if (Jokes.length !== 0){
                    Content = JSON.parse(localStorage.Jokes);
                }
                localStorage.setItem("Jokes", JSON.stringify(Content));
            }
            Content = JSON.parse(localStorage.Jokes);
    } // THE JOKES KEY NEEDS TO SPLICED INTO LOCAL STORAGE FROM CONTENT KEY
    else if (document.getElementById('Topic').title === 'Jokes') {
        Content.splice(NumContent.jokes, NumContent.total);
        localStorage.setItem("Jokes", JSON.stringify(Content));
    }
    
    
    // IF THE CONTENT NEED TO BE LOADED FROM FACTS KEY
    if (localStorage.getItem("Facts") !== null && document.getElementById('Topic').title === 'Facts'){
            if (Content.length === (NumContent.total))
            {
                Content.splice(0, NumContent.jokes);
                localStorage.setItem("Facts", JSON.stringify(Content));
            }
        Content = JSON.parse(localStorage.Facts);
    } // THE FACTS KEY NEEDS TO SPLICED INTO LOCAL STORAGE FROM CONTENT KEY
    else if (document.getElementById('Topic').title === 'Facts') {
        Content = JSON.parse(localStorage.Content);
        Content.splice(0, NumContent.jokes);
        localStorage.setItem("Facts", JSON.stringify(Content));
    }
    selectContent();
}

function selectContent() {
    var index;
    var secondindex;
    var title = document.getElementById('Topic').title;

    index = Math.floor(Math.random() * Content.length);
    if (document.getElementById('Topic').title === 'Facts') {
    	if (index === (Content.length - 1)) {
    		secondindex = index - 1;
    	} else {
    		secondindex = index + 1;
    	}
	}
	
    if (document.getElementById('Topic').title === 'Jokes') {
        document.getElementById("text").innerHTML = Content[index].joke;
        document.getElementById("pun").innerHTML = Content[index].pun;
    } else if (document.getElementById('Topic').title === 'Facts') {
        document.getElementById("text").innerHTML = Content[index].fact;
        if (Content.length > 1) {
        	document.getElementById("pun").innerHTML = Content[secondindex].fact;
        } else if (Content.length === 1) {
        	document.getElementById("pun").innerHTML = "Click for next fact.";
        }
    }
	
	if (document.getElementById('Topic').title === 'Jokes') {
    	Content.splice(index, 1);
    } else if (document.getElementById('Topic').title === 'Facts') {
    	if (index === Content.length - 1) {
    	 	Content.splice(secondindex, 2);
    	} else if (index < Content.length - 1){
    		Content.splice(index, 2);
    	}
    }
    
    if (document.getElementById('Topic').title === 'Jokes') {
        localStorage.removeItem("Jokes");
        localStorage.setItem("Jokes", JSON.stringify(Content));
    } else if (document.getElementById('Topic').title === 'Facts') {
        localStorage.removeItem("Facts");
        localStorage.setItem("Facts", JSON.stringify(Content));
    }

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
