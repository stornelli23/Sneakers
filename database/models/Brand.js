module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        brand: {
            type: dataTypes.VARCHAR(25),
            allowNull: false
        }
    };
    let config = {
        tableName: 'brands',
        timestamps: false,
        underscored: true,
    };
    const Brand = sequelize.define(alias, cols, config)

    return Brand
}