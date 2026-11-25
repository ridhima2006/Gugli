import { useRef, useState, type FormEvent } from 'react';
import {
  Archive,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileBadge,
  FileLock2,
  Fingerprint,
  Heart,
  KeyRound,
  LockKeyhole,
  Menu,
  MessageSquareQuote,
  MoveRight,
  NotebookPen,
  PanelLeftClose,
  Search,
  Shield,
  Sparkles,
  Target,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import bestPhoto from '@/assets/images/polaroids/best.jpeg';
import collegePhoto from '@/assets/images/polaroids/college.jpeg';
import firstPhoto from '@/assets/images/polaroids/first.jpeg';
import yummyBeePhoto from '@/assets/images/polaroids/yummybee.jpeg';
import handsomePhoto from '@/assets/images/polaroids/handsome.jpeg';

type View = 'overview' | 'profile' | 'reports' | 'evidence' | 'threat' | 'witness' | 'restricted';

type Report = {
  id: string;
  number: string;
  title: string;
  date: string;
  status: string;
  classification: string;
  report: string;
  note: string;
};

type Exhibit = {
  id: string;
  label: string;
  title: string;
  image: string;
  description: string;
  note: string;
  rotate: string;
};

const RESTRICTED_ACCESS_KEY = 'velvet-knight';

const navItems: { id: View; number: string; label: string; icon: typeof Archive }[] = [
  { id: 'overview', number: '00', label: 'Command centre', icon: Archive },
  { id: 'profile', number: '01', label: 'Subject profile', icon: Fingerprint },
  { id: 'reports', number: '02', label: 'Incident reports', icon: ClipboardList },
  { id: 'evidence', number: '03', label: 'Evidence room', icon: Search },
  { id: 'threat', number: '04', label: 'Threat assessment', icon: Target },
  { id: 'witness', number: '05', label: 'Witness statements', icon: MessageSquareQuote },
  { id: 'restricted', number: '06', label: 'Restricted file', icon: FileLock2 },
];

const reports: Report[] = [
  {
    id: '001', number: '001', title: 'The overnight hackathon incident', date: 'April 2025', status: 'Confirmed', classification: 'Early signs of affection',
    report: 'The subject allegedly stayed up overnight assisting a particular student during a hackathon, despite having no formal obligation to do so at the time. The assistance provided was noted to be unusually considerate. Investigators suspect this incident may have been an early indication of the subject’s involvement in the ongoing case.',
    note: 'At the time, the investigator was unaware of the extent of the situation.',
  },
  {
    id: '002', number: '002', title: 'The communication crisis', date: 'November 2025', status: 'Resolved', classification: 'Emotional development',
    report: 'A period of reduced communication between the subject and the investigator resulted in a frank and unusually mature conversation. The conversation appears to have significantly altered the trajectory of the investigation. The subject demonstrated an ability to communicate his feelings honestly without compromising the safety of the investigator’s emotional environment.',
    note: 'Unexpectedly healthy communication. Suspiciously impressive.',
  },
  {
    id: '003', number: '003', title: 'The rose procurement operation', date: 'Ongoing', status: 'Confirmed', classification: 'Romantic misconduct',
    report: 'The subject was observed executing a romantic gesture involving the procurement of roses. The investigator reportedly experienced an emotional response. The department has been unable to establish why flowers continue to be an effective method of emotional destabilisation.',
    note: 'Evidence is overwhelming. Bias is inevitable.',
  },
  {
    id: '004', number: '004', title: 'The Complan smuggling ring', date: 'Ongoing', status: 'Under investigation', classification: 'Food-related misconduct',
    report: 'The subject and the investigator have been associated with the clandestine consumption of Complan. The exact circumstances of this operation remain under investigation. The department has no further comment.',
    note: 'Honestly, this is beyond our jurisdiction.',
  },
  {
    id: '005', number: '005', title: 'The college visit frequency', date: '2025—2026', status: 'Confirmed', classification: 'Excessive dedication',
    report: 'The subject has demonstrated a repeated tendency to allocate time toward visiting the investigator during college hours. These visits have resulted in suspiciously high levels of happiness reported by the investigator.',
    note: 'Subject claims this is normal behaviour. It is not.',
  },
  {
    id: '006', number: '006', title: 'The mirror incident', date: 'Ongoing', status: 'Confirmed', classification: 'Unauthorized cuteness',
    report: 'The subject has reportedly been caught making cute faces in mirrors. This department has received multiple allegations concerning the subject’s appearance and facial expressions. The allegations are supported by overwhelming evidence.',
    note: 'Frankly, the investigator is part of the problem.',
  },
  {
    id: '007', number: '007', title: 'The sleepy cuddle protocol', date: 'Classified', status: 'Confirmed', classification: 'Physical affection',
    report: 'Observations indicate that the subject displays particularly affectionate behaviour when sleepy. The department has recorded this as a recurring behavioural pattern.',
    note: 'Further research is impossible. Investigator has fallen asleep.',
  },
  {
    id: '008', number: '008', title: 'The first date', date: 'Yummy Bee', status: 'Confirmed', classification: 'Significant event',
    report: 'The subject and the investigator attended their first date at Yummy Bee. The subject was reportedly wearing black and blue. The event has since been categorised as a significant milestone in the investigation.',
    note: 'Evidence suggests that this date was the beginning of a much larger operation.',
  },
];

const exhibits: Exhibit[] = [
  { id: 'A', label: 'Exhibit A', title: 'Subject in his natural habitat', image: bestPhoto, description: 'A rare and unusually clear sighting of the subject at rest. Confidence levels were compromised immediately.', note: 'Subject appears to be pretending not to notice the camera.', rotate: 'rotate-[-2deg]' },
  { id: 'B', label: 'Exhibit B', title: 'First date documentation', image: yummyBeePhoto, description: 'Recovered visual evidence from the Yummy Bee operation. The matching smiles remain under review.', note: 'The beginning of a much larger operation.', rotate: 'rotate-[2deg]' },
  { id: 'C', label: 'Exhibit C', title: 'Evidence of unauthorized cuteness', image: handsomePhoto, description: 'The subject demonstrates a concerning ability to look innocent while clearly knowing exactly what he is doing.', note: 'Multiple regulations may have been violated here.', rotate: 'rotate-[-1deg]' },
  { id: 'D', label: 'Exhibit D', title: 'The investigator and the subject', image: firstPhoto, description: 'A joint appearance of the two primary parties. Objectivity was not present at the time of capture.', note: 'No further questions. Just look at them.', rotate: 'rotate-[3deg]' },
  { id: 'E', label: 'Exhibit E', title: 'Cuddling-related evidence', image: collegePhoto, description: 'A documented moment of suspiciously high happiness during field operations.', note: 'The department has accepted this outcome.', rotate: 'rotate-[-3deg]' },
  { id: 'F', label: 'Exhibit F', title: 'The rose procurement operation', image: yummyBeePhoto, description: 'This image has been filed under romantic misconduct and repeatedly revisited by the lead investigator.', note: 'Flowers remain an effective destabilisation tactic.', rotate: 'rotate-[1deg]' },
];

const capabilities = [
  'Makes people laugh without much effort.',
  'Displays remarkable caring behaviour toward people who matter to him.',
  'Demonstrates advanced skills in comforting, listening and being supportive.',
  'Has been observed making cute faces in mirrors.',
  'Possesses suspiciously good communication skills.',
  'Has a talent for making the investigator feel loved.',
  'Frequently displays a soft side that appears to be exclusive to the investigator.',
  'Has a strong tendency to become the favourite person of the investigator.',
];

const weaknesses = ['Family', 'Girlfriend', 'Cricket', 'Food', 'Sleep', 'Soft music', 'Roses'];

function Seal() {
  return (
    <div className="seal" aria-label="Departmental seal">
      <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        <path d="M60 33l6.4 16.2L84 56l-14.5 10.6L75 83l-15-9.7L45 83l5.5-16.4L36 56l17.6-6.8L60 33Z" fill="currentColor" opacity=".12" />
        <path d="M60 39c-7.8-8.4-22-1.4-15.8 9.1C48.5 58.2 60 65 60 65s11.5-6.8 15.8-16.9C82 37.6 67.8 30.6 60 39Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M60 65v18M51 78h18" stroke="currentColor" strokeWidth="2" />
        <text x="60" y="18" textAnchor="middle" fontSize="6" letterSpacing="2" fill="currentColor">DBA • 008</text>
        <text x="60" y="108" textAnchor="middle" fontSize="5" letterSpacing="1.3" fill="currentColor">TRUTH • TENDERNESS</text>
      </svg>
    </div>
  );
}

function Stamp({ children, small = false }: { children: string; small?: boolean }) {
  return <span className={`stamp ${small ? 'stamp-small' : ''}`}>{children}</span>;
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="meta-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [activeView, setActiveView] = useState<View>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [restrictedKey, setRestrictedKey] = useState('');
  const [restrictedUnlocked, setRestrictedUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new AudioContext();
      } catch {
        return null;
      }
    }
    if (audioContextRef.current.state === 'suspended') {
      void audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playTypewriterClick = () => {
    if (!audioEnabled) return;
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1150, now);
    oscillator.frequency.exponentialRampToValueAtTime(460, now + 0.04);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  };

  const playRadioStatic = () => {
    if (!audioEnabled) return;
    const context = getAudioContext();
    if (!context) return;
    const buffer = context.createBuffer(1, context.sampleRate * 0.12, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * 0.45;
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const now = context.currentTime;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(0.7, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.115);
    source.buffer = buffer;
    source.connect(filter).connect(gain).connect(context.destination);
    source.start(now);
    source.stop(now + 0.12);
  };

  const playArchiveSound = () => {
    playRadioStatic();
    window.setTimeout(playTypewriterClick, 70);
  };

  const enterArchive = () => {
    playArchiveSound();
    setEntered(true);
  };

  const navigate = (view: View) => {
    playArchiveSound();
    setActiveView(view);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (restrictedKey.trim().toLowerCase() === RESTRICTED_ACCESS_KEY) {
      setRestrictedUnlocked(true);
      setUnlockError(false);
    } else {
      setUnlockError(true);
    }
  };

  if (!entered) {
    return (
      <main className="intro-screen">
        <div className="paper-grain" />
        <div className="intro-topline">
          <span>Government of the Girlfriend</span>
          <span>Est. 2025 / Internal Archive</span>
        </div>
        <div className="intro-layout">
          <div className="intro-copy">
            <p className="eyebrow">A private department of</p>
            <h1>The Department<br /><em>of Boyfriend</em> Affairs</h1>
            <div className="intro-rule"><span /></div>
            <p className="intro-bureau">Bureau of Gugli Investigations</p>
            <p className="intro-description">This portal contains classified information concerning an individual suspected of exhibiting exceptionally high levels of charm, affection and boyfriend behaviour.</p>
            <button className="enter-button" onClick={enterArchive}>
              <span>Access case file</span><ArrowUpRight size={17} strokeWidth={1.5} />
            </button>
            <p className="microcopy">By order of the lead investigator · DBA-0805-GB</p>
          </div>
          <div className="intro-evidence">
            <div className="seal-wrap"><Seal /><span>Official departmental mark</span></div>
            <div className="intro-stamp-stack"><Stamp>Top secret</Stamp><Stamp small>Strictly confidential</Stamp></div>
            <div className="intro-file-card">
              <div className="file-card-tab">Case file / 008</div>
              <div className="file-card-body">
                <div className="file-card-number">DBA<br /><strong>0805</strong></div>
                <div className="file-card-lines">
                  <MetaLine label="Subject" value="Neeraj Bhasin" />
                  <MetaLine label="Codename" value="Velvet Knight" />
                  <MetaLine label="Classification" value="Top secret" />
                  <MetaLine label="Status" value="Active investigation" />
                </div>
              </div>
              <div className="file-card-foot"><Shield size={14} /> Handle with affection</div>
            </div>
            <p className="hand-note intro-note">Open only if you're ready to admit the evidence.</p>
          </div>
        </div>
        <div className="intro-footer"><span>Restricted circulation</span><span>For one investigator only</span><span>Page 01 / 01</span></div>
      </main>
    );
  }

  return (
    <div className="archive-app">
      <div className="paper-grain" />
      <header className="mobile-header">
        <button className="icon-button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={21} /></button>
        <div className="mobile-brand"><span>DBA</span><strong>Gugli Investigations</strong></div>
        <button className="audio-toggle mobile-audio-toggle" onClick={() => setAudioEnabled((enabled) => !enabled)} aria-label={audioEnabled ? 'Mute archive sounds' : 'Enable archive sounds'}>{audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}</button>
        <span className="mobile-status"><i /> LIVE</span>
      </header>
      <aside className={`archive-sidebar ${mobileNavOpen ? 'is-open' : ''}`}>
        <div className="sidebar-head">
          <div className="sidebar-brand"><Seal /><div><span>Government of</span><strong>The Girlfriend</strong></div></div>
          <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><PanelLeftClose size={19} /></button>
        </div>
        <div className="sidebar-title"><span>DBA / 008</span><h2>Case archive</h2></div>
        <nav className="archive-nav" aria-label="Case file sections">
          {navItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={activeView === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span className="nav-number">{item.number}</span><Icon size={16} strokeWidth={1.6} /><span>{item.label}</span>{activeView === item.id && <ChevronRight size={14} className="nav-arrow" />}</button>;
          })}
        </nav>
        <div className="sidebar-file-status"><div className="status-row"><span className="live-dot" /> Investigation active</div><div className="status-meter"><span /></div><p>Last updated<br /><strong>08 May 2026 · 23:47</strong></p></div>
        <div className="sidebar-bottom"><div className="sidebar-stamp">Classified<br /><small>DBA-0805</small></div><p>Property of the<br />lead investigator</p></div>
      </aside>
      {mobileNavOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <main className="archive-main">
        <div className="archive-topbar"><div className="breadcrumb"><span>Department of Boyfriend Affairs</span><ChevronRight size={13} /><strong>{navItems.find((item) => item.id === activeView)?.label}</strong></div><div className="topbar-meta"><span>FILE NO. DBA-0805</span><span className="topbar-dot" /><span>CLASSIFICATION: TOP SECRET</span><button className="audio-toggle" onClick={() => setAudioEnabled((enabled) => !enabled)} aria-label={audioEnabled ? 'Mute archive sounds' : 'Enable archive sounds'}>{audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}<span>{audioEnabled ? 'Audio on' : 'Audio off'}</span></button></div></div>
        <div className="archive-content">
          {activeView === 'overview' && <Overview navigate={navigate} />}
          {activeView === 'profile' && <Profile />}
          {activeView === 'reports' && <Reports onSelect={setSelectedReport} />}
          {activeView === 'evidence' && <Evidence onSelect={setSelectedExhibit} />}
          {activeView === 'threat' && <Threat />}
          {activeView === 'witness' && <Witness />}
          {activeView === 'restricted' && <Restricted unlocked={restrictedUnlocked} accessKey={restrictedKey} setAccessKey={setRestrictedKey} error={unlockError} onUnlock={handleUnlock} />}
        </div>
        <footer className="archive-footer"><span>DBA / Bureau of Gugli Investigations</span><span>All observations are deeply biased</span><span>Page {String(navItems.findIndex((item) => item.id === activeView) + 1).padStart(2, '0')} / 07</span></footer>
      </main>
      {selectedReport && <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />}
      {selectedExhibit && <ExhibitModal exhibit={selectedExhibit} onClose={() => setSelectedExhibit(null)} />}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="section-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="section-description">{description}</p>}</div>{action}</div>;
}

function Overview({ navigate }: { navigate: (view: View) => void }) {
  return (
    <div className="view overview-view view-enter">
      <div className="overview-hero"><div><p className="eyebrow">Active file / subject 008</p><h1>Currently investigating:<br /><em>Neeraj Bhasin</em></h1><p className="hero-description">After extensive surveillance, interviews, photographic evidence collection and repeated exposure to the subject’s behaviour, this department has determined that the case requires further investigation.</p></div><div className="hero-status"><div className="pulse-ring"><span /><i /></div><span>Permanent observation</span><strong>ACTIVE</strong></div></div>
      <div className="ticker"><span className="ticker-label">Latest departmental update</span><span className="ticker-text">Subject continues to be unreasonably cute.</span><ArrowUpRight size={15} /></div>
      <div className="overview-grid">
        <div className="subject-polaroid"><div className="photo-frame"><img src={handsomePhoto} alt="The subject, in his natural habitat" /></div><div className="polaroid-caption"><span>The subject, in his natural habitat.</span><small>Exhibit C / 2026</small></div><div className="photo-tape" /></div>
        <div className="case-overview-panel"><div className="panel-heading"><span>Subject overview</span><Fingerprint size={17} /></div><div className="overview-meta"><MetaLine label="File number" value="DBA-0805" /><MetaLine label="Subject" value="Neeraj Bhasin" /><MetaLine label="Alias" value="Gugli / Smile" /><MetaLine label="Codename" value="Velvet Knight" /><MetaLine label="Status" value="Permanently under observation" /><MetaLine label="Threat level" value="Severely loveable" /></div><div className="panel-bottom"><div className="signature-line"><span>Filed by</span><strong>the lead investigator</strong></div><Stamp small>Case active</Stamp></div></div>
      </div>
      <div className="overview-lower"><div className="overview-note"><NotebookPen size={19} /><div><p className="eyebrow">Investigator’s field note</p><p>“The subject has demonstrated a consistent pattern of making ordinary days feel suspiciously special.”</p><span>— Lead investigator, evidence log 08</span></div></div><button className="text-link" onClick={() => navigate('reports')}>Review incident reports <MoveRight size={17} /></button></div>
      <VerdictBanner navigate={navigate} />
    </div>
  );
}

function VerdictBanner({ navigate }: { navigate: (view: View) => void }) {
  return <div className="verdict-banner"><div><p className="eyebrow">Preliminary departmental finding</p><h2>Irreplaceable.</h2><p>Evidence suggests the investigation may be permanently compromised.</p></div><button className="stamp-button" onClick={() => navigate('restricted')}><Stamp small>Open restricted file</Stamp><ArrowUpRight size={18} /></button></div>;
}

function Profile() {
  return (
    <div className="view view-enter profile-view">
      <SectionHeader eyebrow="Case file 008 / subject dossier" title="The subject dossier" description="A formal record of known behaviour, capabilities and recurring vulnerabilities." action={<Stamp>Active subject</Stamp>} />
      <div className="profile-top"><div className="dossier-photo"><img src={bestPhoto} alt="Neeraj Bhasin" /><div className="dossier-photo-label">Identification photograph / 008</div><span className="corner-mark">DBA</span></div><div className="dossier-facts"><div className="dossier-facts-head"><span>Identity record</span><FileBadge size={18} /></div><MetaLine label="Full name" value="Neeraj Bhasin" /><MetaLine label="Known aliases" value="Gugli, Smile" /><MetaLine label="Codename" value="Velvet Knight" /><MetaLine label="Date of birth" value="08 May 2004" /><MetaLine label="Known occupation" value="Developer / Boyfriend" /><MetaLine label="Known associates" value="Family, friends, girlfriend" /><MetaLine label="Status" value="Active" /><MetaLine label="Risk classification" value="Extremely high" /></div><div className="profile-annotation"><Sparkles size={16} /><span>Note: subject’s smile has been classified as a recurring event.</span></div></div>
      <div className="profile-columns"><div className="capability-sheet"><div className="sheet-heading"><h2>Known capabilities</h2><span>Observed / 08</span></div><ul>{capabilities.map((capability) => <li key={capability}><Check size={14} />{capability}</li>)}</ul></div><div className="weakness-sheet"><div className="sheet-heading"><h2>Known weaknesses</h2><span>Handle gently</span></div><div className="weakness-list">{weaknesses.map((weakness, index) => <span key={weakness}><small>0{index + 1}</small>{weakness}</span>)}</div><p className="hand-note">These may also be the investigator’s weaknesses.</p></div></div>
    </div>
  );
}

function Reports({ onSelect }: { onSelect: (report: Report) => void }) {
  return <div className="view view-enter reports-view"><SectionHeader eyebrow="Archive / behavioural evidence" title="Incident reports" description="Eight documented events. One increasingly compromised investigator." action={<div className="report-count"><strong>08</strong><span>filed incidents</span></div>} /><div className="reports-grid">{reports.map((report, index) => <button className="report-card" key={report.id} onClick={() => onSelect(report)}><div className="report-card-top"><span>Incident {report.number}</span><Stamp small>{report.status}</Stamp></div><h2>{report.title}</h2><div className="report-card-meta"><span><Clock3 size={13} />{report.date}</span><span>{report.classification}</span></div><p>{report.report}</p><div className="report-card-foot"><span>Read full report</span><ArrowUpRight size={16} /></div><span className="report-watermark">{String(index + 1).padStart(2, '0')}</span></button>)}</div><div className="add-file-note"><PlusMark /><div><strong>More incidents may be added</strong><span>The archive remains open for future evidence.</span></div><span className="hand-note">To be continued...</span></div></div>;
}

function PlusMark() {
  return <span className="plus-mark"><span /><i /></span>;
}

function Evidence({ onSelect }: { onSelect: (exhibit: Exhibit) => void }) {
  return <div className="view view-enter evidence-view"><SectionHeader eyebrow="Evidence room / visual archive" title="Photographic evidence" description="Recovered images from the ongoing investigation. Every frame is admissible as proof of a good day." action={<div className="evidence-key"><span className="pin red" />Verified evidence <span className="pin olive" />Needs review</div>} /><div className="evidence-board">{exhibits.map((exhibit) => <button className={`exhibit ${exhibit.rotate}`} key={exhibit.id} onClick={() => onSelect(exhibit)}><div className="exhibit-pin" /><div className="exhibit-photo"><img src={exhibit.image} alt={exhibit.title} /></div><div className="exhibit-label"><span>{exhibit.label}</span><strong>{exhibit.title}</strong></div><div className="exhibit-note">{exhibit.note}</div></button>)}<div className="board-note"><div className="red-pencil-circle" /><p>Patterns emerging.<br />Objectivity declining.</p><span>— L.I.</span></div></div></div>;
}

function Threat() {
  const assessments = [
    { label: 'Emotional stability of investigator', value: '0% remaining', amount: 4, tone: 'brick' },
    { label: 'Subject’s cuteness', value: '100% uncontrollable', amount: 100, tone: 'olive' },
    { label: 'Hug effectiveness', value: 'Maximum', amount: 96, tone: 'brick' },
    { label: 'Missing subject index', value: 'Unstable', amount: 78, tone: 'olive' },
    { label: 'Romantic gesture frequency', value: 'Above acceptable limits', amount: 91, tone: 'brick' },
  ];
  return <div className="view view-enter threat-view"><SectionHeader eyebrow="Assessment division / emotional risk" title="Threat assessment" description="A measured response to a subject who refuses to remain emotionally neutral." action={<Stamp>Level: severe</Stamp>} /><div className="threat-hero"><div><span className="threat-label">Current designation</span><h2>Severely<br /><em>loveable</em></h2><p>Threat to investigator’s emotional stability: <strong>extremely high.</strong></p></div><div className="risk-dial"><div className="dial-inner"><span>Risk</span><strong>09</strong><small>/ 10</small></div><div className="dial-needle" /></div></div><div className="assessment-sheet"><div className="assessment-heading"><div><span className="eyebrow">Live behavioural readings</span><h2>Assessment report / DBA-0805</h2></div><Brain size={25} /></div>{assessments.map((assessment) => <div className="assessment-row" key={assessment.label}><div className="assessment-label"><span>{assessment.label}</span><strong>{assessment.value}</strong></div><div className="risk-track"><span className={assessment.tone} style={{ width: `${assessment.amount}%` }} /></div></div>)}<div className="assessment-seal"><Stamp small>High risk</Stamp><span>Readings last calibrated after the latest cuddle-related incident.</span></div></div><div className="threat-bottom"><div className="risk-factors"><h3>Risk factors</h3><div>{['Unexpected affection', 'Random declarations of love', 'Cuddles', 'Listening to the investigator’s blabbering', 'Thoughtful gestures', 'Chocolates', 'Roses', 'Making the investigator laugh', 'Being the investigator’s favourite human'].map((factor) => <span key={factor}><i />{factor}</span>)}</div></div><div className="recommendation"><span>Final recommendation</span><p>“Separation is not recommended.”</p><strong>— Departmental consensus</strong></div></div></div>;
}

function Witness() {
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  return <div className="view view-enter witness-view"><SectionHeader eyebrow="Interview division / testimony" title="Witness statements" description="Recorded testimony from people exposed to the subject’s behaviour." action={<div className="statement-count"><Users size={17} /><span>03 statements on file</span></div>} /><div className="lead-statement"><div className="statement-index">001</div><div className="statement-main"><div className="statement-heading"><div><span className="eyebrow">Primary witness</span><h2>The girlfriend</h2><span className="role">Role: Lead investigator</span></div><Stamp small>Biased witness</Stamp></div><blockquote>“I initially had no idea what I was getting myself into. I was just going about my life when this person somehow became my favourite human.<br /><br />After prolonged investigation, I can confirm that the subject has a remarkably soft side, is incredibly caring and has become a very important part of my life.<br /><br />I would like to formally acknowledge that the investigation has become biased.<br /><br />I am no longer objective.”</blockquote><div className="signature">The lead investigator <span>♡</span></div></div><div className="statement-side"><div className="fingerprint-mark"><Fingerprint size={68} strokeWidth={1} /></div><p>Statement recorded<br /><strong>08 May 2026</strong></p><span>Signed under emotional duress.</span></div></div><div className="minor-statements"><div className="minor-statement"><div className="quote-mark">“</div><div><span className="eyebrow">Intercepted family communication</span><h3>Aagaya madam ka call.</h3><span className="classification">Classification: familiar observation</span></div><MessageSquareQuote size={20} /></div><div className="minor-statement"><div className="quote-mark">“</div><div><span className="eyebrow">Friendly witness report</span><h3>Subject is known to make jokes, get along with people and somehow become everyone’s favourite.</h3><span className="classification">Classification: social behaviour</span></div><Users size={20} /></div></div><div className="transcript"><div><span className="eyebrow">Interview transcript</span><h2>The subject’s soft side</h2></div><div><p>Further statements may be added here as the investigation develops. The department is especially interested in accounts involving unexpected kindness, sleepy affection and snacks.</p>{transcriptOpen && <p className="transcript-reveal">“He makes ordinary moments feel like something worth filing away.”<br /><span>— Additional witness, statement pending review</span></p>}<button className="text-link" onClick={() => setTranscriptOpen((isOpen) => !isOpen)}>{transcriptOpen ? 'Close statement' : 'Add a statement'} <MoveRight size={17} /></button></div></div></div>;
}

function Restricted({ unlocked, accessKey, setAccessKey, error, onUnlock }: { unlocked: boolean; accessKey: string; setAccessKey: (value: string) => void; error: boolean; onUnlock: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="view view-enter restricted-view"><SectionHeader eyebrow="File 009 / highest classification" title="Restricted access" description="The final document is sealed under the authority of the lead investigator." action={<div className="locked-status"><LockKeyhole size={16} /> Authorization required</div>} />{!unlocked ? <div className="lock-screen"><div className="wax-seal"><Heart size={33} fill="currentColor" /></div><div className="lock-copy"><span className="eyebrow">Private correspondence / file 009</span><h2>Some evidence is<br /><em>not for public record.</em></h2><p>This document has been sealed because the contents may cause irreversible feelings. Authorization is required to continue.</p><form onSubmit={onUnlock}><label htmlFor="access-key">Enter authorization key</label><div className="key-input"><KeyRound size={17} /><input id="access-key" type="password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} placeholder="••••••••••••" autoComplete="off" /><button type="submit" aria-label="Unlock restricted file"><ArrowUpRight size={18} /></button></div>{error && <span className="error-text">Authorization denied. The archive remains emotionally guarded.</span>}</form><span className="lock-foot"><LockKeyhole size={13} /> No hints are stored in the public record.</span></div><div className="lock-document"><div className="document-lines" /><Stamp>Classified</Stamp><div className="lock-document-label">DBA<br /><strong>009</strong></div></div></div> : <LoveLetter />}</div>;
}

function LoveLetter() {
  return <div className="love-letter"><div className="letter-top"><span>File 009 / opened</span><Stamp small>Declassified by love</Stamp></div><div className="letter-body"><div className="letter-seal"><Heart size={20} fill="currentColor" /></div><p className="eyebrow">To the subject</p><h2>A personal memorandum</h2><div className="letter-copy"><p>To the person who somehow became my favourite part of so many ordinary days,</p><p>This department was established under extremely biased circumstances. The evidence has been collected, the reports have been filed and the investigator has officially lost all objectivity.</p><p>But behind all the silly reports and dramatic classifications, there is something very real.</p><p>I love the person you are, the way you care, the way you think, the way you make people feel and the way you make my world feel a little more like home.</p><p>I don’t think this investigation will ever conclude.</p><p>And I don’t think I want it to.</p><p>With love,</p><p className="letter-signoff">Your permanently compromised investigator.</p></div></div><div className="letter-margin">For Neeraj<br />only</div></div>;
}

function ReportModal({ report, onClose }: { report: Report; onClose: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="report-modal modal-paper" role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close report" onClick={onClose}><X size={19} /></button><div className="modal-top"><span>DBA / Incident report {report.number}</span><Stamp small>{report.status}</Stamp></div><div className="modal-title"><span className="eyebrow">{report.classification}</span><h2 id="report-title">{report.title}</h2><div><span>{report.date}</span><span>Filed by: lead investigator</span></div></div><div className="modal-rule" /><p className="report-full">{report.report}</p><div className="investigator-note"><NotebookPen size={18} /><div><span>Investigator’s note</span><p>“{report.note}”</p></div></div><div className="modal-bottom"><span>Evidence accepted into archive</span><BadgeCheck size={16} /></div></div></div>;
}

function ExhibitModal({ exhibit, onClose }: { exhibit: Exhibit; onClose: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="exhibit-modal" role="dialog" aria-modal="true" aria-labelledby="exhibit-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close light" aria-label="Close exhibit" onClick={onClose}><X size={19} /></button><div className="modal-image"><img src={exhibit.image} alt={exhibit.title} /></div><div className="exhibit-modal-copy"><span className="eyebrow">{exhibit.label} / recovered evidence</span><h2 id="exhibit-title">{exhibit.title}</h2><p>{exhibit.description}</p><div className="exhibit-modal-note"><NotebookPen size={16} /><span>“{exhibit.note}”</span></div><div className="modal-bottom"><span>Photographic archive / 2026</span><ArrowUpRight size={16} /></div></div></div></div>;
}

export default App;
