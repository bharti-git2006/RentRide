import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-7xl font-bold text-primary">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-base-content/60 mt-3">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="btn btn-primary mt-6"
      >
        Back to Home
      </Link>

    </div>
  );
};

export default NotFound;