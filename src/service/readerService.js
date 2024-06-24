import db from "../models/index"

const getAllUser = async () => {
    try {
        let reader = await db.reader.findAll({
            order: [["id", "DESC"]],

        });

        if (reader) {
            return {
                EM: "Tải danh sách người dùng thành công!",
                EC: 0,
                DT: reader,
            };
        } else {
            return {
                EM: "Danh sách người dùng trống!",
                EC: -1,
                DT: [],
            };
        }
    } catch (error) {
        console.log("check error", error);
        return {
            EM: "Đã có lỗi ở trong hệ thống!",
            EC: 1,
            DT: [],
        };
    }
};

const createNewUser = async (data) => {
    try {


        // hash password


        let reader = await db.reader.create({

            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            gender: data.gender,
        });
        if (reader) {
            return {
                EM: "Tạo mới người dùng thành công!",
                EC: 0,
                DT: [],
            };
        }
    } catch (error) {
        console.log("check error :", error);
        return {
            EM: "Error from server",
            EC: -1,
            DT: "",
        };
    }
}



const updateUser = async (data) => {
    console.log('data ,', data)
    try {
        //update
        let res = await db.reader.update({

            name: data.name,
            address: data.address,
            gender: data.gender,

        }, {
            where: {
                id: data.id,
            },
        }

        );
        if (res) {

            return {
                EM: 'Cập nhật người dùng thành công',
                EC: 0,
                DT: ""
            }
        }

    } catch (error) {
        console.log("check error :", error);
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống! ',
            EC: 1,
            DT: []
        }
    }
};

const deleteUser = async (id) => {

    console.log('id', id)
    try {
        let data = await db.reader.findOne({
            where: {
                id: id
            }
        })
        if (!data) {
            return ({
                EC: 2,
                EM: "Người dùng không tổn tại!",
                DT: {}
            })
        }
        await db.reader.destroy({
            where: {
                id: id
            }
        })
        return ({
            EC: 0,
            EM: "Xóa người dùng thành công!",
            DT: {}
        })
    } catch (error) {
        console.log('error', error)
        return ({
            EC: -1,
            EM: "Đã có lỗi xảy ra ở hệ thống!",
            DT: {}
        })
    }
};


module.exports = {

    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
};
