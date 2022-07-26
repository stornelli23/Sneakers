
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
            type: dataTypes.STRING(50),
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
            type: dataTypes.STRING(80),
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

   

    Product.associate = function(models){
        Product.belongsToMany(models.User, {
            as: 'users',
            through: 'orders',
            foreignKey:'product_id',
            otherKey: 'user_id',
            timestamps: false
        })
    }

    Product.associate = function(models){
        Product.belongsToMany(models.Size, {
            as: 'sizes',
            through: 'stock',
            foreignKey:'product_id',
            otherKey: 'size_id',
            timestamps: false
        })
    }

    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        })
    }

    Product.associate = function(models){
        Product.belongsTo(models.Brand, {
            as: 'brands',
            foreignKey: 'brand_id'
        })
    }

    return Product

}