import React, { useEffect } from 'react'
import Link from 'next/link';

import { useAuth } from "@/firebase/auth"
import { useRouter } from 'next/router';
import { auth } from "@/firebase/firebase.js"
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';


const Register = () => {
  /* react Code*/
  const router = useRouter()
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: ""
  })
  const { isLoading, authUser, setAuthUser } = useAuth()
  const setuserdata = e => {
    const { name, value } = e.target;
    setUser(
      (prev) => ({
        ...prev, [name]: value
      })
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.password || !user.email) {
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
    const createUser = await CreateUserThroughFirebase(user)
    console.log(createUser);
    setUser({
      name: "",
      email: "",
      password: ""
    })
    if (!createUser) {
      setTimeout(() => {
        toast.error('Login Failed,try again', {
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


  /* Firebase authentication */
  const provider = new GoogleAuthProvider();

  const CreateUserThroughFirebase = async ({ name, email, password }) => {
    try {
      console.log(email + "  " + password)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName: name })
      setAuthUser({
        uid: result.uid,
        email: result.email,
        username: result.displayName,
      })
      return result

    } catch (error) {
      console.error(error)
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
  },[authUser,isLoading,router]);
  const signInwithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
  }

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) :
    (
      <>
        <div className="flex w-screen h-screen">
          <div className="  w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start max-md:items-start ">
            <div className="p-8 w-[600px]">
              <h1 className="text-7xl font-bold mb-6">Register</h1>
              Already have an Account?<Link href="/Login" className="my-6 ml-1 focus:outline-none focus:border-b-2 focus:underline-none focus:border-black hover:text-blue-400 underline "> Login</Link>
              <button className="w-full h-12 rounded-full bg-black/[0.05] hover:bg-black hover:text-white my-3
             focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-black focus:text-white
           "
                onClick={signInwithGoogle}>Login with Google</button>
              <form name="Form" className="flex flex-col mt-6 gap-2">

                <label htmlFor="name" className="text-black/[0.5]">Name</label>
                <input type="text" name="name" id="name" autoComplete="off" className=" border
               border-black rounded-md py-2 px-3 text-[15px]
               focus:outline-none focus:ring focus:border-transparent 
                " placeholder="Please Enter Name"
                  value={user.name}
                  onChange={(e) => setuserdata(e)}
                />

                <label htmlFor="email" className="text-black/[0.5]">Email</label>
                <input type="email" name="email" id="email" autoComplete="on" className=" border
               border-black rounded-md py-2 px-3 text-[15px]
              focus:outline-none focus:ring focus:border-transparent 
               " placeholder="Please Enter Email"
                  value={user.email}
                  onChange={(e) => setuserdata(e)}
                />
                <label htmlFor="password" className="text-black/[0.5]">Password</label>
                <input type="password" name="password" id="password" className="border border-black rounded-md py-2 px-3 text-[15px]
              focus:outline-none focus:ring-offset-2 focus:ring focus:border-transparent "
                  placeholder="Please Enter Password"
                  value={user.password}
                  onChange={(e) => setuserdata(e)}
                />
                <input type="submit" value={"Submit"} className=" w-1/5 mt-[0.5rem] border border-black rounded-xl py-2 px-3 text-[15px]
              focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-green-500 hover:bg-green-500 mt-1"
                  onClick={handleSubmit}
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

export default Register