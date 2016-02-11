"use strict"

module.exports = function(db, body, res) {

  const obj = {
    name: body.name,
    email: body.email,
    message: body.message
  };

  let userName = body.name;
  // console.log(body);

  db.collection('contact').insertOne(obj, (err, result) => {
    if (err) throw err;
    res.send(`<h1>Thanks ${userName}</h1>`);
  });

};