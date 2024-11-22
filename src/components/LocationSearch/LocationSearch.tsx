import { useState } from 'react';

export default function LocationSearch({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (location: {
    name: string;
    coordinates: { latitude: number; longitude: number };
  }) => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }

    const response = await fetch(
      `https://api.entur.io/geocoder/v1/autocomplete?text=${encodeURIComponent(
        text
      )}&lang=no`,
      {
        headers: {
          'ET-Client-Name':
            process.env.NEXT_PUBLIC_ET_CLIENT_NAME || 'default-client-name',
        },
      }
    );
    const data = await response.json();
    setResults(data.features || []);
  };

  const handleSelect = (location: any) => {
    const selected = {
      name: location.properties.label,
      coordinates: {
        latitude: location.geometry.coordinates[1],
        longitude: location.geometry.coordinates[0],
      },
    };
    setQuery(location.properties.label);
    setResults([]);
    onSelect(selected);
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        <label className="w-6">{label}</label>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={`Skriv inn ${label.toLowerCase()}`}
          className="p-2 text-black rounded m-2 shadow-md"
        />
      </div>
      <div>
        {isFocused && results.length > 0 && (
          <ul className="p-2 shadow-md">
            {results.map((result) => (
              <li
                key={result.properties.id}
                className="hover:bg-green-100 hover:cursor-pointer py-1"
                onClick={() => handleSelect(result)}
              >
                {result.properties.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
