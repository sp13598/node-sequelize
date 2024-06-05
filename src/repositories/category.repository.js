import Category from "../models/Category.js";

class CategoryRepository {

    async save(data) {
        return await Category.create(data);
    }

    async getAll(hotelId, options) {
        return await Category.findAndCountAll({ where: { hotelId }, ...options});
    }

    async getById(id) {
        return await Category.findByPk(id);
    }

    async findOne(name) {
        return await Category.findOne({ where: { name }});
    }
    
    async update(id, data) {
        await Category.update(data, { where: { id }});
        return this.getById(id);
    }

    async remove(id) {
        const category = await this.getById(id);
        if(!category) return null;
            
        await Category.destroy({ where: { id }});        
    }
}

export default new CategoryRepository();