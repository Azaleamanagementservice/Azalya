import { memo, useState } from 'react';
import Image from "../assets/OurCertificate/Image1.jpg"
const CertificatesSection = () => {
  const [hoveredCert, setHoveredCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: "RERA Registration",
      organization: "Real Estate Regulatory Authority",
      year: "2023",
      description: "Authorized real estate services provider",
      icon: "🏢",
      color: "bg-[#187530]",
      height: "h-40"
    },
    {
      id: 2,
      title: "ISO 9001:2015",
      organization: "Quality Management Systems",
      year: "2023",
      description: "International quality management certification",
      icon: "⭐",
      color: "bg-[#1a5f33]",
      height: "h-48"
    },
    {
      id: 3,
      title: "Property Management Excellence",
      organization: "National Property Management Association",
      year: "2024",
      description: "Outstanding service in property management",
      icon: "🏆",
      color: "bg-[#187530]",
      height: "h-56", // Center/tallest certificate
      featured: true
    },
    {
      id: 4,
      title: "Customer Service Excellence",
      organization: "Service Quality Institute",
      year: "2023",
      description: "Excellence in customer satisfaction",
      icon: "🎖️",
      color: "bg-[#1a5f33]",
      height: "h-44"
    },
    {
      id: 5,
      title: "Green Building Certified",
      organization: "Indian Green Building Council",
      year: "2024",
      description: "Sustainable property management practices",
      icon: "🌱",
      color: "bg-[#187530]",
      height: "h-36"
    }
  ];

  return (<>
  
  
 {/* <section className="bg-[#F2E9DC] px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">Our Certificates</h2>
        <p className="text-gray-700 mb-10 max-w-xl mx-auto">
          Elevating and Empowering Your Certification Success with Tailored, Innovative, and Strategic Solutions Designed for Excellence
         
        </p>
        <div className="grid grid-cols-1 justify-center  items-center lg:grid-cols-5 lg:justify-end lg:items-end gap-6">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <img key={idx} loading="lazy" src={Image} className={` rounded-2xl w-48 ${idx === 2 ? 'h-72' : 'h-60'}`}/>
          ))}
        </div>
      </section> */}
  </>
  );
};

export default memo(CertificatesSection);
