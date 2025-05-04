import { Router } from "express";
import { upload } from "../../global.js";

const uploadRouter = Router();

// const upload = multer({ storage });

uploadRouter
  .post("/single", upload.single("file"), async (req, res) => {
    console.log("file => ", req.file);
    res.end();
  })
  .post("/files", upload.array("files", 5), async (req, res) => {
    console.log("file => ", req.file);
    res.end();
  });

export default uploadRouter;
