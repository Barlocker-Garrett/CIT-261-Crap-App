<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include $_SERVER['DOCUMENT_ROOT'].'/modules/head.php'; ?>
    </head>
    
    <body ontouchstart="" onload="loadContent()">

        <div class="container">
			
		<div class="st-container">
			
                <input type="radio" name="radio-set" checked="checked" id="st-control-1"/>
			<a href="#st-panel-1">Intro</a>
		<input type="radio" name="radio-set" id="st-control-2"/>
			<a href="#st-panel-2">Poop Jokes</a>
                <input type="radio" name="radio-set" id="st-control-3"/>
			<a href="#st-panel-3">Poop Facts</a>
				
                    <div class="st-scroll">
					
			<section class="st-panel" id="st-panel-1">
			<div class="st-deco" data-icon="O"></div>
                            <h2>Pass Time on the Throne</h2>
			<p>
                            <img id="logo"  src="/images/poop_logo.png">
                        </p>
			</section>
					
			<section class="st-panel st-color" id="st-panel-2">
			<div class="st-deco" data-icon="R"></div>
			<div class="Topic" title="Jokes" class="page_title">
                        <h2>Poop Jokes</h2>
						
                            <div id="card">
                            <div class="card-container">  
                                
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
                        </div>
                        </section>
					   
                    
                        <section class="st-panel" id="st-panel-3">
			<div class="st-deco" data-icon="Q"></div>
			<div class="Topic" title="Facts" class="page_title">
                        <h2>Poop Facts</h2>
						
                        <div>
                            <div class="card-container">  
                                
                                <div class="card effect__click">
                                    <div class="card__front">
                                        <span class="card__text" id="fact"></span>
                                    </div>
                                    <div class="card__back">
                                        <span class="card__text" id="factBack"></span>
                                    </div>
                                </div>
                                
                            </div>
                            </div>
                        </div>
			</section>

			</div><!-- // st-scroll -->
				
		</div><!-- // st-container -->
			
            </div><!-- // container -->
            <footer>
                <?php include $_SERVER['DOCUMENT_ROOT'].'/modules/footer.php'; ?>
            </footer>
    </body>
</html>
