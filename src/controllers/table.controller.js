import tableService from "../services/table.service.js";
import { statusCode } from "../utils/statusCode.js";

class TableController {

    async save(req, res) {
        const { numberOfTables, hotelId } = req.body;
        try {
            const result = await tableService.save(numberOfTables, hotelId);
            return res.status(result.status).json({ message: result.message, data: result.data, details: result.details });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }


    async getAll(req, res) {
        try {
            const result = await tableService.getAll(req.params.id);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message, data: result.data });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async remove(req, res) {
        try {
            const result = await tableService.remove(req.params.id);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }
}

export default new TableController();