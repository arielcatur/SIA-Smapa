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

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />}> */}
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<Login />} />
            <Route 
              path="/homesiswa" 
              element={
                <Siswa>
                  <AbsenSiswa />
                </Siswa>
            }/>
            
            <Route 
              path="/daftarguru" 
              element={
                <Siswa>
                  <DaftarGuru />
                </Siswa>
            }/>
            
            <Route 
              path="/jadwalpelajaran" 
              element={
                <Siswa>
                  <JadwalPelajaran />
                </Siswa>
            }/>
            
            <Route 
              path="/nilaiuts" 
              element={
                <Siswa>
                  <NilaiUTS />
                </Siswa>
            }/>
            
            <Route 
              path="/nilaiuas" 
              element={
                <Siswa>
                  <NilaiUAS />
                </Siswa>
            }/>
            
            <Route 
              path="/profilesiswa" 
              element={
                <Siswa>
                  <ProfileSiswa />
                </Siswa>
            }/>

            {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
