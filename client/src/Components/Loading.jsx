import Spinner from "react-bootstrap/Spinner";

function Loading(){
    return (
        <Spinner 
            animation="border"
            style={{
                display:"block",
                marginTop:"100px",
                marginLeft:"48%"
            }}
        >
        </Spinner>
    );
}

export default Loading;