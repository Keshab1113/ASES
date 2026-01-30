import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { Shield, TrendingUp, AlertTriangle, BarChart3, Target, Users } from "lucide-react";
import Footer from "../../layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/only_logo.png" 
                  className="w-12 h-12 drop-shadow-lg" 
                  alt="ASES Logo"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                ASES
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">
                Features
              </a>
              <a href="#solutions" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">
                Solutions
              </a>
              <a href="#testimonials" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">
                Case Studies
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="px-4 py-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
              >
                Sign In
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/30 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800 mb-6">
              <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400 mr-2" />
              <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                AI-Powered Safety Intelligence
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900 dark:text-white">Advanced Safety</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">
                & Efficiency Systems
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-white bg-clip-text text-transparent">
              Predict. Prevent. <span className="text-emerald-600 dark:text-emerald-400">Protect.</span>
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Transform your workplace safety with AI-driven predictive analytics that identifies risks before they become incidents, ensuring compliance and operational excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/app"
                className="group relative px-8 py-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-700 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Get Started Free
                  <TrendingUp className="ml-2 w-5 h-5" />
                </span>
              </a>
              
              <a
                href="#demo"
                className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.7%", label: "Risk Prediction Accuracy" },
              { value: "45%", label: "Incident Reduction" },
              { value: "60%", label: "Compliance Efficiency" },
              { value: "24/7", label: "Real-time Monitoring" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              AI-Powered HSE Intelligence
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Advanced analytics and machine learning for proactive safety management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: "Predictive Risk Analytics",
                description: "Identify potential hazards before they occur using advanced ML algorithms"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Real-time Monitoring",
                description: "24/7 surveillance of safety metrics and compliance indicators"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Incident Prevention",
                description: "Proactive measures to eliminate workplace incidents"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Compliance Automation",
                description: "Automated compliance tracking and reporting"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Operational Efficiency",
                description: "Optimize safety processes while reducing operational costs"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Workforce Safety",
                description: "Personalized safety protocols for every employee"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-2xl hover:shadow-sky-100 dark:hover:shadow-sky-900/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-emerald-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Transform Your Safety Operations?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Join industry leaders who trust ASES for predictive safety intelligence
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Your Free Trial
              <Shield className="ml-2 w-5 h-5" />
            </a>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              No credit card required • 30-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}