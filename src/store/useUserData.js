import { useRecoilState } from "recoil"
import { getUserDetails } from "../utils/services";
import userAtom from "./userAtom"
import { parseAPIResponseSymptoms } from "../utils/formatter";

export const useUserData = () => {
    const [userData, setUserData] = useRecoilState(userAtom);

    const updateUserData = async () => {
        const response = await getUserDetails();
        if (response.status === 200) {
            const { data } = response;
            setUserData({
                authToken: userData.authToken,
                user: {
                    ...data.my_info,
                    role: data.role,
                    appointment: data.appointment ? { ...data.appointment, symptoms: parseAPIResponseSymptoms(data.appointment.symptoms) } : null
                }
            });
        }
        return response;
    }

    return {
        userData,
        updateUserData,
        setUserData
    }

}