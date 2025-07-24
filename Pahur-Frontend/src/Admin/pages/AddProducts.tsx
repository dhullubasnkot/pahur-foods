import { useState } from "react";
import axios from "axios";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    Ingredients: "",
    weight: "",
    price: "",
    category: "",
    subcategory: "",
    mainImage: null as File | null,
    gallery: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, mainImage: e.target.files![0] }));
    }
  };

  const handleGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        gallery: Array.from(e.target.files!),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.subcategory) {
      alert("Category and Subcategory are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("Ingredients", formData.Ingredients);
    data.append("price", formData.price);
    data.append("weight", formData.weight);

    if (formData.mainImage) {
      data.append("mainImage", formData.mainImage);
    }

    formData.gallery.forEach((file) => {
      data.append("gallery", file);
    });

    try {
      const res = await axios.post(
        `http://localhost:4000/api/products?category=${formData.category}&subcategory=${formData.subcategory}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Uploaded:", res.data);
      alert("Product added successfully!");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-orange-700">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="weight"
          placeholder="Weight (e.g., 380g)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="Ingredients"
          placeholder="Ingredients"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="category"
          placeholder="Category (e.g., Pickles)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="subcategory"
          placeholder="Subcategory (e.g., Piro)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div>
          <label>Main Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImage}
            className="block mt-1"
          />
        </div>

        <div>
          <label>Gallery Images (max 5):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleGallery}
            className="block mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}
