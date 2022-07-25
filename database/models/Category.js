
module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(25),
            allowNull: false
        }
    };
    let config = {
        tableName: 'category',
        timestamps: false,
        underscored: true,
    };
    const Category = sequelize.define(alias, cols, config)

    return Category

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }
}