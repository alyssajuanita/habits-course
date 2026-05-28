export type StepKey = 'watch' | 'keyIdeas' | 'reflect' | 'scripture' | 'action'

export interface Step {
  key: StepKey
  label: string
  icon: string
  durationLabel: string
}

export interface Session {
  id: number
  slug: string
  title: string
  subtitle: string
  icon: string
  color: string
  videoUrl: string
  videoDuration: string
  description: string
  keyIdeas: string[]
  reflectQuestions: string[]
  scripture: { reference: string; text: string }
  actionPrompt: string
  resources?: { label: string; url: string }[]
}

export const STEPS: Step[] = [
  { key: 'watch',     label: 'Watch the Session', icon: '▶',  durationLabel: '~60 min' },
  { key: 'keyIdeas',  label: 'Key Ideas',          icon: '💡', durationLabel: '5 min'   },
  { key: 'reflect',   label: 'Reflect',            icon: '✍',  durationLabel: '5 min'   },
  { key: 'scripture', label: 'Scripture Study',    icon: '📖', durationLabel: '5 min'   },
  { key: 'action',    label: 'Your Action',        icon: '🎯', durationLabel: '5 min'   },
]

export const SESSIONS: Session[] = [
  {
    id: 1,
    slug: '1',
    title: 'The Heart of the Father',
    subtitle: 'Session 1 of 7',
    icon: '❤️',
    color: 'from-rose-700 to-rose-900',
    videoUrl: '',
    videoDuration: '1:01:52',
    description:
      'This is where it all starts. Discover the heart behind everything—God wants a family, not just followers. Watch the full session, or jump in for the first 18 minutes and come back for the rest.',
    keyIdeas: [
      'God\'s deepest desire is family, not religion.',
      'Disciples are made, not just born—it requires intentional investment.',
      'The Great Commission begins with the heart of the Father.',
      'We replicate what we are, not just what we know.',
    ],
    reflectQuestions: [
      'What would it look like for you to relate to God as a Father rather than a distant authority?',
      'Where have you been more focused on "following rules" than joining a family?',
      'Who in your life could you begin to invest in as a disciple-making relationship?',
    ],
    scripture: {
      reference: 'Matthew 28:18–20',
      text:
        '"All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age."',
    },
    actionPrompt:
      'Write down the name of one person you sense God is calling you to invest in as a disciple this week. Pray for them daily and look for an opportunity to connect.',
    resources: [
      { label: 'Session Slides', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
  {
    id: 2,
    slug: '2',
    title: 'Pray',
    subtitle: 'Session 2 of 7',
    icon: '🙏',
    color: 'from-blue-700 to-blue-900',
    videoUrl: '',
    videoDuration: '~60 min',
    description:
      'Prayer is the fuel that drives disciple-making movements. Watch this session before moving on—it will transform how you talk to God and how you pray for those around you.',
    keyIdeas: [
      'Prayer is the foundation of every disciple-making movement.',
      'Jesus modeled a life of prayer—especially before significant decisions.',
      'Praying for "persons of peace" opens doors that strategy alone never can.',
      'A simple daily prayer rhythm connects you to God\'s mission.',
    ],
    reflectQuestions: [
      'How would you describe your current prayer life? Honest, routine, or struggling?',
      'Who are you praying for by name to come to faith?',
      'What is one thing you could do this week to deepen your prayer habit?',
    ],
    scripture: {
      reference: 'Luke 10:2',
      text:
        '"He told them, \'The harvest is plentiful, but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.\'"',
    },
    actionPrompt:
      'Start a "Persons of Peace" prayer list—write down 3–5 people who don\'t yet know Jesus. Commit to praying for them by name every day this week.',
    resources: [
      { label: 'Disciple-Making Prayer Habits', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
  {
    id: 3,
    slug: '3',
    title: 'Engage',
    subtitle: 'Session 3 of 7',
    icon: '🤝',
    color: 'from-emerald-700 to-emerald-900',
    videoUrl: '',
    videoDuration: '~60 min',
    description:
      'Going spiritually involves living openly as a disciple within your natural relationships. This session shows you how to engage your everyday world with intentionality—without being weird about it.',
    keyIdeas: [
      'Every believer is called to engage their world—not just full-time ministers.',
      '"Going" happens in your neighborhood, workplace, and family.',
      'Spiritual conversations can begin naturally with genuine curiosity and care.',
      'Your story is a powerful bridge into someone else\'s story.',
    ],
    reflectQuestions: [
      'What are your natural "mission fields"—the circles of life where you already spend time?',
      'When was the last time you had a meaningful spiritual conversation outside church?',
      'What holds you back from engaging more openly as a follower of Jesus?',
    ],
    scripture: {
      reference: 'John 20:21',
      text: '"Again Jesus said, \'Peace be with you! As the Father has sent me, I am sending you.\'"',
    },
    actionPrompt:
      'Choose one "mission field" (workplace, neighborhood, gym, etc.) and intentionally look for one conversation opportunity this week. Come back ready to share what happened.',
    resources: [
      { label: 'Session Slides', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
  {
    id: 4,
    slug: '4',
    title: 'Find',
    subtitle: 'Session 4 of 7',
    icon: '🔍',
    color: 'from-amber-600 to-amber-900',
    videoUrl: '',
    videoDuration: '~60 min',
    description:
      'Jesus always looked for the "person of peace"—someone open, receptive, and connected. This session teaches you how to recognize and pursue those divine appointments.',
    keyIdeas: [
      'A "person of peace" is someone God has already prepared to receive the gospel.',
      'Jesus sent disciples in pairs to find persons of peace (Luke 10).',
      'Signs of a person of peace: they welcome you, listen to you, and serve you.',
      'When you find one, stay—don\'t hop from house to house.',
    ],
    reflectQuestions: [
      'Who in your life shows signs of being a person of peace—open, receptive, and spiritually curious?',
      'Have you ever moved on too quickly from someone God was drawing toward Himself?',
      'How can you become more sensitive to the Holy Spirit\'s leading in your daily encounters?',
    ],
    scripture: {
      reference: 'Luke 10:5–6',
      text:
        '"When you enter a house, first say, \'Peace to this house.\' If someone who promotes peace is there, your peace will rest on them; if not, it will return to you."',
    },
    actionPrompt:
      'Revisit your prayer list from Session 2. Pray specifically for God to reveal which person is your "person of peace" right now. Take one step toward them this week.',
    resources: [
      { label: 'Session Slides', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
  {
    id: 5,
    slug: '5',
    title: 'Discover',
    subtitle: 'Session 5 of 7',
    icon: '📖',
    color: 'from-purple-700 to-purple-900',
    videoUrl: '',
    videoDuration: '~60 min',
    description:
      'Discovery Bible Study (DBS) is a simple, reproducible tool for helping anyone explore what the Bible says and respond to God. Learn how to facilitate it—even with people who have never opened a Bible.',
    keyIdeas: [
      'Discovery Bible Study lets Scripture speak for itself—you facilitate, God teaches.',
      'The method is simple enough that anyone can immediately share it with others.',
      'DBS works with seekers, new believers, and mature Christians.',
      'Reproducibility is the key: if you can\'t pass it on, it\'s not a movement.',
    ],
    reflectQuestions: [
      'Have you ever studied the Bible with someone who was exploring faith for the first time? What was it like?',
      'What fears do you have about leading a Bible study? How might DBS address those?',
      'Who is one person you could invite to a Discovery Bible Study this month?',
    ],
    scripture: {
      reference: '2 Timothy 3:16–17',
      text:
        '"All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work."',
    },
    actionPrompt:
      'Practice the DBS format with a family member, friend, or your small group this week using Luke 15:11–32. Reflect on what surprised you about the process.',
    resources: [
      { label: 'DBS Guide', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
  {
    id: 6,
    slug: '6',
    title: 'Assemble',
    subtitle: 'Session 6 of 7',
    icon: '⛪',
    color: 'from-cyan-700 to-cyan-900',
    videoUrl: '',
    videoDuration: '~60 min',
    description:
      'When people come to faith, they need community. This session shows you how to gather new believers into simple, multiplying churches—wherever they are.',
    keyIdeas: [
      'Church is not a building—it\'s a community of disciples who follow Jesus together.',
      'Simple church can happen in homes, workplaces, and neighborhoods.',
      'The early church gathered and multiplied at a remarkable pace (Acts 2).',
      'Healthy churches reproduce—they don\'t just grow inward.',
    ],
    reflectQuestions: [
      'What does "church" mean to you? How has that definition been shaped—or challenged—by this course?',
      'What would a simple gathering of disciples look like in your context?',
      'Is there a group of people you know who might be ready to start meeting together around Jesus?',
    ],
    scripture: {
      reference: 'Acts 2:42–47',
      text:
        '"They devoted themselves to the apostles\' teaching and to fellowship, to the breaking of bread and to prayer… And the Lord added to their number daily those who were being saved."',
    },
    actionPrompt:
      'Identify one group of 2–4 people who could form the seed of a simple gathering. Pray about initiating a regular time to meet around Scripture, prayer, and community.',
    resources: [
      { label: 'Simple Church Guide', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
  {
    id: 7,
    slug: '7',
    title: 'Replicate',
    subtitle: 'Session 7 of 7',
    icon: '🌱',
    color: 'from-lime-700 to-lime-900',
    videoUrl: '',
    videoDuration: '~60 min',
    description:
      'The final habit—and the one that makes it all a movement. This session ties everything together and challenges you to become someone who not only makes disciples, but makes disciple-makers.',
    keyIdeas: [
      'A disciple who doesn\'t make disciples is not yet a fully-formed disciple.',
      'Multiplication is the New Testament norm—not the exception.',
      'The goal isn\'t your growth; it\'s a movement that reaches people you\'ll never meet.',
      '"Faithful and available" matters more than gifted and polished.',
    ],
    reflectQuestions: [
      'Looking back over the past 7 weeks, what has shifted most in how you think about discipleship?',
      'Who are you pouring into right now? Who could you begin to pour into?',
      'What is the one habit from this course you most need to strengthen? What\'s your plan?',
    ],
    scripture: {
      reference: '2 Timothy 2:2',
      text:
        '"And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others."',
    },
    actionPrompt:
      'Write out your personal "Disciple-Making Plan": one person you\'re praying for, one person you\'re engaging, and one person you\'re beginning to equip. Share it with your coaching circle.',
    resources: [
      { label: 'Session Slides', url: '#' },
      { label: 'Coaching Circles', url: '#' },
      { label: 'DMM Community', url: 'https://app.mightynetworks.com' },
    ],
  },
]
