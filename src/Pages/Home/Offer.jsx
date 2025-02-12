import React from 'react';

const Offer = () => {
  const offers = [
    {
      title: 'Romantic Getaway Package',
      description:
        'Enjoy a romantic escape with complimentary champagne, candlelight dinner, and spa treatments.',
      price: '$499',
      image:
        'https://i.ibb.co/wK31hq8/pexels-pixabay-164595.jpg', // Replace with actual image URL
    },
    {
      title: 'Family Fun Package',
      description:
        'A fun-filled family package with free activities for kids, family movie nights, and breakfast included.',
      price: '$349',
      image:
        'https://i.ibb.co/vVz1RwS/pexels-hakimsatoso-3634741.jpg', // Replace with actual image URL
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Special Offers & Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {offer.title}
                </h3>
                <p className="mt-2 text-gray-600">{offer.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    {offer.price}
                  </span>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;
