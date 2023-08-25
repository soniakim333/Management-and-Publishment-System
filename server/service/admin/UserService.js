const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })
    },

    upload: async ({ _id, username, gender, introduction, avatar }) => {
        if (avatar) {
            return UserModel.updateOne({
                _id
            }, {
                username, gender, introduction, avatar
            })
        } else {
            return UserModel.updateOne({
                _id
            }, {
                username, gender, introduction
            })
        }
    },

    add: async ({ username, gender, introduction, avatar, role, password }) => {
        return UserModel.create({
            username, gender, introduction, avatar, role, password
        })
    },

    getList: async ({ id }) => {
        return id ? UserModel.find({ _id: id }, ["username", "introduction", "password", "role"]) : UserModel.find({}, ["username", "gender", "introduction", "avatar", "role"])
    },

    putList: async (body) => {
        return UserModel.updateOne({ _id: body._id }, body)
    },

    delList: async ({ _id }) => {
        return UserModel.deleteOne({ _id })
    },
}

module.exports = UserService