import hotelService from "../services/hotel.service.js";
import { statusCode } from "../utils/statusCode.js";

class HotelController {

    async save(req, res) {
        try {
            const { name, branch, address } = req.body;
            const data = { name, branch, address, ownerId: req.user.id }
            const result = await hotelService.save(data);
            return res.status(result.status).json({ message: result.message, hotel: result.data })
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.id;
            const result = await hotelService.getAll(userId);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message, hotels: result.data });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await hotelService.update(req.params.id, req.body);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message, hotel: result.data });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }

    async remove(req, res) {
        try {
            const result = await hotelService.remove(req.params.id);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ message: error.message });
        }
    }
}

export default new HotelController();