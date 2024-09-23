const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};
