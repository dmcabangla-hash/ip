import React, { useState } from 'react';

interface SignInViewProps {
  onSignIn: (email: string, pass: string) => boolean;
  onNavigateRegister: () => void;
  onNavigateHome: () => void;
  onOpenMenu: () => void;
}

export const SignInView: React.FC<SignInViewProps> = ({
  onSignIn,
  onNavigateRegister,
  onNavigateHome,
  onOpenMenu,
}) => {
  const [email, setEmail] = useState('rajalamin@darkhub.com');
  const [password, setPassword] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter your email and password');
      return;
    }
    const success = onSignIn(email.trim(), password);
    if (!success) {
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      {/* Top Header strictly matching Image 3 */}
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

      {/* Main Sign In Center Form Card (Exact match of Image 3) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-[360px] sm:max-w-[400px] bg-[#800000] text-white rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Card Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-center tracking-tight text-white">
            Sign In
          </h2>

          {errorMsg && (
            <div className="p-2 bg-red-950/80 border border-white/30 text-white text-xs font-semibold rounded-lg text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mail Field */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-white mb-1.5 text-left">
                Mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full h-12 px-4 rounded-lg bg-[#EAEAEA] text-black font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-white mb-1.5 text-left">
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
                className="w-full h-12 px-4 rounded-lg bg-[#EAEAEA] text-black font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Login Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="text-xl sm:text-2xl font-black text-white hover:opacity-90 active:scale-98 transition-all"
              >
                Login
              </button>
            </div>

            {/* Sign Up Now Link */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onNavigateRegister}
                className="text-sm sm:text-base font-semibold text-white/95 hover:text-white underline-offset-2 hover:underline transition-colors"
              >
                Sign Up Now
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials for Instant Testing */}
          <div className="pt-4 border-t border-white/20 text-center text-xs text-white/80 space-y-2">
            <span className="block font-bold uppercase tracking-wider text-[10px] text-white/90">
              Quick Test Login (1-Click)
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setEmail('rajalamin@darkhub.com');
                  setPassword('123456');
                  onSignIn('rajalamin@darkhub.com', '123456');
                }}
                className="w-full py-1.5 px-2 bg-black/40 hover:bg-black/60 rounded text-[11px] font-bold text-white transition-colors"
              >
                Sign In as Raj Alamin (National Cyber Team)
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('raj.rdx@darkhub.com');
                  setPassword('123456');
                  onSignIn('raj.rdx@darkhub.com', '123456');
                }}
                className="w-full py-1.5 px-2 bg-black/40 hover:bg-black/60 rounded text-[11px] font-bold text-white transition-colors"
              >
                Sign In as Raj Alamin (RDX Zone)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};
