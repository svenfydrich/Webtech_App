"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface CityVisit {
  cityName: string;
  daysSpent: number;
}

interface Guide {
  name: string;
  languages: string[];
  phone: string;
  email: string;
}

interface Travel {
  id: number;
  country: string;
  duration: number;
  cities: CityVisit[];
  tourGuide: Guide;
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
});

export default function Travels() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [formData, setFormData] = useState<Travel>({
    id: 0,
    country: "",
    duration: 0,
    cities: [{ cityName: "", daysSpent: 0 }],
    tourGuide: { name: "", languages: [], phone: "", email: "" },
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      const response = await axiosInstance.get("/travels");
      setTravels(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Reisen:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await axiosInstance.put(`/travels/${formData.id}`, formData);
      } else {
        await axiosInstance.post("/travels", formData);
      }

      setFormData({
        id: 0,
        country: "",
        duration: 0,
        cities: [{ cityName: "", daysSpent: 0 }],
        tourGuide: { name: "", languages: [], phone: "", email: "" },
      });
      setIsEditMode(false);
      fetchTravels();
    } catch (error) {
      console.error("Fehler beim Speichern der Reise:", error);
    }
  };

  const handleEdit = (travel: Travel) => {
    setFormData(travel);
    setIsEditMode(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/travels/${id}`);
      fetchTravels();
    } catch (error) {
      console.error("Fehler beim Löschen der Reise:", error);
    }
  };

  const addCity = () => {
    setFormData({
      ...formData,
      cities: [...formData.cities, { cityName: "", daysSpent: 0 }],
    });
  };

  const removeCity = (index: number) => {
    setFormData({
      ...formData,
      cities: formData.cities.filter((_, i) => i !== index),
    });
  };

  const updateCity = (index: number, field: string, value: string | number) => {
    const updatedCities = [...formData.cities];
    updatedCities[index] = { ...updatedCities[index], [field]: value };
    setFormData({ ...formData, cities: updatedCities });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-4">
        <Link href="/" legacyBehavior>
          <a className="text-blue-500 hover:underline"> ← Zurück zu Fernweh</a>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Reiseverwaltung
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Land:</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dauer (Tage):</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: Number(e.target.value) })
            }
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Städte:</label>
          {formData.cities.map((city, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <input
                type="text"
                value={city.cityName}
                onChange={(e) => updateCity(index, "cityName", e.target.value)}
                placeholder="Stadtname"
                className="w-1/2 p-2 border rounded text-gray-800"
                required
              />
              <input
                type="number"
                value={city.daysSpent}
                onChange={(e) =>
                  updateCity(index, "daysSpent", Number(e.target.value))
                }
                placeholder="Tage"
                className="w-1/4 p-2 border rounded text-gray-800"
                required
              />
              <button
                type="button"
                onClick={() => removeCity(index)}
                className="px-3 py-1 rounded"
              >
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={addCity} className="py-2 px-1">
            ➕
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Reiseführer:</label>
          <input
            type="text"
            value={formData.tourGuide.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                tourGuide: { ...formData.tourGuide, name: e.target.value },
              })
            }
            placeholder="Name"
            className="w-full p-2 border rounded mb-2 text-gray-800"
            required
          />
          <input
            type="text"
            value={formData.tourGuide.languages.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tourGuide: {
                  ...formData.tourGuide,
                  languages: e.target.value.split(",").map((l) => l.trim()),
                },
              })
            }
            placeholder="Sprachen (getrennt durch Komma)"
            className="w-full p-2 border rounded mb-2 text-gray-800"
          />
          <input
            type="text"
            value={formData.tourGuide.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                tourGuide: { ...formData.tourGuide, phone: e.target.value },
              })
            }
            placeholder="Telefon"
            className="w-full p-2 border rounded mb-2 text-gray-800"
            required
          />
          <input
            type="email"
            value={formData.tourGuide.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                tourGuide: { ...formData.tourGuide, email: e.target.value },
              })
            }
            placeholder="E-Mail"
            className="w-full p-2 border rounded text-gray-800"
            required
          />
        </div>

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            isEditMode
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEditMode ? "Änderungen speichern" : "Erstellen"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse bg-gray-50 shadow">
        <thead>
          <tr>
            <th className="border p-2 text-gray-800 bg-gray-200">ID</th>
            <th className="border p-2 text-gray-800 bg-gray-200">Land</th>
            <th className="border p-2 text-gray-800 bg-gray-200">Dauer</th>
            <th className="border p-2 text-gray-800 bg-gray-200">Städte</th>
            <th className="border p-2 text-gray-800 bg-gray-200">
              Reiseführer
            </th>
            <th className="border p-2 text-gray-800 bg-gray-200">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {travels.map((travel) => (
            <tr key={travel.id} className="hover:bg-gray-100">
              <td className="border p-2 text-center text-gray-800">
                {travel.id}
              </td>
              <td className="border p-2 text-center text-gray-800">
                {travel.country}
              </td>
              <td className="border p-2 text-center text-gray-800">
                {travel.duration} Tage
              </td>
              <td className="border p-2 text-center text-gray-800">
                {travel.cities.map((city, index) => (
                  <div key={index}>
                    {city.cityName} ({city.daysSpent} Tage)
                  </div>
                ))}
              </td>
              <td className="border p-2 text-center text-gray-800">
                {travel.tourGuide.name} -{" "}
                {travel.tourGuide.languages.join(", ")}
                <br />
                {travel.tourGuide.phone} / {travel.tourGuide.email}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(travel)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(travel.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
