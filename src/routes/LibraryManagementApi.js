import express from "express";
import readerController from "../controller/readerController"
import libraryStaffController from "../controller/libraryStaffController"
import loginRegisterController from "../controller/loginRegisterController"
import bookController from "../controller/bookController";
import requestController from "../controller/requestController"
const router = express.Router();
const LibraryManagementApi = (app) => {

    router.post("/login", loginRegisterController.handleLoginUser);
    router.post("/register", loginRegisterController.registerNewUser);

    //library-staff
    router.get("/staff/read", libraryStaffController.readFunc);
    router.post("/staff/create", libraryStaffController.createFunc);
    router.put("/staff/update", libraryStaffController.updateFunc);
    router.delete("/staff/delete", libraryStaffController.deleteFunc);

    // reader 
    router.get("/reader/read", readerController.readFunc);
    router.post("/reader/create", readerController.createFunc);
    router.put("/reader/update", readerController.updateFunc);
    router.delete("/reader/delete", readerController.deleteFunc);


    // book
    router.get("/book/read", bookController.readFunc);
    router.post("/book/create", bookController.createFunc);
    router.put("/book/update", bookController.updateFunc);
    router.delete("/book/delete", bookController.deleteFunc);

    // request 
    router.get("/request/read", requestController.readFunc);
    router.post('/request/create', requestController.createFunc)
    return app.use('/', router)

}

export default LibraryManagementApi;