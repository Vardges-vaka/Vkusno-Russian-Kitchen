// import { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AdminContext } from "../../contexts/AdminContext";

// const ProtectedAdminRoute = ({ children }) => {
//   const { adminRole, loading } = useContext(AdminContext);
//   const location = useLocation();

//   // Show loading state while checking authentication
//   if (loading) {
//     return <div>Loading...</div>; // Replace this with a proper loading component
//   }

//   // Check if user has admin privileges
//   const isAdmin = adminRole === "Admin";

//   if (!isAdmin) {
//     // Redirect to admin welcome page while saving the attempted location
//     return <Navigate to="/admin/welcome" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedAdminRoute;
