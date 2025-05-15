import React from "react";

function Watchlist() {
    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-sm">
            <h2 className="text-3xl font-bold text-white">Your Watchlist</h2>
            <p className="mt-2 text-gray-400">
                Here are the movies you added to your watchlist.
            </p>
            {/* Add your logic to display watchlisted movies here */}
            </div>
        </div>
        </div>
    );
    }
export default Watchlist;