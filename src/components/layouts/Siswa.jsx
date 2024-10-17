import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function Siswa(props) {
  return (
    <>
      <div id="root">
        <div className="main-content">
          <Navbar />
          <Sidebar />
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
}
