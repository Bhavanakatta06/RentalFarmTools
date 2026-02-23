import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTool, type Tool } from "../contexts/ToolContext";

const EditTool: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { getToolById, updateTool } = useTool();
  const navigate = useNavigate();

  const [tool, setTool] = useState<Tool | null>(null);

  const [formData, setFormData] = useState<Omit<Tool, "id" | "createdAt" | "owner" | "formattedPrice">>({
    name: "",
    category: "",
    description: "",
    price: 0,
    priceType: "day",
    location: "",
    condition: "good",
    availability: true,
    images: [],
  });

  useEffect(() => {
    const fetchTool = async () => {
      if (id) {
        const data = await getToolById(Number(id)); // ✅ await the Promise
        if (data) {
          setTool(data);
          setFormData({
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price,
            priceType: data.priceType,
            location: data.location,
            condition: data.condition,
            availability: data.availability,
            images: data.images || [],
          });
        }
      }
    };
    fetchTool();
  }, [id, getToolById]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Tool not found</p>
      </div>
    );
  }

  // 🔹 Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "priceType"
          ? (value as "day" | "week" | "month")
          : value,
    }));
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTool(Number(id), formData);
    navigate("/dashboard"); // ✅ redirect after save
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Tool</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          {/* Price + PriceType */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Type</label>
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
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
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Available</label>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTool;
