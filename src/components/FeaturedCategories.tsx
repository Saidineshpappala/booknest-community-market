
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

type CategoryItem = {
  id: string;
  name: string;
  image: string;
  count: number;
};

const categories: CategoryItem[] = [
  {
    id: "fiction",
    name: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    count: 3245
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    image: "https://images.unsplash.com/photo-1521123845560-14093637aa7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    count: 2187
  },
  {
    id: "classics",
    name: "Classics",
    image: "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=795&q=80",
    count: 1254
  },
  {
    id: "sci-fi",
    name: "Science Fiction",
    image: "https://images.unsplash.com/photo-1517425260452-1636e6d4342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: 986
  },
  {
    id: "mystery",
    name: "Mystery & Thriller",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    count: 1423
  },
  {
    id: "biography",
    name: "Biography",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
    count: 892
  }
];

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    // Setup the search parameters for the books page
    navigate(`/books`, {
      state: { category: categoryId }
    });
  };

  return (
    <section className="container py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Browse Categories</h2>
        <Link to="/categories" className="text-booknest-600 hover:text-booknest-700 font-medium">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="overflow-hidden hover:shadow-md transition-shadow h-full cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} books</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
