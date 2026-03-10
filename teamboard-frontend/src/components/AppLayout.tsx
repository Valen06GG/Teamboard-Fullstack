import Sidebar from "./Sidebar";

export default function AppLayout({
    children, 
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 bg-gradient-to-br from-gray-950 to-black p-10 via-gray-900 min-h-screen">
                {children}
            </main>
        </div>
    );
  }