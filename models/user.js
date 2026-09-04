const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto")

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "images/user.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    const user = this

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex")
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex")
    user.salt = salt
    user.password = hashedPassword
})

const User = model("user", userSchema);
module.exports = User;