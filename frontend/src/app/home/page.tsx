import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center">
            <Image
              src="/globe-icon.png"
              alt="Fernweh Logo"
              width={50}
              height={50}
              className=""
            />
            <h1 className="text-2xl font-bold text-blue-600 ml-2">Fernweh</h1>
          </div>
          <nav className="ml-auto">
            <ul className="flex space-x-4">
              <li>
                <Link href="/travels" legacyBehavior>
                  <a className="text-blue-500 hover:text-blue-700">
                    Reiseverwaltung
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/comingsoon" legacyBehavior>
                  <a className="text-blue-500 hover:text-blue-700">
                    Mehr Funktionen
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">
            Willkommen beim Fernweh Reiseplaner!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Plane und verwalte deine nächsten Abenteuer ganz einfach mit unserem
            neuen Tool.
          </p>
          <Image
            src="/travel-image.jpg"
            alt="Reisebanner"
            width={600}
            height={400}
            className="rounded-lg shadow-lg mx-auto"
          />
        </section>

        <section className="mt-10 text-center">
          <Link href="/travels" legacyBehavior>
            <a className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Reisen verwalten
            </a>
          </Link>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Reiseplaner. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
