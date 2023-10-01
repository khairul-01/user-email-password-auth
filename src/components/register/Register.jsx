import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";

const Register = () => {

   const [registerError, setRegisterError] = useState('');

   const handleSubmit = e => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log(email, password);

      setRegisterError('');

      createUserWithEmailAndPassword(auth, email, password)
         .then(result => result.user)
         .catch(error => {
            console.error(error);
            setRegisterError(error.message);
         })
   }
   return (
      <div className="border-2 border-x-pink-700">
         <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit}>
               <h1 className="text-3xl mb-4">Please Register</h1>
               <input className="w-3/5 border-2 rounded-md px-4 py-2 mb-4" type="email" name="email" id="" placeholder="Email Address" /> <br />
               <input className="w-3/5 border-2 rounded-md px-4 py-2 mb-4" type="password" name="password" id="" placeholder="Password" /> <br />
               <input className="w-3/5 mb-4 btn btn-secondary" type="submit" value="Register" />
            </form>
            {
               registerError && <p className="text-red-800 font-extrabold">{registerError}</p>
            }
         </div>
      </div>
   );
};

export default Register;