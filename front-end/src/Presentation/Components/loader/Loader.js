import "./Loader.css"

function Loader(props){

    return (
        <div className={props.className?"loader "+props.className:"loader"}></div>
    )

}


export default Loader;