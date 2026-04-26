// Comparador de seguros — multi-step

const COMPARE_TYPES = [
  { id:"coche", label:"Coche", ic: I.Car },
  { id:"moto", label:"Moto", ic: I.Bike },
  { id:"hogar", label:"Hogar", ic: I.House },
  { id:"salud", label:"Salud", ic: I.Health },
  { id:"vida", label:"Vida", ic: I.Life },
  { id:"mascotas", label:"Mascotas", ic: I.Pet },
  { id:"viaje", label:"Viaje", ic: I.Plane },
  { id:"autonomo", label:"Autónomo", ic: I.Briefcase },
  { id:"empresa", label:"Empresa", ic: I.Building },
];

const QUESTIONS = {
  coche: [
    {k:"marca",l:"Marca",t:"text",ph:"Ej. Volkswagen"},
    {k:"modelo",l:"Modelo",t:"text",ph:"Ej. Golf"},
    {k:"anio",l:"Año",t:"select",opts:Array.from({length:20},(_,i)=>2026-i)},
    {k:"edad",l:"Edad del conductor",t:"number",ph:"Ej. 32"},
    {k:"cp",l:"Código postal",t:"text",ph:"28001"},
    {k:"partes",l:"Historial de partes (últimos 5 años)",t:"select",opts:["0","1","2","3 o más"]},
  ],
  hogar: [
    {k:"tipo",l:"Tipo vivienda",t:"radio",opts:[{value:"piso",label:"Piso"},{value:"casa",label:"Casa"},{value:"estudio",label:"Estudio"}]},
    {k:"tamano",l:"Tamaño (m²)",t:"number",ph:"Ej. 85"},
    {k:"cp",l:"Código postal",t:"text",ph:"28001"},
    {k:"regimen",l:"Régimen",t:"radio",opts:[{value:"propietario",label:"Propietario"},{value:"alquiler",label:"Alquiler"}]},
  ],
  salud:[{k:"edad",l:"Edad",t:"number",ph:"32"},{k:"cp",l:"Código postal",t:"text",ph:"28001"},{k:"dental",l:"Cobertura dental",t:"radio",opts:[{value:"si",label:"Sí"},{value:"no",label:"No"}]}],
  vida:[{k:"edad",l:"Edad",t:"number"},{k:"capital",l:"Capital deseado",t:"select",opts:["50.000 €","100.000 €","200.000 €","300.000 €+"]}],
  mascotas:[{k:"especie",l:"Especie",t:"radio",opts:[{value:"perro",label:"Perro"},{value:"gato",label:"Gato"},{value:"otro",label:"Otro"}]},{k:"edad",l:"Edad",t:"number",ph:"3"}],
  viaje:[{k:"destino",l:"Destino",t:"select",opts:["Europa","América","Asia","Mundo"]},{k:"dias",l:"Duración (días)",t:"number",ph:"7"}],
  moto:[{k:"marca",l:"Marca",t:"text"},{k:"modelo",l:"Modelo",t:"text"},{k:"cc",l:"Cilindrada",t:"select",opts:["<125 cc","125-500 cc",">500 cc"]}],
  autonomo:[{k:"actividad",l:"Actividad profesional",t:"text",ph:"Ej. Diseñador"},{k:"facturacion",l:"Facturación anual",t:"select",opts:["<30.000 €","30.000-60.000 €","60.000-120.000 €","+120.000 €"]}],
  empresa:[{k:"sector",l:"Sector",t:"text"},{k:"empleados",l:"Nº empleados",t:"number"}],
};

const RESULTS = {
  coche: [
    {co:"AsegurArt", n:"Todo Riesgo Plus", m:58, y:660, tags:["Asistencia 24h","Vehículo de sustitución","Rotura lunas"], badge:"Recomendado"},
    {co:"Norden Seguros", n:"Conduce Esencial", m:42, y:480, tags:["Terceros ampliado","Asistencia 24h"], badge:"Mejor precio"},
    {co:"Cervantes Auto", n:"Premium Sin Franquicia", m:74, y:840, tags:["Sin franquicia","Defensa jurídica","Conductor ocasional"]},
    {co:"Mediterránea", n:"Eco Conductor", m:51, y:580, tags:["Bonus por km","Asistencia 24h"]},
  ],
  hogar: [
    {co:"Norden Seguros", n:"Hogar Plus", m:22, y:240, tags:["Daños por agua","Robo","Responsabilidad civil"], badge:"Recomendado"},
    {co:"AsegurArt", n:"Hogar Básico", m:14, y:160, tags:["Incendio","Robo"], badge:"Mejor precio"},
    {co:"Cervantes", n:"Hogar Total", m:31, y:340, tags:["Asistencia 24h","Joyas","Bricolaje","Mascotas"]},
  ],
  salud: [{co:"VitalCare",n:"Salud Completa",m:62,y:720,tags:["Hospitalización","Especialistas","Dental básico"],badge:"Recomendado"},{co:"Mediterránea",n:"Salud Esencial",m:39,y:450,tags:["Hospitalización","Médico general"],badge:"Mejor precio"}],
  vida: [{co:"AsegurArt",n:"Vida Tranquilidad",m:18,y:200,tags:["Capital 100.000 €","Fallecimiento e invalidez"],badge:"Recomendado"}],
  mascotas: [{co:"Petsafe",n:"Mascota Plus",m:14,y:160,tags:["Veterinario","Responsabilidad civil"],badge:"Recomendado"}],
  viaje: [{co:"GlobalAsist",n:"Viaje Mundo",m:0,y:48,tags:["7 días","Cancelación","Equipaje"],badge:"Recomendado"}],
  moto:[{co:"AsegurArt",n:"Moto Total",m:32,y:360,tags:["Casco","Robo","Asistencia"],badge:"Recomendado"}],
  autonomo:[{co:"Cervantes",n:"Autónomo Pro",m:38,y:420,tags:["RC profesional","Defensa jurídica"],badge:"Recomendado"}],
  empresa:[{co:"Norden",n:"Empresa Integral",m:120,y:1380,tags:["RC","Daños","Cyber"],badge:"Recomendado"}],
};

function Comparador({ setActive }) {
  const [phase, setPhase] = React.useState("select"); // select | questions | loading | results
  const [type, setType] = React.useState(null);
  const [answers, setAnswers] = React.useState({});
  const [filters, setFilters] = React.useState({sortBy:"price",cov24:false,nofranquicia:false});

  React.useEffect(() => {
    if (phase === "loading") {
      const t = setTimeout(() => setPhase("results"), 2200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const reset = () => { setPhase("select"); setType(null); setAnswers({}); };

  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Comparar</span>
          <h1>Encuentra tu próximo <em>seguro</em>.</h1>
        </div>
        {phase !== "select" && (
          <button className="btn btn-soft" onClick={reset}>← Empezar de cero</button>
        )}
      </div>

      {phase === "select" && (
        <div className="fadeUp">
          <Field label="¿Qué seguro quieres contratar?">
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}} className="cmp-types">
              {COMPARE_TYPES.map(t => {
                const Icon = t.ic;
                const on = type === t.id;
                return (
                  <button key={t.id} type="button" onClick={() => setType(t.id)}
                    className="card-flat"
                    style={{padding:20,cursor:"pointer",textAlign:"left",
                      border:"1px solid " + (on ? "var(--ink)" : "var(--rule)"),
                      background: on ? "color-mix(in oklab, var(--ink) 4%, var(--paper))" : "var(--paper)",
                      display:"flex",alignItems:"center",gap:14,transition:"all .18s"}}>
                    <div style={{width:42,height:42,borderRadius:10,background:"var(--canvas-2)",display:"grid",placeItems:"center"}}>
                      <Icon size={22}/>
                    </div>
                    <div style={{fontFamily:"var(--display)",fontSize:22,letterSpacing:"-.01em"}}>{t.label}</div>
                    {on && <I.Check size={18} style={{marginLeft:"auto",color:"var(--ink)"}}/>}
                  </button>
                );
              })}
            </div>
          </Field>
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:24}}>
            <button className="btn btn-blue btn-lg" disabled={!type}
              style={{opacity:type?1:.5}}
              onClick={() => setPhase("questions")}>
              Continuar <I.ArrowRight size={16}/>
            </button>
          </div>
          <style>{`@media(max-width:880px){.cmp-types{grid-template-columns:1fr 1fr !important}}@media(max-width:560px){.cmp-types{grid-template-columns:1fr !important}}`}</style>
        </div>
      )}

      {phase === "questions" && (
        <div className="card fadeUp" style={{padding:32,maxWidth:760}}>
          <span className="eyebrow">Sobre tu {COMPARE_TYPES.find(t => t.id === type).label.toLowerCase()}</span>
          <h2 className="display" style={{fontSize:36,margin:"6px 0 24px",letterSpacing:"-.01em"}}>
            Cuéntanos lo <em style={{fontStyle:"italic",color:"var(--blue)"}}>justo</em>.
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {(QUESTIONS[type] || []).map(q => {
              const val = answers[q.k] || "";
              const set = (v) => setAnswers(a => ({...a, [q.k]: v}));
              return (
                <div key={q.k} style={{gridColumn: q.t === "radio" ? "1 / -1" : "auto"}}>
                  <Field label={q.l}>
                    {q.t === "text" && <Input value={val} onChange={e => set(e.target.value)} placeholder={q.ph}/>}
                    {q.t === "number" && <Input type="number" value={val} onChange={e => set(e.target.value)} placeholder={q.ph}/>}
                    {q.t === "select" && (
                      <Select value={val} onChange={e => set(e.target.value)}>
                        <option value="">Selecciona</option>
                        {q.opts.map(o => <option key={o}>{o}</option>)}
                      </Select>
                    )}
                    {q.t === "radio" && <Radio value={val} onChange={set} options={q.opts}/>}
                  </Field>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:28,paddingTop:20,borderTop:"1px solid var(--rule-2)"}}>
            <button className="btn btn-soft" onClick={reset}>← Cambiar tipo</button>
            <button className="btn btn-blue btn-lg" onClick={() => setPhase("loading")}>
              Buscar opciones <I.ArrowRight size={16}/>
            </button>
          </div>
        </div>
      )}

      {phase === "loading" && (
        <div className="loader">
          <div style={{width:64,height:64,borderRadius:18,background:"var(--ink)",color:"var(--canvas)",display:"grid",placeItems:"center"}}>
            <I.Search size={28}/>
          </div>
          <div style={{textAlign:"center"}}>
            <h3 className="display" style={{fontSize:32,margin:"0 0 6px",letterSpacing:"-.01em"}}>Buscando las mejores <em style={{fontStyle:"italic",color:"var(--blue)"}}>opciones</em> para ti…</h3>
            <p className="soft" style={{margin:0}}>Estamos consultando aseguradoras y aplicando tu perfil.</p>
          </div>
          <div className="loader-bar"></div>
        </div>
      )}

      {phase === "results" && (
        <div className="fadeUp">
          <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:24}} className="cmp-grid">
            <aside className="card cmp-filters" style={{padding:20,height:"fit-content",position:"sticky",top:88}}>
              <div className="mono" style={{fontSize:11,marginBottom:10}}><I.Filter size={12} style={{verticalAlign:"-2px",marginRight:4}}/> Filtros</div>
              <Field label="Ordenar por">
                <Select value={filters.sortBy} onChange={e => setFilters({...filters, sortBy:e.target.value})}>
                  <option value="price">Precio (menor)</option>
                  <option value="cov">Cobertura</option>
                  <option value="rec">Recomendado</option>
                </Select>
              </Field>
              <div style={{height:14}}/>
              <Checkbox checked={filters.cov24} onChange={v => setFilters({...filters, cov24:v})} label="Con asistencia 24h"/>
              <div style={{height:8}}/>
              <Checkbox checked={filters.nofranquicia} onChange={v => setFilters({...filters, nofranquicia:v})} label="Sin franquicia / copago"/>
              <div className="h-divider"/>
              <div className="mono" style={{fontSize:10,marginBottom:8}}>RANGO DE PRECIO</div>
              <div style={{fontFamily:"var(--display)",fontSize:24,letterSpacing:"-.01em"}}>14 — 74 €/mes</div>
              <div style={{height:4,background:"var(--rule)",borderRadius:99,marginTop:8,position:"relative"}}>
                <div style={{position:"absolute",left:"10%",right:"15%",top:0,bottom:0,background:"var(--ink)",borderRadius:99}}></div>
              </div>
            </aside>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
                <h2 className="display" style={{fontSize:32,margin:0,letterSpacing:"-.01em"}}>{(RESULTS[type] || []).length} opciones para ti</h2>
                <span className="mono" style={{fontSize:11}}>ACTUALIZADO HOY</span>
              </div>
              {(RESULTS[type] || RESULTS.coche).map((r, i) => (
                <div key={i} className={"cmp-card " + (r.badge === "Recomendado" ? "recommended" : "")}>
                  <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                    <div className="pol-logo">{r.co[0]}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <span className="mono">{r.co}</span>
                        {r.badge === "Recomendado" && <Pill variant="solid-blue">Recomendado</Pill>}
                        {r.badge === "Mejor precio" && <Pill variant="solid-green">Mejor precio</Pill>}
                      </div>
                      <div style={{fontFamily:"var(--display)",fontSize:28,marginTop:4,letterSpacing:"-.01em"}}>{r.n}</div>
                      <div className="cmp-cov">
                        {r.tags.map(t => <span key={t} className="cmp-tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="cmp-price-col" style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"var(--display)",fontSize:38,lineHeight:1,letterSpacing:"-.01em"}}>{r.m} €<span style={{fontFamily:"var(--sans)",fontSize:13,color:"var(--ink-mute)"}}>/mes</span></div>
                      <div className="mono" style={{fontSize:10,marginTop:4}}>O {r.y} € / AÑO</div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn btn-ghost btn-sm">Ver oferta</button>
                      <button className="btn btn-primary btn-sm" onClick={() => setActive("mis-seguros")}>Contratar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media(max-width:980px){
              .cmp-grid{grid-template-columns:1fr !important}
              .cmp-filters{position:static !important}
            }
            @media(max-width:640px){
              .cmp-card{grid-template-columns:1fr !important}
              .cmp-price-col{align-items:flex-start !important;flex-direction:row !important;justify-content:space-between !important;flex-wrap:wrap;gap:10px !important;padding-top:12px;border-top:1px solid var(--rule-2)}
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Comparador });
