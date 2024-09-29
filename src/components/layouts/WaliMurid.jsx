import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function WaliMurid(props) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {props.children}
      <Footer />
    </>
  );
}
