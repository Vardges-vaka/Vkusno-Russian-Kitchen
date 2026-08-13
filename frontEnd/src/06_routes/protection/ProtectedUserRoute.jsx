// import { useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useUserContext } from "../../contexts/contexts.index.js";

// const ProtectedUserRoute = ({ children }) => {
//   const { userAccessLevel, loading, updateAuthStatus } = useUserContext();
//   const location = useLocation();

//   useEffect(() => {
//     updateAuthStatus();
//   }, [updateAuthStatus]);

//   // Show loading state while checking authentication
//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a proper loading component
//   }

//   // Check if user has admin privileges
//   const isUser = userAccessLevel === "User";
//   // console.log("userAccessLevel:", userAccessLevel);

//   if (!isUser) {
//     // Redirect to admin welcome page while saving the attempted location
//     console.log("Redirecting to admin welcome page");
//     console.log("userAccessLevel in ProtectedUserRoute:", userAccessLevel);
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedUserRoute;
