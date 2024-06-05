import Hotel from "../models/Hotel.js";

class HotelRepository {

    async save(data) {
        return await Hotel.create(data);
    }

    async getAll(ownerId, options) {
        return await Hotel.findAndCountAll({ where: { ownerId }, ...options});
    }

    async getById(id) {
        return await Hotel.findByPk(id);
    }
    
    async update(id, data) {
        await Hotel.update(data, { where: { id }});
        return this.getById(id);
    }

    async remove(id) {
        const hotel = await this.getById(id);
        if(!hotel) return null;
            
        await Hotel.destroy({ where: { id }});        
    }
}

export default new HotelRepository();