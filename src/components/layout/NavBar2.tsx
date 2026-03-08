import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo/nirava_logo.png";
import BookAppointmentModal from "../global/book-appointment/BookAppointmentModal";

interface NavItem {
  name: string;
  to: string;
}

const NavBar2: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks: NavItem[] = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Our Services", to: "/service" },
  ];

  const rightLinks: NavItem[] = [
    { name: "Gallery", to: "/gallery" },
    // { name: "FAQ", to: "/faq" },
    { name: "Contact Us", to: "/contact" },
  ];

  const allLinks: NavItem[] = [...leftLinks, ...rightLinks];

  const navLinkStyle = ({ }: { isActive: boolean }) =>
    `font-semibold transition-all duration-300 ${
      scrolled ? "text-sm" : "text-base"
    }`;

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all ${
          scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-white"
        }`}
        style={{
          borderBottom: "1px solid",
          borderImage:
            "linear-gradient(to right, transparent, var(--color-primary), transparent) 1",
        }}
      >
        {/* ===== Desktop Nav ===== */}
        <div
          className={`hidden md:flex max-w-5xl mx-auto items-center justify-between transition-all duration-300 ${
            scrolled ? "py-2" : "py-6"
          }`}
        >
          {/* Left Links */}
          <ul
            className={`flex items-center transition-all duration-300 ${
              scrolled ? "gap-12" : "gap-12"
            }`}
          >
            {leftLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({  }) =>
                    `group relative font-semibold transition-all duration-300 ${
                      scrolled ? "text-sm" : "text-base"
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--color-text-main)",
                  })}
                >
                  {({ isActive }) => (
                    <span className="relative inline-block">
                      {link.name}
                      <span
                        className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "var(--color-primary)" }}
                      />
                      <span
                        className="absolute left-0 -bottom-1 h-[2px] transition-all duration-300"
                        style={{
                          width: isActive ? "100%" : "0%",
                          background: "var(--color-primary)",
                        }}
                      />
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <Link to="/" className="flex justify-center">
            <img
              src={logo}
              alt="Nirava"
              className={`transition-all duration-300 ${
                scrolled ? "h-12" : "h-20"
              }`}
            />
          </Link>

          {/* Right Links */}
          <div className="flex items-center gap-10">
            <ul
              className={`flex items-center transition-all duration-300 ${
                scrolled ? "gap-12" : "gap-12"
              }`}
            >
              {rightLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative font-semibold transition-all duration-300 ${
                        scrolled ? "text-sm" : "text-base"
                      } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--color-primary)] after:transition-all after:duration-300 hover:after:w-full ${
                        isActive
                          ? "after:w-full text-[var(--color-primary)]"
                          : ""
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--color-primary)"
                        : "var(--color-text-main)",
                    })}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setOpen(true)}
              className={`btn-primary tracking-wider transition-all duration-300 ml-5 ${
                scrolled ? "px-4 py-2 text-sm" : "px-8 py-3"
              }`}
            >
              Book Enquiry
            </button>
          </div>
        </div>

        {/* ===== Mobile Top Bar ===== */}
        {/* ===== Mobile Top Bar ===== */}
<div className="md:hidden relative flex items-center justify-between px-6 py-4">

{/* Logo */}
<Link to="/">
  <img src={logo} alt="Nirava" className="h-12 w-auto" />
</Link>

{/* Center Modal Button */}
<div className="relative items-center pr-5 justify-center">
<button
  onClick={() => setOpen(true)}
  className="btn-primary px-3 py-1.5 text-xs tracking-wider"
>
  Book Enquiry
</button>
</div>

{/* Menu Icon */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="text-4xl leading-none"
  style={{ color: "var(--color-text-main)" }}
>
  {isOpen ? "✕" : "☰"}
</button>

</div>
      </header>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[1000]"
          onClick={() => setIsOpen(false)}
        />
      )}

     {/* ================= DRAWER ================= */}
<div
  className={`fixed top-0 right-0 w-64 h-screen bg-white shadow-xl z-[1001] transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-6 mt-20 flex flex-col items-center text-center">
    
    <ul className="flex flex-col space-y-6 items-center">
      {allLinks.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => navLinkStyle({ isActive })}
            style={({ isActive }) => ({
              color: isActive
                ? "var(--color-primary)"
                : "var(--color-text-main)",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "6px",
            })}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>

   

  </div>
</div>

<BookAppointmentModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default NavBar2;
