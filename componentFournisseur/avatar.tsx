export function Avatar({ children }: { children: React.ReactNode }) {
  return <div className="rounded-full w-10 h-10 bg-gray-200 overflow-hidden">{children}</div>;
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-500 text-center w-full h-full flex items-center justify-center">{children}</div>;
}
