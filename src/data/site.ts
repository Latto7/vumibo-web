export const SITE = {
  name: 'Vumibo',
  title: 'Vumibo – Rescue Crew Songs & Cartoons for Kids',
  description:
    'Fire trucks, police cars and big rescue fun for toddlers! Sing along with Vumi, Bo and the Vumibo Rescue Crew – happy songs and cartoons for kids ages 2–6.',
  links: {
    youtube: 'https://www.youtube.com/channel/UClx9QxuQbyoYbKJOToljRtA',
    subscribe: 'https://www.youtube.com/channel/UClx9QxuQbyoYbKJOToljRtA?sub_confirmation=1',
    spotify: 'https://open.spotify.com/artist/1qFq1q4TS9dYdPTwxnOgWo',
    apple: 'https://music.apple.com/us/artist/vumibo/6817935520',
    instagram: 'https://www.instagram.com/vumibotv',
    tiktok: 'https://www.tiktok.com/@vumibotv',
  },
  nav: [
    { href: '/episodes/', label: 'Episodes' },
    { href: '/crew/', label: 'Meet the Crew' },
    { href: '/music/', label: 'Songs' },
    { href: '/parents/', label: 'Parents' },
  ],
};

export type Crew = {
  slug: string;
  name: string;
  role: string;
  color: 'red' | 'pink' | 'blue' | 'orange' | 'yellow';
  say: string;
  sound: string;
  img: { src: string; w: number; h: number };
  short: string;
  about: string;
  facts: string[];
};

export const CREW: Crew[] = [
  {
    slug: 'ruby', name: 'Ruby', role: 'The Fire Truck', color: 'red', say: 'Ruby to the rescue!', sound: 'ruby_rescue',
    img: { src: '/img/ruby.webp', w: 752, h: 643 },
    short: 'Brave team leader with a ladder that reaches the sky.',
    about: 'Ruby is the bright red fire truck who leads the Vumibo Rescue Crew. When something is stuck up high, Ruby raises her long ladder – “Up, up, up!” – and brings it safely back down. She is brave, cheerful and always first out of the garage.',
    facts: ['Color: red', 'Special tool: a ladder that goes up, up, up', 'Favorite sound: “Nee-naw!”'],
  },
  {
    slug: 'ambie', name: 'Ambie', role: 'The Ambulance', color: 'pink', say: 'All better!', sound: 'ambie_better',
    img: { src: '/img/ambie.webp', w: 767, h: 682 },
    short: 'Kind and caring – she fixes every bump with a heart bandage.',
    about: 'Ambie is the gentle white ambulance with a big pink heart. She checks on everyone after a rescue, puts heart bandages on little bumps and makes sure every friend feels “all better!”.',
    facts: ['Color: white with pink', 'Special tool: heart bandages', 'Favorite word: “All better!”'],
  },
  {
    slug: 'siro', name: 'Siro', role: 'The Police Car', color: 'blue', say: 'Safety first!', sound: 'siro_safety',
    img: { src: '/img/siro.webp', w: 768, h: 709 },
    short: 'Keeps everyone safe and always knows the rules of the road.',
    about: 'Siro is the friendly blue police car who keeps the toy town safe. He puts out cones, stops the traffic politely and reminds everyone: “Safety first!”. Siro teaches little ones to stop, look and take turns.',
    facts: ['Color: blue', 'Special tool: traffic cones', 'Favorite rule: “Safety first!”'],
  },
  {
    slug: 'tuggy', name: 'Tuggy', role: 'The Tow Truck', color: 'orange', say: 'Ho ho ho! I got it!', sound: 'tuggy_laugh',
    img: { src: '/img/tuggy.webp', w: 755, h: 695 },
    short: 'Super strong, a little clumsy and always ready to pull.',
    about: 'Tuggy is the big orange tow truck with a hook and a hearty laugh. He is super strong – “Heave… ho!” – and can pull out anything that gets stuck. Sometimes clumsy, always kind.',
    facts: ['Color: orange', 'Special tool: a crane and hook', 'Favorite sound: “Heave… ho!”'],
  },
  {
    slug: 'diggo', name: 'Diggo', role: 'The Digger', color: 'yellow', say: 'Dig, dig, dig!', sound: 'diggo_dig',
    img: { src: '/img/diggo.webp', w: 733, h: 760 },
    short: 'The funniest friend in town – he can lift anything.',
    about: 'Diggo is the cheeky yellow digger who loves a joke. With his big bucket he lifts blocks, moves sand and clears the way. When a job is done he giggles: “Easy peasy!”.',
    facts: ['Color: yellow', 'Special tool: a big bucket', 'Favorite words: “Easy peasy!”'],
  },
];

export const KIDS = [
  { name: 'Vumi', img: { src: '/img/vumi.webp', w: 632, h: 1288 }, color: 'yellow', sound: 'vumi_go', text: 'The leader. She presses the big red button: “Vumibo Rescue, GO!”' },
  { name: 'Bo', img: { src: '/img/bo.webp', w: 631, h: 1272 }, color: 'blue', sound: 'bo_giggle', text: 'Curious, giggly and a tiny bit clumsy – adventures start with Bo.' },
];

export type Episode = {
  slug: string; no: number; title: string; youtubeId: string; date: string; duration: string;
  thumb: string; summary: string; learn: string[]; chapters: [string, string][];
};

export const EPISODES: Episode[] = [
  {
    slug: 'meet-the-rescue-crew', no: 1, title: 'Meet the Rescue Crew!', youtubeId: 'Xn7thyWNC-o', date: '2026-10-17', duration: 'PT3M58S',
    thumb: '/img/thumb_ep1.webp',
    summary: 'Oh no – Bo’s ball knocked over the block tower! Vumi presses the big red button: “Vumibo Rescue, GO!” Ruby, Ambie, Siro, Tuggy and Diggo roll out to save the day – and everyone counts to five together.',
    learn: ['Colors', 'Counting 1–5', 'Safety first', 'Teamwork'],
    chapters: [
      ['0:00', 'Vumibo Intro'], ['0:07', 'Vumibo Rescue Crew Song'], ['0:43', 'Ruby the Fire Truck'], ['0:56', 'Ambie the Ambulance'],
      ['1:09', 'Siro the Police Car'], ['1:22', 'Tuggy the Tow Truck'], ['1:35', 'Diggo the Digger'], ['1:48', 'Oh no! The tower falls down'],
      ['2:05', 'Vumibo Rescue, GO!'], ['2:20', 'Safety first with Siro'], ['2:29', 'Ruby’s ladder rescue'], ['2:40', 'Diggo lifts the block'],
      ['2:50', 'Tuggy pulls the ball out'], ['3:03', 'Ambie makes it all better'], ['3:13', 'Count with us: 1, 2, 3, 4, 5!'], ['3:23', 'Yay! We did it!'],
    ],
  },
];
