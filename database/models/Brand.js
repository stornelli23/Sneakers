
module.exports = (sequelize, DataTypes) => {
    let alias = 'Brand';
    let cols = {
        id: {
            type: DataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING(25),
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

    Brand.associate = function(models){
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id'
        })
    }
}