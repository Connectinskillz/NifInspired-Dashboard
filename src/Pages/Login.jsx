import React, { useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IconContext } from "react-icons";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loader from "../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { userLogin } from "../Services/request";

const Mail_Regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const Login = () => {
  //state to manage input fields
  const mailref = useRef();
  const [viewPass, setViewPass] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  //onchange to manage the input
  const readDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserDetail({ ...userDetail, [name]: value });
  };
  const [loading, setLoading] = useState(false);
  // useEffect(() =>{
  //   mailref.
  // })

  useEffect(() => {
    if (Mail_Regex.test(userDetail["email"]) && userDetail["password"] !== "") {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [userDetail["email"], userDetail["password"]]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (confirm) {
      setLoading(true);
      await userLogin(userDetail);
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex justify-center items-center my-16">
        <img
          src="/logo.svg"
          alt="logo"
          className="h-[50px] Tablet:h-[90px] desktop:h-[90px]"
        />
      </div>

      <div className="flex flex-col items-center ">
        <div className="">
          <p className="text-[36px] mobile:text-[24px] desktop:text-[56px] large:text-[42px]  font-poppins">            
            Login
          </p>
        </div>

        <form
          className=" flex flex-col justify-center items-center font-poppins w-[80%] smtab:w-[50%] Tablet:w-[40%] desktop:w-[30%] large:w-[20%] my-16"
          onSubmit={handleLogin}
        >
          <div className="border-b border-[grey] my-5 w-full">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetail["email"]}
              onChange={readDetails}
              class="w-full outline-none py-4 px-2"
              refs={mailref}
            />
          </div>

          <div className="flex items-center justify-between  border-b border-[grey]  my-5 w-full">
            <Input
              type={viewPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userDetail["password"]}
              onChange={readDetails}
              class="outline-none py-4 px-2  w-full"
            />

            <div
              className="cursor-pointer"
              onClick={() => setViewPass(!viewPass)}
            >
              <IconContext.Provider value={{ color: "#066B63" }}>
                {viewPass ? <FiEyeOff /> : <FiEye />}
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <p className="text-[red] text-[11px]">
              {Mail_Regex.test(userDetail["email"]) ||
              userDetail["email"] === ""
                ? null
                : " enter valid email"}
            </p>
          </div>

          <Button
            name={
              loading ? (
                <div className="flexmm gap-[10px]">
                  <Loader /> <p>Login</p>
                </div>
              ) : (
                <p>Login</p>
              )
            }
            type="submit"
            disable={confirm ? false : true}
            class={`px-[70px] py-3 border ${
              confirm
                ? "bg-accent cursor-pointer"
                : "bg-accent/40 cursor-not-allowed"
            } text-[#ffffff] rounded-full  my-10`}
          />
        </form>

        {/* <div className="flex items-center mb-[20px] justify-between w-[80%] smtab:w-[50%] Tablet:w-[40%] desktop:w-[30%]  large:w-[20%] text-[12px]">
          <p>
            New here?
            <Link to="/register" className="text-[blue]">
              Register
            </Link>
          </p>

          <p>
            <Link to="/forgot" className="text-[blue] ">
              Forgot your Password?
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
