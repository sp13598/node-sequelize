import foodService from "../services/food.service.js";
import { statusCode } from "../utils/statusCode.js";

class FoodController {

    async save(req, res) {
        try {
            const result = await foodService.save(req.body);
            if(result.status !== statusCode.CREATED) 
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message, food: result.data })
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const result = await foodService.getAll(req.params.id);
            if(result.status !== statusCode.OK) 
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message, food: result.data })
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await foodService.update(req.params.id, req.body);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message, food: result.data })
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async remove(req, res) {
        try {
            const result = await foodService.remove(req.params.id);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message })
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }
}

export default new FoodController();