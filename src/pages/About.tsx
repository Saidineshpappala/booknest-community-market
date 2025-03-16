
import { useState } from "react";
import { BookOpen, Star, Shield, RefreshCw, Heart, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teamMembers = [{
  name: "Sai Dinesh Pappala",
  role: "Founder & CEO",
  bio: "Book enthusiast and former publishing executive with 15 years of experience in the industry. Sai Dinesh founded BookNest with the vision of creating a community-driven marketplace for book lovers.",
  avatar: "/lovable-uploads/c3fe7cf5-9c4d-43c0-82b8-9d31aecdaad5.png"
}, {
  name: "Krish",
  role: "Community Manager",
  bio: "Literature graduate and social media expert. Krish nurtures our growing community of book enthusiasts and coordinates our virtual and in-person events.",
  avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Krish"
}, {
  name: "Rahul",
  role: "Head of Operations",
  bio: "Former bookstore owner with deep knowledge of the bookselling industry. Rahul oversees our marketplace operations and seller relationships.",
  avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Rahul"
}, {
  name: "Anand",
  role: "Content Director",
  bio: "Journalist and book reviewer who curates our featured selections and author spotlights. Anand ensures that readers discover books they'll love.",
  avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Anand"
}];

const values = [{
  icon: <BookOpen className="h-8 w-8 text-booknest-600" />,
  title: "Love of Reading",
  description: "We believe in the transformative power of books to educate, inspire, and connect people across the world."
}, {
  icon: <Star className="h-8 w-8 text-booknest-600" />,
  title: "Quality & Authenticity",
  description: "We're committed to providing authentic books and creating a trustworthy marketplace for buyers and sellers."
}, {
  icon: <Shield className="h-8 w-8 text-booknest-600" />,
  title: "Community First",
  description: "Our decisions are guided by what's best for our community of readers, fostering a space where book lovers can connect."
}, {
  icon: <RefreshCw className="h-8 w-8 text-booknest-600" />,
  title: "Sustainability",
  description: "By facilitating the buying and selling of used books, we support environmental sustainability and reduce waste."
}, {
  icon: <Heart className="h-8 w-8 text-booknest-600" />,
  title: "Inclusivity",
  description: "We champion diverse voices and stories, ensuring our platform represents the rich tapestry of human experience."
}];

const About = () => {
  const [activeTab, setActiveTab] = useState("story");
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-booknest-50 to-booknest-100 py-12 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">About BookNest</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building a global community of book lovers, connecting readers with the stories they love and the people who share their passion.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <Tabs defaultValue="story" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="mission">Mission & Values</TabsTrigger>
                <TabsTrigger value="team">Our Team</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="story" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-serif font-semibold mb-4">How It All Began</h2>
                  <p className="text-muted-foreground mb-4">
                    BookNest was born in 2020 from a simple idea: create a dedicated space where book lovers could buy, sell, and discuss the stories that matter to them.
                  </p>
                  <p className="text-muted-foreground mb-4">Our founder, Sai Dinesh Pappala, was frustrated with generic marketplaces where books were treated like any other commodity. He envisioned a platform that understood the special relationship people have with their books—where each transaction could become a conversation about shared literary interests.</p>
                  <p className="text-muted-foreground">
                    What started as a small community of passionate readers has grown into a global platform, connecting bibliophiles across continents while maintaining the personal touch that makes book-sharing special.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1128&auto=format&fit=crop" alt="Library with books" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-8 my-12">
                <h2 className="text-2xl font-serif font-semibold mb-6 text-center">Our Journey</h2>
                <div className="relative space-y-8">
                  <div className="absolute left-[19px] top-3 h-[calc(100%-24px)] w-0.5 bg-border"></div>
                  
                  <div className="relative flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">2020</div>
                    <div>
                      <h3 className="font-medium">BookNest Founded</h3>
                      <p className="text-muted-foreground">Sarah Johnson launched BookNest with a small team of five and an initial community of 500 users.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">2021</div>
                    <div>
                      <h3 className="font-medium">Community Growth</h3>
                      <p className="text-muted-foreground">Expanded to 50,000 users and launched our book club program, hosting our first virtual author event.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">2022</div>
                    <div>
                      <h3 className="font-medium">International Expansion</h3>
                      <p className="text-muted-foreground">Launched in Europe and Asia, introduced multilingual support, and reached 1 million books sold.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">2023</div>
                    <div>
                      <h3 className="font-medium">Sustainability Initiative</h3>
                      <p className="text-muted-foreground">Launched our carbon-neutral shipping program and passed 2 million active users worldwide.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">2024</div>
                    <div>
                      <h3 className="font-medium">Today</h3>
                      <p className="text-muted-foreground">5 million members strong, with an expanding ecosystem of reading-related services and community features.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mission" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-semibold mb-4">Our Mission</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  BookNest exists to create a sustainable future for books by connecting readers directly with each other. 
                  We believe that every book deserves a second life and every reader deserves access to 
                  affordable literature and a community that shares their passion.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-serif font-semibold mb-8 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {values.map((value, index) => <Card key={index}>
                      <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
                        {value.icon}
                        <CardTitle className="mt-4">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
              
              <div className="bg-booknest-50 rounded-lg p-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-serif font-semibold mb-4">Our Impact</h2>
                  <p className="text-muted-foreground mb-8">
                    Through the collective action of our community, we're making a difference in how people access and share books.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-booknest-600">5M+</p>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-booknest-600">12M+</p>
                      <p className="text-sm text-muted-foreground">Books Exchanged</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-booknest-600">3K+</p>
                      <p className="text-sm text-muted-foreground">Book Clubs</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-booknest-600">500K+</p>
                      <p className="text-sm text-muted-foreground">Trees Saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-8">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl font-serif font-semibold mb-4">Meet Our Team</h2>
                <p className="text-muted-foreground">
                  The passionate book lovers working behind the scenes to build and nurture the BookNest community.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => <Card key={index}>
                    <CardHeader className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>)}
              </div>
              
              <div className="bg-muted rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-4">Join Our Team</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for passionate individuals to join our mission of connecting book lovers around the world.
                </p>
                <Button>View Open Positions</Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-12" />
          
          <div className="text-center">
            <h2 className="text-2xl font-serif font-semibold mb-6">Connect With Us</h2>
            <div className="flex justify-center space-x-4 mb-8">
              <Button variant="outline" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="inline-flex items-center">
              <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">hello@booknest.com</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default About;
