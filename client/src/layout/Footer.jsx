import { 
  Shield, 
  Building, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  FileText,
  Award,
  CheckCircle,
  Clock,
  MessageSquare,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 border-t border-slate-800 ">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/only_logo.png" 
                  alt="ASES Logo" 
                  className="w-12 h-12"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  ASES
                </h3>
                <p className="text-sm text-slate-400">
                  Advanced Safety & Efficiency Systems
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400">
              AI-powered predictive HSE intelligence for modern enterprises. 
              We help organizations predict, prevent, and protect through 
              advanced analytics and machine learning.
            </p>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Award className="w-3 h-3" />
                ISO 45001
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                OSHA Aligned
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-sky-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Safety Dashboard", href: "/dashboard" },
                { label: "Incident Reporting", href: "/incidents" },
                { label: "Risk Assessment", href: "/risk-assessment" },
                { label: "Training Portal", href: "/training" },
                { label: "Compliance Center", href: "/compliance" },
                { label: "Analytics", href: "/analytics" },
                { label: "Documentation", href: "/docs" },
                { label: "API Access", href: "/api" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 hover:underline transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-sky-400"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Solutions
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Predictive Risk Analytics", desc: "AI-powered risk prediction" },
                { label: "Compliance Management", desc: "Automated compliance tracking" },
                { label: "Incident Management", desc: "End-to-end incident handling" },
                { label: "Safety Training", desc: "Interactive training modules" },
                { label: "Equipment Safety", desc: "Asset monitoring & maintenance" },
                { label: "Mobile Safety", desc: "On-the-go safety management" }
              ].map((solution, index) => (
                <li key={index} className="group">
                  <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {solution.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {solution.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                Stay Updated
              </h4>
              <p className="text-sm text-slate-400 mt-2">
                Subscribe to our safety insights newsletter
              </p>
              
              <form className="mt-4 space-y-3">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your work email"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-10"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-white">Contact Info</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>support@ases.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>123 Safety Ave, San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Follow us:</span>
            <div className="flex items-center gap-3">
              {[
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-900 hover:text-sky-400 transition-all hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Security", href: "/security" },
              { label: "Status", href: "/status" }
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-slate-400 hover:text-white hover:underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-500" />
            <select className="bg-transparent border-none text-sm text-slate-400 focus:ring-0 focus:outline-none">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "500+", label: "Enterprise Clients" },
            { value: "45%", label: "Avg. Incident Reduction" },
            { value: "99.7%", label: "System Uptime" },
            { value: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-slate-800/30 border border-slate-800">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="text-sm text-slate-500 text-center">
              <p className="flex items-center justify-center gap-2">
                <span>© {currentYear} ASES Inc. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>for safer workplaces worldwide</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="outline" className="text-xs text-amber-50">
                <Shield className="w-3 h-3 mr-1" />
                ISO 27001 Certified
              </Badge>
              <Badge variant="outline" className="text-xs text-amber-50">
                <FileText className="w-3 h-3 mr-1" />
                GDPR Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-t border-red-900/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-white">
                Emergency Safety Contact
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+15551234567" className="text-sm text-red-300 hover:text-red-200 transition-colors">
                <Phone className="w-3 h-3 inline mr-1" />
                24/7 Emergency: +1 (555) 911-ASES
              </a>
              <a href="mailto:emergency@ases.com" className="text-sm text-amber-300 hover:text-amber-200 transition-colors">
                <Mail className="w-3 h-3 inline mr-1" />
                emergency@ases.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Additional icon for emergency banner
import { AlertTriangle } from "lucide-react";