import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Flag from "react-world-flags";

export const ManagementForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [countryCode, setCountryCode] = useState("+880");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-4  gap-4">
      {/* Company name* */}
      <div>
        <label className="block text-sm font-medium text-gray-a700 mb-2">
          Company name*
        </label>
        <Input placeholder="Runyan trade center" />
      </div>

      {/* Company Identifier (EIN/TIN)* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Identifier (EIN/TIN)*
        </label>
        <Input placeholder="Name" />
      </div>

      {/*  Your job title* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your job title*
        </label>
        <Input placeholder="Manager" />
      </div>

      {/* Agreement with landlord/owner* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Agreement with landlord/owner*
        </label>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />

        <Button
          className="w-full h-[32px] text-gray-600"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 14L3.73384 14.6626C4.644 17.2413 5.09907 18.5307 6.13742 19.2654C7.17576 20 8.54309 20 11.2777 20H13.7222C16.4569 20 17.8242 20 18.8625 19.2654C19.9009 18.5307 20.356 17.2413 21.2661 14.6626L21.5 14"
              stroke="#272B35"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M12.5 4V14M12.5 4C11.7997 4 10.4915 5.9943 10 6.5M12.5 4C13.2002 4 14.5084 5.9943 15 6.5"
              stroke="#272B35"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          (PDF only)
          {fileName && (
            <p className="ml-1 text-sm text-gray-600 truncate">{fileName}</p>
          )}
        </Button>
      </div>

      {/* Country/Region* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country/Region*
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bangladesh">Bangladesh</SelectItem>
            <SelectItem value="Palestine">Palestine</SelectItem>
            <SelectItem value="Iran">Iran</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/*  Street address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street address*
        </label>
        <Input placeholder="111 Austin Ave" />
      </div>

      {/* Apt, suit, unit  */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Apt, suit, unit (if applicable)
        </label>
        <Input placeholder="3050" />
      </div>

      {/* Phone number* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Leasing manager Phone number*
        </label>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full bg-white h-8">
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
            className="flex-1 px-3 text-sm h-full bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Contact email* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact email*
        </label>
        <Input placeholder="majarul2025@gmail.com" />
      </div>

      {/*  City/Town* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City/Town*
        </label>
        <Input placeholder="Dallas" />
      </div>

      {/* State/Territory* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State/Territory*
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dhaka">Dhaka</SelectItem>
            <SelectItem value="Gaza">Gaza</SelectItem>
            <SelectItem value="Tehran">Tehran</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/*  Zip code* */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zip code*
        </label>
        <Input placeholder="75061" />
      </div>
    </form>
  );
};
