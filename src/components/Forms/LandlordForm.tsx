import { useRef, useState } from "react";
import { Button } from "../ui/button";

export const LandlordForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          {/*  Agreement with landlord/owner* */}
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
                <p className="ml-1 text-sm text-gray-600 truncate">
                  {fileName}
                </p>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
