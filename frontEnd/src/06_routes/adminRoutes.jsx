// import { lazy } from "react";
// import ProtectedAdminRoute from "./protection/ProtectedAdminRoute";

// // Lazy load admin components
// const AdminWelcome = lazy(() =>
//   import("../pages/admin/adminWelcome/AdminWelcome")
// );
// const AdminProfile = lazy(() =>
//   import("../pages/admin/adminProfile/AdminProfile")
// );

// const RiderDashboard = lazy(() =>
//   import("../pages/fulfillment/rider/RiderDashboard")
// );

// const KitchenDashboard = lazy(() =>
//   import("../pages/fulfillment/kitchen/KitchenDashboard")
// );

// export const adminRoutes = [
//   {
//     path: "/admin/welcome",
//     element: <AdminWelcome />,
//   },
//   {
//     path: "/admin/dashboard",
//     element: (
//       <ProtectedAdminRoute>
//         <AdminProfile />
//       </ProtectedAdminRoute>
//     ),
//   },

//   {
//     path: "/admin/order/_fulfillment/rider",
//     element: (
//       <ProtectedAdminRoute>
//         <RiderDashboard />
//       </ProtectedAdminRoute>
//     ),
//   },

//   {
//     path: "/admin/order/_fulfillment/kitchen",
//     element: (
//       <ProtectedAdminRoute>
//         <KitchenDashboard />
//       </ProtectedAdminRoute>
//     ),
//   },
// ];
