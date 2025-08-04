import React, { useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Award, Code, Database, Cloud } from 'lucide-react';
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <Download size={20} />
          <span>Download Resume (PDF)</span>
        </button>
      </div>

      {/* Resume Content */}
      <div ref={resumeRef}>
        {/* Header/Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-3 tracking-tight">Linson Thomas</h1>
              <h2 className="text-2xl mb-2 text-blue-100 font-medium">Data Engineer | Python Developer | Software Development Professional</h2>
              <div className="w-24 h-1 bg-blue-300 mx-auto mb-8 rounded-full"></div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-blue-700/30 px-3 py-2 rounded-full">
                  <Mail size={16} />
                  <a href="mailto:linson.thomas.2203@gmail.com" className="hover:underline">
                    linson.thomas.2203@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 bg-blue-700/30 px-3 py-2 rounded-full">
                  <Phone size={16} />
                  <span>+91 96244 85993</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-700/30 px-3 py-2 rounded-full">
                  <Linkedin size={16} />
                  <a href="https://www.linkedin.com/in/linson-thomas-3944851aa" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    linkedin.com/in/linson-thomas-3944851aa
                  </a>
                </div>
                <div className="flex items-center gap-2 bg-blue-700/30 px-3 py-2 rounded-full">
                  <MapPin size={16} />
                  <span>Ahmedabad, Gujarat, IN</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 max-w-6xl py-12">
          {/* Professional Summary */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Professional Summary</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Experienced Data Engineer and Python Developer with <strong className="text-blue-600">3+ years of expertise</strong> in designing and implementing scalable ETL pipelines, GIS data management, and full-stack application development. Proven track record of optimizing data processing workflows, achieving <strong className="text-green-600">40% reduction in processing time</strong> through innovative pipeline design. Skilled in cloud technologies (AWS), data visualization (Apache Superset), and leading cross-functional teams to deliver data-driven solutions that drive business outcomes.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-2">Core Specializations:</h3>
                <div className="flex flex-wrap gap-2">
                  {['ETL Pipeline Development', 'GIS Data Management', 'Cloud Architecture', 'Python Automation', 'Data Visualization'].map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Programming Languages',
                  skills: 'Python, SQL, JavaScript',
                  icon: <Code className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Data Engineering',
                  skills: 'Apache NiFi, ETL Pipelines, Data Integration, Apache Superset',
                  icon: <Database className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Cloud Platforms',
                  skills: 'AWS (Lambda, DynamoDB, S3, EC2), Cloud Architecture',
                  icon: <Cloud className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Databases',
                  skills: 'PostgreSQL (PostGIS), DynamoDB, Geospatial Data Storage',
                  icon: <Database className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Web Technologies',
                  skills: 'ReactJS, Flask, RESTful APIs',
                  icon: <Code className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Data Tools',
                  skills: 'Pandas, Selenium, GeoJSON, FHIR Standards',
                  icon: <Database className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Development Practices',
                  skills: 'Agile Methodology, Version Control (Git), Automated Testing',
                  icon: <Code className="w-5 h-5 text-blue-600" />
                },
                {
                  category: 'Specialized',
                  skills: 'GIS Application Development, Medical Database Management, Web Scraping',
                  icon: <Award className="w-5 h-5 text-blue-600" />
                }
              ].map((skillGroup, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    {skillGroup.icon}
                    <h3 className="font-semibold text-gray-800">{skillGroup.category}</h3>
                  </div>
                  <p className="text-gray-600">{skillGroup.skills}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Professional Experience</h2>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Senior Associate - Software Developer</h3>
                    <h4 className="text-xl text-blue-600 font-semibold">Geneza Solutions Private Limited</h4>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium text-sm">Apr 2024 - Present</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Team Leadership:</strong> Led 4-member GIS development team, implementing streamlined processes that improved delivery timelines by <strong className="text-green-600">25%</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Data Architecture:</strong> Designed and implemented scalable multi-level data management system for administrative regions, handling <strong className="text-green-600">50+ datasets</strong> across national, regional, and local levels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Automation Excellence:</strong> Developed Python automation scripts for GIS data version control, reducing manual processing time from <strong className="text-red-500">8 hours to 2 hours</strong> per update cycle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Process Optimization:</strong> Created efficient data merge processes combining datasets from multiple administrative levels, ensuring <strong className="text-green-600">99.5% data accuracy</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Technical Innovation:</strong> Architected recursive data update system for Flutter-based GIS application, supporting real-time data synchronization</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Junior Software Developer</h3>
                    <h4 className="text-xl text-blue-600 font-semibold">Geneza Solutions Private Limited</h4>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium text-sm">Apr 2021 - Mar 2024</span>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">ETL Pipeline Development:</strong> Designed and implemented high-performance ETL pipelines using Python and Apache NiFi, achieving <strong className="text-green-600">40% reduction</strong> in data processing time for datasets exceeding <strong className="text-green-600">1M records</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Full-Stack Development:</strong> Built and maintained ReactJS-based educational platform serving <strong className="text-green-600">500+ users</strong>, implementing comprehensive data analysis pipelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Healthcare Data Management:</strong> Developed FHIR-compliant medical databases in AWS DynamoDB, ensuring healthcare data interoperability and regulatory compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Data Automation:</strong> Created Python web scraping solutions processing <strong className="text-green-600">10,000+ data points</strong> daily, with <strong className="text-green-600">95% accuracy rate</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong className="text-blue-600">Cloud Integration:</strong> Implemented AWS-based data storage and processing solutions, reducing infrastructure costs by <strong className="text-green-600">30%</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Key Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'High-Performance ETL Pipeline System',
                  technologies: 'Python, Apache NiFi, PostgreSQL, AWS',
                  description: [
                    'Architected enterprise-grade ETL pipelines processing 2+ million records daily',
                    'Implemented parallel processing and optimization techniques achieving 40% performance improvement',
                    'Designed error handling and data quality validation frameworks'
                  ]
                },
                {
                  title: 'Multi-Level GIS Survey Application',
                  technologies: 'Flutter, Python, PostGIS, GeoJSON',
                  description: [
                    'Developed comprehensive GIS application with automated data versioning system',
                    'Implemented recursive update mechanisms for real-time data synchronization',
                    'Created interactive mapping interfaces supporting multiple administrative levels'
                  ]
                },
                {
                  title: 'FHIR-Compliant Medical Database',
                  technologies: 'AWS DynamoDB, Python, FHIR Standards',
                  description: [
                    'Designed healthcare data management system adhering to FHIR R4 standards',
                    'Implemented secure data transformation scripts ensuring patient data privacy',
                    'Built integration APIs for healthcare provider systems'
                  ]
                },
                {
                  title: 'Real-Time Data Visualization Dashboard',
                  technologies: 'Apache Superset, Python, SQL',
                  description: [
                    'Developed interactive dashboards providing real-time insights from survey data',
                    'Implemented automated reporting system reducing manual report generation by 80%',
                    'Created custom visualization components for geospatial data representation'
                  ]
                }
              ].map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <div className="bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
                    <span className="text-blue-700 text-sm font-medium">{project.technologies}</span>
                  </div>
                  <ul className="space-y-2">
                    {project.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800">Master of Science - Artificial Intelligence and Machine Learning</h3>
                <p className="text-lg text-blue-600 font-semibold">Gujarat University</p>
                <p className="text-blue-600 font-medium">July 2019 - April 2021</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800">Bachelor of Computer Application - Application Development</h3>
                <p className="text-lg text-blue-600 font-semibold">St. Xavier's College, Ahmedabad</p>
              </div>
            </div>
          </section>

          {/* Achievements & Certifications */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Achievements & Certifications</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Performance Optimization',
                    description: 'Achieved 40% reduction in ETL processing time through innovative pipeline design',
                    highlight: '40%'
                  },
                  {
                    title: 'Team Leadership',
                    description: 'Successfully led cross-functional teams delivering 5+ major projects on schedule',
                    highlight: '5+'
                  },
                  {
                    title: 'Process Improvement',
                    description: 'Reduced manual data processing time by 75% through automation initiatives',
                    highlight: '75%'
                  },
                  {
                    title: 'Data Quality',
                    description: 'Maintained 99.5% data accuracy across all managed systems',
                    highlight: '99.5%'
                  }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">{achievement.highlight}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Additional Information</h2>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                  <p className="text-gray-600">English (Fluent), Hindi (Fluent), Gujarati (Native)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-600">Open to remote work and relocation</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                  <p className="text-gray-600">Available (30-45 days notice period)</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
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