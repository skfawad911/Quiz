// Model.js
import React, { useState } from "react";

const Model = ({ isOpen, onClose, onConfirm, loading }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 mx-4 z-50">
          <h2 className="text-2xl font-semibold mb-4">Edit Mr</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Input 1
            </label>
            <input
              type="text"
              className="w-full border p-2"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Input 2
            </label>
            <input
              type="text"
              className="w-full border p-2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => onConfirm(input1, input2)}
            >
              Confirm
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
