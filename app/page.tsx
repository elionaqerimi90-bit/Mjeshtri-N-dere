"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type MjeshtriProfile = {
  id: string;
  category: string;
  basePrice: number;
  description: string | null;
  rating: number;
  avatarUrl: string | null;
  user: { name: string };
};

type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: string;
} | null;

const categories = [
  { value: "ELEKTRICIST", label: "Elektricist", icon: "⚡" },
  { value: "HIDRAULIK", label: "Hidraulik", icon: "🔧" },
  { value: "FRIZER", label: "Frizer", icon: "✂️" },
  { value: "BOJAXHI", label: "Bojaxhi", icon: "🎨" },
  { value: "ZDRUKTHETAR", label: "Zdrukthëtar", icon: "🪚" },
  { value: "MEKANIK", label: "Mekanik", icon: "🚗" },
  { value: "PASTRIM", label: "Pastrim", icon: "🧹" },
  { value: "KOPSHTAR", label: "Kopshtar", icon: "🌱" },
  { value: "KLIMATIZIM", label: "Klimatizim", icon: "❄️" },
  { value: "NDERTIMTAR", label: "Ndërtimtar", icon: "🧱" },
  { value: "KUZHINIER", label: "Kuzhinier", icon: "👨‍🍳" },
  { value: "FOTOGRAF", label: "Fotograf", icon: "📷" },
  { value: "CELESA", label: "Çelësa", icon: "🔑" },
  { value: "TRANSPORT", label: "Transport", icon: "🚚" },
  { value: "IT", label: "IT", icon: "💻" },
  { value: "MOBILERI", label: "Mobileri", icon: "🛋️" },
  { value: "BABYSITTING", label: "Babysitting", icon: "🍼" },
  { value: "TUTOR", label: "Tutor", icon: "📚" },
];

const categoryStyle: Record<string, string> = {
  ELEKTRICIST: "bg-amber-50 text-amber-700",
  HIDRAULIK: "bg-sky-50 text-sky-700",
  FRIZER: "bg-pink-50 text-pink-700",
  BOJAXHI: "bg-violet-50 text-violet-700",
  ZDRUKTHETAR: "bg-orange-50 text-orange-700",
  MEKANIK: "bg-slate-100 text-slate-700",
  PASTRIM: "bg-cyan-50 text-cyan-700",
  KOPSHTAR: "bg-green-50 text-green-700",
  KLIMATIZIM: "bg-blue-50 text-blue-700",
  NDERTIMTAR: "bg-stone-100 text-stone-700",
  KUZHINIER: "bg-red-50 text-red-700",
  FOTOGRAF: "bg-indigo-50 text-indigo-700",
  CELESA: "bg-yellow-50 text-yellow-700",
  TRANSPORT: "bg-teal-50 text-teal-700",
  IT: "bg-purple-50 text-purple-700",
  MOBILERI: "bg-amber-50 text-amber-800",
  BABYSITTING: "bg-rose-50 text-rose-700",
  TUTOR: "bg-emerald-50 text-emerald-700",
};

export default function HomePage() {
  const [profiles, setProfiles] = useState<MjeshtriProfile[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `/api/mjeshtri?category=${selectedCategory}`
      : "/api/mjeshtri";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data.profiles || []);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-extrabold text-[#0F6B5C] tracking-tight">
          Mjeshtri n&apos;derë
        </h1>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <span className="text-sm text-slate-600">
              Tungjatjeta, <span className="font-semibold">{currentUser.name}</span>
            </span>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Kyçu
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold bg-[#0F6B5C] text-white px-4 py-2 rounded-full hover:bg-[#0c5548] transition"
              >
                Regjistrohu
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Çka të duhet sot?
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 mb-6 -mx-6 px-6 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("")}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition ${
                selectedCategory === ""
                  ? "bg-[#0F6B5C] shadow-md"
                  : "bg-white border border-slate-200"
              }`}
            >
              ✨
            </div>
            <span
              className={`text-xs font-semibold ${
                selectedCategory === "" ? "text-[#0F6B5C]" : "text-slate-600"
              }`}
            >
              Krejt
            </span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition ${
                  selectedCategory === cat.value
                    ? "bg-[#0F6B5C] shadow-md"
                    : "bg-white border border-slate-200"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`text-xs font-semibold text-center max-w-[70px] ${
                  selectedCategory === cat.value ? "text-[#0F6B5C]" : "text-slate-600"
                }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-40 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-slate-500 font-medium">S&apos;ka mjeshtër në këtë kategori ende.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-5 border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 ring-2 ring-white shadow">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-lg">
                        {profile.user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{profile.user.name}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        categoryStyle[profile.category] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {profile.category}
                    </span>
                  </div>
                </div>
                {profile.description && (
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {profile.description}
                  </p>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    ⭐ {profile.rating.toFixed(1)}
                  </span>
                  <span className="font-extrabold text-[#E8703A] text-lg">
                    €{profile.basePrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}