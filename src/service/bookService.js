import db from "../models/index"
const getAllBook = async () => {
    try {
        let book = await db.book.findAll({
            order: [["id", "DESC"]],

        });

        if (book) {
            return {
                EM: "Tải danh sách sách  thành công!",
                EC: 0,
                DT: book,
            };
        } else {
            return {
                EM: "Danh sách trống!",
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


const createNewBook = async (data,) => {
    try {


        let book = await db.book.create({
            name: data.name,
            author: data.author,
            genre: data.genre,

            publicYear: data.publicYear,
            quantity: data.quantity,

        });
        if (book) {
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


const updateBook = async (data) => {
    try {
        //update
        let res = await db.book.update({
            name: data.name,
            author: data.author,
            genre: data.genre,
            publicYear: data.publicYear,
            quantity: data.quantity,

        },

            {
                where: {
                    id: data.id,
                },
            }
        );
        if (res) {
            return {
                EM: 'Cập nhật sách thành công',
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
}


const deleteBook = async (id) => {

    try {
        let data = await db.book.findOne({
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
        await db.book.destroy({
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

    getAllBook,
    createNewBook,
    updateBook,
    deleteBook,
};
