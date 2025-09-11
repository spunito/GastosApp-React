import { Button } from "./ui/button"

export const  Navbar = () =>  {

  return (
    <nav className="w-full p-4 bg-green-700 border-b border-border fixed top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/login" className="text-xl font-bold text-primary">
            GastosApp
          </a>

          <ul className="hidden md:flex items-center space-x-6 font-medium text-foreground">
            <li>
              <a href="" className="hover:text-primary transition-colors">
                Características
              </a>
            </li>
            <li>
              <a href="#precios" className="hover:text-primary transition-colors">
                Precios
              </a>
            </li>
            <li>
              <a href="#ayuda" className="hover:text-primary transition-colors">
                Ayuda
              </a>
            </li>
          </ul>
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
