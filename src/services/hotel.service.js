import Category from "../models/Category.js";
import Food from "../models/Food.js";
import Table from "../models/Table.js";
import hotelRepository from "../repositories/hotel.repository.js";
import { statusCode } from "../utils/statusCode.js";

class HotelService {
  async save(data) {
    try {
      const hotel = await hotelRepository.save(data);
      return { status: statusCode.OK, message: "Hotel Added...", data: hotel };
    } catch (error) {
      return { status: statusCode.BAD_GATEWAY, message: error.message };
    }
  }

  async getAll(userId) {
    try {
      const hotels = await hotelRepository.getAll(userId, {
        include: [
          {
            model: Category,
            attributes: ["name"],

            include: [
              {
                model: Food,
                attributes: ["name", "price"],
              },
            ],
          },
          {
            model: Table,
            attributes: ['tableNo']
          }
        ],
      });
      if (!hotels)
        return { status: statusCode.NOT_FOUND, message: "Hotels Not Found!" };
      return { status: statusCode.OK, message: "Hotels Found!", data: hotels };
    } catch (error) {
      return { status: statusCode.BAD_GATEWAY, message: error.message };
    }
  }

  async update(id, data) {
    try {
      const hotel = await hotelRepository.getById(id);
      if (!hotel)
        return { status: statusCode.NOT_FOUND, message: "Hotel Not Found!" };
      const updatedDetail = await hotelRepository.update(id, data);
      return {
        status: statusCode.OK,
        message: "Hotels Detail Updated!",
        data: updatedDetail,
      };
    } catch (error) {
      return { status: statusCode.BAD_GATEWAY, message: error.message };
    }
  }

  async remove(id) {
    try {
      const hotel = await hotelRepository.getById(id);
      if (!hotel)
        return { status: statusCode.NOT_FOUND, message: "Hotel Not Found!" };
      await hotelRepository.remove(id);
      return { status: statusCode.OK, message: "Hotel Deleted!" };
    } catch (error) {
      return { status: statusCode.BAD_GATEWAY, message: error.message };
    }
  }
}

export default new HotelService();
