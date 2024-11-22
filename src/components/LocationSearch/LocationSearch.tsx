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

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 3) return;

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
    <div className="flex gap-3 items-center">
      <label className="w-6">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={`Skriv inn ${label.toLowerCase()}`}
        className="p-2 text-black rounded m-2"
      />
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.properties.id} onClick={() => handleSelect(result)}>
              {result.properties.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
