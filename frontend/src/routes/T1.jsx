import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

    return null;
};

export default RedirectToHome;
