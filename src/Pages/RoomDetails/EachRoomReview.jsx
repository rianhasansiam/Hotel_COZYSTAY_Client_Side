import React from 'react';

const EachRoomReview = ({ rev }) => {

    // Ensure rev.timestamp is converted to a Date object
    const time = new Date(rev.timestamp);

    const date = `${String(time.getDate()).padStart(2, '0')}/${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getFullYear()).slice(0)}`;

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg p-6 mx-auto my-4">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-full"
          src={rev.image}
          alt={rev.name}
        />
        <div>
          <h2 className="text-lg font-semibold">{rev.name}</h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{rev.comment}</p>
      <div className="mt-4 flex items-center">
        {[...Array(rev.rating)].map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.26 3.887a1 1 0 00.95.69h4.1c.969 0 1.371 1.24.588 1.81l-3.32 2.407a1 1 0 00-.364 1.118l1.26 3.887c.3.921-.755 1.688-1.54 1.118l-3.32-2.407a1 1 0 00-1.176 0l-3.32 2.407c-.784.57-1.84-.197-1.54-1.118l1.26-3.887a1 1 0 00-.364-1.118L2.6 9.314c-.784-.57-.38-1.81.588-1.81h4.1a1 1 0 00.95-.69l1.26-3.887z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default EachRoomReview;
