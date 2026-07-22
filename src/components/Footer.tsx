const Footer = () => {
  return (
    <footer className="w-full bg-white text-black pt-8 pb-2 px-6 border-t border-[#e5e5e5] mt-48">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Brand - Left side */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">🛒 FreshMart</span>
            </div>
            <p className="text-sm font-light text-black/70 leading-relaxed max-w-md mb-6">
              Quality everyday essentials delivered fresh to your door.
            </p>

            {/* Contact Information */}
            <div className="space-y-2 text-sm font-light text-black/70">
              <div>
                <p className="font-normal text-black mb-1">Visit Us</p>
                <p>14 Market Street</p>
                <p>London, EC1A 1BB</p>
              </div>
              <div>
                <p className="font-normal text-black mb-1 mt-3">Contact</p>
                <p>+44 20 7946 0123</p>
                <p>hello@freshmartstore.com</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="text-sm font-normal mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="/products" className="text-sm font-light text-black/70 hover:text-black transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Beverages</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Snacks</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Personal Care</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Household</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-normal mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Delivery Info</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Returns</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Track Order</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">FAQ</a></li>
                <li><a href="/contact" className="text-sm font-light text-black/70 hover:text-black transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-normal mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Facebook</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#e5e5e5] -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-black mb-1 md:mb-0">
            © 2024 FreshMart. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;