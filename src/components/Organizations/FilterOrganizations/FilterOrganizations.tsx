import { useState } from "react";
import { Organization } from "../../Interfaces";
import styles from "./FilterOrganizations.module.css";

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
    <div className={styles.filterContainer}>
      <label htmlFor="cityFilter" className={styles.filterLabel}>
        Filter by City:
      </label>
      <select
        id="cityFilter"
        className={styles.filterSelect}
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
      <label htmlFor="nameFilter" className={styles.filterLabel}>
        Filter by Name:
      </label>
      <select
        id="nameFilter"
        className={styles.filterSelect}
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
      <label htmlFor="addressFilter" className={styles.filterLabel}>
        Filter by Address:
      </label>
      <select
        id="addressFilter"
        className={styles.filterSelect}
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
