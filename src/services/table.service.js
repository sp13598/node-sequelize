import tableRepository from "../repositories/table.repository.js";
import { statusCode } from "../utils/statusCode.js";

class TableService {

    async save(numberOfTables, hotelId) {
        try {
            const tables = [];
            for (let i = 1; i <= numberOfTables; i++) {
                tables.push({ tableNo: i, hotelId });
            }
            const createdTables = await tableRepository.bulkCreate(tables);
            return { status: statusCode.OK, message: 'Tables Created', data: createdTables };
        } catch (error) {
            console.error('Error creating tables:', error);
            if (error.name === 'SequelizeValidationError') {
                return { status: statusCode.BAD_REQUEST, message: 'Validation error', details: error.errors };
            }
            return { status: statusCode.INTERNAL_SERVER_ERROR, message: error.message };
        }
    }

    async getAll(hotelId) {
        try {
            const tables = await tableRepository.getAll(hotelId);
            if(!tables)
                return {status: statusCode.NOT_FOUND, message: "Table Not Found!" };
            return {status: statusCode.OK, message: "Tables Found!", data: tables };
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

    async remove(id) {
        try {
            const table = await tableRepository.getById(id);
            if(!table)
                return {status: statusCode.NOT_FOUND, message: "Table Not Found!" };
            await tableRepository.remove(id);
            return {status: statusCode.OK, message: "Table Removed!"} ;
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }
}

export default new TableService();