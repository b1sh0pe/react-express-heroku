module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable("category", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },

      url: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }).then(
      function () {
        return queryInterface.addConstraint(
          "category",
          {
            type: "unique",
            fields: ["name"],
            name: "unique_category_name"
          }
        );
      }
    ).then(
      function () {
        return queryInterface.addConstraint(
          "category",
          {
            type: "unique",
            fields: ["url"],
            name: "unique_category_url"
          }
        );
      }
    ).then(
      function () {
        return queryInterface.bulkInsert(
          "category",
          [
            {
              "id": 1,
              "name": "Инвестиции",
              "url": "https://ain.ua/tag/investicii/"
            }, {
              "id": 2,
              "name": "Истории",
              "url": "https://ain.ua/tag/avtorskie/"
            }, {
              "id": 3,
              "name": "Стартапы",
              "url": "https://ain.ua/tag/startap-dnya/" 
            }, {
              "id": 4,
              "name": "Государство",
              "url": "https://ain.ua/tag/gosudarstvo/"
            }, {
              "id": 5,
              "name": "Гаджеты",
              "url": "https://ain.ua/tag/gadzhety/"
            }
          ]
        );
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable("category");
  }
};