var express = require('express');
var router = express.Router();
const Instatouch = require('instatouch');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  let options = {
    endCursor: epochToId(dateToEpoch(new Date(req.body.toYear, req.body.toMonth, req.body.toDay, 10, 33, 30, 0))),
    session: "sessionid=9172858944%3AQ72coMNjTByeNG%3A21"
  }
  Instatouch.location(req.body.location, options).then((data) => {
    res.render('feed', { data: data.collector })
  }).catch((err) => console.log("error", err))
});

function epochToId(n) {
  return Math.round((n * 0.008388608 - 11024476.5839159095) * 1000000000000);
}

function dateToEpoch(d) {
  return (d.getTime() - d.getMilliseconds()) / 1000;
}

module.exports = router;
