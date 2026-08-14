import headedDesktopImage from "../assets/images/projects/headedthere/headedthere-desktop.png";
import headedMobileImage from "../assets/images/projects/headedthere/headedthere-mobile.png";
import logoDesktopImage from "../assets/images/projects/logowebagency/logowebagency-desktop.png";
import logoMobileImage from "../assets/images/projects/logowebagency/logowebagency-mobile.png";
import mformaddyDesktopImage from "../assets/images/projects/mformaddy/mformaddy-desktop.png";
import mformaddyMobileImage from "../assets/images/projects/mformaddy/mformaddy-mobile.png";
import maddyDesktopImage from "../assets/images/projects/maddy/maddy-desktop.png";
import maddyMobileImage from "../assets/images/projects/maddy/maddy-mobile.png";

export const projects = [
  {
    id: "01",
    title: "Headed There Anyway",
    subtitle: "Crowdsourced Logistics Platform",
    name:"LOGISTICS",
    service: ["UI/UX", "Web Development", "Responsive Design"],
    overview:
      "A modern logistics platform that connects travelers with people who need items transported. Designed to simplify package delivery through crowdsourced transportation, featuring intuitive search, route management, transport listings, and a clean user experience focused on speed, trust, and accessibility.",
    desktopImage: headedDesktopImage,
    mobileImage: headedMobileImage,
    wireframe: "",
    href: "https://headedthereanyway.com",
  },

  {
    id: "02",
    title: "Logo Web Agency",
    name:"CREATIVE",
    subtitle: "Creative Digital Agency",
    service: ["UI/UX", "Web Development", "Brand Identity"],
    overview:
      "A premium website crafted for a modern web agency to showcase digital services, attract new clients, and establish a strong online presence. The design emphasizes bold typography, immersive visuals, elegant interactions, and a refined editorial layout that reflects creativity and professionalism.",
    desktopImage: logoDesktopImage,
    mobileImage: logoMobileImage,
    wireframe: "",
    href: "https://logowebagency.com",
  },

  {
    id: "03",
    title: "MForMaddy",
    subtitle: "Creative Agency Portfolio",
    name:"CREATIVE",
    service: ["UI/UX", "Creative Direction", "Web Development"],
    overview:
      "A futuristic portfolio website designed for a creative agency specializing in branding, web design, and digital experiences. Built with striking visuals, bold typography, and interactive layouts to create an engaging experience while showcasing services, featured work, and client success stories.",
    desktopImage: mformaddyDesktopImage,
    mobileImage: mformaddyMobileImage,
    wireframe: "",
    href: "https://mformaddy.com/",
  },

  {
    id: "04",
    title: "Mahad Khan",
    subtitle: "Personal Developer Portfolio",
    name:"PORTFOLIO",
    service: ["UI/UX", "Frontend", "Personal Branding"],
    overview:
      "A minimalist personal portfolio designed to present projects, skills, and creative expertise through a refined editorial aesthetic. Combining modern typography, thoughtful spacing, and clean layouts, the website creates a premium experience while highlighting selected work and professional capabilities.",
    desktopImage: maddyDesktopImage,
    mobileImage: maddyMobileImage ,
    wireframe: "",
    href: "https://maady.netlify.app/",
  },
];
