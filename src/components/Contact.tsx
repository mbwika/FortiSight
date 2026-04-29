import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "consulting@codensecurity.com",
    description: "Send us an email anytime"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "24/7 Support Available",
    description: "Emergency support included"
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.privacy) {
      toast.error('Please fill in all required fields and accept the privacy policy.');
      return;
    }

    // Get the Turnstile token directly from the widget
    const turnstileToken = (window as any).turnstile?.getResponse();
    if (!turnstileToken) {
      toast.error('Please complete the CAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('cf-turnstile-response', turnstileToken);

      const response = await fetch('https://codensecurity.com/api/contact', { // Worker endpoint
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          privacy: false
        });
      } else {
        const errorMessage = await response.text();
        setSubmitStatus({ type: 'error', message: errorMessage || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm text-primary">Contact Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Secure Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our experts to discuss your Cybersecurity needs and discover how 
            we can help mitigate security risks for your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  {submitStatus.type && (
                    <Alert variant={submitStatus.type === 'error' ? 'destructive' : 'default'}>
                      <AlertTitle>{submitStatus.type === 'success' ? 'Message sent' : 'Submission failed'}</AlertTitle>
                      <AlertDescription>{submitStatus.message}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">
                            First Name *
                          </label>
                          <Input 
                            id="firstName" 
                            name="firstName"
                            placeholder="John" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">
                            Last Name *
                          </label>
                          <Input 
                            id="lastName" 
                            name="lastName"
                            placeholder="Doe" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address *
                          </label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="john@company.com" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input 
                            id="phone" 
                            name="phone"
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium">
                            Company Name
                          </label>
                          <Input 
                            id="company" 
                            name="company"
                            placeholder="Your Company" 
                            value={formData.company}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="service" className="text-sm font-medium">
                            Service Interest
                          </label>
                          <Select value={formData.service} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="assessment">Security Assessment</SelectItem>
                              <SelectItem value="email">Email Protection Setup</SelectItem>
                              <SelectItem value="website">Website Security Hardening</SelectItem>
                              <SelectItem value="domain">Domain & DNS Security</SelectItem>
                              <SelectItem value="training">Security Awareness Training</SelectItem>
                              <SelectItem value="incident">Incident Response Support</SelectItem>
                            </SelectContent>
                          </Select>
                          <input type="hidden" name="service" value={formData.service} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message *
                        </label>
                        <Textarea 
                          id="message" 
                          name="message"
                          placeholder="Tell us about your cybersecurity needs..."
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <input 
                          type="checkbox" 
                          id="privacy" 
                          name="privacy"
                          className="mt-1" 
                          checked={formData.privacy}
                          onChange={handleInputChange}
                          required
                        />
                        <label htmlFor="privacy" className="text-sm text-muted-foreground">
                          I agree to the privacy policy and terms of service.
                        </label>
                      </div>

                      <div className="space-y-2">
                        <div
                          className="cf-turnstile"
                          data-sitekey="0x4AAAAAADFj512HLSo6yLMY"
                          data-theme="light"
                          data-size="normal"
                        ></div>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full md:w-auto" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="font-medium">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">Get a Free Consultation</h3>
              <p className="text-sm mb-4 opacity-90">
                Schedule a 30-minute call with our experts to discuss your Cybersecurity challenges.
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full"
                onClick={() => window.open('https://calendly.com/collins-codensecurity/30min', '_blank')}
              >
                Book Consultation
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}