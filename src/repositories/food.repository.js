import Food from "../models/Food.js";

class FoodRepository {

    async save(data) {
        return await Food.create(data);
    }

    async getAll(categoryId) {
        return await Food.findAndCountAll({ where: { categoryId }});
    }

    async getById(id) {
        return await Food.findByPk(id);
    }

    async findOne(name) {
        return await Food.findOne({ where: { name }});
    }
    
    async update(id, data) {
        await Food.update(data, { where: { id }});
        return this.getById(id);
    }

    async remove(id) {
        const food = await this.getById(id);
        if(!food) return null;
            
        await Food.destroy({ where: { id }});        
    }
}

export default new FoodRepository()