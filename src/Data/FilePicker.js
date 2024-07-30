import React, { useState } from "react";

const FilePicker = ({ setBackgroundUrl }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1048576) { // Check if file size is under 1MB
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;

        // Log the size of the data URL in KB
        const dataUrlSizeInKB = (dataUrl.length * (3 / 4)) / 1024;
        console.log(`Data URL size: ${dataUrlSizeInKB.toFixed(2)} KB`);

        // Store the data URL in local storage
        localStorage.setItem("backgroundDataUrl", dataUrl);

        // Update the background URL state
        setBackgroundUrl(dataUrl);
        setPreviewUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be under 1MB.");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-8 h-8"
      style={{
        width: 'w-32',
        height: 'h-32',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: previewUrl ? `url(${previewUrl})` : 'none',
        border: '1px solid gray',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
    </div>
  );
};

export default FilePicker;
