import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef([]);
  const { verifyOTP, forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, isForgotPassword } = location.state || {};

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5 && inputRefs.current[index + 1]) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    else if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.split('').slice(0, 6);
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) inputRefs.current[nextEmptyIndex]?.focus();
    else if (inputRefs.current[5]) inputRefs.current[5].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits of the verification code');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await verifyOTP(email, otpValue);
      setIsVerified(true);
    } catch (error) {
      setError(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimeLeft(300);
    try {
      await forgotPassword(email);
      alert('A new verification code has been sent to your email');
    } catch (error) {
      setError(error.message || 'Failed to resend code.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link to={isForgotPassword ? "/forgot-password" : "/signup"} className="flex items-center text-sm text-gray-400 hover:text-white">
              ← Back
            </Link>
          </div>
          {!isVerified ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Verification code</h2>
                <p className="mt-2 text-gray-400">
                  Enter the 6-digit code we sent to your email to verify your identity.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="otp-1" className="sr-only">
                    Verification code
                  </label>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-12 text-center text-xl font-bold border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:red-blue-600 focus:border-red-600"
                        required
                      />
                    ))}
                  </div>
                  {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                    disabled={isLoading || otp.some((digit) => !digit)}
                  >
                    {isLoading ? 'Verifying...' : 'Verify code'}
                  </button>
                </div>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Didn't receive the code?{' '}
                  {timeLeft > 0 ? (
                    <span className="text-gray-500">Resend in {formatTime(timeLeft)}</span>
                  ) : (
                    <button type="button" className="cursor-pointer text-red-600 hover:text-red-500" onClick={handleResend}>
                      Resend code
                    </button>
                  )}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Verification successful</h3>
              <p className="text-gray-400 mb-6">
                {isForgotPassword ? 'You can now reset your password.' : 'Your email has been verified. Please log in.'}
              </p>
              <Link to={isForgotPassword ? '/reset-password' : '/login'} state={{ email }}>
                <button className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                  {isForgotPassword ? 'Reset password' : 'Log in'}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://image.tmdb.org/t/p/w1280/yRKyJJYIzfeiVDHBe4LXguPQCvD.jpg"
          alt="Movie scene"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Almost there!</h2>
            <p className="text-xl text-gray-300">Verify your identity to securely access your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;