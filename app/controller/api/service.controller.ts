import serviceRepo from "../../repositories/api/service.repo.js";

class ServiceController {
    createService = async (req: any, res: any) => {
        try {
            const data = req.body;
            const service = await serviceRepo.createService(data);
            res.status(201).json({
                success: true,
                message: "Service created successfully",
                data: service,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    getServiceById = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const service = await serviceRepo.getServiceById(id);
            res.status(200).json({
                success: true,
                message: "Service retrieved successfully",
                data: service,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    updateService = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const service = await serviceRepo.updateService(id, data);
            res.status(200).json({
                success: true,
                message: "Service updated successfully",
                data: service,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    deleteService = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const service = await serviceRepo.deleteService(id);
            res.status(200).json({
                success: true,
                message: "Service deleted successfully",
                data: service,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    getServices = async (req: any, res: any) => {
        try {
            const services = await serviceRepo.getServices();
            res.status(200).json({
                success: true,
                message: "Services retrieved successfully",
                data: services,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
}

export default new ServiceController();
