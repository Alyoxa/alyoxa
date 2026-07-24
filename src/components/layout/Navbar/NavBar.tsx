import Image from 'next/image';
import alyoxaLogo from "@/assets/images/logo/alyoxaLogo.png";
import Link from "next/link";

export default function Navbar(){


    return(
        <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center mx-auto max-w-8xl px-6 py-6 w-full">
            {/* Logo */}
            <Link href="/">
                <Image 
                    src={alyoxaLogo} 
                    alt="ALYOXA" 
                    className="w-56 h-auto" 
                    priority
                />
            </Link>

            <nav>
                <ul className="flex items-center space-x-8">
                    <li className="text-base font-medium"><Link href="#">Home</Link></li>
                    <li className="text-base font-medium"><Link href="#">Projects</Link></li>
                    <li className="text-base font-medium"><Link href="#">Services</Link></li>
                    <li className="text-base font-medium"><Link href="#">About</Link></li>
                    <li className="text-base font-medium"><Link href="#">Contact</Link></li>
                </ul>                
            </nav>

            {/* CTA Button */}
        
            <button className="text-base border-2 rounded-lg border-zinc-800 px-7 py-3 cursor-pointer hover:bg-black hover:text-white shadow-xl/30 shadow-zinc-800">
                Let's Talk
            </button>
        </header>

    );


}