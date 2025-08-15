import React from 'react';
import Applause from '../components/Applause';

function ApplauseTest() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h1 className="text-3xl font-bold mb-4">Test Blog Post</h1>
            <p className="text-gray-600 mb-4">
              This is a test blog post to demonstrate the applause functionality.
            </p>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Show your appreciation</h3>
              <Applause slug="test-post" />
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">How it works</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Click the applause button to show appreciation for the post</li>
              <li>Your applause state is saved in localStorage to prevent duplicate votes</li>
              <li>Click again to remove your applause</li>
              <li>The count persists in PostgreSQL database (when configured)</li>
              <li>Each post has its own unique applause count</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplauseTest;