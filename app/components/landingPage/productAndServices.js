'use client'
import { useRouter } from "next/navigation";

const services = [
    {
      title: "Custom AI Chatbots",
      description:
        "We build advanced, domain-specific AI chatbots for your business using GPT-4, LLaMA, and custom LLMs.",
      price: "$499 onwards",
      link: "/llm?llmModel=llama3.1&name=LLama3"
    },
    {
      title: "PRICE TRACKER",
      description:
        "Generate blog posts, product descriptions, and marketing copy with our tailored AI tools.",
      price: "$99/month",
      link: "/dex"
    },
    {
      title: "Mobile Data Tracker",
      description:
        "Automate insights from your business data using AI-powered dashboards and reports.",
      price: "$999/project",
      link: "/mobileInfo"
    },
  ];
  
export const Card = (
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-2xl border bg-gray-900 text-white shadow-md ${className}`}
      {...props}
    />
  )
);


export const CardContent = (
    ({ className = "", ...props }, ref) => (
      <div ref={ref} className={`p-4 ${className}`} {...props} />
    )
  );

export default function ProductAndServices() {
    const router = useRouter(); 
  const handleProductClick = (link) => {
      router.push(link)
    }
    return (
    <section className="max-w-6xl mx-auto mb-24">
    <h2 className="text-3xl font-semibold text-center mb-10">Our Products & Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <Card onClick={()=>{handleProductClick(service.link)}} key={index} className="bg-gray-900 border border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <div className="text-lg font-semibold">{service.price}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
  )
}