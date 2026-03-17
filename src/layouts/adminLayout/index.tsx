import { Outlet, NavLink } from "react-router-dom"
import { useState } from "react"
import { 
  FiMenu, 
  FiHome, 
  FiBox, 
  FiUsers, 
  FiLogOut 
} from "react-icons/fi"

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-100 relative">

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          z-50 md:z-auto
          top-0 left-0
          h-full md:h-auto
          w-64
          bg-gray-900 text-white
          p-5 space-y-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold">Admin Panel</h2>

        <nav className="space-y-2">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive
                  ? "bg-gray-700"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <FiHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/contents"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive
                  ? "bg-gray-700"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <FiBox />
            Content
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive
                  ? "bg-gray-700"
                  : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            <FiUsers />
            Users
          </NavLink>

        </nav>

        {/* Logout */}
        <button className="mt-10 flex items-center gap-3 text-red-400 hover:text-red-500">
          <FiLogOut />
          Logout
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>

          <h1 className="text-lg md:text-xl font-semibold">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-gray-600">
              Admin
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout