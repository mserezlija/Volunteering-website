import { useState } from "react";
import { Volunteer } from "../Interfaces";

interface Props {
  volunteers: Volunteer[];
  applyFilters: (cityFilter: string, jobTypeFilter: string) => void;
}

const FilterVolunteers: React.FC<Props> = ({ volunteers, applyFilters }) => {
  const [cityFilter, setCityFilter] = useState("");

  const uniqueCities = Array.from(new Set(volunteers.map((v) => v.city))); // Get unique city names
  const filteredCities = uniqueCities.filter((city) => city.trim() !== ""); // Filter out empty strings

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
    applyFilters(e.target.value, "");
  };

  return (
    <div className="mb-3">
      <label htmlFor="cityFilter" className="form-label">
        Filter by City:
      </label>
      <select
        id="cityFilter"
        className="form-select"
        value={cityFilter}
        onChange={handleChange}
      >
        <option value="">All Cities</option>
        {filteredCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterVolunteers;
