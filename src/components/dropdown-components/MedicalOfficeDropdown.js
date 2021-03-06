import React, { useState, useEffect } from 'react'
import Axios from 'axios';

function MedicalOfficeDropdown(props) {
    const [medicalOffices, setMedicalOffices] = useState([]);
    const [singleMedicalOffice, setSingleMedicalOffice] = useState([]);

    useEffect(function () {
        Axios.get('http://localhost:8080/app/medical-offices/all')
            .then((response) => setMedicalOffices(response.data))
            .then((error) => console.log(error));
    }, []);

    const handleChange = (event) => {
        props.handleMedicalOffice(event.target.value);
        console.log(event.target.value);
    }

    return (
        <select 
            id="medical_office_id"
            name="medical_office_id"
            className="form-control"
            value={medicalOffices.medical_office_id}
            type="number"
            onChange={handleChange}
        >
            <option value="0">Select A Medical Office</option>
            {medicalOffices.map((medicalOffice) => (
                <option key={medicalOffice.medicalOfficeId} value={medicalOffice.medicalOfficeId}>
                    {medicalOffice.name}
                </option>
            ))}
        </select>
    );
}

export default MedicalOfficeDropdown;