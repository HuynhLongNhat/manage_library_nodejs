import db from "../models/index"

const getAllRequest = async () => {
    try {
        let data = await db.borrowingRecord.findAll({
            order: [["id", "DESC"]],
            include: [
                {
                    model: db.book,
                    as: "bookData",
                    attributes: ["name"]
                },
                {
                    model: db.reader,
                    as: "readerData",
                    attributes: ["name", "id"]
                },
            ],
            raw: false,
            nest: true,
        });

        if (data && data.length > 0) {
            return {
                EM: "Tải danh sách người dùng thành công!",
                EC: 0,
                DT: data,
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


const createNewRequest = async (data) => {

    try {
        let request = await db.borrowingRecord.create({
            readerId: data.readerId,
            bookId: data.bookId,
            quantity: data.quantity
        });
        if (request) {
            return {
                EM: "Tạo yêu cầu mượn sách thành công!",
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
    try {


        //update
        let res = await db.reader.update({
            code: data.code,
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

    getAllRequest,
    createNewRequest,
    updateUser,
    deleteUser,
};
