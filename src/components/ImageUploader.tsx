"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div>
          <p>👀 Prévisualisation :</p>
          <img src={preview} alt="preview" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}
