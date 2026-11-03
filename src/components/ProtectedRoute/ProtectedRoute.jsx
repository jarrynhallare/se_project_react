import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isLoading, children }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;