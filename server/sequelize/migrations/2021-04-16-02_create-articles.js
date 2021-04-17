module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable("article", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category", // A reference to another model
          key: "id" // The column name of the referenced model
        }
      },

      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
      },

      updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP")
      }
    }).then(
      function () {
        return queryInterface.addConstraint(
          "article",
          {
            type: "unique",
            fields: ["url"],
            name: "unique_article_url"
          }
        );
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable("article");
  }
};