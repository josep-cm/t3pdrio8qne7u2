// Auth screens — Login + Register

function AuthSide() {
  return (
    <div className="auth-side">
      <Logo invert size="lg" />
      <div>
        <div style={{fontFamily:"var(--mono)",fontSize:11,letterSpacing:".14em",textTransform:"uppercase",opacity:.65,marginBottom:18}}>
          /// La idea
        </div>
        <div className="auth-quote">
          “Asegurar lo que importa <em style={{color:"#5C7BFF"}}>no debería</em> ser difícil. Lo simplificamos.”
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,opacity:.7,fontFamily:"var(--mono)",letterSpacing:".06em",textTransform:"uppercase"}}>
        <span>Madrid · 2026</span>
        <span>SD-04</span>
      </div>
    </div>
  );
}

function LoginScreen({ go, onLogin }) {
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const submit = (e) => { e.preventDefault(); onLogin({ email: email || "marta@ejemplo.com" }); };
  return (
    <div className="auth-wrap">
      <AuthSide />
      <div className="auth-form">
        <div className="auth-card fadeUp">
          <div style={{marginBottom:32}}>
            <span className="eyebrow">Bienvenido de vuelta</span>
            <h1 className="display" style={{fontSize:56,margin:"8px 0 0"}}>Iniciar <em style={{color:"var(--blue)",fontStyle:"italic"}}>sesión</em></h1>
          </div>
          <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16}}>
            <Field label="Email">
              <Input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </Field>
            <Field label="Contraseña">
              <div style={{position:"relative"}}>
                <Input type={showPw ? "text" : "password"} placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} />
                <button type="button" onClick={() => setShowPw(v => !v)} className="iconbtn"
                  style={{position:"absolute",right:6,top:4,height:36,border:"none",background:"transparent"}}>
                  {showPw ? <I.EyeOff size={16}/> : <I.Eye size={16}/>}
                </button>
              </div>
            </Field>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <a style={{fontSize:13,color:"var(--ink-soft)",cursor:"pointer"}}>¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%"}}>
              Entrar <I.ArrowRight size={16}/>
            </button>
            <div style={{display:"flex",alignItems:"center",gap:12,margin:"4px 0",color:"var(--ink-mute)",fontSize:12,fontFamily:"var(--mono)",letterSpacing:".06em"}}>
              <div style={{flex:1,height:1,background:"var(--rule)"}}></div>
              <span>O CONTINÚA CON</span>
              <div style={{flex:1,height:1,background:"var(--rule)"}}></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button type="button" className="btn btn-ghost" onClick={submit}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8a4 4 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5Z" fill="#4285F4"/>
                  <path d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.3c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.4A9 9 0 0 0 9 18Z" fill="#34A853"/>
                  <path d="M3.9 10.6A5.4 5.4 0 0 1 3.6 9c0-.6.1-1.1.3-1.6V5H.9a9 9 0 0 0 0 8l3-2.4Z" fill="#FBBC05"/>
                  <path d="M9 3.6c1.3 0 2.5.5 3.4 1.4l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6Z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="btn btn-ghost" onClick={submit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 12.7c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2.9-4.1.9-.9 0-2.2-.9-3.6-.9-1.9 0-3.6 1.1-4.5 2.7-1.9 3.3-.5 8.3 1.4 11 .9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9 1.7 0 2.1.9 3.5.9 1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1-.1 0-2.8-1.1-2.8-4.5ZM14.8 4.7c.7-.9 1.2-2.1 1.1-3.3-1.1.1-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.2-1.5Z"/></svg>
                Apple
              </button>
            </div>
            <div style={{textAlign:"center",fontSize:14,color:"var(--ink-soft)",marginTop:8}}>
              ¿No tienes cuenta? <a onClick={() => go("register")} style={{cursor:"pointer",color:"var(--ink)",fontWeight:500,textDecoration:"underline",textUnderlineOffset:3}}>Regístrate</a>
            </div>
          </form>
          <button onClick={() => go("home")} className="btn btn-soft btn-sm" style={{marginTop:24}}>← Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

function RegisterScreen({ go, onRegister }) {
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const submit = (e) => { e.preventDefault(); onRegister({ email: email || "nuevo@ejemplo.com" }); };
  return (
    <div className="auth-wrap">
      <AuthSide />
      <div className="auth-form">
        <div className="auth-card fadeUp">
          <div style={{marginBottom:32}}>
            <span className="eyebrow">Crea tu cuenta</span>
            <h1 className="display" style={{fontSize:56,margin:"8px 0 0"}}>Empieza <em style={{color:"var(--blue)",fontStyle:"italic"}}>aquí</em>.</h1>
            <p className="soft" style={{margin:"12px 0 0",fontSize:15,lineHeight:1.55}}>Tu cuenta estará lista en menos de dos minutos.</p>
          </div>
          <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:14}}>
            <Field label="Email">
              <Input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </Field>
            <Field label="Contraseña" hint="Mínimo 8 caracteres, una mayúscula y un número.">
              <Input type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} />
            </Field>
            <Checkbox checked={terms} onChange={setTerms}
              label="Acepto las condiciones y la política de privacidad"
              sub="Puedes consultar nuestra política en cualquier momento desde tu perfil." />
            <button type="submit" className="btn btn-blue btn-lg" style={{width:"100%",marginTop:6}}>
              Crear cuenta <I.ArrowRight size={16}/>
            </button>
            <div style={{textAlign:"center",fontSize:14,color:"var(--ink-soft)"}}>
              ¿Ya tienes cuenta? <a onClick={() => go("login")} style={{cursor:"pointer",color:"var(--ink)",fontWeight:500,textDecoration:"underline",textUnderlineOffset:3}}>Inicia sesión</a>
            </div>
          </form>
          <button onClick={() => go("home")} className="btn btn-soft btn-sm" style={{marginTop:24}}>← Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, RegisterScreen });
