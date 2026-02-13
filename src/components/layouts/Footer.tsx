import React from 'react';
import { Globe, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import LanguageSelector from '../ui/Languages';

const AlternativeFooter = () => {
  const footerLinks = {
    column1: [
      { text: 'Udemy.com', href: '/' },
      { text: 'About Us', href: '#' },
      { text: 'Events', href: '#' },
      { text: 'Partners & Integrations', href: '#' },
      { text: 'Partner with Udemy', href: '#' },
      { text: 'Take a product tour', href: '#' },
      { text: 'News', href: '#' },
      { text: 'Investor Relations', href: '#' },
      { text: 'Careers – ', href: '#', italic: true, extra: <span className="italic">we're hiring!</span> }
    ],
    column2: [
      { text: 'Contact Us', href: '#' },
      { text: 'Help', href: '#' },
      { text: 'Terms & conditions', href: '#' },
      { text: 'Privacy policy', href: '#' },
      { text: 'Cookie settings', href: '#' },
      { text: 'Sitemap', href: '#' }
    ]
  };

  const socialIcons = [
    {
      icon: (
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" className="w-5 h-5">
          <path d="M20 20h-4v-6.999c0-1.92-.847-2.991-2.366-2.991-1.653 0-2.634 1.115-2.634 2.99V20H7V7h4v1.462C11 8.462 12.255 6.26 15.083 6.26 17.912 6.26 20 7.986 20 11.558V20ZM2.442 4.921C1.093 4.921 0 3.819 0 2.46 0 1.102 1.093 0 2.442 0 3.79 0 4.883 1.102 4.883 2.46 4.884 3.819 3.79 4.921 2.442 4.921ZM0 20h5V7H0v13Z" />
        </svg>
      ),
      href: 'https://www.linkedin.com/company/udemy/',
      label: 'LinkedIn'
    },
    {
      icon: (
        <svg version="1.1" id="Layer_1" className="w-5 h-5" viewBox="-337 273 123.5 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"/>
        </svg>
      ),
      href: 'https://www.facebook.com/udemy',
      label: 'Facebook'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className='w-5 h-5' fill='currentColor'>
          <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"/>
        </svg>
      ),
      href: 'https://www.facebook.com/udemy',
      label: 'Twitter'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className='w-5 h-5' xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
          <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" />
        </svg>
      ),
      href: 'https://www.instagram.com/udemy/',
      label: 'Instagram'
    }
  ];

  return (
    <footer className="bg-black text-white pt-12 pb-5">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Navigation Links */}
          <div className="md:col-span-3">
            <ul className="space-y-4">
              {footerLinks.column1.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className={`text-white hover:text-[#5624D0] transition-colors duration-200 ${
                      link.italic ? '' : ''
                    }`}
                  >
                    {link.text}{link.extra && link.extra}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Column - More Links */}
          <div className="md:col-span-3">
            <ul className="space-y-4">
              {footerLinks.column2.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white hover:text-[#5624D0] transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Social Media & Language */}
          <div className="md:col-span-6 md:text-right">
            <div className="flex sm:flex-row flex-col sm:items-center items-start lg:gap-5 gap-2">
              <span className="mr-2 text-sm mb-2 sm:mb-0">Follow us</span>
              <div className="flex items-center lg:gap-8 gap-4">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="group text-white hover:text-[#5624D0] transition-all duration-200 rounded"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Language Selector */}
              <div className="ml-0 sm:ml-8 mt-3 sm:mt-0 border border-solid rounded px-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <div className="mt-12 mb-8 py-6 border-t border-b border-solid border-[#252525]">
          <div className="flex sm:flex-row flex-col sm:items-center items-start gap-6 sm:gap-24">
            <div className="w-fit">
              <p className="text-[#7d8286] text-sm font-normal leading-relaxed">
                Reviewers recommend learning<br />
                with Udemy Business
              </p>
            </div>
            {/* Award Badges as Images */}
            <div className="flex space-x-4 items-center">
              <img src="/assets/time-atedtc-worlds-top-edtech-companies-2024-logo-180px.webp" alt="TIME World's Top EdTech Companies 2024" className="h-16 w-auto" />
              <img src="/assets/g2-badge-best-software-2025-education-50.png" alt="G2 Best Software 2025 Education" className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center">
                <a href="/business"><img src="/assets/logo-udemy-inverted.svg" alt="Udemy Logo" className="h-7 w-auto border-r border-solid border-[#252525] pr-4" /></a>
                <div className="ml-4 text-xs">
                  The power of possibilities
                </div>
              </div>
            </div>
            {/* Copyright */}
            <div className="text-sm text-center mt-4 md:mt-0">
              © 2025 Udemy, Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AlternativeFooter;