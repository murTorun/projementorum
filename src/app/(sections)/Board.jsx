"use client";
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import PersonCardDisplay from "./PersonCardDisplay";
import { QueryClient, QueryClientProvider } from "react-query";

const educationLevels = [
  "İlkokul/Ortaokul",
  "Lise",
  "Üniversite",
  "Girişimcilik",
];
const provinces = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkâri",
  "Hatay",
  "Isparta",
  "Mersin",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
].sort((a, b) => a.localeCompare(b));

const Board = () => {
  const queryClient = new QueryClient();
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchType, setSearchType] = useState("Mentor");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchQuery(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleEducationChange = (level) => {
    setSelectedEducation((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto mt-4 sm:mt-8 ">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body mt-4 p-2 sm:p-4 sm:py-5">
          <h2 className="card-title justify-center text-xl sm:text-2xl mb-4">
            Aradıkların Burada!
          </h2>

          {/* Search Bar */}
          <div className="form-control">
            <div className="input-group flex sm:flex-row sm:gap-2">
              <input
                type="text"
                placeholder="Eğitim Teknolojileri, Biyoteknoloji, Robotik Kodlama..."
                className="input input-bordered w-full"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button className="btn btn-square mt-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8 sm:mt-12 flex flex-col gap-4 sm:flex-row sm:justify-around sm:gap-3">
            {/* Mentor or Ekip Arkadaşı Filter */}
            <div className="sm:mb-0 sm:w-fit-content">
              <h3 className="text-lg font-semibold mb-2">Arama Türü</h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  className={`btn btn-sm ${
                    searchType === "Mentor" ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => handleSearchTypeChange("Mentor")}
                >
                  Mentor ara
                </button>
                <button
                  className={`btn btn-sm ${
                    searchType === "Ekip Arkadaşı"
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                  onClick={() => handleSearchTypeChange("Ekip Arkadaşı")}
                >
                  Ekip Arkadaşı ara
                </button>
              </div>
            </div>

            {/* Education Level Filters */}
            <div className="sm:mb-0 sm:w-fit-content">
              <h3 className="text-lg font-semibold mb-2">Eğitim Seviyesi</h3>
              <div className="flex flex-wrap gap-2">
                {educationLevels.map((level) => (
                  <button
                    key={level}
                    className={`btn btn-sm ${
                      selectedEducation.includes(level)
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                    onClick={() => handleEducationChange(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="sm:w-fit-content">
              <h3 className="text-lg font-semibold mb-2">Konum</h3>
              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">Tüm Konumlar</option>
                <option value="Outside of Turkey">Yurt Dışı</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Placeholder for future content */}
          <div className="h-px w-full bg-black my-8 sm:my-12"></div>

          <QueryClientProvider client={queryClient}>
            <PersonCardDisplay
              searchQuery={debouncedSearchQuery}
              searchType={searchType}
              selectedEducation={selectedEducation}
              selectedLocation={selectedLocation}
            />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
};

export default Board;
