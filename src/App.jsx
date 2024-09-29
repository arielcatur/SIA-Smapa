import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import HomeSiswa from "./components/siswa/HomeSiswa";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Siswa from "./components/layouts/Siswa";
import { AbsenSiswa } from "./components/siswa/AbsenSiswa";
import { DaftarGuru } from "./components/siswa/DaftarGuru";
import { JadwalPelajaran } from "./components/siswa/JadwalPelajaran";
import { NilaiUTS } from "./components/siswa/NilaiUTS";
import { NilaiUAS } from "./components/siswa/NilaiUAS";
import ProfileSiswa from "./components/siswa/ProfileSiswa";
import { HomeWali } from "./components/wali/HomeWali";
import { DataAbsensiWM } from "./components/wali/DataAbsensiWM";
import { JadwalPelajaranWM } from "./components/wali/JadwalPelajaranWM";
import { HomeGuru } from "./components/guru/HomeGuru";
import { JadwalMengajarGuru } from "./components/guru/JadwalMengajarGuru";
import { DaftarSiswa } from "./components/guru/DaftarSiswa";
import { InputNilaiUTS } from "./components/guru/InputNilaiUTS";
import { NilaiUtsGuru } from "./components/guru/NilaiUtsGuru";
import { HomeAdmin } from "./components/admin/HomeAdmin";
import { DataSiswa } from "./components/admin/DataSiswa";
import { TambahDataKelas } from "./components/admin/TambahDataKelas";
import { AbsenByAdmin } from "./components/admin/AbsenByAdmin";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />}> */}
          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={<Login />} />

          {/*=============== SISWA ===============*/}
          <Route
            path="/homesiswa"
            element={
              <Siswa>
                <AbsenSiswa />
              </Siswa>
            }
          />

          <Route
            path="/daftarguru"
            element={
              <Siswa>
                <DaftarGuru />
              </Siswa>
            }
          />

          <Route
            path="/jadwalpelajaran"
            element={
              <Siswa>
                <JadwalPelajaran />
              </Siswa>
            }
          />

          <Route
            path="/nilaiuts"
            element={
              <Siswa>
                <NilaiUTS />
              </Siswa>
            }
          />

          <Route
            path="/nilaiuas"
            element={
              <Siswa>
                <NilaiUAS />
              </Siswa>
            }
          />

          <Route
            path="/profilesiswa"
            element={
              <Siswa>
                <ProfileSiswa />
              </Siswa>
            }
          />

          {/*=============== WALI ===============*/}
          <Route
            path="/homewali"
            element={
              <Siswa>
                <HomeWali />
              </Siswa>
            }
          />

          <Route
            path="/jadwalpelajaranwali"
            element={
              <Siswa>
                <JadwalPelajaranWM />
              </Siswa>
            }
          />

          <Route
            path="/dataabsensi"
            element={
              <Siswa>
                <DataAbsensiWM />
              </Siswa>
            }
          />

          {/*=============== GURU  ===============*/}

          <Route
            path="/homeguru"
            element={
              <Siswa>
                <HomeGuru />
              </Siswa>
            }
          />
          
          <Route
            path="/jadwalmengajarguru"
            element={
              <Siswa>
                <JadwalMengajarGuru />
              </Siswa>
            }
          />
          
          <Route
            path="/daftarsiswa"
            element={
              <Siswa>
                <DaftarSiswa />
              </Siswa>
            }
          />
          
          <Route
            path="/inputnilaiuts"
            element={
              <Siswa>
                <InputNilaiUTS />
              </Siswa>
            }
          />
          
          <Route
            path="/nilaiutsguru"
            element={
              <Siswa>
                <NilaiUtsGuru />
              </Siswa>
            }
          />

          {/*=============== ADMIN ===============*/}
          
          <Route
            path="/homeadmin"
            element={
              <Siswa>
                <HomeAdmin />
              </Siswa>
            }
          />
          
          <Route
            path="/datasiswa"
            element={
              <Siswa>
                <DataSiswa />
              </Siswa>
            }
          />
          
          <Route
            path="/tambahdatakelas"
            element={
              <Siswa>
                <TambahDataKelas />
              </Siswa>
            }
          />
          
          <Route
            path="/absenbyadmin"
            element={
              <Siswa>
                <AbsenByAdmin />
              </Siswa>
            }
          />

          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
