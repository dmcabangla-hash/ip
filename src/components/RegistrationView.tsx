import React, { useState } from 'react';

interface RegistrationViewProps {
  onRegister: (name: string, email: string, pass: string) => void;
  onNavigateSignIn: () => void;
  onNavigateHome: () => void;
  onOpenMenu: () => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  onRegister,
  onNavigateSignIn,
  onNavigateHome,
  onOpenMenu,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('Password should be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to our Terms & Conditions');
      return;
    }

    onRegister(name.trim(), email.trim(), password);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      {/* Top Header strictly matching Image 4 */}
      <header className="w-full bg-[#f4f4f4] select-none">
        <div className="w-full px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="group focus:outline-none flex items-center text-left"
            title="DarkHUB"
          >
            <div className="relative inline-flex items-center text-[32px] sm:text-[38px] font-black tracking-tight text-black leading-none">
              <span className="relative pb-1">
                Dark
                <span className="absolute bottom-0 left-0 w-full h-[3.5px] bg-[#E50914]" />
              </span>
              <span className="relative pt-1 ml-0.5">
                HUB
                <span className="absolute top-0 left-0 w-full h-[3.5px] bg-[#E50914]" />
              </span>
            </div>
          </button>

          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="w-11 h-11 flex flex-col justify-center items-end gap-[5px] p-1.5 focus:outline-none active:scale-95 transition-transform"
          >
            <span className="w-8 h-[4px] bg-black rounded-xs block"></span>
            <span className="w-8 h-[4px] bg-black rounded-xs block"></span>
            <span className="w-8 h-[4px] bg-black rounded-xs block"></span>
          </button>
        </div>
      </header>

      {/* Main Registration Center Form Card (Exact match of Image 4) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-[360px] sm:max-w-[400px] bg-[#800000] text-white rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-center tracking-tight text-white">
            Registration
          </h2>

          {errorMsg && (
            <div className="p-2 bg-red-950/80 border border-white/30 text-white text-xs font-semibold rounded-lg text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name Field */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-white mb-1 text-left">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full h-11 px-4 rounded-lg bg-[#EAEAEA] text-black font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Mail Address Field */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-white mb-1 text-left">
                Mail Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full h-11 px-4 rounded-lg bg-[#EAEAEA] text-black font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-white mb-1 text-left">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full h-11 px-4 rounded-lg bg-[#EAEAEA] text-black font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-white mb-1 text-left">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full h-11 px-4 rounded-lg bg-[#EAEAEA] text-black font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Terms & Conditions Checkbox (Exact match of Image 4) */}
            <div className="pt-2 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs sm:text-[13px] text-white/95 cursor-pointer leading-tight">
                By clicking, you agree to our Terms & Conditions
              </label>
            </div>

            {/* Continue Button (Rounded rect with white border matching Image 4) */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="px-10 py-2 rounded-xl border-2 border-white text-lg sm:text-xl font-bold text-white hover:bg-white hover:text-[#800000] active:scale-95 transition-all shadow-md"
              >
                Continue
              </button>
            </div>

            {/* Already have an account */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onNavigateSignIn}
                className="text-xs text-white/80 hover:text-white underline transition-colors"
              >
                Already have an account? Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};
