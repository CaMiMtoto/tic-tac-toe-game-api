import express, {Application, Request, Response} from 'express';
import dotenv from "dotenv";
import logger  from "morgan";
import  indexRoutes from "./routes/index";

dotenv.config();


const app: Application = express();
const port: any = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// serve static files from public folder
app.use(express.static('public'));

app.use('/', indexRoutes);


app.listen(port, /*"192.168.162.112", */() => {
    console.log(`Example app listening at http://localhost:${port}`);
});

export default app;