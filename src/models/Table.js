import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import Hotel from "./Hotel.js";

class Table extends Model{}
Table.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            allowNull: false,
            primaryKey: true
        },
        tableNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

Hotel.hasMany(Table, {foreignKey: "hotelId"});
Table.belongsTo(Hotel, { foreignKey: "hotelId"});

export default Table;