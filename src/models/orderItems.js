const { sequelize, DataTypes, Model } = require("sequelize");

// cancel
class OrderItems extends Model {}

OrderItems.init({
  items_id: {
    type: DataTypes.UUID,
    DefaultValue: DataTypes.UUIDV4,
    unique: true,
  },

  order_id: {
    type: DataTypes.UUID,
    allowNull: false,

    references: {
      model: Ord,
      key: "product_id",
    },
  },
});
