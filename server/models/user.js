const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6    
    },
    photos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photo"
        }
    ]
}, {
    timestamps: true
});


ModelSchema.methods.getData = function(){
    return {
        id: this._id,
        name: this.name,
        email: this.email,      
        photos: this.photos
    }
}

ModelSchema.methods.signJwt = function(){
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
}

ModelSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const Model = mongoose.model('User', ModelSchema);

ModelSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

ModelSchema.set('toJSON', {virtuals: true});

module.exports = Model;
