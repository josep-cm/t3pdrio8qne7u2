// Dashboard shell — Sidebar + Topbar + page router

const NAV_ITEMS = [
  { id:"inicio", label:"Inicio", ic: I.Home, group:"main" },
  { id:"comparar", label:"Comparar seguros", ic: I.Search, group:"main" },
  { id:"mis-seguros", label:"Mis seguros", ic: I.Shield, group:"main" },
  { id:"renovaciones", label:"Renovaciones", ic: I.Refresh, group:"main" },
  { id:"documentos", label:"Documentos", ic: I.Doc, group:"main" },
  { id:"perfil", label:"Perfil", ic: I.User, group:"cuenta" },
  { id:"ajustes", label:"Ajustes", ic: I.Settings, group:"cuenta" },
  { id:"soporte", label:"Soporte", ic: I.Help, group:"cuenta" },
];

function Sidebar({ active, setActive, onLogout, collapsed, onToggle }) {
  const main = NAV_ITEMS.filter(n => n.group === "main");
  const cuenta = NAV_ITEMS.filter(n => n.group === "cuenta");
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <Logo size="sm"/>
      </div>
      <div className="sb-section">Plataforma</div>
      {main.map(it => {
        const Icon = it.ic;
        return (
          <div key={it.id} className={"sb-item " + (active === it.id ? "active" : "")} onClick={() => setActive(it.id)} title={collapsed ? it.label : ""}>
            <Icon className="ic"/> <span>{it.label}</span>
          </div>
        );
      })}
      <div className="sb-section">Cuenta</div>
      {cuenta.map(it => {
        const Icon = it.ic;
        return (
          <div key={it.id} className={"sb-item " + (active === it.id ? "active" : "")} onClick={() => setActive(it.id)} title={collapsed ? it.label : ""}>
            <Icon className="ic"/> <span>{it.label}</span>
          </div>
        );
      })}
      <div className="sb-spacer"/>
      <div className="sb-help" style={{padding:14,margin:"12px 6px",background:"var(--paper)",border:"1px solid var(--rule)",borderRadius:"var(--r-md)"}}>
        <div className="mono" style={{fontSize:10}}>NECESITAS AYUDA</div>
        <div style={{fontFamily:"var(--display)",fontSize:18,marginTop:6,letterSpacing:"-.01em",lineHeight:1.15}}>Habla con un asesor humano.</div>
        <button className="btn btn-primary btn-sm" style={{width:"100%",marginTop:10}} onClick={() => setActive("soporte")}>Contactar</button>
      </div>
      <div className="sb-item" onClick={onLogout} style={{marginTop:4}} title={collapsed ? "Cerrar sesión" : ""}>
        <I.Logout className="ic"/> <span className="sb-logout-label">Cerrar sesión</span>
      </div>
    </aside>
  );
}

function TopBar({ active, setActive, onToggleSidebar, user }) {
  const it = NAV_ITEMS.find(n => n.id === active);
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",height:64,borderBottom:"1px solid var(--rule-2)",background:"var(--canvas)",position:"sticky",top:0,zIndex:20,gap:16}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onToggleSidebar} className="iconbtn" title="Mostrar/ocultar menú" style={{flexShrink:0}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
        <div className="crumbs" style={{fontFamily:"var(--mono)",fontSize:13,color:"var(--ink-mute)",letterSpacing:".06em",textTransform:"uppercase",whiteSpace:"nowrap"}}>
          SeguroDirecto / {it ? it.label : ""}
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <div className="topbar-search" style={{position:"relative",width:280,display:"flex",alignItems:"center"}}>
          <svg style={{position:"absolute",left:12,pointerEvents:"none",color:"var(--ink-mute)",zIndex:1}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <input className="input" placeholder="Busca un seguro, documento…" style={{height:36,fontSize:13,paddingLeft:36,paddingRight:12,width:"100%"}}/>
        </div>
        <button className="iconbtn" style={{flexShrink:0}}><I.Bell size={16} className=""/></button>
        <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--blue),var(--ink))",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,cursor:"pointer",flexShrink:0}} onClick={() => setActive("perfil")} title="Mi perfil">
          {(user?.email || "U")[0].toUpperCase()}
        </div>
      </div>
      <style>{`@media(max-width:640px){.topbar-search{display:none!important}}`}</style>
    </div>
  );
}

const MOB_NAV = [
  { id:"inicio", label:"Inicio", ic: I.Home },
  { id:"comparar", label:"Comparar", ic: I.Search },
  { id:"mis-seguros", label:"Seguros", ic: I.Shield },
  { id:"perfil", label:"Perfil", ic: I.User },
];

function MobNav({ active, setActive }) {
  return (
    <nav className="mob-nav">
      {MOB_NAV.map(it => {
        const Icon = it.ic;
        return (
          <button key={it.id} className={"mob-nav-item " + (active === it.id ? "active" : "")}
            onClick={() => setActive(it.id)}>
            <Icon size={22}/>
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// Dashboard inicio page
function DashboardHome({ user, setActive }) {
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Tu panel · 26 abril 2026</span>
          <h1>Hola, <em>{(user?.email || "Marta").split("@")[0]}</em>.</h1>
        </div>
        <div className="row gap-sm">
          <button className="btn btn-ghost" onClick={() => setActive("documentos")}><I.Download size={14}/> Mis documentos</button>
          <button className="btn btn-blue" onClick={() => setActive("comparar")}><I.Plus size={14}/> Nuevo seguro</button>
        </div>
      </div>

      <div className="stat-row stag">
        <div className="stat">
          <span className="lbl">Seguros activos</span>
          <span className="val">04</span>
          <span className="sub">Coche, hogar, salud y mascota.</span>
        </div>
        <div className="stat">
          <span className="lbl">Próximas renovaciones</span>
          <span className="val">02</span>
          <span className="sub">Las dos en los próximos 60 días.</span>
        </div>
        <div className="stat">
          <span className="lbl">Recomendaciones</span>
          <span className="val">03</span>
          <span className="sub">Basadas en tu perfil actual.</span>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}} className="dh-grid">
        <div className="card" style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:18}}>
            <div>
              <span className="eyebrow">Próximas renovaciones</span>
              <h3 className="display" style={{fontSize:32,margin:"6px 0 0",letterSpacing:"-.01em"}}>Lo que <em style={{color:"var(--blue)",fontStyle:"italic"}}>vence</em> pronto.</h3>
            </div>
            <button className="btn btn-soft btn-sm" onClick={() => setActive("renovaciones")}>Ver todo <I.ArrowRight size={12}/></button>
          </div>
          {[
            {ic:I.Car,name:"Coche · Todo riesgo",company:"AsegurArt", date:"14 NOV 2026", days:21, price:"58 €/mes"},
            {ic:I.House,name:"Hogar · Plus", company:"Norden Seguros", date:"02 ENE 2027", days:54, price:"22 €/mes"},
          ].map((p, i) => {
            const Icon = p.ic;
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 0",borderTop: i ? "1px solid var(--rule-2)" : "none"}}>
                <div className="pol-logo"><Icon size={22}/></div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{p.name}</div>
                  <div style={{fontSize:12,color:"var(--ink-mute)",fontFamily:"var(--mono)",letterSpacing:".06em",marginTop:2}}>{p.company} · {p.date}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"var(--display)",fontSize:22}}>{p.price}</div>
                  <div style={{fontSize:11,color:"var(--ink-mute)",fontFamily:"var(--mono)",letterSpacing:".06em"}}>EN {p.days} DÍAS</div>
                </div>
                <button className="btn btn-ghost btn-sm">Revisar</button>
              </div>
            );
          })}
        </div>

        <div className="card" style={{padding:24,background:"var(--ink)",color:"var(--canvas)",borderColor:"var(--ink)"}}>
          <span className="eyebrow" style={{color:"#9CA5BC"}}>Recomendado para ti</span>
          <h3 className="display" style={{fontSize:32,margin:"6px 0 14px",color:"var(--canvas)",letterSpacing:"-.01em",lineHeight:1.05}}>
            Mejora la <em style={{color:"#7FA8FF",fontStyle:"italic"}}>cobertura</em> de tu hogar.
          </h3>
          <p style={{margin:0,fontSize:14,color:"#B5BCD0",lineHeight:1.55}}>
            Por tu perfil, podrías subir a una cobertura Plus por un coste similar al actual. Compara opciones en 1 minuto.
          </p>
          <button className="btn btn-blue btn-sm" style={{marginTop:18}} onClick={() => setActive("comparar")}>
            Comparar hogar <I.ArrowRight size={12}/>
          </button>
          <div style={{marginTop:24,paddingTop:16,borderTop:"1px solid rgba(255,255,255,.12)",fontSize:12,color:"#7884A8",fontFamily:"var(--mono)",letterSpacing:".08em",textTransform:"uppercase"}}>
            Basado en tus datos de perfil
          </div>
        </div>
      </div>

      <div style={{height:18}}/>

      <div className="card" style={{padding:24}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:18}}>
          <div>
            <span className="eyebrow">Atajos</span>
            <h3 className="display" style={{fontSize:28,margin:"6px 0 0",letterSpacing:"-.01em"}}>Lo que probablemente buscabas.</h3>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}} className="shortcuts-grid">
          {[
            {ic:I.Plus,t:"Contratar nuevo",d:"Compara y firma online", page:"comparar"},
            {ic:I.Doc,t:"Subir póliza existente",d:"Centraliza lo que ya tienes", page:"documentos"},
            {ic:I.Refresh,t:"Renovar póliza",d:"Revisa lo que vence", page:"renovaciones"},
            {ic:I.Help,t:"Hablar con asesor",d:"Te respondemos en minutos", page:"soporte"},
          ].map(s => {
            const Icon = s.ic;
            return (
              <button key={s.t} onClick={() => setActive(s.page)} className="card-flat" style={{padding:18,textAlign:"left",cursor:"pointer",border:"1px solid var(--rule)",background:"var(--paper)"}}>
                <Icon size={20}/>
                <div style={{fontSize:14,fontWeight:600,marginTop:12}}>{s.t}</div>
                <div style={{fontSize:12,color:"var(--ink-mute)",marginTop:4}}>{s.d}</div>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`
        @media(max-width:980px){.dh-grid{grid-template-columns:1fr !important}}
        @media(max-width:880px){.shortcuts-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:480px){.shortcuts-grid{grid-template-columns:1fr !important}}
      `}</style>
    </div>
  );
}

function DashboardShell({ user, onLogout, initial = "inicio" }) {
  const [active, setActive] = React.useState(initial);
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className={"app-shell" + (collapsed ? " collapsed" : "")}>
      <Sidebar active={active} setActive={setActive} onLogout={onLogout} collapsed={collapsed} onToggle={() => setCollapsed(v => !v)}/>
      <div className="app-main">
        <TopBar active={active} setActive={setActive} onToggleSidebar={() => setCollapsed(v => !v)} user={user}/>
        {active === "inicio" && <DashboardHome user={user} setActive={setActive}/>}
        {active === "comparar" && <Comparador setActive={setActive}/>}
        {active === "mis-seguros" && <MisSeguros setActive={setActive}/>}
        {active === "renovaciones" && <Renovaciones/>}
        {active === "documentos" && <Documentos/>}
        {active === "perfil" && <Perfil user={user}/>}
        {active === "ajustes" && <Ajustes/>}
        {active === "soporte" && <Soporte/>}
      </div>
      <MobNav active={active} setActive={setActive}/>
    </div>
  );
}

Object.assign(window, { DashboardShell, DashboardHome });
