"use client";

import { useState, useEffect, useCallback } from "react";
import { Cloud, CloudRain, Sun, CloudSnow } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const TimeWeather = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const setMockWeather = useCallback(() => {
    const conditions = [
      { condition: "Ensoleillé", icon: "sun" },
      { condition: "Nuageux", icon: "cloud" },
      { condition: "Partiellement nuageux", icon: "cloud" },
      { condition: "Pluvieux", icon: "rain" },
    ];
    const random = conditions[Math.floor(Math.random() * conditions.length)];
    setWeather({
      temperature: Math.floor(Math.random() * 15) + 20,
      condition: random.condition,
      icon: random.icon,
    });
  }, []);

  const fetchWeather = useCallback(async () => {
    try {
      // Essayer d'obtenir la position de l'utilisateur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Utiliser OpenWeatherMap API (gratuite)
            // Remplacez YOUR_API_KEY par votre clé API OpenWeatherMap
            const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
            
            if (API_KEY) {
              try {
                const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
                );
                
                if (response.ok) {
                  const data = await response.json();
                  setWeather({
                    temperature: Math.round(data.main.temp),
                    condition: data.weather[0].description,
                    icon: data.weather[0].main.toLowerCase(),
                  });
                } else {
                  // Fallback sur données simulées
                  setMockWeather();
                }
              } catch {
                setMockWeather();
              }
            } else {
              setMockWeather();
            }
            setLoading(false);
          },
          () => {
            // Erreur de géolocalisation, utiliser données simulées
            setMockWeather();
            setLoading(false);
          }
        );
      } else {
        setMockWeather();
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la météo:", error);
      setMockWeather();
      setLoading(false);
    }
  }, [setMockWeather]);

  useEffect(() => {
    // Mettre à jour l'heure chaque seconde
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Récupérer la météo (simulation - vous pouvez utiliser une vraie API)
    fetchWeather();

    return () => clearInterval(timer);
  }, [fetchWeather]);


  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("pluie") || lowerCondition.includes("pluvieux")) {
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    } else if (lowerCondition.includes("neige")) {
      return <CloudSnow className="w-6 h-6 text-blue-200" />;
    } else if (lowerCondition.includes("nuage") || lowerCondition.includes("nuageux")) {
      return <Cloud className="w-6 h-6 text-gray-400" />;
    } else {
      return <Sun className="w-6 h-6 text-yellow-400" />;
    }
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flex items-center gap-4">
      {/* Heure */}
      <div className="flex items-baseline gap-1.5">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono tabular-nums">
          {hours}:{minutes}
        </div>
        <div className="text-sm md:text-base text-cyan-400/70 font-mono tabular-nums">
          :{seconds}
        </div>
      </div>

      {/* Météo */}
      {!loading && weather && (
        <div className="flex items-center gap-2.5">
          <div>
            {getWeatherIcon(weather.condition)}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="text-base font-semibold text-orange-400">
              {weather.temperature}°C
            </div>
            <div className="text-sm text-white/70 hidden xl:inline">
              {weather.condition}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default TimeWeather;

