import { Button } from "antd";
import "./pages.css"
import { useNavigate } from "react-router-dom";

export default function SuccessBooking() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    }
    return(
        <div className="successfulContainer">
            <h1 className="title-payment">Payment successful</h1>
            <p className="subtitle-payment">Your booking appointment is finished. Congratulations</p>
            <img src="/Successful.png" alt="Successful payment" className="img-payment-success"/> <br/>
            <Button className="button-payment-success" onClick={handleBackToHome}>Back to Home</Button>
        </div>
    )
}