import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaHeart, FaDownload } from "react-icons/fa";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";
import Hero from "../components/home/HeroSection";
import Ad from "../components/home/AdSection";
import Gallery from "../components/home/Gallery";

// Importing image data
const imageData = [
  { id: 1, name: "Sunset View", src: "https://indonesia.travel/content/dam/indtravelrevamp/en/trip-ideas/6-best-sunset-spot-s-you-can-enjoy-in-labuan-bajo/image6.jpg" },
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

const Details = () => {
  const { id } = useParams();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [liked, setLiked] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);


  useEffect(() => {
    const selectedImage = imageData.find((img) => img.id === parseInt(id));
    if (selectedImage) setMainImage(selectedImage.src);
  }, [id]);

  // Function to copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleLike = () => {
    setLiked(!liked);
    setShowFloatingHeart(true);

    // Hide floating heart after animation
    setTimeout(() => {
      setShowFloatingHeart(false);
    }, 600); // Adjust duration as needed
  };

  // Function to download the image
  const handleDownload = () => {
    if (!mainImage) return; // Prevent errors if no image is selected

    fetch(mainImage)
      .then(response => response.blob()) // Convert image to blob
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `downloaded-image.${blob.type.split("/")[1]}`; // Keep the original file format
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error("Error downloading the image:", error));
  };


  const socialMediaLinks = [
    { icon: <FaWhatsapp />, link: `https://wa.me/?text=Check%20this%20out!%20${window.location.href}`, name: "WhatsApp" },
    { icon: <FaFacebook />, link: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, name: "Facebook" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/", name: "Instagram" },
    { icon: <FaLinkedin />, link: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`, name: "LinkedIn" },
    { icon: <FaTwitter />, link: `https://twitter.com/intent/tweet?url=${window.location.href}`, name: "Twitter" },
    { icon: <FaTelegram />, link: `https://t.me/share/url?url=${window.location.href}`, name: "Telegram" },
  ];

  return (
    <>
      <Hero />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {/* Main Image Display */}
        <div className="w-96 h-80 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center text-xl font-bold">
          <img src={mainImage} alt="Main" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mt-6 relative">
          {/* Floating Heart Animation */}
          {showFloatingHeart && (
            <motion.div
              className="absolute bottom-10 text-red-500"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -100, scale: 1.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <FaHeart className="w-8 h-8" />
            </motion.div>
          )}

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex flex-col items-center ${liked ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
          >
            <motion.div
              className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow-md"
              animate={{ scale: liked ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <FaHeart />
            </motion.div>
            <span className="mt-2 text-sm">{liked ? "Liked" : "Like"}</span>
          </button>


          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow-md">
              <FaLink />
            </div>
            <span className="mt-2 text-sm">Copy Link</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="flex flex-col items-center text-gray-700 hover:text-gray-900"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow-md">
              <FaShareAlt />
            </div>
            <span className="mt-2 text-sm">Share</span>
          </button>

          {/* Social Media Share Icons */}
          {showShareOptions && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md flex gap-3">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-500 text-2xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="mt-6 bg-red-400 text-white py-1 px-6 rounded-2xl shadow-md hover:bg-red-700 flex items-center gap-2"
        >
          <FaDownload /> Download
        </button>

        <Ad />

        {/* Gallery Component */}
        <Gallery />
      </div>
    </>
  );
};

export default Details;
