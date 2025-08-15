import React from 'react';
import ApplauseMock from '../components/ApplauseMock';

function ApplauseDemo() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h1 className="text-3xl font-bold mb-4">Applause Feature Demo</h1>
            <p className="text-gray-600 mb-4">
              This demonstrates the fully working applause functionality with mock data.
            </p>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Show your appreciation</h3>
              <ApplauseMock slug="demo-post" />
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Another Test Post</h2>
            <p className="text-gray-600 mb-4">
              Each post has its own unique applause count. Try applauding this one too!
            </p>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Show your appreciation</h3>
              <ApplauseMock slug="another-demo-post" />
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Features Demonstrated</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>✅ Click the applause button to show appreciation</li>
              <li>✅ Your applause state is saved in localStorage</li>
              <li>✅ Click again to remove your applause</li>
              <li>✅ Each post has its own unique applause count</li>
              <li>✅ Real-time UI updates with visual feedback</li>
              <li>✅ Button changes color when you have applauded</li>
              <li>✅ Count persists across page reloads (try refreshing!)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplauseDemo;