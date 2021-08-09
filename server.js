const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get("/numberOfImages", function(req, res){
  const dir = 'public/Res/Large';
  const numberOfImages = fs.readdirSync(dir).length - 1;
  res.json(numberOfImages);
});

app.get("/fetchQuote", function(req, res){
let url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

function getQuote(url) {
  axios.get(url)
  .then(function (response) {
    validateQuote(response.data);
  })
  .catch(function (error) {
    console.log('error from getQuote(): ' + error);
    getQuote(url)
  })
}

function validateQuote(response) {
  try {
    if (response === undefined || response.quoteText === undefined) {
      console.log('undefined response: ' + response);
      getQuote(url);
    }
    else if (response.quoteText.length < 10) {
    console.log('response length < 10: ' + response);
    getQuote(url);
      return;
    } else if (response.quoteText.length + response.quoteAuthor.length > 240) {  //it was 137 before
      console.log('response length >240');
      getQuote(url);
        return;
    } else if (response.quoteAuthor === 'Donald Trump') {
      getQuote(url);
        return;
    } else {
        let regex = new RegExp(/[^A-zÀ-ÿ'\"!?;:.,—-\s]/);
        if (regex.test(response.quoteText) == false && regex.test(response.quoteAuthor) == false) {
        try {
          res.send(response);
        } catch (error) {
          getQuote(url);
        }
        } else {
          console.log('response regex not match: ' + response.quoteText + response.quoteAuthor);
          getQuote(url);
        }
    }
  } catch (error) {
    console.log('error from validateQuote(): ' + error);
    getQuote(url)
  }
}

getQuote(url);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
