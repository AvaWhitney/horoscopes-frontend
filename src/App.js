import { useState } from "react";

function App() {
  const [sign, setSign] = useState("");
  const [vibe, setVibe] = useState("");
  const [result, setResult] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);


  const zodiacSigns = [
    { label: "♈️ Aries", value: "Aries" },
    { label: "♉️ Taurus", value: "Taurus" },
    { label: "♊️ Gemini", value: "Gemini" },
    { label: "♋️ Cancer", value: "Cancer" },
    { label: "♌️ Leo", value: "Leo" },
    { label: "♍️ Virgo", value: "Virgo" },
    { label: "♎️ Libra", value: "Libra" },
    { label: "♏️ Scorpio", value: "Scorpio" },
    { label: "♐️ Sagittarius", value: "Sagittarius" },
    { label: "♑️ Capricorn", value: "Capricorn" },
    { label: "♒️ Aquarius", value: "Aquarius" },
    { label: "♓️ Pisces", value: "Pisces" }
  ];
  

  const vibes = [
    "Villain Origin",
    "Flirty & Romantic",        
    "Elle Woods in her Lawyer Era",              
    "Main Character",     
    "Unbothered",           
    "Confused and Overwhelmed but Cute",             
    "Soft Girl Era",         
    "Menace to Society"              
  ];


  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!sign || !vibe) {
      setResult("🌙 Please select both your sign and vibe to receive your cosmic download.");
      return;
    }
  
    setResult(`Consulting the stars for your ✨ ${vibe} ${sign} ✨ forecast...`);
  
    try {
      const response = await fetch("https://horoscope-backend-zfvy.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sign, vibe })
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch horoscope");
      }
  
      const data = await response.json();
      setResult(data.horoscope);
    } catch (err) {
      setResult("Something went wrong 🌩 Try again later.");
      console.error(err);
    }
  };
  
  

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative bg-animate px-4 py-10"
      style={{
        backgroundImage: "url('/glow_1.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Hamburger Menu */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-pink-500 text-3xl p-1 rounded focus:outline-none hover:scale-110 transition-transform"
        >
          ☰
        </button>
  
        {menuOpen && (
          <div className="mt-2 shadow-xl backdrop-blur-lg text-pink-800 rounded-xl shadow-xl p-4">
            <a href="https://modemmuse.com" className="block px-3 py-1 mb-1 rounded-md hover:shadow-lg transition duration-200">Mothership</a>
            <a href="https://kitta.modemmuse.com" className="block px-3 py-1 mb-1 rounded-md hover:shadow-lg transition duration-200">Kitta</a>
            <a href="https://colorcoded.modemmuse.com" className="block px-3 py-1 mb-1 rounded-md hover:shadow-lg transition duration-200">Quizzes</a>
            <a href="https://modemmuse.com/muselabs" className="block px-3 py-1 mb-1 rounded-md hover:shadow-lg transition duration-200">Muse Labs</a>
            <a href="https://modemmuse.com/contact" className="block px-3 py-1 mb-1 rounded-md hover:shadow-lg transition duration-200">Contact</a>
          </div>
        )}
      </div>
  
      {/* Content Container */}
      <div className="w-full max-w-lg">
        <div className="shadow-xl bg-opacity-90 p-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
            Modem Muse Horoscopes: The Techno-Celestial Edition 🔮
          </h1>
  
          {/* Sign */}
          <label className="block mb-2 text-left font-medium text-gray-700">Your Sign</label>
          <select
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base font-medium text-gray-800"
            value={sign}
            onChange={(e) => setSign(e.target.value)}
          >
            <option value="">-- Select your sign --</option>
            {zodiacSigns.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
  
          {/* Vibe */}
          <label className="block mb-2 text-left font-medium text-gray-700">Your Vibe</label>
          <select
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-base font-medium text-gray-800"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          >
            <option value="">-- Select your vibe --</option>
            {vibes.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
  
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Reveal My Horoscope ✨
          </button>
  
          {/* Result */}
          {result && (
            <div
              className={`mt-6 p-4 rounded-lg shadow-inner text-sm ${
                result.startsWith("🌙")
                  ? "bg-yellow-100 text-yellow-800"
                  : "text-base font-medium bg-pink-50 text-gray-800"
              }`}
            >
              {result}
            </div>
          )}
        </div>
      </div>
  
      {/* Footer */}
      <footer className="text-center text-xs text-pink-400 mt-8">
        © {new Date().getFullYear()} Modem Muse. All rights reserved.
      </footer>
    </div>
  );
  
  
}

export default App;
