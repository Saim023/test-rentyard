import Flag from "react-world-flags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

export default function PhoneInput() {
  const [countryCode, setCountryCode] = useState("+880");

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-sm bg-white h-8">
      <Select value={countryCode} onValueChange={setCountryCode}>
        <SelectTrigger className="flex items-center justify-between px-2 w-[90px] h-full text-sm bg-white border-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0">
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="+880">
            <div className="flex items-center gap-2">
              <Flag code="BD" style={{ width: 24, height: 16 }} />
            </div>
          </SelectItem>
          <SelectItem value="+970">
            <div className="flex items-center gap-2">
              <Flag code="PS" style={{ width: 24, height: 16 }} />
            </div>
          </SelectItem>
          <SelectItem value="+98">
            <div className="flex items-center gap-2">
              <Flag code="IR" style={{ width: 24, height: 16 }} />
            </div>
          </SelectItem>
          <SelectItem value="+964">
            <div className="flex items-center gap-2">
              <Flag code="IQ" style={{ width: 24, height: 16 }} />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Divider */}
      <div className="h-8 w-px bg-gray-300" />

      {/* Phone Number Input */}
      <input
        type="tel"
        placeholder={countryCode}
        className="w-full px-3 text-sm h-full bg-white focus:outline-none"
      />
    </div>
  );
}
