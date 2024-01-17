
import Loader from "@/components/Loader";
import { useAuth } from "@/firebase/auth"
import { useRouter } from 'next/router';
import { useEffect } from "react";

const App=()=>{
  const {isLoading,authUser,signOut}=useAuth()
  console.log(authUser)
  console.log(isLoading)
   const router= useRouter()
   useEffect(() => {
    if (!isLoading && !authUser) {
        router.push("/Login");
    }
},[authUser,isLoading,router]);


return (!isLoading && !authUser) ? (
  <Loader/>
) : (
  <>
    <h1>Hello, the further part of the project is developing, This will update by 12-Jan-2023</h1>
    <button onClick={signOut} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Logout
    </button>
  </>
)
}
export default App;