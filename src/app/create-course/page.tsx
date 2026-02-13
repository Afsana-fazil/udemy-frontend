"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface MainCategory {
  id: number;
  name: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export default function CreateCoursePage() {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [selectedMain, setSelectedMain] = useState<MainCategory | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [createdBy, setCreatedBy] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${API_BASE}/main-categories/`)
      .then((res) => res.json())
      .then((data) => {
        setMainCategories(data);
        if (data.length > 0) {
          setSelectedMain(data[0]);
          if (data[0].subcategories.length > 0) {
            setSelectedSub(data[0].subcategories[0]);
          }
        }
      })
      .catch(() => setError("Failed to load categories"));
  }, []);

  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const main = mainCategories.find((cat) => cat.id === Number(e.target.value));
    setSelectedMain(main || null);
    if (main && main.subcategories.length > 0) {
      setSelectedSub(main.subcategories[0]);
    } else {
      setSelectedSub(null);
    }
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedMain) return;
    const sub = selectedMain.subcategories.find((sub) => sub.id === Number(e.target.value));
    setSelectedSub(sub || null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideo(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!selectedMain || !selectedSub || !title.trim() || !description.trim() || !price || !image || !createdBy.trim()) {
      setError("All fields are required, including an image and created by.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("sub_category", String(selectedSub.id));
      formData.append("image", image);
      formData.append("created_by", createdBy);
      if (video) formData.append("video", video);

      const res = await fetch(`${API_BASE}/courses/`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        let message = text;
        try {
          const data = JSON.parse(text);
          message = data.message || data.detail || JSON.stringify(data);
        } catch {
          // Not JSON, keep as text
        }
        setError(message || "Failed to create course");
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      setVideo(null);
      setCreatedBy("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-xl border border-gray-200">
        <h1 className="text-3xl font-serif font-bold text-[#2a2b3f] mb-8 text-center">Create a New Course</h1>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Course created successfully!</div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-2">Main Category</label>
            <select
              className="w-full bg-white border border-solid border-gray-300 rounded text-sm px-4 py-2"
              value={selectedMain?.id || ""}
              onChange={handleMainChange}
              required
            >
              {mainCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Sub Category</label>
            <select
              className="w-full bg-white border border-solid border-gray-300 rounded text-sm px-4 py-2"
              value={selectedSub?.id || ""}
              onChange={handleSubChange}
              required
              disabled={!selectedMain || selectedMain.subcategories.length === 0}
            >
              {selectedMain?.subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              className="w-full border border-solid border-gray-300 rounded text-sm placeholder:text-[#2b2d3f] px-4 py-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Course title"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              className="w-full border border-solid border-gray-300 rounded text-sm placeholder:text-[#2b2d3f] px-4 py-2 min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Course description"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Price</label>
            <input
              className="w-full border border-solid border-gray-300 rounded text-sm placeholder:text-[#2b2d3f] px-4 py-2"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="e.g. 19.99"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded text-sm bg-white"
              required
            />
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Course preview"
                  className="h-40 w-auto rounded shadow object-contain"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Created By</label>
            <input
              className="w-full border border-solid border-gray-300 rounded text-sm placeholder:text-[#2b2d3f] px-4 py-2"
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
              placeholder="Instructor name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Course Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full rounded bg-white text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#6d28d2] text-white font-bold py-2 rounded text-sm hover:bg-purple-700 transition-colors mt-2"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
