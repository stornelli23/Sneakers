module.exports = (sequelize, dataTypes) => {
    let alias = 'Permission';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        permission: {
            type: dataTypes.VARCHAR(15),
            allowNull: false
        }
    };
    let config = {
        tableName: 'permissions',
        timestamps: false,
        underscored: true,
    };
    const Permission = sequelize.define(alias, cols, config)

    return Permission

    
    Permission.associate = function(models){
        Permission.hasMany(models.User, {
            as: 'users',
            foreignKey: 'permission_id'
        })
    }
}