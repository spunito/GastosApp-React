import { Button } from "./ui/button"

export const  Navbar = () =>  {

  return (
    <nav className="w-full p-4 bg-background border-b border-border fixed top-0 z-50">
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

          <Button>
            <a href="/login">Iniciar sesión</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
