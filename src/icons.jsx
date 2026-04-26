// Icon set — minimal stroke icons. All accept className + size.
const Ic = ({ d, size = 18, fill, stroke = "currentColor", sw = 1.6, className = "ic", children }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24"
       fill={fill || "none"} stroke={stroke} strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children || <path d={d} />}
  </svg>
);

const I = {
  Home: (p) => <Ic {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></Ic>,
  Search: (p) => <Ic {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Ic>,
  Shield: (p) => <Ic {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/></Ic>,
  ShieldCheck: (p) => <Ic {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></Ic>,
  Calendar: (p) => <Ic {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></Ic>,
  Doc: (p) => <Ic {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></Ic>,
  User: (p) => <Ic {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c.5-4 4-6 8-6s7.5 2 8 6"/></Ic>,
  Settings: (p) => <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9A1.7 1.7 0 0 0 10 4.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V10a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></Ic>,
  Help: (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5"/><path d="M12 18h.01"/></Ic>,
  Bell: (p) => <Ic {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/></Ic>,
  Plus: (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>,
  Check: (p) => <Ic {...p}><path d="m5 12 4 4 10-10"/></Ic>,
  ArrowRight: (p) => <Ic {...p}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></Ic>,
  ArrowUp: (p) => <Ic {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></Ic>,
  ArrowUpRight: (p) => <Ic {...p}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></Ic>,
  Chevron: (p) => <Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>,
  ChevronRight: (p) => <Ic {...p}><path d="m9 6 6 6-6 6"/></Ic>,
  X: (p) => <Ic {...p}><path d="M6 6l12 12M18 6 6 18"/></Ic>,
  Lock: (p) => <Ic {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Ic>,
  Mail: (p) => <Ic {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></Ic>,
  Phone: (p) => <Ic {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></Ic>,
  // Insurance categories — bold simple glyphs
  Car: (p) => <Ic {...p}><path d="M5 17h14M6 17v-3l2-5h8l2 5v3M6 14h12"/><circle cx="8" cy="17" r="2" fill="currentColor"/><circle cx="16" cy="17" r="2" fill="currentColor"/></Ic>,
  Bike: (p) => <Ic {...p}><circle cx="6" cy="16" r="3"/><circle cx="18" cy="16" r="3"/><path d="M6 16 12 6h4l2 4-6 6"/></Ic>,
  House: (p) => <Ic {...p}><path d="M4 11 12 4l8 7v9h-5v-6h-6v6H4z"/></Ic>,
  Health: (p) => <Ic {...p}><path d="M12 21s-7-4-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 7-7 11-7 11Z"/><path d="M12 11v3M10.5 12.5h3"/></Ic>,
  Life: (p) => <Ic {...p}><path d="M12 21s-7-4-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 7-7 11-7 11Z"/></Ic>,
  Pet: (p) => <Ic {...p}><circle cx="6" cy="9" r="1.5"/><circle cx="10" cy="6" r="1.5"/><circle cx="14" cy="6" r="1.5"/><circle cx="18" cy="9" r="1.5"/><path d="M9 13c-2 1-3 4 0 5s3 1 6 0 3-4 0-5-3-1-6 0Z"/></Ic>,
  Plane: (p) => <Ic {...p}><path d="m3 13 7-1 4-7 2 1-2 7 7 2v2l-7-1-1 5-2-1 1-5-7-1z"/></Ic>,
  Briefcase: (p) => <Ic {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/></Ic>,
  Building: (p) => <Ic {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M9 19v-2h6v2"/></Ic>,
  Refresh: (p) => <Ic {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></Ic>,
  Download: (p) => <Ic {...p}><path d="M12 4v12M6 12l6 6 6-6M5 20h14"/></Ic>,
  Filter: (p) => <Ic {...p}><path d="M3 5h18M6 12h12M10 19h4"/></Ic>,
  Sun: (p) => <Ic {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5 7 17M17 7l1.5-1.5"/></Ic>,
  Moon: (p) => <Ic {...p}><path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z"/></Ic>,
  Card: (p) => <Ic {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 11h18M7 16h3"/></Ic>,
  Bolt: (p) => <Ic {...p}><path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z"/></Ic>,
  Star: (p) => <Ic {...p}><path d="m12 4 2.5 5.2 5.7.8-4.1 4 1 5.7L12 17l-5.1 2.7 1-5.7L3.8 10l5.7-.8Z"/></Ic>,
  Lang: (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Ic>,
  Logout: (p) => <Ic {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></Ic>,
  Menu: (p) => <Ic {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Ic>,
  EyeOff: (p) => <Ic {...p}><path d="M3 3l18 18"/><path d="M10.6 6.1A10 10 0 0 1 21 12a13 13 0 0 1-2.4 3.4M6.6 6.6A13 13 0 0 0 3 12a10 10 0 0 0 12.5 5.5"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></Ic>,
  Eye: (p) => <Ic {...p}><path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z"/><circle cx="12" cy="12" r="3"/></Ic>,
};

window.I = I;
