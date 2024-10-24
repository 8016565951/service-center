import userRepo from "../../repositories/api/user.repo.js";

class userController {
    getUserById = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const user = await userRepo.getUserById(id);
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    updateUser = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const user = await userRepo.updateUser(id, data);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    deleteUser = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const user = await userRepo.deleteUser(id);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

export default new userController();
