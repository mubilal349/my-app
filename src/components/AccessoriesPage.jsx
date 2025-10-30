import React, { useEffect, useState } from "react";

const AccessoriesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {data.categories.map((category, index) => (
        <section key={category.id} className="mb-16 lg:mb-24">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block mb-2">
                <span className="text-blue-600  font-semibold text-sm uppercase tracking-wider">
                  Collection
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {category.title}
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
                {category.description}
              </p>
            </div>
          </div>

          {/* Products Grid - Perfect 3 columns on desktop */}
          <div
            className="w-full px-4 sm:px-6 lg:px-12"
            style={{ padding: "60px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-300 flex flex-col h-full"
                >
                  {/* Image Container with Smaller Fixed Aspect Ratio */}
                  <div
                    className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center
  p-6 sm:p-8 md:p-10 lg:px-16 rounded-2xl mx-auto"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-2/3 h-2/3 object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Shop Now Button */}
                    {/* Shop Now Button */}
                    <button
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2
  bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-bold py-3 px-6 rounded-full shadow-2xl border-2 border-blue-600 hover:border-white min-w-[140px] text-base
  transition-all duration-500
  opacity-100 translate-y-0
  sm:opacity-0 sm:translate-y-8 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                    >
                      Shop Now
                    </button>
                  </div>

                  {/* Product Info - Consistent Height */}
                  <div className="p-6 text-center flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mt-auto">
                      <span className="text-2xl font-extrabold text-blue-600">
                        {product.discountPrice}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Divider */}
          {index !== data.categories.length - 1 && (
            <div className="mt-20 lg:mt-28 flex justify-center">
              <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default AccessoriesPage;
