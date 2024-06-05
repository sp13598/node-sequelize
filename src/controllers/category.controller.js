import categoryService from "../services/category.service.js";
import { statusCode } from "../utils/statusCode.js";

class CategoryController {
  async save(req, res) {
    try {
      const data = req.body;
      const result = await categoryService.save(data);
      if (result.status !== statusCode.CREATED) {
        return res.status(result.status).json({ message: result.message });
      }
      return res
        .status(result.status)
        .json({ message: result.message, category: result.data });
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await categoryService.getAll(req.params.id);
      if (result.status !== statusCode.OK)
        return res.status(result.status).json({ message: result.message });
      return res
        .status(result.status)
        .json({ message: result.message, categories: result.data });
    } catch (error) {
        return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
        const result = await categoryService.update(req.params.id, req.body);
        if(result.status !== statusCode.OK)
            return res.status(result.status).json({ message: result.message });
        return res.status(result.status).json({ message: result.message, category: result.data });
    } catch (error) {
        return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
    }
  }

  async remove(req, res) {
    try {
        const result = await categoryService.remove(req.params.id);
        if(result.status !== statusCode.OK)
            return res.status(result.status).json({ message: result.message });
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
    }
  }
}

export default new CategoryController();
