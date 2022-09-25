import useDecorationLocations from "@/components/use-decoration-locations";
import { useState } from "react";
import { InputSelect } from "@/components/input";

export default function ChooseDecoration({ onChange }) {
  const { locations = [] } = useDecorationLocations({
    companyCode: "PCNA",
    productId: "1601-91",
  });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDecoration, setSelectedDecoration] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedDecoration(""); // Reset decoration when location changes
    onChange?.();
  };

  const handleMethodChange = (event) => {
    setSelectedDecoration(event.target.value);
    onChange?.();
  };

  const getDeocationsForLocation = (locationId) => {
    const location = locations.find(
      (location) => location.locationId == locationId
    );
    console.log(location);
    return location?.DecorationArray || [];
  };

  return (
    <div className="space-y-6">
      <div>
        <InputSelect
          className="w-full"
          id="decoration-location"
          onChange={handleLocationChange}
          label="Decoration Location"
          value={selectedLocation}
        >
          <option value="">Select a location</option>
          {locations
            .sort((a, b) => a.locationRank - b.locationRank)
            .map((location) => (
              <option key={location.locationId} value={location.locationId}>
                {location.locationName}
              </option>
            ))}
        </InputSelect>
      </div>
      <div>
        <InputSelect
          className="w-full"
          id="decoration-method"
          name="decoration-method"
          disabled={!selectedLocation}
          label="Decoration Method"
          value={selectedDecoration}
          onChange={handleMethodChange}
        >
          {selectedLocation ? (
            <option value="">Select a decoration</option>
          ) : (
            <option value="">Select a location first</option>
          )}

          {getDeocationsForLocation(selectedLocation)?.map((decoration) => (
            <option key={decoration.decorationId}>
              {decoration.decorationName}
            </option>
          ))}
        </InputSelect>
      </div>
    </div>
  );
}
