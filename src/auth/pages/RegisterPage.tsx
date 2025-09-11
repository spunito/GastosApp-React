import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useState } from "react"
import monona from "@/assets/images/monona.jpg";
import { api } from "@/api/api"


type RegisterForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterPage = () => {
  const { register, handleSubmit} = useForm<RegisterForm>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async (data: RegisterForm) => {
    try {
      // Validación de contraseña
      if (data.password !== data.confirmPassword) {
        console.log("Las contraseñas no coinciden");
        return;
      }

      const { username, email, password } = data;

      // Request con Axios instance
      const res = await api.post("/users/register", {
        name: username,
        email,
        password,
      });

      console.log("Registro exitoso:", res.data);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="w-1/2 relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
        <img src={monona} alt="Imagen de prueba" className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-balance">Únete a nosotros</h1>
            <p className="text-xl opacity-90 text-pretty">Comienza tu viaje hacia el control financiero</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-foreground">Crear Cuenta</CardTitle>
            <p className="text-muted-foreground text-center text-pretty">Regístrate para comenzar</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("username")}
                    type="text"
                    placeholder="Tu nombre de usuario"
                    className="pl-10 h-12 bg-input border-border focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

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

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu contraseña"
                    className="pl-10 pr-10 h-12 bg-input border-border focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Crear Cuenta
              </Button>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/login" className="text-secondary hover:text-secondary/80 font-semibold transition-colors">
                    Iniciar sesión
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
