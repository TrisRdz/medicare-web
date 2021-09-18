import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../../store/userAtom";
import apiCall from "../../utils/api";
import { parseAPIResponseSymptoms } from '../../utils/formatter';
import { symptoms as allSymptoms } from '../../constants/symptoms';

import './profile.css';
import { useUserData } from "../../store/useUserData";

const AppointmentField = ({ label, value }) => (
    <div className='appointmentField'>
        <p className='appointmentLabel'>{label}</p>
        <p className='appointmentValue'>{value}</p>
    </div>
);

const UserPage = () => {

    const [user, setUser] = useRecoilState(userAtom);
    const [appointments, setAppointments] = useState(null);
    const { updateUserData, userData } = useUserData();
    const { role, appointment } = userData.user || {};
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

    useEffect(() => {
        if (role === 'doctor') {
            getAppointments();
        }
    }, [role])

    useEffect(() => {
        if (!user.authToken) {
            history.replace('/');
        } else {
            updateUserData();
        }
    }, []);

    const doctorsUI = (
        <>
            {appointments && <h2>Appointments</h2>}
            {appointments && appointments.map((appointment) => {
                let symptomsString = appointment.symptoms.map((symptom) => allSymptoms.find((symptomInAllSymptoms) => symptomInAllSymptoms.value === symptom).label);
                symptomsString = symptomsString.join(', ');
                return (
                    <div className='appointmentCard'>
                        <AppointmentField label="Patient's Name" value={appointment.patient_name} />
                        <AppointmentField label='Predicted Disease' value={appointment.predicted_disease} />
                        <AppointmentField label='Symptoms' value={symptomsString} />
                    </div>
                )
            }
            )}
        </>
    );

    const userUI = () => {
        let symptomsString = '';
        if (appointment) {
            symptomsString = appointment.symptoms.map((symptom) => allSymptoms.find((symptomInAllSymptoms) => symptomInAllSymptoms.value === symptom).label);
            symptomsString = symptomsString.join(', ');
        }
        return (
            <>
                <h2>Requested Appointment</h2>
                {!appointment && <p>Currently you have no appointment scheduled</p>}
                {appointment && <div className='appointmentCard'>
                    <AppointmentField label="Doctor's Name" value={appointment.doctor_id} />
                    <AppointmentField label='Predicted Disease' value={appointment.predicted_disease} />
                    <AppointmentField label='Symptoms' value={symptomsString} />
                </div>}
            </>
        )
    }

    return (
        <div>
            {role === 'doctor' && doctorsUI}
            {role === 'user' && userUI()}
        </div>
    )

}

export default UserPage;
