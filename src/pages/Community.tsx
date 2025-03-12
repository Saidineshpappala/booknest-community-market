
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  ThumbsUp, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Users,
  Search,
  Heart,
  BookMarked,
  Share2,
  Flag
} from "lucide-react";

// Mock data for discussions
const discussions = [
  {
    id: 1,
    title: "What's everyone reading this month?",
    author: {
      name: "Emily Wilson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "2 days ago",
    content: "I just started 'The Midnight Library' by Matt Haig and I'm absolutely loving it! Has anyone else read it? What are you all currently reading?",
    tags: ["Book Discussion", "Reading Now"],
    replies: 24,
    likes: 42
  },
  {
    id: 2,
    title: "Best sci-fi books of the last decade?",
    author: {
      name: "Marcus Chen",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "5 days ago",
    content: "I'm looking to expand my sci-fi collection and would love recommendations for the best sci-fi books released in the last decade. Any suggestions?",
    tags: ["Sci-Fi", "Recommendations"],
    replies: 46,
    likes: 37
  },
  {
    id: 3,
    title: "Tips for preserving old hardcover books?",
    author: {
      name: "Sandra Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    date: "1 week ago",
    content: "I recently inherited some old hardcover books from my grandfather, and I want to make sure I'm storing them properly. Does anyone have tips for preserving vintage books?",
    tags: ["Book Care", "Collectors"],
    replies: 19,
    likes: 28
  },
  {
    id: 4,
    title: "Local bookstore recommendations in NYC?",
    author: {
      name: "David Park",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    date: "1 week ago",
    content: "I'll be visiting New York City next month and would love to check out some unique local bookstores. Any recommendations for must-visit shops?",
    tags: ["Bookstores", "New York City"],
    replies: 31,
    likes: 26
  }
];

// Mock data for book clubs
const bookClubs = [
  {
    id: 1,
    name: "Classic Literature Club",
    description: "We read and discuss classic literature from all periods and cultures.",
    members: 245,
    currentBook: "Pride and Prejudice by Jane Austen",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    nextMeeting: "August 15, 2023"
  },
  {
    id: 2,
    name: "Science Fiction Explorers",
    description: "Exploring the vast universes of science fiction literature.",
    members: 189,
    currentBook: "Dune by Frank Herbert",
    image: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80",
    nextMeeting: "August 10, 2023"
  },
  {
    id: 3,
    name: "Mystery Readers",
    description: "For fans of mysteries, thrillers, and detective fiction.",
    members: 173,
    currentBook: "The Thursday Murder Club by Richard Osman",
    image: "https://images.unsplash.com/photo-1603162925312-16c138c2d7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    nextMeeting: "August 18, 2023"
  },
  {
    id: 4,
    name: "Contemporary Fiction",
    description: "Discussing the best of today's fiction and emerging authors.",
    members: 218,
    currentBook: "Lessons in Chemistry by Bonnie Garmus",
    image: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    nextMeeting: "August 12, 2023"
  }
];

// Mock data for events
const events = [
  {
    id: 1,
    title: "Author Talk: Margaret Atwood",
    description: "Join us for a virtual discussion with acclaimed author Margaret Atwood about her latest work.",
    date: "August 20, 2023",
    time: "7:00 PM - 8:30 PM EST",
    location: "Virtual (Zoom)",
    attendees: 412,
    image: "https://i.pravatar.cc/150?img=28"
  },
  {
    id: 2,
    title: "Book Swap Meetup",
    description: "Bring books you've read and swap them with other book lovers. Refreshments provided.",
    date: "August 25, 2023",
    time: "3:00 PM - 6:00 PM",
    location: "Central Park, New York",
    attendees: 89,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 3,
    title: "BookNest Reading Challenge Kickoff",
    description: "Join our annual reading challenge! Set goals, track progress, and win prizes.",
    date: "September 1, 2023",
    time: "All Day",
    location: "Online",
    attendees: 735,
    image: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80"
  }
];

const Community = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");
  
  const handleCreatePost = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to participate in the community.",
      });
      navigate("/login");
      return;
    }
    
    // In a real app, this would open a form or navigate to a create post page
    toast({
      title: "Create post",
      description: "This feature is coming soon!",
    });
  };
  
  const handleJoinClub = (clubId: number) => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to join book clubs.",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Book club joined",
      description: "You have successfully joined the book club!",
    });
  };
  
  const handleAttendEvent = (eventId: number) => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to attend events.",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Event RSVP confirmed",
      description: "You're now registered for this event!",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">BookNest Community</h1>
          <p className="text-muted-foreground mt-2">
            Connect with fellow readers, join discussions, book clubs, and events
          </p>
        </div>
      </div>
      
      <main className="container py-8 flex-grow">
        <Tabs defaultValue="discussions" className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="book-clubs">Book Clubs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search community..."
                className="pl-9 w-full sm:w-64"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          
          {/* Discussions Tab */}
          <TabsContent value="discussions" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Discussions</h2>
                  <Button 
                    onClick={handleCreatePost}
                    className="bg-booknest-600 hover:bg-booknest-700"
                  >
                    Start a Discussion
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={discussion.author.avatar} />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-lg hover:text-booknest-600 cursor-pointer">
                                  {discussion.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {discussion.author.name} · {discussion.date}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="my-3">{discussion.content}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {discussion.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {discussion.replies} replies
                              </div>
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {discussion.likes} likes
                              </div>
                              <Button variant="ghost" size="sm" className="ml-auto">
                                <Flag className="h-4 w-4 mr-1" />
                                Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/20 p-4">
                        <div className="flex items-center gap-4 w-full">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <Input 
                            placeholder="Write a reply..." 
                            className="flex-grow"
                            onClick={() => {
                              if (!isLoggedIn) {
                                toast({
                                  title: "Authentication required",
                                  description: "Please log in to reply to discussions.",
                                });
                                navigate("/login");
                              }
                            }}
                          />
                          <Button 
                            size="sm"
                            className="bg-booknest-600 hover:bg-booknest-700"
                            onClick={() => {
                              if (!isLoggedIn) {
                                toast({
                                  title: "Authentication required",
                                  description: "Please log in to reply to discussions.",
                                });
                                navigate("/login");
                              } else {
                                toast({
                                  title: "Reply posted",
                                  description: "Your reply has been posted successfully!",
                                });
                              }
                            }}
                          >
                            Reply
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Discussions</Button>
                </div>
              </div>
              
              <div className="lg:w-1/4">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Popular Tags</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Book Discussion</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Reading Now</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Recommendations</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Sci-Fi</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Fantasy</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Book Care</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Bookstores</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Author Q&A</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Book Reviews</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Classics</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Community Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm space-y-2">
                      <p>• Be respectful and considerate in all interactions</p>
                      <p>• No spam, self-promotion, or irrelevant content</p>
                      <p>• Provide constructive and thoughtful responses</p>
                      <p>• Respect copyright and intellectual property</p>
                      <p>• Keep discussions on-topic and book-related</p>
                      <p>• Have fun and share your love of books!</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Members</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <Avatar key={idx} className="cursor-pointer">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${idx + 10}`} />
                            <AvatarFallback>U{idx}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs">
                          +428
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Book Clubs Tab */}
          <TabsContent value="book-clubs" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Book Clubs</h2>
                  <Button 
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast({
                          title: "Authentication required",
                          description: "Please log in to create a book club.",
                        });
                        navigate("/login");
                      } else {
                        toast({
                          title: "Create book club",
                          description: "This feature is coming soon!",
                        });
                      }
                    }}
                    className="bg-booknest-600 hover:bg-booknest-700"
                  >
                    Create a Book Club
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookClubs.map((club) => (
                    <Card key={club.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={club.image} 
                          alt={club.name}
                          className="object-cover w-full h-full" 
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-medium text-lg mb-2">{club.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{club.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <BookOpen className="h-4 w-4 mr-2 text-booknest-600" />
                            <span>Currently Reading: {club.currentBook}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-booknest-600" />
                            <span>Next Meeting: {club.nextMeeting}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-booknest-600" />
                            <span>{club.members} Members</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-booknest-600 hover:bg-booknest-700"
                          onClick={() => handleJoinClub(club.id)}
                        >
                          Join Club
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">View All Book Clubs</Button>
                </div>
              </div>
              
              <div className="lg:w-1/4">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Featured Book Club</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="mb-3 overflow-hidden rounded">
                        <img 
                          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                          alt="Featured Club"
                          className="w-full aspect-video object-cover" 
                        />
                      </div>
                      <h3 className="font-medium">BookNest Classics Club</h3>
                      <p className="text-sm text-muted-foreground my-2">
                        Our official book club focusing on timeless classics from around the world.
                      </p>
                      <div className="text-sm mt-3">
                        <div className="flex items-center mb-1">
                          <BookOpen className="h-4 w-4 mr-2 text-booknest-600" />
                          <span>Currently Reading: Jane Eyre</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-booknest-600" />
                          <span>652 Members</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full bg-booknest-600 hover:bg-booknest-700"
                        onClick={() => handleJoinClub(999)}
                      >
                        Join Featured Club
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Book Club Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm space-y-2">
                      <p>• Discover new books and expand your reading horizons</p>
                      <p>• Engage in meaningful discussions with fellow readers</p>
                      <p>• Meet like-minded booklovers in your community</p>
                      <p>• Access exclusive author Q&As and events</p>
                      <p>• Receive special discounts on featured books</p>
                      <p>• Share your thoughts and hear diverse perspectives</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Events Tab */}
          <TabsContent value="events" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Upcoming Events</h2>
                  <Button 
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast({
                          title: "Authentication required",
                          description: "Please log in to host an event.",
                        });
                        navigate("/login");
                      } else {
                        toast({
                          title: "Host an event",
                          description: "This feature is coming soon!",
                        });
                      }
                    }}
                    className="bg-booknest-600 hover:bg-booknest-700"
                  >
                    Host an Event
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="object-cover w-full h-full" 
                            />
                          </div>
                          <div className="p-6 md:w-2/3">
                            <h3 className="font-medium text-lg mb-2">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-booknest-600" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-2 text-booknest-600" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-2 text-booknest-600" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Users className="h-4 w-4 mr-2 text-booknest-600" />
                                <span>{event.attendees} Attending</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-3">
                              <Button 
                                className="bg-booknest-600 hover:bg-booknest-700"
                                onClick={() => handleAttendEvent(event.id)}
                              >
                                Attend
                              </Button>
                              <Button variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Add to Calendar
                              </Button>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">View All Events</Button>
                </div>
              </div>
              
              <div className="lg:w-1/4">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Calendar</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-center p-4 bg-muted/30 rounded-md mb-4">
                        <div className="font-medium">August 2023</div>
                        <div className="grid grid-cols-7 gap-1 mt-2 text-sm">
                          <div>Su</div>
                          <div>Mo</div>
                          <div>Tu</div>
                          <div>We</div>
                          <div>Th</div>
                          <div>Fr</div>
                          <div>Sa</div>
                          <div className="text-muted-foreground">30</div>
                          <div className="text-muted-foreground">31</div>
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                          <div>4</div>
                          <div>5</div>
                          <div>6</div>
                          <div>7</div>
                          <div>8</div>
                          <div>9</div>
                          <div className="rounded-full bg-booknest-600/10 text-booknest-600">10</div>
                          <div>11</div>
                          <div className="rounded-full bg-booknest-600/10 text-booknest-600">12</div>
                          <div>13</div>
                          <div>14</div>
                          <div>15</div>
                          <div>16</div>
                          <div>17</div>
                          <div>18</div>
                          <div>19</div>
                          <div className="rounded-full bg-booknest-600/20 text-booknest-600 font-medium">20</div>
                          <div>21</div>
                          <div>22</div>
                          <div>23</div>
                          <div>24</div>
                          <div className="rounded-full bg-booknest-600/20 text-booknest-600 font-medium">25</div>
                          <div>26</div>
                          <div>27</div>
                          <div>28</div>
                          <div>29</div>
                          <div>30</div>
                          <div>31</div>
                          <div className="text-muted-foreground">1</div>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-booknest-600 mr-2"></div>
                          <span>Events you're attending</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></div>
                          <span>Upcoming events</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Filter Events</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Event Type</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Author Talks</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Book Clubs</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Signings</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Workshops</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Reading Groups</Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Location</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Virtual</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">In-Person</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Hybrid</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
