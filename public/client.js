function wellFadeOut() {
  inspireButton.disabled = true;
  for (let i = 0; i < links.length; i++) {
    links[i].classList.add('disable-links');
  }
  well.style.opacity = 0;
}

function fadeInfadeOutBackgrounds() {
    if (background.style.opacity == 1) {
    background.style.opacity = 0;
    background2.style.opacity = 1;
    } else {
    background.style.opacity = 1;
    background2.style.opacity = 0;
    }
  }

function changeBackground() {
  let backgroundWidth = window.innerWidth;
  let backgroundHeight = window.innerHeight;
  let imageSize;
  switch(true) {
    case (backgroundWidth > 1600):
        imageSize = 'Large';
        break;
    case (backgroundWidth > 1280 && backgroundWidth < 1601 && backgroundHeight > backgroundWidth):
        imageSize = 'Large';
        break;
    case (backgroundWidth > 1280 && backgroundWidth < 1601):
        imageSize = 'MediumLarge';
        break;
    case (backgroundWidth > 960 && backgroundWidth < 1281 && backgroundHeight > backgroundWidth):
        imageSize = 'MediumLarge';
        break;
    case (backgroundWidth > 960 && backgroundWidth < 1281):
        imageSize = 'Medium';
        break;
    case (backgroundWidth > 640 && backgroundWidth < 961 && backgroundHeight > backgroundWidth):
        imageSize = 'Medium';
        break;
    case (backgroundWidth > 640 && backgroundWidth < 961):
        imageSize = 'MediumSmall';
        break;
    case (backgroundWidth <= 640 && backgroundHeight > backgroundWidth):
        imageSize = 'MediumSmall';
        break;
    default:
        imageSize = 'Small';
  }
  let randomNumber = Math.floor(Math.random() * (arrayOfImages.length));
  const backgroundImage = 'url(Res/' + imageSize + '/' + arrayOfImages[randomNumber] + '.jpg)';
  arrayOfImages.splice(randomNumber, 1);
  if (arrayOfImages.length < 1) {arrayOfImages = Array(numberOfImages).fill().map((e,i)=>i+1)};
  if (background.style.opacity == 0) {  
    background.style.backgroundImage = backgroundImage;
  } else {
    background2.style.backgroundImage = backgroundImage;
  }
}

function fetchQuote() {
quoteObject.quote = '';
quoteObject.author = '';
fetch('/fetchQuote')
.then(response => response.json())
.then(data => {
  parseQuote(data);
});
}

function parseQuote(response) {
  if (!response.quoteText) {
    fetchQuote();
  } else if (window.innerWidth <= 640 && response.quoteText.length > 100) {
    fetchQuote();
  } else {
    quoteObject.quote = response.quoteText;
  if (response.quoteAuthor) {
    quoteObject.author = response.quoteAuthor;
  }
 }
}

function wellFadeIn() {
  if (well.style.opacity == 0 && quoteObject.quote.length > 0) {
    quote.innerHTML = quoteObject.quote;
    if (quoteObject.author.length > 0) {
        author.innerHTML = '- ' + quoteObject.author;
    }
    well.style.opacity = 1;
    clearTimeout(checkIfNewQuoteFound);
  }
}
