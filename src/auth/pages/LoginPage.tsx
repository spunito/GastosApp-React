import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState } from "react"
import monona from "@/assets/images/monona.jpg";

type LoginForm = {
  email: string
  password: string
}

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: LoginForm) => {
    try {
      // Aquí puedes implementar tu lógica de autenticación
      console.log("Login attempt:", data)

      // Simular autenticación exitosa
      // En una app real, harías una llamada a tu API
      localStorage.setItem("isAuthenticated", "true")

      window.location.href = "/gastos"
    } catch (error) {
      console.log("Error al iniciar sesión")
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="w-1/2 relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
        <img src={monona} alt="Imagen de prueba" className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-balance">Controla tus gastos</h1>
            <p className="text-xl opacity-90 text-pretty">La forma más inteligente de gestionar tu dinero</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-foreground">Bienvenido</CardTitle>
            <p className="text-muted-foreground text-center text-pretty">Inicia sesión en tu cuenta</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 h-12 bg-input border-border focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    className="pl-10 pr-10 h-12 bg-input border-border focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Iniciar Sesión
              </Button>

              <div className="text-center">
                <a href="#" className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm">
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
