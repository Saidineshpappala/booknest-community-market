
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MessageSquare, BookOpen, Users, CalendarIcon } from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground mt-2">
            Connect with fellow book lovers, join discussions, and participate in book clubs
          </p>
        </div>
      </div>
      
      <main className="container py-8 flex-grow">
        <Tabs defaultValue="discussions" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="book-clubs">Book Clubs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search community..."
                className="w-[200px] md:w-[300px]"
              />
              <Button className="bg-booknest-600 hover:bg-booknest-700">
                Create Post
              </Button>
            </div>
          </div>
          
          {/* Discussions Tab Content */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="grid md:grid-cols-7 gap-6">
              {/* Main content area */}
              <div className="md:col-span-5 space-y-4">
                {/* Featured discussion */}
                <Card className="border-booknest-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Jane Doe</span>
                          <span className="text-xs text-muted-foreground">posted 2 hours ago</span>
                          <Badge variant="outline" className="ml-auto">Featured</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          What's your favorite fantasy series and why?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          I just finished reading The Lord of the Rings for the first time and I'm looking for recommendations on what to read next. What are your favorite fantasy series and what makes them special?
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" /> 24 comments
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" /> Fantasy
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Regular discussions */}
                {discussions.map(discussion => (
                  <Card key={discussion.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={discussion.avatar} />
                          <AvatarFallback>{discussion.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{discussion.author}</span>
                            <span className="text-xs text-muted-foreground">posted {discussion.timeAgo}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">
                            {discussion.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {discussion.content}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" /> {discussion.comments} comments
                            </span>
                            <span className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1" /> {discussion.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline">Load More Discussions</Button>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Fiction</Badge>
                      <Badge variant="secondary">Fantasy</Badge>
                      <Badge variant="secondary">Mystery</Badge>
                      <Badge variant="secondary">Romance</Badge>
                      <Badge variant="secondary">Sci-Fi</Badge>
                      <Badge variant="secondary">Non-Fiction</Badge>
                      <Badge variant="secondary">Classics</Badge>
                      <Badge variant="secondary">Biography</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Active Members</h3>
                    <div className="space-y-3">
                      {activeMembers.map(member => (
                        <div key={member.id} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Community Guidelines</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Be respectful to other members</li>
                      <li>No spam or self-promotion</li>
                      <li>Stay on topic in discussions</li>
                      <li>No hate speech or offensive content</li>
                      <li>Respect copyright and fair use</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Book Clubs Tab Content */}
          <TabsContent value="book-clubs" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {bookClubs.map(club => (
                <Card key={club.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={club.image} 
                      alt={club.name}
                      className="object-cover w-full h-full" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-semibold text-white">{club.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      <span>{club.members} members</span>
                      <Badge variant="outline" className="ml-auto">{club.genre}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
                    <div className="mb-3">
                      <span className="text-sm font-medium">Currently reading:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-10 h-14 bg-muted rounded overflow-hidden">
                          <img 
                            src={club.currentBook.cover} 
                            alt={club.currentBook.title}
                            className="object-cover w-full h-full" 
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{club.currentBook.title}</div>
                          <div className="text-xs text-muted-foreground">{club.currentBook.author}</div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-booknest-600 hover:bg-booknest-700">
                      Join Club
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline">Start a New Book Club</Button>
            </div>
          </TabsContent>
          
          {/* Events Tab Content */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="rounded-full">All Events</Button>
              <Button variant="outline" className="rounded-full">Virtual</Button>
              <Button variant="outline" className="rounded-full">In-Person</Button>
              <Button variant="outline" className="rounded-full">Author Signings</Button>
              <Button variant="outline" className="rounded-full">Book Launches</Button>
              <Button variant="outline" className="rounded-full">Reading Groups</Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {events.map(event => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded bg-booknest-100 text-booknest-700 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold">{event.date.day}</span>
                        <span className="text-xs">{event.date.month}</span>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <CalendarIcon className="h-3 w-3" /> 
                          <span>{event.time}</span>
                          <Separator orientation="vertical" className="mx-2 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant={event.type === "virtual" ? "secondary" : "outline"}>
                            {event.type === "virtual" ? "Virtual" : "In-Person"}
                          </Badge>
                          <Button variant="outline" size="sm">RSVP</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline">See All Events</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

// Mock data for the page
const discussions = [
  {
    id: "d1",
    author: "Alex Johnson",
    authorInitials: "AJ",
    avatar: "https://i.pravatar.cc/150?img=1",
    title: "Book-to-movie adaptations: Hits and misses",
    content: "I just watched the new Dune movie and was blown away by how faithful it was to the book. What are some other great book-to-movie adaptations you've seen? And which ones disappointed you?",
    timeAgo: "3 hours ago",
    comments: 18,
    category: "General"
  },
  {
    id: "d2",
    author: "Samantha Lee",
    authorInitials: "SL",
    avatar: "https://i.pravatar.cc/150?img=5",
    title: "Reading slumps - how do you overcome them?",
    content: "I've been trying to read the same book for a month now and I just can't seem to get through it. Do you ever experience reading slumps? How do you overcome them?",
    timeAgo: "5 hours ago",
    comments: 32,
    category: "Reading Habits"
  },
  {
    id: "d3",
    author: "Michael Chen",
    authorInitials: "MC",
    avatar: "https://i.pravatar.cc/150?img=8",
    title: "Most anticipated book releases of 2023",
    content: "What upcoming book releases are you most excited about this year? I'm personally looking forward to the new Brandon Sanderson and Leigh Bardugo books!",
    timeAgo: "yesterday",
    comments: 27,
    category: "New Releases"
  },
  {
    id: "d4",
    author: "Emily Wilson",
    authorInitials: "EW",
    avatar: "https://i.pravatar.cc/150?img=10",
    title: "Physical books vs. e-readers - what's your preference?",
    content: "I've been debating whether to invest in a Kindle. I love physical books, but I'm running out of shelf space. What do you prefer and why?",
    timeAgo: "yesterday",
    comments: 45,
    category: "Reading Habits"
  }
];

const activeMembers = [
  { id: "m1", name: "Alex Johnson", initials: "AJ", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "m2", name: "Jane Doe", initials: "JD", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "m3", name: "Samantha Lee", initials: "SL", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "m4", name: "Robert Smith", initials: "RS", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "m5", name: "Michael Chen", initials: "MC", avatar: "https://i.pravatar.cc/150?img=8" }
];

const bookClubs = [
  {
    id: "bc1",
    name: "Fantasy Book Club",
    genre: "Fantasy",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
    members: 124,
    description: "For lovers of fantasy literature from classic to contemporary. We meet virtually every other Thursday.",
    currentBook: {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80"
    }
  },
  {
    id: "bc2",
    name: "Mystery & Thriller Reads",
    genre: "Mystery",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80",
    members: 98,
    description: "Join us as we unravel mysteries and thrillers page by page. New members always welcome!",
    currentBook: {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  },
  {
    id: "bc3",
    name: "Science Fiction Explorers",
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    members: 76,
    description: "Exploring new worlds and technologies through science fiction literature. Monthly discussions on our latest reads.",
    currentBook: {
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://images.unsplash.com/photo-1603162925312-16c138c2d7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    }
  },
  {
    id: "bc4",
    name: "Classic Literature Society",
    genre: "Classics",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    members: 112,
    description: "Discussing timeless works from Austen to Tolstoy and everything in between. In-person meetings in New York City.",
    currentBook: {
      title: "Wuthering Heights",
      author: "Emily Brontë",
      cover: "https://images.unsplash.com/photo-1603162925312-16c138c2d7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    }
  },
  {
    id: "bc5",
    name: "Contemporary Fiction",
    genre: "Fiction",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
    members: 87,
    description: "Reading and discussing the latest in contemporary fiction. We meet virtually on the first Tuesday of each month.",
    currentBook: {
      title: "Cloud Cuckoo Land",
      author: "Anthony Doerr",
      cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  },
  {
    id: "bc6",
    name: "Historical Fiction Readers",
    genre: "Historical",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    members: 64,
    description: "Travel through time with our historical fiction book club. Virtual meetings and occasional museum trips.",
    currentBook: {
      title: "The Lincoln Highway",
      author: "Amor Towles",
      cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80"
    }
  }
];

const events = [
  {
    id: "e1",
    title: "Author Talk: Michelle Obama",
    date: { day: "15", month: "Jun" },
    time: "7:00 PM - 9:00 PM",
    location: "Virtual Event",
    type: "virtual",
    description: "Join us for a virtual conversation with Michelle Obama about her latest book 'The Light We Carry'."
  },
  {
    id: "e2",
    title: "Book Launch: The Midnight Library",
    date: { day: "22", month: "Jun" },
    time: "6:30 PM - 8:30 PM",
    location: "BookNest Store, New York",
    type: "in-person",
    description: "Matt Haig will be discussing and signing copies of his new novel 'The Midnight Library'."
  },
  {
    id: "e3",
    title: "Fantasy Book Club Meeting",
    date: { day: "29", month: "Jun" },
    time: "7:00 PM - 8:30 PM",
    location: "Zoom",
    type: "virtual",
    description: "Monthly meeting of our Fantasy Book Club. This month we're discussing 'The Name of the Wind'."
  },
  {
    id: "e4",
    title: "Children's Story Hour",
    date: { day: "01", month: "Jul" },
    time: "10:00 AM - 11:00 AM",
    location: "BookNest Store, Chicago",
    type: "in-person",
    description: "Bring your little ones for a magical hour of storytelling with our children's literature experts."
  }
];

export default Community;

