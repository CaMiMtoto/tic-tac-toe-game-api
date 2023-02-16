import express, {Request, Response} from "express";
import playGame from "../services/GameService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    let board: string = req.query.board as string;

    let results = playGame(board);

    return res.status(results.code).json(results.message);
});

export default router;