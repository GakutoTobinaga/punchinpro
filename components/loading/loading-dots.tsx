const LoadingDots = ({ color = '#000' }: { color?: string }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-4">
        <div className="w-4 h-4 bg-current rounded-full" style={{ backgroundColor: color }}></div>
        <div className="w-4 h-4 bg-current rounded-full" style={{ backgroundColor: color }}></div>
        <div className="w-4 h-4 bg-current rounded-full" style={{ backgroundColor: color }}></div>
      </div>
    </div>
  );
};

export default LoadingDots;
