const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <a href="/" className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            Go Back Home
          </a>
        </div>
        <div className="mt-8">
          <img src="/logo.png" alt="Not Found" className="mx-auto w-72 h-72" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
