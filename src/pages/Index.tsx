
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedBooks from "@/components/FeaturedBooks";
import Community from "@/components/Community";
import Sustainability from "@/components/Sustainability";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <FeaturedBooks />
        <Community />
        <Sustainability />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
