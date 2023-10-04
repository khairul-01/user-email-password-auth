import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from "react-router-dom";

const Register = () => {

   const [registerError, setRegisterError] = useState('');
   const [registerSuccess, setRegisterSuccess] = useState('');
   const [toggle, setToggle] = useState(false);

   const handleSubmit = e => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const check = e.target.terms.checked;
      console.log(email, password, check);

      setRegisterError('');
      setRegisterSuccess('');
      if (password.length < 6) {
         setRegisterError('Password should be at least 6 characters');
         return;
      }
      else if (!/[A-Z]/.test(password)) {
         setRegisterError('Password should have at least one uppercase letter characters');
         return;
      }
      else if (!check) {
         setRegisterError('Please check our terms & conditions');
         return;
      }

      createUserWithEmailAndPassword(auth, email, password)
         .then(result => {
            console.log(result.user);
            setRegisterSuccess('User created Successfully');
         })
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
               <input className="w-3/5 border-2 rounded-md px-4 py-2 mb-4" type="email" name="email" id="" placeholder="Email Address" required /> <br />
               <div className="flex items-center mb-4 relative w-3/5 ">
                  <input
                     className="border-2 rounded-md px-4 py-2 w-full"
                     type={toggle ? 'text' : 'password'}
                     name="password"
                     id="" placeholder="Password" required />
                  <span onClick={() => setToggle(!toggle)} className="bg-none text-2xl absolute right-2">
                     {
                        toggle ? <AiFillEye /> : <AiFillEyeInvisible />
                     }
                  </span>
               </div>

               <div className="mb-3">
                  <input type="checkbox" name="terms" id="terms" />
                  <label className="ml-2" htmlFor="terms">Accept out terms & conditions</label>
               </div>
               <input className="w-3/5 mb-4 btn btn-secondary" type="submit" value="Register" />
            </form>
            {
               registerError && <p className="text-red-800 font-extrabold">{registerError}</p>
            }
            {
               registerSuccess && <p className="text-green-800 font-extrabold">{registerSuccess}</p>
            }
            <p>Already have an account? Please <Link to='/login' className="underline btn">login</Link></p>
         </div>
      </div>
   );
};

export default Register;