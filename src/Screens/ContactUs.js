import React from 'react'
import Layout from "../Layout/Layout";
import Head from "../Components/Head";
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi';

const ContactUs = () => {
  const ContactData = [
    {
      id: 1,
      title: "Emails Us",
      info: "Interactively grow backend ideas for cross-platform models.",
      icon: FiMail,
      contact: "dimasfadilah20@gmail.com",
    },
    {
      id: 2,
      title: "Calls Us",
      info: "Distictively exploit optimal aligments for intuitive bandwith.",
      icon: FiPhoneCall,
      contact: "+6281334034303",
    },
    {
      id: 2,
      title: "Location",
      info: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: FiMapPin,
      contact: "",
    },
    
  ]
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid md:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {
              ContactData.map((item) => (
                <div key={item.id} className='border border-border flex-cols p-10 bg-dry rounded-lg text-center items-center'>
                  <span className='flex-cols w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl items-center'>
                    <item.icon />
                  </span>
                  <h5 className='text-xl font-semibold mb-2'>{item.title}</h5>
                  <p className='mb-0 text-sm text-text leading-7'>
                    <a href={`mailto:${item.contact}`} className='text-blue-600'>{item.contact}  </a>
                     {item.info}
                  </p>
                </div>
              ))
          }
        </div>
      </div>
    </Layout>    
  )
}

export default ContactUs