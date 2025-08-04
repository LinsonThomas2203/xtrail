import React, { useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    // Show loading state
    const button = document.getElementById('download-button');
    if (button) {
      button.textContent = 'Generating PDF...';
      button.setAttribute('disabled', 'true');
    }

    try {
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, {
        scale: 1.5, // Higher scale for better quality
        useCORS: true, // To handle images from external URLs
        logging: false,
        windowWidth: 1200, // Fixed width for consistent rendering
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate PDF dimensions based on canvas aspect ratio
      const aspectRatio = canvas.height / canvas.width;
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = pdfWidth * aspectRatio;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Linson_Thomas_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Reset button state
      if (button) {
        button.textContent = 'Download Resume (PDF)';
        button.removeAttribute('disabled');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Download Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="download-button"
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <Download size={18} />
          <span>Download Resume (PDF)</span>
        </button>
      </div>

      {/* Resume Content */}
      <div ref={resumeRef}>
        {/* Header/Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">Linson Thomas</h1>
                <h2 className="text-2xl mb-6 text-blue-100">Senior Associate - Software Developer</h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Ahmedabad, Gujarat, INDIA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href="mailto:linson.thomas.2203@gmail.com" className="hover:underline">
                      linson.thomas.2203@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>+91 96244 85993</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github size={16} />
                    <a href="https://github.com/LinsonThomas2203" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      github.com/LinsonThomas2203
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} />
                    <a href="https://www.linkedin.com/in/linson-thomas-3944851aa" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      linkedin.com/in/linson-thomas-3944851aa
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 max-w-5xl py-12">
          {/* Professional Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">Professional Summary</h2>
            <p className="text-gray-600 leading-relaxed">
              Detail-oriented Data Engineer with expertise in ETL pipeline development, data integration, and GIS data management, 
              specializing in building scalable and reliable data solutions. With strong experience in Python, SQL, and cloud 
              platforms like AWS, I design efficient workflows for data extraction, transformation, and loading (ETL) processes. 
              Currently enhancing my skills with Apache NiFi and Superset for advanced data analytics and automation, I collaborate 
              with cross-functional teams to drive data-driven decisions and improve business outcomes through optimized data 
              infrastructure. Successfully reduced data processing time by 40% through optimized ETL pipelines.
            </p>
          </section>

          {/* Key Competencies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">Key Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'ETL Pipeline Development',
                'GIS Application Development',
                'PostgreSQL for Geospatial Data Storage',
                'Apache Superset for Data Visualization',
                'Python for ETL & Automation',
                'Multi-Level Data Management',
                'Agile Methodology',
                'Data Analysis & Visualization',
                'Medical Database Management',
                'Leadership & Team Collaboration',
                'Data-Driven Decision Making'
              ].map((skill, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Professional Experience</h2>
            
            <div className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Senior Associate - Software Developer</h3>
                <span className="text-blue-600 font-medium">Apr 2024 - Present</span>
              </div>
              <h4 className="text-lg text-blue-600 mb-3">Geneza Solutions Private Limited</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Led the preparation and normalization of complex GIS datasets for integration into a Flutter-based GIS application</li>
                <li>Developed and implemented a scalable multi-level data management approach for administrative regions</li>
                <li>Created scripts to automate the version control of GIS data, facilitating recursive data updates</li>
                <li>Devised an efficient process to merge datasets from national, regional, and local levels</li>
                <li>Led the team on GIS application front, handling and streamlining processes</li>
              </ul>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Junior Software Developer</h3>
                <span className="text-blue-600 font-medium">Apr 2021 - Mar 2024</span>
              </div>
              <h4 className="text-lg text-blue-600 mb-3">Geneza Solutions Private Limited</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Designed and implemented ETL pipelines for data transformation and integration</li>
                <li>Analyzed and managed data for an educational platform built using ReactJS</li>
                <li>Developed FHIR-compliant medical databases in AWS DynamoDB</li>
                <li>Focused on web scraping and data extraction, developing Python automation scripts</li>
              </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'ETL Projects',
                  description: 'Designed high-performance ETL pipelines achieving 40% reduction in processing time using Python and Apache NiFi.'
                },
                {
                  title: 'Academy Website',
                  description: 'Developed ReactJS-based educational platform with structured data management and analysis pipelines.'
                },
                {
                  title: 'FHIR-Based Medical Database',
                  description: 'Created FHIR-compliant medical database using AWS DynamoDB with data transformation scripts.'
                },
                {
                  title: 'GIS Survey Application',
                  description: 'Developed multi-level GIS survey application with automated data versioning and recursive updates.'
                },
                {
                  title: 'Survey Reports Data Visualization',
                  description: 'Built interactive dashboards using Apache Superset for real-time visualization of survey reports.'
                },
                {
                  title: 'Musicta',
                  description: 'Designed a music collaboration platform with real-time audio sharing and project management features.'
                }
              ].map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Education</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800">Master of Science</h3>
                <p className="text-lg text-blue-600">Gujarat University</p>
                <p className="text-gray-600">Majors: Artificial Intelligence and Machine Learning</p>
                <p className="text-blue-600 font-medium">July 2019 - April 2021</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800">Bachelor of Computer Application</h3>
                <p className="text-lg text-blue-600">St. Xavier's College, Ahmedabad</p>
                <p className="text-gray-600">Majors: Application Development</p>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">Technical Skills</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-600 leading-relaxed">
                Python, SQL, PostgreSQL (Geospatial Data), Apache Superset, Apache NiFi, AWS (Lambda, DynamoDB, S3), 
                ETL Pipelines, ReactJS, Flask, FileMaker, Selenium (Web Scraping), Pandas, GeoJSON, GIS Data Processing.
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 max-w-5xl flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Linson Thomas</p>
            <div className="flex gap-4">
              <a href="https://github.com/LinsonThomas2203" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/linson-thomas-3944851aa" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;