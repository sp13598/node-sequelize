import foodRepository from "../repositories/food.repository.js";
import { statusCode } from "../utils/statusCode.js";

class FoodService {

    async save(data) {
        try {
            const exist = await foodRepository.findOne(data.name);
            if(exist)
                return {status: statusCode.CONFLICT, message: "Food Already Exists!" };
            const food = await foodRepository.save(data);
            return { status: statusCode.CREATED, message: "Food Added...", data: food }; 
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

    async getAll(catId) {
        try {
            const categories = await foodRepository.getAll(catId);
            if(!categories)
                return {status: statusCode.NOT_FOUND, message: "Food Not Found!" };
            return {status: statusCode.OK, message: "Food List Found!", data: categories };
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

    async update(id, data) {
        try {
            const food = await foodRepository.getById(id);
            if(!food)
                return {status: statusCode.NOT_FOUND, message: "Food Not Found!" };
            const updatedFood = await foodRepository.update(id, data);
            return {status: statusCode.OK, message: "Food Updated..", data: updatedFood };
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

    async remove(id) {
        try {
            const food = await foodRepository.getById(id);
            if(!food)
                return {status: statusCode.NOT_FOUND, message: "Food Not Found!" };
            await foodRepository.remove(id);
            return {status: statusCode.OK, message: "Food Removed.." };
        } catch (error) {
            return {status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }
}

export default new FoodService()