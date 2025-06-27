


// src/Context/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Wishlist Context
const WishlistContext = createContext();

// Custom hook to use the Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  // Throw an error if useWishlist is used outside of a WishlistProvider.
  // This helps debug if the provider is missing.
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  // Initialize wishlist state from localStorage.
  // This function runs only once on initial render.
  // IMPORTANT: It ensures 'wishlist' is always an array, even if localStorage is empty or parsing fails.
  const [wishlist, setWishlist] = useState(() => {
    try {
      const localWishlist = localStorage.getItem('wishlist');
      // If localWishlist exists, parse it; otherwise, return an empty array.
      return localWishlist ? JSON.parse(localWishlist) : [];
    } catch (error) {
      // Log any parsing errors and return an empty array to prevent 'undefined.length' errors.
      console.error("Failed to parse wishlist from localStorage:", error);
      return []; // **THIS IS CRUCIAL FOR PREVENTING 'undefined.length'**
    }
  });

  // Effect to save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]); // Dependency array: this effect runs when 'wishlist' state changes

  // Function to add an item to the wishlist
  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      // Check if the item already exists in the wishlist by its _id to avoid duplicates
      if (!prevWishlist.some((wishlistItem) => wishlistItem._id === item._id)) {
        // Add the item with a new 'wishlistDate' property (current ISO string date)
        return [...prevWishlist, { ...item, wishlistDate: new Date().toISOString() }];
      }
      return prevWishlist; // If item already exists, return previous state unchanged
    });
  };

  // Function to remove an item from the wishlist by its _id
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
  };

  // Function to clear all items from the wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Function to get the current count of items in the wishlist
  const getWishlistItemCount = () => {
    return wishlist.length;
  };

  // The value object that will be provided to all consumers of this context
  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    getWishlistItemCount,
  };

  // Render the provider with the value and its children
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
