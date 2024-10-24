import { ROLES } from "../../lib/utils/constant.js";
import { user } from "../../model/index.js";

class AuthRepo {
    getUserById = async (id: string) => {
        return await user.findOne({ _id: id });
    };

    getByEmail = async (email: string) => {
        return await user.findOne({ email });
    };

    getUserByEmail = async (email: string) => {
        return await user.findOne({ email, role: ROLES.USER });
    };

    getEmployeeByEmail = async (email: string) => {
        return await user.findOne({ email, role: ROLES.EMPLOYEE });
    };

    getAdminByEmail = async (email: string) => {
        return await user.findOne({ email, role: ROLES.ADMIN });
    };

    getModeratorByEmail = async (email: string) => {
        return await user.findOne({ email, role: ROLES.MOD });
    };

    CreateUser = async (data: any) => {
        return await user.create(data);
    };

    CreateEmployee = async (data: any) => {
        return await user.create(data);
    };

    updateUser = async (id: string, data: any) => {
        return await user.findByIdAndUpdate(id, data, { new: true });
    };

    updateUserPassword = async (id: string, password: string) => {
        return await user.findByIdAndUpdate(id, { password }, { new: true });
    };

    deleteUser = async (id: string) => {
        return await user.findByIdAndDelete(id);
    };

    verifyEmail = async (id: string) => {
        return await user.findByIdAndUpdate(id, { isVerified: true });
    };
}

export default new AuthRepo();
