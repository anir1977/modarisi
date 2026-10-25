// English, 2nd year bac (all tracks share the national exam format: Reading, Language, Writing).
// Focus on grammar, functions and writing skills tested in the exam. Written for modarisi.ma.
import type { SciLesson } from "./types";

const TR = "All tracks · 2nd year bac";

export const EN_LESSONS: SciLesson[] = [
  {
    slug: "conditionals-and-wishes",
    subject: "en",
    order: 1,
    part: "Grammar",
    title: "Conditionals, wish and regret",
    tracks: TR,
    intro: "Conditional sentences and the structures of wish and regret appear in almost every national exam, usually as 'rewrite' or 'put the verbs in the right tense' tasks.",
    sections: [
      {
        heading: "The conditionals",
        body: `| Type | If-clause | Main clause | Use |
|---|---|---|---|
| Zero | present simple | present simple | general truths |
| First | present simple | will + verb | real / possible future |
| Second | past simple | would + verb | unreal present |
| Third | past perfect | would have + past participle | unreal past |

- *If you heat ice, it melts.* · *If I study, I will pass.* · *If I were rich, I would travel.* · *If she had revised, she would have passed.*
- **Unless** = if … not: *Unless you work hard, you won't succeed.*`,
      },
      {
        heading: "Wish and regret",
        body: `- Present wish: **wish + past simple** — *I wish I had more time.*
- Past regret: **wish / if only + past perfect** — *I wish I had listened to my teacher.*
- Complaint about others: **wish + would** — *I wish he would stop talking.*
- **Should have + past participle** for past regret / criticism: *I should have studied harder.*`,
      },
    ],
    method: ["In a rewrite task, keep the meaning: 'I didn't revise, so I failed' → 'If I had revised, I wouldn't have failed.' Note the change of positive/negative."],
  },
  {
    slug: "passive-voice",
    subject: "en",
    order: 2,
    part: "Grammar",
    title: "The passive voice",
    tracks: TR,
    intro: "We use the passive when the action matters more than who does it. Form: be (in the right tense) + past participle.",
    sections: [
      {
        heading: "Form in each tense",
        body: `| Tense | Active | Passive |
|---|---|---|
| Present simple | They **build** houses | Houses **are built** |
| Past simple | They **built** a school | A school **was built** |
| Present perfect | They **have built** a road | A road **has been built** |
| Future | They **will build** a bridge | A bridge **will be built** |
| Modal | They **must finish** it | It **must be finished** |
| Continuous | They **are building** it | It **is being built** |`,
      },
      {
        heading: "Rules",
        body: `- The object of the active sentence becomes the subject.
- Add **by + agent** only when it is important.
- Impersonal passive: *People say that…* → *It is said that…* / *He is said to be…*`,
      },
    ],
  },
  {
    slug: "reported-speech",
    subject: "en",
    order: 3,
    part: "Grammar",
    title: "Reported speech",
    tracks: TR,
    intro: "Reported (indirect) speech reports what someone said. When the reporting verb is in the past, tenses usually move one step back.",
    sections: [
      {
        heading: "Tense and word changes",
        body: `| Direct | Reported |
|---|---|
| present simple | past simple |
| present continuous | past continuous |
| past simple / present perfect | past perfect |
| will | would |
| can / may | could / might |
| now / today / tomorrow | then / that day / the next day |
| here / this | there / that |`,
      },
      {
        heading: "Statements, questions and orders",
        body: `- Statement: *"I am tired," she said.* → *She said (that) she was tired.*
- Yes/No question: *"Do you like it?"* → *He asked me **if/whether** I liked it.*
- Wh- question: *"Where do you live?"* → *She asked me where I lived.* (no inversion)
- Order / request: *"Close the door."* → *He told me **to close** the door.* · *"Don't shout."* → *He told us **not to** shout.*`,
      },
    ],
  },
  {
    slug: "relative-clauses-and-linking-words",
    subject: "en",
    order: 4,
    part: "Grammar",
    title: "Relative clauses and linking words",
    tracks: TR,
    intro: "Relative pronouns join sentences about the same noun; linking words connect ideas and are tested in both the Language and Writing sections.",
    sections: [
      {
        heading: "Relative pronouns",
        body: `- **who** (people), **which** (things), **that** (people/things in defining clauses), **whose** (possession), **where** (place), **when** (time).
- *The teacher **who** helped me retired.* · *The city **where** I was born is small.* · *The girl **whose** bag was stolen called the police.*
- Non-defining clauses use commas and never *that*: *Rabat, **which** is the capital, is clean.*`,
      },
      {
        heading: "Linking words",
        body: `| Meaning | Linkers |
|---|---|
| Addition | moreover, furthermore, in addition, besides |
| Contrast | however, but, although, though, despite / in spite of (+ noun/-ing), whereas |
| Cause | because (+ clause), because of / due to (+ noun), since, as |
| Result | so, therefore, thus, as a result, consequently |
| Purpose | to, in order to, so that |
| Concession | although + clause, despite + noun |`,
      },
    ],
    method: ["'Although' is followed by a clause (subject + verb); 'despite/in spite of' by a noun or -ing: Although it rained, we went out = Despite the rain, we went out."],
  },
  {
    slug: "gerund-infinitive-and-modals",
    subject: "en",
    order: 5,
    part: "Grammar",
    title: "Gerund or infinitive, and modals",
    tracks: TR,
    intro: "Some verbs are followed by -ing, others by to + verb; modals express ability, obligation, advice, possibility and deduction.",
    sections: [
      {
        heading: "Gerund or infinitive",
        body: `- **+ -ing**: enjoy, avoid, mind, finish, suggest, keep, look forward to, be used to, after prepositions.
- **+ to + verb**: want, decide, hope, plan, refuse, promise, manage, would like.
- Meaning changes: *stop smoking* (quit) / *stop to smoke* (pause in order to); *remember doing* (past) / *remember to do* (task).`,
      },
      {
        heading: "Modals",
        body: `| Function | Modals |
|---|---|
| Obligation | must, have to |
| Absence of obligation | don't have to, needn't |
| Prohibition | mustn't |
| Advice | should, ought to, had better |
| Possibility | may, might, could |
| Deduction (present) | must (certain), can't (impossible) |
| Deduction (past) | must have / can't have + past participle |`,
      },
    ],
  },
  {
    slug: "functions",
    subject: "en",
    order: 6,
    part: "Functions",
    title: "Communicative functions",
    tracks: TR,
    intro: "In the Language section, you identify or write the function of a sentence (advice, apology, agreement…). Learn the typical expressions and the matching responses.",
    sections: [
      {
        heading: "Most frequent functions",
        body: `| Function | Expressions |
|---|---|
| Asking for / giving advice | What should I do? · You'd better… · If I were you, I would… · Why don't you…? |
| Expressing opinion | I think… · In my opinion… · As far as I'm concerned… |
| Agreeing / disagreeing | I totally agree · That's true · I'm afraid I disagree · I see your point, but… |
| Apologizing / responding | I'm sorry for… · Please forgive me · Never mind · That's all right |
| Making / responding to suggestions | Let's… · How about + -ing? · Good idea! · I'd rather not |
| Expressing regret | I wish I had… · If only… · I should have… |
| Complaining | I'm not satisfied with… · I'd like to complain about… |
| Expressing purpose | to… · in order to… · so that… |`,
      },
    ],
  },
  {
    slug: "vocabulary-by-unit",
    subject: "en",
    order: 7,
    part: "Vocabulary",
    title: "Key vocabulary of the 2nd-year units",
    tracks: TR,
    intro: "The reading text and vocabulary questions come from the themes studied during the year. Learn word families and collocations for each theme.",
    sections: [
      {
        heading: "Themes and core words",
        body: `- **Formal / informal education**: curriculum, tuition, literacy, illiteracy, drop out, lifelong learning, scholarship.
- **Sustainable development**: renewable energy, poverty, drought, deforestation, NGO, illiteracy rate, life expectancy.
- **Women and power**: gender equality, discrimination, empowerment, rights, workforce.
- **Cultural values**: customs, traditions, generosity, hospitality, culture shock, values.
- **Science and technology**: invention, discovery, device, breakthrough, artificial intelligence, research.
- **International organizations**: UN, UNESCO, WHO, UNICEF, humanitarian aid, volunteer work.
- **Brain drain**: emigrate, skilled workers, qualified, opportunities, salary, homesickness.
- **Citizenship**: civic engagement, responsibility, volunteering, rights and duties.`,
      },
      {
        heading: "Word formation",
        body: `- Noun suffixes: -tion (educate → education), -ment (develop → development), -ness (kind → kindness), -ity (able → ability).
- Adjective suffixes: -ful, -less, -able, -ous, -al. Negative prefixes: un-, in-, im-, dis-, ir-.`,
      },
    ],
  },
  {
    slug: "writing-paragraph-email",
    subject: "en",
    order: 8,
    part: "Writing",
    title: "Writing: paragraphs, emails and essays",
    tracks: TR,
    intro: "The writing section asks for a paragraph, an email/letter or an argumentative essay on one of the year's themes. Organisation and clear linking matter as much as grammar.",
    sections: [
      {
        heading: "The paragraph / essay structure",
        body: `1. **Topic sentence** (or introduction): states the main idea clearly.
2. **Supporting sentences**: 2–3 reasons or examples, each linked (*Firstly… Moreover… For instance…*).
3. **Concluding sentence**: sums up or gives your opinion (*To sum up… In conclusion…*).`,
      },
      {
        heading: "Informal email / letter",
        body: `- Opening: *Dear Sara,* / *Hi Karim,* — first line: *How are you? I hope you're fine.*
- Body: purpose of the email + details.
- Closing: *Looking forward to hearing from you. Best wishes / Love,* + your name.
- For a **formal** letter: *Dear Sir/Madam,* … *I am writing to…* … *Yours faithfully,*`,
      },
      {
        heading: "Checklist before you hand in",
        body: `- Did I answer exactly what the task asks (type of text, length, points to include)?
- Did I vary linking words and tenses correctly?
- Did I check spelling, capital letters and subject–verb agreement (*he goes*, *people are*)?`,
      },
    ],
  },
];
