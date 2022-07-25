
module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
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
    const Size = sequelize.define(alias, cols, config)

    return Size

    
    Size.associate = function(models){
        Size.belongsToMany(models.Product, {
            as: 'products',
            through: 'stock',
            foreignKey:'size_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
}