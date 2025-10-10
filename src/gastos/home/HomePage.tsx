import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { TrendingUp, PieChart, BarChart3, Shield, Smartphone, Users } from "lucide-react"
import monona from "@/assets/images/monona.jpg";
import { Navbar } from "@/components/Navbar";
import { Footer } from "./components/Footer";


export const HomePage = () => {
  return (
    <>
      <Navbar/>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Controla tus gastos
                <span className="text-primary"> fácilmente</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl">
                Gestiona tus finanzas personales de manera inteligente. Rastrea gastos, crea presupuestos y toma
                decisiones financieras informadas con Fynnova.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/login" className="cursor-pointer">
                <Button size="lg" className="text-lg px-8 py-6">
                  
                  Empieza Ahora
                </Button>
                </a>

              </div>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-lg">
                <img
                  src={monona}
                  alt="Fynnova interface preview"
                  className="rounded-2xl shadow-2xl w-full h-auto max-w-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      
      {/* <section id="caracteristicas" className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Características principales</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todas las herramientas que necesitas para tomar control de tus finanzas personales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Seguimiento de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Registra y categoriza todos tus gastos automáticamente para un control total
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Presupuestos Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Crea presupuestos personalizados y recibe alertas cuando te acerques a los límites
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Informes Detallados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Visualiza tus patrones de gasto con gráficos y reportes comprensibles</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Seguridad Total</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tus datos financieros están protegidos con encriptación de nivel bancario
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Acceso Móvil</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Gestiona tus finanzas desde cualquier lugar con nuestra app móvil</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Gastos Compartidos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Comparte gastos con familia y amigos de manera fácil y transparente</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Listo para tomar control de tus finanzas?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están mejorando su salud financiera con Fynnova
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Comenzar Gratis
          </Button>
        </div>
      </section> 

      {/* Footer */}

      <Footer />
      
    </>
  )
}
