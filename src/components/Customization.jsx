import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Swal from "sweetalert2";
import "../index.css";

const Customization = () => {
  const handlePersonalInfoSubmit = () => {
    if (
      !formData.fullName ||
      !formData.country ||
      !formData.email ||
      !formData.phone
    ) {
      Swal.fire(
        "⚠️ Missing Info",
        "Please fill all personal details before continuing!",
        "warning"
      );
      return;
    }

    // Prepare WhatsApp message
    let message = `
Hello! I want a quote for the following customization:
- Full Name: ${formData.fullName}
- Country: ${formData.country}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Car: ${formData.carMake} ${formData.carModel} (${formData.carYear})
- Transmission: ${formData.transmission}
- Stripe Color: ${formData.stripeColor}
- Stitching Color: ${formData.stitchingColor}
- Shape: ${formData.shape}
- Rev Counter: ${formData.revCounter}
- Materials: ${formData.materials.join(", ")}
- Carbon: ${formData.carbon.join(", ")}
`;

    // Include steering wheel photo note
    if (formData.steeringWheelPhoto) {
      message += `- Steering Wheel Photo: ${formData.steeringWheelPhoto.name} (attach manually in WhatsApp)\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "447598863458"; // replace with your number

    // Open WhatsApp in new tab
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    // Move to Thank You screen
    setCurrentStep(9);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    shape: "original",
    carbon: [],
    revCounter: "no",
    materials: [],
    stitchingColor: "red",
    stitchingCustom: "mPower",
    stripeColor: "",
    carMake: "audi",
    carModel: "rs 3",
    carYear: "2020",
    transmission: "dsg",
    fullName: "",
    country: "",
    email: "",
    phone: "",
  });

  const steps = [
    { number: 1, label: "Choose Shape" },
    { number: 2, label: "Carbon" },
    { number: 3, label: "Rev counter" },
    { number: 4, label: "Material" },
    { number: 5, label: "Stitching" },
    { number: 6, label: "Stripe" },
    { number: 7, label: "Car" },
    { number: 8, label: "Contact" },
  ];
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData("steeringWheelPhoto", reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    // Step 2: Carbon validation
    if (currentStep === 2 && formData.carbon.length === 0) {
      Swal.fire(
        "⚠️ Missing Selection",
        "Please select at least one carbon option!",
        "warning"
      );
      return;
    }

    // Step 4: Material validation
    if (currentStep === 4 && formData.materials.length === 0) {
      Swal.fire(
        "⚠️ Missing Selection",
        "Please select at least one material!",
        "warning"
      );
      return;
    }

    // Step 5: Stitching color validation
    if (currentStep === 5 && !formData.stitchingColor) {
      Swal.fire(
        "⚠️ Missing Info",
        "Please enter a stitching color!",
        "warning"
      );
      return;
    }

    // Step 6: Stripe color validation
    if (currentStep === 6 && !formData.stripeColor) {
      Swal.fire("⚠️ Missing Info", "Please enter a stripe color!", "warning");
      return;
    }

    // Step 7: Car info validation
    if (
      currentStep === 7 &&
      (!formData.carMake || !formData.carModel || !formData.carYear)
    ) {
      Swal.fire(
        "⚠️ Missing Info",
        "Please fill in all car details!",
        "warning"
      );
      return;
    }

    // ✅ Step 8 → 9: Validate ONLY when user clicks Next
    if (
      currentStep === 8 &&
      (!formData.fullName ||
        !formData.country ||
        !formData.email ||
        !formData.phone)
    ) {
      Swal.fire(
        "⚠️ Missing Info",
        "Please fill in all personal details before continuing!",
        "warning"
      );
      return;
    }

    // ✅ If all good, move to next step
    if (currentStep < 8) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Simple Progress Bar */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-gray-800">
        <div className=" px-6 py-6" style={{ padding: "30px" }}>
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-green-500 text-white scale-110"
                        : currentStep === step.number
                        ? "bg-yellow-400 text-black scale-125 shadow-lg shadow-yellow-400/50"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check size={20} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs transition-colors hidden md:block ${
                      currentStep >= step.number
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-800"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=" px-6 py-12" style={{ padding: "30px" }}>
        {/* Static Image */}
        <div className="mb-6 flex justify-center">
          <img
            src="/img/before-and-after/before-after 3 02.jpg"
            alt="Steering Wheel"
            className="w-80 md:w-96 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
          />
        </div>

        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12" style={{ padding: "20px" }}>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {steps[currentStep - 1]?.label || "Customization"}
            </h2>
            <p className="text-gray-400 mb-8">Step {currentStep} of 8</p>

            {/* Step 1: Choose Shape */}
            {currentStep === 1 && (
              <div className="bg-gray-900 p-6 ">
                <h2 className="text-xl font-bold text-white mb-6">Shape</h2>
                <div className="space-y-4" style={{ paddingTop: "10px" }}>
                  {[
                    {
                      value: "original",
                      label: "Original shape",
                    },
                    {
                      value: "flat",
                      label: "Flat bottom conversion",
                    },
                    {
                      value: "reshape",
                      label: "Full reshape",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-all ${
                        formData.shape === option.value ? "" : ""
                      }`}
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="steeringWheelShape"
                          value={option.value}
                          checked={formData.shape === option.value}
                          onChange={() => updateFormData("shape", option.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2  ${
                            formData.shape === option.value
                              ? "border-[#297fff] bg-[#297fff]"
                              : "border-gray-600 bg-gray-900"
                          }`}
                        >
                          {formData.shape === option.value && (
                            <div className="relative h-3.5">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        style={{ marginLeft: "5px" }}
                        className={`text-base ${
                          formData.shape === option.value
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Carbon */}
            {currentStep === 2 && (
              <div className="bg-gray-900 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Materials</h2>

                {["Top", "Bottom", "Centre Trim"].map((section) => (
                  <div key={section} className="mb-8">
                    <h3
                      className="text-lg font-semibold text-yellow-400 mb-4"
                      style={{ marginTop: "10px" }}
                    >
                      {section}
                    </h3>

                    <div className="space-y-3">
                      {["Piano Black", "Gloss Carbon", "Forged Carbon"].map(
                        (item) => {
                          const key = `${section}-${item}`;
                          const selected = formData.carbon.includes(key);

                          return (
                            <label
                              key={key}
                              className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-all ${
                                selected ? "" : ""
                              }`}
                            >
                              {/* Checkbox Circle */}
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => {
                                    // ✅ only one selection per section
                                    setFormData((prev) => {
                                      const filtered = prev.carbon.filter(
                                        (val) => !val.startsWith(`${section}-`)
                                      );
                                      return selected
                                        ? { ...prev, carbon: filtered } // deselect if clicked again
                                        : {
                                            ...prev,
                                            carbon: [...filtered, key],
                                          }; // select new
                                    });
                                  }}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selected
                                      ? "border-[#297fff] bg-[#297fff]"
                                      : "border-gray-600 bg-gray-900"
                                  }`}
                                >
                                  {selected && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                              </div>

                              {/* Label Text */}
                              <span
                                style={{ marginLeft: "5px" }}
                                className={`text-base ${
                                  selected ? "text-white" : "text-gray-400"
                                }`}
                              >
                                {item}
                              </span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Rev Counter */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    value: "yes",
                    label: "Yes, add rev counter",
                    desc: "LED shift lights",
                  },
                  {
                    value: "no",
                    label: "No, thank you",
                    desc: "Standard setup",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData("revCounter", option.value)}
                    className={`p-8 rounded-xl border-2 transition-all duration-300 ${
                      formData.revCounter === option.value
                        ? "#297fff"
                        : "border-gray-700 hover:border-gray-600 bg-gray-800 bg-opacity-50"
                    }`}
                  >
                    <h3 className="font-semibold text-xl mb-2">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-400">{option.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Material */}
            {currentStep === 4 && (
              <div className="bg-gray-900 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Materials</h2>

                <div className="mb-8">
                  <h3
                    className="text-lg font-semibold text-yellow-400 mb-4"
                    style={{ marginTop: "10px" }}
                  >
                    Select Material
                  </h3>

                  <div className="space-y-3">
                    {[
                      "Black alcantara 9040",
                      "Charcoal grey alcantara 9002",
                      "Black perforated leather",
                    ].map((item) => {
                      const selected = formData.materials.includes(item);

                      return (
                        <label
                          key={item}
                          className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-all ${
                            selected ? "" : ""
                          }`}
                        >
                          {/* Checkbox Circle */}
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => {
                                // ✅ Allow only one selected material
                                setFormData((prev) => ({
                                  ...prev,
                                  materials: selected ? [] : [item],
                                }));
                              }}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selected
                                  ? "border-[#297fff] bg-[#297fff]"
                                  : "border-gray-600 bg-gray-900"
                              }`}
                            >
                              {selected && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>

                          {/* Label Text */}
                          <span
                            style={{ marginLeft: "5px" }}
                            className={`text-base ${
                              selected ? "text-white" : "text-gray-400"
                            }`}
                          >
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Material Input */}
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 mt-6">
                  <label className="block text-sm text-gray-400 mb-2">
                    Custom Material
                  </label>
                  <input
                    type="text"
                    placeholder="Enter custom material name"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white h-10 focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Stitching */}
            {currentStep === 5 && (
              <div className="bg-gray-900 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Stitching</h2>

                {/* Stitching Colour Input */}
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 mb-8">
                  <label
                    htmlFor="stitchingColor"
                    className="block text-sm text-gray-400 mb-2"
                  >
                    Stitching Colour
                  </label>
                  <input
                    id="stitchingColor"
                    type="text"
                    value={formData.stitchingColor || ""}
                    onChange={(e) =>
                      updateFormData("stitchingColor", e.target.value)
                    }
                    placeholder="Enter stitching colour (e.g. Red, Blue, Yellow)"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white h-10 focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                  />
                </div>

                {/* Custom Style Options */}
                <div className="mb-8">
                  {/* <h3
                    className="text-lg font-semibold text-yellow-400 mb-4"
                    style={{ marginTop: "10px" }}
                  >
                    Select Custom Style
                  </h3> */}

                  <div className="space-y-3">
                    {[
                      {
                        value: "mPower",
                        label: "",
                        desc: "",
                      },
                      {
                        value: "sLine",
                        label: "",
                        desc: "",
                      },
                      {
                        value: "pianoBlack",
                        label: "",
                        desc: "",
                      },
                    ].map((option) => {
                      const selected =
                        formData.stitchingCustom === option.value;
                      const optionId = `stitching-${option.value}`;

                      return (
                        <div
                          key={option.value}
                          className={`flex items-center justify-between p-4  cursor-pointer transition-all  ${
                            selected ? "" : ""
                          }`}
                        >
                          {/* Label Text */}
                          <label
                            htmlFor={optionId}
                            className="cursor-pointer flex-1"
                          >
                            <h4
                              className={`text-base font-medium ${
                                selected ? "text-white" : "text-gray-300"
                              }`}
                            >
                              {option.label}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {option.desc}
                            </p>
                          </label>

                          {/* Radio Button */}
                          {/* <div className="relative ml-4">
                            <input
                              id={optionId}
                              type="radio"
                              name="stitchingCustom"
                              value={option.value}
                              checked={selected}
                              onChange={() =>
                                updateFormData("stitchingCustom", option.value)
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selected
                                  ? "border-[#297fff] bg-[#297fff]"
                                  : "border-gray-600 bg-gray-900"
                              }`}
                            >
                              {selected && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div> */}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Style Input */}
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 mt-6">
                  <label
                    htmlFor="customStyle"
                    className="block text-sm text-gray-400 mb-2"
                    style={{ marginLeft: "5px" }}
                  >
                    Custom Style
                  </label>
                  <input
                    id="customStyle"
                    type="text"
                    placeholder="Enter custom style name"
                    value={formData.customStyle || ""}
                    onChange={(e) =>
                      updateFormData("customStyle", e.target.value)
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white h-10 focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                  />
                </div>
              </div>
            )}

            {/* Step 6: Stripe */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6">
                  <label className="block text-sm text-gray-400 mb-3">
                    12 O'Clock Stripe Colour
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your color..."
                    value={formData.stripeColor || ""} // ✅ bound to formData
                    onChange={(e) =>
                      updateFormData("stripeColor", e.target.value)
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-400 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 7: Car */}
            {currentStep === 7 && (
              <div className="bg-gray-900 p-6 space-y-6 rounded-xl">
                <h2 className="text-xl font-bold text-white mb-4">
                  Car Information
                </h2>

                {/* Make & Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                    <label className="block text-sm text-gray-400 mb-2">
                      Make
                    </label>
                    <input
                      type="text"
                      value={formData.carMake}
                      onChange={(e) =>
                        updateFormData("carMake", e.target.value)
                      }
                      placeholder="Enter car make"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                    />
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                    <label className="block text-sm text-gray-400 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      value={formData.carModel}
                      onChange={(e) =>
                        updateFormData("carModel", e.target.value)
                      }
                      placeholder="Enter car model"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                    />
                  </div>
                </div>

                {/* Year */}
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.carYear}
                    onChange={(e) => updateFormData("carYear", e.target.value)}
                    placeholder="Enter year"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                  />
                </div>

                {/* Transmission */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "dsg", label: " Automatic" },
                    { value: "manual", label: "Manual" },
                  ].map((option) => {
                    const selected = formData.transmission === option.value;
                    return (
                      <button
                        style={{ marginTop: "10px" }}
                        key={option.value}
                        onClick={() =>
                          updateFormData("transmission", option.value)
                        }
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                          selected
                            ? "border-[#297fff] bg-[#297fff]/10 text-white scale-105"
                            : "border-gray-700 hover:border-gray-600 text-gray-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {/* Steering Wheel Upload */}
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-2">
                    Steering Wheel Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-white file:bg-gray-700 file:text-white file:px-4 file:py-2 file:border-0 file:rounded-lg file:cursor-pointer hover:file:bg-gray-600"
                  />
                  {formData.steeringWheelPhoto && (
                    <p className="mt-2 text-xs text-gray-400">
                      Selected file: {formData.steeringWheelPhoto.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 8: Contact */}
            {currentStep === 8 && (
              <div className="bg-gray-900 p-6 space-y-6 rounded-xl max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-white mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                    <label className="block text-sm text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        updateFormData("fullName", e.target.value)
                      }
                      placeholder="Enter full name"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                    />
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                    <label className="block text-sm text-gray-400 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) =>
                        updateFormData("country", e.target.value)
                      }
                      placeholder="Enter country"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                    <label className="block text-sm text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="Enter email"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                    />
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                    <label className="block text-sm text-gray-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                    />
                  </div>
                </div>

                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 mt-6">
                  <label className="block text-sm text-gray-400 mb-2">
                    Steering Wheel Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-white file:bg-gray-700 file:text-white file:px-4 file:py-2 file:border-0 file:rounded-lg file:cursor-pointer hover:file:bg-gray-600"
                  />
                  {formData.steeringWheelPhoto && (
                    <p className="mt-2 text-xs text-gray-400">
                      Selected file: {formData.steeringWheelPhoto.name}
                    </p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 9 && (
              <div className="flex flex-col  items-center justify-center text-center py-20">
                <img
                  src="/img/thank-you.jpg"
                  alt="Thank You"
                  className="w-48 mb-8 rounded-xl"
                />
                <h1 className="text-4xl font-bold mb-4 text-yellow-400">
                  Thank You!
                </h1>
                <p className="text-gray-300 max-w-xl">
                  Your inquiry was sent successfully. We’ll get back to you
                  within 24 hours!
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center justify-center mt-8 space-y-4">
            <div className="flex gap-6">
              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`w-20 py-3 text-center font-medium text-sm sm:text-base rounded-full transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105"
                  }`}
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    if (currentStep === 8) {
                      handlePersonalInfoSubmit(); // validate & go next
                    } else {
                      handleNext(); // normal next
                    }
                  }}
                  className="px-6 py-4 text-center text-sm sm:text-base font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md hover:shadow-yellow-400/40 transition-all duration-300 hover:scale-105 min-w-[100px]"
                >
                  {currentStep === 8 ? "Get Quote" : "Next"}
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} / {steps.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
