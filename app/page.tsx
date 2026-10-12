'use client'

import { useState } from 'react'
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Heart,
  Home,
  LogIn,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PenLine,
  Search,
  Settings,
  Sparkles,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from 'lucide-react'

type View = 'feed' | 'discussions' | 'announcements' | 'timetable' | 'profile' | 'settings'

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'feed', label: 'Home feed', icon: Home },
  { id: 'discussions', label: 'Discussions', icon: MessageCircle },
  { id: 'announcements', label: 'Announcments', icon: Bell },
  { id: 'timetable', label: 'Timetable', icon: CalendarDays },
]

const posts = [
  { name: 'Atharva Chauhan', handle: '@atharva.c', time: '24 min ago', initials: 'AM', color: 'bg-amber-400', body: 'Anyone from 2nd year CSE heading to the library after 5? I need to finish the OS assignment and could use a study buddy.', likes: 18, replies: 6, tag: 'Study group' },
  { name: 'Yash', handle: '@yash.n', time: '1 hr ago', initials: 'YN', color: 'bg-violet-400', body: 'The photography club is doing a campus walk this Saturday. Beginners are very welcome — cameras or phones both work.', likes: 42, replies: 12, tag: 'Clubs & societies' },
  { name: 'Ishit', handle: '@ishit.s', time: '3 hrs ago', initials: 'IS', color: 'bg-cyan-400', body: 'Found a black water bottle near the academic block stairs. It has a tiny NASA sticker. DM me if it is yours.', likes: 9, replies: 3, tag: 'Lost & found' },
]

const schedules = {
  Mon: {
    date: 'Monday, 12 October 2026',
    items: [
      { time: '09:00', end: '10:00', subject: 'Database Management', room: 'LT-1', tone: 'blue' },
      { time: '10:15', end: '11:15', subject: 'Operating Systems', room: 'C-204', tone: 'purple' },
      { time: '12:00', end: '13:00', subject: 'Computer Networks', room: 'B-102', tone: 'orange' },
      { time: '14:00', end: '15:00', subject: 'Lunch break', room: '—', tone: 'muted' },
    ],
  },
  Tue: {
    date: 'Tuesday, 13 October 2026',
    items: [
      { time: '09:00', end: '10:00', subject: 'Data Structures', room: 'LT-2', tone: 'blue' },
      { time: '10:15', end: '11:15', subject: 'Operating Systems', room: 'C-204', tone: 'purple' },
      { time: '12:00', end: '13:00', subject: 'Computer Networks', room: 'B-102', tone: 'orange' },
      { time: '14:00', end: '15:00', subject: 'Lunch break', room: '—', tone: 'muted' },
    ],
  },
  Wed: {
    date: 'Wednesday, 14 October 2026',
    items: [
      { time: '09:00', end: '10:30', subject: 'Discrete Mathematics', room: 'A-105', tone: 'purple' },
      { time: '11:00', end: '12:00', subject: 'Web Technologies', room: 'Lab 3', tone: 'blue' },
      { time: '13:00', end: '15:00', subject: 'Web Technologies Lab', room: 'Lab 3', tone: 'orange' },
    ],
  },
  Thu: {
    date: 'Thursday, 15 October 2026',
    items: [
      { time: '10:00', end: '11:00', subject: 'Theory of Computation', room: 'LT-3', tone: 'orange' },
      { time: '11:15', end: '12:15', subject: 'Data Structures', room: 'LT-2', tone: 'blue' },
      { time: '14:00', end: '16:00', subject: 'OS Lab', room: 'Lab 1', tone: 'purple' },
    ],
  },
  Fri: {
    date: 'Friday, 16 October 2026',
    items: [
      { time: '09:00', end: '10:00', subject: 'Computer Networks', room: 'B-102', tone: 'orange' },
      { time: '10:15', end: '11:15', subject: 'Probability & Statistics', room: 'A-204', tone: 'purple' },
      { time: '12:00', end: '13:00', subject: 'Mentor hour', room: 'Student centre', tone: 'blue' },
    ],
  },
} as const

const weekDays = [
  { key: 'Mon', label: 'Mon 12' },
  { key: 'Tue', label: 'Tue 13' },
  { key: 'Wed', label: 'Wed 14' },
  { key: 'Thu', label: 'Thu 15' },
  { key: 'Fri', label: 'Fri 16' },
] as const

const schedule = schedules.Tue.items

const pranavPhoto = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nsut%20id%20card-TmOqIziDFgfcRFZbCzq93mqXzSNeGw.jpeg'

function Avatar({ initials, color = 'bg-white/10', photo = false }: { initials: string; color?: string; photo?: boolean }) {
  return photo ? <img src={pranavPhoto} alt="Pranav Kumar" className="size-10 shrink-0 rounded-full object-cover object-top" /> : <div className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black ${color}`}>{initials}</div>
}

function Sidebar({ active, onChange, onSignOut }: { active: View; onChange: (view: View) => void; onSignOut: () => void }) {
  return (
    <aside className="hidden w-[238px] shrink-0 border-r border-white/[0.07] px-5 py-6 lg:block">
      <div className="mb-10 flex items-center gap-3 px-2">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-67WjXDKHFHNe0i7JPmqzs2l2y0PBbG.png" alt="Netaji Subhas University of Technology emblem" className="size-9 rounded-full bg-white object-contain" />
        <div><p className="text-sm font-semibold tracking-tight">NSUT Connect</p><p className="text-[11px] text-white/35">Student community</p></div>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Main navigation">
        {navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onChange(id)} className={`nav-item ${active === id ? 'nav-item-active' : ''}`}><Icon data-icon="inline-start" />{label}{id === 'announcements' && <span className="ml-auto size-1.5 rounded-full bg-cyan-300" />}</button>)}
      </nav>
      <div className="mt-10 border-t border-white/[0.07] pt-5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">Your space</p>
        <button onClick={() => onChange('profile')} className={`nav-item ${active === 'profile' ? 'nav-item-active' : ''}`}><UserRound data-icon="inline-start" />My profile</button>
        <button onClick={() => onChange('settings')} className={`nav-item ${active === 'settings' ? 'nav-item-active' : ''}`}><Settings data-icon="inline-start" />Settings</button>
      </div>
      <div className="mt-auto pt-16"><button onClick={onSignOut} className="nav-item text-white/40"><LogIn data-icon="inline-start" />Sign out</button></div>
    </aside>
  )
}

function Topbar({ title, onMenu }: { title: string; onMenu: () => void }) {
  return <header className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8"><div className="flex items-center gap-3"><button className="lg:hidden" onClick={onMenu} aria-label="Open menu"><Menu /></button><div><p className="text-[11px] font-medium uppercase tracking-[0.17em] text-white/35">Sunday, 11 October 2026</p><h1 className="mt-1 text-xl font-semibold tracking-tight">{title}</h1></div></div><div className="flex items-center gap-3"><button className="icon-button" aria-label="Search"><Search /></button><button className="icon-button relative" aria-label="Notifications"><Bell /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-cyan-300" /></button><Avatar initials="PK" color="bg-lime-300" photo /></div></header>
}

function Feed({ onChange }: { onChange: (view: View) => void }) {
  const [filter, setFilter] = useState('For you')
  const [liked, setLiked] = useState<string[]>([])
  const [openReplies, setOpenReplies] = useState<string | null>(null)
  const filters = ['For you', 'Following', 'My batch', 'Campus life']
  const seededReplies: Record<string, string[]> = { 'Atharva Chauhan': ['Yash: I can join after 5:30.'], 'Yash': ['Ishit: I will bring my phone gimbal.', 'Atharva Chauhan: Count me in.'], 'Ishit': ['Pranav Kumar: I will ask around in the academic block.'] }
  const visiblePosts = filter === 'For you' ? posts : posts.filter((post) => filter === 'My batch' ? post.name === 'Atharva Chauhan' : filter === 'Campus life' ? post.tag === 'Clubs & societies' : post.name !== 'Ishit')
  return <div className="mx-auto grid max-w-6xl gap-7 px-5 py-8 sm:px-8 xl:grid-cols-[minmax(0,1fr)_285px]">
    <section><div className="mb-7 flex items-end justify-between"><div><p className="eyebrow">Your campus, one place</p><h2 className="display-title mt-2 text-4xl text-white sm:text-5xl">Good morning, Pranav.</h2><p className="mt-3 max-w-md text-sm leading-6 text-white/40">A quieter way to keep up with the people, rooms and small moments that make NSUT.</p></div><div className="hero-sketch hidden sm:block" aria-hidden="true"><span className="sketch-sun" /><span className="sketch-orbit sketch-orbit-one" /><span className="sketch-orbit sketch-orbit-two" /><span className="sketch-star sketch-star-one">+</span><span className="sketch-star sketch-star-two">·</span></div><button className="button-secondary hidden sm:flex"><PenLine data-icon="inline-start" />New post</button></div>
      <div className="mb-7 flex gap-2 overflow-x-auto pb-1">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`chip ${filter === item ? 'chip-active' : ''}`}>{item}</button>)}</div>
      <div className="feed-signal mb-7 flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3" aria-label="Campus activity update"><span className="signal-dot size-2 shrink-0 rounded-full bg-lime-300" /><Sparkles className="size-4 shrink-0 text-cyan-300" /><p className="min-w-0 truncate text-xs text-white/50"><span className="font-medium text-white/75">Campus pulse</span> · 18 students are looking for study partners right now</p><button onClick={() => setFilter('My batch')} className="ml-auto shrink-0 text-[11px] font-medium text-cyan-300 transition hover:text-white">Join in</button></div>
      <div className="mb-7 grid gap-2 sm:grid-cols-3"><button onClick={() => setFilter('My batch')} className="quick-tile text-left"><span className="text-[10px] uppercase tracking-[0.15em] text-white/30">Your batch</span><span className="mt-1 block text-sm font-medium">MEEV 2030</span></button><button onClick={() => onChange('timetable')} className="quick-tile text-left"><span className="text-[10px] uppercase tracking-[0.15em] text-white/30">Up next</span><span className="mt-1 block text-sm font-medium">Data Structures · 09:00</span></button><button onClick={() => onChange('discussions')} className="quick-tile text-left"><span className="text-[10px] uppercase tracking-[0.15em] text-white/30">Open thread</span><span className="mt-1 block text-sm font-medium">Placement prep</span></button></div>
      <p className="rule-label mb-3">{filter === 'For you' ? 'Latest from the community' : `${filter} posts`}</p><div className="flex flex-col gap-3">{visiblePosts.map((post, index) => { const isLiked = liked.includes(post.name); const replyList = seededReplies[post.name] ?? []; const replyCount = replyList.length; return <article key={post.name} className="surface feed-card p-5" style={{ '--feed-delay': `${index * 90}ms` } as React.CSSProperties}><div className="flex items-start gap-3"><Avatar initials={post.initials} color={post.color} /><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-sm font-semibold">{post.name}</p><span className="text-xs text-white/30">{post.handle}</span><span className="ml-auto text-xs text-white/25">{post.time}</span></div><p className="mt-1 text-[13px] leading-6 text-white/65">{post.body}</p><span className="mt-4 inline-flex rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/45">{post.tag}</span><div className="mt-4 flex items-center gap-5 text-xs text-white/35"><button aria-pressed={isLiked} onClick={() => setLiked((current) => isLiked ? current.filter((name) => name !== post.name) : [...current, post.name])} className={`flex items-center gap-1.5 hover:text-white ${isLiked ? 'text-cyan-300' : ''}`}><Heart fill={isLiked ? 'currentColor' : 'none'} />{post.likes + (isLiked ? 1 : 0)}</button><button onClick={() => setOpenReplies(openReplies === post.name ? null : post.name)} className="flex items-center gap-1.5 hover:text-white"><MessageCircle />{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</button><button className="ml-auto"><MoreHorizontal /></button></div>{openReplies === post.name && <div className="reply-panel mt-4 flex flex-col gap-2 border-t border-white/[0.07] pt-4">{replyList.map((reply) => <p key={reply} className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white/55">{reply}</p>)}</div>}</div></div></article> })}</div></section>
    <aside className="hidden xl:block"><div className="surface p-5"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold">Next on your calender</h3><button onClick={() => onChange('timetable')} className="text-[11px] text-cyan-300">See all</button></div><div className="mt-5 flex flex-col gap-4">{schedule.slice(0, 3).map((item) => <div key={item.subject} className="flex gap-3"><div className="w-11 text-[10px] leading-4 text-white/35">{item.time}<br />{item.end}</div><div className="border-l-2 border-cyan-300 pl-3"><p className="text-xs font-medium">{item.subject}</p><p className="mt-1 text-[10px] text-white/35">{item.room} · Today</p></div></div>)}</div></div><div className="surface mt-4 p-5"><p className="eyebrow">Community pulse</p><div className="mt-3 flex items-end justify-between"><p className="text-3xl font-semibold tracking-[-0.04em]">1,284</p><span className="text-[10px] font-semibold text-lime-300">+12% this week</span></div><p className="mt-1 text-xs text-white/35">students active this week</p><div className="mt-4 h-1 rounded-full bg-white/10"><div className="h-1 w-[68%] rounded-full bg-lime-300" /></div></div></aside>
  </div>
}

function Discussions() {
  const [openTopic, setOpenTopic] = useState<string | null>(null)
  const [reply, setReply] = useState('')
  const [replies, setReplies] = useState<Record<string, string[]>>({ 'DSA prep resources for placements': ['Ananya S.: I added a few LeetCode sheets to the drive.', 'Kunal B.: The Sunday problem-solving group is still open.'] })
  const [topics, setTopics] = useState([['DSA prep resources for placements', 'Ananya S.'], ['Which electives are you taking next sem?', 'Kunal B.'], ['Hostel wifi has been acting weird', 'Devika M.'], ['Societies recruitment megathread', 'NSUT Connect'], ['Good cafes around Dwarka?', 'Ritvik G.']])
  const startDiscussion = () => { const title = window.prompt('What do you want to discuss?'); if (title?.trim()) setTopics((current) => [[title.trim(), 'Pranav Kumar'], ...current]) }
  const sendReply = (title: string) => { if (!reply.trim()) return; setReplies((current) => ({ ...current, [title]: [...(current[title] ?? []), `Pranav Kumar: ${reply.trim()}`] })); setReply('') }
  return <PageFrame eyebrow="Talk it out" title="Discussions" subtitle="Ask questions, share advice, find your people."><div className="mb-6 flex justify-end"><button onClick={startDiscussion} className="button-primary"><PenLine data-icon="inline-start" />Start a discussion</button></div><div className="surface overflow-hidden">{topics.map(([title, author], i) => { const threadReplies = replies[title] ?? []; return <div key={title} className="border-b border-white/[0.07] last:border-0"><button onClick={() => setOpenTopic(openTopic === title ? null : title)} className="discussion-row w-full text-left"><div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] text-xs text-white/40">0{i + 1}</div><div className="min-w-0 flex-1"><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs text-white/35">Started by {author} · {threadReplies.length || (i + 3)} replies</p></div><ChevronRight className={`text-white/25 transition-transform ${openTopic === title ? 'rotate-90' : ''}`} /></button>{openTopic === title && <div className="bg-white/[0.02] px-5 pb-5 pl-[4.5rem]"><div className="flex flex-col gap-2">{threadReplies.length ? threadReplies.map((item) => <p key={item} className="rounded-lg bg-white/[0.04] px-3 py-2 text-xs leading-5 text-white/60">{item}</p>) : <p className="text-xs text-white/35">No replies yet. Start the conversation.</p>}</div><div className="mt-3 flex gap-2"><input value={reply} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendReply(title) }} className="field-input min-w-0 flex-1" placeholder="Write a reply..." /><button onClick={() => sendReply(title)} className="button-secondary">Reply</button></div></div>}</div> })}</div></PageFrame>
}

function Announcements() { return <PageFrame eyebrow="Keep updated" title="Announcments" subtitle="Official updates from the campus, all in one feed."><div className="flex flex-col gap-3">{[['End semester examination dates released', 'Academic section · 2 hours ago', 'The tentative schedule for end semester examinations is now available on the student portal. Please check your course codes carefully.', true], ['Summer internship fair — registrations open', 'Training & Placement · Yesterday', 'Register before 21 March to attend the summer internship fair. Bring your updated resume and college ID.', false], ['Library timings extended during exams', 'Central Library · 3 days ago', 'The library will remain open until 11:30 PM on weekdays through the examination period.', false]].map(([title, meta, body, urgent]) => <article key={title as string} className="surface p-5"><div className="flex gap-4"><div className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg ${urgent ? 'bg-cyan-300 text-black' : 'bg-white/[0.07] text-white/50'}`}><Bell /></div><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold">{title as string}</h3>{urgent && <span className="rounded-full bg-cyan-300/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan-300">New</span>}</div><p className="mt-1 text-[11px] text-white/35">{meta as string}</p><p className="mt-4 max-w-2xl text-[13px] leading-6 text-white/60">{body as string}</p></div></div></article>)}</div></PageFrame> }

function Timetable() {
  const [selectedDay, setSelectedDay] = useState<(typeof weekDays)[number]['key']>('Tue')
  const day = schedules[selectedDay]

  return <PageFrame eyebrow="Plan your week" title="Timetable" subtitle="B.Tech CSE · Semester 4"><div className="mb-5 flex gap-2 overflow-x-auto pb-1">{weekDays.map(({ key, label }) => <button key={key} onClick={() => setSelectedDay(key)} className={`chip whitespace-nowrap ${selectedDay === key ? 'chip-active' : ''}`}>{label}</button>)}</div><div className="surface p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold">{day.date}</p><p className="mt-1 text-xs text-white/35">{day.items.length} classes · {selectedDay === 'Wed' || selectedDay === 'Thu' ? '1 hour break' : '2 hour break'}</p></div><button className="icon-button" aria-label="Open calendar"><CalendarDays /></button></div><div className="flex flex-col">{day.items.map((item) => <div key={`${selectedDay}-${item.subject}`} className="flex min-h-[76px] gap-4 border-t border-white/[0.07] py-4"><div className="w-14 text-[11px] leading-5 text-white/35">{item.time}<br />{item.end}</div><div className={`flex-1 rounded-lg border-l-2 px-4 py-2 ${item.tone === 'blue' ? 'border-cyan-300 bg-cyan-300/[0.06]' : item.tone === 'purple' ? 'border-violet-300 bg-violet-300/[0.06]' : item.tone === 'orange' ? 'border-orange-300 bg-orange-300/[0.06]' : 'border-white/15 bg-white/[0.03]'}`}><p className="text-sm font-medium">{item.subject}</p><p className="mt-1 text-[11px] text-white/35">{item.room} · {item.tone === 'muted' ? 'Rest up' : 'Dr. Sharma'}</p></div></div>)}</div></div></PageFrame>
}

function SettingsPage() {
  const [quiet, setQuiet] = useState(false)
  const [compact, setCompact] = useState(false)
  return <PageFrame eyebrow="Make it yours" title="Settings" subtitle="Small choices for a calmer campus feed."><div className="flex flex-col gap-3"><div className="surface flex items-center justify-between p-5"><div><p className="text-sm font-medium">Quiet notifications</p><p className="mt-1 text-xs text-white/35">Pause announcement and reply alerts.</p></div><button onClick={() => setQuiet(!quiet)} aria-pressed={quiet} className={`h-6 w-11 rounded-full p-1 transition ${quiet ? 'bg-cyan-300' : 'bg-white/10'}`}><span className={`block size-4 rounded-full bg-white transition ${quiet ? 'translate-x-5 bg-black' : ''}`} /></button></div><div className="surface flex items-center justify-between p-5"><div><p className="text-sm font-medium">Compact timetable</p><p className="mt-1 text-xs text-white/35">Show more classes without extra scrolling.</p></div><button onClick={() => setCompact(!compact)} aria-pressed={compact} className={`h-6 w-11 rounded-full p-1 transition ${compact ? 'bg-cyan-300' : 'bg-white/10'}`}><span className={`block size-4 rounded-full bg-white transition ${compact ? 'translate-x-5 bg-black' : ''}`} /></button></div><div className="surface p-5"><p className="text-sm font-medium">Account</p><p className="mt-1 text-xs text-white/35">Pranav Kumar · pranav.k@nsut.ac.in</p><button className="button-secondary mt-4">Manage profile</button></div></div></PageFrame>
}

function Profile() { return <PageFrame eyebrow="Your corner" title="My profile" subtitle="A little about you, for the community."><div className="surface overflow-hidden"><div className="h-28 bg-gradient-to-r from-cyan-300/30 via-violet-300/20 to-transparent" /><div className="px-6 pb-6"><div className="-mt-10 flex items-end justify-between"><Avatar initials="PK" color="bg-lime-300" photo /><button className="button-secondary">Edit profile</button></div><h2 className="mt-4 text-xl font-semibold">Pranav Kumar</h2><p className="mt-1 text-sm text-white/40">@pranav.k · MEEV 2030 batch</p><p className="mt-5 max-w-xl text-sm leading-6 text-white/60">Building things, finding good food around campus, and occasionally surviving operating systems.</p><div className="mt-6 flex gap-7 border-t border-white/[0.07] pt-5 text-xs"><span><b className="text-white">18</b> posts</span><span><b className="text-white">42</b> following</span><span><b className="text-white">126</b> followers</span></div></div></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="surface p-5"><p className="eyebrow">Interests</p><div className="mt-4 flex flex-wrap gap-2"><span className="chip">Web dev</span><span className="chip">Photography</span><span className="chip">Music</span></div></div><div className="surface p-5"><p className="eyebrow">Member since</p><p className="mt-3 text-lg font-semibold">August 2023</p><p className="mt-1 text-xs text-white/35">NSUT Connect early member</p></div></div></PageFrame> }

function PageFrame({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) { return <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8"><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">{title}</h2><p className="mt-2 text-sm text-white/40">{subtitle}</p><div className="mt-8">{children}</div></div> }

function Login({ onLogin }: { onLogin: () => void }) { return <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 py-10"><div className="w-full max-w-[410px]"><div className="mb-10 flex items-center gap-3"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-67WjXDKHFHNe0i7JPmqzs2l2y0PBbG.png" alt="Netaji Subhas University of Technology emblem" className="size-10 rounded-full bg-white object-contain" /><div><p className="font-semibold">NSUT Connect</p><p className="text-xs text-white/35">The student network</p></div></div><div className="surface p-7 sm:p-9"><p className="eyebrow">Welcome back</p><h1 className="mt-3 text-2xl font-semibold">Your campus is waiting.</h1><p className="mt-2 text-sm leading-6 text-white/40">Sign in with your NSUT email to join the converstaion.</p><form onSubmit={(event) => { event.preventDefault(); onLogin() }} className="mt-8 flex flex-col gap-4"><label className="field-label">NSUT email<input className="field-input" type="email" placeholder="you@nsut.ac.in" /></label><label className="field-label">Password<input className="field-input" type="password" placeholder="Enter your password" /></label><button type="submit" className="button-primary mt-2 w-full justify-center">Sign in <ChevronRight data-icon="inline-end" /></button></form><p className="mt-4 text-center text-[11px] text-white/30">Any credentials will work in this preview.</p></div></div></main> }

export default function Page() { const [loggedIn, setLoggedIn] = useState(false); const [active, setActive] = useState<View>('feed'); const [menuOpen, setMenuOpen] = useState(false); if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />; const titles: Record<View, string> = { feed: 'Home feed', discussions: 'Discussions', announcements: 'Announcments', timetable: 'Timetable', profile: 'My profile', settings: 'Settings' }; return <div className="min-h-screen bg-[#050505] text-white"><div className="mx-auto flex min-h-screen max-w-[1440px]"><Sidebar active={active} onChange={setActive} onSignOut={() => setLoggedIn(false)} /><div className="min-w-0 flex-1"><Topbar title={titles[active]} onMenu={() => setMenuOpen(true)} />{menuOpen && <div className="fixed inset-0 z-50 bg-black/80 p-5 lg:hidden"><div className="surface flex h-full max-w-xs flex-col p-5"><div className="mb-8 flex items-center justify-between"><span className="font-semibold">NSUT Connect</span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setActive(id); setMenuOpen(false) }} className={`nav-item ${active === id ? 'nav-item-active' : ''}`}><Icon data-icon="inline-start" />{label}</button>)}<button onClick={() => { setActive('profile'); setMenuOpen(false) }} className="nav-item"><UserRound data-icon="inline-start" />My profile</button></div></div>}{active === 'feed' && <Feed onChange={setActive} />}{active === 'discussions' && <Discussions />}{active === 'announcements' && <Announcements />}{active === 'timetable' && <Timetable />}{active === 'profile' && <Profile />}{active === 'settings' && <SettingsPage />}</div></div></div> }
