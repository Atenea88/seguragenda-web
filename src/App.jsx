import { useState, useEffect, useRef } from "react";

const BLUE = "#2952CC";
const DARK = "#1A3A7A";
const BG = "#F5F7FF";

const IMGS = {
  agenda:        "/images/agenda.png",
  ajustes:       "/images/ajustes.png",
  busqueda:      "/images/busqueda.png",
  clientes:      "/images/clientes.png",
  dashboard:     "/images/dashboard.png",
  documentacion: "/images/documentacion.png",
  emails:        "/images/emails.png",
  estadisticas:  "/images/estadisticas.png",
  exportaciones: "/images/exportaciones.png",
  home:          "/images/home.png",
  login:         "/images/login.png",
  notificaciones:"/images/notificaciones.png",
  pdf:           "/images/pdf.png",
  pipeline:      "/images/pipeline.png",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <span style={{ color: BLUE, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
      {text}
    </span>
  );
}

function FeatureSection({ label, title, desc, bullets, img, imgAlt, reverse = false }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", gap: 64,
      flexDirection: reverse ? "row-reverse" : "row",
      flexWrap: "wrap",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ flex: "1 1 320px", minWidth: 260 }}>
        <SectionLabel text={label} />
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px,3.5vw,40px)", color: DARK, fontWeight: 400, lineHeight: 1.2, marginBottom: 16 }}>
          {title}
        </h2>
        <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>{desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${BLUE}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <span style={{ fontSize: 14 }}>{b.icon}</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: DARK }}>{b.title}</div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: "1 1 400px", minWidth: 300 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(26,58,122,0.12)", border: "1px solid rgba(41,82,204,0.08)", background: "white" }}>
          <img src={img} alt={imgAlt} style={{ width: "100%", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

const PLANS = [
  {
    name: "FREE", price: "0€", anualPrice: "0€", period: "siempre",
    desc: "Para empezar a organizarte",
    features: ["Hasta 25 clientes", "Hasta 10 pólizas", "Vencimientos y alertas", "Agenda básica"],
    cta: "Empezar gratis", highlight: false,
  },
  {
    name: "Individual", price: "9€", anualPrice: "86€", period: "mes",
    desc: "Para agentes profesionales",
    features: ["Clientes y pólizas ilimitados", "Pipeline completo", "Estadísticas avanzadas", "Exportación PDF/Excel", "Insights inteligentes", "Documentación de pólizas"],
    cta: "Empezar ahora", highlight: true, badge: "Más popular",
  },
  {
    name: "Equipo S", price: "18€", anualPrice: "172€", period: "mes",
    desc: "Hasta 3 agentes",
    features: ["Todo lo de Individual", "Dashboard de equipo", "Ranking y objetivos", "Gestión de agentes"],
    cta: "Ver equipo", highlight: false,
  },
];

const FAQS = [
  { q: "¿Puedo empezar sin tarjeta?", a: "Sí. El plan FREE no requiere ningún dato de pago. Empieza en segundos desde la app." },
  { q: "¿Cómo funciona el período de prueba?", a: "Al registrarte tienes acceso completo durante el período de prueba. Sin límites, sin compromisos." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia ni penalizaciones. Cancela cuando quieras desde la app o por email a soporteseguragenda@gmail.com." },
  { q: "¿Mis datos están seguros?", a: "Sí. Usamos Supabase con cifrado en tránsito y en reposo. Cumplimos con el RGPD europeo." },
  { q: "¿Funciona en Android e iOS?", a: "Actualmente disponible en Android. La versión iOS está en desarrollo." },
  { q: "¿Qué incluye el plan FREE?", a: "Hasta 25 clientes, 10 pólizas, vencimientos y alertas. Perfecto para empezar sin coste." },
];

const DEMO_TABS = [
  { img: IMGS.dashboard,     label: "Dashboard" },
  { img: IMGS.clientes,      label: "Clientes" },
  { img: IMGS.pipeline,      label: "Pipeline" },
  { img: IMGS.estadisticas,  label: "Estadísticas" },
  { img: IMGS.agenda,        label: "Agenda" },
  { img: IMGS.documentacion, label: "Documentación" },
];

export default function App() {
  const [anual, setAnual]       = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: BG, color: "#111", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "0 24px",
        background: scrolled ? "rgba(245,247,255,0.94)" : "rgba(245,247,255,0.15)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(41,82,204,0.1)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", height: 68 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flex: 1 }}>
            <img src="/images/seguragenda_icon.png" alt="SegurAgenda" style={{ width: 36, height: 36, borderRadius: 10 }} />
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: DARK }}>SegurAgenda</span>
          </a>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Funciones", "Planes", "Demo"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color: scrolled ? "#555" : "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = BLUE}
                onMouseLeave={e => e.target.style.color = scrolled ? "#555" : "rgba(255,255,255,0.9)"}
              >{l}</a>
            ))}
            <a href="#planes" style={{
              background: `linear-gradient(135deg, ${BLUE}, ${DARK})`, color: "white",
              padding: "9px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 16px rgba(41,82,204,0.3)", transition: "transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >Empezar gratis</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(155deg, ${DARK} 0%, ${BLUE} 55%, #3D6FE8 100%)`,
        position: "relative", overflow: "hidden", paddingTop: 68,
      }}>
        {[[92,8,160],[12,70,100],[75,80,70],[3,25,45]].map(([r,t,s],i) => (
          <div key={i} style={{ position:"absolute", right:`${r}%`, top:`${t}%`, width:s, height:s, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        ))}
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"80px 24px", display:"flex", alignItems:"center", gap:60, flexWrap:"wrap", position:"relative", zIndex:1, width:"100%" }}>
          <div style={{ flex:"1 1 400px", minWidth:300 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:20, padding:"6px 14px", marginBottom:24 }}>
              <span style={{fontSize:12}}>🚀</span>
              <span style={{color:"white",fontSize:13,fontWeight:500}}>Ya disponible en Android</span>
            </div>
            <h1 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(36px,5vw,58px)", color:"white", lineHeight:1.1, marginBottom:20, fontWeight:400 }}>
              Gestiona tu cartera<br />de seguros desde<br />una sola app.
            </h1>
            <p style={{ color:"rgba(255,255,255,0.82)", fontSize:"clamp(15px,1.8vw,18px)", lineHeight:1.65, marginBottom:36, maxWidth:460 }}>
              Clientes, pólizas, vencimientos, estadísticas y agenda profesional en una experiencia moderna y rápida.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              <a href="#funciones" style={{ background:"white", color:DARK, padding:"13px 28px", borderRadius:12, fontSize:15, fontWeight:700, textDecoration:"none", boxShadow:"0 8px 28px rgba(0,0,0,0.2)", transition:"transform 0.15s" }}
                onMouseEnter={e=>e.target.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.target.style.transform="none"}
              >Ver funciones →</a>
              <a href="#demo" style={{ background:"rgba(255,255,255,0.14)", color:"white", padding:"13px 28px", borderRadius:12, fontSize:15, fontWeight:600, textDecoration:"none", border:"1px solid rgba(255,255,255,0.25)" }}>
                📱 Ver demo
              </a>
            </div>
            <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
              {["Sin tarjeta de crédito","Cancela cuando quieras","RGPD compliant"].map(t=>(
                <span key={t} style={{color:"rgba(255,255,255,0.65)",fontSize:13}}>✓ {t}</span>
              ))}
            </div>
          </div>
          <div style={{ flex:"1 1 400px", minWidth:300 }}>
            <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.1)" }}>
              <img src={IMGS.home} alt="SegurAgenda dashboard" style={{ width:"100%", display:"block" }} />
            </div>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:-1, left:0, right:0 }}>
          <svg viewBox="0 0 1440 80" fill="none"><path d="M0 80L360 20L720 55L1080 10L1440 45V80H0Z" fill={BG}/></svg>
        </div>
      </section>

      {/* CONFIANZA */}
      <div style={{ padding:"28px 24px", borderBottom:"1px solid rgba(41,82,204,0.08)" }}>
        <div style={{ maxWidth:1140, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", gap:40, flexWrap:"wrap" }}>
          <span style={{color:"#aaa",fontSize:13}}>Tecnología de confianza:</span>
          {["🔒 Supabase","💳 Stripe","🔔 Firebase","📱 Flutter","🇪🇺 RGPD"].map(t=>(
            <span key={t} style={{color:"#666",fontSize:14,fontWeight:500}}>{t}</span>
          ))}
        </div>
      </div>

      {/* FUNCIONES */}
      <section id="funciones" style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <FadeIn style={{textAlign:"center",marginBottom:80}}>
            <SectionLabel text="Funciones" />
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(28px,4vw,48px)", color:DARK, fontWeight:400, lineHeight:1.15 }}>
              Todo lo que necesitas<br />para crecer como agente
            </h2>
          </FadeIn>
          <div style={{ display:"flex", flexDirection:"column", gap:100 }}>
            <FeatureSection label="Gestión de clientes" title="Toda tu cartera, organizada y a mano"
              desc="Consulta, añade y organiza todos tus clientes desde un único lugar. Toda la información que necesitas, siempre a mano."
              bullets={[
                { icon:"👥", title:"Cartera completa", desc:"Consulta y administra todos tus clientes y su información clave." },
                { icon:"🔍", title:"Búsqueda inteligente", desc:"Encuentra clientes por nombre, teléfono, email o DNI al instante." },
                { icon:"⚡", title:"Acciones rápidas", desc:"Llama, envía email, inicia WhatsApp o crea una nueva póliza." },
              ]}
              img={IMGS.clientes} imgAlt="Gestión de clientes SegurAgenda"
            />
            <FeatureSection label="Agenda profesional" title="Tu agenda profesional, siempre contigo"
              desc="Organiza tu día, gestiona seguimientos y nunca pierdas de vista lo importante. Calendario, rutinas y acciones rápidas."
              bullets={[
                { icon:"📅", title:"Calendario inteligente", desc:"Visualiza tu día, semana o mes con todos tus eventos." },
                { icon:"📞", title:"Seguimientos", desc:"Controla vencimientos y pendientes sin perder ninguna oportunidad." },
                { icon:"✅", title:"Tareas y rutinas", desc:"Organiza tu trabajo diario con rutinas personalizadas." },
              ]}
              img={IMGS.agenda} imgAlt="Agenda profesional SegurAgenda" reverse
            />
            <FeatureSection label="Pipeline de ventas" title="Convierte más presupuestos en pólizas"
              desc="Visualiza todas tus oportunidades por estado. Filtra, prioriza y actúa. Pipeline completo con resumen de valor potencial."
              bullets={[
                { icon:"📊", title:"Vista por estados", desc:"Todos los presupuestos organizados por etapa de venta." },
                { icon:"💰", title:"Valor potencial", desc:"Ve de un vistazo cuánto dinero tienes en juego en cada etapa." },
                { icon:"🎯", title:"Acciones directas", desc:"Accede al detalle, llama o envía presupuesto en un toque." },
              ]}
              img={IMGS.pipeline} imgAlt="Pipeline de ventas SegurAgenda"
            />
            <FeatureSection label="Documentación" title="Documentación completa, sin papeles"
              desc="Gestiona toda la documentación de cada póliza. Sube, revisa y controla qué documentos faltan con alertas automáticas."
              bullets={[
                { icon:"📁", title:"Control de documentos", desc:"Sabe en todo momento qué documentos están completos y cuáles faltan." },
                { icon:"⚠️", title:"Alertas de incompletos", desc:"Notificaciones automáticas cuando falta documentación obligatoria." },
                { icon:"☁️", title:"Almacenamiento seguro", desc:"Todos los documentos guardados y accesibles desde cualquier lugar." },
              ]}
              img={IMGS.documentacion} imgAlt="Documentación de pólizas SegurAgenda" reverse
            />
            <FeatureSection label="Estadísticas y exportación" title="Datos claros para tomar mejores decisiones"
              desc="Métricas en tiempo real, objetivos, rapel y exportaciones para gestionar tu negocio de seguros con precisión."
              bullets={[
                { icon:"📈", title:"Resumen mensual", desc:"Visualiza ingresos, objetivos, actividad y tipos de seguro." },
                { icon:"💹", title:"Rapel y comisiones", desc:"Sabe exactamente en qué tramo estás y cuánto te falta para subir." },
                { icon:"📤", title:"Exportación PDF/CSV", desc:"Genera informes profesionales con un solo clic." },
              ]}
              img={IMGS.estadisticas} imgAlt="Estadísticas SegurAgenda"
            />
            <FeatureSection label="Seguridad y acceso" title="Accede de forma segura y sin complicaciones"
              desc="Registro rápido, recuperación de cuenta y seguridad en cada paso. Tus datos siempre protegidos."
              bullets={[
                { icon:"🔐", title:"Autenticación segura", desc:"Email verificado, contraseñas cifradas y recuperación de cuenta." },
                { icon:"📱", title:"Bloqueo con huella", desc:"Protege el acceso a la app con huella dactilar o PIN." },
                { icon:"🇪🇺", title:"RGPD compliant", desc:"Cumplimos con la normativa europea de protección de datos." },
              ]}
              img={IMGS.emails} imgAlt="Seguridad y acceso SegurAgenda" reverse
            />
          </div>
        </div>
      </section>

      {/* DEMO VISUAL */}
      <section id="demo" style={{ padding:"100px 24px", background:"white" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <FadeIn style={{textAlign:"center",marginBottom:48}}>
            <SectionLabel text="Demo visual" />
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(28px,4vw,44px)", color:DARK, fontWeight:400 }}>
              Explora cada pantalla
            </h2>
            <p style={{ color:"#666", fontSize:16, lineHeight:1.65, marginTop:16, maxWidth:520, margin:"16px auto 0" }}>
              Navega por las pantallas reales de SegurAgenda. Sin registro, sin sorpresas.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
              {DEMO_TABS.map((d,i) => (
                <button key={i} onClick={() => setActiveDemo(i)} style={{
                  padding:"8px 18px", borderRadius:20, cursor:"pointer", fontSize:14, fontWeight:500,
                  background: activeDemo===i ? `linear-gradient(135deg,${BLUE},${DARK})` : "transparent",
                  color: activeDemo===i ? "white" : "#666",
                  border: activeDemo===i ? "none" : "1px solid rgba(41,82,204,0.15)",
                  transition:"all 0.2s",
                }}>{d.label}</button>
              ))}
            </div>
            <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 20px 60px rgba(26,58,122,0.1)", border:"1px solid rgba(41,82,204,0.08)", maxWidth:900, margin:"0 auto" }}>
              <img src={DEMO_TABS[activeDemo].img} alt={DEMO_TABS[activeDemo].label} style={{ width:"100%", display:"block" }} />
            </div>
            <div style={{ textAlign:"center", marginTop:32 }}>
              <a href="#planes" style={{ background:`linear-gradient(135deg,${BLUE},${DARK})`, color:"white", padding:"14px 32px", borderRadius:14, fontWeight:700, fontSize:16, textDecoration:"none", boxShadow:"0 8px 24px rgba(41,82,204,0.3)", display:"inline-block" }}>
                Empezar gratis →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <FadeIn style={{textAlign:"center",marginBottom:48}}>
            <SectionLabel text="Planes" />
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(28px,4vw,44px)", color:DARK, fontWeight:400 }}>
              Precios honestos,<br />sin sorpresas
            </h2>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:24 }}>
              <span style={{ fontSize:14, color:anual?"#888":DARK, fontWeight:anual?400:600 }}>Mensual</span>
              <div onClick={()=>setAnual(!anual)} style={{ width:48, height:26, borderRadius:13, cursor:"pointer", background:anual?BLUE:"#ddd", position:"relative", transition:"background 0.3s" }}>
                <div style={{ width:20, height:20, borderRadius:"50%", background:"white", position:"absolute", top:3, left:anual?25:3, transition:"left 0.3s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
              <span style={{ fontSize:14, color:anual?DARK:"#888", fontWeight:anual?600:400 }}>Anual <span style={{color:"#27AE60",fontSize:12,fontWeight:600}}>-20%</span></span>
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, alignItems:"center" }}>
            {PLANS.map((p,i) => (
              <FadeIn key={p.name} delay={i*90}>
                <div style={{
                  borderRadius:22, padding:"32px 28px", position:"relative",
                  background: p.highlight?`linear-gradient(160deg,${DARK},${BLUE})`:"white",
                  border: p.highlight?"none":"1px solid rgba(41,82,204,0.1)",
                  boxShadow: p.highlight?"0 20px 56px rgba(26,58,122,0.3)":"0 4px 20px rgba(0,0,0,0.04)",
                  transform: p.highlight?"scale(1.04)":"none",
                }}>
                  {p.badge && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"#FFD700", color:DARK, fontSize:12, fontWeight:700, padding:"4px 18px", borderRadius:20, whiteSpace:"nowrap" }}>{p.badge}</div>}
                  <div style={{ color:p.highlight?"rgba(255,255,255,0.65)":"#888", fontSize:13, fontWeight:600, marginBottom:8 }}>{p.name}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                    <span style={{ fontSize:42, fontWeight:700, color:p.highlight?"white":DARK }}>{anual?p.anualPrice:p.price}</span>
                    <span style={{ color:p.highlight?"rgba(255,255,255,0.55)":"#aaa", fontSize:14 }}>/{anual?"año":p.period}</span>
                  </div>
                  <p style={{ color:p.highlight?"rgba(255,255,255,0.7)":"#666", fontSize:13, marginBottom:24 }}>{p.desc}</p>
                  <div style={{ marginBottom:28 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:10 }}>
                        <span style={{ color:p.highlight?"#7CFFB2":"#27AE60", fontSize:14, flexShrink:0 }}>✓</span>
                        <span style={{ color:p.highlight?"rgba(255,255,255,0.88)":"#444", fontSize:14 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="https://play.google.com/store" style={{ display:"block", textAlign:"center", padding:"13px 0", borderRadius:12, fontWeight:700, fontSize:15, textDecoration:"none", background:p.highlight?"white":`linear-gradient(135deg,${BLUE},${DARK})`, color:p.highlight?DARK:"white" }}>{p.cta}</a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:"80px 24px", background:"white" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <FadeIn style={{textAlign:"center",marginBottom:48}}>
            <SectionLabel text="FAQ" />
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(24px,3vw,38px)", color:DARK, fontWeight:400 }}>Preguntas frecuentes</h2>
          </FadeIn>
          {FAQS.map((f,i) => (
            <FadeIn key={i} delay={i*50}>
              <div style={{ borderBottom:"1px solid rgba(41,82,204,0.1)" }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", textAlign:"left", padding:"20px 0", background:"none", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", color:DARK, fontSize:16, fontWeight:500 }}>
                  {f.q}
                  <span style={{ fontSize:22, color:BLUE, transform:openFaq===i?"rotate(45deg)":"none", transition:"transform 0.25s", flexShrink:0, marginLeft:16 }}>+</span>
                </button>
                <div style={{ maxHeight:openFaq===i?200:0, overflow:"hidden", transition:"max-height 0.35s ease" }}>
                  <p style={{ color:"#666", fontSize:14, lineHeight:1.7, paddingBottom:20, margin:0 }}>{f.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding:"100px 24px" }}>
        <FadeIn>
          <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center", background:`linear-gradient(155deg,${DARK},${BLUE})`, borderRadius:28, padding:"72px 40px", position:"relative", overflow:"hidden" }}>
            {[[88,12,150],[4,70,90]].map(([r,t,s],i) => (
              <div key={i} style={{ position:"absolute", right:`${r}%`, top:`${t}%`, width:s, height:s, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
            ))}
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(28px,4vw,46px)", color:"white", fontWeight:400, marginBottom:16, position:"relative" }}>
              ¿Listo para gestionar tu cartera<br />como un profesional?
            </h2>
            <p style={{ color:"rgba(255,255,255,0.72)", fontSize:16, marginBottom:40, position:"relative" }}>Empieza gratis hoy. Sin tarjeta de crédito. Sin permanencia.</p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", position:"relative" }}>
              <a href="#planes" style={{ background:"white", color:DARK, padding:"14px 32px", borderRadius:14, fontWeight:700, fontSize:16, textDecoration:"none", boxShadow:"0 8px 28px rgba(0,0,0,0.25)" }}>Crear cuenta gratis →</a>
              <a href="#demo" style={{ background:"rgba(255,255,255,0.14)", color:"white", padding:"14px 32px", borderRadius:14, fontWeight:600, fontSize:16, textDecoration:"none", border:"1px solid rgba(255,255,255,0.25)" }}>Ver demo</a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ background:DARK, color:"rgba(255,255,255,0.65)", padding:"56px 24px 32px" }}>
        <div style={{ maxWidth:1140, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:40, marginBottom:48 }}>
            <div style={{maxWidth:240}}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <img src="/images/seguragenda_icon.png" alt="SegurAgenda" style={{ width:32, height:32, borderRadius:8 }} />
                <span style={{ fontFamily:"'DM Serif Display', serif", fontSize:18, color:"white" }}>SegurAgenda</span>
              </div>
              <p style={{ fontSize:13, lineHeight:1.65, margin:0 }}>La plataforma moderna para agentes de seguros profesionales. Hecha en España 🇪🇸</p>
            </div>
            <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
              {[
                { title:"Producto", links:["Funciones","Planes","Demo"] },
                { title:"Legal", links:["Política de privacidad","Términos y condiciones","Licencias"] },
                { title:"Soporte", links:["Centro de ayuda","soporteseguragenda@gmail.com","Acerca de"] },
              ].map(col => (
                <div key={col.title}>
                  <div style={{ color:"white", fontSize:13, fontWeight:600, marginBottom:14 }}>{col.title}</div>
                  {col.links.map(l => (
                    <div key={l} style={{marginBottom:10}}>
                      <a href="#" style={{ color:"rgba(255,255,255,0.55)", fontSize:13, textDecoration:"none" }}
                        onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.9)"}
                        onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}
                      >{l}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:24, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <span style={{fontSize:12}}>© 2026 Dolphin Surround · Made with Flutter in Barcelona 🇪🇸</span>
            <span style={{fontSize:12}}>SegurAgenda v1.0 · seguragenda@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
