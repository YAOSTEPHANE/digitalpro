"use client";

import { useState, useEffect, useCallback } from "react";
import { Cloud, CloudRain, Sun, CloudSnow, Clock } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

const ABIDJAN_DEFAULT_WEATHER: WeatherData = {
  temperature: 28,
  condition: "Ensoleillé · Abidjan",
  icon: "sun",
};

const TimeWeather = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherData>(ABIDJAN_DEFAULT_WEATHER);

  const fetchWeather = useCallback(async () => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
      if (!API_KEY || !navigator.geolocation) {
        setWeather(ABIDJAN_DEFAULT_WEATHER);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
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
            }
          } catch {
            setWeather(ABIDJAN_DEFAULT_WEATHER);
          }
        },
        () => {
          setWeather(ABIDJAN_DEFAULT_WEATHER);
        }
      );
    } catch {
      setWeather(ABIDJAN_DEFAULT_WEATHER);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

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
    if (lowerCondition.includes("pluie") || lowerCondition.includes("rain")) {
      return <CloudRain className="w-4 h-4 text-[var(--brand-blue)]" />;
    }
    if (lowerCondition.includes("neige") || lowerCondition.includes("snow")) {
      return <CloudSnow className="w-4 h-4 text-sky-500" />;
    }
    if (lowerCondition.includes("nuage") || lowerCondition.includes("cloud")) {
      return <Cloud className="w-4 h-4 text-slate-500" />;
    }
    return <Sun className="w-4 h-4 text-amber-500" />;
  };

  const { hours, minutes, seconds } = time
    ? formatTime(time)
    : { hours: "--", minutes: "--", seconds: "--" };

  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] font-medium text-emerald-800">
          Disponible · Réponse &lt; 24h
        </span>
      </div>

      {isMounted ? (
        <div className="flex items-center gap-1.5 text-slate-600">
          {getWeatherIcon(weather.condition)}
          <span className="font-semibold text-slate-900 tabular-nums">
            {weather.temperature}°C
          </span>
          <span className="hidden 2xl:inline capitalize">{weather.condition}</span>
        </div>
      ) : null}

      <div className="flex items-center gap-1.5 font-mono tabular-nums">
        <Clock className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
        <span suppressHydrationWarning className="text-sm font-semibold text-slate-900">
          {hours}:{minutes}
        </span>
        <span suppressHydrationWarning className="text-xs font-semibold text-[var(--brand-red)]">
          :{seconds}
        </span>
      </div>
    </div>
  );
};

export default TimeWeather;
