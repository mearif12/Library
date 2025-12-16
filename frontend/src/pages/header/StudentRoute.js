import { Navigate } from "react-router-dom";
import { isStudentLoggedIn } from "../../utils/common";

const StudentRoute = ({ children }) => {
  if (!isStudentLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default StudentRoute;
