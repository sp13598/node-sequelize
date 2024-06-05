import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import Hotel from "./Hotel.js";

class Category extends Model{}
Category.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hotelId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Hotel,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        paranoid: true
    }
)

Hotel.hasMany(Category, { foreignKey: 'hotelId'});
Category.belongsTo(Hotel, { foreignKey: 'hotelId'});

export default Category;