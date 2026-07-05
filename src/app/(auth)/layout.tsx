export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#002855] skew-y-3 origin-top-left -z-10 opacity-10"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/NSUT_logo.png" alt="NSUT Logo" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-bold text-[#002855]">NSUT <span className="font-normal text-gray-700">Alumni</span></span>
          </div>
        </div>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[500px]">
        {children}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} NSUT Alumni Network. All rights reserved.
      </div>
    </div>
  );
}
