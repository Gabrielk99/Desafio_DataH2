import { Router } from "express";
import DataRouter from "./Data/DataRouter";

class MasterRouter{
    private masterRouter = Router();
    private dataRouter = new DataRouter();

    get router(){
        return this.masterRouter
    }

    constructor(){
        this.configure()
    }

    private configure (){
        this.masterRouter.use('/data',this.dataRouter.router)
    }

}

export default MasterRouter;
