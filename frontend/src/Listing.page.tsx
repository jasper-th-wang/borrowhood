import { useState } from 'react';

export function ListingPage() {

  const [imageData, setImageData] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setImageData(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // using FormData to send the file in multipart/form-data format.
    const formData = new FormData();
    if (imageData) {
      formData.append("image", imageData);
      formData.set("image_data", imageData);
    }

    const res = await fetch("http://localhost:8000/image/annotate", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      res.json().then((data) => console.log(data));
    } else {
      console.log("error");
    }
    //   console.log(formData.get("imageData"));
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/jpg" onChange={handleChange} />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Upload
        </button>
      </form>
    </>
  );
}

