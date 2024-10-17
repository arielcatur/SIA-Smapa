import SidebarAdmin from "../admin/SidebarAdmin";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Admin(props) {
  return (
    <>
      <div id="root">
        <div className="main-content">
          <Navbar />
          <SidebarAdmin />
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
}
