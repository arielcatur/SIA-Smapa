import React from "react";
import logo from "../assets/SMA__4_SAMARINDA.png"
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { BOOK, HOME, INFO } from "../Icons";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="absolute inset-y-0 left-0 top-0 z-30 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography className="flex justify-start" variant="h5" color="blue-gray">
            <img src={logo} alt="logo smapa" className="max-w-8 mx-2" />
            <p className="mx-2 mt-1">SMAPA</p>
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HOME className="h-5 w-5"/>
          </ListItemPrefix>
          Beranda
        </ListItem>

        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
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
                <INFO/>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Info Akademik
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 pl-8">
              <ListItem>
                Jadwal Pelajaran
              </ListItem>
              <ListItem>
                Daftar Guru
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
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
                <BOOK/>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Nilai
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 pl-8">
              <ListItem>
                Nilai UTS
              </ListItem>
              <ListItem>
                Nilai UAS
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
