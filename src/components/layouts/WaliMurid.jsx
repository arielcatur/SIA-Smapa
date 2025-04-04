import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import SidebarWali from "../wali/SidebarWali";

export default function WaliMurid(props) {
  return (
    <>
      <div id="root">
        <div className="main-content">
          <Navbar />
          <SidebarWali />
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
}
