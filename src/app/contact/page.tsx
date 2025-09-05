'use client'

import { useTranslation } from '@/contexts/TranslationContext';

// 強制動態渲染，避免服務端預渲染問題
export const dynamic = 'force-dynamic'
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleIframeLoad = () => {
    if (isSubmitted) {
      alert('感謝您的留言！我們會盡快回覆您。');
      if (formRef.current) {
        formRef.current.reset();
      }
      setIsSubmitted(false); // Reset for next submission
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('contact.form.title')}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{t('contact.form.subtitle')}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                {/* 隱藏的 iframe 用於接收表單提交 */}
                <iframe 
                  name="hidden_iframe" 
                  id="hidden_iframe" 
                  style={{ display: 'none' }}
                  onLoad={handleIframeLoad}
                ></iframe>
                
                <form
                  ref={formRef}
                  action="https://docs.google.com/forms/d/e/1FAIpQLSfEy_6Y5jVXwEspjDhSfsrRCnS0hN0BuTOFg_9f1KdmygHSMw/formResponse"
                  method="POST"
                  target="hidden_iframe"
                  className="space-y-5 sm:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800">
                        {t('contact.form.name')} <span className="text-primary-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="entry.2005620554"
                        required
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                        placeholder={t('contact.form.firstNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800">
                        {t('contact.form.lastName')} <span className="text-primary-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="entry.1386234295"
                        required
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                        placeholder={t('contact.form.lastNamePlaceholder')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                      {t('contact.form.email')} <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="entry.1318009696"
                      required
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="entry.575045837"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-800">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="entry.1320678025"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      placeholder={t('contact.form.companyPlaceholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-800">
                      {t('contact.form.service')} <span className="text-primary-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="entry.1048357643"
                        required
                        className="w-full px-4 py-4 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 bg-gray-50 focus:bg-white appearance-none cursor-pointer pr-12 text-base sm:text-sm"
                        style={{ 
                          fontSize: '16px',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none'
                        }}
                        size={1}
                      >
                        <option value="">{t('contact.form.selectService')}</option>
                        <option value="brand-planning">{t('contact.form.brandPlanning')}</option>
                        <option value="strategy-planning">{t('contact.form.strategyPlanning')}</option>
                        <option value="business-diagnosis">{t('contact.form.businessDiagnosis')}</option>
                        <option value="hr-development">{t('contact.form.hrDevelopment')}</option>
                        <option value="other">{t('contact.form.other')}</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-6 h-6 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-800">
                      {t('contact.form.message')} <span className="text-primary-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="entry.319358868"
                      rows={5}
                      required
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 min-h-[48px] sm:min-h-[52px] shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t('contact.form.submitBtn')}
                    </span>
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Details */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('contact.info.title')}</h2>
              
              <div className="space-y-4 -ml-3">
                <a 
                  href="https://www.google.com/maps/search/台北市中正區羅斯福路二段168號6樓之1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{t('contact.info.address')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors">
                      {t('contact.info.address_line1')}<br />
                      {t('contact.info.address_line2')}
                    </p>
                  </div>
                </a>
                
                <a 
                  href="tel:+886225590960" 
                  className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-200 transition-colors">
                    <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-secondary-600 transition-colors">{t('contact.info.phone')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors">
                      {t('contact.info.phone_number')}
                    </p>
                  </div>
                </a>
                
                <a 
                  href="mailto:service@wowmiss.com" 
                  className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{t('contact.info.email')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors">
                      {t('contact.info.email_address')}
                    </p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('contact.info.businessHours')}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {t('contact.info.businessHours_line1')}<br />
                      {t('contact.info.businessHours_line2')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">{t('contact.info.social')}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            {t('contact.map.title')}
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=台北市中正區羅斯福路二段168號6樓之1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('contact.map.title')}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              {t('contact.faq.subtitle')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
              <button className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-base sm:text-lg pr-4">
                    {t('contact.faq.q1')}
                  </span>
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 text-primary-600 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="border-t border-gray-100 pt-4 sm:pt-5">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {t('contact.faq.a1')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
              <button className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-base sm:text-lg pr-4">
                    {t('contact.faq.q2')}
                  </span>
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 text-primary-600 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="border-t border-gray-100 pt-4 sm:pt-5">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {t('contact.faq.a2')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
              <button className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-base sm:text-lg pr-4">
                    {t('contact.faq.q3')}
                  </span>
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 text-primary-600 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="border-t border-gray-100 pt-4 sm:pt-5">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {t('contact.faq.a3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('contact.cta.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white mb-5 sm:mb-6 max-w-2xl mx-auto">
            {t('contact.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('contact.cta.cta1')}
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-colors w-full sm:w-auto min-h-[44px] sm:min-h-[48px] inline-flex items-center justify-center cursor-pointer"
            >
              {t('contact.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
