import Image from 'next/image';

interface FooterProps {
  companyName?: string;
  address?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const Footer = ({
  companyName = 'Better Women Better World',
  address = '651 N Broad St. suite 201, Middletown, New Castle Country, Delaware, USA',
  email = 'info@betterwomenbetterworld.com',
  socialLinks = {
    facebook: '#',
    linkedin: '#',
    instagram: '#',
  }
}: FooterProps) => {
  return (
    <footer className="w-full px-4 py-14">
      <div className="mx-auto max-w-[1084px] rounded-[36px] bg-gradient-to-r from-[#7171C1] to-[#3E3574] p-12">
        <div className="flex flex-col items-center">
          <div className="relative h-[104px] w-[113px]">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-5PXwz4-w8v6SHK/logo.png"
              alt={`${companyName} logo`}
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-2.5">
            <h3 className="text-xl font-medium text-white">Address</h3>
            <p className="text-center text-base font-medium text-white">
              {address}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2.5">
            <h3 className="text-xl font-medium text-white">Email</h3>
            <a
              href={`mailto:${email}`}
              className="text-base font-medium text-white hover:underline"
            >
              {email}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="relative h-12 w-[177px]">
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-5PXwz4-w8v6SHK/frame-20.png"
                alt="Social media icons"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="mt-10 text-base font-medium text-white">
            © {companyName} | Developed by
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

