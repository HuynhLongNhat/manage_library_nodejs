import readerService from "../service/readerService"

const readFunc = async (req, res) => {
    try {

        let data = await readerService.getAllUser();
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
        let data = await readerService.createNewUser(req.body);

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
        let data = await readerService.updateUser(req.body);

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
        let data = await readerService.deleteUser(req.params.id);
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