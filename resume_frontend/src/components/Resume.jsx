import React from "react";
import "daisyui/dist/full.css";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Resume = ({ data = {} }) => {
  const resumeRef = useRef(null);

  // Ensure all required data fields have default values
  const {
    personalInformation = {},
    summary = "",
    skills = [],
    experience = [],
  } = data;

  // Add print-specific styles
  const styles = `
    @media print {
      body {
        background: white !important;
        -webkit-print-color-adjust: exact;
      }
      .resume-container {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .badge-outline {
        border: 1px solid #000 !important;
        background: transparent !important;
        color: black !important;
      }
      .section-divider {
        border-top: 1px solid #666;
        margin: 1.5rem 0;
      }
      .print-hidden {
        display: none !important;
      }
      .break-inside-avoid {
        page-break-inside: avoid;
      }
    }
  `;

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${personalInformation.fullName || "Resume"}`,
    removeAfterPrint: true,
  });

  return (
    <>
      <style>{styles}</style>
      <div
        ref={resumeRef}
        className="resume-container max-w-4xl mx-auto p-8 space-y-6 bg-white text-gray-800"
      >
        {/* Print Button */}
        <div className="print-hidden flex justify-center mt-4">
          <button onClick={handlePrint} className="btn btn-primary">
            Download PDF
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-2 break-inside-avoid">
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInformation.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-gray-600">
            {personalInformation.location || "Your Location"}
          </p>

          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {personalInformation.email && (
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="mr-2" /> {personalInformation.email}
              </div>
            )}
            {personalInformation.phoneNumber && (
              <div className="flex items-center text-gray-700">
                <FaPhone className="mr-2" /> {personalInformation.phoneNumber}
              </div>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {personalInformation.gitHub && (
              <div className="flex items-center text-gray-700">
                <FaGithub className="mr-2" />{" "}
                {personalInformation.gitHub.replace("https://", "")}
              </div>
            )}
            {personalInformation.linkedIn && (
              <div className="flex items-center text-gray-700">
                <FaLinkedin className="mr-2" />{" "}
                {personalInformation.linkedIn.replace("https://", "")}
              </div>
            )}
          </div>
        </div>

        <hr className="section-divider" />

        {/* Summary Section */}
        <section className="break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2">
            SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {summary || "Brief summary about yourself."}
          </p>
        </section>

        <hr className="section-divider" />

        {/* Skills Section */}
        <section className="break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="badge badge-outline px-3 py-2 rounded-sm border-gray-500 text-gray-700"
                >
                  {skill.title} ({skill.level})
                </div>
              ))
            ) : (
              <p className="text-gray-500">No skills listed</p>
            )}
          </div>
        </section>

        {/* Experience Section */}
        <section className="break-inside-avoid">
          <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2">
            EXPERIENCE
          </h2>
          {experience.length > 0 ? (
            experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {exp.jobTitle}
                </h3>
                <p className="text-gray-600 font-medium">
                  {exp.company} | {exp.location}
                </p>
                <p className="text-gray-500 text-sm mb-2">{exp.duration}</p>
                <p className="text-gray-700 leading-relaxed">
                  {exp.responsibility}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No experience listed</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Resume;
