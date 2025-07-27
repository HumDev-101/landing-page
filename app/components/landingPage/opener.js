import Button from "../common/button";


const Opener = () => {
    return (  
             <section className="max-w-5xl mx-auto text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      AI Solutions for Modern Businesses
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-6">
                      Unlock productivity and growth with intelligent automation, data-driven insights, and generative AI services.
                    </p>
                    <Button className="text-lg px-6 py-3 rounded-xl">Get Started</Button>
                </section>
    );
}
 
export default Opener;