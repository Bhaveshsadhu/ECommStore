import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: null
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    });


User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    // Hashing logic can be added here
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

});
User.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
const UserModel = mongoose.model('User', User);
export default UserModel;