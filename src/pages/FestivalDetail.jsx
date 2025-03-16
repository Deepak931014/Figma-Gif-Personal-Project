import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayCircle from "@mui/icons-material/PlayCircle";
import PauseCircle from "@mui/icons-material/PauseCircle";
import StopCircle from "@mui/icons-material/StopCircle";
import * as fabric from "fabric";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const tools = [
    { name: "Import", icon: "📂" },
    { name: "Cursor", icon: "🖱" },
    { name: "Hold", icon: "✋" },
    { name: "Edit Text", icon: "✏️" },
    { name: "Animation", icon: "🎭" },
    { name: "Add Sound", icon: "🎵" },
];


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

const textAnimations = [
    { name: "Fade In & Out", key: "fade" },
    { name: "Slide Left to Right", key: "slide" },
    { name: "Bounce Effect", key: "bounce" },
    { name: "Rotate", key: "rotate" },
    { name: "Zoom In & Out", key: "scale" },
];

const FestivalDetail = () => {
    const { id } = useParams();
    const selectedImage = imageData.find((image) => image.id === parseInt(id));
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const audioInputRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [activeText, setActiveText] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const totalFrames = 10; // Number of frames in the timeline
    const [openAnimationModal, setOpenAnimationModal] = useState(false);

    // Initialize Fabric.js Canvas
    useEffect(() => {
        if (!canvasRef.current || !selectedImage) return;

        if (canvas) {
            canvas.dispose();
        }

        const newCanvas = new fabric.Canvas(canvasRef.current, {
            width: 600,
            height: 600,
            backgroundColor: "#fff",
        });

        setCanvas(newCanvas);

        const imgElement = new Image();
        imgElement.crossOrigin = "anonymous";
        imgElement.src = selectedImage.src;

        imgElement.onload = () => {
            const fabricImage = new fabric.Image(imgElement, {
                left: 50,
                top: 50,
                selectable: true,
            });
            fabricImage.scaleToWidth(300);
            fabricImage.scaleToHeight(200);
            newCanvas.add(fabricImage);
            newCanvas.renderAll();
        };

        // Handle text selection
        newCanvas.on("selection:created", (event) => {
            if (event.selected[0]?.type === "i-text") {
                setActiveText(event.selected[0]);
            }
        });

        newCanvas.on("selection:updated", (event) => {
            if (event.selected[0]?.type === "i-text") {
                setActiveText(event.selected[0]);
            }
        });

        return () => newCanvas.dispose();
    }, [selectedImage]);

    // Handle Image Upload
    const handleImageUpload = (event) => {
        if (!canvas) return;
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = new Image();
            imgElement.src = e.target.result;
            imgElement.crossOrigin = "anonymous";
            imgElement.onload = () => {
                const imgInstance = new fabric.Image(imgElement, {
                    left: 50,
                    top: 50,
                    selectable: true,
                });

                imgInstance.scaleToWidth(300);
                imgInstance.scaleToHeight(200);
                canvas.add(imgInstance);
                canvas.renderAll();
            };
        };
        reader.readAsDataURL(file);
    };



    const handleToolClick = (toolName) => {
        if (!canvas) return;

        switch (toolName) {
            case "Cursor":
                canvas.isDrawingMode = false;
                canvas.selection = true;
                canvas.forEachObject((obj) => (obj.selectable = true));
                break;

            case "Hold":
                canvas.isDrawingMode = false;
                canvas.selection = false;
                canvas.forEachObject((obj) => (obj.selectable = false));
                break;

            case "Edit Text":
                const text = new fabric.IText("Enter Text", {
                    left: 100,
                    top: 100,
                    fontSize: 20,
                    fill: "black",
                    fontFamily: "Arial",
                    fontWeight: "normal",
                    underline: false,
                    fontStyle: "normal",
                });
                canvas.add(text);
                canvas.setActiveObject(text);
                setActiveText(text); // Ensure active text is set
                canvas.renderAll();
                break;

            case "Animation":
                if (activeText) {
                    setOpenAnimationModal(true); // Open animation modal only if text is selected
                } else {
                    alert("Please select a text object first.");
                }
                break;

            case "Add Sound":
                if (audioInputRef.current) {
                    audioInputRef.current.click();
                }
                break;

            case "Import":
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }
                break;

            default:
                break;
        }
    };

    const handleAnimationSelect = (animation) => {
        if (!activeText || !canvas) return;

        switch (animation.key) {
            case "fade":
                activeText.set({ opacity: 0 });
                canvas.renderAll();
                fabric.util.animate({
                    startValue: 0,
                    endValue: 1,
                    duration: 1000,
                    onChange: (value) => {
                        activeText.set({ opacity: value });
                        canvas.renderAll();
                    },
                });
                break;

            case "slide":
                const startLeft = activeText.left;
                activeText.set({ left: startLeft - 100 });
                fabric.util.animate({
                    startValue: startLeft - 100,
                    endValue: startLeft,
                    duration: 1000,
                    onChange: (value) => {
                        activeText.set({ left: value });
                        canvas.renderAll();
                    },
                });
                break;

            case "bounce":
                fabric.util.animate({
                    startValue: 1,
                    endValue: 1.3,
                    duration: 500,
                    onChange: (value) => {
                        activeText.scale(value);
                        canvas.renderAll();
                    },
                    onComplete: () => {
                        fabric.util.animate({
                            startValue: 1.3,
                            endValue: 1,
                            duration: 500,
                            onChange: (value) => {
                                activeText.scale(value);
                                canvas.renderAll();
                            },
                        });
                    },
                });
                break;

            case "rotate":
                fabric.util.animate({
                    startValue: 0,
                    endValue: 360,
                    duration: 1000,
                    onChange: (value) => {
                        activeText.set({ angle: value });
                        canvas.renderAll();
                    },
                });
                break;

            case "scale":
                fabric.util.animate({
                    startValue: 1,
                    endValue: 1.5,
                    duration: 1000,
                    onChange: (value) => {
                        activeText.scale(value);
                        canvas.renderAll();
                    },
                    onComplete: () => {
                        fabric.util.animate({
                            startValue: 1.5,
                            endValue: 1,
                            duration: 1000,
                            onChange: (value) => {
                                activeText.scale(value);
                                canvas.renderAll();
                            },
                        });
                    },
                });
                break;

            default:
                break;
        }
    };



    // Handle audio upload
    const handleAudioUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const audioURL = URL.createObjectURL(file);
            setAudio(new Audio(audioURL));
        }
    };

    // Play/Pause Audio
    const playAudio = () => {
        if (audio) {
            isPlaying ? audio.pause() : audio.play();
            setIsPlaying(!isPlaying);
        }
    };

    // Stop Audio
    const stopAudio = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const updateTextStyle = (style, value) => {
        if (!canvas || !activeText) return;
    
        if (style === "textDecoration") {
            activeText.set("underline", value === "underline");
        } else {
            activeText.set(style, value);
        }
    
        activeText.setCoords(); // Ensures correct positioning
        canvas.renderAll(); // Re-renders canvas
    };
    
    


    return (
        <div className="flex flex-col mx-auto items-center justify-center bg-gray-200 min-h-screen -mt-6 relative">
            <div className="flex items-stretch justify-center w-full gap-4">
                {/* Left Tools */}
                <div className="flex flex-col -mr-4 gap-3 p-2 bg-white shadow-md rounded">
                    {tools.map((tool) => (
                        <button
                            key={tool.name}
                            onClick={() => handleToolClick(tool.name)}
                            className="flex flex-col items-center p-2 gap-1"
                        >
                            <div className="p-2 bg-gray-300 rounded-md">{tool.icon}</div>
                            <span className="text-sm">{tool.name}</span>
                        </button>
                    ))}
                </div>

                {/* Canvas Area */}
                <canvas ref={canvasRef} className="border shadow-lg mx-4 flex-grow"></canvas>

                {/* Right Tools */}
                <div className="flex flex-col gap-3 ml-4 p-2 bg-white shadow-md rounded ">
                    {tools.map((tool) => (
                        <button
                            key={tool.name}
                            onClick={() => handleToolClick(tool.name)}
                            className="flex flex-col items-center p-2 gap-1"
                        >
                            <div className="p-2 bg-gray-300 rounded-md">{tool.icon}</div>
                            <span className="text-sm">{tool.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sticky Text Formatting Panel */}
            {activeText && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-3 shadow-lg flex gap-2 rounded">
                    {/* Bold Button */}
                    <button
                        onClick={() => updateTextStyle("fontWeight", activeText.fontWeight === "bold" ? "normal" : "bold")}
                        className="p-2 bg-gray-300 font-bold"
                    >
                        B
                    </button>

                    {/* Italic Button */}
                    <button
                        onClick={() => updateTextStyle("fontStyle", activeText.fontStyle === "italic" ? "normal" : "italic")}
                        className="p-2 bg-gray-300 italic"
                    >
                        I
                    </button>

                    {/* Underline Button */}
                    <button
                        onClick={() => updateTextStyle("textDecoration", activeText.textDecoration === "underline" ? "none" : "underline")}
                        className="p-2 bg-gray-300 underline"
                    >
                        U
                    </button>

                    {/* Font Size Selector */}
                    <select
                        defaultValue={activeText.fontSize}
                        onChange={(e) => updateTextStyle("fontSize", parseInt(e.target.value))}
                        className="p-2 bg-gray-300"
                    >
                        {[10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 52, 56, 60, 64, 70, 80, 96, 100, 120, 150, 200, 240].map((size) => (
                            <option key={size} value={size}>
                                {size}px
                            </option>
                        ))}
                    </select>

                    {/* Font Family Selector */}
                    <select
                        defaultValue={activeText.fontFamily}
                        onChange={(e) => updateTextStyle("fontFamily", e.target.value)}
                        className="p-2 bg-gray-300"
                    >
                        {["Arial", "Roboto", "Sans-serif", "Algerian", "Courier New", "Georgia", "Times New Roman",
                            "Verdana", "Tahoma", "Trebuchet MS", "Comic Sans MS", "Impact", "Garamond",
                            "Lucida Console", "Palatino Linotype", "Monospace"].map((font) => (
                                <option key={font} value={font}>
                                    {font}
                                </option>
                            ))}
                    </select>

                    {/* Color Picker */}
                    <input
                        type="color"
                        defaultValue={activeText.fill}
                        onChange={(e) => updateTextStyle("fill", e.target.value)}
                        className="w-10 h-10 border-none cursor-pointer p-0 rounded-full"
                    />
                </div>
            )}


            {/* Animation Modal */}
            <Dialog open={openAnimationModal} onClose={() => setOpenAnimationModal(false)}>
                <DialogTitle>Select Animation</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-2">
                        {textAnimations.map((animation) => (
                            <button
                                key={animation.key}
                                onClick={() => handleAnimationSelect(animation)}
                                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                            >
                                {animation.name}
                            </button>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAnimationModal(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
            />
            {/* Timeline & Frame Panel */}
            <div className="w-full max-w-3xl bg-white shadow-lg p-4 mt-4 rounded">
                <div className="flex justify-between text-gray-700">
                    <span>0 sec</span>
                    <span>5 sec</span>
                </div>

                {/* Frames */}
                <div className="flex items-center justify-between mt-2 bg-gray-100 p-2 rounded">
                    {Array.from({ length: totalFrames }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-12 h-12 border ${index === currentFrame ? "border-blue-500 bg-blue-200" : "border-gray-300"
                                } rounded flex items-center justify-center`}
                            onClick={() => setCurrentFrame(index)}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>

                {/* Add Sound Option */}
                <div className="mt-3">
                    <button
                        onClick={() => audioInputRef.current.click()}
                        className="text-blue-500 flex items-center"
                    >
                        Add Sound 🎵
                    </button>
                    <input
                        type="file"
                        ref={audioInputRef}
                        className="hidden"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                    />
                </div>
            </div>

            {/* Playback Controls */}
            <div className="flex gap-4 mt-4">
                <button onClick={playAudio} className="text-green-600">
                    {isPlaying ? <PauseCircle fontSize="large" /> : <PlayCircle fontSize="large" />}
                </button>
                <button onClick={stopAudio} className="text-red-600">
                    <StopCircle fontSize="large" />
                </button>
            </div>


        </div>

    );
};

export default FestivalDetail;
