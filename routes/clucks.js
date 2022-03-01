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

router.get("/new", (req, res) => {
  res.render("clucks/new", { cluck: false });
});

router.post("/", (req, res) => {
  const username = req.cookies.username;
  knex("clucks")
    .insert({
      username: username,
      image_url: req.body.image_url,
      content: req.body.content,
    })
    .returning("*")
    .then((clucks) => {      
      const cluck = clucks[0];      
      res.redirect("/clucks")
    });
});

router.get("/:id", (req, res) => {
   
  knex("clucks")
    .where("id", req.params.id)
    .first() //this will grab the first instance that matches the requirements
    .then((cluck) => {
      if (!cluck) {
        res.send("No cluck found");
      } else {
        res.render("clucks/show", { cluck: cluck });
      }
    });
});



module.exports = router;