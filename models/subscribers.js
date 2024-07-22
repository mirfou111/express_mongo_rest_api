const mongoose = require('mongoose');
const { format } = require('date-fns');

const subscriberSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    
    lastname: {
        type: String,
        required: true,
    },
    subscriberToChannel:{
        type: String,
        required: true,
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now,
        // get: (date) => format(date, 'yyyy-MM-dd HH:mm:ss')
    }

}, 
// {   toJSON: 
//         { getters: true }, 
//     toObject: 
//         { getters: true } 
// }

);

// Surcharge de la méthode toJSON pour formater la date
subscriberSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.subscribeDate = format(obj.subscribeDate, 'yyyy-MM-dd HH:mm:ss'); // Formater la date
    return obj;
};

module.exports = mongoose.model('Subscriber', subscriberSchema)