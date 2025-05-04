import express from "express";
import playerRouter from "./players/player.router.js";

const PORT = 5500;
const server = express();

server.use(express.json());

server.use("/api/player", playerRouter);

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
