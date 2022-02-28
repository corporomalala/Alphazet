/*===
Into Binary (https://alphazet.corporomalala.com)
&copy Coryright 2022 Into Binary. All rights reserved.
Written for -- www.alphazet.corporomalala.com
===*/

/*=== LIBRARIES ===*/
/*=== END LIBRARIES ===*/

/*=== CUSTOM ===*/
/*== [Alphazet @ Corporo Malala] ==*/
/** DECORATION **/
var textOffset = 0,
  textSpeed = 0.01;

function animaterectangular() {
  requestAnimationFrame(animaterectangular);
  
  
	svgTextPathFula.setAttributeNS(null, "startOffset", textOffset + "%");
	svgTextPathAfrikaans.setAttributeNS(null, "startOffset", textOffset + "%");
	svgTextPathLingala.setAttributeNS(null, "startOffset", textOffset + "%");
  if (textOffset >= 50) {
    textOffset = 0;
  }
  textOffset += 0.01;
}

// Init Animation
animaterectangular();

/** END DECORATION **/

var defaultGameLanguage = document.querySelector(".js-body").getAttribute("gameLanguageAttribute"),
	globalGameLanguage = "";

setup()

function setup() {
	getGameLanguage();
	focusContainer();
}

function focusContainer() {
	var testTag = document.querySelector(".website");

	testTag.focus();
}
function setGameLanguage(lang) {
	const gameLanguageCookie = "gameLanguage=" + lang;
	document.cookie = gameLanguageCookie + ";path=/";

	document.querySelector(".js-body").setAttribute("gameLanguageAttribute", getGameLanguage());
	getGameLanguage();
	
	reinitGame();
}

function getGameLanguage() {
	let decodedCookie = decodeURIComponent(document.cookie);
	globalGameLanguage = decodedCookie.replace("gameLanguage=","");
	if(globalGameLanguage == "" || globalGameLanguage == null) {
		globalGameLanguage = defaultGameLanguage;
	}
	return globalGameLanguage;
}

/*== [GAME: HANGMAN -- Alphazet @ Corporo Malala] ==*/
      let game = null;
      const MAX_FAULTS = 9;
	  
	  
const wordList_fula = [
	["A fami?", ""],
	["Achu haké hal cess, mi famili", ""],
	["Jam waali", ""],
	["Haa gonngol", ""],
	["No mbadda?", ""],
	["Mi anda", ""],
	["Mi fami", ""],
	["Mi wayri yiide ma", ""],
	["Holto njeyadha?", ""],
	["Jaraama", ""],
	["Laawol bhural", ""],
	["Nianlen e jam", ""],
	["Yoo geno reene", ""],
];
	  
const wordList_afrikaans = [
	["Aangenaame kennis", ""],
	["Asseblief", ""],
	["Dankie", ""],
	["Ek is jammer", ""],
	["Ek weet nie", ""],
	["Goed dankie, en met jou?", ""],
	["Goeie more", ""],
	["Goeie middag", ""],
	["Goeie nag", ""],
	["Ja", ""],
	["Jy is welkom", ""],
	["Hallo", ""],
	["Hoe laat is dit?", ""],
	["Hoe gaan dit met jou?", ""],
	["Hoeveel kos dit?", ""],
	["Nee", ""],
	["Sien jou later", ""],
	["Totsiens", ""],
	["Verskoon my", ""],
	["Waar is die badkamer", ""],
	["Wat is jou naam", ""],
	["Wag 'n bietjie", ""],
];
	  
const wordList_lingala = [
	["Mbote", "Hello"],
	["Boni yo, ndeko?", "How are you, brother/sister?"],
	["Kotuna ye te", "Do not ask him/her"],
	["Kombo na yo nini?", "What is your name?"],
	["Lisapo onge!", "Once upon a time!"],
	["Matondi mingi", "Thank you very much"],
	["Mbotama elamu", "Happy birthday"],
	["Mbongo eza wapi?", "Where is the money?"],
	["Nakomi na tembe", "I have doubts"],
	["Tosenga ye bolimbisi", "Let's apologize to him/her"],
	["Nayebi te", "I don't know"],
	["Nayebi yo te", "I do not know him/her"],
	["Naza na pongi te", "I am not sleepy"],
	["Nazali malamo", "I am fine"],
	["Sambelelaka ba ndeko na yo", "Pray for your family"],
	["Sango nini?", "What are the news?"],
	["Soki olingi", "If you want"],
	["Tomonani sima", "See you later"],
	["Zela mukie", "Wait a bit"],
];
	  

      function reinitGame() {
        game = initNewGame();
      }

      function hideModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
      }

      function showModal(content) {
        const modal = document.getElementById('modal');
        const modalContent = modal.querySelector('.modal__content');
        modalContent.innerHTML = content;
        setTimeout(() => (modal.style.display = ''), 300);
      }

      function gameEndHandler() {
        const content = game.hasWon()
          ? `Great, you are a winner! <br /><br />You found: <em style='text-decoration: underline;'>"${game.getWord()}"</em>. You seem to know the language; can you add new words to our glossary? Swipe right!`
          : `Oh no, dear! <br /><br />We were looking for: <em style='text-decoration: underline;'>"${game.getWord()}"</em>. It means: <em style='text-decoration: underline;'>"${game.getTranslatedWord()}"</em>.`;
        showModal(content);
      }

      function initNewGame() {
//        const hangman = new Hangman(getRandomWord(), gameEndHandler);
		const hangman = new Hangman(getRandomWord(), getTranslationOfChosenWord(), gameEndHandler);
        hideModal();
        drawGame(hangman);
		/* Test Functions. Keep in comments */
//		drawHangman(9);
//        showModal("Oh no, dear! <br />We were looking for: <br /><em style='text-decoration: underline;'>'Game Game'</em>.");
        return hangman;
      }

var chosenWordTranslated = "";
function getRandomWord() { 
	if(globalGameLanguage == "fula") {
		const index = Math.floor(Math.random() * wordList_fula.length);
		
		chosenWordTranslated = wordList_fula[index][1];
		
		return wordList_fula[index][0];
	}
	if(globalGameLanguage == "afrikaans") {
		const index = Math.floor(Math.random() * wordList_afrikaans.length);
		
		chosenWordTranslated = wordList_afrikaans[index][1];
		
		return wordList_afrikaans[index][0];
	}
	if(globalGameLanguage == "lingala") {
		const index = Math.floor(Math.random() * wordList_lingala.length);
		
		chosenWordTranslated = wordList_lingala[index][1];
		
		return wordList_lingala[index][0];
	}
}
function getTranslationOfChosenWord() {
	return chosenWordTranslated;
}

      function guessLetter(letter) {
        if (game && !game.isFinished()) {
          game.pickedLetter(letter);
          drawGame(game);
        }
      }

      function drawHangman(faults) {
        const parts = [
          '<div class="drawing__part drawing__part-1_pillar"></div>',
          '<div class="drawing__part drawing__part-2_branch"></div>',
          '<div class="drawing__part drawing__part-3_cord"></div>',
          '<div class="drawing__part drawing__part-4_head"></div>',
          '<div class="drawing__part drawing__part-5_body"></div>',
          `<div class="drawing__part drawing__part-6_right-hand"></div>`,
          `<div class="drawing__part drawing__part-6_left-hand"></div>`,
          `<div class="drawing__part drawing__part-7_right-leg"></div>`,
          `<div class="drawing__part drawing__part-7_left-leg"></div>`,
        ];

        const visibleParts = parts.splice(0, faults);
        const parent = document.querySelector('#drawing .drawing__container');
        parent.innerHTML = visibleParts.join('');
      }

      function drawResult(faults) {
        const texts = [
          /* 0 */ "Let's find the word(s)!",
          /* 1 */ "That's alright! Don't sweat it!",
          /* 2 */ "Don't worry, everything is fine.",
          /* 3 */ "Don't worry, everything is fine.",
          /* 4 */ "Don't worry, everything is fine.",
          /* 5 */ 'Ooh... be careful!',
          /* 6 */ "That's not good!",
          /* 7 */ 'OMG!!!',
          /* 8 */ 'HEEEELP!',
          /* 9 */ 'R.I.P.',
        ];

        const container = document.querySelector('#drawing .drawing__message');
        container.innerText = texts[faults];
      }

      function drawKeyboard(foundLetters, faultyLetters) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const keys = letters.map(letter => {
          const found = foundLetters.includes(letter);
          const faulty = faultyLetters.includes(letter);
          return { letter, found, faulty };
        });

        const parent = document.getElementById('keyboard');
        parent.innerHTML = '';
        keys.map(key => {
          const el = document.createElement('button');
          el.innerText = key.letter;
          el.disabled = key.found || key.faulty;
          el.className = 'keyboard__key';
          key.found && el.classList.add('keyboard__key--found');
          key.faulty && el.classList.add('keyboard__key--is-faulty');

          el.onclick = () => {
            guessLetter(key.letter);
          };

          parent.appendChild(el);
        });
      }

      function drawCharList(chars) {
        const parent = document.getElementById('chars');
        parent.innerHTML = '';

        chars.forEach(char => {
          const charEl = document.createElement('div');
          charEl.className = `chars__char ${char.isLetter ? 'chars__char--is-letter' : ''}`;
          charEl.innerText = char.show ? char.value : '';
          parent.appendChild(charEl);
        });
      }

      function drawGame(hangman) {
        drawResult(hangman.getNumberOfFaults());
        drawHangman(hangman.getNumberOfFaults());
        drawCharList(hangman.getCharList());
        drawKeyboard(hangman.getFoundLetters(), hangman.getFaultyLetters());
      }

      function listenForInputs(callback) {
        window.addEventListener('keydown', event => {
			const excludedKeyCodes = [8, 9, 13, 16, 17, 18, 19, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46];
			if(excludedKeyCodes.includes(event.keyCode)) {}
			else {
          const pressedOtherKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey; // Shift key is allowed
          const key = event.key.toUpperCase();
          const isLetter = key.match(/[A-Za-z]/g);
          !pressedOtherKey && isLetter && callback(key);
			}
        });
      }

      class Hangman {
        constructor(word, translatedWord, onEndGame) {
          this.word = word.toUpperCase();
		  this.translatedWord = translatedWord;
          this.pickedLetters = [];
          this.faults = 0;
          this.onEndGame = onEndGame;
        }

        getWord() {
          return this.word;
        }
		getTranslatedWord() {
			return this.translatedWord;
		}

        getCharsOfWord() {
          return this.word.split('');
        }

        getLettersOfWord() {
          const chars = this.getCharsOfWord();
          return chars
            .filter(char => char.match(/[A-Z]/))
            .filter((char, index, list) => list.indexOf(char) === index);
        }

        getNumberOfFaults() {
          return this.faults;
        }

        getFaultyLetters() {
          return this.pickedLetters.filter(letter => {
            return !this.word.includes(letter);
          });
        }

        getFoundLetters() {
          return this.pickedLetters.filter(letter => {
            return this.word.includes(letter);
          });
        }

        getCharList() {
          const chars = this.getCharsOfWord();
          return chars.map(char => {
            const isLetter = char.match(/[A-z]/);
            const pickedLetterAlready = this.pickedLetters.includes(char);
            const show = pickedLetterAlready || !isLetter;
            return { isLetter, show, value: char };
          });
        }

        pickedLetter(letter) {
          const alreadyPicked = this.pickedLetters.includes(letter);
          const contains = this.word.includes(letter);

          if (alreadyPicked) {
            console.log('Uuh, you already picked that letter');
            return;
          }

          this.pickedLetters.push(letter);

          if (contains) {
            console.log('Yeah, you are great!');
          } else {
            console.log('Oh no, try it again');
            this.pickedLetters.push(letter);
            this.faults += 1;
          }

          if (this.isFinished()) {
            this.onEndGame();
          }
        }

        hasWon() {
          const letters = this.getLettersOfWord();
          return (
            !this.hasLost() &&
            letters.every(char => {
              return this.pickedLetters.includes(char);
            })
          );
        }

        hasLost() {
          return this.faults >= MAX_FAULTS;
        }

        isFinished() {
          return this.hasLost() || this.hasWon();
        }
      }

      game = initNewGame();
      listenForInputs(letter => {
        guessLetter(letter);
      });
/*=== END CUSTOM ===*/