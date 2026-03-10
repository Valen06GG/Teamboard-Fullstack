import HomeNavbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

          <HomeNavbar />
    
          <section className="flex flex-col items-center text-center mt-24 px-6">
    
            <h2 className="text-6xl font-bold mb-6">
              Manage your team work
            </h2>
    
            <p className="text-gray-400 text-lg max-w-2xl mb-10">
              Organize projects, assign tasks and track progress with TeamBoard.
              Built for modern teams who want speed and simplicity.
            </p>
    
            <div className="flex gap-6">
    
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg transition"
              >
                Start for free
              </Link>
    
              <Link
                href="/login"
                className="border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-xl text-lg transition"
              >
                Login
              </Link>
    
            </div>
    
          </section>
    
          <section className="grid grid-cols-3 gap-8 max-w-6xl mx-auto mt-32 px-6">
    
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">
                Project Management
              </h3>
    
              <p className="text-gray-400">
                Organize your company projects in a simple and efficient way.
              </p>
            </div>
    
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">
                Task Assignment
              </h3>
    
              <p className="text-gray-400">
                Assign tasks to your team members and track progress easily.
              </p>
            </div>
    
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">
                Team Collaboration
              </h3>
    
              <p className="text-gray-400">
                Keep everyone aligned and focused on the same goals.
              </p>
            </div>
    
          </section>
    
          <footer className="text-center text-gray-500 mt-32 pb-10">
            © 2026 TeamBoard
          </footer>
    
        </div>
  );
}