import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is approved
  if (!user.is_approved) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Pending Approval</h2>
          <p className="text-slate-600 mb-6">
            Your account is pending approval from an administrator. You will receive an email once your account is approved.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;