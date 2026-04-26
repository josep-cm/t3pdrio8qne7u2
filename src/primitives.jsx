// Shared small components

function Logo({ size = "md", invert = false }) {
  const dim = size === "lg" ? 36 : size === "sm" ? 26 : 30;
  const fs = size === "lg" ? 26 : size === "sm" ? 18 : 22;
  const bg = invert ? "var(--canvas)" : "var(--ink)";
  const fg = invert ? "var(--ink)" : "var(--canvas)";
  return (
    <div className="logo">
      <div className="logo-mark" style={{ width: dim, height: dim, background: bg, color: fg }}>
        <svg width={dim*0.62} height={dim*0.62} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2.6" fill="currentColor"/>
        </svg>
      </div>
      <div className="logo-text" style={{ fontSize: fs, color: invert ? "var(--canvas)" : "var(--ink)" }}>
        Seguro<em>Directo</em>
      </div>
    </div>
  );
}

function Pill({ children, variant = "default", className = "" }) {
  return <span className={`pill ${variant === "default" ? "" : variant} ${className}`}>{children}</span>;
}

function Field({ label, hint, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
      {hint && <div style={{fontSize:12,color:"var(--ink-mute)"}}>{hint}</div>}
    </div>
  );
}

function Input(props) {
  return <input className="input" {...props} />;
}

function Select({ children, ...rest }) {
  return (
    <div style={{position:"relative"}}>
      <select className="select" style={{paddingRight:36, appearance:"none"}} {...rest}>{children}</select>
      <div style={{position:"absolute", right:12, top:0, height:44, display:"grid", placeItems:"center", pointerEvents:"none", color:"var(--ink-mute)"}}>
        <I.Chevron size={16} />
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label, sub }) {
  return (
    <button type="button" className={"checkbox " + (checked ? "on" : "")} onClick={() => onChange && onChange(!checked)}>
      <span className="check-box">{checked && <I.Check size={12} sw={2.6} />}</span>
      <span style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2,textAlign:"left"}}>
        <span style={{fontSize:14,fontWeight:500}}>{label}</span>
        {sub && <span style={{fontSize:12,color:"var(--ink-mute)"}}>{sub}</span>}
      </span>
    </button>
  );
}

function Radio({ value, onChange, options }) {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
      {options.map(opt => {
        const on = value === opt.value;
        return (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
            style={{
              flex:"1 1 140px",
              padding:"14px 16px", borderRadius:12, cursor:"pointer",
              border:"1px solid " + (on ? "var(--ink)" : "var(--rule)"),
              background: on ? "color-mix(in oklab, var(--ink) 4%, var(--paper))" : "var(--paper)",
              textAlign:"left", fontFamily:"inherit", color:"var(--ink)",
              display:"flex",alignItems:"center",gap:12,transition:"all .18s"
            }}>
            <span style={{
              width:18,height:18,borderRadius:"50%",
              border:"1.5px solid " + (on ? "var(--ink)" : "var(--rule)"),
              display:"grid",placeItems:"center",flexShrink:0
            }}>
              {on && <span style={{width:8,height:8,borderRadius:"50%",background:"var(--ink)"}}/>}
            </span>
            <span style={{fontSize:14,fontWeight:500}}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Geometric placeholder visual — abstract shape composition
function GeoVisual({ variant = "blue", style = {} }) {
  const palettes = {
    blue:  ["#2D55F5", "#0B1220", "#5C7BFF"],
    green: ["#0E9F6E", "#0B1220", "#7DD3B2"],
    warm:  ["#E0A45C", "#0B1220", "#F4C58A"],
    night: ["#0B1220", "#1A2236", "#2D55F5"],
  };
  const [a, b, c] = palettes[variant] || palettes.blue;
  return (
    <div style={{position:"relative",borderRadius:18,overflow:"hidden",
      background:`linear-gradient(140deg, ${b}, ${a})`, ...style}}>
      <svg viewBox="0 0 200 200" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
        <defs>
          <radialGradient id={`g-${variant}`} cx="80%" cy="20%" r="60%">
            <stop offset="0%" stopColor={c} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={c} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#g-${variant})`}/>
        <circle cx="160" cy="40" r="40" fill={c} fillOpacity="0.35"/>
        <circle cx="40" cy="170" r="55" fill={a} fillOpacity="0.55"/>
        <path d="M0 120 Q 80 80 200 140" stroke={c} strokeOpacity="0.4" strokeWidth="1" fill="none"/>
        <path d="M0 100 Q 100 60 200 110" stroke={c} strokeOpacity="0.25" strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}

Object.assign(window, { Logo, Pill, Field, Input, Select, Checkbox, Radio, GeoVisual });
