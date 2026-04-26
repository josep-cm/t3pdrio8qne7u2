// Public site — Header, Hero, How it works, Types, Quiénes somos, FAQ, Footer

function PublicHeader({ go, route }) {
  const items = [
    {id:"home", label:"Inicio"},
    {id:"about", label:"Quiénes somos"},
    {id:"how", label:"Cómo funciona"},
    {id:"empresas", label:"Empresas"},
    {id:"faq", label:"FAQ"},
    {id:"blog", label:"Blog"},
    {id:"contact", label:"Contacto"},
  ];
  const scrollTo = (id) => {
    if (route !== "home") { go("home"); setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth", block:"start"}), 80); return; }
    document.getElementById(id)?.scrollIntoView({behavior:"smooth", block:"start"});
  };
  return (
    <header className="pub-hd">
      <div className="container pub-hd-inner">
        <a onClick={() => go("home")} style={{cursor:"pointer"}}><Logo /></a>
        <nav className="pub-nav">
          {items.map(it => (
            <a key={it.id} onClick={() => scrollTo(it.id)} style={{cursor:"pointer"}}>{it.label}</a>
          ))}
        </nav>
        <div className="pub-hd-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => go("login")}>Iniciar sesión</button>
          <button className="btn btn-primary btn-sm" onClick={() => go("register")}>Registrarse</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ go }) {
  const [audience, setAudience] = React.useState("personas"); // personas | empresas
  const [type, setType] = React.useState("coche");
  const isEmp = audience === "empresas";
  const typesPersonas = [
    {id:"coche",label:"Coche", ic:I.Car},
    {id:"hogar",label:"Hogar", ic:I.House},
    {id:"salud",label:"Salud", ic:I.Health},
    {id:"vida",label:"Vida", ic:I.Life},
    {id:"moto",label:"Moto", ic:I.Bike},
    {id:"viaje",label:"Viaje", ic:I.Plane},
  ];
  const typesEmpresas = [
    {id:"rc",label:"RC profesional", ic:I.ShieldCheck},
    {id:"flotas",label:"Flotas", ic:I.Car},
    {id:"oficinas",label:"Oficinas", ic:I.Building},
    {id:"cyber",label:"Ciberriesgo", ic:I.Bolt},
    {id:"colectivos",label:"Salud colectiva", ic:I.Health},
    {id:"autonomo",label:"Autónomos", ic:I.Briefcase},
  ];
  const types = isEmp ? typesEmpresas : typesPersonas;
  const currentType = types.find(t => t.id === type) || types[0];
  React.useEffect(() => { setType(types[0].id); }, [audience]);
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-mark fadeUp">
          <span className="eyebrow">SD · Madrid · 2026</span>
          <div className="hero-toggle" role="tablist">
            <button role="tab" aria-selected={!isEmp} className={!isEmp ? "on" : ""} onClick={() => setAudience("personas")}>Personas</button>
            <button role="tab" aria-selected={isEmp} className={isEmp ? "on" : ""} onClick={() => setAudience("empresas")}>Empresas</button>
          </div>
        </div>
        <h1 className="hero-title display fadeUp" key={audience}>
          {isEmp ? <>Protege tu <em>negocio</em>,<br/>sin perder tiempo.</> : <>Encuentra el seguro<br/><em>perfecto</em> en minutos.</>}
        </h1>
        <div className="hero-bottom">
          <div className="hero-sub-col fadeUp" style={{animationDelay:".08s"}} key={"sub-"+audience}>
            <p className="hero-sub">
              {isEmp
                ? "Una plataforma para que pymes y autónomos comparen, contraten y gestionen todas sus pólizas — desde RC profesional hasta flotas — en un único panel."
                : "Compara opciones de forma sencilla, contrata online y gestiona todos tus seguros desde un solo lugar."}
            </p>
            <div className="hero-cta">
              <button className="btn btn-blue btn-lg" onClick={() => go("register")}>
                {isEmp ? "Asegurar mi empresa" : "Comparar seguros"} <I.ArrowRight size={16}/>
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => go("register")}>
                {isEmp ? "Hablar con un asesor" : "Crear cuenta"}
              </button>
            </div>
          </div>

          <div className="hero-quote fadeUp" style={{animationDelay:".18s"}} key={"q-"+audience}>
            <span className="mono" style={{fontSize:11}}>// {isEmp ? "PARA TU EMPRESA" : "EMPIEZA POR"}</span>
            <div className="hero-picker">
              {types.map(t => {
                const Icon = t.ic;
                const on = type === t.id;
                return (
                  <button key={t.id} onClick={() => setType(t.id)} className={"hero-chip " + (on ? "on" : "")}>
                    <Icon size={16}/> <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
            <button className="hero-cta-link" onClick={() => go("register")}>
              <span>{isEmp ? "Cotizar" : "Comparar"} <em style={{fontStyle:"italic",color:"var(--blue)"}}>{currentType.label.toLowerCase()}</em></span>
              <I.ArrowUpRight size={18}/>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .hero{padding:48px 0 88px}
        .hero-mark{display:flex;justify-content:space-between;align-items:center;margin-bottom:36px;padding-bottom:18px;border-bottom:1px solid var(--rule-2);gap:16px;flex-wrap:wrap}
        .hero-toggle{display:inline-flex;background:var(--canvas-2);border:1px solid var(--rule);border-radius:999px;padding:3px}
        .hero-toggle button{appearance:none;border:0;background:transparent;font:inherit;font-size:13px;font-weight:500;color:var(--ink-soft);padding:7px 18px;border-radius:999px;cursor:pointer;transition:all .2s}
        .hero-toggle button.on{background:var(--ink);color:var(--canvas);box-shadow:var(--shadow-sm)}
        .hero-title{font-size:clamp(56px, 11vw, 168px) !important;line-height:.92 !important;margin:0 0 56px;letter-spacing:-0.025em}
        .hero-title em{font-style:italic;color:var(--blue)}
        .hero-bottom{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end}
        @media(max-width:880px){.hero-bottom{grid-template-columns:1fr;gap:32px}}
        .hero-sub-col{max-width:480px}
        .hero-sub{font-size:18px;line-height:1.55;color:var(--ink-soft);margin:0 0 24px}
        .hero-cta{display:flex;gap:10px;flex-wrap:wrap}
        .hero-quote{background:var(--ink);color:var(--canvas);border-radius:20px;padding:28px 28px 24px;
          display:flex;flex-direction:column;gap:18px;position:relative;overflow:hidden}
        .hero-quote::after{content:"";position:absolute;inset:0;
          background:radial-gradient(circle at 90% 0%, color-mix(in oklab, var(--blue) 50%, transparent), transparent 55%);pointer-events:none}
        .hero-quote > *{position:relative;z-index:1}
        .hero-quote .mono{color:#7884A8 !important}
        .hero-picker{display:flex;flex-wrap:wrap;gap:8px}
        .hero-chip{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;
          border:1px solid rgba(255,255,255,.16);background:transparent;color:#D1D5E0;font:inherit;font-size:13.5px;cursor:pointer;transition:all .18s}
        .hero-chip:hover{border-color:rgba(255,255,255,.45);color:#fff}
        .hero-chip.on{background:#fff;color:var(--ink);border-color:#fff;font-weight:500}
        .hero-cta-link{display:flex;justify-content:space-between;align-items:center;width:100%;
          background:none;border:0;border-top:1px solid rgba(255,255,255,.14);padding:22px 0 0;margin-top:6px;
          color:#fff;font-family:var(--display);font-size:32px;letter-spacing:-.01em;cursor:pointer;transition:gap .2s}
        .hero-cta-link:hover{gap:24px}
        .hero-cta-link:hover svg{transform:translate(4px,-4px)}
        .hero-cta-link svg{transition:transform .2s}
      `}</style>
    </section>
  );
}

function ConfidenceBar() {
  const items = [
    {ic: <I.Lock size={22}/>, t:"Datos protegidos", s:"Cifrado y custodia conforme a la normativa europea."},
    {ic: <I.ShieldCheck size={22}/>, t:"Gestión centralizada", s:"Todas tus pólizas en un único panel ordenado."},
    {ic: <I.Star size={22}/>, t:"Opciones personalizadas", s:"Recomendaciones según tu perfil real, no cualquiera."},
    {ic: <I.Bolt size={22}/>, t:"Sin compromiso", s:"Comparar es gratis. Contratas solo si te encaja."},
  ];
  return (
    <div className="container">
      <div className="conf">
        {items.map((it, i) => (
          <div key={i}>
            <div className="ic">{it.ic}</div>
            <strong>{it.t}</strong>
            <p>{it.s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {n:"01", t:"Crea tu cuenta", d:"Regístrate en segundos. Sin papeleo, sin llamadas: solo lo imprescindible para empezar."},
    {n:"02", t:"Completa tus datos y compara", d:"Cuéntanos qué necesitas. Te mostramos opciones reales adaptadas a ti, lado a lado."},
    {n:"03", t:"Contrata y gestiona todo", d:"Firma online y guarda todo en tu panel: pólizas, renovaciones y documentos."},
  ];
  return (
    <section className="sect" id="how">
      <div className="container">
        <div className="sect-head">
          <div>
            <span className="eyebrow">Cómo funciona</span>
            <h2>Tres pasos. <em>Cero</em> sorpresas.</h2>
          </div>
          <p className="soft" style={{maxWidth:380,fontSize:15,lineHeight:1.55,margin:0}}>
            Diseñado para que pases más tiempo viviendo y menos descifrando contratos.
          </p>
        </div>
        <div className="steps stag">
          {steps.map(s => (
            <div key={s.n} className="step">
              <div className="num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ALL_TYPES = [
  {id:"coche", label:"Coche", desc:"Terceros, todo riesgo y opciones intermedias.", ic: I.Car, palette:"blue"},
  {id:"hogar", label:"Hogar", desc:"Vivienda, contenido y responsabilidad civil.", ic: I.House, palette:"warm"},
  {id:"salud", label:"Salud", desc:"Atención médica, hospitalización, dental.", ic: I.Health, palette:"green"},
  {id:"vida", label:"Vida", desc:"Tranquilidad para los tuyos cuando importa.", ic: I.Life, palette:"night"},
  {id:"moto", label:"Moto", desc:"Cobertura específica para dos ruedas.", ic: I.Bike, palette:"blue"},
  {id:"mascotas", label:"Mascotas", desc:"Veterinario, accidentes y responsabilidad.", ic: I.Pet, palette:"warm"},
  {id:"viaje", label:"Viaje", desc:"Asistencia, equipaje y cancelación.", ic: I.Plane, palette:"green"},
  {id:"autonomos", label:"Autónomos", desc:"Cobertura profesional para tu actividad.", ic: I.Briefcase, palette:"night"},
  {id:"empresa", label:"Empresa", desc:"Pólizas adaptadas al tamaño y sector.", ic: I.Building, palette:"blue"},
];

function InsuranceTypes({ go }) {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? ALL_TYPES : ALL_TYPES.slice(0, 4);
  return (
    <section className="sect" id="types">
      <div className="container">
        <div className="sect-head">
          <div>
            <span className="eyebrow">Tipos de seguro</span>
            <h2>Lo que la mayoría <em>necesita</em>, en un sitio.</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setShowAll(v => !v)}>
            {showAll ? "Mostrar destacados" : "Ver todos"} <I.Chevron size={14} style={{transform: showAll ? "rotate(180deg)" : "none"}}/>
          </button>
        </div>
        <div className="types stag">
          {visible.map(t => {
            const Icon = t.ic;
            return (
              <div key={t.id} className="type" onClick={() => go("register")}
                style={{background:"var(--paper)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <Icon className="ic" size={36} sw={1.4}/>
                  <span className="mono" style={{fontSize:10}}>{String(ALL_TYPES.findIndex(x => x.id === t.id) + 1).padStart(2,"0")}</span>
                </div>
                <div>
                  <h4>{t.label}</h4>
                  <p>{t.desc}</p>
                </div>
                <div className="arrow"><I.ArrowUpRight size={16} sw={2}/></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    {t:"Transparencia", d:"Las condiciones, claras desde el primer scroll."},
    {t:"Simplicidad", d:"Lo complejo, simplificado. Sin jerga innecesaria."},
    {t:"Seguridad", d:"Tus datos, custodiados con el máximo rigor."},
    {t:"Tecnología útil", d:"Software al servicio de decisiones humanas."},
  ];
  return (
    <section className="sect" id="about" style={{background:"var(--canvas-2)"}}>
      <div className="container">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}
             className="about-grid">
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h2 className="display" style={{fontSize:"clamp(36px,5vw,64px)",margin:"12px 0 24px",letterSpacing:"-.01em"}}>
              SeguroDirecto nace para <em>simplificar</em> el mundo de los seguros.
            </h2>
            <p style={{fontSize:17,lineHeight:1.6,color:"var(--ink-soft)",maxWidth:540,margin:0}}>
              Una plataforma clara, moderna y útil para comparar, contratar y
              gestionar pólizas sin complicaciones. Creemos que asegurar lo que
              importa no debería ser una experiencia que asuste.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {values.map((v, i) => (
              <div key={v.t} className="card" style={{padding:24,background:"var(--paper)"}}>
                <div className="mono" style={{fontSize:11}}>{String(i+1).padStart(2,"0")}</div>
                <div style={{fontFamily:"var(--display)",fontSize:28,marginTop:12,letterSpacing:"-.01em"}}>{v.t}</div>
                <p style={{margin:"8px 0 0",fontSize:14,color:"var(--ink-soft)",lineHeight:1.5}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:880px){.about-grid{grid-template-columns:1fr !important;gap:32px !important}}`}</style>
    </section>
  );
}

function FAQ() {
  const items = [
    {q:"¿Cuánto cuesta usar SeguroDirecto?", a:"Comparar y gestionar tus pólizas es gratis. Solo pagas el seguro que decidas contratar, al precio que verás en cada oferta."},
    {q:"¿Puedo cancelar un seguro contratado?", a:"Sí. Desde 'Mis seguros' puedes iniciar la cancelación o solicitar cambios. Cada producto sigue las condiciones y plazos de su aseguradora."},
    {q:"¿Cómo gestionan mis datos personales?", a:"Tus datos se almacenan cifrados y solo se comparten con la aseguradora cuando contratas. En el centro de privacidad puedes descargarlos o eliminarlos."},
    {q:"¿Las recomendaciones son objetivas?", a:"Mostramos las opciones disponibles según tu perfil. Etiquetamos 'Recomendado' o 'Mejor precio' con criterios visibles, sin promociones ocultas."},
    {q:"¿Qué pasa cuando un seguro está a punto de renovar?", a:"Te avisamos con antelación y te proponemos alternativas. Decides si renovar, cambiar o no hacer nada — todo desde tu panel."},
    {q:"¿Puedo añadir pólizas que ya tengo contratadas en otra parte?", a:"Sí. Puedes subir tus pólizas existentes para verlas centralizadas y recibir avisos de renovación, aunque no se hayan contratado aquí."},
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="sect" id="faq">
      <div className="container">
        <div className="sect-head">
          <div>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2>Lo que <em>todo el mundo</em> pregunta.</h2>
          </div>
        </div>
        <div style={{maxWidth:920}}>
          {items.map((it, i) => (
            <div key={i} className={"faq-item " + (open === i ? "open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="plus"><I.Plus size={14} sw={2}/></span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ go }) {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo invert />
            <p style={{margin:"20px 0 0",maxWidth:320,fontSize:14,lineHeight:1.6,color:"#A7B0C8"}}>
              La plataforma para comparar, contratar y gestionar tus seguros desde un único lugar.
            </p>
          </div>
          <div>
            <h5>Empresa</h5>
            <ul>
              <li><a>Quiénes somos</a></li>
              <li><a>Carreras</a></li>
              <li><a>Prensa</a></li>
              <li><a>Blog</a></li>
            </ul>
          </div>
          <div>
            <h5>Producto</h5>
            <ul>
              <li><a onClick={() => go("register")} style={{cursor:"pointer"}}>Comparar</a></li>
              <li><a>Tipos de seguro</a></li>
              <li><a>Cómo funciona</a></li>
              <li><a>Para empresas</a></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><a>Aviso legal</a></li>
              <li><a>Privacidad</a></li>
              <li><a>Cookies</a></li>
              <li><a>Condiciones</a></li>
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li><a>Centro de ayuda</a></li>
              <li><a>hola@segurodirecto.es</a></li>
              <li><a>+34 900 000 000</a></li>
              <li><a>L–V · 9:00–20:00</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-tag">Asegurar, sin <em>complicar</em>.</div>
        <div className="footer-bottom">
          <span>© 2026 SeguroDirecto. Todos los derechos reservados.</span>
          <span style={{fontFamily:"var(--mono)",letterSpacing:".08em"}}>MADE IN MADRID</span>
        </div>
      </div>
    </footer>
  );
}

function Empresas({ go }) {
  const items = [
    {ic: I.ShieldCheck, t:"RC profesional", d:"Cubre errores y reclamaciones derivadas de tu actividad."},
    {ic: I.Car, t:"Flotas", d:"Una sola póliza para todos los vehículos de la empresa."},
    {ic: I.Building, t:"Oficinas y locales", d:"Continente, contenido, robo y responsabilidad civil."},
    {ic: I.Bolt, t:"Ciberriesgo", d:"Protección frente a ataques, fugas y rescates digitales."},
    {ic: I.Health, t:"Salud colectiva", d:"Cobertura médica para tu equipo, gestionada en grupo."},
    {ic: I.Briefcase, t:"Autónomos", d:"Pack pensado para profesionales independientes."},
  ];
  return (
    <section className="sect" id="empresas" style={{background:"var(--ink)",color:"var(--canvas)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 90% 10%, color-mix(in oklab, var(--blue) 50%, transparent), transparent 55%), radial-gradient(circle at 10% 90%, color-mix(in oklab, var(--green) 35%, transparent), transparent 60%)",pointerEvents:"none",opacity:.6}}></div>
      <div className="container" style={{position:"relative"}}>
        <div className="sect-head">
          <div>
            <span className="eyebrow" style={{color:"#7884A8"}}>Para empresas</span>
            <h2 style={{color:"var(--canvas)"}}>También para tu <em style={{color:"#7FA8FF",fontStyle:"italic"}}>negocio</em>.</h2>
          </div>
          <p style={{maxWidth:380,fontSize:15,lineHeight:1.55,margin:0,color:"#B5BCD0"}}>
            De autónomo a empresa de cien personas: una plataforma para asegurar lo que te hace ganar.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}} className="emp-grid stag">
          {items.map(it => {
            const Icon = it.ic;
            return (
              <div key={it.t} style={{padding:24,borderRadius:18,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.10)",backdropFilter:"blur(8px)"}}>
                <Icon size={26} sw={1.4}/>
                <div style={{fontFamily:"var(--display)",fontSize:26,marginTop:14,letterSpacing:"-.01em",color:"var(--canvas)"}}>{it.t}</div>
                <p style={{margin:"6px 0 0",fontSize:13.5,color:"#A7B0C8",lineHeight:1.5}}>{it.d}</p>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap",marginTop:48,paddingTop:32,borderTop:"1px solid rgba(255,255,255,.10)"}}>
          <div style={{fontFamily:"var(--display)",fontSize:32,letterSpacing:"-.01em",lineHeight:1.1,maxWidth:540}}>
            ¿Más de 10 empleados? Diseñamos tu programa <em style={{color:"#7FA8FF",fontStyle:"italic"}}>a medida</em>.
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="btn btn-blue btn-lg" onClick={() => go("register")}>Asegurar mi empresa <I.ArrowRight size={16}/></button>
            <button className="btn btn-lg" style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,.3)"}} onClick={() => go("register")}>Hablar con un asesor</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:880px){.emp-grid{grid-template-columns:1fr 1fr !important}}@media(max-width:560px){.emp-grid{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
}

function PublicSite({ go, route }) {
  return (
    <>
      <PublicHeader go={go} route={route} />
      <Hero go={go} />
      <ConfidenceBar />
      <HowItWorks />
      <InsuranceTypes go={go} />
      <Empresas go={go} />
      <About />
      <FAQ />
      <Footer go={go} />
    </>
  );
}

Object.assign(window, { PublicSite, ALL_TYPES });
