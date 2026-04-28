import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Users, Target, Zap } from "lucide-react";

const stats = [
  { icon: Users, label: "Clients Protected", value: "100+" },
  { icon: Award, label: "Years Experience", value: "9+" },
  { icon: Target, label: "Success Rate", value: "99%" },
  { icon: Zap, label: "Security Checks", value: "500+" }
];

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm text-primary">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Practical Cybersecurity for
                <span className="text-primary block">Modern Businesses</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We specialize in identifying real-world risks that affect modern businesses — and help fix them without unnecessary complexity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Practical Risk Identification</h4>
                  <p className="text-muted-foreground">We focus on real-world security issues that actually affect modern businesses.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Clear Communication</h4>
                  <p className="text-muted-foreground">No jargon—just straightforward explanations and actionable recommendations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Actionable Solutions</h4>
                  <p className="text-muted-foreground">We provide step-by-step fixes that you can implement quickly and effectively.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-4">
                  <CardContent className="p-0 space-y-2">
                    <stat.icon className="h-8 w-8 text-primary mx-auto" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Cybersecurity protection and practical security solutions"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            </div>

            {/* Mission statement overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-sm rounded-lg p-6 border">
              <h4 className="font-semibold mb-2">Our Mission</h4>
              <p className="text-sm text-muted-foreground">
                To help small businesses identify and fix common security risks without unnecessary complexity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}