import { FaGithub, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

function SiteFooter() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">MRS</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for discovering, exploring, and enjoying
              the best movies from around the world.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-red-main font-medium">Saad Ali</span>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaSquareInstagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <MdAttachEmail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-red-main font-medium">Abrar Ali</span>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaSquareInstagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <MdAttachEmail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Movie Recommendation System */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Movie Recommendations
            </h3>
            <p className="text-gray-400 text-sm">
              Our DSA-powered recommendation system analyzes your viewing
              history, Likes, watchlist and preferences to suggest movies you'll
              love.
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
                <span>Powered by DSA</span>
              </li>
            </ul>
            <button className="mt-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded">
              Try Recommendations
            </button>
          </div>

          {/* GitHub Organization */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Our GitHub Organization
            </h3>
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
                <p className="text-xs text-gray-400">
                  Open Source Team Projects
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              We're passionate about open source development. Join our community
              of developers building the future of film technology.
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
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MRS. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/terms"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Privacy
            </a>
            <a
              href="/cookies"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
