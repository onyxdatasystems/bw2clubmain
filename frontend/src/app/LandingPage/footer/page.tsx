<<<<<<< HEAD
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
=======
import Image from 'next/image';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

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
<<<<<<< HEAD
  },
}: FooterProps) => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      },
    });

    tl.from(logoRef.current, { y: -40, opacity: 0, duration: 1, ease: 'power3.out' })
      .from(addressRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from(emailRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from(socialRef.current, { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6');
  }, []);

  return (
    <footer ref={footerRef} className="w-full px-4 py-14">
      <div className="mx-auto max-w-[1084px] rounded-[36px] bg-gradient-to-r from-[#7171C1] to-[#3E3574] p-8 sm:p-12">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Logo */}
          <div ref={logoRef} className="relative h-24 w-28">
=======
  }
}: FooterProps) => {
  return (
    <footer className="w-full px-4 py-14">
      <div className="mx-auto max-w-[1084px] rounded-[36px] bg-gradient-to-r from-[#7171C1] to-[#3E3574] p-12">
        <div className="flex flex-col items-center">
          <div className="relative h-[104px] w-[113px]">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-5PXwz4-w8v6SHK/logo.png"
              alt={`${companyName} logo`}
              fill
              className="object-contain"
            />
          </div>

<<<<<<< HEAD
          {/* Address */}
          <div ref={addressRef} className="flex flex-col items-center gap-2.5">
            <h3 className="text-xl font-medium text-white">Address</h3>
            <p className="text-base font-medium text-white max-w-xs sm:max-w-md">
=======
          <div className="mt-10 flex flex-col items-center gap-2.5">
            <h3 className="text-xl font-medium text-white">Address</h3>
            <p className="text-center text-base font-medium text-white">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              {address}
            </p>
          </div>

<<<<<<< HEAD
          {/* Email */}
          <div ref={emailRef} className="flex flex-col items-center gap-2.5">
=======
          <div className="mt-10 flex flex-col items-center gap-2.5">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            <h3 className="text-xl font-medium text-white">Email</h3>
            <a
              href={`mailto:${email}`}
              className="text-base font-medium text-white hover:underline"
            >
              {email}
            </a>
          </div>

<<<<<<< HEAD
          {/* Social Icons */}
          <div ref={socialRef} className="flex gap-6 mt-6">
            <Link href={socialLinks.facebook} target="_blank" aria-label="Facebook">
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={32}
                height={32}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href={socialLinks.linkedin} target="_blank" aria-label="LinkedIn">
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href={socialLinks.instagram} target="_blank" aria-label="Instagram">
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
                className="hover:scale-110 transition-transform"
              />
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-base font-medium text-white mt-10">
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            © {companyName} | Developed by
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
<<<<<<< HEAD
=======

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
