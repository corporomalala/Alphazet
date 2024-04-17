


			<section class="game-body game-HANGMAN">
				<div id="hangman">
					<div class="drawing" id="drawing">
						<p class="drawing__message"></p>
						<div class="drawing__container">
						</div>
						
						<button class="game-body_score js-score" data-score="0" data-highscore="no"><span class="game-body_score-icon">Score</span></button>
						<button class="game-body_refresh js-refresh"><span class="game-body_refresh-icon">Refresh</span></button>
					</div>
					<div id="result"></div>
				</div>
				<div id="board">
					<div id="chars" class="chars"></div>
					<div id="keyboard" class="keyboard"></div>
				</div>
				
				<div class="game-body_leaderboard js-leaderboard is-hidden" data-mode="view"><div class="game-body_leaderboard-wrap">
					<div class="game-body_leaderboard-header"><div class="game-body_leaderboard-header-wrap">
						<span class="js-leaderboard-language"></span> Leaderboard
					</div></div>
					
					<div class="game-body_leaderboard-content"><div class="game-body_leaderboard-content-wrap">
						<div class="game-body_leaderboard-content_view">
							<div class="game-body_leaderboard-content_view-top js-topscores"></div>
							
							<div class="game-body_leaderboard-content_view-high js-highscores"></div>
						</div>
						
						<div class="game-body_leaderboard-content_save">
							<div><p>You scored <span class="js-totalScore"></span> points! <br />Congratulations! </p><br /><br />You belong on the leaderboard, dear! Save your name and see how you ranked!</div>
							<br /><br />
						
							<form class="js-leaderboard-form">
								Enter name:
								<input type="text" class="u-input js-playerName" minlength="3" maxlength="10" list="playerNames" />
								
								<datalist id="playerNames" class="js-playerNames">
								</datalist>
							</form>
						</div>
					</div></div>
				
					<div class="game-body_leaderboard-menu"><div class="game-body_leaderboard-menu-wrap">
						<button class="game-body_leaderboard-menu-button js-save">Save</button>
						<button class="game-body_leaderboard-menu-button js-cancel">Cancel</button>
						
						<button class="game-body_leaderboard-menu-button js-close">Close</button>
					</div></div>
				</div></div>
			</section>
			
				<div id="modal" class="modal" style="display: none">
					<div class="modal__background"></div>
					<div class="modal__main">
						<div class="modal__content"></div>
						<div class="modal__actions">
						<!--
							<button class="js-open-highscore">Save Highscore</button>
							-->
							<button class="js-new-game">Play New Game</button>
						</div>
					</div>
				</div>