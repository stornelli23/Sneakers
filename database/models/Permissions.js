module.exports = (sequelize, dataTypes) => {
    let alias = 'Permissions';
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
    const Permissions = sequelize.define(alias, cols, config)

    return Permissions
}