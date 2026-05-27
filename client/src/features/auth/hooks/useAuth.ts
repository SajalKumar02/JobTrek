import { useContext } from "react"
import { AuthContext } from "../../../app/providers/AuthProvider";

export const useAuth = () => {
    const {
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        getUserProfile,
        updateUserProfile
    } = useContext(AuthContext);

    return {
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        getUserProfile,
        updateUserProfile
    }
}