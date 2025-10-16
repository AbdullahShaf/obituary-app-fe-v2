"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

/**
 * Example component demonstrating how to use the new session refresh mechanisms
 * This component shows three different ways to update user data and refresh the session:
 * 1. Manual session refresh after any operation
 * 2. Automatic session refresh with user data update
 * 3. Automatic session refresh with slug change
 */
const UserSessionRefreshExample = () => {
  const { 
    user, 
    refreshUserSession, 
    updateUserAndRefreshSession, 
    changeSlugAndRefreshSession 
  } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newSlug, setNewSlug] = useState("");

  // Example 1: Manual session refresh
  const handleManualRefresh = async () => {
    setIsLoading(true);
    try {
      const result = await refreshUserSession();
      if (result.success) {
        toast.success("Posodobljeno");
      } else {
        toast.error("Failed to refresh session");
      }
    } catch (error) {
      toast.error("Error refreshing session");
    } finally {
      setIsLoading(false);
    }
  };

  // Example 2: Update user city with automatic session refresh
  const handleCityUpdate = async () => {
    if (!newCity.trim()) {
      toast.error("Vnesi občino");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUserAndRefreshSession({ city: newCity });
      if (result.success) {
        toast.success("City updated and session refreshed!");
        setNewCity("");
      } else {
        toast.error("Napaka pri vnosu občine");
      }
    } catch (error) {
      toast.error("Prišlo je do napake. Občina ni bila posodobljena.");
    } finally {
      setIsLoading(false);
    }
  };

  // Example 3: Change slug with automatic session refresh
  const handleSlugChange = async () => {
    if (!newSlug.trim()) {
      toast.error("Please enter a new slug");
      return;
    }

    setIsLoading(true);
    try {
      const result = await changeSlugAndRefreshSession(newSlug);
      if (result.success) {
        toast.success("Posodobljeno");
        setNewSlug("");
      } else {
        toast.error("Failed to change slug");
      }
    } catch (error) {
      toast.error("Error changing slug");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        User Session Refresh Examples
      </h2>
      
      {/* Current User Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current User Info:</h3>
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>City:</strong> {user?.city || "N/A"}</p>
        <p><strong>Slug:</strong> {user?.slugKey || "N/A"}</p>
        <p><strong>Role:</strong> {user?.role || "N/A"}</p>
      </div>

      {/* Example 1: Manual Refresh */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">1. Manual Session Refresh</h3>
        <p className="text-gray-600 mb-3">
          Use this when you need to refresh user data after external changes.
        </p>
        <button
          onClick={handleManualRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Refreshing..." : "Refresh Session"}
        </button>
      </div>

      {/* Example 2: Update City */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">2. Update City with Auto Refresh</h3>
        <p className="text-gray-600 mb-3">
          Updates user city and automatically refreshes the session.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Enter new city"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCityUpdate}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update City"}
          </button>
        </div>
      </div>

      {/* Example 3: Change Slug */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">3. Change Slug with Auto Refresh</h3>
        <p className="text-gray-600 mb-3">
          Changes user slug and automatically refreshes the session.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="Enter new slug"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSlugChange}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading ? "Changing..." : "Change Slug"}
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Usage Instructions:</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-1">
          <li><strong>refreshUserSession():</strong> Manually fetch fresh user data and update session</li>
          <li><strong>updateUserAndRefreshSession(userData):</strong> Update user data and auto-refresh session</li>
          <li><strong>changeSlugAndRefreshSession(newSlug):</strong> Change slug and auto-refresh session</li>
        </ul>
      </div>
    </div>
  );
};

export default UserSessionRefreshExample;