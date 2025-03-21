const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>;
  };
  
  const CardContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-4">{children}</div>;
  };
  
  const CardHeader = ({ children }: { children: React.ReactNode }) => {
    return <div className="border-b p-4 font-bold">{children}</div>;
  };
  
  const CardTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="text-lg font-semibold">{children}</h2>;
  };
  
  export { Card, CardContent, CardHeader, CardTitle };
  