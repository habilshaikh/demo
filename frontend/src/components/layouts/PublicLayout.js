import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
