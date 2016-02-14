"use strict";

const express = require('express');

const router = express.Router();

const home = require('./home.js');
const contact = require('./contact.js');
const photos = require('./photos.js');
const api = require('./api.js');
const misc = require('./misc.js');

router.use(api);
router.use(photos);
router.use(misc);
router.use(home);
router.use(contact);

module.exports = router;