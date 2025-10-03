"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useState } from "react"
import monona from "@/assets/images/monona.jpg"
import { api } from "@/api/api"
import type { RegisterForm } from "@/types/auth"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [incorrectPassword, setIncorrectPassword] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: RegisterForm) => {
    try {
      if (data.password !== data.confirmPassword) {
        setIncorrectPassword(true)
        return
      }
      setIncorrectPassword(false)

      const { username, email, password } = data
      const res = await api.post("/users/register", {
        name: username,
        email,
        password,
      })

      navigate("/login")
      console.log("Registro exitoso:", res.data)
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error",
        text: `Fallo al registrar cuenta`,
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Imagen lateral */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-purple-950/80 z-10"></div>
        <img src={monona || "/placeholder.svg"} alt="Imagen de prueba" className="w-full h-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-balance">Únete a nosotros</h1>
            <p className="text-xl opacity-90 text-pretty">Comienza tu viaje hacia el control financiero</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-2xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
          <CardHeader className="space-y-2 pb-6 sm:pb-8 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-white">Crear Cuenta</CardTitle>
            <p className="text-slate-400 text-center text-pretty text-sm sm:text-base">Regístrate para comenzar</p>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Nombre de Usuario*/}
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    {...register("username", { required: "El nombre de usuario es obligatorio" })}
                    type="text"
                    placeholder="Tu nombre de usuario"
                    className="pl-10 h-11 sm:h-12 bg-slate-950 border-slate-700 focus:border-blue-500 transition-colors text-sm sm:text-base text-white placeholder:text-slate-500"
                  />
                </div>
                {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    {...register("email", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                        message: "Correo electrónico no válido",
                      },
                    })}
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 h-11 sm:h-12 bg-slate-950 border-slate-700 focus:border-blue-500 transition-colors text-sm sm:text-base text-white placeholder:text-slate-500"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    className="pl-10 pr-10 h-11 sm:h-12 bg-slate-950 border-slate-700 focus:border-blue-500 transition-colors text-sm sm:text-base text-white placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    {...register("confirmPassword", {
                      required: "Debes confirmar tu contraseña",
                      minLength: { value: 8, message: "La confirmación debe tener al menos 8 caracteres" },
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu contraseña"
                    className="pl-10 pr-10 h-11 sm:h-12 bg-slate-950 border-slate-700 focus:border-blue-500 transition-colors text-sm sm:text-base text-white placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>}
                {incorrectPassword && <p className="text-red-400 text-sm">Las contraseñas no coinciden</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/30"
              >
                Crear Cuenta
              </Button>

              <div className="text-center pt-3 sm:pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-xs sm:text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
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
