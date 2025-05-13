import { useState, useEffect } from 'react';

function SiteFooter() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">MRS</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for discovering, exploring, and enjoying the best movies from around the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h-6a2 2 0 01-2-2V8a2 2 0 012-2h6m2 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h8m2-2v-4a2 2 0 00-2-2h-4m2 4v2m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4a2 2 0 012-2h12a2 2 0 012 2v4m-6 6v-6m-2 6v-6m2 6v-6m-6 6v-6m2 6v-6m-2-6h12m-6 6h6m-2 6h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4"
                  />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Movie Recommendation System */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Movie Recommendations</h3>
            <p className="text-gray-400 text-sm">
              Our AI-powered recommendation system analyzes your viewing history and preferences to suggest movies
              you'll love.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 text-red-600 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Personalized suggestions</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 text-red-600 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"
                  />
                </svg>
                <span>Discover hidden gems</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 text-red-600 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span>Powered by machine learning</span>
              </li>
            </ul>
            <button
              className="mt-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded"
            >
              Try Recommendations
            </button>
          </div>

          {/* GitHub Organization */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Our GitHub Organization</h3>
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative h-10 w-10 top-2  overflow-hidden ">
                <img
                  src="/Logo.png"
                  alt="Organization Logo"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-white">Team Workspace</h4>
                <p className="text-xs text-gray-400">Open Source Film Projects</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              We're passionate about open source development. Join our community of developers building the future of
              film technology.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/your-organization"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-red-600 hover:underline"
              >
                Visit our GitHub
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="ml-1 h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} CineVerse. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
              Terms
            </a>
            <a href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
              Privacy
            </a>
            <a href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;