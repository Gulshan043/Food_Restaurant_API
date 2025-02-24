const express = require("express");
const { testUserController } = require("../controller/testControler");

// router object
const router = express.Router();

// routes GET | POST | PUT | DELETE | PATCH

router.get("/test-user", testUserController);

module.exports = router;
