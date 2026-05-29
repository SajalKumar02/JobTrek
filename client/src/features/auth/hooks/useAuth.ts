import { useContext } from "react"
import { AuthContext } from "../../../app/providers/AuthProvider";

export const useAuth = () => {
    const {
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        updateUserProfile,
        checkAccessToken
    } = useContext(AuthContext);

    return {
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        updateUserProfile,
        checkAccessToken
    }
}