import { Link } from '../router'
import { CtaBand } from './Layout'

function PageHead({ title, children }: { title: string; children: string }) {
  return (
    <header className="wrap page-head">
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  )
}

const steps = [
  {
    title: 'Start with your room',
    body: 'Enter the width and length of your space in centimetres. A measured starting point helps you make decisions based on the room you have, not an idealised picture.',
  },
  {
    title: 'Add the furniture',
    body: 'Choose the pieces you want to arrange, then update their names and dimensions to match your own furniture. For the most useful plan, measure each piece before placing it.',
  },
  {
    title: 'Explore a better arrangement',
    body: 'Move and rotate pieces on the floor plan, or describe what you want to change and request an AI-assisted layout proposal. Preview the positions, review flagged fit issues, and decide what to use.',
  },
  {
    title: 'Refine your plan',
    body: 'Adjust the layout until it reflects your intentions. Save your plan in your browser or print a copy to refer to while you make changes in the room.',
  },
]

export function HowItWorks() {
  return (
    <main>
      <PageHead title="A clearer plan for your space">
        From the first measurement to the final arrangement, Spaces with Nexus helps you think through your room before you start moving furniture.
      </PageHead>
      <section className="wrap">
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-no" aria-hidden="true">{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <div className="spacer" />
      <CtaBand title="A little planning can change the whole room." />
    </main>
  )
}

const principles = [
  ['Designed around real spaces', 'Useful room planning starts with the dimensions of the room and the furniture that needs to live in it. Spaces with Nexus is built around those practical details, helping people move from vague ideas to layouts they can evaluate.'],
  ['Clarity before commitment', 'Whether you are refreshing a room, making space for work, or deciding where a new piece of furniture might go, planning ahead can make the next step more deliberate. We want the process to feel approachable without losing sight of the measurements that matter.'],
  ['Technology with a practical purpose', 'Our planner combines a scaled floor plan and basic fit checks with AI-assisted layout ideas. The technology is there to help people explore options, not to make the decision for them. Every proposed arrangement remains something to review and refine.'],
  ['Built to keep improving', 'We are developing Spaces with Nexus around a straightforward belief: planning a space should be easier to understand and more useful in everyday life. We continue to refine the experience around the real decisions people face when arranging a room.'],
]

export function About() {
  return (
    <main>
      <PageHead title="A more thoughtful way to make space">
        Spaces with Nexus is building practical tools that help people make more confident decisions about the spaces they live and work in.
      </PageHead>
      <section className="wrap prose">
        <p>Our homes and workspaces have to do a lot. A room might need to make space for rest, work, storage, guests, or a new piece of furniture, often without changing its dimensions. Working out what fits can quickly become a frustrating cycle of guesswork, moving things, and starting again.</p>
        <p>Spaces with Nexus was created to make that process more considered. We bring room measurements, furniture planning, and AI-assisted layout exploration into one place, so people can test ideas against their actual space before committing time and effort to moving things around.</p>
        <p>We believe good tools should make complex decisions easier to approach, while keeping people in control. Our planner turns dimensions into a scaled floor plan, helps identify basic fit issues, and can suggest alternative arrangements based on the room, the furniture, and the goal. Those suggestions are starting points to review, not instructions to follow blindly.</p>
        <p>Our focus is practical: make room planning clearer, more accessible, and more useful in everyday life. We are building Spaces with Nexus with that purpose in mind, and improving the experience as we learn what helps people plan their spaces with greater confidence.</p>
      </section>
      <section className="wrap gaps">
        <h2>What guides our work</h2>
        <dl>
          {principles.map(([term, text]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <CtaBand title="Start with your room. Explore what could work." />
    </main>
  )
}

const privacy = [
  ['Saved plans', 'When you save a plan, room dimensions and furniture positions are stored in this browser. They are not attached to an account or automatically sent to Spaces with Nexus. Clearing this browser’s site data can remove saved plans.'],
  ['AI layout suggestions', 'When you request a layout suggestion, the room dimensions, furniture details and positions, and the goal you enter are sent to the layout service. The service sends that information to its AI provider to generate a proposal. Do not include sensitive or personal information in your goal text.'],
  ['Printed or saved copies', 'If you choose Print / Save PDF, your browser or operating system handles printing or creating the PDF. Spaces with Nexus does not upload that PDF. You control where you save it and who can access it.'],
  ['Accounts and service providers', 'The planner can be used without creating an account. The service is hosted by third-party providers, which may process technical data under their own privacy policies.'],
]

export function Privacy() {
  return (
    <main>
      <PageHead title="Your plan, handled with care">
        Learn what Spaces with Nexus stores in your browser and what is shared when you request an AI layout suggestion.
      </PageHead>
      <section className="wrap policy">
        {privacy.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export function NotFound() {
  return (
    <main>
      <PageHead title="We couldn’t find that page">
        Check the address or return to Spaces with Nexus to plan your room.
      </PageHead>
      <section className="wrap">
        <Link to="/" className="btn btn-dark">Back to Spaces with Nexus</Link>
      </section>
    </main>
  )
}
