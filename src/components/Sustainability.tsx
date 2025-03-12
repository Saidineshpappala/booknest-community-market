
import { BookOpen, Truck, RotateCcw, BookMarked } from "lucide-react";

const Sustainability = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-booknest-600" />,
      title: "Give Books a Second Life",
      description: "By buying used books, you're extending their lifecycle and reducing demand for new production."
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-booknest-600" />,
      title: "Reduce Paper Waste",
      description: "Trading used books helps decrease the amount of paper waste that ends up in landfills."
    },
    {
      icon: <Truck className="h-8 w-8 text-booknest-600" />,
      title: "Carbon-Conscious Shipping",
      description: "We partner with eco-friendly shipping providers and offset carbon emissions from deliveries."
    },
    {
      icon: <BookMarked className="h-8 w-8 text-booknest-600" />,
      title: "Community Sharing",
      description: "Our platform encourages local exchanges, reducing transportation impacts and building community."
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Reading Sustainably with BookNest
          </h2>
          <p className="text-muted-foreground">
            Our marketplace promotes sustainability through the reuse and responsible trading of books. Here's how BookNest helps reduce environmental impact:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-booknest-50 p-8 rounded-lg text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Join our Green Reader Program</h3>
            <p className="text-muted-foreground">
              For every 5 used books sold or purchased on BookNest, we plant a tree through our partnership with global reforestation initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
