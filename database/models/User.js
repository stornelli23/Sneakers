const fs = require('fs');

const User = {
     fileName: './data/users.json',
     getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
     },
     generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.user_id + 1;
        }
        return 1;
     },
     findAll: function() {

        return this.getData();
     },
     findByPk: function (user_id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.user_id === user_id);
        return userFound;
     },
     findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text);
        return userFound;
     },
     delete: function (user_id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.user_id !== user_id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
     }
}

module.exports = User;