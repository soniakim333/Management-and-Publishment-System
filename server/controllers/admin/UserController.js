const JWT = require("../../Util/JWT")
const UserService = require("../../service/admin/UserService")
require("../../Util/JWT")

const UserController = {
    login: async (req, res) => {

        let result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "username or password not match"
            })
        } else {
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "1d")

            res.header("Authorization", token)

            res.send({
                ActionType: "OK",
                data: {
                    username: result[0].username,
                    //use 0,1,2 represent the gender
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    //administrator:1, editor:2
                    role: result[0].role
                }
            })
        }
    },

    upload: async (req, res) => {

        //service model for upgrating the data
        const { username, gender, introduction } = req.body;
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ""

        let payload = JWT.verify(token)

        await UserService.upload(
            {
                _id: payload._id,
                username,
                gender: Number(gender),
                introduction,
                avatar
            })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username,
                    introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username,
                    introduction,
                    gender: Number(gender),
                }
            })
        }
    },
    add: async (req, res) => {
        const { username, gender, introduction, role, password } = req.body;
        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ""

        await UserService.add(
            {
                username,
                gender: Number(gender),
                introduction,
                avatar,
                role: Number(role),
                password
            })

        res.send({
            ActionType: "OK",
        })
    },
    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    putList: async (req, res) => {
        const result = await UserService.putList(req.body)
        res.send({
            ActionType: "OK",
        })
    },

    delList: async (req, res) => {
        const result = await UserService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
        })
    },
}


module.exports = UserController