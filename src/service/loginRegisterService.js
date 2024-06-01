import db from "../models/index"
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};
const checkEmailExist = async (email) => {
    let libraryStaff = await db.libraryStaff.findOne({
        where: {
            email: email
        }
    })
    if (libraryStaff) {
        return true;
    }
    return false
}

const checkPhoneExist = async (phone) => {
    let libraryStaff = await db.libraryStaff.findOne({
        where: {
            phone: phone
        }
    })
    if (libraryStaff) {
        return true;
    }
    return false
}

const registerNewUser = async (data) => {
    try {
        // validate
        let isEmailExist = await checkEmailExist(data.email);
        let isPhoneExist = await checkPhoneExist(data.phone)
        if (isEmailExist === true) {
            return {
                EM: 'Email này đã được sử dụng!',
                EC: -1
            }
        }
        if (isPhoneExist === true) {
            return {
                EM: 'Số điện thoại này đã được sử dụng!',
                EC: -1
            }
        }
        //hash password
        let hashPassword = hashUserPassword(data.password)
        // create new libraryStaff 
        await db.libraryStaff.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            username: data.libraryStaffName,
            password: hashPassword,

        })
        return {
            EM: 'Tài khoản đăng kí thành công!',
            EC: 0,
            DT: []

        }
    } catch (error) {
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống!',
            EC: -2,
            DT: []

        }
    }
}

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
const handleLoginUser = async (data) => {
    try {
        let libraryStaff = await db.libraryStaff.findOne({
            where: {
                [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
            },
            attributes: {
                exclude: ['updatedAt']
            }
        })
        if (libraryStaff) {
            let isCorrectPassword = checkPassword(data.password, libraryStaff.password)
            if (isCorrectPassword === true) {
                return {
                    EM: 'Đăng nhập thành công!',
                    EC: 0,
                    DT: []
                }
            }
            return {
                EM: 'Email/số điện thoại hoặc mật khẩu của bạn không chính xác!',
                EC: -1,
                DT: []
            }
        }
    } catch (error) {
        console.log("Check error : ", error)
        return {
            EM: 'Đã có lỗi xảy ra ở hệ thống!',
            EC: -2,
            DT: []
        }
    }
}

module.exports = {
    registerNewUser,
    handleLoginUser,
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword
}