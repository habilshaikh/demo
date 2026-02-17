import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col luxury-bg marble-texture" style={{ backgroundColor: '#22304F' }}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};