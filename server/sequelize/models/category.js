module.exports = function (db, DataTypes) {
  return db.define("category", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },

    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
};