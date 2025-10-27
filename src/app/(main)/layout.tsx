import Header from "@/components/Header";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="min-h-screen w-screen flex bg-gray-50 ">
        <div className="max-w-full w-screen ">{children}</div>
      </div>
    </div>
  );
}
