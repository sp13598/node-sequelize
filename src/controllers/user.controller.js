import bcrypt from "bcryptjs";
import { ROLES } from "../utils/roles.js";
import userService from "../services/user.service.js";
import { statusCode } from "../utils/statusCode.js";


class UserController {

    async admin (req, res) {
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const data = { firstName, lastName, email, password: hashPassword, role: ROLES.ADMIN }
        try {
            const result = await userService.save(data);
            return res.status(result.status).json({ message: result.message, user: result.data });
        } catch (error) {
            return res.status(error.status).json({ error: error.message });
        }
    }

    async owner (req, res) {
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const data = { firstName, lastName, email, password: hashPassword, role: ROLES.OWNER }
        try {
            const result = await userService.save(data);
            return res.status(result.status).json({ message: result.message, user: result.data })
        } catch (error) {
            return res.status(error.status).json({ error: error.message });
        }
    }

    async login (req, res) {
        try {
            const result = await userService.login(req.body);
            res.cookie("access_token", result.data, { httpOnly: true });
            return res.status(result.status).json({ message: result.message, token: result.data });
        } catch (error) {
            return res.status(error.status || statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await userService.update(req.params.id, req.body);
            if (result.status !== statusCode.OK) {
                return res.status(result.status).json({ message: result.message });
            }
            return res.status(result.status).json({ message: result.message, user: result.data });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ error: error.message }); 
        }
    }

    async remove(req, res) {
        try {
            const result = await userService.remove(req.params.id);
            if(result.status !== statusCode.OK)
                return res.status(result.status).json({ message: result.message });
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            return res.status(statusCode.BAD_GATEWAY).json({ error: error.message });
        }
    }
}

export default new UserController();