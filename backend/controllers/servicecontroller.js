/*==================================================
  CodeNova Technologies
  backend/controllers/serviceController.js
  Part 1A.1
  Imports + Get All Services + Get Service By ID
==================================================*/

"use strict";

/*=========================================
=            Required Modules             =
=========================================*/

const Service = require("../models/Service");

/*=========================================
=          Response Helpers               =
=========================================*/

function successResponse(

    res,

    status,

    message,

    data = {}

){

    return res.status(status).json({

        success: true,

        message,

        data

    });

}

function errorResponse(

    res,

    status,

    message

){

    return res.status(status).json({

        success: false,

        message

    });

}

/*=========================================
=          Get All Services               =
=========================================*/

exports.getAllServices = async (

    req,

    res

) => {

    try{

        const services =

            await Service.find()

            .sort({

                createdAt: -1

            });

        return successResponse(

            res,

            200,

            "Services fetched successfully.",

            {

                total:

                    services.length,

                services

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch services."

        );

    }

};

/*=========================================
=         Get Service By ID               =
=========================================*/

exports.getServiceById = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const service =

            await Service.findById(id);

        if(!service){

            return errorResponse(

                res,

                404,

                "Service not found."

            );

        }

        return successResponse(

            res,

            200,

            "Service fetched successfully.",

            service

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch service."

        );

    }

};

/*=========================================
=          Helper Functions               =
=========================================*/

exports.serviceExists = async (

    title

) => {

    return await Service.findOne({

        title

    });

};

exports.findServiceBySlug = async (

    slug

) => {

    return await Service.findOne({

        slug

    });

};

/*=========================================
=      Controller Initialization         =
=========================================*/

console.log(

    "Service Controller Initialized"

);

console.log(

    "Get All Services Ready"

);

console.log(

    "Get Service By ID Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/serviceController.js
  Part 1A.2
  Create Service + Update Service
==================================================*/

"use strict";

/*=========================================
=            Create Service               =
=========================================*/

exports.createService = async (

    req,

    res

) => {

    try{

        const {

            title,

            slug,

            category,

            description,

            price,

            duration,

            status

        } = req.body;

        /*==============================
          Required Validation
        ==============================*/

        if(

            !title ||

            !category ||

            !description

        ){

            return errorResponse(

                res,

                400,

                "Please provide all required fields."

            );

        }

        /*==============================
          Check Existing Service
        ==============================*/

        const existingService =

            await Service.findOne({

                $or:[

                    { title },

                    { slug }

                ]

            });

        if(existingService){

            return errorResponse(

                res,

                409,

                "Service already exists."

            );

        }

        /*==============================
          Create Service
        ==============================*/

        const service =

            await Service.create({

                title,

                slug,

                category,

                description,

                price,

                duration,

                status:

                    status || "active"

            });

        return successResponse(

            res,

            201,

            "Service created successfully.",

            {

                id:

                    service._id,

                title:

                    service.title,

                category:

                    service.category,

                status:

                    service.status

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to create service."

        );

    }

};

/*=========================================
=            Update Service               =
=========================================*/

exports.updateService = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const {

            title,

            slug,

            category,

            description,

            price,

            duration,

            status

        } = req.body;

        const service =

            await Service.findById(id);

        if(!service){

            return errorResponse(

                res,

                404,

                "Service not found."

            );

        }

        /*==============================
          Update Fields
        ==============================*/

        service.title =

            title || service.title;

        service.slug =

            slug || service.slug;

        service.category =

            category || service.category;

        service.description =

            description ||

            service.description;

        service.price =

            price ?? service.price;

        service.duration =

            duration ||

            service.duration;

        service.status =

            status ||

            service.status;

        service.updatedAt =

            new Date();

        await service.save();

        return successResponse(

            res,

            200,

            "Service updated successfully.",

            {

                id:

                    service._id,

                title:

                    service.title,

                category:

                    service.category,

                status:

                    service.status,

                updatedAt:

                    service.updatedAt

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to update service."

        );

    }

};
/*==================================================
  CodeNova Technologies
  backend/controllers/serviceController.js
  Part 1A.3
  Delete Service + Search Services
==================================================*/

"use strict";

/*=========================================
=            Delete Service               =
=========================================*/

exports.deleteService = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        /*==============================
          Find Service
        ==============================*/

        const service =

            await Service.findById(id);

        if(!service){

            return errorResponse(

                res,

                404,

                "Service not found."

            );

        }

        /*==============================
          Delete Service
        ==============================*/

        await Service.findByIdAndDelete(id);

        return successResponse(

            res,

            200,

            "Service deleted successfully.",

            {

                id,

                deleted: true

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to delete service."

        );

    }

};

/*=========================================
=            Search Services              =
=========================================*/

exports.searchServices = async (

    req,

    res

) => {

    try{

        const {

            keyword,

            category,

            status

        } = req.query;

        const filter = {};

        /*==============================
          Keyword Search
        ==============================*/

        if(keyword){

            filter.$or = [

                {

                    title:{

                        $regex: keyword,

                        $options:"i"

                    }

                },

                {

                    description:{

                        $regex: keyword,

                        $options:"i"

                    }

                }

            ];

        }

        /*==============================
          Category Filter
        ==============================*/

        if(category){

            filter.category = {

                $regex: category,

                $options:"i"

            };

        }

        /*==============================
          Status Filter
        ==============================*/

        if(status){

            filter.status = status;

        }

        /*==============================
          Execute Search
        ==============================*/

        const services =

            await Service.find(filter)

            .sort({

                createdAt:-1

            });

        return successResponse(

            res,

            200,

            "Services retrieved successfully.",

            {

                total:

                    services.length,

                services

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to search services."

        );

    }

};

/*=========================================
=          Helper Functions               =
=========================================*/

exports.countServices = async () => {

    return await Service.countDocuments();

};

exports.findServiceByCategory = async (

    category

) => {

    return await Service.find({

        category

    });

};

/*=========================================
=      Controller Initialization          =
=========================================*/

console.log(

    "Delete Service Controller Ready"

);

console.log(

    "Search Services Controller Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/serviceController.js
  Part 1B.1
  Featured Services + Service Categories
==================================================*/

"use strict";

/*=========================================
=         Featured Services               =
=========================================*/

exports.featuredServices = async (

    req,

    res

) => {

    try{

        /*==============================
          Get Featured Services
        ==============================*/

        const services =

            await Service.find({

                featured: true,

                status: "active"

            })

            .sort({

                createdAt: -1

            });

        return successResponse(

            res,

            200,

            "Featured services fetched successfully.",

            {

                total:

                    services.length,

                services

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch featured services."

        );

    }

};

/*=========================================
=         Service Categories              =
=========================================*/

exports.serviceCategories = async (

    req,

    res

) => {

    try{

        /*==============================
          Distinct Categories
        ==============================*/

        const categories =

            await Service.distinct(

                "category"

            );

        return successResponse(

            res,

            200,

            "Service categories fetched successfully.",

            {

                total:

                    categories.length,

                categories

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch service categories."

        );

    }

};

/*=========================================
=          Helper Functions               =
=========================================*/

exports.getFeaturedCount = async () => {

    return await Service.countDocuments({

        featured: true,

        status: "active"

    });

};

exports.categoryExists = async (

    category

) => {

    return await Service.exists({

        category

    });

};

exports.toggleServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return errorResponse(res, 404, "Service not found.");
        }
        service.status = service.status === "active" ? "inactive" : "active";
        await service.save();
        return successResponse(res, 200, "Service status toggled successfully.", service);
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Unable to toggle service status.");
    }
};

exports.serviceStatistics = async (req, res) => {
    try {
        const totalServices = await Service.countDocuments();
        const activeServices = await Service.countDocuments({ status: "active" });
        const inactiveServices = await Service.countDocuments({ status: "inactive" });
        return successResponse(res, 200, "Service statistics fetched successfully.", {
            total: totalServices,
            active: activeServices,
            inactive: inactiveServices
        });
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Unable to fetch service statistics.");
    }
};

/*=========================================
=      Controller Initialization         =
=========================================*/

console.log(

    "Featured Services Controller Ready"

);

console.log(

    "Service Categories Controller Ready"

);

