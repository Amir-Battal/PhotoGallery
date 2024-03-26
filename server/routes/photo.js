const { Router } = require("express");
const uploadMiddleware = require("../middlewares/MulterMiddleware");
const controller = require('../controllers/photoController');

const router = Router();

router.get("/get", controller.get);

router.get("/:id", controller.find);

router.get("/author/:id", controller.getByAuthorId);

router.post("/save", uploadMiddleware.single("photo"), controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

router.post("/:id/like", controller.likePhoto);

router.delete("/:id/like", controller.unlikePhoto);


module.exports = router;