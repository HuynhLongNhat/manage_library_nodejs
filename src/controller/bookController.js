import bookService from "../service/bookService"

const readFunc = async (req, res) => {
    try {

        let data = await bookService.getAllBook();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });

    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const createFunc = async (req, res) => {

    try {
        let data = await bookService.createNewBook(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const updateFunc = async (req, res) => {

    try {
        let data = await bookService.updateBook(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};
const deleteFunc = async (req, res) => {

    try {
        let data = await bookService.deleteBook(req.params.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log("check error", error);
        return res.status(404).json({
            EM: "Error from server",
            EC: "-1",
            DT: "",
        });
    }
};



module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
}