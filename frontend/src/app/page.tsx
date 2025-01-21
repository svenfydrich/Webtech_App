"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterForward = async () => {
    router.push("/register");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Bitte alle Felder ausfüllen");
      return;
    }

    console.log("Eingegebene Daten:", { email, password });

    try {
      const response = await fetch("http://127.0.0.1:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login erfolgreich.");
        router.push("/home");
      } else {
        alert(data.message || "Login fehlgeschlagen.");
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
        <div className="flex justify-center items-center p-5 w-full bg-blue-400 rounded-xl">
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
        <div className="flex justify-center mb-6"></div>
        <h2 className="text-lg text-center text-gray-700 mb-4">
          Willkommen, melde dich an um fortzufahren.
        </h2>
        <div className="space-y-4">
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
        </div>
        <button
          onClick={handleLogin}
          className="w-full mt-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Sie haben noch kein Nutzerkonto?{" "}
            <a
              onClick={handleRegisterForward}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Neu registrieren
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
