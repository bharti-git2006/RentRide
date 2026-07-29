import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12">
      
      {/* 404 Graphic Area */}
      <div className="relative mb-6">
        {/* Subtle glowing background effect */}
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform scale-150"></div>
        <h1 className="text-8xl md:text-9xl font-black text-primary relative z-10 tracking-tighter">
          404
        </h1>
      </div>

      {/* Heading */}
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="text-error w-8 h-8 md:w-10 md:h-10 shrink-0" strokeWidth={2.5} />
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-base-content">
          Page Not Found
        </h2>
      </div>

      {/* Description */}
      <p className="text-base-content/70 text-lg font-medium max-w-md mb-8 leading-relaxed">
        Oops! The page you are looking for seems to have hit a dead end or taken a wrong turn.
      </p>

      {/* Call to Action */}
      <Link
        to="/"
        className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
      >
        <Home size={20} strokeWidth={2.5} />
        Back to Home
      </Link>

    </div>
  );
};

export default NotFound;