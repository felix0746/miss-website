'use client';

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="mb-4 sm:mb-6">
              <span className="text-lg sm:text-xl font-bold">覓食 MISS</span>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/cases" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.cases')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.contactInfo')}</h3>
            <div className="space-y-2 sm:space-y-3">
              <a 
                href="tel:+886225590960" 
                className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 group-hover:text-red-300 transition-colors" />
                <span className="text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors">02 2559 0960</span>
              </a>
              <a 
                href="mailto:service@wowmiss.com" 
                className="flex items-center space-x-2 sm:space-x-3 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 group-hover:text-red-300 transition-colors" />
                <span className="text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors">service@wowmiss.com</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/台北市中正區羅斯福路二段168號6樓之1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start space-x-2 sm:space-x-3 hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 sm:mt-1 flex-shrink-0 group-hover:text-red-300 transition-colors" />
                <span className="text-gray-300 text-sm sm:text-base group-hover:text-white transition-colors">
                  台北市中正區<br />
                  羅斯福路二段168號6樓之1
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                隱私政策
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                使用條款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
