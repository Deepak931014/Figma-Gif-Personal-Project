// src/pages/FestivalPage.js
import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/home/HeroSection";

const imageData = [
  { id: 1, name: "Sunset View", src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/e0/ce/85/sunset-beach.jpg?w=900&h=500&s=1" },
  { id: 2, name: "Mountain Peak", src: "https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2019/06/13091225/iStock-157644719.jpg" },
  { id: 3, name: "Forest Path", src: "https://media.istockphoto.com/id/152538687/photo/morning-light.jpg?s=612x612&w=0&k=20&c=W-sIciYQnwZXpTxuwp7Lj-2VIwLCRepiys6HYfbvzQ0=" },
  { id: 4, name: "City Lights", src: "https://plus.unsplash.com/premium_photo-1661908853318-893732a14e42?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l0eSUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 5, name: "Beach Waves", src: "https://images.pexels.com/photos/355328/pexels-photo-355328.jpeg?cs=srgb&dl=pexels-pixabay-355328.jpg&fm=jpg" },
  { id: 6, name: "Snowy Trees", src: "https://media.istockphoto.com/id/544740444/photo/alpine-spruce-forest-in-a-sunny-meadow.jpg?s=612x612&w=0&k=20&c=jfk9oD6nQ4Y5e7A5gU31bzewn3KmQaI9Fvjtkawv2_4=" },
  { id: 7, name: "Desert Dunes", src: "https://images.theconversation.com/files/585053/original/file-20240328-20-b9wltj.jpg?ixlib=rb-4.1.0&rect=11%2C0%2C7337%2C3668&q=45&auto=format&w=1356&h=668&fit=crop" },
  { id: 8, name: "River Flow", src: "https://www.shutterstock.com/image-photo/river-stream-waterfall-forest-landscape-600nw-1585363855.jpg" },
  { id: 9, name: "Autumn Leaves", src: "https://www.elitetreecare.com/wp-content/uploads/2019/10/autum-leaves.jpg" },
  { id: 10, name: "Starry Night", src: "https://images.pexels.com/photos/1175136/pexels-photo-1175136.jpeg?cs=srgb&dl=pexels-blitzboy-1175136.jpg&fm=jpg" },
  { id: 11, name: "Green Fields", src: "https://images.unsplash.com/photo-1584673961397-be26e009333f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 12, name: "Lake Reflection", src: "https://images.squarespace-cdn.com/content/v1/5893534986e6c00851e56dbb/1586968790997-JSYX8A9NP750GGCRK6RA/Emerald+Lake+2+minutes+Kristen+Ryan+Photography-001.jpg" },
];

const FestivalPage = ({ searchTerm })  => {
  // Ensure safe handling of search term (avoid undefined errors)
  const filteredImages = imageData.filter((image) =>
    image.name.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );


  return (
    <div className="min-h-screen py-2">
      <Hero />
      <div className="w-1/2 mx-auto h-40 bg-gray-200 my-12 flex items-center justify-center text-gray-600">
        728x90 Google AD
      </div>
       <div className="min-h-screen py-2">
      <div className="text-center my-10 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
          {imageData.map((image) => (
            <Link key={image.id} to={`/festival/${image.id}`}>
              <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition relative">
                <img src={image.src} alt={image.name} className="w-full h-full object-cover rounded-lg" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default FestivalPage;
