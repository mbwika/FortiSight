import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Cloud, Shield, BrainCircuit, BarChart2, Code, Users } from "lucide-react";
import { ServiceModal } from "./ServiceModal";
import { useState } from "react";

const services = [
  {
    icon: Shield,
    title: "Security Assessment",
    description: "Comprehensive security check of your online presence to identify vulnerabilities before hackers do.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Security Assessment",
      focusAreas: [
        "Website Security Review – Checking for SSL issues, misconfigurations, and exposed vulnerabilities.",
        "Email Security Analysis – Verifying DMARC, SPF, and DKIM configurations to prevent impersonation.",
        "Domain Security Check – Assessing DNS settings and domain registration security.",
        "Data Breach Monitoring – Scanning for exposed employee emails and credentials.",
        "Risk Scoring – Providing a clear risk score with explanations of potential impacts.",
        "Actionable Recommendations – Step-by-step fixes without technical jargon."
      ]
    }
  },
  {
    icon: Cloud,
    title: "Email Protection Setup",
    description: "Implement essential email security protocols to prevent phishing and impersonation attacks.",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Email Protection Setup",
      focusAreas: [
        "DMARC Implementation – Setting up Domain-based Message Authentication to block spoofed emails.",
        "SPF Configuration – Sender Policy Framework to verify legitimate email sources.",
        "DKIM Setup – DomainKeys Identified Mail for email authentication and integrity.",
        "Anti-Phishing Measures – Configuring filters and policies to detect phishing attempts.",
        "Email Encryption – Implementing TLS and secure email practices.",
        "Ongoing Monitoring – Regular checks to ensure email security remains effective."
      ]
    }
  },
  {
    icon: Code,
    title: "Website Security Hardening",
    description: "Strengthen your website against common attacks and ensure customer trust.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Website Security Hardening",
      focusAreas: [
        "SSL/TLS Certificate Management – Ensuring proper HTTPS implementation and certificate validity.",
        "Security Headers – Adding security headers to prevent common web vulnerabilities.",
        "Input Validation – Implementing proper sanitization to prevent injection attacks.",
        "Access Controls – Setting up proper authentication and authorization mechanisms.",
        "Regular Updates – Ensuring CMS, plugins, and dependencies are up to date.",
        "Backup & Recovery – Establishing secure backup procedures and recovery plans."
      ]
    }
  },
  {
    icon: BarChart2,
    title: "Domain & DNS Security",
    description: "Secure your domain registration and DNS configuration against takeover and hijacking.",
    image: "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Domain & DNS Security",
      focusAreas: [
        "Domain Lockdown – Enabling domain transfer locks and registry locks.",
        "DNSSEC Implementation – Domain Name System Security Extensions for DNS integrity.",
        "Registrar Security – Choosing secure registrars and enabling two-factor authentication.",
        "Subdomain Monitoring – Tracking and securing all subdomains and DNS records.",
        "WHOIS Privacy – Protecting domain owner information from public exposure.",
        "Expiration Monitoring – Preventing accidental domain loss due to expiration."
      ]
    }
  },
  {
    icon: BrainCircuit,
    title: "Security Awareness Training",
    description: "Educate your team on cybersecurity best practices to reduce human-related risks.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Security Awareness Training",
      focusAreas: [
        "Phishing Recognition – Training on identifying and avoiding phishing attempts.",
        "Password Security – Best practices for creating and managing strong passwords.",
        "Social Engineering Awareness – Understanding manipulation tactics used by attackers.",
        "Safe Browsing Habits – Guidelines for secure internet usage and downloads.",
        "Incident Reporting – Procedures for reporting suspected security incidents.",
        "Regular Refreshers – Ongoing training to keep security knowledge current."
      ]
    }
  },
  {
    icon: Users,
    title: "Incident Response Support",
    description: "Guidance and support when security incidents occur to minimize damage and recovery time.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    details: {
      title: "Incident Response Support",
      focusAreas: [
        "Incident Assessment – Quick evaluation of the scope and impact of security breaches.",
        "Containment Strategies – Steps to isolate and contain the incident.",
        "Evidence Preservation – Proper collection and handling of digital evidence.",
        "Communication Planning – Coordinating with stakeholders and authorities.",
        "Recovery Procedures – Safe restoration of systems and data.",
        "Post-Incident Review – Analysis and recommendations to prevent future incidents."
      ]
    }
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm text-primary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Practical Cybersecurity Services for Modern Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We run focused security checks and provide clear, actionable fixes to protect your business from common cyber threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <button 
                    onClick={() => openModal(service)}
                    className="text-sm text-primary hover:underline cursor-pointer transition-colors"
                  >
                    Learn more →
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <ServiceModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </>
  );
}