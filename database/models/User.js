

module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        email: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        password: {
            type: dataTypes.VARCHAR(100),
            allowNull: false
        },
        date_of_birth: {
            type: dataTypes.DATE,
            allowNull: false
        },
        gender: {
            type: dataTypes.VARCHAR(20),
            allowNull: false
        },
        avatar: {
            type: dataTypes.VARCHAR(80),
            allowNull: false
        },
        permission_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },

    };
    let config = {
        tableName: 'users',
        timestamps: false,
        underscored: true,
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models){
        User.belongsToMany(models.Product, {
            as: 'products',
            through: 'orders',
            foreignKey: 'user_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
    
    User.associate = function(models){
        
        User.belongsTo(models.Permission, {
            as: 'permissions',
            foreignKey: 'permission_id'
        })
    }
    return User
}


  