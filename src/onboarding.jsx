// Onboarding — 7 step flow

const OB_STEPS = [
  { id:"welcome", title:"Bienvenida" },
  { id:"personal", title:"Información personal" },
  { id:"familia", title:"Información familiar" },
  { id:"vehiculos", title:"Vehículos" },
  { id:"vivienda", title:"Vivienda" },
  { id:"intereses", title:"Intereses" },
  { id:"final", title:"Listo" },
];

function OBProgress({ idx }) {
  return (
    <div className="ob-progress">
      {OB_STEPS.map((_, i) => (
        <span key={i} className={"ob-dot " + (i <= idx ? "on" : "")}/>
      ))}
    </div>
  );
}

function OBNav({ idx, setIdx, onFinish, canNext = true, last = false, hideBack = false }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",gap:12,marginTop:32,paddingTop:24,borderTop:"1px solid var(--rule-2)"}}>
      <button className="btn btn-soft" onClick={() => setIdx(Math.max(0, idx-1))} disabled={hideBack}
        style={{opacity: hideBack ? 0 : 1, pointerEvents: hideBack ? "none" : "auto"}}>← Atrás</button>
      <button className="btn btn-blue btn-lg" disabled={!canNext}
        onClick={() => last ? onFinish() : setIdx(idx + 1)}
        style={{opacity: canNext ? 1 : .5}}>
        {last ? "Entrar al panel" : "Continuar"} <I.ArrowRight size={16}/>
      </button>
    </div>
  );
}

function OnboardingFlow({ onFinish, go }) {
  const [idx, setIdx] = React.useState(0);
  const [data, setData] = React.useState({
    nombre:"", nacimiento:"", telefono:"", email:"", direccion:"", cp:"",
    estado:"soltero", hijos:false, numHijos:0,
    coche:false, marca:"", modelo:"", anio:"", moto:false,
    vivienda:"piso", regimen:"propietario", metros:"",
    intereses:{ahorrar:false,centralizar:false,cobertura:false,comparando:false}
  });
  const set = (k, v) => setData(d => ({...d, [k]: v}));

  const step = OB_STEPS[idx];
  return (
    <div className="ob-shell">
      <div className="ob-top">
        <Logo size="sm"/>
        <OBProgress idx={idx} />
        <button className="btn btn-soft btn-sm" onClick={() => go("home")}>Salir</button>
      </div>

      <div className="ob-body">
        <div className="ob-card fadeUp" key={idx}>
          <span className="eyebrow">Paso {String(idx+1).padStart(2,"0")} / 07 — {step.title}</span>

          {step.id === "welcome" && (
            <div>
              <h1 className="ob-h1" style={{margin:"16px 0"}}>Vamos a preparar tu cuenta en menos de <em>dos minutos</em>.</h1>
              <p className="ob-sub">Necesitamos unos datos básicos para mostrarte solo opciones que tengan sentido para ti. Puedes editarlos cuando quieras desde tu perfil.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginTop:8}} className="ob-welcome-grid">
                {[{n:"01",t:"Datos personales"},{n:"02",t:"Vehículos y vivienda"},{n:"03",t:"Tus intereses"}].map(b => (
                  <div key={b.n} className="card-flat" style={{padding:18}}>
                    <div className="mono" style={{fontSize:10}}>{b.n}</div>
                    <div style={{fontFamily:"var(--display)",fontSize:20,marginTop:8,letterSpacing:"-.01em"}}>{b.t}</div>
                  </div>
                ))}
              </div>
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish} hideBack />
            </div>
          )}

          {step.id === "personal" && (
            <div>
              <h1 className="ob-h1" style={{margin:"16px 0"}}>Cuéntanos quién <em>eres</em>.</h1>
              <p className="ob-sub">Esta información es solo para crear tu perfil — no la compartimos sin tu permiso.</p>
              <div className="ob-grid">
                <Field label="Nombre completo"><Input value={data.nombre} onChange={e => set("nombre", e.target.value)} placeholder="Marta Rodríguez"/></Field>
                <Field label="Fecha de nacimiento"><Input type="date" value={data.nacimiento} onChange={e => set("nacimiento", e.target.value)}/></Field>
                <Field label="Teléfono"><Input value={data.telefono} onChange={e => set("telefono", e.target.value)} placeholder="+34 600 000 000"/></Field>
                <Field label="Email"><Input type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="tu@email.com"/></Field>
                <div style={{gridColumn:"1 / -1"}}>
                  <Field label="Dirección"><Input value={data.direccion} onChange={e => set("direccion", e.target.value)} placeholder="Calle, número, piso"/></Field>
                </div>
                <Field label="Código postal"><Input value={data.cp} onChange={e => set("cp", e.target.value)} placeholder="28001" maxLength={5}/></Field>
              </div>
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish}/>
            </div>
          )}

          {step.id === "familia" && (
            <div>
              <h1 className="ob-h1" style={{margin:"16px 0"}}>Tu <em>situación</em> familiar.</h1>
              <p className="ob-sub">Nos ayuda a ajustar coberturas como vida o salud cuando hay personas que dependen de ti.</p>
              <Field label="Estado civil">
                <Radio value={data.estado} onChange={(v) => set("estado", v)}
                  options={[{value:"soltero",label:"Soltero/a"},{value:"casado",label:"Casado/a"},{value:"pareja",label:"Pareja de hecho"},{value:"otro",label:"Otro"}]}/>
              </Field>
              <div style={{height:14}}/>
              <Field label="¿Tienes hijos?">
                <Radio value={data.hijos ? "si" : "no"} onChange={(v) => set("hijos", v === "si")}
                  options={[{value:"si",label:"Sí"},{value:"no",label:"No"}]}/>
              </Field>
              {data.hijos && (
                <div style={{marginTop:14}}>
                  <Field label="Número de hijos">
                    <Input type="number" min={1} max={10} value={data.numHijos || ""} onChange={e => set("numHijos", parseInt(e.target.value) || 0)}/>
                  </Field>
                </div>
              )}
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish}/>
            </div>
          )}

          {step.id === "vehiculos" && (
            <div>
              <h1 className="ob-h1" style={{margin:"16px 0"}}>Tus <em>vehículos</em>.</h1>
              <p className="ob-sub">Si tienes coche o moto, lo tenemos en cuenta para tus seguros y renovaciones.</p>
              <Field label="¿Tienes coche?">
                <Radio value={data.coche ? "si" : "no"} onChange={(v) => set("coche", v === "si")}
                  options={[{value:"si",label:"Sí"},{value:"no",label:"No"}]}/>
              </Field>
              {data.coche && (
                <div className="ob-grid" style={{marginTop:14}}>
                  <Field label="Marca"><Input value={data.marca} onChange={e => set("marca", e.target.value)} placeholder="Ej. Volkswagen"/></Field>
                  <Field label="Modelo"><Input value={data.modelo} onChange={e => set("modelo", e.target.value)} placeholder="Ej. Golf"/></Field>
                  <Field label="Año">
                    <Select value={data.anio} onChange={e => set("anio", e.target.value)}>
                      <option value="">Selecciona</option>
                      {Array.from({length:20},(_,i) => 2026-i).map(y => <option key={y}>{y}</option>)}
                    </Select>
                  </Field>
                </div>
              )}
              <div style={{height:14}}/>
              <Field label="¿Tienes moto?">
                <Radio value={data.moto ? "si" : "no"} onChange={(v) => set("moto", v === "si")}
                  options={[{value:"si",label:"Sí"},{value:"no",label:"No"}]}/>
              </Field>
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish}/>
            </div>
          )}

          {step.id === "vivienda" && (
            <div>
              <h1 className="ob-h1" style={{margin:"16px 0"}}>Donde <em>vives</em>.</h1>
              <p className="ob-sub">Para sugerirte una cobertura de hogar adecuada cuando la necesites.</p>
              <Field label="Tipo de vivienda">
                <Radio value={data.vivienda} onChange={(v) => set("vivienda", v)}
                  options={[{value:"piso",label:"Piso"},{value:"casa",label:"Casa"},{value:"estudio",label:"Estudio"}]}/>
              </Field>
              <div style={{height:14}}/>
              <Field label="Régimen">
                <Radio value={data.regimen} onChange={(v) => set("regimen", v)}
                  options={[{value:"propietario",label:"Propietario/a"},{value:"alquiler",label:"Alquiler"}]}/>
              </Field>
              <div style={{height:14}}/>
              <Field label="Metros cuadrados">
                <Input type="number" min={20} max={1000} value={data.metros} onChange={e => set("metros", e.target.value)} placeholder="Ej. 85"/>
              </Field>
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish}/>
            </div>
          )}

          {step.id === "intereses" && (
            <div>
              <h1 className="ob-h1" style={{margin:"16px 0"}}>¿Qué te <em>importa</em> más?</h1>
              <p className="ob-sub">Marca todo lo que te interese. Adaptaremos las recomendaciones a lo que de verdad buscas.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  {k:"ahorrar",l:"Quiero ahorrar en seguros",s:"Optimizar el gasto manteniendo coberturas"},
                  {k:"centralizar",l:"Quiero centralizar pólizas",s:"Tener todo en un único panel"},
                  {k:"cobertura",l:"Quiero mejor cobertura",s:"Subir el nivel sin pagar de más"},
                  {k:"comparando",l:"Solo estoy comparando",s:"Sin compromiso, miraré opciones"},
                ].map(o => (
                  <Checkbox key={o.k} checked={data.intereses[o.k]} label={o.l} sub={o.s}
                    onChange={(v) => set("intereses", {...data.intereses, [o.k]: v})}/>
                ))}
              </div>
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish}/>
            </div>
          )}

          {step.id === "final" && (
            <div>
              <div style={{width:64,height:64,borderRadius:18,background:"var(--green)",color:"#fff",display:"grid",placeItems:"center",marginBottom:18}}>
                <I.Check size={28} sw={2.5}/>
              </div>
              <h1 className="ob-h1" style={{margin:"0 0 16px"}}>Tu perfil está <em>listo</em>.</h1>
              <p className="ob-sub">Ya podemos mostrarte opciones personalizadas y empezar a centralizar lo que ya tengas contratado.</p>
              <div className="card-flat" style={{padding:18,marginBottom:18}}>
                <div className="mono" style={{fontSize:10}}>RESUMEN</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:10}}>
                  {data.nombre && <Pill>{data.nombre.split(" ")[0]}</Pill>}
                  {data.cp && <Pill>CP {data.cp}</Pill>}
                  {data.coche && <Pill>Coche</Pill>}
                  {data.moto && <Pill>Moto</Pill>}
                  {data.vivienda && <Pill>{data.vivienda}</Pill>}
                  {data.hijos && <Pill>{data.numHijos || 1} hijo/s</Pill>}
                </div>
              </div>
              <OBNav idx={idx} setIdx={setIdx} onFinish={onFinish} last/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mobile responsive styles for onboarding
const obStyle = document.createElement("style");
obStyle.textContent = `
  @media(max-width:560px){.ob-welcome-grid{grid-template-columns:1fr !important}}
  @media(max-width:640px){.ob-top{padding:16px !important}.ob-body{padding:24px 16px !important}}
`;
document.head.appendChild(obStyle);

Object.assign(window, { OnboardingFlow });
