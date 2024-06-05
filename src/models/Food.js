import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import Category from "./Category.js";

class Food extends Model{}

Food.init(
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        paranoid: true
    }
);

Category.hasMany(Food, { foreignKey: 'categoryId' });
Food.belongsTo(Category, { foreignKey: 'categoryId' });

export default Food;