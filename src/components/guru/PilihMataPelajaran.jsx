import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PilihMataPelajaran = ({ onPilih }) => {
  const [jadwal, setJadwal] = useState([]);
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [kelas, setKelas] = useState('');

  useEffect(() => {
    // Mengambil jadwal mengajar dari API
    const fetchJadwal = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/guru/jadwal-mengajar');
        setJadwal(response.data.data);
      } catch (error) {
        console.error('Error fetching jadwal:', error);
      }
    };

    fetchJadwal();
  }, []);

  // Menampilkan opsi mata pelajaran yang diajarkan guru
  const mataPelajaranOptions = [...new Set(jadwal.map((item) => item.mataPelajaran.nama))];

  // Menampilkan kelas yang diajarkan berdasarkan mata pelajaran yang dipilih
  const kelasOptions = jadwal
    .filter((item) => item.mataPelajaran.nama === mataPelajaran)
    .map((item) => item.kelas.nama);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPilih({ mataPelajaran, kelas });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="mataPelajaran">Pilih Mata Pelajaran:</label>
      <select
        id="mataPelajaran"
        value={mataPelajaran}
        onChange={(e) => setMataPelajaran(e.target.value)}
      >
        <option value="">--Pilih Mata Pelajaran--</option>
        {mataPelajaranOptions.map((matpel, index) => (
          <option key={index} value={matpel}>
            {matpel}
          </option>
        ))}
      </select>

      {mataPelajaran && (
        <>
          <label htmlFor="kelas">Pilih Kelas:</label>
          <select id="kelas" value={kelas} onChange={(e) => setKelas(e.target.value)}>
            <option value="">--Pilih Kelas--</option>
            {kelasOptions.map((kelas, index) => (
              <option key={index} value={kelas}>
                {kelas}
              </option>
            ))}
          </select>
        </>
      )}

      <button type="submit">Lanjut</button>
    </form>
  );
};

export default PilihMataPelajaran;
