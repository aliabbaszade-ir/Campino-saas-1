import { FormEvent, ReactNode, useMemo, useState } from 'react'

type Page = 'landing' | 'dashboard' | 'builder' | 'assistant' | 'tools' | 'pricing' | 'checkout'
type IconName =
  | 'spark'
  | 'grid'
  | 'campaign'
  | 'chat'
  | 'book'
  | 'settings'
  | 'plus'
  | 'arrow'
  | 'check'
  | 'clock'
  | 'trend'
  | 'users'
  | 'target'
  | 'wand'
  | 'play'
  | 'lock'
  | 'menu'
  | 'close'
  | 'send'
  | 'alert'
  | 'card'
  | 'shield'

const iconPaths: Record<IconName, ReactNode> = {
  spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14ZM5 15l.7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Z"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  campaign: <><path d="M4 13V9a2 2 0 0 1 2-2h3l8-4v16l-8-4H6a2 2 0 0 1-2-2Z"/><path d="m9 15 1 6H7l-1-6M20 8v6"/></>,
  chat: <><path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 20 15Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M8 7h8M8 11h6"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  arrow: <path d="m9 18 6-6-6-6"/>,
  check: <path d="m20 6-11 11-5-5"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  trend: <><path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  wand: <><path d="m15 4 5 5L8 21H3v-5L15 4Z"/><path d="m13 6 5 5M5 4v3M3.5 5.5h3M19 16v5M16.5 18.5h5"/></>,
  play: <path d="m9 7 8 5-8 5V7Z"/>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></>,
  alert: <><path d="M10.3 3.7 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
}

function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className="logo"><span className={light ? 'logo-mark light' : 'logo-mark'}><Icon name="spark" size={22}/></span><span className={light ? 'text-white' : ''}>کمپینو</span></div>
}

const navItems: { page: Page; label: string; icon: IconName }[] = [
  { page: 'dashboard', label: 'نمای کلی', icon: 'grid' },
  { page: 'builder', label: 'کمپین‌های من', icon: 'campaign' },
  { page: 'tools', label: 'ابزارهای هوشمند', icon: 'wand' },
  { page: 'assistant', label: 'دستیار هوشمند', icon: 'chat' },
  { page: 'pricing', label: 'آموزش‌ها', icon: 'book' },
]

function Landing({ go }: { go: (p: Page) => void }) {
  const [faq, setFaq] = useState<number | null>(0)
  return <div className="landing">
    <header className="landing-nav">
      <Logo />
      <nav><a href="#benefits">امکانات</a><a href="#steps">چطور کار می‌کند؟</a><a href="#pricing">تعرفه‌ها</a><a href="#faq">سوالات متداول</a></nav>
      <div className="nav-actions"><button className="text-btn" onClick={() => go('dashboard')}>ورود</button><button className="btn btn-dark" onClick={() => go('builder')}>شروع رایگان <Icon name="arrow" size={17}/></button></div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-glow one" /><div className="hero-glow two" />
        <div className="eyebrow"><Icon name="spark" size={16}/> مربی هوشمند فروش برای کسب‌وکارهای کوچک</div>
        <h1>کمپین فروش خودت رو<br/><span>با هوش مصنوعی بساز</span></h1>
        <p>از ایده تا اجرا، کمپینو کنارت است تا بدون نیاز به متخصص گران‌قیمت، یک کمپین حرفه‌ای و نتیجه‌محور طراحی کنی.</p>
        <div className="hero-actions"><button className="btn btn-primary btn-lg" onClick={() => go('builder')}>ساخت اولین کمپین <Icon name="arrow"/></button><button className="btn btn-ghost btn-lg" onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}><span className="play"><Icon name="play" size={16}/></span> تماشای دموی محصول</button></div>
        <div className="social-proof"><div className="avatars"><span>م</span><span>س</span><span>آ</span><span>ن</span></div><div><b>+۱۲۰۰ کارآفرین</b><small>به کمپینو اعتماد کرده‌اند</small></div></div>
        <ProductMockup />
      </section>

      <section id="benefits" className="section">
        <div className="section-heading"><span>چرا کمپینو؟</span><h2>فروش بیشتر، با مسیر روشن‌تر</h2><p>تمام ابزارهایی که برای ساخت یک کمپین موفق نیاز داری، در یک فضای ساده و هوشمند.</p></div>
        <div className="benefit-grid">
          {[
            ['wand','استراتژی اختصاصی','بر اساس کسب‌وکار و مشتری‌های تو؛ نه پیشنهادهای عمومی و تکراری.'],
            ['chat','همراهی هوش مصنوعی','در هر مرحله ضعف‌ها را پیدا می‌کند و راهکار عملی به تو می‌دهد.'],
            ['trend','از یادگیری تا اجرا','هم‌زمان با ساخت کمپین، اصول فروش را ساده و کاربردی یاد می‌گیری.'],
          ].map(([icon,title,desc]) => <article className="benefit-card" key={title}><div className="benefit-icon"><Icon name={icon as IconName}/></div><h3>{title}</h3><p>{desc}</p><a onClick={() => go('builder')}>بیشتر بدانید <Icon name="arrow" size={16}/></a></article>)}
        </div>
      </section>

      <section id="steps" className="section how">
        <div className="section-heading"><span>فقط سه قدم</span><h2>از ایده تا یک کمپین آماده اجرا</h2></div>
        <div className="steps">
          {[
            ['۱','کسب‌وکارت را معرفی کن','به چند سوال ساده درباره محصول و مشتری‌هایت جواب بده.'],
            ['۲','با هوش مصنوعی طراحی کن','کمپینو بهترین استراتژی، پیشنهاد و پیام را به تو پیشنهاد می‌دهد.'],
            ['۳','کمپین را اجرا کن','برنامه محتوایی و زمان‌بندی آماده‌ات را بردار و شروع کن.'],
          ].map(([n,t,d],i) => <div className="step" key={n}><div className="step-number">{n}</div>{i < 2 && <div className="step-line"/>}<h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>

      <section id="pricing" className="section pricing-section">
        <div className="section-heading"><span>تعرفه‌های شفاف</span><h2>اول امتحان کن، بعد تصمیم بگیر</h2></div>
        <PricingCards go={go}/>
      </section>

      <section id="faq" className="section faq-section">
        <div className="section-heading"><span>سوالات متداول</span><h2>شاید سوال تو هم باشد</h2></div>
        <div className="faq-list">
          {[
            ['آیا برای استفاده از کمپینو باید بازاریابی بلد باشم؟','خیر. کمپینو دقیقاً برای کسانی طراحی شده که تجربه کمی دارند. در هر مرحله مفاهیم را ساده توضیح می‌دهیم و با مثال راهنمایی‌ات می‌کنیم.'],
            ['نسخه رایگان شامل چه امکاناتی است؟','می‌توانی اطلاعات کمپین را کامل کنی، تحلیل اولیه هوش مصنوعی را ببینی و ساختار پیشنهادی کمپین را دریافت کنی.'],
            ['بعد از خرید، کمپین تا چه زمانی در دسترس است؟','کمپین‌های خریداری‌شده همیشه در حساب تو باقی می‌مانند و هر زمان بخواهی می‌توانی به آن‌ها برگردی.'],
            ['آیا پیشنهادها برای هر کسب‌وکار اختصاصی هستند؟','بله، پاسخ‌های تو درباره بازار، محصول، مشتری و اهداف مبنای تولید استراتژی اختصاصی قرار می‌گیرند.'],
          ].map(([q,a],i) => <div className={`faq-item ${faq === i ? 'open' : ''}`} key={q}><button onClick={() => setFaq(faq === i ? null : i)}><span>{q}</span><span>{faq === i ? '−' : '+'}</span></button>{faq === i && <p>{a}</p>}</div>)}
        </div>
      </section>
    </main>
    <footer><Logo light/><p>ساخته شده برای رشد کسب‌وکارهای ایرانی</p><button onClick={() => go('builder')}>رایگان شروع کن <Icon name="arrow" size={16}/></button></footer>
  </div>
}

function ProductMockup() {
  return <div id="preview" className="product-wrap">
    <div className="browser-bar"><div><i/><i/><i/></div><span>app.campino.ir/campaign</span><span className="mini-shield"><Icon name="shield" size={14}/></span></div>
    <div className="product-mock">
      <aside><Logo/><div className="mock-links"><b><Icon name="grid" size={17}/> نمای کلی</b><span><Icon name="campaign" size={17}/> کمپین‌های من</span><span><Icon name="chat" size={17}/> دستیار هوشمند</span><span><Icon name="book" size={17}/> آموزش‌ها</span></div></aside>
      <div className="mock-main">
        <div className="mock-top"><div><h4>صبح بخیر، سارا!</h4><p>آماده‌ای کمپینت رو قوی‌تر کنی؟</p></div><button>+ کمپین جدید</button></div>
        <div className="mock-stats"><div><small>کمپین‌های فعال</small><b>۲</b><em>+۱ این ماه</em></div><div><small>میانگین پیشرفت</small><b>۶۸٪</b><span className="mock-bar"><i/></span></div><div><small>امتیاز یادگیری</small><b>۸۴۰</b><em>سطح حرفه‌ای</em></div></div>
        <div className="mock-campaign"><div className="mock-title"><span className="mock-img"><Icon name="campaign"/></span><div><b>فروش ویژه نوروزی</b><small>فروشگاه آنلاین پوشاک وینا</small></div><i>در حال ساخت</i></div><div className="mock-progress-label"><span>پیشرفت کمپین</span><b>۷۲٪</b></div><span className="mock-bar wide"><i/></span><div className="mock-chips"><span>شناخت مشتری <b>✓</b></span><span>استراتژی پیشنهاد <b>✓</b></span><span>برنامه محتوا</span></div></div>
      </div>
    </div>
  </div>
}

function AppShell({ page, go, onBack, children }: { page: Page; go: (p: Page) => void; onBack: () => void; children: ReactNode }) {
  const [mobile, setMobile] = useState(false)
  return <div className="app-shell">
    {mobile && <div className="sidebar-overlay" onClick={() => setMobile(false)}/>}
    <aside className={`app-sidebar ${mobile ? 'show' : ''}`}>
      <div className="sidebar-head"><Logo/><button className="mobile-close" onClick={() => setMobile(false)}><Icon name="close"/></button></div>
      <nav>
        <small>منوی اصلی</small>
        {navItems.map(item => <button className={page === item.page ? 'active' : ''} key={item.page} onClick={() => { go(item.page); setMobile(false) }}><Icon name={item.icon}/>{item.label}{item.page === 'assistant' && <i>AI</i>}</button>)}
        <small>حساب کاربری</small>
        <button><Icon name="settings"/> تنظیمات</button>
      </nav>
      <div className="sidebar-upgrade"><span><Icon name="spark" size={17}/></span><b>کمپین‌های نامحدود</b><p>با ارتقا به حرفه‌ای، بدون محدودیت رشد کن.</p><button onClick={() => go('pricing')}>مشاهده پلن‌ها</button></div>
      <div className="user-block"><span className="user-avatar">س</span><div><b>سارا احمدی</b><small>پلن رایگان</small></div><button>•••</button></div>
    </aside>
    <div className="app-content">
      <header className="app-header"><button className="mobile-menu" onClick={() => setMobile(true)}><Icon name="menu"/></button><button className="global-back" onClick={onBack}><Icon name="arrow" size={17}/> بازگشت</button><div className="header-title">{page === 'dashboard' ? 'نمای کلی' : page === 'builder' ? 'ساخت کمپین' : page === 'assistant' ? 'دستیار هوشمند' : page === 'tools' ? 'جعبه ابزار هوشمند' : page === 'checkout' ? 'پرداخت امن' : 'تعرفه‌ها'}</div><div className="header-actions"><button className="icon-button"><span className="notification-dot"/><Icon name="alert"/></button><button className="help-btn">؟</button></div></header>
      {children}
    </div>
  </div>
}

function Dashboard({ go }: { go: (p: Page) => void }) {
  return <div className="page dashboard">
    <section className="welcome"><div><span className="date">یکشنبه، ۲۴ فروردین ۱۴۰۴</span><h1>سلام سارا، آماده‌ای رشد کنیم؟</h1><p>کمپین نوروزی‌ات خوب پیش می‌رود. فقط دو قدم تا تکمیل فاصله داری.</p></div><button className="btn btn-primary" onClick={() => go('builder')}><Icon name="plus"/> ساخت کمپین جدید</button></section>
    <div className="dashboard-stats">
      <StatCard icon="campaign" label="کمپین‌های فعال" value="۲ کمپین" note="از ۳ کمپین پلن رایگان" color="green"/>
      <StatCard icon="trend" label="میانگین پیشرفت" value="۶۸٪" note="۱۲٪ بهتر از هفته قبل" color="yellow"/>
      <StatCard icon="book" label="مسیر یادگیری" value="۷ از ۱۲" note="درس تکمیل شده" color="cream"/>
      <StatCard icon="spark" label="امتیاز کمپینو" value="۸۴۰" note="سطح حرفه‌ای" color="mint"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel campaign-panel">
        <div className="panel-head"><div><h2>کمپین‌های فعال</h2><p>کمپین‌هایت را ادامه بده و آماده اجرا کن.</p></div><button onClick={() => go('builder')}>مشاهده همه <Icon name="arrow" size={16}/></button></div>
        <CampaignRow title="فروش ویژه نوروزی وینا" desc="فروشگاه آنلاین پوشاک" progress={72} status="در حال ساخت" icon="campaign"/>
        <CampaignRow title="معرفی دوره عکاسی محصول" desc="آکادمی آنلاین فریم" progress={38} status="پیش‌نویس" icon="play"/>
      </section>
      <section className="panel learning-panel">
        <div className="panel-head"><div><h2>مسیر یادگیری تو</h2><p>هر روز یک قدم حرفه‌ای‌تر</p></div><span className="level">سطح ۴</span></div>
        <div className="lesson-progress"><span><b>۷</b> از ۱۲ درس</span><b>۵۸٪</b></div><div className="progress-track"><i style={{width:'58%'}}/></div>
        <div className="next-lesson"><span className="lesson-icon"><Icon name="target"/></span><div><small>درس بعدی · ۸ دقیقه</small><b>پیشنهادی که نمی‌شود رد کرد</b><p>ساخت یک پیشنهاد فروش جذاب و قانع‌کننده</p></div><button><Icon name="play" size={16}/></button></div>
        <button className="outline-full">ادامه مسیر یادگیری</button>
      </section>
    </div>
    <section className="panel smart-tools-panel">
      <div className="panel-head"><div><h2>ابزارهای هوشمند کمپینو</h2><p>از تحقیق بازار تا اجرا و بهینه‌سازی، همه‌چیز در یک مسیر منسجم</p></div><button onClick={() => go('tools')}>مشاهده همه ۱۶ ابزار <Icon name="arrow" size={16}/></button></div>
      <div className="dashboard-tools">
        <button onClick={() => go('tools')}><span><Icon name="users"/></span><div><b>تحلیل مشتری</b><small>نیازها، انگیزه‌ها و اعتراض‌ها</small></div><Icon name="arrow" size={16}/></button>
        <button onClick={() => go('tools')}><span><Icon name="target"/></span><div><b>تحلیل رقبا</b><small>قیمت، پیشنهاد و فرصت بازار</small></div><Icon name="arrow" size={16}/></button>
        <button onClick={() => go('tools')}><span><Icon name="campaign"/></span><div><b>قیف فروش</b><small>طراحی مسیر مشتری تا خرید</small></div><Icon name="arrow" size={16}/></button>
        <button onClick={() => go('tools')}><span><Icon name="wand"/></span><div><b>تولید محتوای AI</b><small>متن، کپشن و سناریوی ویدیو</small></div><Icon name="arrow" size={16}/></button>
      </div>
    </section>
    <section className="panel activity-panel"><div className="panel-head"><div><h2>فعالیت‌های اخیر</h2><p>آخرین اتفاق‌های حساب تو</p></div></div><div className="activities">
      <Activity icon="check" title="مرحله شناخت مشتری تکمیل شد" meta="کمپین فروش ویژه نوروزی · ۲ ساعت پیش" color="green"/>
      <Activity icon="chat" title="دستیار هوشمند ۳ پیشنهاد جدید دارد" meta="برای بهبود پیشنهاد فروش · دیروز" color="yellow"/>
      <Activity icon="book" title="درس «شناخت مشتری ایده‌آل» را تمام کردی" meta="+۱۲۰ امتیاز کمپینو · ۲ روز پیش" color="cream"/>
    </div></section>
  </div>
}

function StatCard({ icon, label, value, note, color }: {icon: IconName; label:string; value:string; note:string; color:string}) {
  return <div className="stat-card"><span className={`stat-icon ${color}`}><Icon name={icon}/></span><div><small>{label}</small><b>{value}</b><p>{note}</p></div></div>
}
function CampaignRow({title,desc,progress,status,icon}:{title:string;desc:string;progress:number;status:string;icon:IconName}) {
  return <div className="campaign-row"><span className="campaign-row-icon"><Icon name={icon}/></span><div className="campaign-info"><div><b>{title}</b><small>{desc}</small></div><span className="status">{status}</span><div className="row-progress"><i style={{width:`${progress}%`}}/></div><small className="percent">{progress}٪</small></div><button><Icon name="arrow"/></button></div>
}
function Activity({icon,title,meta,color}:{icon:IconName;title:string;meta:string;color:string}) {
  return <div className="activity"><span className={`activity-icon ${color}`}><Icon name={icon}/></span><div><b>{title}</b><small>{meta}</small></div><button>مشاهده</button></div>
}

const stepInfo = [
  ['اطلاعات کسب‌وکار','محصول و مشتری‌ات را بشناسیم'],
  ['هدف کمپین','می‌خواهی به چه نتیجه‌ای برسی؟'],
  ['شناخت مشتری','نیازها و انگیزه‌های خرید'],
  ['استراتژی کمپین','پیشنهاد، قیمت و زمان‌بندی'],
  ['برنامه اجرا','محتوا، کانال‌ها و تقویم'],
]

function Builder({ go }: { go: (p: Page) => void }) {
  const [step, setStep] = useState(0)
  const [generated, setGenerated] = useState(false)
  const [data, setData] = useState({
    business:'فروشگاه وینا', industry:'فروشگاه آنلاین', product:'مانتو و لباس‌های زنانه مینیمال برای استفاده روزمره', audience:'خانم‌های ۲۲ تا ۳۵ سال، شاغل، ساکن شهرهای بزرگ و علاقه‌مند به استایل مینیمال',
    goal:'افزایش فروش', target:'فروش ۳۰۰ محصول در طول کمپین', problem:'پیدا نکردن لباس ساده و باکیفیت با قیمت مناسب برای محیط کار', motivation:'کیفیت پارچه، امکان تعویض آسان و ارسال سریع', offer:'۱۵٪ تخفیف + ارسال رایگان برای خرید دوم', price:'۱,۸۹۰,۰۰۰ تومان', duration:'۱۴ روز', channels:['اینستاگرام','پیامک'], tone:'صمیمی و مطمئن'
  })
  const update = (key:string,value:string|string[]) => setData({...data,[key]:value})
  const next = () => {
    if(step < 4) setStep(step+1)
    else { setGenerated(true); setTimeout(() => document.querySelector('.result-card')?.scrollIntoView({behavior:'smooth'}), 50) }
  }
  return <div className="builder-page">
    <div className="builder-top"><div><span className="breadcrumb">کمپین‌های من <Icon name="arrow" size={14}/> کمپین جدید</span><h1>ساخت کمپین فروش</h1><p>قدم‌به‌قدم اطلاعات را وارد کن؛ هوش مصنوعی مسیر را برایت روشن می‌کند.</p></div><span className="save-status"><Icon name="check" size={16}/> ذخیره خودکار</span></div>
    <div className="stepper">
      {stepInfo.map(([title],i) => <button key={title} onClick={() => i <= step && setStep(i)} className={`${i === step ? 'current' : ''} ${i < step ? 'done' : ''}`}><span>{i < step ? <Icon name="check" size={17}/> : i+1}</span><b>{title}</b></button>)}
      <div className="stepper-line"><i style={{width:`${step*25}%`}}/></div>
    </div>
    <div className="builder-layout">
      <section className="form-card">
        <div className="form-heading"><span className="form-heading-icon"><Icon name={(['campaign','target','users','wand','clock'] as IconName[])[step]}/></span><div><small>مرحله {step+1} از ۵</small><h2>{stepInfo[step][0]}</h2><p>{stepInfo[step][1]}</p></div></div>
        {step === 0 && <div className="form-grid">
          <Field label="نام کسب‌وکار" value={data.business} onChange={v=>update('business',v)} placeholder="مثلاً فروشگاه وینا"/>
          <SelectField label="حوزه فعالیت" value={data.industry} onChange={v=>update('industry',v)} options={['فروشگاه آنلاین','خدمات آموزشی','سلامت و زیبایی','نرم‌افزار و فناوری']}/>
          <Field area full label="محصول یا خدمت اصلی" value={data.product} onChange={v=>update('product',v)} placeholder="دقیق و کوتاه توضیح بده چه چیزی می‌فروشی"/>
          <Field area full label="مخاطب هدف" value={data.audience} onChange={v=>update('audience',v)} placeholder="سن، محل زندگی، علایق و ویژگی‌های مشتری ایده‌آل"/>
        </div>}
        {step === 1 && <div className="form-grid">
          <ChoiceField label="هدف اصلی کمپین" value={data.goal} onChange={v=>update('goal',v)} options={['افزایش فروش','جذب مشتری جدید','معرفی محصول','بازگشت مشتریان']}/>
          <Field full label="هدف عددی و قابل اندازه‌گیری" value={data.target} onChange={v=>update('target',v)} placeholder="مثلاً فروش ۳۰۰ محصول در ۱۴ روز"/>
          <div className="tip full"><Icon name="spark"/><div><b>پیشنهاد کمپینو</b><p>هدف خوب، عدد و زمان مشخص دارد. این کار کمک می‌کند در پایان بفهمی کمپین موفق بوده یا نه.</p></div></div>
        </div>}
        {step === 2 && <div className="form-grid">
          <Field area full label="مهم‌ترین مشکل مشتری چیست؟" value={data.problem} onChange={v=>update('problem',v)} placeholder="مشتری قبل از خرید محصول تو با چه مشکلی روبه‌روست؟"/>
          <Field area full label="چه چیزی او را به خرید ترغیب می‌کند؟" value={data.motivation} onChange={v=>update('motivation',v)} placeholder="اعتماد، قیمت، سرعت، کیفیت یا چیز دیگر؟"/>
          <div className="ai-insight full"><span><Icon name="spark"/></span><div><b>تحلیل اولیه هوش مصنوعی</b><p>مخاطب تو بیشتر از «تخفیف»، به اطمینان از کیفیت و خرید بدون ریسک واکنش نشان می‌دهد. روی امکان تعویض تاکید کن.</p></div><button onClick={() => go('assistant')}>جزئیات تحلیل</button></div>
        </div>}
        {step === 3 && <div className="form-grid">
          <Field full label="پیشنهاد اصلی کمپین" value={data.offer} onChange={v=>update('offer',v)} placeholder="چه پیشنهاد جذابی به مشتری می‌دهی؟"/>
          <Field label="قیمت میانگین محصول" value={data.price} onChange={v=>update('price',v)} placeholder="قیمت"/>
          <SelectField label="مدت کمپین" value={data.duration} onChange={v=>update('duration',v)} options={['۷ روز','۱۴ روز','۲۱ روز','یک ماه']}/>
          <ChoiceField full label="لحن ارتباطی برند" value={data.tone} onChange={v=>update('tone',v)} options={['صمیمی و مطمئن','حرفه‌ای و رسمی','پرانرژی و جوان','لوکس و مینیمال']}/>
        </div>}
        {step === 4 && <div className="form-grid">
          <MultiChoice label="کانال‌های اجرای کمپین" values={data.channels} onChange={v=>update('channels',v)} options={['اینستاگرام','پیامک','ایمیل','وب‌سایت']}/>
          <div className="timeline-preview full"><h3>زمان‌بندی پیشنهادی</h3><div><span>روز ۱ تا ۳</span><b>آگاهی و ایجاد کنجکاوی</b><small>۳ محتوای اینستاگرام + استوری</small></div><div><span>روز ۴ تا ۱۰</span><b>معرفی پیشنهاد و اعتمادسازی</b><small>۴ محتوا + پیامک به مشتریان قبلی</small></div><div><span>روز ۱۱ تا ۱۴</span><b>فوریت و پایان کمپین</b><small>شمارش معکوس + یادآوری نهایی</small></div></div>
        </div>}
        <div className="form-footer"><button className="btn btn-back" disabled={step===0} onClick={()=>setStep(Math.max(0,step-1))}>مرحله قبل</button><span>{step+1} از ۵</span><button className="btn btn-primary" onClick={next}>{step===4 ? <><Icon name="spark"/> ساخت کمپین با هوش مصنوعی</> : <>مرحله بعد <Icon name="arrow"/></>}</button></div>
      </section>
      <aside className="builder-aside">
        <div className="coach-card"><div className="coach-head"><span><Icon name="spark"/></span><div><b>مربی هوشمند کمپینو</b><small>آنلاین و آماده کمک</small></div></div><p>{step === 0 ? 'هرچه اطلاعات دقیق‌تری از مشتری‌ات بدهی، استراتژی نهایی اختصاصی‌تر می‌شود.' : step === 1 ? 'اهداف واقع‌بینانه انتخاب کن. برای شروع، رشد ۲۰ تا ۳۰ درصدی هدف خوبی است.' : step === 2 ? 'به جای ویژگی محصول، روی تغییری تمرکز کن که در زندگی مشتری ایجاد می‌شود.' : step === 3 ? 'پیشنهاد قوی باید ارزش واضح، ریسک کم و محدودیت زمانی داشته باشد.' : 'ترکیب دو کانال اصلی بهتر از حضور پراکنده در همه‌جاست.'}</p><button onClick={() => go('assistant')}><Icon name="chat" size={17}/> از مربی بپرس</button></div>
        <div className="completion-card"><div><b>تکمیل اطلاعات</b><strong>{(step+1)*20}٪</strong></div><div className="progress-track"><i style={{width:`${(step+1)*20}%`}}/></div><ul>{stepInfo.map(([title],i)=><li className={i<=step?'complete':''} key={title}><span>{i<step?<Icon name="check" size={13}/>:i+1}</span>{title}</li>)}</ul></div>
      </aside>
    </div>
    {generated && <CampaignResult go={go} data={data}/>}
  </div>
}

function Field({label,value,onChange,placeholder,area=false,full=false}:{label:string;value:string;onChange:(v:string)=>void;placeholder:string;area?:boolean;full?:boolean}) {
  return <label className={`field ${full?'full':''}`}><span>{label}</span>{area?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>:<input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>}</label>
}
function SelectField({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>
}
function ChoiceField({label,value,onChange,options,full=false}:{label:string;value:string;onChange:(v:string)=>void;options:string[];full?:boolean}) {
  return <div className={`choice-field ${full?'full':''}`}><span>{label}</span><div>{options.map(o=><button className={value===o?'selected':''} onClick={()=>onChange(o)} key={o}><i>{value===o&&<Icon name="check" size={13}/>}</i>{o}</button>)}</div></div>
}
function MultiChoice({label,values,onChange,options}:{label:string;values:string[];onChange:(v:string[])=>void;options:string[]}) {
  const toggle=(o:string)=>onChange(values.includes(o)?values.filter(v=>v!==o):[...values,o])
  return <div className="choice-field full"><span>{label}</span><div>{options.map(o=><button className={values.includes(o)?'selected':''} onClick={()=>toggle(o)} key={o}><i>{values.includes(o)&&<Icon name="check" size={13}/>}</i>{o}</button>)}</div></div>
}

function CampaignResult({go,data}:{go:(p:Page)=>void;data:Record<string,string|string[]>}) {
  return <section className="result-card"><div className="result-head"><span><Icon name="spark" size={25}/></span><div><small>نسخه اولیه آماده شد</small><h2>استراتژی کمپین «{data.business}»</h2><p>بر اساس اطلاعات تو، این مسیر بیشترین شانس موفقیت را دارد.</p></div><strong>امتیاز ۸۶/۱۰۰</strong></div>
    <div className="result-grid"><div><small>پیام اصلی کمپین</small><p>استایل حرفه‌ای، بدون دردسر انتخاب؛ با خیال راحت امتحان کن و عاشق انتخابت شو.</p></div><div><small>پیشنهاد طلایی</small><p>{data.offer as string}</p></div><div><small>هدف اصلی</small><p>{data.target as string}</p></div></div>
    <div className="campaign-roadmap"><h3>نقشه راه دقیق کمپین</h3><div>{[['۱','تحقیق و آماده‌سازی','تحلیل ۳ رقیب، نهایی‌کردن پرسونا و ثبت خط مبنا','روز ۱ تا ۲'],['۲','آگاهی و اعتمادسازی','انتشار ۳ محتوای حل مسئله و ۲ تجربه مشتری','روز ۳ تا ۶'],['۳','ارائه پیشنهاد','معرفی باندل، پاسخ به اعتراض‌ها و بازاریابی مجدد','روز ۷ تا ۱۱'],['۴','فوریت و بهینه‌سازی','شمارش معکوس، تست تیتر و بررسی نرخ تبدیل','روز ۱۲ تا ۱۴']].map(x=><div key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><p>{x[2]}</p></div><small>{x[3]}</small></div>)}</div></div>
    <div className="campaign-kpis"><div><small>شاخص موفقیت</small><b>۳۰۰ سفارش</b></div><div><small>نرخ تبدیل هدف</small><b>۳.۲٪</b></div><div><small>هزینه جذب هدف</small><b>زیر ۱۸۰ هزار</b></div><button onClick={()=>go('tools')}>تحلیل کامل کمپین <Icon name="arrow" size={15}/></button></div>
    <div className="locked-plan"><Icon name="lock"/><div><b>برنامه کامل محتوایی و تقویم ۱۴ روزه آماده است</b><p>۲۱ ایده محتوا، متن آماده پست و استوری، پیامک‌ها، چک‌لیست روزانه و شاخص‌های اندازه‌گیری را باز کن.</p></div><button className="btn btn-primary" onClick={()=>go('checkout')}>باز کردن کمپین کامل</button></div>
    <button className="assistant-link" onClick={()=>go('assistant')}><Icon name="chat"/> تحلیل این کمپین با دستیار هوشمند</button>
  </section>
}

function Assistant() {
  const [messages,setMessages]=useState([
    {from:'ai',text:'سلام سارا! کمپین نوروزی وینا را بررسی کردم. پایه استراتژی خوب است، اما سه فرصت برای قوی‌تر شدن پیشنهادت پیدا کردم.'},
    {from:'ai',text:'مهم‌ترین نکته: مخاطب تو به «خرید بدون ریسک» بیشتر از تخفیف واکنش نشان می‌دهد. پیشنهاد می‌کنم امکان تعویض ۷ روزه را در پیام اصلی برجسته کنی.'},
  ])
  const [input,setInput]=useState('')
  const send=(e:FormEvent)=>{e.preventDefault();if(!input.trim())return;const q=input;setMessages([...messages,{from:'user',text:q}]);setInput('');setTimeout(()=>setMessages(m=>[...m,{from:'ai',text:'پیشنهاد من این است: «با خیال راحت انتخاب کن؛ ۱۵٪ تخفیف، ارسال رایگان و ۷ روز فرصت تعویض.» این پیام هم ارزش مالی دارد و هم نگرانی اصلی مشتری را برطرف می‌کند.'}]),500)}
  return <div className="assistant-page">
    <div className="assistant-main">
      <div className="assistant-intro"><div><span><Icon name="spark"/></span><div><h1>دستیار هوشمند کمپینو</h1><p>استراتژیست فروش شخصی تو، همیشه در دسترس</p></div></div><select><option>فروش ویژه نوروزی وینا</option><option>دوره عکاسی محصول</option></select></div>
      <div className="chat-area">
        <div className="analysis-summary"><div className="score-ring"><b>۸۶</b><small>از ۱۰۰</small></div><div><span>تحلیل کمپین کامل شد</span><h3>پایه کمپین قوی است؛ پیشنهاد فروش جای بهبود دارد.</h3><div className="analysis-tags"><i>پیام کمپین: عالی</i><i>شناخت مشتری: خوب</i><i className="warn">پیشنهاد فروش: نیازمند بهبود</i></div></div></div>
        <div className="messages">{messages.map((m,i)=><div className={`message ${m.from}`} key={i}>{m.from==='ai'&&<span className="bot-avatar"><Icon name="spark" size={17}/></span>}<p>{m.text}</p></div>)}</div>
        <div className="quick-prompts"><button onClick={()=>setInput('چطور پیشنهادم را جذاب‌تر کنم؟')}>پیشنهادم را جذاب‌تر کن</button><button onClick={()=>setInput('سه ایده برای محتوای اینستاگرام بده')}>ایده محتوایی بده</button><button onClick={()=>setInput('مخاطب هدف را دقیق‌تر تحلیل کن')}>مخاطب را تحلیل کن</button></div>
        <form className="chat-input" onSubmit={send}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="هر سوالی درباره کمپینت داری بپرس..."/><button><Icon name="send"/></button></form>
        <small className="ai-note">پیشنهادهای هوش مصنوعی را با شناخت خودت از بازار ترکیب کن.</small>
      </div>
    </div>
    <aside className="assistant-side"><h3>فرصت‌های بهبود</h3><div className="issue high"><span><Icon name="alert"/></span><div><small>مهم</small><b>ریسک خرید را کمتر کن</b><p>امکان تعویض را در پیشنهاد اصلی قرار بده.</p></div></div><div className="issue"><span><Icon name="target"/></span><div><small>پیشنهاد</small><b>یک پیام، یک اقدام</b><p>در هر محتوا فقط یک CTA واضح داشته باش.</p></div></div><div className="issue"><span><Icon name="clock"/></span><div><small>زمان‌بندی</small><b>فوریت را دیرتر شروع کن</b><p>شمارش معکوس را به ۳ روز آخر محدود کن.</p></div></div><button className="apply-all"><Icon name="wand"/> اعمال همه پیشنهادها</button></aside>
  </div>
}

type ToolId = 'competitor' | 'customer' | 'validation' | 'funnel' | 'critic' | 'offer' | 'content' | 'calendar' | 'visual' | 'landing' | 'brand' | 'ab' | 'analytics' | 'automation' | 'adresearch' | 'coach'
type Tool = { id: ToolId; title: string; desc: string; category: string; icon: IconName; premium?: boolean }
const aiTools: Tool[] = [
  {id:'competitor',title:'تحلیل هوشمند رقبا',desc:'مقایسه قیمت، پیشنهاد، نقاط قوت و فرصت‌های بازار',category:'تحقیق و استراتژی',icon:'target'},
  {id:'customer',title:'تحلیل عمیق مشتری',desc:'نیازها، مشکلات، انگیزه خرید و اعتراض‌های احتمالی',category:'تحقیق و استراتژی',icon:'users'},
  {id:'validation',title:'اعتبارسنجی ایده کسب‌وکار',desc:'سنجش تقاضای بازار، ریسک و پتانسیل رشد ایده',category:'تحقیق و استراتژی',icon:'spark'},
  {id:'adresearch',title:'تحقیق تبلیغات رقبا',desc:'کشف ایده‌های تبلیغاتی و تحلیل پیام رقبا',category:'تحقیق و استراتژی',icon:'campaign',premium:true},
  {id:'funnel',title:'سازنده قیف فروش',desc:'طراحی تصویری مسیر مشتری از آگاهی تا خرید',category:'ساخت کمپین',icon:'trend'},
  {id:'critic',title:'منتقد هوشمند کمپین',desc:'امتیازدهی، کشف ضعف‌ها و پیشنهاد بهبود عملی',category:'ساخت کمپین',icon:'alert'},
  {id:'offer',title:'پیشنهادساز هوشمند',desc:'تخفیف، باندل و استراتژی قیمت‌گذاری جذاب',category:'ساخت کمپین',icon:'wand'},
  {id:'landing',title:'لندینگ‌پیج‌ساز',desc:'ساخت صفحه فرود اختصاصی و آماده انتشار',category:'ساخت کمپین',icon:'grid',premium:true},
  {id:'content',title:'تولید محتوای هوشمند',desc:'متن تبلیغ، تیتر، کپشن و سناریوی ویدیو',category:'محتوا و برند',icon:'book'},
  {id:'calendar',title:'تقویم محتوایی',desc:'برنامه انتشار دقیق با تاریخ، کانال و مسئول اجرا',category:'محتوا و برند',icon:'clock'},
  {id:'visual',title:'طراح بصری تبلیغات',desc:'بنر، پست شبکه اجتماعی و کریتیو کمپین',category:'محتوا و برند',icon:'campaign',premium:true},
  {id:'brand',title:'صدای برند',desc:'ذخیره هویت، لحن و اصول بصری برای محتوای یکدست',category:'محتوا و برند',icon:'spark'},
  {id:'ab',title:'آزمایش A/B',desc:'تولید و مقایسه نسخه‌های تبلیغ و پیشنهاد',category:'رشد و بهینه‌سازی',icon:'trend',premium:true},
  {id:'analytics',title:'تحلیل عملکرد کمپین',desc:'نرخ تبدیل، پیشرفت و نقاط ضعف در نمودارهای زنده',category:'رشد و بهینه‌سازی',icon:'grid'},
  {id:'automation',title:'اتوماسیون بازاریابی',desc:'دنباله‌های خودکار پیگیری و ارتباط با مشتری',category:'رشد و بهینه‌سازی',icon:'settings',premium:true},
  {id:'coach',title:'مربی هوشمند کسب‌وکار',desc:'راهنمایی مستمر و توضیح چرایی هر تصمیم',category:'رشد و بهینه‌سازی',icon:'chat'},
]
const categories = ['همه ابزارها','تحقیق و استراتژی','ساخت کمپین','محتوا و برند','رشد و بهینه‌سازی']

function Tools() {
  const [selected,setSelected] = useState<Tool | null>(null)
  const [category,setCategory] = useState('همه ابزارها')
  const [search,setSearch] = useState('')
  const visible = aiTools.filter(t => (category === 'همه ابزارها' || t.category === category) && (t.title.includes(search) || t.desc.includes(search)))
  if(selected) return <ToolDetail tool={selected} onBack={() => setSelected(null)}/>
  return <div className="tools-page page">
    <section className="tools-hero"><div><span><Icon name="spark" size={16}/> قدرت هوش مصنوعی در تمام مسیر رشد</span><h1>جعبه ابزار هوشمند کمپینو</h1><p>از شناخت بازار و مشتری تا ساخت، اجرا و بهینه‌سازی کمپین؛ ابزار مناسب هر قدم اینجاست.</p></div><div className="tools-progress"><strong>۷۲٪</strong><span>آمادگی کمپین فعلی</span><div><i/></div><small>۳ پیشنهاد برای بهبود داری</small></div></section>
    <div className="tools-controls"><div className="tool-search"><Icon name="target" size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="جست‌وجوی ابزار..."/></div><div className="category-tabs">{categories.map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div></div>
    <div className="tools-grid">{visible.map(tool=><article className="tool-card" key={tool.id}><div className="tool-card-top"><span><Icon name={tool.icon}/></span>{tool.premium?<i className="premium-tag"><Icon name="lock" size={11}/> حرفه‌ای</i>:<i className="free-tag">رایگان</i>}</div><h3>{tool.title}</h3><p>{tool.desc}</p><div className="tool-meta"><span>{tool.category}</span><button onClick={()=>setSelected(tool)}>باز کردن ابزار <Icon name="arrow" size={15}/></button></div></article>)}</div>
    <div className="coach-strip"><span><Icon name="chat"/></span><div><b>نمی‌دانی از کدام ابزار شروع کنی؟</b><p>مربی هوشمند با توجه به وضعیت کمپین، قدم بعدی را پیشنهاد می‌دهد.</p></div><button onClick={()=>setSelected(aiTools.find(t=>t.id==='coach')!)}>پرسیدن از مربی</button></div>
  </div>
}

function ToolDetail({tool,onBack}:{tool:Tool;onBack:()=>void}) {
  const [generated,setGenerated] = useState(false)
  const [tab,setTab] = useState('خروجی پیشنهادی')
  const [input,setInput] = useState(tool.id === 'validation' ? 'سرویس اشتراک ماهانه استایل شخصی برای زنان شاغل' : 'فروش ویژه نوروزی وینا')
  return <div className="tool-detail page">
    <button className="detail-back" onClick={onBack}><Icon name="arrow" size={16}/> بازگشت به ابزارها</button>
    <div className="detail-title"><span><Icon name={tool.icon} size={25}/></span><div><div>{tool.premium ? 'ابزار حرفه‌ای' : 'ابزار رایگان'}</div><h1>{tool.title}</h1><p>{tool.desc}</p></div><button className="help-video"><Icon name="play" size={15}/> راهنمای ۲ دقیقه‌ای</button></div>
    <div className="tool-workspace">
      <aside className="tool-config"><div className="config-head"><b>تنظیمات تحلیل</b><span>مرحله ۱ از ۲</span></div><label><span>{tool.id==='validation'?'ایده کسب‌وکار':'کمپین موردنظر'}</span><textarea value={input} onChange={e=>setInput(e.target.value)}/></label><label><span>هدف اصلی</span><select><option>افزایش فروش و نرخ تبدیل</option><option>شناخت بهتر بازار</option><option>بهینه‌سازی پیام کمپین</option></select></label><label><span>عمق تحلیل</span><div className="depth-options"><button>سریع</button><button className="selected">دقیق</button><button>پیشرفته</button></div></label><div className="config-tip"><Icon name="spark" size={16}/><p>کمپینو از اطلاعات کمپین و صدای برند ذخیره‌شده استفاده می‌کند تا نتیجه اختصاصی باشد.</p></div><button className="btn btn-primary generate-btn" onClick={()=>setGenerated(true)}><Icon name="wand"/> {generated?'تولید دوباره':'شروع تحلیل هوشمند'}</button>{tool.premium&&<small className="premium-note"><Icon name="lock" size={12}/> یک اجرای آزمایشی رایگان باقی مانده</small>}</aside>
      <main className="tool-output">
        <div className="output-tabs"><div>{['خروجی پیشنهادی','نکات عملی','تاریخچه'].map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><button className="export-btn">دریافت PDF</button></div>
        {!generated ? <div className="empty-output"><span><Icon name={tool.icon} size={32}/></span><h3>آماده ساخت یک خروجی دقیق هستی؟</h3><p>تنظیمات را بررسی کن و دکمه «شروع تحلیل هوشمند» را بزن. یک نمونه واقعی و قابل اجرا برای کمپین تو ساخته می‌شود.</p><div><i/><i/><i/></div></div> : tab==='تاریخچه' ? <HistoryView/> : tab==='نکات عملی' ? <ActionTips tool={tool}/> : <FeatureVisualization id={tool.id}/>}
      </main>
    </div>
  </div>
}

function HistoryView(){
  return <div className="history-view"><h3>خروجی‌های اخیر</h3>{[['امروز، ۱۰:۴۵','نسخه دقیق برای کمپین نوروزی','فعلی'],['۲۲ فروردین، ۱۸:۲۰','تحلیل اولیه کمپین','ذخیره‌شده']].map(r=><div key={r[0]}><span><Icon name="clock"/></span><div><b>{r[1]}</b><small>{r[0]}</small></div><i>{r[2]}</i><button>مشاهده</button></div>)}</div>
}
function ActionTips({tool}:{tool:Tool}){
  return <div className="action-tips"><div className="output-heading"><div><span><Icon name="check"/></span><div><small>برنامه اقدام</small><h2>قدم‌های عملی برای {tool.title}</h2></div></div></div>{['امروز: خروجی پیشنهادی را با شناخت خودت از بازار بازبینی کن.','فردا: نسخه اول را روی گروه کوچکی از مشتریان آزمایش کن.','پس از ۳ روز: شاخص‌های اصلی را ثبت و با نسخه پایه مقایسه کن.','هفته بعد: پیشنهاد برنده را در کل کمپین اعمال کن.'].map((x,i)=><div className="tip-row" key={x}><span>{i+1}</span><p>{x}</p><button><Icon name="check" size={14}/></button></div>)}</div>
}

function FeatureVisualization({id}:{id:ToolId}) {
  const [active,setActive] = useState(0)
  if(id==='competitor'||id==='adresearch') return <div className="feature-result"><OutputHeading score="۸۴" title={id==='competitor'?'نقشه رقابتی بازار پوشاک مینیمال':'الگوهای تبلیغاتی موفق رقبا'}/><div className="competitor-table"><div className="table-head"><span>برند</span><span>بازه قیمت</span><span>پیشنهاد اصلی</span><span>نقطه ضعف</span></div>{[['وینا (شما)','۱.۲ تا ۲.۴ م','تعویض آسان','آگاهی برند'],['رستا','۱.۸ تا ۳.۲ م','کیفیت پارچه','ارسال کند'],['مینیمال‌پوش','۱.۴ تا ۲.۸ م','تنوع بالا','پیام عمومی']].map((r,i)=><div className={i===0?'you':''} key={r[0]}>{r.map(x=><span key={x}>{x}</span>)}</div>)}</div><div className="opportunity"><Icon name="spark"/><div><b>فرصت طلایی بازار</b><p>هیچ رقیبی هم‌زمان روی «استایل کاری + تعویض بی‌دردسر» تمرکز نکرده است. این جایگاه را در پیام اصلی تصاحب کن.</p></div><button>افزودن به کمپین</button></div></div>
  if(id==='customer') return <div className="feature-result"><OutputHeading score="۹۱" title="پرسونای اصلی: نگار، حرفه‌ای و کم‌وقت"/><div className="persona"><div className="persona-profile"><span>ن</span><h3>نگار محمدی</h3><p>۲۹ ساله · کارشناس منابع انسانی · تهران</p><div><b>ارزش اصلی</b><small>شیک بودن بدون صرف وقت زیاد</small></div></div><div className="persona-insights">{[['نیاز اصلی','لباس کاری ساده، باکیفیت و قابل ست'],['درد کلیدی','تردید درباره سایز و کیفیت خرید آنلاین'],['انگیزه خرید','صرفه‌جویی در زمان و ظاهر حرفه‌ای'],['اعتراض رایج','اگر اندازه نبود چطور تعویض کنم؟']].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div></div><Insight text="در تمام پیام‌ها قبل از قیمت، روی راهنمای سایز و تعویض ۷ روزه تأکید کن."/></div>
  if(id==='validation') return <div className="feature-result"><OutputHeading score="۷۸" title="پتانسیل ایده: امیدوارکننده با نیاز به تست"/><div className="validation-grid">{[['تقاضای بازار','۸۶٪','بالا'],['تمایز ایده','۷۲٪','متوسط'],['امکان اجرا','۸۱٪','بالا'],['ریسک مالی','۴۲٪','کنترل‌پذیر']].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><i>{x[2]}</i></div>)}</div><div className="test-plan"><h3>تست ۷ روزه پیشنهادی</h3>{['ساخت لندینگ ساده و ثبت‌نام لیست انتظار','مصاحبه با ۱۰ زن شاغل در گروه هدف','پیش‌فروش ۲۰ اشتراک با قیمت اولیه'].map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p><button>شروع</button></div>)}</div></div>
  if(id==='funnel') return <div className="feature-result"><OutputHeading score="۸۸" title="قیف پیشنهادی کمپین نوروزی"/><div className="funnel">{[['آگاهی','۲۴,۵۰۰ نفر','ریلز آموزشی','100%'],['علاقه','۸,۲۰۰ نفر','راهنمای استایل','76%'],['بررسی','۲,۱۰۰ نفر','اعتماد + تعویض','54%'],['خرید','۳۸۰ سفارش','پیشنهاد محدود','34%']].map((x,i)=><button className={active===i?'active':''} style={{width:x[3]}} onClick={()=>setActive(i)} key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></button>)}</div><Insight text={`اقدام مرحله «${['آگاهی','علاقه','بررسی','خرید'][active]}»: ${['۳ ریلز حل مسئله با CTA ذخیره پست','ارائه چک‌لیست رایگان انتخاب لباس کاری','نمایش ویدیوی تجربه مشتری و ضمانت تعویض','ارسال کد تخفیف ۴۸ ساعته'][active]}`}/></div>
  if(id==='critic') return <div className="feature-result"><OutputHeading score="۷۶" title="کمپین خوب است، اما فوریت و اثبات اجتماعی ضعیف‌اند"/><div className="critic-bars">{[['شناخت مشتری',92],['قدرت پیشنهاد',74],['وضوح پیام',86],['اعتمادسازی',58],['فوریت خرید',63]].map(x=><div key={x[0] as string}><span>{x[0]}</span><div><i style={{width:`${x[1]}%`}}/></div><b>{x[1]}</b></div>)}</div><div className="fix-list"><h3>۳ اصلاح با بیشترین اثر</h3>{['افزودن تجربه واقعی ۳ مشتری به صفحه فروش','محدود کردن ارسال رایگان به ۲۰۰ سفارش اول','تبدیل CTA عمومی به «استایل کاری‌ام را انتخاب می‌کنم»'].map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p><button>اعمال اصلاح</button></div>)}</div></div>
  if(id==='offer') return <div className="feature-result"><OutputHeading score="۹۳" title="سه پیشنهاد فروش متناسب با حاشیه سود تو"/><div className="offer-cards">{[['پیشنهاد متعادل','۱۵٪ تخفیف + ارسال رایگان','ریسک کم · تبدیل خوب'],['باندل پرفروش','دو مانتو + شال با ۲۵٪ صرفه','ارزش خرید بالا'],['پیشنهاد بدون ریسک','قیمت کامل + تعویض رایگان ۱۴ روزه','حفظ حاشیه سود']].map((x,i)=><button onClick={()=>setActive(i)} className={active===i?'active':''} key={x[0]}><small>{x[0]}</small><b>{x[1]}</b><span>{x[2]}</span>{i===1&&<i>پیشنهاد AI</i>}</button>)}</div><Insight text="نسخه باندل برای مشتریان جدید مناسب‌تر است و ارزش متوسط سفارش را حدود ۳۱٪ افزایش می‌دهد."/></div>
  if(id==='content') return <div className="feature-result"><OutputHeading score="۹۰" title="بسته محتوایی آماده انتشار"/><div className="content-tabs">{['تیتر تبلیغ','کپشن','سناریوی ویدیو','پیامک'].map((x,i)=><button className={active===i?'active':''} onClick={()=>setActive(i)} key={x}>{x}</button>)}</div><div className="copy-card"><span>{['تیتر اصلی','کپشن اینستاگرام','سناریوی ریلز ۳۰ ثانیه‌ای','پیامک فروش'][active]}</span><p>{['برای روزهای شلوغ، استایل ساده‌تری انتخاب کن.','صبح‌ها وقت فکر کردن به ست لباس نداری؟ مجموعه کاری وینا با پارچه باکیفیت و ۷ روز فرصت تعویض، انتخاب را برایت ساده کرده. فقط تا جمعه، ارسال رایگان.','نمای اول: کمد شلوغ. متن: هر صبح همین داستانه؟ — کات به سه استایل وینا — پایان: ساده انتخاب کن، حرفه‌ای دیده شو.','وینا: استایل کاری جدیدت آماده‌ست. ۱۵٪ تخفیف + ارسال رایگان تا جمعه. لغو ۱۱'][active]}</p><div><button>کپی متن</button><button>بازنویسی با لحن برند</button></div></div></div>
  if(id==='calendar') return <div className="feature-result"><OutputHeading score="۸۷" title="تقویم انتشار ۱۴ روزه"/><div className="calendar-head"><button>هفته قبل</button><b>۲۴ تا ۳۰ فروردین</b><button>هفته بعد</button></div><div className="content-calendar">{['شنبه ۲۴','یکشنبه ۲۵','دوشنبه ۲۶','سه‌شنبه ۲۷','چهارشنبه ۲۸','پنجشنبه ۲۹','جمعه ۳۰'].map((d,i)=><div key={d}><b>{d}</b>{i<5&&<button className={i%3===0?'sms':''}><small>{i%3===0?'پیامک':'اینستاگرام'}</small><span>{['تیزر شروع','ریلز آموزشی','نظرسنجی استوری','اعلام پیشنهاد','تجربه مشتری'][i]}</span></button>}<i>+</i></div>)}</div></div>
  if(id==='visual') return <div className="feature-result"><OutputHeading score="۸۹" title="کریتیوهای پیشنهادی با هویت وینا"/><div className="visual-grid">{['استایل کاری، ساده‌تر از همیشه','۱۵٪ تخفیف برای انتخاب حرفه‌ای','۷ روز فرصت تعویض؛ بدون نگرانی'].map((x,i)=><button className={active===i?'active':''} onClick={()=>setActive(i)} key={x}><div className={`ad-mock ad-${i}`}><small>VINA</small><b>{x}</b><span>مشاهده مجموعه</span></div><p>{['پست ۱:۱','استوری ۹:۱۶','بنر وب‌سایت'][i]}</p></button>)}</div><div className="visual-actions"><button>تغییر رنگ و تصویر</button><button className="btn btn-primary">دانلود طرح انتخابی</button></div></div>
  if(id==='landing') return <div className="feature-result"><OutputHeading score="۹۴" title="صفحه فرود کمپین آماده انتشار"/><div className="landing-preview"><div className="preview-browser"><i/><i/><i/><span>vina.ir/norouz</span></div><div className="preview-page"><small>VINA</small><h2>برای روزهای شلوغ،<br/>ساده و حرفه‌ای بپوش</h2><p>مجموعه جدید استایل کاری با ۱۵٪ تخفیف و ارسال رایگان</p><button>مشاهده مجموعه جدید</button><div><span/><span/><span/></div></div></div><div className="visual-actions"><button>ویرایش بخش‌ها</button><button className="btn btn-primary">انتشار صفحه</button></div></div>
  if(id==='brand') return <div className="feature-result"><OutputHeading score="۸۲" title="هویت و صدای برند وینا"/><div className="brand-board"><div><span>شخصیت برند</span><div className="brand-tags"><b>ساده</b><b>مطمئن</b><b>همدل</b><b>حرفه‌ای</b></div><span>جمله‌ای که می‌گوییم</span><p>«انتخاب لباس کاری نباید سخت باشد.»</p><span>جمله‌ای که نمی‌گوییم</span><p className="dont">«همین الان بخر وگرنه ضرر می‌کنی!»</p></div><div><span>رنگ‌های برند</span><div className="brand-colors"><i/><i/><i/><i/></div><span>راهنمای لحن</span><p>کوتاه، آرام و مستقیم بنویس. به جای اغراق، روی آسودگی و اطمینان تأکید کن.</p><button>ویرایش راهنمای برند</button></div></div></div>
  if(id==='ab') return <div className="feature-result"><OutputHeading score="—" title="آزمایش تیتر تبلیغاتی"/><div className="ab-cards"><div><small>نسخه A · فعلی</small><h3>استایل جدید، حال خوب جدید</h3><div><span>نرخ کلیک</span><b>۲.۸٪</b></div><i style={{width:'46%'}}/></div><div className="winner"><small>نسخه B · برنده احتمالی</small><h3>صبح‌ها ۱۰ دقیقه دیرتر از خواب بیدار شو</h3><div><span>نرخ کلیک پیش‌بینی‌شده</span><b>۴.۳٪</b></div><i style={{width:'76%'}}/><em>+۵۳٪ بهتر</em></div></div><button className="start-test">شروع آزمایش با ۲۰٪ مخاطبان</button></div>
  if(id==='analytics') return <div className="feature-result"><OutputHeading score="۸۱" title="عملکرد ۷ روز اخیر کمپین"/><div className="metric-cards">{[['بازدید','۲۴,۵۸۰','+۱۲٪'],['نرخ کلیک','۳.۸٪','+۰.۷٪'],['سفارش','۲۱۸','+۲۴٪'],['نرخ تبدیل','۲.۳٪','-۰.۲٪']].map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b><span>{x[2]}</span></div>)}</div><div className="chart-box"><div className="chart-title"><b>بازدید و تبدیل</b><span>بازدید <i/> فروش <i/></span></div><div className="line-chart"><svg viewBox="0 0 600 170" preserveAspectRatio="none"><path d="M0 135 C70 130 80 80 145 104 S240 55 300 75 S400 25 455 60 S540 28 600 20"/><path className="second" d="M0 155 C90 145 110 135 160 142 S250 112 310 125 S400 85 470 102 S550 72 600 78"/></svg><div className="chart-lines"><i/><i/><i/><i/></div></div></div><Insight text="ریزش اصلی در صفحه محصول است. افزودن راهنمای سایز تصویری می‌تواند نرخ تبدیل را ۰.۴٪ افزایش دهد."/></div>
  if(id==='automation') return <div className="feature-result"><OutputHeading score="۸۵" title="دنباله پیگیری سبد خرید رهاشده"/><div className="automation-flow">{[['شروع','مشتری محصولی به سبد اضافه می‌کند','target'],['پس از ۲ ساعت','یادآوری دوستانه در پیامک','chat'],['پس از ۲۴ ساعت','ارسال تجربه مشتری + ضمانت تعویض','users'],['پس از ۴۸ ساعت','کد ارسال رایگان با مهلت محدود','clock']].map((x,i)=><div key={x[0]}><span><Icon name={x[2] as IconName}/></span><div><small>{x[0]}</small><b>{x[1]}</b></div><button>ویرایش</button>{i<3&&<i/>}</div>)}</div><button className="start-test">فعال‌سازی این اتوماسیون</button></div>
  return <div className="feature-result"><OutputHeading score="آنلاین" title="قدم بعدی تو: تقویت اعتماد قبل از افزایش تبلیغات"/><div className="coach-conversation"><div><span><Icon name="spark"/></span><p>سارا، قبل از افزایش بودجه تبلیغات بهتر است نرخ تبدیل صفحه محصول را بهتر کنیم. الان از هر ۱۰۰ بازدیدکننده فقط ۲.۳ نفر خرید می‌کنند.</p></div><div><p>دقیقاً چه کاری انجام بدهم؟</p></div><div><span><Icon name="spark"/></span><p>این هفته سه کار: ۱) راهنمای سایز تصویری اضافه کن، ۲) ویدیوی تجربه مشتری را بالای صفحه بگذار، ۳) ضمانت تعویض را کنار دکمه خرید بنویس. بعد از ۵۰۰ بازدید نتیجه را مقایسه می‌کنیم.</p></div></div><div className="coach-why"><Icon name="book"/><div><b>چرا این قدم مهم است؟</b><p>افزایش ترافیک وقتی صفحه خوب تبدیل نمی‌کند فقط هزینه را بالا می‌برد. اول نشتی قیف را می‌بندیم، بعد ورودی را بیشتر می‌کنیم.</p></div></div></div>
}
function OutputHeading({score,title}:{score:string;title:string}){
  return <div className="output-heading"><div><span><Icon name="spark"/></span><div><small>تحلیل اختصاصی کمپینو</small><h2>{title}</h2></div></div><strong>{score}{!score.includes('آنلاین')&&!score.includes('—')&&<small> از ۱۰۰</small>}</strong></div>
}
function Insight({text}:{text:string}){
  return <div className="result-insight"><Icon name="spark"/><div><b>پیشنهاد عملی کمپینو</b><p>{text}</p></div><button>اعمال پیشنهاد</button></div>
}

function PricingCards({go}:{go:(p:Page)=>void}) {
  return <div className="pricing-grid">
    <article className="price-card"><h3>شروع رایگان</h3><p>برای تجربه اولین کمپین</p><div className="price"><b>رایگان</b><span>برای همیشه</span></div><ul><li><Icon name="check"/> ساخت یک کمپین اولیه</li><li><Icon name="check"/> تحلیل پایه هوش مصنوعی</li><li><Icon name="check"/> دسترسی به ۳ درس</li></ul><button onClick={()=>go('builder')}>شروع رایگان</button></article>
    <article className="price-card featured"><div className="popular">پیشنهاد ویژه</div><h3>کمپین کامل</h3><p>پرداخت فقط برای یک کمپین</p><div className="price"><b>۴۹۰ هزار</b><span>تومان / یک‌بار</span></div><ul><li><Icon name="check"/> استراتژی کامل و اختصاصی</li><li><Icon name="check"/> تقویم و متن محتوایی</li><li><Icon name="check"/> همراهی دستیار هوشمند</li><li><Icon name="check"/> خروجی PDF و دسترسی دائمی</li></ul><button onClick={()=>go('checkout')}>باز کردن کمپین کامل</button></article>
    <article className="price-card"><h3>حرفه‌ای</h3><p>برای رشد مداوم کسب‌وکار</p><div className="price"><b>۸۹۰ هزار</b><span>تومان / ماهانه</span></div><ul><li><Icon name="check"/> کمپین‌های نامحدود</li><li><Icon name="check"/> مدل پیشرفته هوش مصنوعی</li><li><Icon name="check"/> قالب‌های آماده و آپدیت‌ها</li><li><Icon name="check"/> پشتیبانی اولویت‌دار</li></ul><button onClick={()=>go('checkout')}>انتخاب پلن حرفه‌ای</button></article>
  </div>
}

function Pricing({go}:{go:(p:Page)=>void}) {
  const [annual,setAnnual]=useState(false)
  return <div className="page pricing-page"><div className="pricing-hero"><span>سرمایه‌گذاری برای فروش بیشتر</span><h1>پلنی که با تو رشد می‌کند</h1><p>بدون قرارداد و هزینه پنهان. رایگان شروع کن و فقط وقتی ارزشش را دیدی، ارتقا بده.</p><div className="billing-toggle"><button className={!annual?'active':''} onClick={()=>setAnnual(false)}>ماهانه</button><button className={annual?'active':''} onClick={()=>setAnnual(true)}>سالانه <i>۲ ماه رایگان</i></button></div></div><PricingCards go={go}/><div className="guarantee"><Icon name="shield"/><div><b>ضمانت بازگشت وجه ۷ روزه</b><p>اگر کمپینو برایت مناسب نبود، بدون سوال هزینه را برمی‌گردانیم.</p></div></div></div>
}

function Checkout({go}:{go:(p:Page)=>void}) {
  const [paid,setPaid]=useState(false)
  if(paid) return <div className="checkout-success"><span><Icon name="check" size={38}/></span><h1>پرداخت با موفقیت انجام شد</h1><p>کمپین کامل «فروش ویژه نوروزی وینا» باز شد و آماده استفاده است.</p><button className="btn btn-primary" onClick={()=>go('builder')}>مشاهده کمپین کامل <Icon name="arrow"/></button></div>
  return <div className="checkout-page"><div className="checkout-title"><button onClick={()=>go('pricing')}>‹ بازگشت</button><h1>تکمیل خرید</h1><span><Icon name="shield" size={17}/> پرداخت امن</span></div><div className="checkout-grid">
    <section className="checkout-form"><h2>اطلاعات پرداخت</h2><label><span>نام و نام خانوادگی</span><input defaultValue="سارا احمدی"/></label><label><span>شماره موبایل</span><input defaultValue="۰۹۱۲ ۱۲۳ ۴۵۶۷" dir="ltr"/></label><label><span>کد تخفیف</span><div className="coupon"><input placeholder="کد تخفیف را وارد کنید"/><button>اعمال کد</button></div></label><div className="payment-method"><span>روش پرداخت</span><button className="selected"><i><Icon name="check" size={13}/></i><Icon name="card"/> پرداخت آنلاین با کارت بانکی<small>تمام کارت‌های عضو شتاب</small></button></div></section>
    <aside className="order-card"><span className="order-icon"><Icon name="spark"/></span><h3>کمپین کامل</h3><p>فروش ویژه نوروزی وینا</p><ul><li><Icon name="check"/> استراتژی کامل کمپین</li><li><Icon name="check"/> تقویم محتوایی ۱۴ روزه</li><li><Icon name="check"/> متن آماده پست و پیامک</li><li><Icon name="check"/> دستیار هوشمند اختصاصی</li></ul><div className="order-price"><span>مبلغ سفارش</span><b>۴۹۰,۰۰۰ تومان</b></div><button className="btn btn-primary" onClick={()=>setPaid(true)}>پرداخت و باز کردن کمپین <Icon name="lock" size={17}/></button><small><Icon name="shield" size={14}/> اطلاعات پرداخت شما ذخیره نمی‌شود.</small></aside>
  </div></div>
}

export default function App() {
  const [page,setPage]=useState<Page>('landing')
  const [history,setHistory]=useState<Page[]>([])
  const go=(p:Page)=>{if(p!==page)setHistory(h=>[...h,page]);setPage(p);window.scrollTo({top:0,behavior:'smooth'})}
  const back=()=>{const previous=history[history.length-1] || 'landing';setHistory(h=>h.slice(0,-1));setPage(previous);window.scrollTo({top:0,behavior:'smooth'})}
  const content = useMemo(() => {
    if(page==='dashboard') return <Dashboard go={go}/>
    if(page==='builder') return <Builder go={go}/>
    if(page==='assistant') return <Assistant/>
    if(page==='tools') return <Tools/>
    if(page==='pricing') return <Pricing go={go}/>
    return <Checkout go={go}/>
  },[page])
  if(page==='landing') return <Landing go={go}/>
  return <AppShell page={page} go={go} onBack={back}>{content}</AppShell>
}
