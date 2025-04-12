import Image from 'next/image';
import Link from 'next/link';

interface BetterWomenProps {
  title?: string;
  description?: string;
  onSignUp?: () => void;
  onLogin?: () => void;
}

const BetterWomenComponent: React.FC<BetterWomenProps> = ({
  title = "Better Women Better World Inc.",
  description = "A dynamic startup fueled by a profound passion for catalyzing positive change in the lives of women and girls.",
  onSignUp = () => console.log("Sign up clicked"),
  onLogin = () => console.log("Login clicked")
}) => {
  return (
    <div className="flex flex-col items-center w-[352px] gap-7 p-4">
      {/* Title Section */}
      <h1 className="text-[40px] font-medium text-[#7171c1] text-center leading-[130%] tracking-[-0.7px]">
        {title}
      </h1>

      {/* Description */}
      <p className="text-sm text-[#3a3a3a] text-center leading-5">
        {description}
      </p>

      {/* Buttons */}
      <div className="flex gap-2.5 mt-4">
        <button 
          onClick={onLogin}
          className="w-[114px] h-[30px] bg-white border border-[#7171c1] rounded text-sm text-[#7171c1] hover:bg-gray-50 transition-colors"
        >
          Log in
        </button>
        <button 
          onClick={onSignUp}
          className="w-[114px] h-[30px] bg-[#7171c1] rounded text-sm text-white hover:bg-[#6161b1] transition-colors"
        >
          Sign up
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full rounded-lg overflow-hidden mt-4">
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-5L5wz4-w8v6SG_/componen-3.png"
          alt="Women together"
          width={329}
          height={328}
          className="w-full h-auto"
        />
      </div>

      {/* App Store Links */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-black">Available on</p>
        <div className="flex gap-2">
          <Link href="#" className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#f1f1f1] to-[#e1e1e1] rounded hover:opacity-90 transition-opacity">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-5L5wz4-w8v6SG_/pngwing.png"
              alt="App Store"
              width={18}
              height={18}
            />
            <span className="text-sm">AppStore</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-[#f1f1f1] to-[#e1e1e1] rounded hover:opacity-90 transition-opacity">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-5L5wz4-w8v6SG_/pngwing-2.png"
              alt="Play Store"
              width={18}
              height={18}
            />
            <span className="text-sm">Android Market</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetterWomenComponent;

