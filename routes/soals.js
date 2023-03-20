var express = require('express');
var router = express.Router();

let counterBenar = 0;
let counterSalah = 0;
let counterSekip = 0;
let indexSoal = 0;

const datas = require('../resources/questions/bahasa-1.json');
let data = datas[indexSoal];

// Convert char to index
// Example: A to 0, G to 6, and so on
function getIndex(char) {
  char = char.toUpperCase();
  const index = char.charCodeAt(0) - 'A'.charCodeAt(0);
  return index;
}

router.get("/", function (req, res, next) {
  const lengthDatas = datas.length;

  const soalText = data.soal['soal-text'];
  const choiceArray = data.soal.options;

  // console.log("Array PG: ", choiceArray);

  res.render("soals", { soalText, choiceArray, lengthDatas, counterBenar, counterSalah, counterSekip, indexSoal });
});

// post user answer
router.post("/evaluate", function (req, res, next) {
  const userAnswer = req.body.answer;
  const answer = getIndex(data.soal.jawaban);
  console.log("Jawaban User: ", userAnswer);
  console.log("Jawaban: ", answer);

  indexSoal += 1;
  data = datas[indexSoal];


    if (userAnswer == answer) {
      counterBenar += 1;
    }
    else if (! userAnswer) {
      counterSekip += 1;
    }
    else {
      counterSalah += 1;
    }

  res.redirect("/soals");
});

module.exports = router;

// post reset counter
router.post("/reset", function(req, res, next) {
  counterBenar = counterSalah = counterSekip = indexSoal = 0;
  data = datas[indexSoal];
  res.redirect("/soals");
})
