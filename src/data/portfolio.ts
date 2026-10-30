/** Central portfolio data. Keep entries limited to facts Masum has confirmed. */

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'MASUM KAJI',
  displayName: 'Masum Kaji',
  originalLabel: 'MASUM KAJI',
  role: 'RESEARCH ANALYST • CAPITAL ALLOCATOR • COMMODITY RESEARCHER',
  tagline: ['RESEARCH ANALYST', 'CAPITAL ALLOCATOR', 'COMMODITY RESEARCHER'],
  intro: 'I’m a research analyst specializing in short- and long-term capital allocation across global assets, with a focus on commodity markets. I’m also a prop firm trader.',
  location: undefined as string | undefined,
  email: 'masumkaji07@gmail.com',
  links: { linkedin: 'https://www.linkedin.com/in/masum-kaji-543a38266/', youtube: 'https://youtube.com/@winwithmasum', instagram: 'https://www.instagram.com/winwithmasum/' } as { linkedin?: string; github?: string; youtube?: string; instagram?: string },
  resumePdf: undefined as string | undefined,
  portrait: {
    src: publicAsset('assets/portrait-1100.webp'),
    srcSet: `${publicAsset('assets/portrait-420.webp')} 420w, ${publicAsset('assets/portrait-720.webp')} 720w, ${publicAsset('assets/portrait-1100.webp')} 1100w`,
    alt: 'Portrait of Masum Kaji.',
  },
  interests: [] as string[],
};

export type Metric = { value: string; label: string };
export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};
export const projects: Project[] = [];

export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export const achievements: Achievement[] = [
  {
    id: 'tradeify-grand-cup',
    title: 'Grand Cup',
    org: 'Tradeify',
    detail: 'Grew a $50,000 prop account to $54,905.36, a $4,905.36 gain, and ranked #2,360 worldwide in Tradeify’s $1M Grand Cup.',
    laurel: 'WORLD RANK #2,360',
    link: publicAsset('certificates/tradeify-grand-cup.webp'),
  },
  {
    id: 'atlas-funded',
    title: 'One Step Access',
    org: 'Atlas Funded',
    detail: 'Passed the evaluation and received Atlas Funded trader status.',
    laurel: 'EVALUATION PASSED',
    link: publicAsset('certificates/atlas-funded-one-step-certificate.webp'),
  },
  {
    id: 'v-prop-challenge',
    title: 'Challenge Passed',
    org: 'V Prop Trader',
    detail: 'Passed the $1,000 Challenge Phase and advanced to the Evaluation Phase.',
    laurel: 'CHALLENGE PASSED',
    link: publicAsset('certificates/v-prop-challenge-certificate.webp'),
  },
  {
    id: 'siftmirth',
    title: 'Siftmirth',
    org: 'Business Built & Sold',
    detail: 'Built a personalized gift company, generated $375 in revenue, and sold the business for $1,000.',
    laurel: 'FOUNDED & SOLD',
    link: publicAsset('certificates/siftmirth-revenue-evidence.webp'),
  },
  {
    id: 'monee-forum',
    title: 'Monee Forum',
    org: 'YouTube Channel • Built & Sold',
    detail: 'Grew an online income and business education channel to 225K+ subscribers, then sold it.',
    laurel: '225K+ SUBSCRIBERS',
    link: publicAsset('certificates/monee-forum-subscriber-evidence.webp'),
  },
];
export type Certification = { issuer: string; name: string; link: string };
export const certifications: Certification[] = [
  {
    issuer: 'NISM • SEBI',
    name: 'National Financial Literacy Quiz 2026 (Online Round) — Participation, Midnapore City College (UG Category)',
    link: publicAsset('certificates/national-financial-literacy-quiz-2026.pdf'),
  },
  {
    issuer: 'NISM • SEBI',
    name: 'SEBI Investor Awareness Test — Participation, March 26, 2026',
    link: publicAsset('certificates/sebi-investor-awareness-test-2026.pdf'),
  },
  {
    issuer: 'Mahindra Rise • Breath Beings',
    name: 'The Quiet Power Quiz — Participation, 2026',
    link: publicAsset('certificates/quiet-power-quiz-2026.pdf'),
  },
  {
    issuer: 'Atlas Funded',
    name: 'One Step Access — Evaluation Completion',
    link: publicAsset('certificates/atlas-funded-one-step-certificate.webp'),
  },
  {
    issuer: 'V Prop Trader',
    name: 'Trading Challenge — Challenge Phase Passed, 12 January 2026',
    link: publicAsset('certificates/v-prop-challenge-certificate.webp'),
  },
  {
    issuer: 'LearnTube.ai • OSB Group',
    name: 'Introduction to Forex Trading — Course Completion, 30 June 2025',
    link: publicAsset('certificates/learntube-forex-trading-certificate.webp'),
  },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export const skillCategories: SkillCategory[] = [
  {
    id: 'markets', title: 'Markets', subtitle: 'Research and trading focus', skills: [
      { name: 'Global Markets', mono: 'GM' }, { name: 'Commodity Markets', mono: 'CM' }, { name: 'Capital Allocation', mono: 'CA' }, { name: 'Market Research', mono: 'MR' }, { name: 'Prop Trading', mono: 'PT' },
    ],
  },
  {
    id: 'content', title: 'Content', subtitle: '7 years creating and growing platforms', skills: [
      { name: 'YouTube', mono: 'YT' }, { name: 'Audience Growth', mono: 'AG' }, { name: 'Social Media', mono: 'SM' }, { name: 'Community Operations', mono: 'CO' }, { name: 'Content Strategy', mono: 'CS' },
    ],
  },
  {
    id: 'creative', title: 'Creative', subtitle: 'Video production tools', skills: [
      { name: 'After Effects', mono: 'AE' }, { name: 'Premiere Pro', mono: 'Pr' }, { name: 'Photoshop', mono: 'Ps' }, { name: 'Video Editing', mono: 'VE' },
    ],
  },
  {
    id: 'coding', title: 'Coding', subtitle: '4 years · self-taught', skills: [
      { name: 'Python', mono: 'Py' }, { name: 'JavaScript', mono: 'JS' }, { name: 'Discord Bots', mono: 'DB' }, { name: 'Bot Features', mono: 'BF' }, { name: 'Chat-based Games', mono: 'CG' },
    ],
  },
  {
    id: 'ventures', title: 'Ventures', subtitle: '3 years in sales and entrepreneurship', skills: [
      { name: 'Entrepreneurship', mono: 'EN' }, { name: 'Sales', mono: 'SA' }, { name: 'E-commerce', mono: 'EC' }, { name: 'Community Building', mono: 'CB' }, { name: 'Business Operations', mono: 'BO' },
    ],
  },
];
export const skillEvidence: Record<string, string[]> = {
  'Global Markets': ['3 years exploring global markets'],
  'Commodity Markets': ['1 year focused on commodities'],
  'Capital Allocation': ['Short- and long-term allocation across global assets'],
  'Market Research': ['Research focus: global assets and commodity markets'],
  'Prop Trading': ['Tradeify Grand Cup · Atlas Funded · V Prop Trader'],
  YouTube: ['Monee Forum: 225K+ subscribers · Win With Masum: current project'],
  'Audience Growth': ['Monee Forum: 225K+ subscribers · Demonic 69: 12K subscribers'],
  'Social Media': ['Instagram audience: @wifixcastle.ig · 23.5K followers'],
  'Community Operations': ['Co-ran BUNIVERSITY · 8K-member Discord community'],
  'Content Strategy': ['Built and sold a YouTube channel focused on online income and business education'],
  'After Effects': ['Learned and used in editing agency work in 2025'],
  'Premiere Pro': ['Learned and used in editing agency work in 2025'],
  Photoshop: ['Learned and used in editing agency work in 2025'],
  'Video Editing': ['Agency collaboration in 2025'],
  Python: ['Self-taught through Discord bot projects'],
  JavaScript: ['Self-taught through Discord bot projects'],
  'Discord Bots': ['Music and multipurpose bots with management features'],
  'Bot Features': ['Custom utilities and community management tools'],
  'Chat-based Games': ['Built in-chat chess and other games'],
  Entrepreneurship: ['Built and sold Monee Forum and Siftmirth'],
  Sales: ['3 years in sales and entrepreneurship, as reported'],
  'E-commerce': ['Siftmirth personalized gift store'],
  'Community Building': ['Co-ran a Discord community that reached 8K members'],
  'Business Operations': ['Built, operated, and sold a small online business'],
};

export type Education = { school: string; place: string; degree: string; period: string; score: string; currentCourses?: string[] };
export const education: Education[] = [
  {
    school: 'Midnapore City College',
    place: 'Midnapore, West Bengal',
    degree: 'Four-year B.Sc. (Honours), Single Major in Geography',
    period: 'Started 17 Jul 2025 · Expected 2029',
    score: 'Currently studying',
    currentCourses: ['MDC 3: Basics of AI'],
  },
];
export type Experience = { company: string; role: string; place: string; period: string; points: string[] };
export const experience: Experience[] = [];

export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
const journeyPalette: Palette = { from: '#151719', via: '#302619', to: '#0b0c0e', accent: '#d9b46a' };
export const journeyHighlights: Metric[] = [
  { value: '7 years', label: 'Creating content' },
  { value: '4 years', label: 'Self-taught coding' },
  { value: '3 years', label: 'Global markets' },
  { value: '3 years', label: 'Sales & entrepreneurship' },
  { value: '1 year', label: 'Commodity markets' },
];
export const seasons: Season[] = [
  {
    number: 1,
    title: 'Code & Community',
    period: '2023–2024',
    synopsis: 'A self-taught start: learning by building tools, games, and online communities with friends.',
    episodes: [
      { code: 'S01 E01', title: 'Discord Bots', description: 'Learned Python and JavaScript by building music and multipurpose Discord bots with management tools and custom features.', tags: ['Python', 'JavaScript', 'Discord'], runtime: 'Self-taught · 2023–2024', palette: journeyPalette },
      { code: 'S01 E02', title: 'Games in Chat', description: 'Built interactive chess and other games that people could play directly inside Discord conversations.', tags: ['Bot development', 'Interactive games', 'Community'], runtime: 'Personal builds', palette: journeyPalette },
      { code: 'S01 E03', title: 'BUNIVERSITY', description: 'Co-ran an 8,000-member Discord community with Ryan Willson in 2024, helping operate the community and serve its members.', tags: ['8K members', 'Community operations', 'Co-led'], runtime: '2024', palette: journeyPalette },
    ],
  },
  {
    number: 2,
    title: 'Content & Audiences',
    period: '7 years · ongoing',
    synopsis: 'Built channels and audiences across YouTube and Instagram, learning content creation and growth through hands-on work.',
    episodes: [
      { code: 'S02 E01', title: 'Monee Forum', description: 'Grew an online income and business education YouTube channel to 225K+ subscribers, then sold it.', tags: ['YouTube', '225K+ subscribers', 'Built & sold'], runtime: 'Channel venture', palette: journeyPalette },
      { code: 'S02 E02', title: 'Demonic 69', description: 'Built a Free Fire gaming video channel that reached 12K subscribers.', tags: ['Gaming', 'YouTube', '12K subscribers'], runtime: 'Creator channel', palette: journeyPalette },
      { code: 'S02 E03', title: '@wifixcastle.ig', description: 'Grew an Instagram audience to 23.5K followers.', tags: ['Instagram', '23.5K followers', 'Audience growth'], runtime: 'Creator account', palette: journeyPalette },
    ],
  },
  {
    number: 3,
    title: 'Creative Production',
    period: '2025',
    synopsis: 'Expanded from publishing into production, learning editing tools through work with an editing agency.',
    episodes: [
      { code: 'S03 E01', title: 'Editing Workflows', description: 'Worked with an editing agency and learned video editing with After Effects, Premiere Pro, and Photoshop.', tags: ['After Effects', 'Premiere Pro', 'Photoshop'], runtime: 'Agency work · 2025', palette: journeyPalette },
    ],
  },
  {
    number: 4,
    title: 'Markets & Trading',
    period: '3 years in global markets',
    synopsis: 'Studying global assets and capital allocation, with a growing focus on commodities and a trading journey documented as it develops.',
    episodes: [
      { code: 'S04 E01', title: 'Learning the Markets', description: 'Started with personal capital, completed LearnTube’s Introduction to Forex Trading course, and developed a focus on global assets and commodities.', tags: ['Global assets', 'Forex course', '1 year in commodities'], runtime: 'Ongoing study', palette: journeyPalette },
      { code: 'S04 E02', title: 'Prop Firm Challenges', description: 'Passed the V Prop Trader challenge phase and the Atlas Funded evaluation after beginning prop-firm trading in late 2025 and early 2026.', tags: ['V Prop Trader', 'Atlas Funded', 'Challenge milestones'], runtime: '2025–2026', palette: journeyPalette },
      { code: 'S04 E03', title: 'Tradeify Grand Cup', description: 'Reached a $54,905.36 balance on a $50,000 prop account and ranked #2,360 worldwide in the $1M trading competition.', tags: ['Tradeify', '$50K account', 'Ranked #2,360'], runtime: 'Competition result', palette: journeyPalette },
    ],
  },
  {
    number: 5,
    title: 'Building What’s Next',
    period: '2026 · current chapter',
    synopsis: 'Combining study, markets, and entrepreneurship while building Win With Masum and working toward a longer-term social-enterprise vision.',
    episodes: [
      { code: 'S05 E01', title: 'Siftmirth', description: 'Built a personalized gift store in 2026, generated $375 in revenue, and sold the business for $1,000.', tags: ['E-commerce', '$375 revenue', 'Sold for $1,000'], runtime: 'Built & sold · 2026', palette: journeyPalette },
      { code: 'S05 E02', title: 'Win With Masum', description: 'Current creator project: documenting a learning journey in the markets while building a focused personal platform.', tags: ['YouTube', 'Markets', 'In progress'], runtime: 'Current project', palette: journeyPalette },
      { code: 'S05 E03', title: 'Geography & AI', description: 'Studying a four-year B.Sc. in Geography at Midnapore City College, with Basics of AI among current coursework.', tags: ['B.Sc. Geography', 'Midnapore City College', 'Basics of AI'], runtime: '2025–2029 · in progress', palette: journeyPalette },
      { code: 'S05 E04', title: 'Long-Term Vision', description: 'A future goal is to build a social enterprise that creates jobs and practical financial support for people with limited access to opportunity.', tags: ['Future vision', 'Job creation', 'Social enterprise'], runtime: 'Long-term goal', palette: journeyPalette },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export const topPicks: TopPick[] = [
  { label: 'BUSINESS BUILT & SOLD', title: 'Siftmirth', detail: '$375 revenue · sold for $1,000', palette: journeyPalette },
  { label: 'TRADEIFY GRAND CUP', title: '#2,360', detail: '$4,905 gain · $1M trading competition', palette: journeyPalette },
  { label: 'CHANNEL BUILT & SOLD', title: 'Monee Forum', detail: '225K+ subscribers · online business education', palette: journeyPalette },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };
export const introSlides: IntroSlide[] = [
  {
    kicker: 'Introduction',
    title: 'Masum Kaji',
    lines: ['Specializing in short- and long-term capital allocation across global assets.', 'Focused on commodity markets. Prop firm trader.'],
  },
];

export type ProfileId = 'masum' | 'recruiter' | 'investor' | 'trader';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

const order: SectionId[] = ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'];
export const viewerProfiles: { id: ProfileId; name: string; blurb: string; color: string; order: SectionId[] }[] = [
  { id: 'masum', name: 'Masum', blurb: 'The full portfolio', color: '#d9b46a', order },
  { id: 'recruiter', name: 'Recruiter', blurb: 'Profile and work first', color: '#d9b46a', order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'] },
  { id: 'investor', name: 'Investor', blurb: 'Research and allocation first', color: '#b38a3b', order: ['originals', 'picks', 'skills', 'journey', 'moments', 'about', 'story'] },
  { id: 'trader', name: 'Trader', blurb: 'Markets and trading first', color: '#e5c886', order: ['originals', 'journey', 'picks', 'skills', 'moments', 'about', 'story'] },
];

const neutral: Palette = { from: '#111316', via: '#27251f', to: '#090a0c', accent: '#d9b46a' };
export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Masum', meta: 'Research Analyst • Prop Firm Trader', palette: neutral },
  journey: { nav: 'Journey', card: 'My Journey', meta: 'Background and milestones', palette: neutral },
  originals: { nav: 'Research', card: 'Research & Ideas', meta: 'Market analysis and research notes', palette: neutral },
  picks: { nav: 'Highlights', card: 'Highlights', meta: 'Selected highlights', palette: neutral },
  skills: { nav: 'Skills', card: 'My Skills', meta: 'Skills and tools', palette: neutral },
  moments: { nav: 'Milestones', card: 'Milestones', meta: 'Achievements and credentials', palette: neutral },
  story: { nav: 'Profile', card: 'Profile', meta: 'Profile details', palette: neutral },
};
