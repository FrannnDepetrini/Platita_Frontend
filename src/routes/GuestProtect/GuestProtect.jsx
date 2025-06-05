import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider"
import { useEffect } from "react";

export default function GuestProtect ({ children }) {

    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
            navigate(-1, {replace:true});
            return null;
        }
    },[navigate, isAuthenticated])
    
    return children;
}