export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  items-center justify-center bg-muted/30">
      <div className="w-full  ">
        {children}
      </div>
    </div>
  );
}
