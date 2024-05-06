import React, { useState } from "react";
import { Organization } from "../Interfaces";

interface Props {
  organizations: Organization[];
  applyFilters: (
    cityFilter: string,
    nameFilter: string,
    addressFilter: string
  ) => void;
}

const FilterOrganizations: React.FC<Props> = ({
  organizations,
  applyFilters,
}) => {
  const [cityFilter, setCityFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [addressFilter, setAddressFilter] = useState<string>("");

  const filteredCities = organizations
    ? Array.from(new Set(organizations.map((org) => org.city))).filter(
        (city) => city.trim() !== ""
      )
    : [];

  const filteredNames = organizations
    ? Array.from(new Set(organizations.map((org) => org.name))).filter(
        (name) => name.trim() !== ""
      )
    : [];

  const filteredAddresses = organizations
    ? Array.from(new Set(organizations.map((org) => org.address))).filter(
        (address) => address.trim() !== ""
      )
    : [];

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setCityFilter(selectedCity);
    applyFilters(selectedCity, nameFilter, addressFilter);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setNameFilter(selectedName);
    applyFilters(cityFilter, selectedName, addressFilter);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddress = e.target.value;
    setAddressFilter(selectedAddress);
    applyFilters(cityFilter, nameFilter, selectedAddress);
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
        onChange={handleChangeCity}
      >
        <option value="">All Cities</option>
        {filteredCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <label htmlFor="nameFilter" className="form-label">
        Filter by Name:
      </label>
      <select
        id="nameFilter"
        className="form-select"
        value={nameFilter}
        onChange={handleChangeName}
      >
        <option value="">All Names</option>
        {filteredNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <label htmlFor="addressFilter" className="form-label">
        Filter by Address:
      </label>
      <select
        id="addressFilter"
        className="form-select"
        value={addressFilter}
        onChange={handleChangeAddress}
      >
        <option value="">All Addresses</option>
        {filteredAddresses.map((address) => (
          <option key={address} value={address}>
            {address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOrganizations;
