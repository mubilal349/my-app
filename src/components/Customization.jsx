import React, { useState } from "react";
import { Check } from "lucide-react";
import "../index.css";

const Customization = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shape: "original",
    carbon: [],
    revCounter: "no",
    materials: [],
    stitchingColor: "red",
    stitchingCustom: "mPower",
    stripeColor: "Red",
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

  const handleNext = () => {
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
            src="/img/img-1.png"
            alt="Steering Wheel"
            className="w-80 md:w-96 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
          />
        </div>

        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12" style={{ padding: "20px" }}>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {steps[currentStep - 1].label}
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
                              ? "#297fff"
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
                      {[
                        "Piano Black",
                        "Gloss Carbon",
                        "Matte Carbon",
                        "Forged Carbon",
                      ].map((item) => {
                        const key = `${section}-${item}`;
                        const selected = formData.carbon.includes(key);

                        return (
                          <label
                            key={key}
                            className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-all
                ${selected ? "" : ""}`}
                          >
                            {/* Checkbox Circle */}
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => toggleArrayValue("carbon", key)}
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
                              className={` text-base ${
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
                      "Black nappa leather",
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
                              onChange={() =>
                                toggleArrayValue("materials", item)
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
                  <h3
                    className="text-lg font-semibold text-yellow-400 mb-4"
                    style={{ marginTop: "10px" }}
                  >
                    Select Custom Style
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        value: "mPower",
                        label: "M Power (3 colours)",
                        desc: "BMW M Sport style",
                      },
                      {
                        value: "sLine",
                        label: "S-line (3 colours)",
                        desc: "Audi Sport style",
                      },
                      {
                        value: "pianoBlack",
                        label: "Piano Black",
                        desc: "Glossy black luxury finish",
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
                          <div className="relative ml-4">
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
                          </div>
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
                    value={formData.stripeColor}
                    onChange={(e) =>
                      updateFormData("stripeColor", e.target.value)
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 "
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Red",
                    "Blue",
                    "Yellow",
                    "Green",
                    "Orange",
                    "White",
                    "Silver",
                    "Black",
                  ].map((color) => (
                    <button
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        height: "5vh",
                      }}
                      key={color}
                      onClick={() => updateFormData("stripeColor", color)}
                      className={`p-4  border transition-all duration-200 ${
                        formData.stripeColor === color
                          ? "border-blue-400 bg-blue-400 bg-opacity-10 scale-105"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
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
                    { value: "dsg", label: "DSG / Automatic" },
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        updateFormData("steeringWheelPhoto", file);
                      }
                    }}
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

                {/* Rows Wrapper */}
                <div className="space-y-4">
                  {/* Row 1: Full Name & Country */}
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

                  {/* Row 2: Email & Phone */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                      <label className="block text-sm text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
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
                        onChange={(e) =>
                          updateFormData("phone", e.target.value)
                        }
                        placeholder="Enter phone number"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#297fff]"
                      />
                    </div>
                  </div>
                </div>
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
                  onClick={handleNext}
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
