const express = require("express");
const router = express.Router();
const schemaController = require("../controllers/Schema");
//const uploadController = require("../controllers/upload");
let routes = app => {
    router.get("/", schemaController.getHome);
    router.post("/upload", schemaController.uploadFiles);
    router.get("/files", schemaController.getListFiles);
    router.get("/files/:name", schemaController.download);
    return app.use("/uploads", router);
};
module.exports = routes;