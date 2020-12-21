const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id : {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    salt : {
        type : String,
        required: true,
    }
});

// mongooseAutoInc.initialize( mongoose.createConnection('mongodb://localhost:27017/user',{
//     useFindAndModify : false,
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
// })); // This is important. You can remove initialization in different file
// userSchema.plugin(mongooseAutoInc.plugin, 'user');
// module.exports = mongoose.model('user',userSchema);

userSchema.plugin(mongooseAutoInc.plugin,'user');
module.exports = mongoose.model('user',userSchema);


