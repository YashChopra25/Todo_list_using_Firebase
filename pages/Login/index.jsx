import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/auth"
import { auth } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup
} from "firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { toast } from 'react-toastify';
const Login = () => {
  const { isLoading, authUser } = useAuth()
  const [user, setUser] = useState({
    email: "", password: ""
  })
  console.log(authUser)
  console.log(isLoading)
  const router = useRouter()
  const SetUserData = e => {
    /* react Code*/
    const { name, value } = e.target;
    setUser(
      (prevData) => ({
        ...prevData, [name]: value
      })
    )
  }
  const loginuser = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.warn("Please fill all the details!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return
    }
    const result = await getuserlogin(user)
    console.log(result)
    setUser({
      email: "", password: ""
    })
    if (!result) {
      setTimeout(() => {
        toast.error('Invalid Crendential', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 1000)
    }
  }

  useEffect(() => {
    if (!isLoading && authUser) {
      toast.success('login Succesfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push("/");
    }
  }, [authUser, isLoading,router]);


  /* Firebase authentication */

  const getuserlogin = async ({ email, password }) => {
    try {
      const req = await signInWithEmailAndPassword(auth, email, password)
      return req
    } catch (error) {
      console.log(error)
    }
  }



  const provider = new GoogleAuthProvider()
  const loginwithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
  }

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <>
      <div className="flex w-screen h-screen">
        <div className="  w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start max-md:items-start ">
          <div className="p-8 w-[600px]">
            <h1 className="text-7xl font-bold mb-6">Login</h1>
            Don&apos;t have an account ?<Link href="/Register" className="my-6 ml-1 focus:outline-none focus:border-b-2 focus:underline-none focus:border-black hover:text-blue-400 underline "> Sign Up</Link>
            <button className="w-full h-12 rounded-full bg-black/[0.05] hover:bg-black hover:text-white my-3
             focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-black focus:text-white
             "
              onClick={loginwithGoogle}
            >Login with Google</button>
            <form name="Form" className="flex flex-col mt-6 gap-3" >
              <label htmlFor="email" className="text-black/[0.5]">Email</label>
              <input type="email" name="email" id="email" autoComplete="on" className=" border
               border-black rounded-md py-2 px-3 text-[15px]
              focus:outline-none focus:ring focus:border-transparent 
               " placeholder="Please Enter Email"
                value={user.email}
                onChange={(e) => { SetUserData(e) }}
              />
              <label htmlFor="password" className="text-black/[0.5]">Password</label>
              <input type="password" name="password" id="password" className="border border-black rounded-md py-2 px-3 text-[15px]
              focus:outline-none focus:ring-offset-2 focus:ring focus:border-transparent "
                placeholder="Please Enter Password"
                value={user.password}
                onChange={(e) => { SetUserData(e) }}
              />
              <input type="submit" value={"Submit"} className=" w-1/5 border border-black rounded-xl py-2 px-3 text-[15px] max-md:w-full
              focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-green-500 hover:bg-green-500 mt-1"
                onClick={loginuser}
              />
            </form>
          </div>
        </div>
        <div
          className="w-[40%] bg-slate-400 bg-cover bg-right-top lg:block max-lg:hidden"
          style={{ backgroundImage: "url(/login-banner.jpg)" }}
        ></div>
      </div>
    </>
  );
};

export default Login;

