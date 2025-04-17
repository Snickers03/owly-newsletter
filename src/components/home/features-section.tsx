import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      icon: "/icons/feature-1.png",
      title: "Drag & Drop Editor",
      description:
        "Easily customize your newsletter without writing a single line of code.",
      delay: "0",
    },
    {
      icon: "/icons/feature-2.png",

      title: "Live Data Sources",
      description:
        "Get real-time updates on weather, stocks, and inspirational quotes.",
      delay: "100",
    },
    {
      icon: "/icons/feature-3.png",

      title: "Custom Delivery Schedule",
      description:
        "Choose how often your newsletter gets delivered – daily, weekly, monthly.",
      delay: "200",
    },
  ];

  return (
    <section className='relative w-full overflow-hidden py-12 md:py-24 lg:py-32'>
      <div className='relative container mx-auto px-4 md:px-6'>
        <div className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='inline-block rounded-lg border border-gray-200/30 bg-white/10 px-3 py-1 text-sm shadow-sm backdrop-blur-sm'>
            Features
          </div>
          <h2 className='bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl'>
            Powerful & Intuitive
          </h2>
          <p className='max-w-[800px] text-gray-600 md:text-xl/relaxed'>
            Everything you need to create and manage your personal newsletter
            with ease.
          </p>
        </div>

        <div className='grid w-full gap-8 md:grid-cols-3 md:gap-12'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative'
              style={{
                animationDelay: `${feature.delay}ms`,
              }}
            >
              <div className='relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                <div className='absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-5'>
                  <div className='absolute inset-0 bg-gradient-to-br from-amber-400/80 to-amber-500/80'></div>
                </div>

                <div className='mb-5 flex items-center justify-center'>
                  <div className='flex items-center justify-center pb-3'>
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={62}
                      height={62}
                    />
                  </div>
                </div>

                <h3 className='mb-2 text-xl font-bold'>{feature.title}</h3>
                <p className='text-gray-500'>{feature.description}</p>

                <div className='${feature.gradient} absolute bottom-0 left-0 h-1 w-0 rounded-b-lg bg-gradient-to-r opacity-50 transition-all duration-300 ease-in-out group-hover:w-full'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
