import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../../store/userAtom";
import apiCall from "../../utils/api";
import { parseAPIResponseSymptoms } from '../../utils/formatter';
import { symptoms as allSymptoms } from '../../constants/symptoms';

import './profile.css';

const AppointmentField = ({ label, value }) => (
    <div className='appointmentField'>
        <p className='appointmentLabel'>{label}</p>
        <p className='appointmentValue'>{value}</p>
    </div>
);

const UserPage = () => {

    const [user, setUser] = useRecoilState(userAtom);
    const [appointments, setAppointments] = useState(null);
    const history = useHistory();

    const getAppointments = async () => {
        const response = await apiCall({
            method: 'POST',
            url: 'doctor/show_patients',
            withAuth: true
        });
        if (response.data) {
            const formattedResponse = response.data.map((appointment) => {
                const formattedSymptoms = parseAPIResponseSymptoms(appointment.symptoms);
                return { ...appointment, symptoms: formattedSymptoms };
            })
            setAppointments(formattedResponse);
        }
    }

    const getUserDetails = async () => {
        const response = await apiCall({
            method: 'POST',
            url: '/me',
            withAuth: true
        });
    }

    useEffect(() => {
        if (!user.authToken) {
            history.replace('/');
        } else {
            getUserDetails();
            getAppointments();
        }
    }, []);

    const signOut = () => {
        setUser({
            authToken: null
        })
        history.replace('/');
    }

    return (
        <div>
            {appointments && <h2>Appointments</h2>}
            {appointments && appointments.map((appointment) => {
                let symptomsString = appointment.symptoms.map((symptom) => allSymptoms.find((symptomInAllSymptoms) => symptomInAllSymptoms.value === symptom).label);
                symptomsString = symptomsString.join(', ');
                return (
                    <div className='appointmentCard'>
                        <AppointmentField label='Patient Name' value={appointment.patient_name} />
                        <AppointmentField label='Predicted Disease' value={appointment.predicted_disease} />
                        <AppointmentField label='Symptoms' value={symptomsString} />
                    </div>
                )
            }
            )}
            <button onClick={signOut} style={{ marginTop: 50 }}>Sign Out</button>
        </div>
    )

}

export default UserPage;
