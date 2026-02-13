"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');

    let valid = true;

    // Validate full name
    if (!fullName.trim()) {
      setFullNameError('Please enter your full name');
      valid = false;
    } else {
      setFullNameError('');
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!password.trim()) {
      setPasswordError('Please enter a password');
      valid = false;
    } else if (passwordValidation) {
      setPasswordError(passwordValidation);
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      await register(fullName, email, password);
      router.push('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-[70%] mx-auto py-16">
      <div className="grid grid-cols-12 gap-8 text-[#2a2b3f]">
        <div className="col-span-6">
          <img
            src="/assets/desktop-illustration.webp"
            alt="desktop-illustration"
            className=""
          />
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-4 pt-12">
          <h2 className="font-bold text-3xl text-center mb-8">
            Sign up with email
          </h2>

            <form onSubmit={handleEmailSubmit} className="mt-4 mb-10 space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full py-5 px-4 border border-solid rounded placeholder-[#2a2b3f] text-sm font-bold mb-4 ${
                    fullNameError 
                      ? 'border-red-500 bg-red-50 placeholder-red-500' 
                      : 'border-[#9194ac]'
                  }`}
                  disabled={isLoading}
                />
                {fullNameError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    {fullNameError}
                  </p>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-5 px-4 border border-solid rounded placeholder-[#2a2b3f] text-sm font-bold mb-4 ${
                    emailError 
                      ? 'border-red-500 bg-red-50 placeholder-red-500' 
                      : 'border-[#9194ac]'
                  }`}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {emailError}
                  </p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full py-5 px-4 border border-solid rounded placeholder-[#2a2b3f] text-sm font-bold mb-4 ${
                    passwordError 
                      ? 'border-red-500 bg-red-50 placeholder-red-500' 
                      : 'border-[#9194ac]'
                  }`}
                  disabled={isLoading}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    {passwordError}
                  </p>
                )}

                <label className="flex gap-2 items-start text-sm cursor-pointer text-[#2a2b3f]">
                  <input 
                    type="checkbox" 
                    className="peer hidden" 
                  />
                  <span className="
                    w-4 h-4 
                    inline-block 
                    border-solid
                    border-2 border-[#33364a] 
                    rounded
                    peer-checked:bg-[#6d28d2] 
                    peer-checked:border-[#6d28d2]
                    relative
                    flex-shrink-0
                    mt-1
                  ">
                    <svg 
                      className="absolute top-0 left-0 w-3 h-3 stroke-white stroke-[1.5px]" 
                      viewBox="0 0 24 24" 
                      fill="#fff" 
                      stroke="currentColor" 
                      strokeWidth="0.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Send me special offers, personalized recommendations, and learning tips.
                </label>
              </div>
              
              {apiError && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {apiError}
                </p>
              )}
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6d28d2] text-white p-3 rounded font-medium flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Continue with email'
                )}
              </button>

              <div className="flex items-center justify-center my-4 mb-0">
                  <hr className="flex-grow border-t border-solid border-gray-300" />
                  <span className="mx-2 text-xs text-gray-600">Other sign up options</span>
                  <hr className="flex-grow border-t border-solid border-gray-300" />
                </div>
                
                <div className="flex justify-center gap-4">
                  <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?gsiwebsdk=3&client_id=700206021005-as1l679sch207mp70msgjhma1krf3k9q.apps.googleusercontent.com&scope=email%20profile&redirect_uri=storagerelay%3A%2F%2Fhttps%2Fwww.udemy.com%3Fid%3Dauth153808&prompt=consent&access_type=offline&response_type=code&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&flowName=GeneralOAuthFlow"
                  className="p-3 border border-solid border-[#6d28d2] rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                      <path fill="#FBBC05" d="M9.83 24c0-1.52.25-2.98.7-4.36L2.62 13.6A23.9 23.9 0 0 0 .21 24c0 3.74.87 7.26 2.41 10.39l7.9-6.05A14.2 14.2 0 0 1 9.83 24z" />
                      <path fill="#EB4335" d="M23.71 10.13c3.31 0 6.3 1.17 8.66 3.1l6.83-6.83A23.8 23.8 0 0 0 23.71.53c-9.28 0-17.27 5.31-21.09 13.07l7.91 6.04c1.82-5.53 7.01-9.51 13.18-9.51z" />
                      <path fill="#34A853" d="M23.71 37.87c-6.17 0-11.36-3.98-13.18-9.51l-7.9 6.04c3.82 7.76 11.8 13.07 21.08 13.07 5.73 0 11.2-2.03 15.31-5.85l-7.51-5.8a14.1 14.1 0 0 1-7.8 2.1z" />
                      <path fill="#4285F4" d="M46.15 24c0-1.39-.22-2.88-.53-4.27H23.71v9.07h12.61c-.63 3.09-2.35 5.49-4.8 7.04l7.51 5.8C43.34 37.61 46.15 31.65 46.15 24z" />
                    </svg>
                  </a>
                  <a href='https://www.facebook.com/login.php?skip_api_login=1&api_key=313137469260&kid_directed_site=0&app_id=313137469260&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv18.0%2Fdialog%2Foauth%3Fapp_id%3D313137469260%26cbt%3D1748070622399%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df6c2c7d09980fe137%2526domain%253Dwww.udemy.com%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fwww.udemy.com%25252Ffc542688a95997d59%2526relation%253Dopener%26client_id%3D313137469260%26display%3Dpopup%26domain%3Dwww.udemy.com%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttps%253A%252F%252Fwww.udemy.com%252Fjoin%252Fpasswordless-auth%252F%253Flocale%253Den_US%2526next%253Dhttps%25253A%25252F%25252Fwww.udemy.com%25252F%25253Fsrsltid%25253DAfmBOooZo8uXfSiQP-RRLi2Wct0Eq7gf591wG6yANmv03vygf4nfzCAm%2526response_type%253Dhtml%2526action%253Dsignup%2526mode%253Dmarketplace-signup%26locale%3Den_US%26logger_id%3Dffbbcff92be588d60%26origin%3D1%26redirect_uri%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df571debaeb1e740cb%2526domain%253Dwww.udemy.com%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fwww.udemy.com%25252Ffc542688a95997d59%2526relation%253Dopener%2526frame%253Df35102c10634cb1a1%26response_type%3Dtoken%252Csigned_request%252Cgraph_domain%26scope%3Demail%26sdk%3Djoey%26version%3Dv18.0%26ret%3Dlogin%26fbapp_pres%3D0%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df571debaeb1e740cb%26domain%3Dwww.udemy.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.udemy.com%252Ffc542688a95997d59%26relation%3Dopener%26frame%3Df35102c10634cb1a1%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied&display=popup&locale=en_GB&pl_dbl=0' 
                  className="p-3 border border-solid border-[#6d28d2] rounded">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                    </svg>
                  </a>
                  <a href='https://appleid.apple.com/auth/authorize?client_id=com.udemy.web&redirect_uri=https%3A%2F%2Fwww.udemy.com%2Fjoin%2Fsocial-complete%2Fapple%2Fsignup%2F&response_type=code%20id_token&state=qaqecbhhyormxbqr&scope=name%20email&response_mode=web_message&frame_id=60ab6963-c2a4-464a-8303-7ad98e740a64&m=11&v=1.5.5' 
                  className="p-3 border border-solid border-[#6d28d2] rounded">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>

                <p className='text-xs '>By signing up, you agree to our <a href="" className='underline text-[#6d28d2] underline-offset-4 text-xs'>Terms of Use</a> and <a href=""className='underline text-[#6d28d2] underline-offset-4 text-xs'>Privacy Policy.</a></p>
              </form>

          <ul className="mt-2 flex flex-col items-center">
            <li className="bg-[#f6f7f9] p-3 border-b border-solid border-[#d1d2e0] w-full flex gap-1 items-center justify-center">
              Already have an account?{" "}
              <a href="/login" className="text-[#6d28d2] font-bold underline underline-offset-2">
                Log in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}