import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { 
  Shield, TrendingUp, AlertTriangle, BarChart3, Target, Users,
  CheckCircle, Clock, Award, Building2, HardHat, FileCheck,
  Brain, Activity, Bell, Zap, Globe, Lock, Download, Play,
  Star, Quote, ChevronRight, Layers, Gauge, LineChart
} from "lucide-react";
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
              <a href="#how-it-works" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">
                Case Studies
              </a>
              <a href="#resources" className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors">
                Resources
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
              Transform your workplace safety with AI-driven predictive analytics that identifies risks before they become incidents, ensuring compliance and operational excellence across your entire organization.
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
                Watch Demo
                <Play className="ml-2 w-4 h-4 inline" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70">
              <span className="text-sm text-slate-500 dark:text-slate-400">Trusted by industry leaders</span>
              <div className="flex items-center space-x-6">
                <Building2 className="w-8 h-8 text-slate-400" />
                <HardHat className="w-8 h-8 text-slate-400" />
                <Award className="w-8 h-8 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.7%", label: "Risk Prediction Accuracy", suffix: "" },
              { value: "45%", label: "Incident Reduction", suffix: "avg" },
              { value: "60%", label: "Compliance Efficiency", suffix: "increase" },
              { value: "24/7", label: "Real-time Monitoring", suffix: "coverage" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
                {stat.suffix && (
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {stat.suffix}
                  </div>
                )}
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
              Advanced analytics and machine learning for proactive safety management across your entire organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Predictive Risk Analytics",
                description: "Identify potential hazards before they occur using advanced ML algorithms with 99.7% accuracy",
                benefits: ["Early warning system", "Risk scoring", "Trend analysis"]
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Real-time Monitoring",
                description: "24/7 surveillance of safety metrics, environmental conditions, and compliance indicators",
                benefits: ["IoT integration", "Instant alerts", "Live dashboards"]
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Incident Prevention",
                description: "Proactive measures and automated interventions to eliminate workplace incidents",
                benefits: ["Automated responses", "Prevention workflows", "Root cause analysis"]
              },
              {
                icon: <FileCheck className="w-8 h-8" />,
                title: "Compliance Automation",
                description: "Automated compliance tracking, reporting, and documentation for all regulatory standards",
                benefits: ["OSHA ready", "Auto-reporting", "Audit trails"]
              },
              {
                icon: <Gauge className="w-8 h-8" />,
                title: "Operational Efficiency",
                description: "Optimize safety processes while reducing operational costs by up to 40%",
                benefits: ["Cost reduction", "Process optimization", "Resource allocation"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Workforce Safety",
                description: "Personalized safety protocols, training, and monitoring for every employee",
                benefits: ["Role-based safety", "Training tracking", "Performance metrics"]
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
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How ASES Transforms Safety Management
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From data collection to predictive insights in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line (hidden on mobile) */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-sky-200 via-emerald-200 to-sky-200"></div>
            
            {[
              {
                step: "01",
                title: "Data Collection",
                description: "Aggregate safety data from IoT sensors, inspections, and historical records",
                icon: <Layers className="w-8 h-8" />
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Machine learning algorithms analyze patterns and identify risk factors",
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Risk Prediction",
                description: "Predict potential incidents with 99.7% accuracy before they occur",
                icon: <LineChart className="w-8 h-8" />
              },
              {
                step: "04",
                title: "Automated Response",
                description: "Trigger automated safety protocols and alert relevant personnel",
                icon: <Zap className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-bold text-xl mb-6 relative z-10">
                  {item.step}
                </div>
                <div className="flex justify-center mb-4 text-sky-600 dark:text-sky-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Tailored safety intelligence for your industry's unique challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                industry: "Construction",
                icon: <HardHat className="w-12 h-12" />,
                features: ["Fall detection", "Equipment safety", "Site monitoring", "Weather alerts"],
                image: "🏗️"
              },
              {
                industry: "Manufacturing",
                icon: <Building2 className="w-12 h-12" />,
                features: ["Machine safety", "Chemical exposure", "Ergonomics", "Quality control"],
                image: "🏭"
              },
              {
                industry: "Oil & Gas",
                icon: <Activity className="w-12 h-12" />,
                features: ["H2S monitoring", "Emergency response", "Pipeline safety", "Remote operations"],
                image: "🛢️"
              }
            ].map((solution, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="text-6xl mb-6">{solution.image}</div>
                <div className="text-sky-600 dark:text-sky-400 mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {solution.industry}
                </h3>
                <ul className="space-y-3">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="mt-6 inline-flex items-center text-sky-600 dark:text-sky-400 font-medium hover:text-sky-700">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Trusted by Safety Leaders
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See how organizations are transforming their safety culture with ASES
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "ASES reduced our incident rate by 52% in the first year. The predictive analytics gave us insights we never had before.",
                author: "Sarah Johnson",
                role: "HSE Director, Global Construction Inc.",
                rating: 5,
                image: "👩‍💼"
              },
              {
                quote: "The compliance automation alone saved us 200+ hours annually. Now we can focus on prevention instead of paperwork.",
                author: "Michael Chen",
                role: "Safety Manager, TechManufacturing",
                rating: 5,
                image: "👨‍💼"
              },
              {
                quote: "Real-time monitoring and instant alerts have transformed how we respond to potential hazards. Absolutely essential tool.",
                author: "David Rodriguez",
                role: "EHS Lead, Energy Solutions Co.",
                rating: 5,
                image: "👨‍🔧"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <Quote className="w-8 h-8 text-sky-300 dark:text-sky-600 mb-4" />
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Resources & Insights
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Stay updated with the latest in safety technology and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "Whitepaper",
                title: "The Future of Workplace Safety: AI and Predictive Analytics",
                description: "Discover how machine learning is revolutionizing HSE management",
                icon: <FileCheck className="w-6 h-6" />,
                action: "Download"
              },
              {
                type: "Case Study",
                title: "How Manufacturer Reduced Incidents by 60% with ASES",
                description: "Learn from real-world implementation and results",
                icon: <BarChart3 className="w-6 h-6" />,
                action: "Read More"
              },
              {
                type: "Webinar",
                title: "Predictive Safety: A New Era in Risk Management",
                description: "Expert insights on implementing predictive safety programs",
                icon: <Play className="w-6 h-6" />,
                action: "Watch Now"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    {resource.type}
                  </span>
                  <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {resource.description}
                </p>
                <a href="#" className="inline-flex items-center text-sky-600 dark:text-sky-400 font-medium hover:text-sky-700">
                  {resource.action}
                  <Download className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Enterprise-Grade Safety Platform
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Built for large-scale operations with advanced security, compliance, and integration capabilities
              </p>
              
              <div className="space-y-4">
                {[
                  "SOC 2 Type II certified",
                  "Custom API integrations",
                  "Multi-site management",
                  "Advanced analytics dashboard",
                  "Dedicated success manager"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="/enterprise"
                className="inline-flex items-center mt-8 px-6 py-3 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Contact Sales
                <ChevronRight className="ml-2 w-4 h-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-sky-600 dark:text-sky-400" />
                <div className="font-semibold">Bank-level Security</div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-sky-600 dark:text-sky-400" />
                <div className="font-semibold">Global Compliance</div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-sky-600 dark:text-sky-400" />
                <div className="font-semibold">99.9% Uptime</div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-sky-600 dark:text-sky-400" />
                <div className="font-semibold">24/7 Support</div>
              </div>
            </div>
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
              Join over 500+ organizations that trust ASES for predictive safety intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Your Free Trial
                <Shield className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all"
              >
                Schedule Demo
                <Play className="ml-2 w-4 h-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span>✓ SOC 2 Type II</span>
                <span>✓ GDPR Compliant</span>
                <span>✓ ISO 27001 Certified</span>
                <span>✓ HIPAA Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}