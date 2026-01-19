import type { ReactNode } from 'react';

type CTASectionProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  reverse?: boolean;
  children?: ReactNode;
};

export function CTASection({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  reverse = false,
  children 
}: CTASectionProps) {
  return (
    <section className={`py-20 ${reverse ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`container mx-auto px-4 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
          <a 
            href={buttonLink}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            {buttonText}
          </a>
        </div>
        <div className="md:w-1/2">
          {children || (
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Image/Illustration</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
