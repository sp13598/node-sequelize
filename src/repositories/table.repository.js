import Table from "../models/Table.js";

class TableRepository {

    async bulkCreate(tables) {
        return await Table.bulkCreate(tables);
    }

    async getById(id) {
        return await Table.findByPk(id);
    }

    async findOne(tableNo) {
        return await Table.findOne({ where: { tableNo }});
    }

    async getAll(hotelId){
        return await Table.findAndCountAll({ where: { hotelId }});
    }

    async remove(id) {
        const table = await this.getById(id);
        if(!table) return null;
            
        await Table.destroy({ where: { id }});
    }
}


export default new TableRepository();