import { Button } from "antd";
import "./pages.css"
import { useNavigate } from "react-router-dom";

export default function FailBooking() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    }
    return(
        <div className="failContainer">
            <h1 className="title-payment-fail">Payment Failed</h1>
            <p className="subtitle-payment-fail">Seems like there was some trouble. <br />We can't complete your purchase at this time </p>
            <img src="/Fail.png" alt="Fail payment" className="img-payment-fail"/> <br/>
            <Button className="button-payment-fail" onClick={handleBackToHome}>Back to Home</Button>
        </div>
    )
}