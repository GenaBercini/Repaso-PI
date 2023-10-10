const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Recipes",
    {
      id: {
        type: DataTypes.UUID, // ES ALFANUMERICO ADSDASFDASD-138123ASD8-ASDAD
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 20],
            msg: "Que el nombre del heroe debe contener entre 2 y 20 caracteres",
          },
        },
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readyInMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pricePerServing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:
          "https://res.cloudinary.com/genaro-bercini/image/upload/v1696723917/Polite-Things-You-Do-When-Youre-Trying-Another-Cultural-Food-That-Are-Actually-Rude-2000-d6610b3b71db46c595594a79b469379d_bnnrhr.jpg",
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
