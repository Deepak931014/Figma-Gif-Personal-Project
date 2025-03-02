import React from "react";

const Categories = () => {
  const categories = [
    { name: "Festival", image: "https://c.files.bbci.co.uk/2E51/production/_128875811_holiepa.jpg" },
    { name: "Poster", image: "https://img.etimg.com/photo/msid-114307476,imgsize-1414380/pushpa2.jpg" },
    { name: "Stickers", image: "https://i.etsystatic.com/25356186/r/il/0ec725/2627371111/il_570xN.2627371111_3rq8.jpg" },
    { name: "Clip & Meme", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMv7fKSxEnPq2Q6Sr7g60RVHm2oLgHwnOlWQ&s" },
  ];

  return (
    <div className="text-center my-10 px-4 sm:px-6 lg:px-12">
      <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        CREATIVE CATEGORIES
      </h2>


      <p className="text-gray-500">MAKE IT & USE IT</p>
      <div className="flex flex-wrap justify-center gap-10 mt-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gray-300 shadow-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
