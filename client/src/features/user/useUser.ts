import { useState } from "react"
import http from "../api/api";

export const useUser = () => {
    const [user, setUser] = useState();

    const getUserProfile = async () => {
        try {
            const response = await http.get("/user/me");
            if (response.data && response.data.success) {
                setUser(response.data.user);
            } else {
                throw new Error(response.data?.message || "Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    }

    const updateUserProfile = async (updatedProfile) => {
        try {
            const response = await http.patch("/user/profile", updatedProfile);
            if (response.data && response.data.success) {
                setUser(response.data.user);
            } else {
                throw new Error(response.data?.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    }

    return { user, getUserProfile, updateUserProfile };
}