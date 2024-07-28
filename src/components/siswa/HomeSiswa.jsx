import Footer from "../Footer"
import Navbar from "../Navbar"
import Search from "../Search"
import Sidebar from "../Sidebar"
import { AbsenSiswa } from "./AbsenSiswa"
import { DaftarGuru } from "./DaftarGuru"
import { JadwalPelajaran } from "./JadwalPelajaran"
export default function HomeSiswa () {
    return (
        <>
            <Navbar/>
            <Sidebar/>
            {/* <AbsenSiswa/> */}
            {/* <JadwalPelajaran/> */}
            <DaftarGuru/>
            {/* <Search/> */}
            <Footer/>
        </>
    )
}