import Food from "../models/Food.js";
import categoryRepository from "../repositories/category.repository.js";
import { statusCode } from "../utils/statusCode.js";

class CategoryService { 

    async save(data) {
        try {
            const exist = await categoryRepository.findOne(data.name);
            if (exist) {
                return { status: statusCode.CONFLICT, message: "Category Already Exists!" };
            }
            const category = await categoryRepository.save(data);
            return { status: statusCode.CREATED, message: 'Category Created', data: category };
        } 
        catch (error) {
            return { status: statusCode.INTERNAL_SERVER_ERROR, message: error.message };
        }
    }

    async getAll(hotelId) {
        try {
            const categories = await categoryRepository.getAll(hotelId,  {
                include: [
                  {
                    model: Food,
                    attributes: ["name", "price"],
                  }
                ],
              });
            if(!categories)
                return { status: statusCode.BAD_REQUEST, message: "Categories Not Found!" };
            return { status: statusCode.OK, message: "Categories Found..", data: categories };
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

    async update(id, data) {
        try {
            const category = await categoryRepository.getById(id);
            if(!category)
                return { status: statusCode.NOT_FOUND, message: "Category Not Found!" };
            const updatedCat = await categoryRepository.update(id, data);
            return { status: statusCode.OK, message: 'Category Updated..', data: updatedCat };
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

    async remove(id) {
        try {
            const category = await categoryRepository.getById(id);
            if(!category)
                return { status: statusCode.NOT_FOUND, message: "Category Not Found!" };
            await categoryRepository.remove(id);
            return { status: statusCode.OK, message: "Category Removed..." };
        } catch (error) {
            return { status: statusCode.BAD_GATEWAY, message: error.message };
        }
    }

}

export default new CategoryService();