import { Button } from "./ui/button"

export const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-slate-900 border-b border-slate-800 fixed top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/login" className="text-xl font-bold text-white">
            GastosApp
          </a>

          <a href="/login">
            <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Iniciar sesión
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}
