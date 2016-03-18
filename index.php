<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include $_SERVER['DOCUMENT_ROOT'].'/modules/head.php'; ?>
    </head>
    
    <body ontouchstart="" onload="loadContent()">
        <section class="wrapper">
            <header>
                <?php include $_SERVER['DOCUMENT_ROOT'].'/modules/header.php'; ?> 
            </header>

            <section id="main">
            	<section id="home">
                	<section class="animated shake">
                    	<img src="/images/poop_logo.png" id="poop_logo">
                	</section>
                	<section class="page_title">
                		<h2><a href="/index.php">FUN WITH POOP</a><h2>
                	</section>
                </section>
                <section id="card">
                <div class="container">
                    <div id="Topic" title="Jokes" class="page_title"><h2 id="title">POOP JOKES</h2>
                    </div>
                    <div class="container">
                        <div class="card effect__click">
                            <div class="card__front">
                                <span class="card__text" id="text"></span>
                            </div>
                            <div class="card__back">
                                <span class="card__text" id="pun"></span>
                            </div>
                        </div>
                    </div>
                </div>
            	</section>
            </section>
            <footer>
                <?php include $_SERVER['DOCUMENT_ROOT'].'/modules/footer.php'; ?>
            </footer>
        </section>
    </body>
</html>