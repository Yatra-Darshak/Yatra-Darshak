import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const AuthForm = ({
  isLogin,
  authMethod,
  formData,
  onChange,
  showOtp,
  otpTimer,
  handleSendOtp,
  handleSubmit,
  toggleForm,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-white/30 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  City
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                    placeholder="City"
                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  className="w-full px-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 transition-all duration-300"
                  required
                >
                  <option value="">Select State</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="DL">Delhi</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="GJ">Gujarat</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="KA">Karnataka</option>
                  <option value="WB">West Bengal</option>
                  <option value="AP">Andhra Pradesh</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Email / Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            {authMethod === "email" ? "Email Address" : "Phone Number"}
          </label>
          <div className="relative">
            {authMethod === "email" ? (
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            ) : (
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            )}
            <input
              type={authMethod === "email" ? "email" : "tel"}
              name={authMethod}
              value={formData[authMethod]}
              onChange={onChange}
              placeholder={authMethod === "email" ? "Enter your email address" : "Enter your phone number"}
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* OTP */}
        {authMethod === "phonenumber" && showOtp && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-800">Enter OTP</label>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpTimer > 0}
                className={`text-sm font-medium ${
                  otpTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-teal-700 hover:text-teal-900 hover:underline"
                }`}
              >
                {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
              </button>
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={onChange}
                placeholder="000000"
                maxLength="6"
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 text-center text-2xl font-mono tracking-widest transition-all duration-300"
                required
              />
            </div>
            <p className="text-sm text-gray-700 text-center">OTP sent to {formData.phonenumber}</p>
          </div>
        )}

        {/* Password */}
        {(authMethod === "email" || (authMethod === "phonenumber" && !showOtp)) && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        )}

        {/* Confirm Password */}
        {!isLogin && (authMethod === "email" || (authMethod === "phonenumber" && !showOtp)) && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onChange}
                placeholder="Confirm your password"
                className="w-full pl-12 pr-12 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="group w-full font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white flex items-center justify-center gap-3"
        >
          {authMethod === "phonenumber" && !showOtp
            ? isLogin
              ? "Send OTP"
              : "Send Verification Code"
            : isLogin
            ? "Sign In to Account"
            : "Create Account"}
          <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center font-medium mt-3">{error}</p>
        )}

        {/* Terms */}
        {!isLogin && (
          <p className="text-xs text-gray-700 text-center leading-relaxed">
            By creating an account, you agree to our{" "}
            <button type="button" className="text-teal-700 hover:underline font-medium">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-teal-700 hover:underline font-medium">
              Privacy Policy
            </button>
          </p>
        )}
      </form>

      {/* Switch Form */}
      <div className="text-center mt-6">
        <p className="text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleForm}
            className="ml-2 text-teal-700 hover:text-teal-900 font-semibold hover:underline transition-colors duration-300"
          >
            {isLogin ? "Sign up here" : "Sign in here"}
          </button>
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Shield className="text-green-600" size={16} />
          <span>Secure & Protected</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-teal-600" size={16} />
          <span>Government Verified</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;


// import React, { useState } from "react";
// import {
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Phone,
//   MapPin,
//   Shield,
//   CheckCircle,
//   ArrowRight,
//   MessageCircle,
// } from "lucide-react";

// const AuthForm = ({
//   isLogin,
//   authMethod,
//   formData,
//   onChange,
//   showOtp,
//   otpTimer,
//   handleSendOtp,
//   handleSubmit,
//   toggleForm,
//   error,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <div className="bg-white/30 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl border border-white/20">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {!isLogin && (
//           <>
//             {/* Full Name */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-800">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   name="fullname"
//                   value={formData.fullname}
//                   onChange={onChange}
//                   className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Location */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-800">
//                   City
//                 </label>
//                 <div className="relative">
//                   <MapPin
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={onChange}
//                     className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                     placeholder="City"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-800">
//                   State
//                 </label>
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={onChange}
//                   className="w-full px-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 transition-all duration-300"
//                   required
//                 >
//                   <option value="">Select State</option>
//                   <option value="MP">Madhya Pradesh</option>
//                   <option value="MH">Maharashtra</option>
//                   <option value="DL">Delhi</option>
//                   <option value="UP">Uttar Pradesh</option>
//                   <option value="RJ">Rajasthan</option>
//                   <option value="GJ">Gujarat</option>
//                   <option value="TN">Tamil Nadu</option>
//                   <option value="KA">Karnataka</option>
//                   <option value="WB">West Bengal</option>
//                   <option value="AP">Andhra Pradesh</option>
//                 </select>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Email or Phone Input */}
//         <div className="space-y-2">
//           <label className="block text-sm font-semibold text-gray-800">
//             {authMethod === "email" ? "Email Address" : "Phone Number"}
//           </label>
//           <div className="relative">
//             {authMethod === "email" ? (
//               <Mail
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//             ) : (
//               <Phone
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//             )}
//             <input
//               type={authMethod === "email" ? "email" : "tel"}
//               name={authMethod}
//               value={formData[authMethod]}
//               onChange={onChange}
//               className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
//               placeholder={
//                 authMethod === "email"
//                   ? "Enter your email address"
//                   : "Enter your phone number"
//               }
//               required
//             />
//           </div>
//         </div>

//         {/* OTP Input */}
//         {authMethod === "phonenumber" && showOtp && (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-semibold text-gray-800">
//                 Enter OTP
//               </label>
//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 disabled={otpTimer > 0}
//                 className={`text-sm font-medium ${
//                   otpTimer > 0
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-teal-700 hover:text-teal-900 hover:underline"
//                 }`}
//               >
//                 {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
//               </button>
//             </div>
//             <div className="relative">
//               <MessageCircle
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={onChange}
//                 className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 text-center text-2xl font-mono tracking-widest transition-all duration-300"
//                 placeholder="000000"
//                 maxLength="6"
//                 required
//               />
//             </div>
//             <p className="text-sm text-gray-700 text-center">
//               OTP sent to {formData.phonenumber}
//             </p>
//           </div>
//         )}

//         {/* Password */}
//         {(authMethod === "email" ||
//           (authMethod === "phonenumber" && !showOtp)) && (
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-800">
//               Password
//             </label>
//             <div className="relative">
//               <Lock
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={onChange}
//                 className="w-full pl-12 pr-12 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((s) => !s)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Confirm Password */}
//         {!isLogin &&
//           (authMethod === "email" ||
//             (authMethod === "phonenumber" && !showOtp)) && (
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-800">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={onChange}
//                   className="w-full pl-12 pr-12 py-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 text-gray-900 placeholder-gray-500 transition-all duration-300"
//                   placeholder="Confirm your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword((s) => !s)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>
//           )}

//         {/* Submit */}
//         <button
//           type="submit"
//           className="group w-full font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white flex items-center justify-center gap-3"
//         >
//           {authMethod === "phonenumber" && !showOtp
//             ? isLogin
//               ? "Send OTP"
//               : "Send Verification Code"
//             : isLogin
//             ? "Sign In to Account"
//             : "Create Account"}
//           <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
//         </button>

//         {/* Error */}
//         {error && (
//           <p className="text-red-600 text-sm text-center font-medium mt-3">{error}</p>
//         )}
//       </form>

//       {/* Switch Form */}
//       <div className="text-center mt-6">
//         <p className="text-gray-700">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             onClick={toggleForm}
//             className="ml-2 text-teal-700 hover:text-teal-900 font-semibold hover:underline transition-colors duration-300"
//           >
//             {isLogin ? "Sign up here" : "Sign in here"}
//           </button>
//         </p>
//       </div>

//       {/* Trust Indicators */}
//       <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-700">
//         <div className="flex items-center gap-2">
//           <Shield className="text-green-600" size={16} />
//           <span>Secure & Protected</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <CheckCircle className="text-teal-600" size={16} />
//           <span>Government Verified</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;


// // import React, { useState } from "react";
// // import {
// //   Eye,
// //   EyeOff,
// //   Mail,
// //   Lock,
// //   User,
// //   Phone,
// //   MapPin,
// //   Shield,
// //   CheckCircle,
// //   ArrowRight,
// //   MessageCircle,
// // } from "lucide-react";

// // const AuthForm = ({
// //   isLogin,
// //   authMethod,
// //   formData,
// //   onChange,
// //   showOtp,
// //   otpTimer,
// //   handleSendOtp,
// //   handleSubmit,
// //   toggleForm,
// //   error, // ✅ receive error
// // }) => {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   return (
// //     <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-gray-200/50">
// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         {!isLogin && (
// //           <>
// //             {/* Full Name */}
// //             <div className="space-y-2">
// //               <label className="block text-sm font-semibold text-gray-700">
// //                 Full Name
// //               </label>
// //               <div className="relative">
// //                 <User
// //                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                   size={20}
// //                 />
// //                 <input
// //                   type="text"
// //                   name="fullname"
// //                   value={formData.fullname}
// //                   onChange={onChange}
// //                   className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
// //                   placeholder="Enter your full name"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Location */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <label className="block text-sm font-semibold text-gray-700">
// //                   City
// //                 </label>
// //                 <div className="relative">
// //                   <MapPin
// //                     className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                     size={20}
// //                   />
// //                   <input
// //                     type="text"
// //                     name="city"
// //                     value={formData.city}
// //                     onChange={onChange}
// //                     className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
// //                     placeholder="City"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div className="space-y-2">
// //                 <label className="block text-sm font-semibold text-gray-700">
// //                   State
// //                 </label>
// //                 <select
// //                   name="state"
// //                   value={formData.state}
// //                   onChange={onChange}
// //                   className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 transition-all duration-300"
// //                   required
// //                 >
// //                   <option value="">Select State</option>
// //                   <option value="MP">Madhya Pradesh</option>
// //                   <option value="MH">Maharashtra</option>
// //                   <option value="DL">Delhi</option>
// //                   <option value="UP">Uttar Pradesh</option>
// //                   <option value="RJ">Rajasthan</option>
// //                   <option value="GJ">Gujarat</option>
// //                   <option value="TN">Tamil Nadu</option>
// //                   <option value="KA">Karnataka</option>
// //                   <option value="WB">West Bengal</option>
// //                   <option value="AP">Andhra Pradesh</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </>
// //         )}

// //         {/* Email or Phone Input */}
// //         <div className="space-y-2">
// //           <label className="block text-sm font-semibold text-gray-700">
// //             {authMethod === "email" ? "Email Address" : "Phone Number"}
// //           </label>
// //           <div className="relative">
// //             {authMethod === "email" ? (
// //               <Mail
// //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                 size={20}
// //               />
// //             ) : (
// //               <Phone
// //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                 size={20}
// //               />
// //             )}
// //             <input
// //               type={authMethod === "email" ? "email" : "tel"}
// //               name={authMethod}
// //               value={formData[authMethod]}
// //               onChange={onChange}
// //               className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
// //               placeholder={
// //                 authMethod === "email"
// //                   ? "Enter your email address"
// //                   : "Enter your phone number"
// //               }
// //               required
// //             />
// //           </div>
// //         </div>

// //         {/* OTP Input */}
// //         {authMethod === "phonenumber" && showOtp && (
// //           <div className="space-y-2">
// //             <div className="flex items-center justify-between">
// //               <label className="block text-sm font-semibold text-gray-700">
// //                 Enter OTP
// //               </label>
// //               <button
// //                 type="button"
// //                 onClick={handleSendOtp} // ✅ now calls backend
// //                 disabled={otpTimer > 0}
// //                 className={`text-sm font-medium ${
// //                   otpTimer > 0
// //                     ? "text-gray-400 cursor-not-allowed"
// //                     : "text-blue-700 hover:text-blue-900 hover:underline"
// //                 }`}
// //               >
// //                 {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
// //               </button>
// //             </div>
// //             <div className="relative">
// //               <MessageCircle
// //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                 size={20}
// //               />
// //               <input
// //                 type="text"
// //                 name="otp"
// //                 value={formData.otp}
// //                 onChange={onChange}
// //                 className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300 text-center text-2xl font-mono tracking-widest"
// //                 placeholder="000000"
// //                 maxLength="6"
// //                 required
// //               />
// //             </div>
// //             <p className="text-sm text-gray-500 text-center">
// //               OTP sent to {formData.phonenumber}
// //             </p>
// //           </div>
// //         )}

// //         {/* Password */}
// //         {(authMethod === "email" ||
// //           (authMethod === "phonenumber" && !showOtp)) && (
// //           <div className="space-y-2">
// //             <label className="block text-sm font-semibold text-gray-700">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <Lock
// //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                 size={20}
// //               />
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={onChange}
// //                 className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
// //                 placeholder="Enter your password"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword((s) => !s)}
// //                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
// //               >
// //                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Confirm Password */}
// //         {!isLogin &&
// //           (authMethod === "email" ||
// //             (authMethod === "phonenumber" && !showOtp)) && (
// //             <div className="space-y-2">
// //               <label className="block text-sm font-semibold text-gray-700">
// //                 Confirm Password
// //               </label>
// //               <div className="relative">
// //                 <Lock
// //                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
// //                   size={20}
// //                 />
// //                 <input
// //                   type={showConfirmPassword ? "text" : "password"}
// //                   name="confirmPassword"
// //                   value={formData.confirmPassword}
// //                   onChange={onChange}
// //                   className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-900 placeholder-gray-500 transition-all duration-300"
// //                   placeholder="Confirm your password"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword((s) => !s)}
// //                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
// //                 >
// //                   {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //         {/* Remember / Forgot */}
// //         {isLogin && authMethod === "email" && (
// //           <div className="flex items-center justify-between">
// //             <label className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
// //               />
// //               <span className="ml-2 text-sm text-gray-600">Remember me</span>
// //             </label>
// //             <button
// //               type="button"
// //               className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline"
// //             >
// //               Forgot password?
// //             </button>
// //           </div>
// //         )}

// //         {/* Submit */}
// //         <button
// //           type="submit"
// //           className={`group w-full font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 flex items-center justify-center gap-3 ${
// //             authMethod === "email"
// //               ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-blue-500/25 border-blue-500/30"
// //               : "bg-gradient-to-r from-green-600 to-green-800 text-white hover:shadow-green-500/25 border-green-500/30"
// //           }`}
// //         >
// //           {authMethod === "phonenumber" && !showOtp
// //             ? isLogin
// //               ? "Send OTP"
// //               : "Send Verification Code"
// //             : isLogin
// //             ? "Sign In to Account"
// //             : "Create Account"}
// //           <ArrowRight
// //             className="transition-transform group-hover:translate-x-1"
// //             size={20}
// //           />
// //         </button>

// //         {/* ✅ Error Message */}
// //         {error && (
// //           <p className="text-red-600 text-sm text-center font-medium mt-3">
// //             {error}
// //           </p>
// //         )}

// //         {/* Terms */}
// //         {!isLogin && (
// //           <p className="text-xs text-gray-500 text-center leading-relaxed">
// //             By creating an account, you agree to our{" "}
// //             <button
// //               type="button"
// //               className="text-blue-700 hover:underline font-medium"
// //             >
// //               Terms of Service
// //             </button>{" "}
// //             and{" "}
// //             <button
// //               type="button"
// //               className="text-blue-700 hover:underline font-medium"
// //             >
// //               Privacy Policy
// //             </button>
// //           </p>
// //         )}
// //       </form>

// //       {/* Switch Form */}
// //       <div className="text-center mt-6">
// //         <p className="text-gray-600">
// //           {isLogin ? "Don't have an account?" : "Already have an account?"}
// //           <button
// //             onClick={toggleForm}
// //             className="ml-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors duration-300"
// //           >
// //             {isLogin ? "Sign up here" : "Sign in here"}
// //           </button>
// //         </p>
// //       </div>

// //       {/* Trust Indicators */}
// //       <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
// //         <div className="flex items-center gap-2">
// //           <Shield className="text-green-600" size={16} />
// //           <span>Secure & Protected</span>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <CheckCircle className="text-blue-600" size={16} />
// //           <span>Government Verified</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AuthForm;