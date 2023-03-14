const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	sequelize.define('genre', {
	id:{
	type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        //unique: true
	},
	name:{
	type:DataTypes.STRING,
	allowNull:false,
	unique:true,
	/*validate:{
	isIn:[[
	"Action",
	"Indie",
	"Adventure",
	"RPG",
	"Strategy",
	"Shooter",
	"Casual",
	"Simulation",
	"Puzzle",
	"Arcade",
	"Platformer",
	"Racing",
	"Massively Multiplayer",
	"Sports",
	"Fighting",
	"Family",
	"Board Games",
	"Educational",
	"Card"
	]]}*/
	}
    },{
	timestamps:false
	}
  )
}
