
module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.SMALLINT(6),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
        product_id: {
            type: dataTypes.SMALLINT(6),
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        unitary_price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        subtotal: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        ticketN: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'orders',
        timestamps: false,
        underscored: true,
    };
    const Order = sequelize.define(alias, cols, config)

    return Order

    
}