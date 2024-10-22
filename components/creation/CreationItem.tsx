import { CreationItemProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";

// Định nghĩa kiểu cho quốc gia
interface Country {
  country: string;
  nationality: string;
}

interface ItemProps {
  creation: CreationItemProps;
}

const CreationItem = ({ creation }: ItemProps) => {
  const { title, key } = creation;
  const [countries, setCountries] = useState<Country[]>([]); // Định nghĩa kiểu cho countries
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [date, setDate] = React.useState<Date | undefined>();
  const [selectedNationality, setSelectedNationality] = useState("");

  // Gọi API để lấy danh sách quốc gia và quốc tịch
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map(
          (country: {
            name: { common: string };
            demonyms: { eng?: { m: string } };
          }) => ({
            country: country.name.common,
            nationality: country.demonyms?.eng?.m || country.name.common // Nếu không có quốc tịch, lấy tên quốc gia
          })
        );
        setCountries(countryList);
      })
      .catch((error) =>
        console.error("Error fetching countries and nationalities:", error)
      );
  }, []);

  // Giả sử bạn có API để lấy thành phố từ quốc gia
  const fetchCities = (country: string) => {
    fetch(`/api/cities?country=${country}`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  // Giả sử bạn có API để lấy quận từ thành phố
  const fetchDistricts = (city: string) => {
    fetch(`/api/districts?city=${city}`)
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedCity("");
    setSelectedDistrict("");
    fetchCities(value); // Gọi API để lấy thành phố
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setSelectedDistrict("");
    fetchDistricts(value);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-fit">
      <div className="flex flex-row w-fit gap-1">
        <p className="text-dark100_light900 paragraph-light">{title}</p>
        <p className="text-accent-red paragraph-regular">*</p>
      </div>

      {key === "country" ? (
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.country} value={country.country}>
                {country.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : key === "city" ? (
        <Select value={selectedCity} onValueChange={handleCityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : key === "district" ? (
        <Select
          value={selectedDistrict}
          onValueChange={(value) => setSelectedDistrict(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : key === "nation" ? (
        <Select
          value={selectedNationality}
          onValueChange={(value) => setSelectedNationality(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Nationality" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((item) => (
              <SelectItem key={item.nationality} value={item.nationality}>
                {item.nationality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : key === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "w-full p-0 justify-start text-left h-[24px] md:h-[40px] ",
                !date &&
                  "text-dark100_light900 paragraph-regular bg-transparent hover:bg-transparent shadow-none"
              )}
            >
              <div className="flex w-full rounded-md  h-[24px] md:h-[36px] px-2 items-center justify-between border border-light-500 bg-transparent">
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-dark100_light900 paragraph-regular">
                    Pick a date
                  </span>
                )}
                <CalendarIcon className="mr-2 h-4 w-4 text-dark100_light900 paragraph-regular" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-auto flex-col p-2 mr-2 border-none background-light900_dark200 text-dark100_light900 paragraph-regular">
            <Select
              onValueChange={(value) =>
                setDate(addDays(new Date(), parseInt(value)))
              }
            ></Select>
            <div className="rounded-md border text-dark100_light900 paragraph-regular">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Input className="h-[24px] md:h-[36px] dark:bg-transparent focus:outline-none ring-0 border-light-500" />
      )}
    </div>
  );
};

export default CreationItem;
