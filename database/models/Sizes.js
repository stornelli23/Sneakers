module.exports = (sequelize, dataTypes) => {
    let alias = 'Sizes';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        size: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'sizes',
        timestamps: false,
        underscored: true,
    };
    const Sizes = sequelize.define(alias, cols, config)

    return Sizes
}