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
import { BOOK, HOME, INFO, KEY, WALI } from "../Icons";
import { Link } from "react-router-dom";

export default function SidebarGuru() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="border-r rounded-none bg-blue-400 absolute h-full inset-y-0 left-0 top-0 z-30 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 pl-4 pb-4">
        <Typography
          className="flex justify-start"
          variant="h5"
          color="blue-gray"
        >
          <img src={logo} alt="logo smapa" className="w-14" />
          <p className="mx-2 mt-4 ml-4 text-white">SMAPA</p>
        </Typography>
      </div>
      <List>
        <Link to={"/homeguru"}>
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
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <INFO />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="text-white mr-auto font-normal"
              >
                Info Akademik
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 ">
            <List className="p-0 pl-8 text-white">
              <Link to={"/jadwalmengajarguru"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Jadwal Mengajar
                </ListItem>
              </Link>
              <Link to={"/daftarsiswa"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Daftar Siswa
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              stroke="white"
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <BOOK />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="text-white mr-auto font-normal"
              >
                Nilai
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="text-white p-0 pl-8">
              <Link to={"/inputnilaiuts"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Nilai UTS
                </ListItem>
              </Link>
              <Link to={"/inputnilaiuas"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Nilai UAS
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              stroke="white"
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <WALI />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="text-white mr-auto font-normal"
              >
                Monitoring Wali Kelas
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="text-white p-0 pl-8">
              <Link to={"/lihatsiswa"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Lihat Siswa
                </ListItem>
              </Link>
              {/* <Link to={"/lihatwalimurid"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Lihat Wali Murid
                </ListItem>
              </Link> */}
              <Link to={"/lihatnilaiuts"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Lihat Nilai UTS
                </ListItem>
              </Link>
              <Link to={"/lihatnilaiuas"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Lihat Nilai UAS
                </ListItem>
              </Link>
              <Link to={"/absenbyguru"}>
                <ListItem className="hover:text-white active:text-white focus:text-white">
                  Absen Siswa
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
          <ListItem className="text-white hover:text-white active:text-white focus:text-white"
          onClick=
          {() => {
            Cookies.remove("token");
            Cookies.remove("role");
            navigate("/");
          }}>
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
