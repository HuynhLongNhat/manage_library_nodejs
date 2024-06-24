import db from "../models/index"

import {
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword,
} from "../service/loginRegisterService";
const getAllStaff = async () => {
    try {
        let libraryStaff = await db.libraryStaff.findAll({
            order: [["id", "DESC"]],
            attributes: { exclude: ['password'] },

        });

        if (libraryStaff) {
            return {
                EM: "Tải danh sách người dùng thành công!",
                EC: 0,
                DT: libraryStaff,
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

const createNewStaff = async (data) => {
    try {
        //validate
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "Email này đã tồn tại trong hệ thống!",
                EC: -1,
                DT: "email",
            };
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "Số điện thoaị này đã tồn tại trong hệ thống!",
                EC: -1,
                DT: "phone",
            };
        }

        // hash password
        let hashPassword = hashUserPassword(data.password);

        let libraryStaff = await db.libraryStaff.create({
            name: data.name,
            password: hashPassword,
            phone: data.phone,
            admin: 1,
            email: data.email,
            address: data.address,
            gender: data.gender,

        });
        if (libraryStaff) {
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
};


const updateStaff = async (data) => {

    try {

        //update
        let res = await db.libraryStaff.update({
            name: data.name,

            address: data.address,
            gender: data.gender,

        },
            {
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

const deleteStaff = async (id) => {

    try {
        let data = await db.libraryStaff.findOne({
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
        await db.libraryStaff.destroy({
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

    getAllStaff,
    createNewStaff,
    updateStaff,
    deleteStaff,
};
