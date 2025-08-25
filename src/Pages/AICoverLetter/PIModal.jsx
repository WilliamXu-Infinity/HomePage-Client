import React, { useState, useEffect } from "react";

const PIModal = ({ isOpen, onClose, onSave, initialValue = {}}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    website: ""
  });

  // Prefill form if initialValue exists
  useEffect(() => {
    if (isOpen) {
      setFormData(initialValue);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded w-96 max-h-[calc(100vh-48px)] overflow-auto shadow-lg">
        <h2 className="text-lg font-bold bg-white sticky top-0 px-4 py-3 border text-orange-500 shadow-sm">
          Personal Info
        </h2>
        <div className="px-4 py-3">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData?.phone || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block mb-2">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={formData?.linkedin || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block mb-2">Personal Website</label>
            <input
              type="url"
              name="website"
              value={formData?.website || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block mb-2">GitHub</label>
            <input
              type="url"
              name="github"
              value={formData?.github || ""}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
            />

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PIModal;
