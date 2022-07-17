module.exports = (sequelize, dataTypes) => {
    let alias = 'Stock';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
        size_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'stock',
        timestamps: false,
        underscored: true,
    };
    const Stock = sequelize.define(alias, cols, config)

    return Stock
}