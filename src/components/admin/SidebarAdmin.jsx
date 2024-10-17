// import React from "react";
// import logo from "../../assets/SMA__4_SAMARINDA2.png";
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// import { BOOK, HOME, INFO, KEY } from "../Icons";
// import { Link } from "react-router-dom";
// import Cookies from "js-cookie"
// import { useNavigate } from "react-router-dom";

// export default function SidebarAdmin() {
//   const [open, setOpen] = React.useState(0);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };
//   let navigate = useNavigate();
//   return (
    
//     <Card className="border-r rounded-none bg-blue-400 absolute h-full inset-y-0 left-0 top-0 z-30 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
//       <div className="mb-2 pl-4 pb-4">
//         <Typography
//           className="flex justify-start"
//           variant="h5"
//           color="blue-gray"
//         >
//           <img src={logo} alt="logo smapa" className="w-14" />
//           <p className="mx-2 mt-4 ml-4 text-white">SMAPA</p>
//         </Typography>
//       </div>
//       <List>
//         <Link to={"/homeadmin"}>
//           <ListItem className="text-white hover:text-white active:text-white focus:text-white">
//             <ListItemPrefix>
//               <HOME className="h-5 w-5" />
//             </ListItemPrefix>
//             Beranda
//           </ListItem>
//         </Link>

//         <Accordion
//           open={open === 1}
//           icon={
//             <ChevronDownIcon
//               stroke="white"
//               strokeWidth={2.5}
//               className={`mx-auto h-4 w-4 transition-transform ${
//                 open === 1 ? "rotate-180" : ""
//               }`}
//             />
//           }
//         >
//           <ListItem className="p-0" selected={open === 1}>
//             <AccordionHeader
//               onClick={() => handleOpen(1)}
//               className="border-b-0 p-3"
//             >
//               <ListItemPrefix>
//                 <INFO />
//               </ListItemPrefix>
//               <Typography
//                 color="blue-gray"
//                 className="text-white mr-auto font-normal"
//               >
//                 Info Akademik
//               </Typography>
//             </AccordionHeader>
//           </ListItem>
//           <AccordionBody className="py-1 ">
//             <List className="p-0 pl-8 text-white">
//               <Link to={"/datasiswa"}>
//                 <ListItem className="hover:text-white active:text-white focus:text-white">
//                   Data Siswa
//                 </ListItem>
//               </Link>
//               <Link to={"/datawalisiswa"}>
//                 <ListItem className="hover:text-white active:text-white focus:text-white">
//                   Data Wali Siswa
//                 </ListItem>
//               </Link>
//               <Link to={"/dataguru"}>
//                 <ListItem className="hover:text-white active:text-white focus:text-white">
//                   Data Guru
//                 </ListItem>
//               </Link>
//               <Link to={"/tambahdatakelas"}>
//                 <ListItem className="hover:text-white active:text-white focus:text-white">
//                   Data Kelas
//                 </ListItem>
//               </Link>
//               <Link to={"/datamatapelajaran"}>
//                 <ListItem className="hover:text-white active:text-white focus:text-white">
//                   Data Mata Pelajaran
//                 </ListItem>
//               </Link>
//               <Link to={"/tambahjadwal"}>
//                 <ListItem className="hover:text-white active:text-white focus:text-white">
//                   Jadwal Pelajaran
//                 </ListItem>
//               </Link>
//             </List>
//           </AccordionBody>
//         </Accordion>
//         <Link to={"/changepass"}>
//           <ListItem className="text-white hover:text-white active:text-white focus:text-white">
//             <ListItemPrefix>
//               <KEY className="h-5 w-5"/>
//             </ListItemPrefix>
//             Ganti Password
//           </ListItem>
//         </Link>
//         <Link to="/">
//           <ListItem className="text-white hover:text-white active:text-white focus:text-white"
//           onClick=
//           {() => {
//             Cookies.remove("token");
//             Cookies.remove("role");
//             navigate("/");
//           }}>
//             <ListItemPrefix>
//               <PowerIcon className="text-white h-5 w-5" />
//             </ListItemPrefix>
//             Log Out
//           </ListItem>
//         </Link>
//       </List>
//     </Card>
//   );
// }

import React from "react";
import logo from "../../assets/SMA__4_SAMARINDA2.png";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BOOK, HOME, INFO, KEY } from "../Icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SidebarAdmin() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  let navigate = useNavigate();

  return (
    <Card className="border-r rounded-none bg-blue-400 fixed h-screen inset-y-0 left-0 top-0 z-30 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 pl-4 pb-4">
        <Typography className="flex justify-start" variant="h5" color="blue-gray">
          <img src={logo} alt="logo smapa" className="w-14" />
          <p className="mx-2 mt-4 ml-4 text-white">SMAPA</p>
        </Typography>
      </div>
      <List>
        <Link to={"/homeadmin"}>
          <ListItem className="text-white hover:text-white active:text-white focus:text-white">
            <ListItemPrefix>
              <HOME className="h-5 w-5" />
            </ListItemPrefix>
            Beranda
          </ListItem>
        </Link>

        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              stroke="white"
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <INFO />
              </ListItemPrefix>
              <Typography color="blue-gray" className="text-white mr-auto font-normal">
                Info Akademik
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 ">
            <List className="p-0 pl-8 text-white">
              <Link to={"/datasiswa"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Data Siswa
                </ListItem>
              </Link>
              <Link to={"/datawalisiswa"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Data Wali Siswa
                </ListItem>
              </Link>
              <Link to={"/dataguru"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Data Guru
                </ListItem>
              </Link>
              <Link to={"/tambahdatakelas"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Data Kelas
                </ListItem>
              </Link>
              <Link to={"/datamatapelajaran"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Data Mata Pelajaran
                </ListItem>
              </Link>
              <Link to={"/tambahjadwal"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Jadwal Pelajaran
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Link to={"/changepass"}>
          <ListItem className="text-white hover:text-white active:text-white focus:text-white">
            <ListItemPrefix>
              <KEY className="h-5 w-5" />
            </ListItemPrefix>
            Ganti Password
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem
            className="text-white hover:text-white active:text-white focus:text-white"
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("role");
              navigate("/");
            }}
          >
            <ListItemPrefix>
              <PowerIcon className="text-white h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
