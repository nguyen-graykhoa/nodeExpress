const { response } = require("express");
const express = require("express");
const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => { 
  knex("clucks")
    .orderBy("created_at", "desc")
    .then((clucks) => {
      res.render("clucks/index", { clucks: clucks });
    });
});

router.get("/tests", function (req, res) {
  var clucks;
  knex("clucks")
    .select()
    .then(function (ret) {
      clucks = ret;
      console.log(clucks[0])
      return knex("trend").select();
    })
    .then(function (trends) {
      console.log(trends)
      res.render("clucks/tests", {        
        clucks: clucks,
        trends: trends
      });
    });
});

router.get("/new", (req, res) => {
  res.render("clucks/new", { cluck: false });
});

// router.post("/", (req, res) => {
//   const username = req.cookies.username;
//   knex.transaction(trx => {
//   return trx('clucks')
//     .insert({
//       username: username,
//       image_url: req.body.image_url,
//       content: req.body.content       
//     })
//     .then(() => {
//       console.log(req.body.hashtag)
//      return trx("trend")
//        .insert({
//          hashtag: req.body.hashtag,
//          count: 0,
//        })
//        .onConflict("hashtag")
//        .merge({
//          value: knex.raw("?? + ?", ["count", 1]),
//        });
//     });
//   })
//   .then(() => {
//     console.log('inserted 2 rows');
//   })
//   .catch(err => {
//     console.log('one of the queries failed, no rows were inserted and transaction was rolled back')
//   }); 
//   res.redirect("/clucks")
// });




router.post("/", (req, res) => {
  const username = req.cookies.username;
  let trend;
  knex("trend")  
  .select("*")
    .where("hashtag", req.body.hashtag)
    .then(record => {
      if (record.length) {
        knex("trend")
        .where("hashtag", req.body.hashtag)
        .update({
          count: parseInt(record[0].count) + 1
        })
        .returning("*")
        .then(records => {
          console.log('existing hashtag',records[0])
          trend =  records[0]
          knex("clucks")
            .insert({
              username: username,
              image_url: req.body.image_url,
              content: req.body.content,
              hashtag: records[0].hashtag,
            })
            .returning("*")
            .then((records) => {
              console.log(`clucks?`);
              console.log(records[0]);
              trend = records[0];
            });
        })
      } else {
        knex("trend")
        .insert({
          hashtag: req.body.hashtag,
          count: 1 
        })
        .returning("*")
        .then(records => {
          console.log('new hashtag ',records[0])
          trend = records[0]
          knex("clucks")
            .insert({
              username: username,
              image_url: req.body.image_url,
              content: req.body.content,
              hashtag: records[0].hashtag,
            })
            .returning("*")
            .then((records) => {
              console.log(`clucks?`)
              console.log(records[0]);
              trend = records[0];
            });
        });
      }
    })
    res.redirect("/clucks") 
});


module.exports = router;