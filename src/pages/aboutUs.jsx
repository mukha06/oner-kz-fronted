const AboutUs = () => {
  return (
    <div className="font-sans text-gray-900">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold">About us</h1>
      </section>

      <section className="bg-blue-600 text-white py-12 px-6 md:px-20">
        <h2 className="text-xl font-semibold mb-4">OUR MISSION</h2>
        <p className="max-w-3xl text-sm leading-relaxed">
          Collaboratively envisioned empowered markets via plug-and-play networks.
          Dynamically procrastinate B2C users after installed base benefits.
          Dramatically visualize customer-directed convergence without revolutionary ROI.
        </p>
      </section>

      <section className="relative text-white py-20 px-6 md:px-20"style={{backgroundImage: "url('https://images.unsplash.com/photo-1612831455546-b6b3d27c8fe2?auto=format&fit=crop&w=1470&q=80')",backgroundSize: 'cover',backgroundPosition: 'center',}}>
        <div className="bg-black bg-opacity-60 p-8 md:max-w-2xl rounded-lg">
          <h2 className="text-xl font-semibold mb-4">OUR VISION</h2>
          <p className="text-sm leading-relaxed">
            Efficiently unleash cross-media information without cross-media value.
            Quickly maximize timely deliverables for real-time schemas.
            Dramatically maintain clicks-and-mortar solutions without functional solutions.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-20">
        <h2 className="text-xl font-semibold text-blue-600 mb-6">OUR VALUES</h2>
        <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
          <li>Collaborative thinking and integrity.</li>
          <li>Innovation and continuous improvement.</li>
          <li>Customer-centric approach.</li>
          <li>Respect, diversity, and inclusion.</li>
        </ul>
      </section>

      <section className="py-12 px-6 md:px-20 bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { name: 'Raymond Dall', role: 'Developer' },
            { name: 'Lisa Watts', role: 'Designer' },
            { name: 'Lucas West', role: 'Leader' },
            { name: 'Grace Carter', role: 'Content' },
          ].map((member, index) => (
            <div key={index}>
              <img src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`}alt={member.name}className="w-full h-48 object-cover rounded-lg mb-3"/>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
