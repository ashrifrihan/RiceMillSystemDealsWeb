// C:\Users\RIHAN\Desktop\dealers - web\src\pages\HomePage.jsx
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
import { homeDataService } from '../services/homeDataService'; // Import the service

const HomePage = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTrustMessage, setCurrentTrustMessage] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  // 🔥 NEW: Firebase Data States
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [riceCategories, setRiceCategories] = useState([]);
  const [dealerStats, setDealerStats] = useState(null);
  const [riceMillsCount, setRiceMillsCount] = useState(50);
  const [loading, setLoading] = useState({
    products: true,
    categories: true,
    stats: true
  });
  
  // Check screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 🔥 FETCH FIREBASE DATA
  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        // Fetch top selling products
        const products = await homeDataService.getTopSellingProducts();
        setTopSellingProducts(products);
        setLoading(prev => ({ ...prev, products: false }));
        
        // Fetch categories
        const categories = await homeDataService.getProductCategories();
        setRiceCategories(categories);
        setLoading(prev => ({ ...prev, categories: false }));
        
        // Fetch dealer stats if user is logged in
        if (user?.uid) {
          const stats = await homeDataService.getDealerStats(user.uid);
          setDealerStats(stats);
        }
        setLoading(prev => ({ ...prev, stats: false }));
        
        // Fetch mills count
        const millsCount = await homeDataService.getRiceMillsCount();
        setRiceMillsCount(millsCount);
        
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setLoading({ products: false, categories: false, stats: false });
      }
    };
    
    fetchFirebaseData();
  }, [user?.uid]);
  
  // Trust header data - rotates every 5 seconds
  const trustMessages = [
    { text: `Fast Delivery Available | ${riceMillsCount}+ Partner Mills`, icon: <TruckIcon className="h-4 w-4" /> },
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
  
  // If no categories from Firebase, show default
  const displayCategories = riceCategories.length > 0 ? riceCategories : [
    {
      name: "Loading...",
      products: 0,
      priceRange: "LKR 0-0/KG",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
      borderColor: "border-gray-300",
      textColor: "text-gray-500"
    }
  ];
  
  // Promotional banners - dynamic based on dealer stats
  const promoBanners = [
    {
      title: dealerStats ? `Credit Available: LKR ${dealerStats.availableCredit.toLocaleString()}` : "Credit Facility Available",
      subtitle: dealerStats ? `Limit: LKR ${dealerStats.creditLimit.toLocaleString()} | Used: LKR ${dealerStats.usedCredit.toLocaleString()}` : "Get credit up to LKR 500,000",
      cta: "Apply Now",
      color: "from-green-500 to-emerald-600",
      badge: "Credit Line",
      discount: dealerStats ? `${Math.round((dealerStats.availableCredit / dealerStats.creditLimit) * 100)}% Available` : "Flexible Credit"
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
  }, [riceMillsCount]);

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

      {/* 2. MODERN HERO BANNER */}
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

                {/* Buttons */}
                <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
                  <Link to="/products">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-500 text-white font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-xl transition transform hover:scale-105"
                    >
                      {slide.buttonText}
                      <ChevronRightIcon className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>

                  <Link to="/products">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-2xl backdrop-blur-sm transition"
                    >
                      View All Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots Indicator */}
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

        {/* Prev/Next Arrows */}
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

      {/* 3. Services Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div key={index} className={`p-4 sm:p-6 rounded-xl border ${service.color} text-center`}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full mb-4">
                  <div className="text-green-600">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Rice Categories Section - NOW WITH REAL FIREBASE DATA */}
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

          {/* 🔥 DISPLAY CATEGORIES FROM FIREBASE */}
          {loading.categories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 px-4 lg:px-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-3xl bg-gray-200 mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 px-4 lg:px-0">
              {displayCategories.map((category, index) => (
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

                      {/* Strong dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>

                    {/* Text content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 text-white">
                      <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight drop-shadow-2xl mb-2">
                        {category.name}
                      </h3>

                      <p className="text-sm lg:text-base font-medium opacity-95 mb-4">
                        {category.products} products available
                      </p>

                      {/* Price badge */}
                      <div className="inline-flex items-center bg-green-600 text-white font-bold px-6 py-3 rounded-full text-sm lg:text-base shadow-lg ring-4 ring-green-600/30">
                        {category.priceRange}
                      </div>
                    </div>

                    {/* Soft hover glow */}
                    <div className="absolute -inset-1 rounded-3xl bg-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10" />
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* No categories message */}
          {!loading.categories && displayCategories.length === 1 && displayCategories[0].name === "Loading..." && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No categories found. Products need to be added to Firebase.</p>
              <Link to="/products">
                <Button className="bg-green-600 text-white">
                  Browse All Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. Top Selling Products Section - NOW WITH REAL FIREBASE DATA */}
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

          {/* 🔥 DISPLAY PRODUCTS FROM FIREBASE */}
          {loading.products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {topSellingProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.stock < 100 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Low Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-4">
                    {/* Product Name */}
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Mill Name */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2Icon className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium truncate">{product.millName}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews || 0})
                      </span>
                    </div>

                    {/* Price & Stock */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-green-700">
                          LKR {product.pricePerKg}
                        </span>
                        <span className="text-sm text-gray-500">/ KG</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Min. order: <span className="font-semibold text-gray-700">{product.minOrder} KG</span>
                        {product.stock > 0 && (
                          <span className="ml-2">
                            • Stock: <span className="font-semibold text-gray-700">{product.stock} KG</span>
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
                      onClick={() => {
                        // Add to cart logic here
                        console.log(`Added ${product.name} to cart`);
                      }}
                    >
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No products message */}
          {!loading.products && topSellingProducts.length === 0 && (
            <div className="text-center py-12">
              <PackageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Available</h3>
              <p className="text-gray-500 mb-4">Products need to be added to Firebase database.</p>
              {user?.role === 'owner' || user?.role === 'mill_owner' ? (
                <Link to="/owner/dashboard">
                  <Button className="bg-green-600 text-white">
                    Go to Owner Dashboard to Add Products
                  </Button>
                </Link>
              ) : (
                <p className="text-sm text-gray-400">Contact system administrator to add products.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. Promotional Banners with Real Dealer Stats */}
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
                    <Link to={index === 0 ? "/credit" : "/bulk-orders"}>
                      <Button 
                        size="sm" 
                        className="bg-black text-green-700 hover:bg-green-50"
                      >
                        {banner.cta}
                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Statistics Section - Dynamic from Firebase */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200 text-sm">Active Dealers</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{riceMillsCount}+</div>
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

      {/* 8. CTA Section */}
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