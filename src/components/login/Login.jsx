import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { config } from "localforage";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

   const [registerError, setRegisterError] = useState('');
   const [registerSuccess, setRegisterSuccess] = useState('');
   const [toggle, setToggle] = useState(false);

   const emailRef = useRef(null);

   const handleLogin = e => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log(email, password);

      // reset error and success
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

      signInWithEmailAndPassword(auth, email, password)
         .then(result => {
            console.log(result.user);
            if(result.user.emailVerified){
               setRegisterSuccess('User Logged In successfully')
            }
            else{
               alert('Please verify your email address.')
            }
         })
         .catch(error => {
            console.error(error);
            setRegisterError(error.message);
         })
   }
   const handleResetPassword = () => {
      const email = emailRef.current.value;
      if (!email) {
         console.log('please provide email address');
         return;
      }
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
         console.log('Please provide valid email address');
         return;
      }

      // send validation email
      sendPasswordResetEmail(auth, email)
         .then(() => {
            alert('Please check your email.');
         })
         .catch(error => {
            console.log(error);
         })
   }
   return (
      <div>
         <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Login now!</h1>
                  <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
               </div>
               <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <form onSubmit={handleLogin} className="card-body">
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" ref={emailRef} className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                           <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>
                     <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                     </div>
                  </form>
                  {
                     registerError && <p className="text-red-800 font-extrabold">{registerError}</p>
                  }
                  {
                     registerSuccess && <p className="text-green-800 font-extrabold">{registerSuccess}</p>
                  }
                  <p>New to this website? Please <Link to='/register' className="underline btn">register</Link></p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;