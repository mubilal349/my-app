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
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Materials</h2>
                {["Top", "Bottom", "Centre Trim"].map((section) => (
                  <div
                    key={section}
                    className="bg-gray-800 bg-opacity-50 rounded-xl p-6"
                  >
                    <h3 className="font-semibold mb-4 text-yellow-400">
                      {section}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Piano Black",
                        "Gloss Carbon",
                        "Matte Carbon",
                        "Forged Carbon",
                      ].map((item) => {
                        const key = `${section}-${item}`;
                        return (
                          <label
                            key={key}
                            className={`flex items-center justify-between p-4 rounded-lg  cursor-pointer transition-all duration-300 ${
                              formData.carbon.includes(key) ? "" : ""
                            }`}
                          >
                            <span className="text-white">{item}</span>
                            <div className="relative h-2.5 ">
                              <input
                                type="checkbox"
                                checked={formData.carbon.includes(key)}
                                onChange={() => toggleArrayValue("carbon", key)}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 ${
                                  formData.carbon.includes(key)
                                    ? "#297fff"
                                    : "border-gray-600 bg-gray-900"
                                }`}
                              >
                                {formData.carbon.includes(key) && (
                                  <div className="relative h-3.5">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                )}
                              </div>
                            </div>
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
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Materials</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Black alcantara 9040",
                    "Charcoal grey alcantara 9002",
                    "Black nappa leather",
                    "Black perforated leather",
                  ].map((item) => (
                    <label
                      key={item}
                      className={`flex items-center justify-between p-5 rounded-lg  cursor-pointer transition-all duration-300 ${
                        formData.materials.includes(item) ? "" : ""
                      }`}
                    >
                      <span className="text-white text-sm">{item}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.materials.includes(item)}
                          onChange={() => toggleArrayValue("materials", item)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            formData.materials.includes(item)
                              ? "#297fff"
                              : "border-gray-600 bg-gray-900"
                          }`}
                        >
                          {formData.materials.includes(item) && (
                            <div className="relative h-3.5">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-6 bg-gray-800 bg-opacity-50 rounded-xl p-6">
                  <label className="block text-sm text-gray-400 mb-2">
                    Custom Material
                  </label>
                  <input
                    type="text"
                    placeholder="Enter custom material name"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white h-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Stitching */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6">
                  <label className="block text-sm text-gray-400 mb-3">
                    Stitching Colour
                  </label>
                  <input
                    type="text"
                    value={formData.stitchingColor}
                    onChange={(e) =>
                      updateFormData("stitchingColor", e.target.value)
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-yellow-400">
                    Custom Style
                  </h3>
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
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateFormData("stitchingCustom", option.value)
                      }
                      className={`w-full p-5 rounded-lg border transition-all duration-200 text-left ${
                        formData.stitchingCustom === option.value
                          ? "border-yellow-400 bg-yellow-400 bg-opacity-10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{option.label}</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {option.desc}
                          </p>
                        </div>
                        {formData.stitchingCustom === option.value && (
                          <Check size={18} className="text-yellow-400" />
                        )}
                      </div>
                    </button>
                  ))}
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
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                      key={color}
                      onClick={() => updateFormData("stripeColor", color)}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        formData.stripeColor === color
                          ? "border-yellow-400 bg-yellow-400 bg-opacity-10 scale-105"
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
              <div className="space-y-4">
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
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.carYear}
                    onChange={(e) => updateFormData("carYear", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "dsg", label: "DSG / Automatic" },
                    { value: "manual", label: "Manual" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateFormData("transmission", option.value)
                      }
                      className={`p-5 rounded-lg border transition-all duration-200 ${
                        formData.transmission === option.value
                          ? "border-yellow-400 bg-yellow-400 bg-opacity-10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-3">
                    Steering Wheel Photo
                  </label>
                  <button className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border-2 border-dashed border-gray-600">
                    Upload Photo
                  </button>
                </div>
              </div>
            )}

            {/* Step 8: Contact */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateFormData("country", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5">
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
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
                  className="w-20 py-3 text-center text-sm sm:text-base font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md hover:shadow-yellow-400/40 transition-all duration-300 hover:scale-105"
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
