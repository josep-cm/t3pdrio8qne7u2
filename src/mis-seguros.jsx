// Mis seguros + Renovaciones + Documentos

const POLICIES = [
  {id:1, type:"coche", ic:I.Car, name:"Todo Riesgo Plus", company:"AsegurArt", status:"activo", start:"14 NOV 2024", renew:"14 NOV 2026", monthly:58, yearly:660, tags:["Asistencia 24h","Vehículo de sustitución","Rotura lunas","Defensa jurídica"]},
  {id:2, type:"hogar", ic:I.House, name:"Hogar Plus", company:"Norden Seguros", status:"activo", start:"02 ENE 2025", renew:"02 ENE 2027", monthly:22, yearly:240, tags:["Daños por agua","Robo","Responsabilidad civil"]},
  {id:3, type:"salud", ic:I.Health, name:"Salud Completa", company:"VitalCare", status:"activo", start:"01 MAR 2025", renew:"01 MAR 2027", monthly:62, yearly:720, tags:["Hospitalización","Especialistas","Dental básico"]},
  {id:4, type:"mascotas", ic:I.Pet, name:"Mascota Plus", company:"Petsafe", status:"activo", start:"18 JUN 2025", renew:"18 JUN 2026", monthly:14, yearly:160, tags:["Veterinario","Responsabilidad civil"]},
];

function PolicyCard({ p, onOpen }) {
  const Icon = p.ic;
  return (
    <div className="pol">
      <div className="pol-top">
        <div style={{display:"flex",gap:14,alignItems:"flex-start",flex:1,minWidth:0}}>
          <div className="pol-logo"><Icon size={22}/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span className="mono">{p.company}</span>
              <span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:11,color:"var(--green)",fontWeight:500}}>
                <span className="dot dot-green"></span> Activo
              </span>
            </div>
            <h4>{p.name}</h4>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="price">{p.monthly} €<small> /mes</small></div>
          <div className="mono" style={{fontSize:10,marginTop:2}}>{p.yearly} € / AÑO</div>
        </div>
      </div>
      <div className="meta">
        <span><span style={{color:"var(--ink-mute)"}}>INICIO</span> &nbsp;{p.start}</span>
        <span><span style={{color:"var(--ink-mute)"}}>RENUEVA</span> &nbsp;{p.renew}</span>
      </div>
      <div className="cmp-cov">
        {p.tags.slice(0,4).map(t => <span key={t} className="cmp-tag">{t}</span>)}
      </div>
      <div className="pol-actions">
        <button className="btn btn-ghost"><I.Download size={12}/> Descargar póliza</button>
        <button className="btn btn-ghost">Ver cobertura</button>
        <button className="btn btn-ghost"><I.Phone size={12}/> Contactar</button>
        <button className="btn btn-ghost" style={{marginLeft:"auto"}}>Renovar</button>
      </div>
    </div>
  );
}

function MisSeguros({ setActive }) {
  const [filter, setFilter] = React.useState("todos");
  const filtered = filter === "todos" ? POLICIES : POLICIES.filter(p => p.type === filter);
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Mis seguros</span>
          <h1>Todo lo tuyo, en <em>orden</em>.</h1>
        </div>
        <button className="btn btn-blue" onClick={() => setActive("comparar")}><I.Plus size={14}/> Añadir seguro</button>
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        {[
          {id:"todos",label:"Todos · 4"},
          {id:"coche",label:"Coche · 1"},
          {id:"hogar",label:"Hogar · 1"},
          {id:"salud",label:"Salud · 1"},
          {id:"mascotas",label:"Mascotas · 1"},
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className="btn btn-sm"
            style={{
              background: filter === f.id ? "var(--ink)" : "transparent",
              color: filter === f.id ? "var(--canvas)" : "var(--ink)",
              border:"1px solid " + (filter === f.id ? "var(--ink)" : "var(--rule)")
            }}>{f.label}</button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18}} className="ms-grid stag">
        {filtered.map(p => <PolicyCard key={p.id} p={p}/>)}
      </div>

      <div className="card" style={{padding:24,marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <div>
          <span className="eyebrow">¿Tienes pólizas en otra parte?</span>
          <h3 className="display" style={{fontSize:28,margin:"6px 0 0",letterSpacing:"-.01em"}}>Súbelas y <em style={{fontStyle:"italic",color:"var(--blue)"}}>centraliza</em>.</h3>
          <p className="soft" style={{margin:"6px 0 0",fontSize:14}}>Te avisamos de renovaciones y guardamos los documentos seguros, aunque no se contraten aquí.</p>
        </div>
        <button className="btn btn-primary"><I.Plus size={14}/> Subir póliza</button>
      </div>

      <style>{`@media(max-width:980px){.ms-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  );
}

function Renovaciones() {
  const sorted = [...POLICIES].sort((a,b) => new Date(a.renew) - new Date(b.renew));
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Renovaciones</span>
          <h1>Lo que <em>vence</em>, ordenado.</h1>
        </div>
      </div>

      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div className="renov-header" style={{display:"grid",gridTemplateColumns:"60px 1.5fr 1fr 1fr 1fr auto",gap:16,padding:"14px 24px",background:"var(--canvas-2)",borderBottom:"1px solid var(--rule)",fontFamily:"var(--mono)",fontSize:11,letterSpacing:".08em",textTransform:"uppercase",color:"var(--ink-mute)"}}>
          <span></span><span>Póliza</span><span>Compañía</span><span>Renueva</span><span style={{textAlign:"right"}}>Precio</span><span></span>
        </div>
        {sorted.map((p, i) => {
          const Icon = p.ic;
          return (
            <div key={p.id} className="renov-row" style={{display:"grid",gridTemplateColumns:"60px 1.5fr 1fr 1fr 1fr auto",gap:16,padding:"18px 24px",alignItems:"center",borderBottom: i < sorted.length-1 ? "1px solid var(--rule-2)" : "none"}}>
              <div className="pol-logo" style={{width:36,height:36}}><Icon size={18}/></div>
              <div>
                <div style={{fontFamily:"var(--display)",fontSize:20,letterSpacing:"-.01em"}}>{p.name}</div>
                <div className="mono" style={{fontSize:10,marginTop:2}}>{p.tags[0]}</div>
              </div>
              <div style={{fontSize:14}}>{p.company}</div>
              <div>
                <div style={{fontSize:14,fontWeight:500}}>{p.renew}</div>
                <div className="mono" style={{fontSize:10,marginTop:2,color:"var(--ink-mute)"}}>EN BREVE</div>
              </div>
              <div style={{textAlign:"right",fontFamily:"var(--display)",fontSize:22}}>{p.monthly} €<span style={{fontFamily:"var(--sans)",fontSize:12,color:"var(--ink-mute)"}}>/mes</span></div>
              <div style={{display:"flex",gap:6}}>
                <button className="btn btn-ghost btn-sm">Revisar</button>
                <button className="btn btn-primary btn-sm">Renovar</button>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        @media(max-width:760px){
          .renov-header{display:none !important}
          .renov-row{grid-template-columns:44px 1fr !important;grid-template-rows:auto auto auto;gap:8px 12px !important;padding:16px !important}
          .renov-row > :nth-child(3),.renov-row > :nth-child(4),.renov-row > :nth-child(5){display:none}
          .renov-row > :nth-child(6){grid-column:2;justify-content:flex-start}
        }
      `}</style>
    </div>
  );
}

function Documentos() {
  const docs = [
    {n:"Póliza · Todo Riesgo Plus", co:"AsegurArt", ext:"PDF", size:"284 KB", date:"14 NOV 2024"},
    {n:"Recibo · Octubre 2026", co:"AsegurArt", ext:"PDF", size:"78 KB", date:"01 OCT 2026"},
    {n:"Póliza · Hogar Plus", co:"Norden Seguros", ext:"PDF", size:"312 KB", date:"02 ENE 2025"},
    {n:"Cuadro médico", co:"VitalCare", ext:"PDF", size:"1.2 MB", date:"01 MAR 2025"},
    {n:"Cartilla mascota", co:"Petsafe", ext:"PDF", size:"96 KB", date:"18 JUN 2025"},
  ];
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Documentos</span>
          <h1>Tu <em>archivo</em>, ordenado.</h1>
        </div>
        <button className="btn btn-primary"><I.Plus size={14}/> Subir documento</button>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        {docs.map((d, i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"18px 24px",borderBottom: i < docs.length-1 ? "1px solid var(--rule-2)" : "none"}}>
            <div style={{width:42,height:54,borderRadius:6,background:"var(--canvas-2)",display:"grid",placeItems:"center",fontFamily:"var(--mono)",fontSize:10,fontWeight:600,letterSpacing:".06em"}}>{d.ext}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:500,fontSize:15}}>{d.n}</div>
              <div className="mono" style={{fontSize:10,marginTop:4}}>{d.co} · {d.size} · {d.date}</div>
            </div>
            <button className="iconbtn"><I.Download size={16}/></button>
            <button className="iconbtn"><I.ChevronRight size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MisSeguros, Renovaciones, Documentos });
