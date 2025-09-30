import { Button } from "./ui/button"

export const  Navbar = () =>  {

  return (
    <nav className="w-full p-4 bg-green-700 border-b border-border fixed top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/login" className="text-xl font-bold text-gray-900">
            GastosApp
          </a>

          <a href="/login">
            <Button className="cursor-pointer">
              Iniciar sesión
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}
