import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PilihKelas = () => {
    const { matpelId } = useParams();
    const [kelasList, setKelasList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/guru/kelas')
            .then(response => {
                setKelasList(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching kelas:', error);
            });
    }, []);

    const handlePilihKelas = (kelas) => {
        navigate(`/input-nilai/${matpelId}/${kelas.id}`); // Navigasi ke halaman input nilai
    };

    return (
        <div>
            <h1>Pilih Kelas</h1>
            <ul>
                {kelasList.map((kelas) => (
                    <li key={kelas.id} onClick={() => handlePilihKelas(kelas)}>
                        {kelas.nama}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PilihKelas;
