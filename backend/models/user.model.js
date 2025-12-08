import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    avatar: {
        type: String,
        default: null
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
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