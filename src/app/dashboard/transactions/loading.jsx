export default function Loading() {
    return (
      <div className="fixed top-0 left-0 w-full  flex items-center justify-center bg-opacity-90 z-50">
        <div className="relative flex flex-col items-center mt-28">
          {/* Coin Animation */}
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg animate-spin-slow">
            💰
          </div>
          {/* Loading Text */}
          <p className="text-white mt-4 text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }
  