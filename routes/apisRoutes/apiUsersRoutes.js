const express = require("express");
const router = express.Router();
const path = require("path");


///*** Controller Require **** */
const apiUsersController = require("../../controllers/apiControllers/apiUsersController.js")



/*RUTAS POR GET*/

router.get("/api/users", apiUsersController.allUsers);
router.get("/api/users/:id", apiUsersController.userDetail);



/*RUTAS POR POST*/



module.exports = router;