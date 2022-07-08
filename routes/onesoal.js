var express = require('express');
var router = express.Router();

let counterBenar = 0;
let counterSalah = 0;
let counterSekip = 0;

const soal = {
  text_soal : "Erwin menjual bakiak bersama Bang Bewok. Erwin merupakan ...." ,
  options : ["kata benda konkret", "kata benda abstrak", "bukan kata benda"] ,
  answer : "kata benda konkret",
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("onesoal", { title:"contoh soal", soal, counterBenar, counterSalah, counterSekip });
});

/* POST options, answer and result counter. */
router.post("/evaluate", function (req, res, next) {
  let c_answer = req.body.answer;
  console.log(c_answer);
  if (c_answer === soal.answer){
    counterBenar += 1;
  }
  else if(!c_answer){
    counterSekip += 1;
  }
  else {
    counterSalah += 1;
  }
  res.redirect("/onesoal");
});

/* POST reset result counter */
router.post("/reset", function(req, res, next) {
  counterBenar = counterSalah = counterSekip = 0;
  res.redirect("/onesoal");
})

module.exports = router;
