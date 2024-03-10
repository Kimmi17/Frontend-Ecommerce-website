import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { locationOutline, callOutline, mailOutline } from "ionicons/icons";

const ContactUsPage: React.FC = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    // Reset form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <div className="flex justify-between">
        {/* Contact information */}
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-item flex mb-4">
              <IonIcon icon={locationOutline} className="mr-2" />
              <p>
                28 Nguyen Trai, Ben Thanh Ward, District 1, Ho Chi Minh City
              </p>
            </div>
            <div className="contact-item flex mb-4">
              <IonIcon icon={callOutline} className="mr-2" />
              <p>Phone: 1900 6909</p>
            </div>
            <div className="contact-item flex mb-4">
              <IonIcon icon={mailOutline} className="mr-2" />
              <p>
                Email:{" "}
                <a href="mailto:orders@vascara.com">orders@vascara.com</a>
              </p>
            </div>
          </div>
        </div>
        {/* Contact form */}
        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mb-4 p-2 rounded border border-gray-300"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="mb-4 p-2 rounded border border-gray-300"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              rows={4}
              className="mb-4 p-2 rounded border border-gray-300 resize-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
