import axios from "axios";
import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [data, setData] = useState();
  const [input, setInput] = useState({
    username: "",
    password: "",
    role: "",
    nama: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(input);
    let { username, password, role } = input;
    axios
      .post(`http://localhost:3000/api/auth/login`, {
        username,
        password,
        role,
      })
      .then((res) => {
        let data = res.data;
        console.log(data.data)
        Cookies.set("token", data.token, { expires: 1 });
        Cookies.set("role", data.data.hakAkses, { expires: 1 });
        Cookies.set("username", data.data.username, { expires: 1 });
        // console.log(res.data.token)
        setToken(res.data.token)
        setUser(role)
        // console.log(user)
        // setUser(res.data.role);
        if (role === "siswa") {
          navigate("/homesiswa");
        } else if (role === "wali murid") {
          navigate("/homewali");
        } else if (role === "guru") {
          navigate("/homeguru");
        } else if (role === "admin") {
          navigate("/homeadmin");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });

  };

  // const handleLogOut = () => {
  //   setUser(null);
  //   setToken("");
  //   localStorage.removeItem("site");
  //   navigate("/login");
  // };

  const handleRegist = (event) => {
    event.preventDefault();
    console.log(input);
    let { username, password, role } = input;
    axios
      .post(`http://localhost:3000/api/auth/login`, {
        username,
        password,
        role,
      })
      .then((res) => {
        console.log(res);
        let data = res.data;
        Cookies.set("token", data.token, { expires: 1 });
        navigate("/homesiswa");
      })
      .catch((error) => {
        console.log(error);
        // alert(error.message)
      });
  };

  // const getKelas = () => {
  //   useEffect(()=>{
  //     console.log(fetchStatus)
  //     if (fetchStatus === true){
  //         axios.get("http://localhost:3000/api/admin/kelas")
  //         .then((res) => {
  //             setData( [...res.data] )
  //         })
  //         .catch((err) => {
  //             console.log(err)
  //         })
  //         setFetchStatus(false)
  //     }
  //     setFetchStatus(true)
  // }, [fetchStatus, setFetchStatus])
  // }

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleFunction = {
    handleChange,
    handleLogin,
    handleRegist,
    // getKelas
  };

  const state = {
    input,
    setInput,
    selectedImage,
    setSelectedImage,
    fetchStatus,
    setFetchStatus,
    user,
    setUser,
    token,
    setToken
  };

  return (
    <GlobalContext.Provider
      value={{
        handleFunction,
        state,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
