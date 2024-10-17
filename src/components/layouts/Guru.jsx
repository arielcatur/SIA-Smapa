import Footer from "../Footer";
import SidebarGuru from "../guru/SidebarGuru";
import Navbar from "../Navbar";
// import SidebarGuru from "../SidebarGuru";

export default function Guru(props) {
  return (
    <>
      <div id="root">
        <div className="main-content">
          <Navbar />
          <SidebarGuru />
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
}
