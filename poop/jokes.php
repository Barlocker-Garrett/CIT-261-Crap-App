<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include $_SERVER['DOCUMENT_ROOT'].'/poop/modules/head.php'; ?>
    </head>
    
    <body ontouchstart="" onload="loadContent()">
        <section class="wrapper">
            <header>
                <?php include $_SERVER['DOCUMENT_ROOT'].'/poop/modules/header.php'; ?> 
            </header>

            <section id="main">
                <div class="container" id="facts">
                    <div id="Topic" title="Jokes" class="page_title"><h2><a href="/poop/index.php">POOP JOKES</a></h2>
                    </div>
                    <div>
                        <div class="container">
                        <p> Card Square with Fact or Joke goes here.</p>
                            <div class="section__content clearfix">
                        		<div class="card effect__click">
                            		<div class="card__front">
                                		<span class="card__text" id="text"></span>
                            		</div>
                            		<div class="card__back">
                                		<span class="card__text" id="pun"></span>
                            		</div>
                        		</div>
                    		</div>
                    		<button type="button" onclick="loadObjectsFromLocal()">Load new Content</button>
    						<button type="button" onclick="changeToJokes()">Change to Jokes</button>
    						<button type="button" onclick="changeToFacts()">Change to Facts</button>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                  <?php include $_SERVER['DOCUMENT_ROOT'].'/poop/modules/footer.php'; ?>
            </footer>
        </section>
    </body>
</html>