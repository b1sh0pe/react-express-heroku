module.exports = function (db, DataTypes) {
  const article = db.define("article", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "category", // A reference to another model
        key: "id" // The column name of the referenced model
      }
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

  article.associate = function (models) {
    article.belongsTo(models.category, {
      as: "articleCategory",
      foreignKey: "category_id",
      targetKey: "id"
    });
  };

  return article;
};