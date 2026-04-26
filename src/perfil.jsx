// Perfil + Ajustes + Soporte

function PerfSection({ title, eyebrow, children, action }) {
  return (
    <div className="card" style={{padding:28,marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:18,gap:16,flexWrap:"wrap"}}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h3 className="display" style={{fontSize:28,margin:"4px 0 0",letterSpacing:"-.01em"}}>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function KV({ k, v, action }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderTop:"1px solid var(--rule-2)"}}>
      <div>
        <div className="mono" style={{fontSize:10}}>{k}</div>
        <div style={{marginTop:4,fontSize:15}}>{v}</div>
      </div>
      {action}
    </div>
  );
}

function Perfil({ user }) {
  const [tab, setTab] = React.useState("personal");
  const tabs = [
    {id:"personal", label:"Personal"},
    {id:"seguridad", label:"Seguridad"},
    {id:"prefs", label:"Preferencias"},
    {id:"pago", label:"Métodos de pago"},
    {id:"privacidad", label:"Privacidad"},
  ];
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Tu cuenta</span>
          <h1>Tu <em>perfil</em>.</h1>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:24}} className="prof-grid">
        <aside>
          <div className="card" style={{padding:18,marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="avatar" style={{width:48,height:48,fontSize:18}}>M</div>
              <div>
                <div style={{fontWeight:600,fontSize:15}}>Marta R.</div>
                <div className="mono" style={{fontSize:10,marginTop:2}}>{user?.email || "marta@ejemplo.com"}</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="sb-item"
                style={{
                  background: tab === t.id ? "var(--paper)" : "transparent",
                  border:"1px solid " + (tab === t.id ? "var(--rule)" : "transparent"),
                  fontWeight: tab === t.id ? 500 : 400, color: tab === t.id ? "var(--ink)" : "var(--ink-soft)"
                }}>
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        <div>
          {tab === "personal" && (
            <PerfSection eyebrow="Datos básicos" title="Información personal" action={<button className="btn btn-ghost btn-sm">Editar</button>}>
              <KV k="NOMBRE" v="Marta Rodríguez Vidal"/>
              <KV k="EMAIL" v={user?.email || "marta@ejemplo.com"}/>
              <KV k="TELÉFONO" v="+34 612 345 678"/>
              <KV k="DIRECCIÓN" v="Calle Serrano 24, 4º B · 28001 Madrid"/>
              <KV k="FECHA NACIMIENTO" v="14 de junio de 1989"/>
            </PerfSection>
          )}

          {tab === "seguridad" && (
            <>
              <PerfSection eyebrow="Acceso" title="Seguridad de la cuenta">
                <KV k="CONTRASEÑA" v="Última actualización hace 3 meses" action={<button className="btn btn-ghost btn-sm">Cambiar</button>}/>
                <KV k="VERIFICACIÓN EN 2 PASOS (2FA)" v="Activada · App autenticadora" action={<button className="btn btn-ghost btn-sm">Gestionar</button>}/>
              </PerfSection>
              <PerfSection eyebrow="Dispositivos" title="Sesiones activas">
                {[
                  {dev:"MacBook Pro · Madrid", ip:"83.45.12.7", last:"Ahora", current:true},
                  {dev:"iPhone 15 · Madrid", ip:"83.45.12.7", last:"Hace 2 horas"},
                  {dev:"Chrome · Barcelona", ip:"77.21.4.119", last:"Hace 5 días"},
                ].map((s,i) => (
                  <KV key={i} k={s.dev.toUpperCase()} v={`${s.ip} · ${s.last}`}
                    action={s.current
                      ? <Pill variant="solid-green">Actual</Pill>
                      : <button className="btn btn-ghost btn-sm">Cerrar</button>}/>
                ))}
              </PerfSection>
            </>
          )}

          {tab === "prefs" && (
            <PerfSection eyebrow="Tus preferencias" title="Cómo quieres usar SeguroDirecto">
              <KV k="IDIOMA" v="Español (España)" action={<button className="btn btn-ghost btn-sm">Cambiar</button>}/>
              <KV k="NOTIFICACIONES" v="Email, push y SMS" action={<button className="btn btn-ghost btn-sm">Editar</button>}/>
              <KV k="RECORDATORIOS DE RENOVACIÓN" v="Activos · Aviso 30 días antes" action={<button className="btn btn-ghost btn-sm">Editar</button>}/>
              <KV k="MARKETING" v="Solo emails relevantes para mis seguros" action={<button className="btn btn-ghost btn-sm">Editar</button>}/>
            </PerfSection>
          )}

          {tab === "pago" && (
            <PerfSection eyebrow="Pagos" title="Métodos guardados" action={<button className="btn btn-blue btn-sm"><I.Plus size={12}/> Añadir método</button>}>
              <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 0",borderTop:"1px solid var(--rule-2)"}}>
                <div style={{width:54,height:36,borderRadius:6,background:"linear-gradient(135deg,var(--ink),var(--blue))",color:"#fff",display:"grid",placeItems:"center",fontFamily:"var(--mono)",fontSize:10}}>VISA</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:500}}>•••• •••• •••• 4824</div>
                  <div className="mono" style={{fontSize:10,marginTop:2}}>EXPIRA 09 / 28 · PRINCIPAL</div>
                </div>
                <Pill variant="solid-green">Por defecto</Pill>
                <button className="btn btn-ghost btn-sm">Editar</button>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 0",borderTop:"1px solid var(--rule-2)"}}>
                <div style={{width:54,height:36,borderRadius:6,background:"var(--canvas-2)",border:"1px solid var(--rule)",display:"grid",placeItems:"center",fontFamily:"var(--mono)",fontSize:10}}>SEPA</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:500}}>ES•• •••• •••• •••• •••• 0142</div>
                  <div className="mono" style={{fontSize:10,marginTop:2}}>CUENTA BANCARIA</div>
                </div>
                <button className="btn btn-ghost btn-sm">Eliminar</button>
              </div>
            </PerfSection>
          )}

          {tab === "privacidad" && (
            <>
              <PerfSection eyebrow="Tus datos" title="Privacidad">
                <KV k="DESCARGAR MIS DATOS" v="Recibe un archivo con toda tu información" action={<button className="btn btn-ghost btn-sm"><I.Download size={12}/> Solicitar</button>}/>
                <KV k="ELIMINAR CUENTA" v="Borra tu cuenta y todos los datos asociados" action={<button className="btn btn-ghost btn-sm" style={{color:"#C63030",borderColor:"#E0B5B5"}}>Eliminar</button>}/>
              </PerfSection>
            </>
          )}
        </div>
      </div>
      <style>{`
        @media(max-width:880px){
          .prof-grid{grid-template-columns:1fr !important}
          .prof-grid aside{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap}
          .prof-grid aside > div:first-child{flex:1;min-width:200px}
          .prof-grid aside > div:last-child{flex:2;min-width:200px;display:flex;flex-direction:row;flex-wrap:wrap;gap:4px}
          .prof-grid aside > div:last-child button{flex:1;min-width:120px}
        }
      `}</style>
    </div>
  );
}

function Ajustes() {
  const [theme, setTheme] = React.useState(document.body.getAttribute("data-theme") === "dark" ? "dark" : "light");
  const flip = (t) => { setTheme(t); document.body.setAttribute("data-theme", t === "dark" ? "dark" : ""); };
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Ajustes</span>
          <h1>Tu <em>experiencia</em>.</h1>
        </div>
      </div>
      <PerfSection eyebrow="Apariencia" title="Tema">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:8}}>
          <button onClick={() => flip("light")} className="card-flat"
            style={{padding:18,textAlign:"left",cursor:"pointer",border:"1px solid " + (theme === "light" ? "var(--ink)" : "var(--rule)"),background:"var(--paper)"}}>
            <I.Sun size={20}/>
            <div style={{fontWeight:600,marginTop:10,fontSize:14}}>Claro</div>
            <div style={{fontSize:12,color:"var(--ink-mute)",marginTop:4}}>Por defecto, luminoso y editorial.</div>
          </button>
          <button onClick={() => flip("dark")} className="card-flat"
            style={{padding:18,textAlign:"left",cursor:"pointer",border:"1px solid " + (theme === "dark" ? "var(--ink)" : "var(--rule)"),background:"var(--paper)"}}>
            <I.Moon size={20}/>
            <div style={{fontWeight:600,marginTop:10,fontSize:14}}>Oscuro</div>
            <div style={{fontSize:12,color:"var(--ink-mute)",marginTop:4}}>Sereno, ideal para uso prolongado.</div>
          </button>
        </div>
      </PerfSection>
      <PerfSection eyebrow="Comunicaciones" title="Cómo te contactamos">
        <KV k="EMAIL TRANSACCIONAL" v="Activado · Pólizas, recibos y avisos críticos"/>
        <KV k="EMAIL DE PRODUCTO" v="Solo si afecta a mis seguros" action={<button className="btn btn-ghost btn-sm">Editar</button>}/>
        <KV k="SMS" v="Solo avisos urgentes" action={<button className="btn btn-ghost btn-sm">Editar</button>}/>
      </PerfSection>
      <PerfSection eyebrow="Cookies y privacidad" title="Centro de privacidad">
        <KV k="COOKIES NECESARIAS" v="Siempre activas · No se pueden desactivar"/>
        <KV k="COOKIES ANALÍTICAS" v="Activas" action={<button className="btn btn-ghost btn-sm">Cambiar</button>}/>
        <KV k="PERSONALIZACIÓN" v="Activa" action={<button className="btn btn-ghost btn-sm">Cambiar</button>}/>
      </PerfSection>
    </div>
  );
}

function Soporte() {
  return (
    <div className="app-content fadeUp">
      <div className="pg-h">
        <div>
          <span className="eyebrow">Soporte</span>
          <h1>¿En qué te <em>ayudamos</em>?</h1>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}} className="sup-grid">
        {[
          {ic:I.Phone, t:"Llamar a un asesor", s:"L–V · 9:00 a 20:00", action:"Llamar ahora"},
          {ic:I.Mail, t:"Email", s:"Respuesta en menos de 24h", action:"Escribir"},
          {ic:I.Help, t:"Centro de ayuda", s:"Guías y preguntas frecuentes", action:"Explorar"},
        ].map(c => {
          const Icon = c.ic;
          return (
            <div key={c.t} className="card" style={{padding:24,display:"flex",flexDirection:"column",gap:12}}>
              <Icon size={28}/>
              <div style={{fontFamily:"var(--display)",fontSize:24,letterSpacing:"-.01em"}}>{c.t}</div>
              <div className="mono" style={{fontSize:11}}>{c.s}</div>
              <button className="btn btn-primary btn-sm" style={{marginTop:"auto",alignSelf:"flex-start"}}>{c.action} <I.ArrowRight size={12}/></button>
            </div>
          );
        })}
      </div>
      <div style={{height:18}}/>
      <PerfSection eyebrow="Mensaje rápido" title="Cuéntanos qué necesitas">
        <Field label="Asunto"><Input placeholder="Ej. Quiero cambiar mi póliza de coche"/></Field>
        <div style={{height:12}}/>
        <Field label="Mensaje"><textarea className="textarea" placeholder="Escribe aquí..." rows={5}/></Field>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:14}}>
          <button className="btn btn-blue">Enviar mensaje <I.ArrowRight size={14}/></button>
        </div>
      </PerfSection>
      <style>{`
        @media(max-width:880px){.sup-grid{grid-template-columns:1fr !important}}
        @media(min-width:560px) and (max-width:880px){.sup-grid{grid-template-columns:repeat(3,1fr) !important}}
      `}</style>
    </div>
  );
}

Object.assign(window, { Perfil, Ajustes, Soporte });
