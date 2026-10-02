import { SpammerProfile, TeamProfile } from '../types';

export const INITIAL_TEAMS: TeamProfile[] = [
  {
    id: 'team-bca',
    name: 'Bangladesh Cyber Army',
    alias: 'BCA',
    founded: '2011',
    origin: 'Bangladesh',
    status: 'Legendary',
    memberCount: 250,
    totalOps: 340,
    respectCount: 8420,
    manifestoBangla: 'সাইবার স্পেসে দেশের সার্বভৌমত্ব রক্ষা ও অপশক্তির বিরুদ্ধে ঐক্যবদ্ধ প্রতিবাদ। আমরা থামিনি, থামব না।',
    manifestoEnglish: 'Defending cyber sovereignty and uniting against digital aggression. Unbowed, unbroken.',
    leader: 'Cyber Sentinel',
    keyMembers: ['Shadow Hunter', 'Ghost Rider', 'Byte Striker', 'Dark Core'],
    notableOps: [
      { year: '2012', opName: 'Op Border Defense', impact: 'Defaced 1,200+ hostile infrastructure websites' },
      { year: '2015', opName: 'Anti-Phish Protocol', impact: 'Takedown of 400+ targeted phishing servers' },
      { year: '2020', opName: 'Cyber Strike Delta', impact: 'Neutralized major coordinated disinformation botnets' },
    ]
  },
  {
    id: 'team-c71',
    name: 'Cyber 71',
    alias: 'C71',
    founded: '2012',
    origin: 'Bangladesh',
    status: 'Legendary',
    memberCount: 180,
    totalOps: 420,
    respectCount: 9650,
    manifestoBangla: 'আমরা ধ্বংস করি না, আমরা ন্যায়বিচারের জন্য সাইবার স্পেসকে নিয়ন্ত্রণে নিই। উই আর ওয়ান।',
    manifestoEnglish: 'We do not bring mindless chaos; we secure cyberspace for justice. We are united.',
    leader: 'Commander Red',
    keyMembers: ['Trojan Lord', 'Hex Phantom', 'Cipher Root', 'Silent Echo'],
    notableOps: [
      { year: '2013', opName: 'Operation Red Alert', impact: 'High-profile retaliatory counter-offensive operations' },
      { year: '2017', opName: 'Op Dark Shield', impact: 'Protected national healthcare & educational portals' },
      { year: '2022', opName: 'Global Mass Recon', impact: 'Exposed international scam networks targeting citizens' }
    ]
  },
  {
    id: 'team-darkshadow',
    name: 'Dark Shadow Hackers',
    alias: 'DSH',
    founded: '2014',
    origin: 'Bangladesh / Global',
    status: 'Active',
    memberCount: 95,
    totalOps: 215,
    respectCount: 6310,
    manifestoBangla: 'অন্ধকার থেকেই আমাদের উৎপত্তি, সত্যের আলোয় আমাদের পদযাত্রা। স্প্যামিং ও ডিফেন্সের মেলবন্ধন।',
    manifestoEnglish: 'Born in the shadows, marching for our digital identity. Master of mass reports and cyber actions.',
    leader: 'NightCrawler',
    keyMembers: ['Null Pointer', 'Vortex', 'Krypton', 'Black Lotus'],
    notableOps: [
      { year: '2018', opName: 'Shadow Storm', impact: 'Bulk take-down of 150 fake impersonation networks' },
      { year: '2023', opName: 'Operation Void', impact: 'Mass reporting campaign against fraudulent crypto spam' }
    ]
  },
  {
    id: 'team-phantom',
    name: 'Phantom Spammers Syndicate',
    alias: 'PSS',
    founded: '2016',
    origin: 'South Asia',
    status: 'Active',
    memberCount: 140,
    totalOps: 190,
    respectCount: 5240,
    manifestoBangla: 'আমরা স্প্যামার, আমরা কারও কাছে মাথা নত করি না। সামাজিক মাধ্যমে সঠিক ভারসাম্য বজায় রাখাই আমাদের ধর্ম।',
    manifestoEnglish: 'We spammers never bow down. Enforcing digital consequences through automated precision.',
    leader: 'Phantom Lead',
    keyMembers: ['FloodMaster', 'EchoByte', 'RedWire', 'SpamKing'],
    notableOps: [
      { year: '2019', opName: 'Mass Report Tidal', impact: 'Coordinated takedown of toxic community groups' },
      { year: '2024', opName: 'Operation Equalizer', impact: 'Targeted DDoS flood on scam loan syndicates' }
    ]
  },
  {
    id: 'team-redforce',
    name: 'Red Force Underground',
    alias: 'RFU',
    founded: '2017',
    origin: 'Bangladesh',
    status: 'Underground',
    memberCount: 65,
    totalOps: 140,
    respectCount: 4180,
    manifestoBangla: 'কথা কম, আঘাত বেশি। সাইবার স্পেসের যেকোনো অবিচারের জবাব লাল শিখায় দেওয়া হবে।',
    manifestoEnglish: 'Fewer words, sharper strikes. Responding to injustice with digital fire.',
    leader: 'Crimson Ghost',
    keyMembers: ['FlameByte', 'Acid Burn', 'Zero Day', 'Red Fox'],
    notableOps: [
      { year: '2021', opName: 'Red Flare Blitz', impact: 'Overwhelmed hostile DDoS attack vectors' },
      { year: '2025', opName: 'Firewall Breach Test', impact: 'Penetration testing of regional hosting providers' }
    ]
  },
  {
    id: 'team-anonghost',
    name: 'AnonGhost Cyber Legion',
    alias: 'AGCL',
    founded: '2013',
    origin: 'International / South Asia',
    status: 'Legendary',
    memberCount: 310,
    totalOps: 560,
    respectCount: 10890,
    manifestoBangla: 'আমরা অদেখা কিন্তু সর্বত্র উপস্থিত। ডিজিটাল সেন্সরশিপের বিরুদ্ধে বিশ্বস্ত প্রহরীর দল।',
    manifestoEnglish: 'Unseen yet everywhere. Fighting digital censorship across the globe.',
    leader: 'Legion Master',
    keyMembers: ['Apex Ghost', 'Phantom Blade', 'Root Shell', 'Zero Core'],
    notableOps: [
      { year: '2014', opName: 'Op Free Net', impact: 'Defaced 500+ censorship-enforcing media gateways' },
      { year: '2018', opName: 'Global Deface Surge', impact: 'Synchronized worldwide web defacement demonstration' }
    ]
  }
];

export const INITIAL_SPAMMERS: SpammerProfile[] = [
  {
    id: 'spammer-1',
    name: 'Tanvir Hossain',
    alias: 'Shadow Hunter (ছায়া শিকারী)',
    avatarUrl: '',
    team: 'Bangladesh Cyber Army',
    teamId: 'team-bca',
    origin: 'Dhaka, Bangladesh',
    activePeriod: '2012 - Present',
    specialty: ['Mass Report', 'Page Takeover', 'Social Engineering'],
    status: 'Legend',
    respectCount: 3820,
    verified: true,
    bioBangla: 'বাংলাদেশের অন্যতম প্রবীণ স্প্যামার ও সাইবার রিকন বিশেষজ্ঞ। শত শত ভুয়া ও ক্ষতিকর পেজ দ্রুততম সময়ে অপসারণে অনন্য ভূমিকা পালন করেছেন।',
    bioEnglish: 'One of the veteran cyber tacticians and mass-report specialists in Bangladesh. Known for rapid neutralization of hostile social assets.',
    famousOperations: [
      { year: '2013', title: 'Fake Page Purge', description: 'Removed 180+ impersonation political & celebrity pages within 48 hours.' },
      { year: '2017', title: 'Community Defense', description: 'Recovered 40+ compromised administrative profiles of national agencies.' }
    ],
    socials: {
      telegram: '@shadow_hunter_bd',
      facebook: 'fb.com/shadowhunter.official'
    }
  },
  {
    id: 'spammer-2',
    name: 'Farhan Ahmed',
    alias: 'Trojan Lord',
    avatarUrl: '',
    team: 'Cyber 71',
    teamId: 'team-c71',
    origin: 'Chittagong, Bangladesh',
    activePeriod: '2014 - Present',
    specialty: ['Traffic Flooding / DDoS', 'Deface & Recon', 'Botnet & Automation'],
    status: 'Active',
    respectCount: 2940,
    verified: true,
    bioBangla: 'ট্রাফিক ফ্লাডিং ও সার্ভার ওভারলোড প্রতিরোধী বিশেষজ্ঞ। দীর্ঘ সময় ধরে সাইবার ডিফেন্সে সক্রিয় এবং বহু বৃহৎ আক্রমণের মূল প্রতিরোধকারী।',
    bioEnglish: 'Specialist in heavy traffic flooding and server stress mechanics. Led numerous defensive cyber campaigns across regional networks.',
    famousOperations: [
      { year: '2015', title: 'Operation Gateway Lockdown', description: 'Intercepted and throttled botnet spam targeting critical education portals.' },
      { year: '2021', title: 'Flood Resilience Test', description: 'Conducted high-load stress testing for independent news media servers.' }
    ],
    socials: {
      telegram: '@trojan_lord_71',
      discord: 'trojanlord#7171'
    }
  },
  {
    id: 'spammer-3',
    name: 'Sabbir Rahman',
    alias: 'FloodMaster (ফ্লাড মাস্টার)',
    avatarUrl: '',
    team: 'Phantom Spammers Syndicate',
    teamId: 'team-phantom',
    origin: 'Sylhet, Bangladesh',
    activePeriod: '2016 - Present',
    specialty: ['Mass Report', 'Botnet & Automation', 'OSINT & Doxx'],
    status: 'Active',
    respectCount: 2150,
    verified: true,
    bioBangla: 'অটোমেটেড রিপোর্ট স্ক্রিপ্ট এবং মাস স্প্যামিং আর্কিটেকচারের কারিগর। হাজার হাজার রিপোর্ট সিন্ডিকেট সমন্বয় করার খ্যাতি রয়েছে।',
    bioEnglish: 'Architect of automated reporting scripts and mass-spam syndicates. Renowned for coordinating multi-vector report storms.',
    famousOperations: [
      { year: '2019', title: 'Tidal Report Storm', description: 'Coordinated 50,000+ targeted spam reports against illegal gambling rings.' },
      { year: '2023', title: 'Script Surge v3', description: 'Released underground automation script framework for ethical report teams.' }
    ],
    socials: {
      telegram: '@floodmaster_pss'
    }
  },
  {
    id: 'spammer-4',
    name: 'Shakil Hasan',
    alias: 'Null Pointer',
    avatarUrl: '',
    team: 'Dark Shadow Hackers',
    teamId: 'team-darkshadow',
    origin: 'Rajshahi, Bangladesh',
    activePeriod: '2015 - 2024',
    specialty: ['Deface & Recon', 'Account Recovery & Defense', 'Page Takeover'],
    status: 'Legend',
    respectCount: 1980,
    verified: true,
    bioBangla: 'ডিফেস এবং সোশ্যাল পেজ রিকভারির অন্যতম নির্ভরযোগ্য নাম। স্প্যামার কমিউনিটিতে নিঃস্বার্থ সাহায্য ও ট্রেইনার হিসেবে খ্যাত।',
    bioEnglish: 'Legendary asset recovery expert and penetration tester. Famous for helping hundreds recover hijacked accounts and groups.',
    famousOperations: [
      { year: '2018', title: 'Black Mirror Deface', description: 'Mass web defacement demonstration alerting unpatched CMS servers.' },
      { year: '2022', title: 'Page Liberation Ops', description: 'Safely rescued 85 hijacked regional content creator channels.' }
    ],
    socials: {
      telegram: '@null_pointer_dsh'
    }
  },
  {
    id: 'spammer-5',
    name: 'Nayeem Islam',
    alias: 'Crimson Ghost',
    avatarUrl: '',
    team: 'Red Force Underground',
    teamId: 'team-redforce',
    origin: 'Khulna, Bangladesh',
    activePeriod: '2017 - Present',
    specialty: ['Traffic Flooding / DDoS', 'Social Engineering', 'Mass Report'],
    status: 'Active',
    respectCount: 1670,
    verified: true,
    bioBangla: 'রেড ফোর্সের শীর্ষ অপারেটর। দ্রুত এবং নিঃশব্দে সাইবার আঘাত পরিচালনায় দক্ষ।',
    bioEnglish: 'Lead tactical operator at Red Force Underground. Known for covert and surgical social mass actions.',
    famousOperations: [
      { year: '2021', title: 'Silent Strike', description: 'Synchronized takedown of 60 coordinated fraud networks.' }
    ],
    socials: {
      telegram: '@crimson_ghost_rfu'
    }
  },
  {
    id: 'spammer-6',
    name: 'Abrar Chowdhury',
    alias: 'Hex Phantom',
    avatarUrl: '',
    team: 'Cyber 71',
    teamId: 'team-c71',
    origin: 'Barisal, Bangladesh',
    activePeriod: '2013 - Present',
    specialty: ['Deface & Recon', 'OSINT & Doxx', 'Botnet & Automation'],
    status: 'Legend',
    respectCount: 3120,
    verified: true,
    bioBangla: 'ওপেন সোর্স ইন্টেলিজেন্স (OSINT) এবং সাইবার ফুটপ্রিন্ট ট্র্যাকিংয়ে মাস্টারমাইন্ড। কুখ্যাত স্ক্যামারদের মুখোশ উন্মোচনে অগ্রণী।',
    bioEnglish: 'Mastermind of open source intelligence (OSINT) and footprint tracking. Tracked and unmasked dozens of hostile fraud syndicates.',
    famousOperations: [
      { year: '2014', title: 'Scam Network Doxx', description: 'Uncovered real identities behind international extortion blackmail groups.' }
    ],
    socials: {
      telegram: '@hex_phantom_71'
    }
  }
];

export const TARGET_PILLARS = [
  {
    id: 'content-creators',
    label: 'Content Creators',
    bengaliLabel: 'কনটেন্ট ক্রিয়েটর',
    description: 'Protecting and restoring pages, fighting illegal copyright claims, and stopping impersonation.',
    bengaliDescription: 'কনটেন্ট ক্রিয়েটরদের পেজ সুরক্ষা, কপিরাইট অপব্যবহার প্রতিরোধ ও ভুয়া অ্যাকাউন্ট দমন।'
  },
  {
    id: 'entrepreneur',
    label: 'Entrepreneur',
    bengaliLabel: 'উদ্যোক্তা',
    description: 'Securing e-commerce assets, defending online stores from extortion attacks and competitor fraud.',
    bengaliDescription: 'উদ্যোক্তাদের ডিজিটাল সম্পদ, ফেসবুক শপ ও ই-কমার্স প্ল্যাটফর্মের নিরাপত্তা বিধান।'
  },
  {
    id: 'media-owners',
    label: 'Media Owners',
    bengaliLabel: 'মিডিয়া ওনার্স',
    description: 'Preserving independent journalism, fighting mass censorship bots and reporting false strikes.',
    bengaliDescription: 'সংবাদ মাধ্যম ও অনলাইন নিউজ পোর্টালের সাইবার প্রতিরক্ষা এবং ক্ষতিকর বট প্রতিরোধ।'
  },
  {
    id: 'website-owners',
    label: 'Website Owners',
    bengaliLabel: 'ওয়েবসাইট ওনার্স',
    description: 'Penetration testing, alerting unpatched vulnerabilities, defending against hostile defacements.',
    bengaliDescription: 'ওয়েবসাইটের নিরাপত্তা দুর্বলতা চিহ্নিতকরণ ও ধ্বংসাত্মক হ্যাকিং থেকে রক্ষা করা।'
  },
  {
    id: 'citizens',
    label: 'Citizens',
    bengaliLabel: 'সাধারণ নাগরিক',
    description: 'Safeguarding common people from social media blackmail, scam call centers, and cyber harassment.',
    bengaliDescription: 'সাধারণ নাগরিকদের হয়রানি, ব্ল্যাকমেইল ও প্রতারণা থেকে রক্ষায় সাইবার সহযোগিতা।'
  }
];
