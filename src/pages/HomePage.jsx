import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  TruckIcon, 
  ShieldIcon, 
  ClockIcon,
  StarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PhoneIcon,
  CheckCircleIcon,
  PackageIcon,
  UsersIcon,
  UserCheckIcon,
  MapPinIcon,
  ScaleIcon,
  Truck,
  Building2Icon,
  TagIcon,
  PercentIcon,
  AwardIcon,
  HeartIcon,
  CalendarIcon,
  BoxIcon,
  StoreIcon,
  ThumbsUpIcon,
  CheckCircle,
  BadgeCheckIcon,
  ShieldCheckIcon 
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTrustMessage, setCurrentTrustMessage] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  // Check screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Trust header data - rotates every 5 seconds
  const trustMessages = [
    { text: "Fast Delivery Available | Direct Mill Prices", icon: <TruckIcon className="h-4 w-4" /> },
    { text: "Trusted by 500+ Rice Dealers Nationwide", icon: <UsersIcon className="h-4 w-4" /> },
    { text: "100% Quality Guarantee | Secure Payments", icon: <ShieldIcon className="h-4 w-4" /> },
    { text: "Best Price Match | Lowest in Market", icon: <TagIcon className="h-4 w-4" /> },
    { text: "Bulk Order Discounts | Free Delivery over 1000KG", icon: <PackageIcon className="h-4 w-4" /> }
  ];
  
  // Hero slides with proper rice images
  const heroSlides = [
    {
      title: "Premium Rice Direct From Mills",
      subtitle: "Factory Prices | Same Day Dispatch | Quality Assured",
      offer: "Special Rates for Bulk Orders",
      buttonText: "Shop Now",
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      gradient: "from-green-700/90 via-green-800/70 to-green-900/90"
    },
    {
      title: "Fresh Paddy Stock Arrived",
      subtitle: "2024 Season Harvest | Moisture Controlled",
      offer: "Limited Time Special Prices",
      buttonText: "View Stock",
      badge: "New Arrival",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      gradient: "from-green-700/90 via-green-800/70 to-green-900/90"
    },
    {
      title: "Organic Rice Collection",
      subtitle: "Certified Organic | Chemical Free | Pure Quality",
      offer: "Special Rates for Regular Buyers",
      buttonText: "Explore Organic",
      badge: "Premium Quality",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      gradient: "from-green-700/90 via-green-800/70 to-green-900/90"
    }
  ];
  
  // Service highlights
  const services = [
    {
      icon: <Truck className="h-6 w-6 md:h-7 md:w-7" />,
      title: "Fast Delivery",
      description: "24-48 Hours Delivery",
      color: "bg-green-50 border-green-100"
    },
    {
      icon: <TagIcon className="h-6 w-6 md:h-7 md:w-7" />,
      title: "Best Price",
      description: "Direct Mill Rates",
      color: "bg-green-50 border-green-100"
    },
    {
      icon: <ClockIcon className="h-6 w-6 md:h-7 md:w-7" />,
      title: "24/7 Support",
      description: "Dealer Helpline",
      color: "bg-green-50 border-green-100"
    },
    {
      icon: <ShieldIcon className="h-6 w-6 md:h-7 md:w-7" />,
      title: "Secure Payment",
      description: "Safe Transactions",
      color: "bg-green-50 border-green-100"
    }
  ];
  
  // Rice Categories with IMAGES instead of icons
  const riceCategories = [
    {
      name: "Nadu Rice",
      products: 42,
      priceRange: "LKR 95-150/KG",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-700"
    },
    {
      name: "Samba Rice",
      products: 28,
      priceRange: "LKR 105-180/KG",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700"
    },
    {
      name: "Raw Rice",
      products: 35,
      priceRange: "LKR 85-130/KG",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-lime-50 to-lime-100",
      borderColor: "border-lime-200",
      textColor: "text-lime-700"
    },
    {
      name: "Broken Rice",
      products: 18,
      priceRange: "LKR 65-95/KG",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      textColor: "text-amber-700"
    },
    {
      name: "Red Rice",
      products: 15,
      priceRange: "LKR 125-200/KG",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-teal-50 to-teal-100",
      borderColor: "border-teal-200",
      textColor: "text-teal-700"
    },
    {
      name: "Rice Flour",
      products: 12,
      priceRange: "LKR 110-160/KG",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100",
      borderColor: "border-cyan-200",
      textColor: "text-cyan-700"
    },
    {
      name: "Basmati Rice",
      products: 25,
      priceRange: "LKR 150-250/KG",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-700"
    },
    {
      name: "Organic Rice",
      products: 20,
      priceRange: "LKR 180-300/KG",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700"
    }
  ];
  
  // Category-wise products - Organized by category
  const categoryProducts = {
    "Nadu Rice": [
      {
        id: 1,
        name: "Premium Nadu Rice - Grade A",
        millName: "Rajesh Kumar Rice Mills",
        pricePerKg: 115,
        minOrder: 50,
        stock: 5000,
        rating: 4.8,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        location: "Coimbatore, Tamil Nadu",
        deliveryTime: "24-48 hours",
        quality: "Grade A",
        millingType: "Polished",
        moisture: "12%",
        age: "2024 Harvest",
        tags: ["Best Seller", "Fast Delivery"],
        category: "Nadu Rice"
      },
      {
        id: 2,
        name: "Fine Nadu Rice - Standard",
        millName: "Sri Lakshmi Mills",
        pricePerKg: 98,
        minOrder: 100,
        stock: 8000,
        rating: 4.5,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        location: "Madurai, Tamil Nadu",
        deliveryTime: "48-72 hours",
        quality: "Grade B",
        millingType: "Semi-polished",
        moisture: "13%",
        age: "2024 Harvest",
        tags: ["Bulk Discount", "Ready Stock"],
        category: "Nadu Rice"
      }
    ],
    "Samba Rice": [
      {
        id: 3,
        name: "Export Quality Samba Rice",
        millName: "Lakshmi Rice Traders",
        pricePerKg: 125,
        minOrder: 25,
        stock: 2500,
        rating: 4.7,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        location: "Chennai, Tamil Nadu",
        deliveryTime: "48-72 hours",
        quality: "Export Grade",
        millingType: "Polished",
        moisture: "11%",
        age: "2024 Harvest",
        tags: ["Export Quality", "Limited Stock"],
        category: "Samba Rice"
      }
    ],
    "Organic Rice": [
      {
        id: 4,
        name: "Organic Red Rice",
        millName: "Green Fields Organic Farms",
        pricePerKg: 145,
        minOrder: 30,
        stock: 1800,
        rating: 4.9,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        location: "Kerala",
        deliveryTime: "72 hours",
        quality: "Organic Certified",
        millingType: "Unpolished",
        moisture: "13%",
        age: "2024 Season",
        tags: ["Organic", "Health Special"],
        category: "Organic Rice"
      }
    ],
    "Basmati Rice": [
      {
        id: 5,
        name: "Premium Basmati Rice",
        millName: "Ceylon Rice Mills",
        pricePerKg: 195,
        minOrder: 20,
        stock: 1200,
        rating: 4.8,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        location: "Sri Lanka",
        deliveryTime: "5-7 days",
        quality: "Premium Grade",
        millingType: "Aged",
        moisture: "10%",
        age: "Aged 1 Year",
        tags: ["Premium", "Aromatic"],
        category: "Basmati Rice"
      }
    ]
  };
  
  // Top selling products across all categories
  const topSellingProducts = [
    {
      id: 1,
      name: "Premium Nadu Rice - Grade A",
      millName: "Rajesh Kumar Rice Mills",
      pricePerKg: 115,
      minOrder: 50,
      stock: 5000,
      rating: 4.8,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      location: "Coimbatore, Tamil Nadu",
      deliveryTime: "24-48 hours",
      quality: "Grade A",
      millingType: "Polished",
      moisture: "12%",
      age: "2024 Harvest",
      tags: ["Best Seller", "Fast Delivery"],
      category: "Nadu Rice",
      soldThisMonth: 12500
    },
    {
      id: 3,
      name: "Export Quality Samba Rice",
      millName: "Lakshmi Rice Traders",
      pricePerKg: 125,
      minOrder: 25,
      stock: 2500,
      rating: 4.7,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      location: "Chennai, Tamil Nadu",
      deliveryTime: "48-72 hours",
      quality: "Export Grade",
      millingType: "Polished",
      moisture: "11%",
      age: "2024 Harvest",
      tags: ["Export Quality", "Limited Stock"],
      category: "Samba Rice",
      soldThisMonth: 8900
    },
    {
      id: 4,
      name: "Organic Red Rice",
      millName: "Green Fields Organic Farms",
      pricePerKg: 145,
      minOrder: 30,
      stock: 1800,
      rating: 4.9,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      location: "Kerala",
      deliveryTime: "72 hours",
      quality: "Organic Certified",
      millingType: "Unpolished",
      moisture: "13%",
      age: "2024 Season",
      tags: ["Organic", "Health Special"],
      category: "Organic Rice",
      soldThisMonth: 5600
    },
    {
      id: 5,
      name: "Premium Basmati Rice",
      millName: "Ceylon Rice Mills",
      pricePerKg: 195,
      minOrder: 20,
      stock: 1200,
      rating: 4.8,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      location: "Sri Lanka",
      deliveryTime: "5-7 days",
      quality: "Premium Grade",
      millingType: "Aged",
      moisture: "10%",
      age: "Aged 1 Year",
      tags: ["Premium", "Aromatic"],
      category: "Basmati Rice",
      soldThisMonth: 3200
    }
  ];

  // Promotional banners
  const promoBanners = [
    {
      title: "Special Mill Rates",
      subtitle: "Direct prices from partnered mills",
      cta: "View Mills",
      color: "from-green-500 to-emerald-600",
      badge: "Direct Prices",
      discount: "Mill Rates"
    },
    {
      title: "Bulk Order Benefits",
      subtitle: "Better rates for quantity orders",
      cta: "Contact Sales",
      color: "from-green-600 to-teal-700",
      badge: "Bulk Discount",
      discount: "Quantity Rates"
    }
  ];
  
  // Trust header rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrustMessage((prev) => (prev + 1) % trustMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hero slider auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Top Trust Bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center min-h-[20px]">
            <CheckCircleIcon className="h-4 w-4 mr-2 text-green-300 flex-shrink-0" />
            <span className="font-medium truncate text-center sm:text-left flex items-center">
              {trustMessages[currentTrustMessage].icon}
              <span className="ml-2">{trustMessages[currentTrustMessage].text}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-green-200 text-xs">
            <span className="flex items-center">
              <PhoneIcon className="h-3 w-3 mr-1" />
              Dealer Helpline: +94 77 123 4567
            </span>
          </div>
        </div>
      </div>

            {/* 2. MODERN HERO BANNER – Perfect on Mobile & Desktop */}
      <div className="relative overflow-hidden h-[520px] sm:h-[600px] md:h-[680px] lg:h-[720px] xl:h-[780px]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              {/* Darker, richer gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-6 sm:px-8 lg:px-12">
              <div className="text-center sm:text-left max-w-4xl mx-auto sm:mx-0">
                {/* Badge */}
                <div className="inline-flex items-center bg-green-600/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-xl">
                  <AwardIcon className="h-4 w-4 sm:h-5  mr-2" />
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-green-100 font-light max-w-2xl drop-shadow-lg">
                  {slide.subtitle}
                </p>

                {/* Special Offer Box */}
                <div className="mt-8 sm:mt-10 inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 sm:px-8 py-5 sm:py-6 shadow-2xl">
                  <PercentIcon className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mr-4" />
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-300">
                    {slide.offer}
                  </p>
                </div>

                {/* Buttons – Stacked on Mobile, Side-by-side on Desktop */}
                <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-500 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-xl transition transform hover:scale-105"
                  >
                    {slide.buttonText}
                    <ChevronRightIcon className="ml-3 h-6 w-6" />
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-2xl backdrop-blur-sm transition"
                  >
                    View All Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots Indicator – Centered & Responsive */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 h-3 bg-white rounded-full shadow-lg"
                  : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Prev/Next Arrows – Hidden on Mobile, Visible on Tablet+ */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full hover:bg-white/30 transition z-20"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full hover:bg-white/30 transition z-20"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </button>
      </div>

      

     {/* 4. Rice Categories – Now Beautiful & Identical to Top Selling (Premium Overlay Style) */}
<section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    
    {/* Clean, bold title */}
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
        Browse Rice Categories
      </h2>
      <p className="mt-4 text-xl text-gray-600 font-medium">
        Premium quality rice sourced directly from trusted Sri Lankan mills
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 px-4 lg:px-0">
  {riceCategories.map((category, index) => (
    <Link
      key={index}
      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
      className="group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white"
    >
      <div className="relative h-full flex flex-col justify-end">
        
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Strong dark overlay – perfect for white images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Text content – always visible & perfectly readable */}
        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 text-white">
          <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-2xl mb-2">
            {category.name}
          </h3>

          <p className="text-sm lg:text-base font-medium opacity-95 mb-4">
            {category.products} products available
          </p>

          {/* Solid green-600 badge – no gradient */}
          <div className="inline-flex items-center bg-green-600 text-white font-bold px-6 py-3 rounded-full text-sm lg:text-base shadow-lg ring-4 ring-green-600/30">
            {category.priceRange}
          </div>
        </div>

        {/* Soft hover glow (no gradient here either) */}
        <div className="absolute -inset-1 rounded-3xl bg-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10" />
      </div>
    </Link>
  ))}
</div>
  </div>
</section>

      {/* Minimal Product Cards - Top Selling Products */}
<section className="py-8 sm:py-10 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Top Selling Products
      </h2>
      <Link to="/products" className="text-green-600 hover:text-green-700 font-medium flex items-center text-sm sm:text-base">
        View All <ChevronRightIcon className="ml-1 h-5 w-5" />
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {topSellingProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          {/* Simple Image */}
          <div className="h-48 bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="p-5 space-y-4">
            {/* Product Name */}
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
              {product.name}
            </h3>

            {/* Mill Owner */}
            <div className="flex items-center text-sm text-gray-600">
              <Building2Icon className="h-4 w-4 mr-2 text-green-600" />
              <span className="font-medium">{product.millName}</span>
            </div>

            {/* Price & Min Order */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-700">
                  LKR {product.pricePerKg}
                </span>
                <span className="text-sm text-gray-500">/ KG</span>
              </div>
              <p className="text-xs text-gray-500">
                Min. order: <span className="font-semibold text-gray-700">{product.minOrder} KG</span>
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
              onClick={() => {
                console.log(`Added ${product.name} from ${product.millName} to cart`);
                // Add your add-to-cart logic here
              }}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

            {/* 6. PREMIUM Category Showcase with "ALL" Tab – FINAL VERSION */}
      {(() => {
        const allCategories = ["All Products", ...Object.keys(categoryProducts)];
        const [selectedCategory, setSelectedCategory] = useState("All Products");

        // Get products based on selection
        const getProducts = () => {
          if (selectedCategory === "All Products") {
            return Object.values(categoryProducts).flat();
          }
          return categoryProducts[selectedCategory] || [];
        };

        const products = getProducts();

        return (
          <section className="py-16 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

              {/* Elegant Category Tabs with "All" First */}
              <div className="flex flex-wrap justify-center gap-4 mb-16 lg:mb-24">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-sm ${
                      selectedCategory === cat
                        ? "bg-black text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Title */}
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900">
                  {selectedCategory === "All Products" ? "All Rice Products" : selectedCategory}
                </h2>
                <p className="mt-4 text-lg text-gray-500 font-light">
                  {selectedCategory === "All Products"
                    ? "Premium rice varieties from trusted Sri Lankan mills"
                    : `Best ${selectedCategory.toLowerCase()} available now`}
                </p>
              </div>

              {/* Full Luxury Grid – Always Feels Rich */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="group block"
                    >
                      <div className="aspect-square overflow-hidden rounded-3xl bg-gray-50 mb-6 shadow-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      <div className="text-center space-y-3">
                        <h3 className="text-base lg:text-lg font-medium text-gray-900 line-clamp-2 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-light">{product.millName}</p>

                        <div className="pt-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            LKR {product.pricePerKg}
                            <span className="text-sm font-normal text-gray-400 ml-1">/ KG</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Min. {product.minOrder} KG
                          </p>
                        </div>

                        {/* Hover Add to Cart */}
                        <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-6">
                          <Button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3.5 rounded-2xl shadow-md">
                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                            Add to Cart
                          </Button>
                        </div>

                        {/* Mobile Button */}
                        <div className="lg:hidden mt-5">
                          <Button className="w-full bg-black text-white font-medium py-3.5 rounded-2xl">
                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 py-20">
                    No products available in this category yet.
                  </p>
                )}
              </div>

              {/* View All Link */}
              <div className="text-center mt-16 lg:mt-20">
                <Link
                  to={
                    selectedCategory === "All Products"
                      ? "/products"
                      : `/category/${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`
                  }
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-lg transition"
                >
                  View All {selectedCategory === "All Products" ? "Products" : selectedCategory}
                  <ChevronRightIcon className="ml-2 h-6 w-6" />
                </Link>
              </div>

            </div>
          </section>
        );
      })()}

      {/* 7. Promotional Banners */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {promoBanners.map((banner, index) => (
              <div key={index} className={`bg-gradient-to-r ${banner.color} rounded-xl overflow-hidden`}>
                <div className="p-6 sm:p-8 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                        {banner.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                        {banner.title}
                      </h3>
                      <p className="text-green-100 text-sm sm:text-base">
                        {banner.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg sm:text-xl font-bold">
                      {banner.discount}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-black text-green-700 hover:bg-green-50"
                    >
                      {banner.cta}
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Statistics */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200 text-sm">Active Dealers</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-green-200 text-sm">Partner Mills</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-200 text-sm">Monthly Orders</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-green-200 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
            {/* FINAL LUXURY CTA – Ready to Grow Your Rice Business? */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl shadow-2xl mb-8">
            <PackageIcon className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            Ready to Grow Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Rice Business?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join <span className="font-bold text-green-700">500+ successful rice dealers</span> across Sri Lanka who trust us for 
            premium quality rice, direct mill prices, instant credit, and lightning-fast delivery.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl lg:text-5xl font-black text-green-600">50+</div>
              <p className="text-gray-600 mt-2">Partner Mills</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-green-600">10,000+</div>
              <p className="text-gray-600 mt-2">Monthly Orders</p>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-black text-green-600">98%</div>
              <p className="text-gray-600 mt-2">Dealer Satisfaction</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                Become a Dealer Today
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold text-xl px-10 py-6 rounded-2xl transition-all duration-300"
              >
                Talk to Sales Team
              </Button>
            </Link>
          </div>

          {/* Trust Badge */}
          <p className="mt-10 text-sm text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-green-600" />
            Secure • Verified Mills • 100% Quality Guarantee
          </p>

        </div>
      </section>
    </div>
  );
};

export default HomePage;