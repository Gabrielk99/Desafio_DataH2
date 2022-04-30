const exec = require("child_process").execSync;
const fs = require("fs")

class DataController{
    public process(){

        const script_dir = __dirname.replace('Application/dist/controllers/Data','Domain/python-scripts/core')
        const output_dir = __dirname.replace('Application/dist/controllers/Data','Data/processed/output.json')
        
        try{
            exec(`python3 main.py`,{cwd:script_dir})
            return{
                status:"success",
                message:"the process was success",
                res: JSON.parse(fs.readFileSync(output_dir,'utf8'))
            }
        }

        catch(err:any){
            return{
                status:"error",
                message:"the process fail.",
                res:null
            }
        }
    }
}

export default DataController