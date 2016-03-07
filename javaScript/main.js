"use strict";
        var httpRequest;
        var Jokes = JSON.parse(localStorage.Jokes || null) || {};

        function loadJSON() {
            makeRequest('jokes.json');
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
            Jokes = JSON.parse(localStorage.Jokes);
            console.log(Jokes);
            loadDataFromLocal();
        }

        function loadDataFromLocal() {
            var text;
            var pun;
            var length = Jokes.length;
            var index;
            var done = false;
            var reset = true;
            while (!done) {
                index = Math.floor(Math.random() * length);
                if (Jokes[index].shown == 0 && Jokes[index].alive == 0) {
                    text = Jokes[index].text;
                    pun = Jokes[index].pun;
                    done = true;
                    reset = false;
                } else {
                    for (var j = 0; j < length; j++) {
                        if (Jokes[j].shown === 0) {
                            reset = false;
                        }
                    }
                }
                if (reset) {
                    for (var i = 0; i < length; i++) {
                        Jokes[i].shown = 0;
                        Jokes[i].alive = 0;
                    }
                }
            }
            //}
            document.getElementById("text").innerHTML = text;
            document.getElementById("pun").innerHTML = pun;
            alterLocalStorageData(index, length);
        }

        function alterLocalStorageData(index) {
            Jokes[index].alive = '1';
            Jokes[index].shown = '1';
            localStorage.Jokes = JSON.stringify(Jokes);
            console.log(Jokes);
        }