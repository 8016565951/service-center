import service from "../../model/service.js";

class ServiceRepo {
    createService = async (data: any) => {
        return await service.create(data);
    };

    getServiceById = async (id: string) => {
        return await service.findById(id);
    };

    updateService = async (id: string, data: any) => {
        return await service.findByIdAndUpdate(id, data, { new: true });
    };

    deleteService = async (id: string) => {
        return await service.findByIdAndDelete(id);
    };

    getServices = async () => {
        return await service.find();
    };
}

export default new ServiceRepo();
