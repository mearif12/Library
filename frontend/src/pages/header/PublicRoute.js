import { Navigate } from "react-router-dom";
import { isAdminLoggedIn, isStudentLoggedIn } from "../../utils/common";

const PublicRoute = ({ children }) => {
  if (isAdminLoggedIn()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isStudentLoggedIn()) {
    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
