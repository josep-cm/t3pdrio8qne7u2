// App root + routing + Tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#2D55F5",
  "displayFont": "Instrument Serif"
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = React.useState("home"); // home | login | register | onboarding | app
  const [user, setUser] = React.useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.setAttribute("data-theme", t.theme === "dark" ? "dark" : "");
    document.documentElement.style.setProperty("--blue", t.accent);
    if (t.displayFont) document.documentElement.style.setProperty("--display", `'${t.displayFont}', 'Times New Roman', serif`);
  }, [t.theme, t.accent, t.displayFont]);

  React.useEffect(() => { window.scrollTo(0, 0); }, [route]);

  const go = (r) => setRoute(r);
  const onLogin = (u) => { setUser(u); setRoute("app"); };
  const onRegister = (u) => { setUser(u); setRoute("onboarding"); };
  const onFinish = () => setRoute("app");
  const onLogout = () => { setUser(null); setRoute("home"); };

  return (
    <>
      {route === "home" && <PublicSite go={go} route={route}/>}
      {route === "login" && <LoginScreen go={go} onLogin={onLogin}/>}
      {route === "register" && <RegisterScreen go={go} onRegister={onRegister}/>}
      {route === "onboarding" && <OnboardingFlow onFinish={onFinish} go={go}/>}
      {route === "app" && <DashboardShell user={user} onLogout={onLogout}/>}

      <TweaksPanel>
        <TweakSection label="Apariencia"/>
        <TweakRadio label="Tema" value={t.theme}
          options={[{value:"light",label:"Claro"},{value:"dark",label:"Oscuro"}]}
          onChange={(v) => setTweak("theme", v)}/>
        <TweakColor label="Color de acento" value={t.accent}
          onChange={(v) => setTweak("accent", v)}/>
        <TweakSelect label="Tipo display" value={t.displayFont}
          options={[
            {value:"Instrument Serif", label:"Instrument Serif"},
            {value:"Geist", label:"Geist (sans)"}
          ]}
          onChange={(v) => setTweak("displayFont", v)}/>

        <TweakSection label="Navegación rápida"/>
        <TweakButton label="Inicio (web pública)" onClick={() => setRoute("home")}/>
        <TweakButton label="Registro" onClick={() => setRoute("register")}/>
        <TweakButton label="Iniciar sesión" onClick={() => setRoute("login")}/>
        <TweakButton label="Onboarding" onClick={() => setRoute("onboarding")}/>
        <TweakButton label="Dashboard" onClick={() => { setUser({email:"marta@ejemplo.com"}); setRoute("app"); }}/>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
