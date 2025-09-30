import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import monona from "@/assets/images/monona.jpg";
import { AuthContext } from "@/context/auth/AuthContext"
import type { LoginForm } from "@/types/auth"

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>()
  const [showPassword, setShowPassword] = useState(false)
  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Botón de retroceso - Fijo en la esquina */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 hover:bg-white/50 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Volver al inicio</span>
      </Button>

      {/* Imagen lateral - Oculta en móviles y tablets */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
        <img src={monona} alt="Imagen de prueba" className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-balance">Controla tus gastos</h1>
            <p className="text-xl opacity-90 text-pretty">La forma más inteligente de gestionar tu dinero</p>
          </div>
        </div>
      </div>

      {/* Formulario de login - Full width en móviles */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6 sm:pb-8 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-foreground">
              Bienvenido
            </CardTitle>
            <p className="text-muted-foreground text-center text-pretty text-sm sm:text-base">
              Inicia sesión en tu cuenta
            </p>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            <form onSubmit={handleSubmit(onLogin)} className="space-y-4 sm:space-y-6">
              {/* Campo Email */}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 h-11 sm:h-12 bg-input border-border focus:border-primary transition-colors text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    className="pl-10 pr-10 h-11 sm:h-12 bg-input border-border focus:border-primary transition-colors text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Botón de submit */}
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Iniciar Sesión
              </Button>

              {/* Link olvidaste contraseña */}
              <div className="text-center">
                <a href="#" className="text-xs sm:text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Link crear cuenta */}
              <div className="text-center pt-3 sm:pt-4 border-t border-border">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  ¿No tienes cuenta?{" "}
                  <a
                    href="/register"
                    className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
                  >
                    Crear cuenta
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
