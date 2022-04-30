import express,{Response,Request,NextFunction} from 'express';
import MasterRouter from './routers/MasterRouter'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const cors = require('cors');

dotenv.config({
    path:'.env'
})

class Server {
    public app = express();
    public router = new MasterRouter();
}

const server = new Server();

server.app.use(express.static(__dirname.replace("dist","build")));
server.app.get(/^(?!.api)/, (req, res) => {
    res.sendFile(__dirname.replace('/dist',"/build/index.html"));
});   

server.app.use(bodyParser.json());
server.app.use(cors());

server.app.use('/api',server.router.router);


((port = process.env.PORT || 3001)=>{
    server.app.listen(port,()=>{
        console.log(`to vivo na porta ${port}`)
    });
})();


