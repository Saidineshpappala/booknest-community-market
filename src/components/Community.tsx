
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Community = () => {
  const testimonials = [
    {
      id: 1,
      quote: "BookNest has completely changed how I find rare books. The community is incredibly helpful and I've discovered titles I'd been searching for years!",
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        initials: "SJ",
        role: "Book Collector"
      }
    },
    {
      id: 2,
      quote: "As someone who sells used books, BookNest has been amazing. The platform is easy to use and I've connected with buyers who truly appreciate literature.",
      author: {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/150?img=11",
        initials: "MC",
        role: "Independent Seller"
      }
    },
    {
      id: 3,
      quote: "The personalized recommendations are spot-on! BookNest understands what I like to read better than I do sometimes.",
      author: {
        name: "Olivia Williams",
        avatar: "https://i.pravatar.cc/150?img=44",
        initials: "OW",
        role: "Avid Reader"
      }
    }
  ];

  return (
    <section className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Community of Book Lovers</h2>
        <p className="text-muted-foreground">
          Connect with fellow readers, share your thoughts on your favorite books, and discover new titles through community recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-booknest-100 p-8 rounded-lg text-center max-w-2xl">
          <h3 className="text-xl font-bold mb-2">Ready to start your reading journey?</h3>
          <p className="text-muted-foreground mb-6">
            Create an account to join our community, buy and sell books, and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-booknest-600 hover:bg-booknest-700">
              <Link to="/register">Join BookNest</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/community">Explore Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
