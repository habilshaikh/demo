import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { PublicLayout } from '../components/layouts/PublicLayout';
import { toast } from 'sonner';

// Asset URLs
const GOLD_TEXTURE_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/pks0eavi_Gold.jpeg";

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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2540] via-[#22304F] to-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Gold lighting */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 75% 75%, rgba(200, 208, 220, 0.05) 0%, transparent 40%)',
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/8 flex items-center justify-center mx-auto mb-8 border border-[#C79B4C]/30"
              animate={{ 
                y: [0, -8, 0],
                boxShadow: ['0 0 30px rgba(212, 175, 55, 0.2)', '0 0 50px rgba(212, 175, 55, 0.35)', '0 0 30px rgba(212, 175, 55, 0.2)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <MessageSquare className="h-10 w-10 text-[#C79B4C]" />
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in{' '}
              <span className="gold-text-shine">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-[#C8D0DC]/60 leading-relaxed">
              Have questions about WynOra Vault? We're here to help. 
              Reach out to us and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#22304F] to-transparent" />
      </section>

      {/* Contact Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Gold accent glow */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[400px] rounded-full bg-[#C79B4C]/5 blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C79B4C]/10 border border-[#C79B4C]/20 mb-6">
                <Mail className="h-3 w-3 text-[#C79B4C]" />
                <span className="text-xs font-semibold tracking-wider text-[#C79B4C] uppercase">Contact Info</span>
              </div>
              
              <h2 className="font-heading text-3xl font-bold text-white mb-8">
                Contact{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Information</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={info.title} 
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center flex-shrink-0 border border-[#C79B4C]/20 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-shadow">
                      <info.icon className="h-5 w-5 text-[#C79B4C]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#C8D0DC]/50 mb-1">{info.title}</p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-white hover:text-[#C79B4C] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-6 border border-[#C79B4C]/15"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center border border-[#C79B4C]/20">
                    <Clock className="h-5 w-5 text-[#C79B4C]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-[#C8D0DC]/60">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 border border-[#C79B4C]/15">
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                
                <h2 className="font-heading text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#C8D0DC]">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        data-testid="contact-name-input"
                        className="h-12 bg-[#22304F]/50 border-[#C79B4C]/15 focus:border-[#C79B4C]/40 text-white placeholder:text-[#C8D0DC]/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#C8D0DC]">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        data-testid="contact-email-input"
                        className="h-12 bg-[#22304F]/50 border-[#C79B4C]/15 focus:border-[#C79B4C]/40 text-white placeholder:text-[#C8D0DC]/40"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#C8D0DC]">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      data-testid="contact-subject-input"
                      className="h-12 bg-[#22304F]/50 border-[#C79B4C]/15 focus:border-[#C79B4C]/40 text-white placeholder:text-[#C8D0DC]/40"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#C8D0DC]">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      data-testid="contact-message-input"
                      className="bg-[#22304F]/50 border-[#C79B4C]/15 focus:border-[#C79B4C]/40 text-white placeholder:text-[#C8D0DC]/40"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-submit-btn"
                    className="w-full h-12 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #C79B4C 0%, #D4AC62 30%, #C79B4C 70%, #A67E3D 100%)',
                      color: '#22304F',
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.25)',
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#22304F]/30 border-t-[#22304F] rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </button>
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