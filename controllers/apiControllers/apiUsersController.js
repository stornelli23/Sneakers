const db = require("../../database/models");

const apiUsersController = {

    allUsers: (req, res) => {
    db.User.findAll({
      attributes: ["id", "first_name", "email"],
    })
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        users[i].setDataValue(
          "detail",
          "http://localhost:3000/api/users/" + users[i].id
        );
      }

      res.status(200).json({
        total: users.length,
        data: users,
        status: 200,
      });
    });
  },

  userDetail: (req, res) => {
    let id = req.params.id
    db.User.findByPk(id)
    .then((user) => {
      

      res.status(200).json({
        data: {
            id:             user.id,
            first_name:     user.first_name,
            last_name:      user.last_name,
            email:          user.email,
            date_of_birth:  user.date_of_birth,
            gender:         user.gender,
            avatar: "localhost:3000/public/img/users/"+user.avatar
        },
        status: 200,
      });
    });
  },






};

module.exports = apiUsersController;


