/*==================================================
  CodeNova Technologies
  backend/controllers/contactController.js
  Part 1A.1
  Imports + Submit Contact + Get All Contacts
==================================================*/

"use strict";

/*=========================================
=            Required Packages            =
=========================================*/

const Contact = require("../models/Contact");

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
=          Submit Contact Form            =
=========================================*/

exports.submitContact = async (

    req,

    res

) => {

    try{

        const {

            name,

            email,

            phone,

            subject,

            message

        } = req.body;

        /*==============================
          Required Validation
        ==============================*/

        if(

            !name ||

            !email ||

            !subject ||

            !message

        ){

            return errorResponse(

                res,

                400,

                "Please fill all required fields."

            );

        }

        /*==============================
          Save Contact
        ==============================*/

        const contact =

            await Contact.create({

                name,

                email,

                phone,

                subject,

                message,

                status: "unread"

            });

        return successResponse(

            res,

            201,

            "Contact form submitted successfully.",

            {

                id:

                    contact._id,

                name:

                    contact.name,

                email:

                    contact.email,

                subject:

                    contact.subject,

                status:

                    contact.status

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to submit contact form."

        );

    }

};

/*=========================================
=         Get All Contacts                =
=========================================*/

exports.getAllContacts = async (

    req,

    res

) => {

    try{

        const contacts =

            await Contact.find()

            .sort({

                createdAt: -1

            });

        return successResponse(

            res,

            200,

            "Contacts fetched successfully.",

            {

                total:

                    contacts.length,

                contacts

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch contacts."

        );

    }

};

/*=========================================
=          Helper Function                =
=========================================*/

exports.contactExists = async (

    email

) => {

    return await Contact.findOne({

        email

    });

};

/*=========================================
=      Controller Initialization         =
=========================================*/

console.log(

    "Contact Controller Initialized"

);

console.log(

    "Submit Contact Ready"

);

console.log(

    "Get All Contacts Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/contactController.js
  Part 1A.2
  Get Contact By ID + Update Contact
==================================================*/

"use strict";

/*=========================================
=         Get Contact By ID               =
=========================================*/

exports.getContactById = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        /*==============================
          Find Contact
        ==============================*/

        const contact =

            await Contact.findById(id);

        if(!contact){

            return errorResponse(

                res,

                404,

                "Contact not found."

            );

        }

        return successResponse(

            res,

            200,

            "Contact fetched successfully.",

            contact

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch contact."

        );

    }

};

/*=========================================
=          Update Contact                 =
=========================================*/

exports.updateContact = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const {

            name,

            email,

            phone,

            subject,

            message,

            status

        } = req.body;

        /*==============================
          Find Contact
        ==============================*/

        const contact =

            await Contact.findById(id);

        if(!contact){

            return errorResponse(

                res,

                404,

                "Contact not found."

            );

        }

        /*==============================
          Update Fields
        ==============================*/

        contact.name =

            name || contact.name;

        contact.email =

            email || contact.email;

        contact.phone =

            phone || contact.phone;

        contact.subject =

            subject || contact.subject;

        contact.message =

            message || contact.message;

        contact.status =

            status || contact.status;

        contact.updatedAt =

            new Date();

        /*==============================
          Save Changes
        ==============================*/

        await contact.save();

        return successResponse(

            res,

            200,

            "Contact updated successfully.",

            {

                id:

                    contact._id,

                name:

                    contact.name,

                email:

                    contact.email,

                phone:

                    contact.phone,

                subject:

                    contact.subject,

                status:

                    contact.status,

                updatedAt:

                    contact.updatedAt

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to update contact."

        );

    }

};

/*=========================================
=         Helper Function                 =
=========================================*/

exports.findContactByEmail = async (

    email

) => {

    return await Contact.findOne({

        email

    });

};

/*=========================================
=      Controller Ready                   =
=========================================*/

console.log(

    "Get Contact By ID Ready"

);

console.log(

    "Update Contact Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/contactController.js
  Part 1A.3
  Delete Contact + Search Contacts
==================================================*/

"use strict";

/*=========================================
=          Delete Contact                 =
=========================================*/

exports.deleteContact = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        /*==============================
          Find Contact
        ==============================*/

        const contact =

            await Contact.findById(id);

        if(!contact){

            return errorResponse(

                res,

                404,

                "Contact not found."

            );

        }

        /*==============================
          Delete Contact
        ==============================*/

        await Contact.findByIdAndDelete(id);

        return successResponse(

            res,

            200,

            "Contact deleted successfully.",

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

            "Unable to delete contact."

        );

    }

};

/*=========================================
=          Search Contacts                =
=========================================*/

exports.searchContacts = async (

    req,

    res

) => {

    try{

        const {

            keyword,

            status,

            subject

        } = req.query;

        const filter = {};

        /*==============================
          Keyword Search
        ==============================*/

        if(keyword){

            filter.$or = [

                {

                    name:{

                        $regex: keyword,

                        $options:"i"

                    }

                },

                {

                    email:{

                        $regex: keyword,

                        $options:"i"

                    }

                },

                {

                    phone:{

                        $regex: keyword,

                        $options:"i"

                    }

                },

                {

                    message:{

                        $regex: keyword,

                        $options:"i"

                    }

                }

            ];

        }

        /*==============================
          Subject Filter
        ==============================*/

        if(subject){

            filter.subject = {

                $regex: subject,

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

        const contacts =

            await Contact.find(filter)

            .sort({

                createdAt:-1

            });

        return successResponse(

            res,

            200,

            "Contacts retrieved successfully.",

            {

                total:

                    contacts.length,

                contacts

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to search contacts."

        );

    }

};

/*=========================================
=          Helper Functions               =
=========================================*/

exports.countContacts = async () => {

    return await Contact.countDocuments();

};

exports.findContactBySubject = async (

    subject

) => {

    return await Contact.find({

        subject

    });

};

/*=========================================
=       Controller Ready                  =
=========================================*/

console.log(

    "Delete Contact Controller Ready"

);

console.log(

    "Search Contact Controller Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/contactController.js
  Part 1B.1
  Reply to Contact + Mark As Read
==================================================*/

"use strict";

/*=========================================
=         Reply To Contact                =
=========================================*/

exports.replyToContact = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const {

            replyMessage,

            repliedBy

        } = req.body;

        /*==============================
          Find Contact
        ==============================*/

        const contact =

            await Contact.findById(id);

        if(!contact){

            return errorResponse(

                res,

                404,

                "Contact not found."

            );

        }

        /*==============================
          Validate Reply
        ==============================*/

        if(!replyMessage){

            return errorResponse(

                res,

                400,

                "Reply message is required."

            );

        }

        /*==============================
          Save Reply Information
        ==============================*/

        contact.reply = {

            message:

                replyMessage,

            repliedBy:

                repliedBy ||

                "Administrator",

            repliedAt:

                new Date()

        };

        contact.status =

            "replied";

        contact.updatedAt =

            new Date();

        await contact.save();

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Reply sent successfully.",

            {

                id:

                    contact._id,

                status:

                    contact.status,

                reply:

                    contact.reply

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to reply to contact."

        );

    }

};

/*=========================================
=          Mark Contact As Read           =
=========================================*/

exports.markAsRead = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const contact =

            await Contact.findById(id);

        if(!contact){

            return errorResponse(

                res,

                404,

                "Contact not found."

            );

        }

        /*==============================
          Update Status
        ==============================*/

        contact.status = "read";

        contact.readAt =

            new Date();

        contact.updatedAt =

            new Date();

        await contact.save();

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Contact marked as read.",

            {

                id:

                    contact._id,

                status:

                    contact.status,

                readAt:

                    contact.readAt

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to update contact status."

        );

    }

};

/*=========================================
=          Helper Functions               =
=========================================*/

exports.isContactRead = function(

    contact

){

    return contact.status === "read";

};

exports.hasReply = function(

    contact

){

    return !!contact.reply;

};

/*=========================================
=      Controller Initialization         =
=========================================*/

console.log(

    "Reply Contact Controller Ready"

);

console.log(

    "Mark As Read Controller Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/contactController.js
  Part 1B.2
  Get Unread Contacts + Contact Statistics
==================================================*/

"use strict";

/*=========================================
=         Get Unread Contacts             =
=========================================*/

exports.getUnreadContacts = async (

    req,

    res

) => {

    try{

        /*==============================
          Fetch Unread Contacts
        ==============================*/

        const contacts =

            await Contact.find({

                status: "unread"

            })

            .sort({

                createdAt: -1

            });

        return successResponse(

            res,

            200,

            "Unread contacts fetched successfully.",

            {

                total:

                    contacts.length,

                contacts

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch unread contacts."

        );

    }

};

/*=========================================
=         Contact Statistics              =
=========================================*/

exports.contactStatistics = async (

    req,

    res

) => {

    try{

        const totalContacts =

            await Contact.countDocuments();

        const unreadContacts =

            await Contact.countDocuments({

                status: "unread"

            });

        const readContacts =

            await Contact.countDocuments({

                status: "read"

            });

        const repliedContacts =

            await Contact.countDocuments({

                status: "replied"

            });

        const pendingContacts =

            await Contact.countDocuments({

                status: "pending"

            });

        return successResponse(

            res,

            200,

            "Contact statistics fetched successfully.",

            {

                totalContacts,

                unreadContacts,

                readContacts,

                repliedContacts,

                pendingContacts

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch contact statistics."

        );

    }

};

/*=========================================
=          Statistics Helpers             =
=========================================*/

exports.countUnreadContacts =

async ()=>{

    return await Contact.countDocuments({

        status:"unread"

    });

};

exports.countReadContacts =

async ()=>{

    return await Contact.countDocuments({

        status:"read"

    });

};

/*=========================================
=      Controller Initialization         =
=========================================*/

console.log(

    "Unread Contacts Controller Ready"

);

console.log(

    "Contact Statistics Controller Ready"

);

/*==================================================
  CodeNova Technologies
  backend/controllers/contactController.js
  Part 1B.3
  Helper Functions + Export Information
==================================================*/

"use strict";

/*=========================================
=          Helper Functions               =
=========================================*/

/* Find Contact By Email */

exports.findContactByEmail = async (

    email

) => {

    return await Contact.findOne({

        email

    });

};

/* Find Contact By ID */

exports.findContactById = async (

    id

) => {

    return await Contact.findById(id);

};

/* Count Contacts */

exports.countContacts = async () => {

    return await Contact.countDocuments();

};

/* Check Contact Exists */

exports.contactExists = async (

    email

) => {

    const contact =

        await Contact.findOne({

            email

        });

    return !!contact;

};

/* Format Contact */

exports.formatContact = function(

    contact

){

    return {

        id:

            contact._id,

        name:

            contact.name,

        email:

            contact.email,

        phone:

            contact.phone,

        subject:

            contact.subject,

        status:

            contact.status,

        createdAt:

            contact.createdAt

    };

};

/*=========================================
=         Validation Helpers              =
=========================================*/

exports.isUnread = function(

    contact

){

    return contact.status === "unread";

};

exports.isReplied = function(

    contact

){

    return contact.status === "replied";

};

exports.currentTimestamp = function(){

    return new Date()

        .toISOString();

};

/*=========================================
=       Controller Information            =
=========================================*/

const ControllerInfo = {

    name:

        "Contact Controller",

    version:

        "1.0.0",

    company:

        "CodeNova Technologies",

    framework:

        "Express.js",

    initialized:

        true

};

console.log(

    "===================================="

);

console.log(

    "Contact Controller Loaded"

);

console.table(

    ControllerInfo

);

console.log(

    "Available Controllers"

);

console.log("✓ submitContact");
console.log("✓ getAllContacts");
console.log("✓ getContactById");
console.log("✓ updateContact");
console.log("✓ deleteContact");
console.log("✓ searchContacts");
console.log("✓ replyToContact");
console.log("✓ markAsRead");
console.log("✓ getUnreadContacts");
console.log("✓ contactStatistics");

console.log(

    "===================================="

);

