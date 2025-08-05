import { useState } from "react";
import { RealtorForm } from "../Forms/RealtorForm";
import { ManagementForm } from "../Forms/ManagementForm";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { LandlordForm } from "../Forms/LandlordForm";
import "./Category.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { IoWarningOutline } from "react-icons/io5";

export default function Category() {
  const navigate = useNavigate();
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Track form validity for each role
  const [landlordFormValid, setLandlordFormValid] = useState(false);
  const [realtorFormValid, setRealtorFormValid] = useState(false);
  const [managementFormValid, setManagementFormValid] = useState(false);

  const isFormValid = () => {
    if (!selectedRole) return false;
    if (selectedRole === "landlord") return landlordFormValid;
    if (selectedRole === "realtor") return realtorFormValid;
    if (selectedRole === "management") return managementFormValid;
    return false;
  };

  const handleRoleClick = (role: string) => {
    if (!selectedPropertyType) {
      toast.warning("Please select a property type first", {
        style: {
          color: "#000",
        },
        icon: <IoWarningOutline className="text-xl text-yellow-400" />,
      });
      return;
    }
    setSelectedRole(role);
  };

  const handlePropertyClick = (type: string) => {
    setSelectedPropertyType(type);
  };

  const isSelected = (type: string | null) => selectedPropertyType === type;

  const handleGetStarted = () => {
    if (!selectedPropertyType || !selectedRole) {
      toast.warning("Please select both property type and your role", {
        style: {
          color: "#000",
        },
        icon: <IoWarningOutline className="text-xl text-yellow-400" />,
      });
      return;
    }

    if (!isFormValid()) {
      toast.warning("Please fill out all required fields in the form", {
        style: {
          color: "#000",
        },
        icon: <IoWarningOutline className="text-xl text-red-600" />,
      });
      return;
    }

    if (!termsAccepted) {
      toast.warning("Please accept the terms and conditions", {
        style: {
          color: "#000",
        },
        icon: <IoWarningOutline className="text-xl text-yellow-400" />,
      });
      return;
    }

    navigate("/condominiums");
  };

  const cardBaseStyle =
    "border-2 rounded-[12px] p-4 sm:p-5 cursor-pointer transition duration-200";
  const selectedStyle = "border-blue-600 bg-blue-50";
  const unselectedStyle = "border-[#E0E0E0] hover:border-blue-400";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow mx-4 sm:mx-6 md:mx-10 lg:mx-20 pb-16 sm:pb-20">
        {/* Property type */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#393f4e] mt-6 sm:mt-10 mb-4 sm:mb-6">
            Property type
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              onClick={() => handlePropertyClick("single")}
              className={`${cardBaseStyle} ${
                isSelected("single") ? selectedStyle : unselectedStyle
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                >
                  <path
                    d="M0 8C0 3.58172 3.58172 0 8 0H48C52.4183 0 56 3.58172 56 8V48C56 52.4183 52.4183 56 48 56H8C3.58172 56 0 52.4183 0 48V8Z"
                    fill="#F9FBFF"
                  />
                  <path
                    d="M24.5 39.6667L24.5022 34.9972C24.5028 33.9115 24.503 33.3686 24.6804 32.9405C24.9174 32.3683 25.372 31.9138 25.9442 31.6772C26.3726 31.5 26.9155 31.5 28.0012 31.5C29.0872 31.5 29.6303 31.5 30.0588 31.6773C30.6312 31.9142 31.0858 32.3688 31.3227 32.9412C31.5 33.3697 31.5 33.9128 31.5 34.9988V39.6667"
                    stroke="#272B35"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M22.2699 19.5558L21.1032 20.4665C19.3338 21.8476 18.4491 22.5382 17.9745 23.5119C17.5 24.4856 17.5 25.6104 17.5 27.86V30.2998C17.5 34.7152 17.5 36.9229 18.8668 38.2947C20.2337 39.6663 22.4336 39.6663 26.8333 39.6663H29.1667C33.5664 39.6663 35.7664 39.6663 37.1331 38.2947C38.5 36.9229 38.5 34.7152 38.5 30.2998V27.86C38.5 25.6104 38.5 24.4856 38.0255 23.5119C37.5509 22.5382 36.6662 21.8476 34.8968 20.4665L33.7301 19.5558C30.9775 17.4073 29.6011 16.333 28 16.333C26.3989 16.333 25.0225 17.4073 22.2699 19.5558Z"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h1 className="text-sm sm:text-[16px] font-semibold text-[#272B35]">
                    Single House Property
                  </h1>
                  <p className="text-xs sm:text-[14px] font-medium mt-1 text-[#777980]">
                    Single unit house for single family
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handlePropertyClick("apartment")}
              className={`${cardBaseStyle} ${
                isSelected("apartment") ? selectedStyle : unselectedStyle
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                >
                  <rect
                    x="0.666748"
                    width="56"
                    height="56"
                    rx="8"
                    fill="#F9FBFF"
                  />
                  <path
                    d="M29.836 16.3359L17.0027 22.1693"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.6667 17.5V39.6667H22.8334C20.6335 39.6667 19.5336 39.6667 18.8502 38.9832C18.1667 38.2998 18.1667 37.1999 18.1667 35V22.1667"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.6667 22.1641L40.3334 27.9974"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.3308 39.6637H34.4975C36.6973 39.6637 37.7973 39.6637 38.4807 38.9803C39.1641 38.2968 39.1641 37.1969 39.1641 34.997V27.4141"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35.6667 25.6641V22.1641"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.8308 26.8359H23.9975M22.8308 31.5026H23.9975"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33.3308 30.3359H34.4975"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33.9167 39.6667V35"
                    stroke="#272B35"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h1 className="text-sm sm:text-[16px] font-semibold text-[#272B35]">
                    Apartments complex
                  </h1>
                  <p className="text-xs sm:text-[14px] font-medium mt-1 text-[#777980]">
                    Multiple unit house for families
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handlePropertyClick("condo")}
              className={`${cardBaseStyle} ${
                isSelected("condo") ? selectedStyle : unselectedStyle
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                >
                  <path
                    d="M0.333496 8C0.333496 3.58172 3.91522 0 8.3335 0H48.3335C52.7518 0 56.3335 3.58172 56.3335 8V48C56.3335 52.4183 52.7518 56 48.3335 56H8.3335C3.91522 56 0.333496 52.4183 0.333496 48V8Z"
                    fill="#F9FBFF"
                  />
                  <path
                    d="M28.3335 16.333H21.3335C18.4378 16.333 17.8335 16.9373 17.8335 19.833V39.6663H31.8335V19.833C31.8335 16.9373 31.2292 16.333 28.3335 16.333Z"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35.3335 23.333H31.8335V39.6663H38.8335V26.833C38.8335 23.9373 38.2292 23.333 35.3335 23.333Z"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23.6694 21H26.0028M23.6694 24.5H26.0028M23.6694 28H26.0028"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.7528 39.667V35.0003C27.7528 33.9004 27.7528 33.3504 27.4111 33.0087C27.0693 32.667 26.5194 32.667 25.4194 32.667H24.2528C23.1528 32.667 22.6029 32.667 22.2611 33.0087C21.9194 33.3504 21.9194 33.9004 21.9194 35.0003V39.667"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h1 className="text-sm sm:text-[16px] font-semibold text-[#272B35]">
                    Condominiums
                  </h1>
                  <p className="text-xs sm:text-[14px] font-medium mt-1 text-[#777980]">
                    Multiple unit house for families
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Select your role */}
        <div className="mt-6 sm:mt-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#393f4e] mb-4 sm:mb-6">
            Select your role
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              onClick={() => {
                handleRoleClick("landlord");
              }}
              className={`${cardBaseStyle} ${
                selectedRole === "landlord"
                  ? selectedStyle
                  : !selectedPropertyType
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                >
                  <path
                    d="M0 8C0 3.58172 3.58172 0 8 0H48C52.4183 0 56 3.58172 56 8V48C56 52.4183 52.4183 56 48 56H8C3.58172 56 0 52.4183 0 48V8Z"
                    fill="#F9FBFF"
                  />
                  <path
                    d="M29.7544 29.7503C31.6495 30.5626 32.5972 30.9687 33.5526 30.8413C33.6604 30.8268 33.7675 30.8074 33.8736 30.7831C34.813 30.5673 35.5579 29.8546 37.0478 28.4292L37.2227 28.2619C38.3524 27.1322 38.9173 26.5673 39.0545 25.4143C39.1917 24.2613 38.8972 23.7795 38.3083 22.816C37.7852 21.9599 37.0546 20.9839 36.0377 19.967C35.0209 18.9502 34.0448 18.2196 33.1887 17.6964C32.2252 17.1075 31.7435 16.8131 30.5904 16.9503C29.4374 17.0874 28.8725 17.6523 27.7428 18.7821L27.5755 18.9568C26.1502 20.4468 25.4375 21.1918 25.2217 22.1313C25.1974 22.2372 25.1781 22.3442 25.1637 22.4519C25.0362 23.4074 25.4424 24.3551 26.2546 26.2503"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.2552 26.249L16.9219 35.5832V39.0832H20.4219V36.7498H22.7552V34.4165H25.0885L29.7552 29.7498"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33.8307 22.167L32.6641 23.3337"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h1 className="text-sm sm:text-[16px] font-semibold text-[#272B35]">
                    Landlord
                  </h1>
                  <p className="text-xs sm:text-[14px] font-medium mt-1 text-[#777980]">
                    Owner of the property
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleRoleClick("realtor")}
              className={`${cardBaseStyle} ${
                selectedRole === "realtor"
                  ? selectedStyle
                  : !selectedPropertyType
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                >
                  <path
                    d="M0.666748 8C0.666748 3.58172 4.24847 0 8.66675 0H48.6667C53.085 0 56.6667 3.58172 56.6667 8V48C56.6667 52.4183 53.085 56 48.6667 56H8.66675C4.24847 56 0.666748 52.4183 0.666748 48V8Z"
                    fill="#F9FBFF"
                  />
                  <path
                    d="M37.9975 39.667V33.8337C37.9975 31.6338 37.9975 30.5339 37.314 29.8504C36.6306 29.167 35.5307 29.167 33.3308 29.167L28.6641 39.667L23.9975 29.167C21.7976 29.167 20.6976 29.167 20.0142 29.8504C19.3308 30.5339 19.3308 31.6338 19.3308 33.8337V39.667"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.6694 31.5003L28.086 36.167L28.6694 37.917L29.2527 36.167L28.6694 31.5003ZM28.6694 31.5003L27.5027 29.167H29.836L28.6694 31.5003Z"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.7475 21.584V20.4173C32.7475 18.1622 30.9193 16.334 28.6641 16.334C26.409 16.334 24.5808 18.1622 24.5808 20.4173V21.584C24.5808 23.8392 26.409 25.6673 28.6641 25.6673C30.9193 25.6673 32.7475 23.8392 32.7475 21.584Z"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h1 className="text-sm sm:text-[16px] font-semibold text-[#272B35]">
                    Realtor
                  </h1>
                  <p className="text-xs sm:text-[14px] font-medium mt-1 text-[#777980]">
                    Manage property on behalf on owner
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleRoleClick("management")}
              className={`${cardBaseStyle} ${
                selectedRole === "management"
                  ? selectedStyle
                  : !selectedPropertyType
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                >
                  <path
                    d="M0.333496 8C0.333496 3.58172 3.91522 0 8.3335 0H48.3335C52.7518 0 56.3335 3.58172 56.3335 8V48C56.3335 52.4183 52.7518 56 48.3335 56H8.3335C3.91522 56 0.333496 52.4183 0.333496 48V8Z"
                    fill="#F9FBFF"
                  />
                  <path
                    d="M22.5002 24.5H21.3335M27.1668 24.5H26.0002M22.5002 21H21.3335M27.1668 21H26.0002"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35.9142 31.4997H34.7476M35.9142 26.833H34.7476"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30.6668 23.333V38.4997H40.0002V25.6663C40.0002 24.3776 38.9555 23.333 37.6668 23.333H30.6668ZM30.6668 23.333V18.6663C30.6668 17.3777 29.6222 16.333 28.3335 16.333H20.1668C18.8782 16.333 17.8335 17.3777 17.8335 18.6663V25.6663"
                    stroke="#272B35"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.0028 39.6667V40.5417C26.486 40.5417 26.8778 40.1499 26.8778 39.6667H26.0028ZM16.6694 39.6667H15.7944C15.7944 40.1499 16.1862 40.5417 16.6694 40.5417V39.6667ZM22.7944 30.3333C22.7944 31.1388 22.1415 31.7917 21.3361 31.7917V33.5417C23.108 33.5417 24.5444 32.1053 24.5444 30.3333H22.7944ZM21.3361 31.7917C20.5307 31.7917 19.8778 31.1388 19.8778 30.3333H18.1278C18.1278 32.1053 19.5642 33.5417 21.3361 33.5417V31.7917ZM19.8778 30.3333C19.8778 29.5279 20.5307 28.875 21.3361 28.875V27.125C19.5642 27.125 18.1278 28.5614 18.1278 30.3333H19.8778ZM21.3361 28.875C22.1415 28.875 22.7944 29.5279 22.7944 30.3333H24.5444C24.5444 28.5614 23.108 27.125 21.3361 27.125V28.875ZM26.0028 38.7917H16.6694V40.5417H26.0028V38.7917ZM17.5444 39.6667C17.5444 37.5726 19.242 35.875 21.3361 35.875V34.125C18.2755 34.125 15.7944 36.606 15.7944 39.6667H17.5444ZM21.3361 35.875C23.4302 35.875 25.1278 37.5726 25.1278 39.6667H26.8778C26.8778 36.606 24.3967 34.125 21.3361 34.125V35.875Z"
                    fill="#272B35"
                  />
                </svg>
                <div>
                  <h1 className="text-sm sm:text-[16px] font-semibold text-[#272B35]">
                    Property management company
                  </h1>
                  <p className="text-xs sm:text-[14px] font-medium mt-1 text-[#777980]">
                    For management company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic form */}
        <div>
          {selectedPropertyType && selectedRole && (
            <div>
              <div className="mt-6 sm:mt-8 border rounded-xl overflow-hidden">
                <div className="bg-[#F4F4F4] px-4 py-3.5">
                  <h2 className="text-base sm:text-lg font-medium text-[#6F6C6A] m-0">
                    {selectedRole === "landlord"
                      ? "Proof of ownership"
                      : selectedRole === "realtor"
                      ? "Realtor verification"
                      : "Company & office info"}
                  </h2>
                </div>
                <div className="bg-gray-50 px-4 py-3.5">
                  {selectedRole === "landlord" && (
                    <LandlordForm onValidityChange={setLandlordFormValid} />
                  )}
                  {selectedRole === "realtor" && (
                    <RealtorForm onValidityChange={setRealtorFormValid} />
                  )}
                  {selectedRole === "management" && (
                    <ManagementForm onValidityChange={setManagementFormValid} />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-5 sm:mt-7">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <Label
                  className="text-sm sm:text-base text-[#393f4e]"
                  htmlFor="terms"
                >
                  Accept RentYard property adding terms & condition
                </Label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="h-20 sm:h-24 border-t-[1px] border-t-[#E0E0E0] bg-white top-shadow">
        <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-20 h-full">
          <div className="flex items-center justify-between h-full">
            <NavLink
              to="/"
              className="text-sm sm:text-base font-semibold border-b-2 border-[#E0E0E0]"
            >
              Back
            </NavLink>
            <Button
              className="h-10 sm:h-[47px] py-2 text-sm sm:text-base"
              variant="getStarted"
              disabled={!selectedPropertyType || !selectedRole}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
