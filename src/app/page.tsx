import { ArrowRight, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative">
        {/* Hero Section with Background Image */}
        <div 
          className="relative h-[500px] md:h-[600px] bg-cover bg-center bg-no-repeat rounded-b-lg overflow-hidden"
          style={{
            backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/2e4668a0694ea8f64d56b8bac06c406211c1511b?width=822')`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
          
          {/* Top Navigation */}
          <div className="relative z-10 flex items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/97fd9ca03838e1000a204efef9c1e7bb87d290dc?width=44" 
                alt="Regigo" 
                className="w-6 h-6 rounded"
              />
            </div>
            
            {/* Language & Menu */}
            <div className="flex items-center space-x-4 bg-blue-500 px-6 py-3 rounded-xl border-2 border-white">
              <div className="flex items-center space-x-2 text-white">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">English</span>
              </div>
              <Menu className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mb-6">
              Launch Your Business in Cameroon - Fast & Secure
            </h1>
            <p className="text-white text-sm md:text-base max-w-md mb-8 font-medium">
              Register your company, add shareholders, and upload documents in minutes
            </p>
            <Link href="/register-account"><Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-3 rounded-full text-sm font-bold flex items-center space-x-2"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </Button></Link>
          </div>
        </div>
      </header>

      {/* How it Works Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 81 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.93954 15.368L14.5622 2.74622L20.2537 8.43769L7.63102 21.0595L3.03849 19.9597L1.93954 15.368Z" fill="url(#paint0_linear_37_2143)"/>
                    <path d="M1.94036 15.3689L2.34949 14.9573C2.34949 14.9573 2.57586 16.9296 4.32265 18.6764C6.06944 20.4232 8.04096 20.6496 8.04096 20.6496L7.63184 21.0595C7.21674 21.4748 6.69046 21.7612 6.11636 21.8843L0.996177 22.9816C0.861789 23.0105 0.722306 23.0053 0.590457 22.9664C0.458607 22.9276 0.338587 22.8563 0.241349 22.7592C0.144111 22.662 0.0727504 22.5421 0.0337783 22.4102C-0.00519375 22.2784 -0.0105363 22.1389 0.0182379 22.0045L1.11554 16.8835C1.23881 16.3097 1.52523 15.7837 1.94036 15.3689Z" fill="url(#paint1_linear_37_2143)"/>
                    <path d="M16.1756 1.13111C16.9347 0.397384 17.9516 -0.0087758 19.0073 0.000143865C20.063 0.00906353 21.0729 0.432348 21.8194 1.17879C22.566 1.92524 22.9894 2.93509 22.9985 3.99076C23.0075 5.04643 22.6015 6.06341 21.8679 6.82258L18.7975 9.89304L13.106 4.20075L16.1756 1.13111Z" fill="url(#paint2_linear_37_2143)"/>
                    <path d="M18.3735 10.317L20.7031 7.9874C20.7031 7.9874 18.7291 7.75856 16.9848 6.01424C15.2396 4.26909 15.0116 2.2951 15.0116 2.2951L12.682 4.62471C12.682 4.62471 12.9092 6.60034 14.6543 8.34466C16.3995 10.089 18.3735 10.317 18.3735 10.317Z" fill="url(#paint3_linear_37_2143)"/>
                    <defs>
                      <linearGradient id="paint0_linear_37_2143" x1="12.5857" y1="7.70259" x2="15.2035" y2="14.6478" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFA43D"/>
                        <stop offset="1" stopColor="#FB5937"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_37_2143" x1="-1.56885" y1="17.3182" x2="4.5054" y2="23.2739" gradientUnits="userSpaceOnUse">
                        <stop offset="0.255" stopColor="#FFD394"/>
                        <stop offset="1" stopColor="#FF921F"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear_37_2143" x1="20.9493" y1="2.00368" x2="17.3116" y2="5.47997" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F97DBD"/>
                        <stop offset="1" stopColor="#DD3CE2"/>
                      </linearGradient>
                      <linearGradient id="paint3_linear_37_2143" x1="16.8424" y1="7.78984" x2="11.1624" y2="5.37956" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF921F"/>
                        <stop offset="1" stopColor="#FFE994"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-sm">Step 1</h3>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">Enter Business Details</h4>
              <p className="text-blue-600 text-xs leading-relaxed">
                Provide your company&apos;s name, address, and industry.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.611 19.9985C19.1473 19.9816 19.6724 19.8417 20.146 19.5895C20.7061 19.291 21.1745 18.8459 21.5011 18.3016C21.8277 17.7574 22.0001 17.1347 22 16.5V11.625C22.0001 11.1343 21.8304 10.6587 21.5197 10.2789C21.209 9.89915 20.7765 9.6386 20.2955 9.5415C20.157 9.51389 20.0162 9.49999 19.875 9.5H17.125C16.9807 9.50033 16.8403 9.51417 16.704 9.5415C16.2231 9.6387 15.7907 9.8993 15.4801 10.2791C15.1695 10.6588 14.9999 11.1344 15 11.625V16.5C15 17.8375 15.7505 19 16.8535 19.5895C17.3566 19.8583 17.9181 19.9992 18.4885 20H18.5C18.537 20 18.574 19.9993 18.611 19.998" fill="url(#paint0_linear_39_2199)"/>
                    <path d="M18.611 19.9985C19.1473 19.9816 19.6724 19.8417 20.146 19.5895C20.7061 19.291 21.1745 18.8459 21.5011 18.3016C21.8277 17.7574 22.0001 17.1347 22 16.5V11.625C22.0001 11.1343 21.8304 10.6587 21.5197 10.2789C21.209 9.89915 20.7765 9.6386 20.2955 9.5415C20.157 9.51389 20.0162 9.49999 19.875 9.5H17.125C16.9807 9.50033 16.8403 9.51417 16.704 9.5415C16.2231 9.6387 15.7907 9.8993 15.4801 10.2791C15.1695 10.6588 14.9999 11.1344 15 11.625V16.5C15 17.8375 15.7505 19 16.8535 19.5895C17.3566 19.8583 17.9181 19.9992 18.4885 20H18.5C18.537 20 18.574 19.9993 18.611 19.998" fill="url(#paint1_radial_39_2199)" fillOpacity="0.5"/>
                    <defs>
                      <linearGradient id="paint0_linear_39_2199" x1="16.6645" y1="10.896" x2="22.601" y2="17.215" gradientUnits="userSpaceOnUse">
                        <stop offset="0.125" stopColor="#7A41DC"/>
                        <stop offset="1" stopColor="#5B2AB5"/>
                      </linearGradient>
                      <radialGradient id="paint1_radial_39_2199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.9 14.504) rotate(-0.0514339) scale(4.35005 11.0696)">
                        <stop offset="0.433" stopColor="#3B148A"/>
                        <stop offset="1" stopColor="#3B148A" stopOpacity="0"/>
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-sm">Step 2</h3>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">Add Founder & Shareholder</h4>
              <p className="text-blue-600 text-xs leading-relaxed">
                List all founders and shareholders with their details
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 21.5H18.5C18.8978 21.5 19.2794 21.342 19.5607 21.0607C19.842 20.7794 20 20.3978 20 20V9L15 7L13 2H5.5C5.10218 2 4.72064 2.15804 4.43934 2.43934C4.15804 2.72064 4 3.10218 4 3.5V20C4 20.3978 4.15804 20.7794 4.43934 21.0607C4.72064 21.342 5.10218 21.5 5.5 21.5Z" fill="url(#paint0_linear_39_2216)"/>
                    <path d="M13 7.5V2L20 9H14.5C14.1022 9 13.7206 8.84196 13.4393 8.56066C13.158 8.27936 13 7.89782 13 7.5Z" fill="url(#paint2_linear_39_2216)"/>
                    <defs>
                      <linearGradient id="paint0_linear_39_2216" x1="15.2" y1="2" x2="16.742" y2="18.4555" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6CE0FF"/>
                        <stop offset="1" stopColor="#4894FE"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear_39_2216" x1="16.4885" y1="4.9165" x2="14.7385" y2="7.8335" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9FF0F9"/>
                        <stop offset="1" stopColor="#B3E0FF"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-sm">Step 3</h3>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">Upload Legal Documents</h4>
              <p className="text-blue-600 text-xs leading-relaxed">
                Upload neccessary documents like articles of association
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.125C7.44248 1.125 5.91992 1.58686 4.62489 2.45218C3.32985 3.31749 2.32049 4.5474 1.72445 5.98637C1.12841 7.42534 0.972461 9.00874 1.27632 10.5363C1.58018 12.0639 2.3302 13.4671 3.43154 14.5685C4.53288 15.6698 5.93607 16.4198 7.46367 16.7237C8.99127 17.0275 10.5747 16.8716 12.0136 16.2756C13.4526 15.6795 14.6825 14.6702 15.5478 13.3751C16.4131 12.0801 16.875 10.5575 16.875 9C16.875 6.91142 16.0453 4.90838 14.5685 3.43153C13.0916 1.95469 11.0886 1.125 9 1.125ZM8.06232 13.5804L3.8925 9.41062L5.74482 7.55831L8.06232 9.8685L12.2558 5.6835L14.1086 7.53581L8.06232 13.5804Z" fill="#7CB342"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-sm">Step 4</h3>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">Track Application Progress</h4>
              <p className="text-blue-600 text-xs leading-relaxed">
                Monitor your application&apos;s status in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Benefits
          </h2>
          
          <div className="relative">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/6aa85aa6a72183412d4b423c006c3ce07f7d11f4?width=786" 
              alt="Professional Business Person" 
              className="w-full h-96 object-cover rounded-lg"
            />
            
            {/* Benefit Tags Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center space-y-4 p-8">
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg max-w-fit ml-4">
                <div className="flex items-center space-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.4286 5C18.8453 5 19.245 5.16389 19.5397 5.45561C19.8344 5.74733 20 6.143 20 6.55556V19L14.5 16.6667L9 19V6.55556C9 6.143 9.16556 5.74733 9.46026 5.45561C9.75496 5.16389 10.1547 5 10.5714 5H18.4286ZM13.7143 13.5556L18.625 8.70222L17.5171 7.59778L13.7143 11.3622L11.6793 9.34778L10.5714 10.4444L13.7143 13.5556Z" fill="#07042F"/>
                  </svg>
                  <span className="text-black text-sm font-medium">Smart Autosave</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg max-w-fit ml-16">
                <div className="flex items-center space-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.4286 5C18.8453 5 19.245 5.16389 19.5397 5.45561C19.8344 5.74733 20 6.143 20 6.55556V19L14.5 16.6667L9 19V6.55556C9 6.143 9.16556 5.74733 9.46026 5.45561C9.75496 5.16389 10.1547 5 10.5714 5H18.4286ZM13.7143 13.5556L18.625 8.70222L17.5171 7.59778L13.7143 11.3622L11.6793 9.34778L10.5714 10.4444L13.7143 13.5556Z" fill="#07042F"/>
                  </svg>
                  <span className="text-black text-sm font-medium">Comply with laws</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg max-w-fit ml-4">
                <div className="flex items-center space-x-2">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4286 5C17.8453 5 18.245 5.16389 18.5397 5.45561C18.8344 5.74733 19 6.143 19 6.55556V19L13.5 16.6667L8 19V6.55556C8 6.143 8.16556 5.74733 8.46026 5.45561C8.75496 5.16389 9.15466 5 9.57143 5H17.4286ZM12.7143 13.5556L17.625 8.70222L16.5171 7.59778L12.7143 11.3622L10.6793 9.34778L9.57143 10.4444L12.7143 13.5556Z" fill="#07042F"/>
                  </svg>
                  <span className="text-black text-sm font-medium">Quick process</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg max-w-fit ml-16">
                <div className="flex items-center space-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4286 5C19.8453 5 20.245 5.16389 20.5397 5.45561C20.8344 5.74733 21 6.143 21 6.55556V19L15.5 16.6667L10 19V6.55556C10 6.143 10.1656 5.74733 10.4603 5.45561C10.755 5.16389 11.1547 5 11.5714 5H19.4286ZM14.7143 13.5556L19.625 8.70222L18.5171 7.59778L14.7143 11.3622L12.6793 9.34778L11.5714 10.4444L14.7143 13.5556Z" fill="#07042F"/>
                  </svg>
                  <span className="text-black text-sm font-medium">Secure Docs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-8">
            want to Register your company?
          </h2>
          <Link href="/register">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-base font-bold mb-8">
              Start Registration Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Footer Links */}
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-blue-600 text-base hover:text-blue-700">About</a>
            <a href="#" className="text-blue-600 text-base hover:text-blue-700">Help</a>
            <a href="#" className="text-blue-600 text-base hover:text-blue-700">Contact</a>
          </div>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18.25 0.25H1.75C0.921573 0.25 0.25 0.921573 0.25 1.75V18.25C0.25 19.0784 0.921573 19.75 1.75 19.75H18.25C19.0784 19.75 19.75 19.0784 19.75 18.25V1.75C19.75 0.921573 19.0784 0.25 18.25 0.25Z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 10.0909C20 4.8373 15.5228 0.5 10 0.5C4.47715 0.5 0 4.8373 0 10.0909C0 14.8218 3.65684 18.7727 8.4375 19.5V12.8409H5.89844V10.0909H8.4375V8.02955C8.4375 5.56136 9.93047 4.20455 12.2146 4.20455C13.3084 4.20455 14.4531 4.40227 14.4531 4.40227V6.86364H13.1922C11.9497 6.86364 11.5625 7.62955 11.5625 8.41591V10.0909H14.3359L13.8926 12.8409H11.5625V19.5C16.3432 18.7727 20 14.8218 20 10.0909Z"/>
              </svg>
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          
          {/* Copyright */}
          <p className="text-center text-blue-600 text-base">
            © 2025 Regigo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
