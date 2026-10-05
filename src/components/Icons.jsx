const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false };
const make = (children, extra = {}) => (props) => <svg {...base} {...extra} {...props}>{children}</svg>;

export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const ArrowLeft = make(<path d="M19 12H5M11 6l-6 6 6 6" />);
export const ChevronLeft = make(<path d="m15 6-6 6 6 6" />);
export const ChevronRight = make(<path d="m9 6 6 6-6 6" />);
export const Phone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);
export const Pin = make(<><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const Bed = make(<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5h.01" />);
export const Bath = make(<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2" />);
export const Area = make(<path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 20l6-6M20 4l-6 6" />);
export const Heart = ({ filled, ...p }) => (
  <svg {...base} fill={filled ? 'currentColor' : 'none'} {...p}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" /></svg>
);
export const Close = make(<path d="M6 6l12 12M18 6 6 18" />);
export const Menu = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const Search = make(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>);
export const Check = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>);
export const Key = make(<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l3 3M14 9l2 2" /></>, { strokeWidth: 1.6 });
export const Expand = make(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />);
export const Calendar = make(<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>);
export const Instagram = make(<><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.3" r=".6" fill="currentColor" /></>);
export const Linkedin = make(<path d="M5 9.5V19M5 5.5v.01M9.5 19v-5.5a3 3 0 0 1 6 0V19M9.5 9.5V19" />);
export const Facebook = make(<path d="M14 21v-8h2.7l.5-3.3H14V7.6c0-1 .5-1.8 1.9-1.8h1.5V3a18 18 0 0 0-2.4-.2c-2.5 0-4.1 1.5-4.1 4.2v2.7H8v3.3h2.9v8" />);
export const XSocial = make(<path d="M4 4l16 16M20 4 4 20" />);
