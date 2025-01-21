"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleBackToLogin = async () => {
    router.back();
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Bitte alle Felder ausfüllen");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Bitte gebe eine gültige E-Mail-Adresse ein");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein");
      return;
    }

    console.log("Eingegebene Daten:", { firstName, lastName, email, password });

    try {
      const response = await fetch("http://127.0.0.1:1337/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrierung erfolgreich!");
        router.back();
      } else {
        alert(data.message || "Registrierung fehlgeschlagen.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <div className="flex justify-center items-center p-5 w-full bg-blue-400 rounded-lg">
          <Image
            className=""
            src="/globe-icon.png"
            alt="Logo"
            width={80}
            height={80}
          />
          <h1 className="text-white text-center font-semibold text-2xl pl-2">
            Fernweh
          </h1>
        </div>
        <h2 className="text-lg text-center text-gray-700 mb-4 mt-5">
          Willkommen, registrieren Sie sich, um fortzufahren.
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Vorname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Nachname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Passwort bestätigen"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full mt-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
        >
          Registrieren
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Sie haben bereits ein Konto?{" "}
            <a
              onClick={handleBackToLogin}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Anmelden
            </a>
            <a href=""></a>
          </p>
        </div>
      </div>
    </div>
  );
}
