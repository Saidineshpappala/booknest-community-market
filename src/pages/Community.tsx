
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Users, 
  ChevronRight, 
  Search,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const discussions = [
  {
    id: 1,
    title: "What did you think of the ending of 'Project Hail Mary'?",
    author: "BookWorm42",
    authorAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=BookWorm42",
    replies: 24,
    views: 142,
    category: "Sci-Fi",
    timeAgo: "3 hours ago",
  },
  {
    id: 2,
    title: "Looking for historical fiction recommendations set in ancient Rome",
    author: "HistoryBuff",
    authorAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=HistoryBuff",
    replies: 18,
    views: 95,
    category: "Historical Fiction",
    timeAgo: "12 hours ago",
  },
  {
    id: 3,
    title: "Best translation of 'Crime and Punishment'?",
    author: "LitLover",
    authorAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=LitLover",
    replies: 31,
    views: 203,
    category: "Classics",
    timeAgo: "1 day ago",
  },
  {
    id: 4,
    title: "Unpopular opinion: audiobooks count as reading",
    author: "AudioFan",
    authorAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=AudioFan",
    replies: 87,
    views: 542,
    category: "Reading Habits",
    timeAgo: "2 days ago",
  },
  {
    id: 5,
    title: "How do you organize your home library?",
    author: "OrganizedReader",
    authorAvatar: "https://api.dicebear.com/7.x/personas/svg?seed=OrganizedReader",
    replies: 42,
    views: 318,
    category: "Book Collections",
    timeAgo: "3 days ago",
  },
];

const bookClubs = [
  {
    id: 1,
    name: "Science Fiction Explorers",
    description: "We read and discuss one sci-fi novel every month, focusing on both classics and contemporary works.",
    members: 128,
    currentBook: "Leviathan Falls by James S.A. Corey",
    meetingSchedule: "Every other Thursday, 7PM EST",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1169&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Mystery Mavens",
    description: "For lovers of detective fiction, thrillers, and whodunnits. New book every 3 weeks.",
    members: 95,
    currentBook: "The Silent Patient by Alex Michaelides",
    meetingSchedule: "Tuesdays, 8PM EST",
    image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?q=80&w=1034&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Literary Classics",
    description: "Reading the great works of literature from across centuries and cultures.",
    members: 72,
    currentBook: "Middlemarch by George Eliot",
    meetingSchedule: "Last Sunday of each month, 4PM EST",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1170&auto=format&fit=crop",
  },
];

const events = [
  {
    id: 1,
    title: "Author Talk: Sarah J. Maas",
    description: "Join bestselling fantasy author Sarah J. Maas as she discusses her newest book and creative process.",
    date: "June 15, 2024",
    time: "7:00 PM - 9:00 PM EST",
    location: "Virtual Event",
    attendees: 453,
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "BookNest Summer Reading Festival",
    description: "Our annual celebration of books with author panels, readings, book exchanges, and more!",
    date: "July 8-10, 2024",
    time: "Various Times",
    location: "Central Park, New York City",
    attendees: 1280,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1112&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Poetry Reading & Open Mic Night",
    description: "Listen to featured poets and share your own work in our monthly poetry gathering.",
    date: "June 22, 2024",
    time: "6:30 PM - 9:30 PM EST",
    location: "The Reading Room Café, Boston",
    attendees: 87,
    image: "https://images.unsplash.com/photo-1447968954315-3e5e2508125c?q=80&w=1170&auto=format&fit=crop",
  },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-booknest-50 to-booknest-100 py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">BookNest Community</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Connect with fellow book lovers, join discussions, find book clubs, and participate in literary events.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="discussions" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Discussions</span>
                </TabsTrigger>
                <TabsTrigger value="bookclubs" className="gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Book Clubs</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Events</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search ${activeTab}...`}
                  className="pl-8"
                />
              </div>
            </div>
            
            <TabsContent value="discussions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-semibold">Book Discussions</h2>
                <Button>Start New Discussion</Button>
              </div>
              
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Avatar className="hidden sm:flex h-12 w-12">
                          <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                          <AvatarFallback>{discussion.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-medium hover:text-booknest-600 text-lg">
                              <Link to="#">{discussion.title}</Link>
                            </h3>
                            <Badge variant="outline" className="hidden sm:flex">{discussion.category}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span>by {discussion.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3.5 w-3.5" />
                              <span>{discussion.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{discussion.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="icon" className="ml-auto hidden sm:flex">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">View More Discussions</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="bookclubs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-semibold">Book Clubs</h2>
                <Button>Create Book Club</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookClubs.map((club) => (
                  <Card key={club.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={club.image} 
                        alt={club.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif">{club.name}</CardTitle>
                      <CardDescription>{club.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Members:</span>
                          <span className="font-medium">{club.members}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Currently Reading:</span>
                          <span className="font-medium">{club.currentBook}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Meetings:</span>
                          <span className="font-medium">{club.meetingSchedule}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Club</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">View All Book Clubs</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-semibold">Upcoming Events</h2>
                <Button>Submit Event</Button>
              </div>
              
              <div className="space-y-6">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <CardTitle className="font-serif">{event.title}</CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Badge variant="outline" className="px-3 py-1">{event.location}</Badge>
                          <Button className="sm:ml-auto">Register</Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">View All Events</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
