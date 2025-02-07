import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";

// Animated component wrapper
const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, children }) => {
  const [hovered, setHovered] = React.useState(false);
  const animatedStyles = useSpring({
    transform: hovered ? "translateY(-10px)" : "translateY(0)",
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.div style={animatedStyles}>
      <div 
        className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="card-body items-center text-center">
          <div className="text-6xl mb-4 animate-bounce">{icon}</div>
          <h3 className="card-title text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-base-content/80">{children}</p>
        </div>
      </div>
    </animated.div>
  );
};

const LandingPage = () => {
  const floatingAnim = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (1) {
        await next({ transform: "translateY(-20px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { duration: 3000 }
  });

  return (
    <div className="bg-base-100 overflow-hidden">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-primary to-secondary">
        <div className="hero-content text-center flex-col lg:flex-row-reverse gap-12">
        
          <div className="max-w-2xl text-base-100">
            <motion.h1 
              className="text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-base-100 to-accent">
                AI-Powered Resume Builder
              </span>
            </motion.h1>
            <p className="py-6 text-xl text-base-100/90">
              Transform your career story into a stunning resume that gets noticed!
            </p>
            <Link 
              to="/generate-resume" 
              className="btn btn-accent btn-lg rounded-full px-8 text-lg
                        transform transition hover:scale-105 hover:shadow-xl"
            >
              Start Free Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection>
              <FeatureCard icon="🚀" title="Smart AI Builder">
                Advanced algorithms craft personalized resumes tailored to your goals
              </FeatureCard>
            </AnimatedSection>
            
            <AnimatedSection>
              <FeatureCard icon="🎨" title="Beautiful Templates">
                50+ modern designs optimized for ATS scanning
              </FeatureCard>
            </AnimatedSection>
            
            <AnimatedSection>
              <FeatureCard icon="⚡" title="Instant Results">
                Create, edit, and download your resume in under 10 minutes
              </FeatureCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-bl from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Success Stories
            </h2>
          </AnimatedSection>
          
          {/* ... Testimonial cards with animation ... */}
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="bg-gradient-to-r from-primary to-secondary p-1 rounded-3xl shadow-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="bg-base-100 rounded-2xl p-12">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Transform Your Career?
              </h2>
              <p className="mb-8 text-lg text-base-content/80">
                Join 500k+ professionals who boosted their careers with our builder
              </p>
              <button className="btn btn-accent btn-lg rounded-full px-12 text-lg
                               transform transition hover:scale-105 hover:shadow-xl">
                Create Free Resume
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Gradient Footer */}
      <footer className="footer p-10 bg-gradient-to-br from-primary/20 to-secondary/20">
        {/* ... Footer content with animations ... */}
      </footer>
    </div>
  );
};

export default LandingPage;