import {NextFunction,Request,Response,Router} from 'express';
import DataController from '../../controllers/Data/data';
const multer = require('multer')

const storage = multer.diskStorage({destination: (req:Request,file:any,cb:Function)=>{
                                        cb(null,'../Data/uploads/')
                                    },
                            filename:(req:Request,file:any,cb:Function)=>{
                                    cb(null,"input.csv")
                                }
})

const upload = multer({ storage: storage});


class DataRouter{
    private data_router = Router()
    private controller = new DataController()

    get router(){
        return this.data_router;
    }

    constructor(){
        this.configure()
    }

    private configure(){
        this.data_router.get('/',(req:Request,res:Response,nex:NextFunction)=>{
            res.status(200).json({status:"success"})
        })

        this.data_router.post('/',upload.single('file'),(req:Request,res:Response,nex:NextFunction)=>{
            res.status(200).json(this.controller.process())
        })
    }


}


export default DataRouter