const opening_message = document.getElementById('opening_message');
const background = document.getElementById('background');
const background2 = document.getElementById('background2');
const body = document.getElementsByTagName("body")[0];
const inspireButton = document.getElementById('inspireButton');
const links = document.querySelectorAll('li');
const postOnTwitter = document.getElementsByClassName('twitter')[0];
const postOnFacebook = document.getElementsByClassName('facebook')[0];
const well = document.getElementById('main_container');
let quoteObject = {quote: '', author: ''};
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let numberOfImages;
let arrayOfImages;

fetch('/numberOfImages')
.then(response => response.json())
.then(responseNumberOfImages => {
  numberOfImages = responseNumberOfImages - 1;
  return arrayOfImages = Array(numberOfImages).fill().map((e,i)=>i+1);
})
.then(() => {
['webkitTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'transitionEnd'].forEach(function(e) {
  opening_message.addEventListener(e, () => {
    if (opening_message.style.opacity == 1) {
      opening_message.style.opacity = 0;
    } else {
      opening_message.style.display = 'none';
      fadeInfadeOutBackgrounds();
    }
  });
  background.addEventListener(e, () => {
    changeBackground();
    checkIfNewQuoteFound = setInterval(wellFadeIn, 500);
  });
  well.addEventListener(e, () => {
    if(well.style.opacity == 0) {
      fadeInfadeOutBackgrounds();
    } else {
      fetchQuote()
      inspireButton.disabled = false;
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('disable-links');
      }
    }
  });
});

inspireButton.addEventListener('click', wellFadeOut);

postOnTwitter.addEventListener('click', function(event) {
  let tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote.innerHTML) + " " + encodeURIComponent(author.innerHTML);
  window.open(tweetUrl);
});

postOnFacebook.addEventListener('click', function(event) {
  let facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=example.com&quote=' + encodeURIComponent(quote.innerHTML) + " " + encodeURIComponent(author.innerHTML);
  window.open(facebookUrl);
});

//Solution for sticky hover on mobile devices
    ;(function(){
        var isTouch = false //var to indicate current input type (is touch versus no touch) 
        var isTouchTimer
        var curRootClass = '' //var indicating current document root class ("can-touch" or "")

        function addtouchclass(e){
            clearTimeout(isTouchTimer)
            isTouch = true
            if (curRootClass != 'can-touch'){ //add "can-touch' class if it's not already present
                curRootClass = 'can-touch'
                document.documentElement.classList.add(curRootClass)
            }
            isTouchTimer = setTimeout(function(){isTouch = false}, 1000) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
        }

        function removetouchclass(e){
            if (!isTouch && curRootClass == 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present
                isTouch = false
                curRootClass = ''
                document.documentElement.classList.remove('can-touch')
            }
        }

        document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
        document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
    })();

wellFadeOut();
changeBackground();
fetchQuote();
opening_message.style.opacity = 1;
});
