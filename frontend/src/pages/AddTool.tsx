import React, { useState } from "react";
import { Plus } from "lucide-react";
import api from "../api"; // ✅ your Axios instance

const AddTool: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    priceType: "DAY" as "DAY" | "WEEK" | "MONTH",
    location: "",
    condition: "EXCELLENT" as "EXCELLENT" | "GOOD" | "FAIR",
    availability: true,
    images: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(e.target.files)) {
        const formDataData = new FormData();
        formDataData.append("file", file);

        const token = localStorage.getItem("accessToken"); // ✅ attach JWT
        const response = await api.post<string>("/tools/upload-image", formDataData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        uploadedUrls.push(response.data as string);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // ✅ attach JWT
      if (!token) {
        alert("You must be logged in to add a tool.");
        return;
      }

      await api.post("/tools", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData({
        name: "",
        category: "",
        description: "",
        price: 0,
        priceType: "DAY",
        location: "",
        condition: "EXCELLENT",
        availability: true,
        images: [],
      });
      alert("Tool added successfully!");
    } catch (err: any) {
      console.error("Add tool error:", err.response?.data || err.message);
      alert("Failed to add tool. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Plus className="h-6 w-6 text-green-600 mr-2" />
          Add New Tool
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tool Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tool Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Price + Price Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Type</label>
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="day">Per Day</option>
                <option value="week">Per Week</option>
                <option value="month">Per Month</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          {/* Availability */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, availability: e.target.checked }))
              }
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="ml-2 block text-sm text-gray-700">Available</label>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Add Tool
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTool;
