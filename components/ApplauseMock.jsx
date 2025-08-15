import React, { useState, useEffect } from 'react';

function ApplauseMock({ slug }) {
  const [count, setCount] = useState(0);
  const [hasApplauded, setHasApplauded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Key for localStorage
  const localStorageKey = `applause_${slug}`;

  const fetchApplauseCount = async () => {
    try {
      const response = await fetch(`/api/applause-mock/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      } else {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch applause count');
      }
    } catch (fetchError) {
      // eslint-disable-next-line no-console
      console.error('Error fetching applause count:', fetchError);
    }
  };

  useEffect(() => {
    // Check if user has already applauded this post from localStorage
    if (typeof window !== 'undefined') {
      const userApplauded = localStorage.getItem(localStorageKey) === 'true';
      setHasApplauded(userApplauded);
    }

    // Fetch current applause count
    fetchApplauseCount();
  }, [slug]);

  const handleApplause = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const action = hasApplauded ? 'remove' : 'add';

      const response = await fetch(`/api/applause-mock/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data.count);

        const newApplaudeState = !hasApplauded;
        setHasApplauded(newApplaudeState);

        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(localStorageKey, newApplaudeState.toString());
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update applause');
      }
    } catch (updateError) {
      // eslint-disable-next-line no-console
      console.error('Error updating applause:', updateError);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        type="button"
        onClick={handleApplause}
        disabled={loading}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          hasApplauded
            ? 'bg-pink-500 text-white hover:bg-pink-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title={hasApplauded ? 'Remove applause' : 'Show applause'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${hasApplauded ? 'text-white' : 'text-gray-600'}`}
          fill={hasApplauded ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 113 0v1m0 0V11m0-5.5a1.5 1.5 0 113 0v3.5"
          />
        </svg>
        <span className="font-medium">
          {loading ? 'Loading...' : count}
        </span>
      </button>
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}

export default ApplauseMock;