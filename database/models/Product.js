module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.VARCHAR(50),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10),
            allowNull: false
        },
        discount: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        brand_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
        image: {
            type: dataTypes.VARCHAR(80),
            allowNull: false
        },
        category_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
    };
    let config = {
        tableName: 'products',
        timestamps: false,
        underscored: true,
    };
    const Product = sequelize.define(alias, cols, config)

    return Product
}