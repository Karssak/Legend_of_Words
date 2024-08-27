/* 

Heavenly Creator,
Source of all wisdom and innovation,
Guide my mind and hands as I code today.
Grant me clarity in logic,
And patience in debugging.

Help me to see beyond the lines of code,
To recognize the potential for good in every keystroke.
May my work serve to make the world a better place,
Simplifying life, solving problems, and connecting people.

In moments of frustration,
Grant me perseverance.
In times of success,
Fill me with humility and gratitude.

May my code be clean,
My algorithms efficient,
And my heart always open to learning and growth.

Bless the community of developers,
That we may support and inspire one another,
Working together to build solutions that reflect Your love and wisdom.

Amen.

*/

import RootLayout from "./layout.js";
import Navbar from "./navbar.js";
import "./globals.css";

export default function Home() {
  const backgroundImage = "/backgrounds/newlands.webp";

  return (
    <RootLayout backgroundImage={backgroundImage}>
      <Navbar />
      <main className="flex justify-center items-center font-macondo">
        <div className="flex space-x-8 mt-[10%]">
          <div className="relative bg-[#FFFDF6] p-6 rounded-lg shadow-lg max-w-2xl w-full flex items-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 right-0 h-8 bg-[url('/pages/home/dirt-top.webp')]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[url('/pages/home/dirt-bottom.webp')]"></div>
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-[url('/pages/home/dirt-left.webp')]"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-[url('/pages/home/dirt-right.webp')]"></div>
              </div>
            </div>

            <div className="relative flex-1 pr-1 z-10">
              <h1 className="text-5xl font-bold mb-4 text-[#5A3E23]">
                Welcome
              </h1>
              <p className="text-[#5A3E23] text-lg mb-4">
                Step into a medieval world where every decision shapes your
                destiny. Build and expand your city, manage resources, and forge
                alliances. Whether you choose to rise as a powerful warlord
                commanding vast armies or a cunning diplomat navigating
                political landscapes or a powerful merchant.
              </p>

              <p className="text-[#5A3E23] text-xl mb-4 bg-gradient-text bg-400 bg-clip-text text-transparent animate-gradient-animation">
                Your path is yours to decide.
              </p>

              <div className="flex items-center space-x-2 mt-6">
                <button className="bg-[url('/pages/home/button-background.webp')] text-xl bg-cover bg-center text-white py-2 px-6 rounded-full font-handwritten">
                  Register
                </button>

                <span className="text-brown-600 text-xl">
                  or
                </span>
                <button className="text-[#AF6C00] text-xl">
                  Login
                </button>
              </div>
            </div>

            <img
              src="/pages/home/welcome.webp"
              className="w-[40%] h-auto object-cover rounded-lg mr-[-4%] mb-[-4.5%]"
            />
          </div>

          <div className="relative bg-[#FFFDF6] p-6 rounded-lg shadow-lg max-w-xs w-full flex flex-col">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 right-0 h-8 bg-[url('/pages/home/dirt-top.webp')]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[url('/pages/home/dirt-bottom.webp')]"></div>
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-[url('/pages/home/dirt-left.webp')]"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-[url('/pages/home/dirt-right.webp')]"></div>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-2 text-[#5A3E23]">
                Update 1.4
              </h2>
              <h3 className="text-4xl text-[#5A3E23]">New Horizons</h3>
              <img
                src="/pages/home/1.4-coa.webp"
                className="w-[70%] h-auto object-cover mt-[-5.6%]"
              />
              <button className="bg-[url('/pages/home/button-background.webp')] text-xl bg-cover bg-center text-white py-2 px-6 mt-2 rounded-full font-handwritten">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
