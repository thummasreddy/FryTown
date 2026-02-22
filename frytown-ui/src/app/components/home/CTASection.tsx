type CTASectionProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
};

export function CTASection({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  imageUrl,
  imageAlt,
  reverse = false
}: CTASectionProps) {
  return (
    <section className={`py-16 md:py-24 ${reverse ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`container mx-auto px-4 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">{title}</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">{subtitle}</p>
          <a 
            href={buttonLink}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 transform hover:scale-105"
          >
            {buttonText}
          </a>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative rounded-xl overflow-hidden shadow-xl h-80 md:h-96 w-full">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function JoinFamilySection() {
  return (
    <CTASection
      title="JOIN OUR FAMILY"
      subtitle="Become part of the FryTown family and enjoy exclusive offers, early access to new menu items, and special events."
      buttonText="Sign Up Now"
      buttonLink="/signup"
      imageUrl="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
      imageAlt="Happy family enjoying a meal together"
    />
  );
}

export function ShakeUpSection() {
  return (
    <CTASection
      title="SHAKE UP YOUR TASTEBUDS"
      subtitle="Discover our mouth-watering menu featuring the crispiest fries and juiciest burgers in town. Every bite is a flavor explosion!"
      buttonText="View Menu"
      buttonLink="/menu"
      imageUrl="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
      imageAlt="Delicious burger and fries"
      reverse
    />
  );
}
