import { memo, useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is Azalea Management Services LLP?",
      answer:
        "Azalea is a Start Up India certified firm delivering end to end property management solutions for NRIs, developers, and cooperative housing societies. From inventory and valuation to site coordination, compliance, post-handover support, and CHS governance—we manage every aspect with structure, accountability, and trust.",
    },
    {
      question: "Who can benefit from Azalea's services?",
      answer:
        "• NRIs seeking complete property assistance—including documentation, digitization, valuation, coordination, and dispute-prepared reporting\n• Developers looking for seamless post sales service execution\n• CHS committees aiming for compliant governance, vendor control, and record transparency",
    },
    {
      question: "What makes Azalea different from other service providers?",
      answer:
        "Our services are powered by structured workflows, ethical standards, and emotionally intelligent client interaction. Every task is backed by clear SOPs, punctual execution, and a culture rooted in precision and trust.",
    },
    {
      question: "How do I request a consultation?",
      answer:
        "You can reach us via the “Request Consultation” button across the website or email contact@azaleaservices.co.in. We’ll coordinate a discovery call tailored to your requirements.",
    },
    {
      question: "Can Azalea manage properties outside Thane or Maharashtra?",
      answer:
        "Yes. While we're headquartered in Thane, Azalea’s service model is scalable and location-adaptive. We are currently operational in Thane, Mumbai, Navi Mumbai, Palghar, Pune, and Nashik, with a pan India expansion underway to extend support wherever NRIs need us.",
    },
    {
      question: "What documents are needed for property inventory management?",
      answer:
        "Usually requested:\n• Ownership/title documents\n• Floor plans or layout sketches\n• Handover and access records\n• Previous valuation references (if applicable)\nWe share an onboarding checklist to make it simple and structured.",
    },
    {
      question: "How are fees structured?",
      answer:
        "Our pricing depends on property type, service complexity, and urgency. Post-consultation, you’ll receive a detailed quotation—transparent, tailored, and free of hidden charges.",
    },
    {
      question:
        "Are services available for individual homeowners or only developers and CHS?",
      answer:
        "Absolutely. We support individual NRI homeowners managing personal assets, with solutions that are just as robust and process-oriented as our institutional offerings.",
    },
    {
      question: "Is my data secure with Azalea?",
      answer:
        "We apply structured digital protocols and controlled access systems to manage client information responsibly. Ensuring data confidentiality and integrity is central to our operational ethos.",
    },
    {
      question:
        "Does Azalea assist with dispute resolution or legal coordination?",
      answer:
        "While we don’t offer legal representation, our documentation and structured processes often play a crucial role in supporting dispute clarity. We also collaborate with legal advisors when needed to assist with case preparation.",
    },
    {
      question: "What is the typical turnaround time for service delivery?",
      answer:
        "Timelines vary by service scope and region. Typically, most inventory documentation and reporting are completed within 7–10 working days from onboarding.",
    },
    {
      question:
        "Can Azalea help with vendor onboarding or audits for CHS committees?",
      answer:
        "Yes. We assist CHS committees with vendor evaluation, onboarding documentation, and periodic audits—ensuring compliance, transparency, and operational control.",
    },
    {
      question: "Still have questions?",
      answer: (
        <>
          Contact us at{" "}
          <a
            href="mailto:contact@azaleaservices.co.in"
            className="text-[#187530] font-medium underline hover:text-green-800 transition-colors"
          >
            contact@azaleaservices.co.in
          </a>{" "}
          or tap the “Request Consultation” button for responsive, personalized
          support.
        </>
      ),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="bg-[#f2e9df] px-6 py-10" id="faq">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#187530] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our property management
            services. Can't find what you're looking for? Feel free to contact
            us directly.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-[#187530] pr-4 cursor-pointer">
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#187530] flex items-center justify-center transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openFAQ === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed mt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
      </div>
    </section>
  );
};

export default memo(FAQSection);
