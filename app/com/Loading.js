// components/Loading.jsx
const Loading = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  };
  
  export default Loading;