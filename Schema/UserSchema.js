import mongoose from 'mongoose'

const User = new mongoose.Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

export default mongoose.model('User', User);