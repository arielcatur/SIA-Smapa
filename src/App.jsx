import "./App.css";
import Login from "./components/Login";
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
import { DataMataPelajaran } from "./components/admin/DataMataPelajaran";
import Guru from "./components/layouts/Guru";
import { GlobalProvider } from "./context/GlobalContext";
import Admin from "./components/layouts/Admin";
import TambahSiswa from "./components/admin/TambahSiswa";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileGuru from "./components/guru/ProfileGuru";
import WaliMurid from "./components/layouts/WaliMurid";
import { DataGuru } from "./components/admin/DataGuru";
import { NilaiUtsWali } from "./components/wali/NilaiUtsWali";
import { NilaiUasWali } from "./components/wali/NilaiUasWali";
import { DataWaliSiswa } from "./components/admin/DataWali";
import TambahGuru from "./components/admin/TambahGuru";
import ProfileWali from "./components/wali/ProfileWali";
import ProfileAdmin from "./components/admin/ProfileAdmin";
import ChangePassSiswa from "./components/ChangePass";
import { TambahJadwal } from "./components/admin/TambahJadwal";
import TambahWali from "./components/admin/TambahWali";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Login />
              }
            />
            
            <Route
              path="/changepass"
              element={
                <ChangePassSiswa />
              }
            />

            {/*=============== SISWA ===============*/}
            <Route
              path="/homesiswa"
              element={
                <ProtectedRoute requiredRole="siswa">
                  <Siswa>
                    <AbsenSiswa />
                  </Siswa>
                </ProtectedRoute>
              }
            />

            <Route
              path="/daftarguru"
              element={
                <ProtectedRoute requiredRole="siswa">
                  <Siswa>
                    <DaftarGuru />
                  </Siswa>
                </ProtectedRoute>
              }
            />

            <Route
              path="/jadwalpelajaran"
              element={
                <ProtectedRoute requiredRole="siswa">
                  <Siswa>
                    <JadwalPelajaran />
                  </Siswa>
                </ProtectedRoute>
              }
            />

            <Route
              path="/nilaiuts"
              element={
                <ProtectedRoute requiredRole="siswa">
                  <Siswa>
                    <NilaiUTS />
                  </Siswa>
                </ProtectedRoute>
              }
            />

            <Route
              path="/nilaiuas"
              element={
                <ProtectedRoute requiredRole="siswa">
                  <Siswa>
                    <NilaiUAS />
                  </Siswa>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profilesiswa"
              element={
                <ProtectedRoute requiredRole="siswa">
                  <Siswa>
                    <ProfileSiswa />
                  </Siswa>
                </ProtectedRoute>
              }
            />

            {/*=============== WALI ===============*/}
            <Route
              path="/homewali"
              element={
                <ProtectedRoute requiredRole="wali murid">
                  <WaliMurid>
                    <HomeWali />
                  </WaliMurid>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profilewali"
              element={
                <ProtectedRoute requiredRole="wali murid">
                  <WaliMurid>
                    <ProfileWali />
                  </WaliMurid>
                </ProtectedRoute>
              }
            />

            <Route
              path="/jadwalpelajaranwali"
              element={
                <ProtectedRoute requiredRole="wali murid">
                  <WaliMurid>
                    <JadwalPelajaranWM />
                  </WaliMurid>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dataabsensi"
              element={
                <ProtectedRoute requiredRole="wali murid">
                  <WaliMurid>
                    <DataAbsensiWM />
                  </WaliMurid>
                </ProtectedRoute>
              }
            />
            <Route
              path="/nilaiutswali"
              element={
                <ProtectedRoute requiredRole="wali murid">
                  <WaliMurid>
                    <NilaiUtsWali />
                  </WaliMurid>
                </ProtectedRoute>
              }
            />
            <Route
              path="/nilaiuaswali"
              element={
                <ProtectedRoute requiredRole="wali murid">
                  <WaliMurid>
                    <NilaiUasWali />
                  </WaliMurid>
                </ProtectedRoute>
              }
            />

            {/*=============== GURU  ===============*/}

            <Route
              path="/homeguru"
              element={
                <ProtectedRoute requiredRole="guru">
                  <Guru>
                    <HomeGuru />
                  </Guru>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profileguru"
              element={
                <ProtectedRoute requiredRole="guru">
                  <Guru>
                    <ProfileGuru />
                  </Guru>
                </ProtectedRoute>
              }
            />

            <Route
              path="/jadwalmengajarguru"
              element={
                <ProtectedRoute requiredRole="guru">
                  <Guru>
                    <JadwalMengajarGuru />
                  </Guru>
                </ProtectedRoute>
              }
            />

            <Route
              path="/daftarsiswa"
              element={
                <ProtectedRoute requiredRole="guru">
                  <Guru>
                    <DaftarSiswa />
                  </Guru>
                </ProtectedRoute>
              }
            />

            <Route
              path="/inputnilaiuts"
              element={
                <ProtectedRoute requiredRole="guru">
                  <Guru>
                    <InputNilaiUTS />
                  </Guru>
                </ProtectedRoute>
              }
            />

            <Route
              path="/nilaiutsguru"
              element={
                <ProtectedRoute requiredRole="guru">
                  <Guru>
                    <NilaiUtsGuru />
                  </Guru>
                </ProtectedRoute>
              }
            />

            {/*=============== ADMIN ===============*/}

            <Route
              path="/homeadmin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <HomeAdmin />
                  </Admin>
                  </ProtectedRoute>
              }
            />
            
            <Route
              path="/profileadmin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <ProfileAdmin />
                  </Admin>
                  </ProtectedRoute>
              }
            />

            <Route
              path="/datasiswa"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <DataSiswa />
                  </Admin>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dataguru"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <DataGuru />
                  </Admin>
                </ProtectedRoute>
              }
            />

            <Route
              path="/tambahguru"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <TambahGuru />
                  </Admin>
                </ProtectedRoute>
              }
            />

            <Route
              path="/datawalisiswa"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <DataWaliSiswa />
                  </Admin>
                </ProtectedRoute>
              }
            />

            <Route
              path="/tambahdatakelas"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <TambahDataKelas />
                  </Admin>
                </ProtectedRoute>
              }
            />

            <Route
              path="/absenbyadmin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <AbsenByAdmin />
                  </Admin>
                </ProtectedRoute>
              }
            />
            <Route
              path="/datamatapelajaran"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <DataMataPelajaran />
                  </Admin>
                </ProtectedRoute>
              }
            />

            <Route
              path="/tambahsiswa"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <TambahSiswa />
                  </Admin>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/tambahjadwal"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <TambahJadwal />
                  </Admin>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/tambahwali"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin>
                    <TambahWali />
                  </Admin>
                </ProtectedRoute>
              }
            />

          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}
