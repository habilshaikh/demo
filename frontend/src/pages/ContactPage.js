import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { PublicLayout } from '../components/layouts/PublicLayout';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 XXXXX XXXXX',
    href: 'tel:+91XXXXXXXXXX'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'support@wynora.com',
    href: 'mailto:support@wynora.com'
  },
  {
    icon: MapPin,
    title: 'Address',
    value: '[Your Address Here]',
    href: null
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Have questions about WynOra Vault? We're here to help. 
              Reach out to us and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl font-bold text-white mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{info.title}</p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-white hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  Business Hours
                </h3>
                <div className="space-y-2 text-slate-400">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass rounded-2xl p-8">
                <h2 className="font-heading text-2xl font-bold text-white mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        data-testid="contact-name-input"
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        data-testid="contact-email-input"
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-300">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      data-testid="contact-subject-input"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-300">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      data-testid="contact-message-input"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-submit-btn"
                    className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-6 font-medium btn-glow"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
