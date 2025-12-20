import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ChevronUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-2xl">R</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">RiceMill<span className="text-green-600">.</span></h2>
                <p className="text-green-700 font-semibold text-sm">Direct from Mills</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-xs">
              Premium Sri Lankan rice delivered straight from verified mills at factory prices. 
              Quality guaranteed. Trusted by dealers nationwide.
            </p>

            <div className="flex space-x-4 mt-6">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-green-600 hover:border-green-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Place Order', path: '/place-order' },
                { name: 'Track Delivery', path: '/delivery-tracking' },
                { name: 'Loan Management', path: '/loan-management' },
                { name: 'Order History', path: '/order-history' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-green-700 font-medium flex items-center group transition"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Support</h3>
            <ul className="space-y-4">
              {['Terms of Service', 'Privacy Policy', 'Shipping & Delivery', 'Returns Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-700 font-medium flex items-center group transition"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Head Office</p>
                  <p className="text-gray-600 text-sm">123 Rice Mill Road<br />Colombo 07, Sri Lanka</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Dealer Hotline</p>
                  <p className="text-lg font-bold text-green-700">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-green-700 font-medium">support@ricemill.lk</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-sm text-gray-500">Business Hours</p>
              <p className="font-semibold text-gray-900">Mon–Fri: 8 AM – 6 PM<br />Saturday: 9 AM – 3 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-center lg:text-left">
            © {currentYear} <span className="font-bold text-green-700">RiceMill.lk</span> All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Secure Payments:</span>
            <div className="flex gap-3">
              {['VISA', 'MasterCard', 'AMEX'].map((card) => (
                <div key={card} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <ChevronUp className="w-8 h-8" />
      </button>
    </footer>
  );
};

export default Footer;