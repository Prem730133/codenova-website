/*==================================================
  CodeNova Technologies
  backend/models/Payment.js
  Part 1A.1
  Imports + Payment Schema + Customer Information
==================================================*/

"use strict";

/*=========================================
=            Required Modules             =
=========================================*/

const mongoose = require("mongoose");

/*=========================================
=         Customer Information            =
=========================================*/

const CustomerSchema = new mongoose.Schema({

    fullName:{

        type:String,

        required:true,

        trim:true,

        maxlength:100

    },

    email:{

        type:String,

        required:true,

        lowercase:true,

        trim:true

    },

    phone:{

        type:String,

        required:true,

        trim:true

    },

    company:{

        type:String,

        default:""

    },

    address:{

        type:String,

        default:""

    },

    city:{

        type:String,

        default:""

    },

    state:{

        type:String,

        default:""

    },

    country:{

        type:String,

        default:"India"

    },

    postalCode:{

        type:String,

        default:""

    }

},{ _id:false });

/*=========================================
=            Payment Schema               =
=========================================*/

const PaymentSchema = new mongoose.Schema({

    /*-------------------------------------
      User Reference
    -------------------------------------*/

    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },

    /*-------------------------------------
      Pricing Plan Reference
    -------------------------------------*/

    plan:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"Pricing",

        required:true

    },

    /*-------------------------------------
      Customer Information
    -------------------------------------*/

    customer:{

        type:CustomerSchema,

        required:true

    },

    /*-------------------------------------
      Basic Payment Information
    -------------------------------------*/

    amount:{

        type:Number,

        required:true,

        min:0

    },

    currency:{

        type:String,

        default:"INR",

        uppercase:true

    },

    description:{

        type:String,

        trim:true,

        default:"CodeNova Technologies Payment"

    }

},

{

    timestamps:true,

    versionKey:false

});

/*=========================================
=            Database Indexes             =
=========================================*/

PaymentSchema.index({

    user:1

});

PaymentSchema.index({

    plan:1

});

PaymentSchema.index({

    "customer.email":1

});

/*=========================================
=      Model Ready For Next Part          =
=========================================*/

console.log(

    "Payment Schema Initialized"

);

/*==================================================
  Transaction Details + Payment Methods + Status
==================================================*/

"use strict";

/*=========================================
=         Transaction Details             =
=========================================*/

PaymentSchema.add({

    /*-------------------------------------
      Transaction Information
    -------------------------------------*/

    transactionId:{

        type:String,

        unique:true,

        required:true,

        trim:true

    },

    orderId:{

        type:String,

        required:true,

        trim:true

    },

    paymentId:{

        type:String,

        default:null

    },

    invoiceNumber:{

        type:String,

        default:null

    },

    gatewayOrderId:{

        type:String,

        default:null

    },

    gatewayPaymentId:{

        type:String,

        default:null

    },

    gatewaySignature:{

        type:String,

        default:null

    },

    /*-------------------------------------
      Payment Gateway
    -------------------------------------*/

    paymentGateway:{

        type:String,

        enum:[

            "Razorpay",

            "Stripe",

            "PayPal",

            "Cashfree",

            "PhonePe",

            "PayU"

        ],

        default:"Razorpay"

    },

    /*-------------------------------------
      Payment Method
    -------------------------------------*/

    paymentMethod:{

        type:String,

        enum:[

            "UPI",

            "Credit Card",

            "Debit Card",

            "Net Banking",

            "Wallet",

            "EMI"

        ],

        required:true

    },

    /*-------------------------------------
      Payment Status
    -------------------------------------*/

    paymentStatus:{

        type:String,

        enum:[

            "Pending",

            "Processing",

            "Success",

            "Failed",

            "Cancelled",

            "Refunded"

        ],

        default:"Pending"

    },

    /*-------------------------------------
      Additional Information
    -------------------------------------*/

    paymentDate:{

        type:Date,

        default:Date.now

    },

    remarks:{

        type:String,

        trim:true,

        default:""

    },

    failureReason:{

        type:String,

        default:""

    },

    refundedAmount:{

        type:Number,

        default:0

    },

    refundDate:{

        type:Date,

        default:null

    }

});

/*=========================================
=          Database Indexes               =
=========================================*/

PaymentSchema.index({

    transactionId:1

});

PaymentSchema.index({

    orderId:1

});

PaymentSchema.index({

    paymentStatus:1

});

PaymentSchema.index({

    paymentGateway:1

});

/*==================================================
  Instance Methods + Static Methods + Export
==================================================*/

"use strict";

/*=========================================
=         Instance Methods                =
=========================================*/

/* Mark Payment Successful */

PaymentSchema.methods.markAsSuccess = async function(){

    this.paymentStatus = "Success";

    this.paymentDate = new Date();

    return await this.save();

};

/* Mark Payment Failed */

PaymentSchema.methods.markAsFailed = async function(

    reason = "Payment Failed"

){

    this.paymentStatus = "Failed";

    this.failureReason = reason;

    return await this.save();

};

/* Process Refund */

PaymentSchema.methods.processRefund = async function(

    amount

){

    this.paymentStatus = "Refunded";

    this.refundedAmount = amount;

    this.refundDate = new Date();

    return await this.save();

};

/*=========================================
=          Static Methods                 =
=========================================*/

/* Find By Transaction ID */

PaymentSchema.statics.findTransaction = function(

    transactionId

){

    return this.findOne({

        transactionId

    });

};

/* Find Successful Payments */

PaymentSchema.statics.successPayments = function(){

    return this.find({

        paymentStatus:"Success"

    });

};

/* Total Revenue */

PaymentSchema.statics.totalRevenue = async function(){

    const result = await this.aggregate([

        {

            $match:{

                paymentStatus:"Success"

            }

        },

        {

            $group:{

                _id:null,

                total:{

                    $sum:"$amount"

                }

            }

        }

    ]);

    return result.length

        ? result[0].total

        : 0;

};

/*=========================================
=            Virtual Fields               =
=========================================*/

PaymentSchema.virtual(

    "isSuccessful"

).get(function(){

    return this.paymentStatus === "Success";

});

PaymentSchema.virtual(

    "isRefunded"

).get(function(){

    return this.paymentStatus === "Refunded";

});

/*=========================================
=          Pre Save Middleware            =
=========================================*/

PaymentSchema.pre(

    "save",

    function(next){

        this.updatedAt = new Date();

        next();

    }

);

/*=========================================
=            Create Model                 =
=========================================*/

const Payment = mongoose.model(

    "Payment",

    PaymentSchema

);

/*=========================================
=        Model Initialization             =
=========================================*/

console.log(

    "Payment Model Loaded"

);

console.log(

    "Instance Methods Ready"

);

console.log(

    "Static Methods Ready"

);

console.log(

    "Payment Schema Ready"

);

/*=========================================
=             Export Model                =
=========================================*/

module.exports = Payment;
