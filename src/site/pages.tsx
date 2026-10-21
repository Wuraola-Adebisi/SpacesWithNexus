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
    body: 'Move and rotate pieces on the floor plan. AI-powered layout suggestions based on your room dimensions, furniture measurements and preferences are in development. The goal is to let you preview proposed positions, review fit issues and decide what works for you.',
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
  ['Technology with a practical purpose', 'Our planner combines a scaled floor plan and basic fit checks, with AI-powered layout suggestions in development. The goal is to help people explore options, not make decisions for them. Any future proposal will be something to review and refine.'],
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
        <p>Spaces with Nexus was created to make that process more considered. We bring room measurements and furniture planning together, with AI-powered layout suggestions in development, so people can explore ideas for their actual space before committing time and effort to moving things around.</p>
        <p>We believe good tools should make complex decisions easier to approach, while keeping people in control. Our planner turns dimensions into a scaled floor plan and helps identify basic fit issues. We’re working toward AI-generated alternatives based on room dimensions, furniture measurements and user preferences. These suggestions will be starting points to review, not instructions to follow blindly.</p>
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
  ['AI layout suggestions', 'AI layout suggestions are not connected yet. When this feature becomes available, the room dimensions, furniture details and positions, and the goal you enter will be sent to the layout service and its AI provider to generate a proposal. Do not include sensitive or personal information in your goal text.'],
  ['Printed or saved copies', 'If you choose Print / Save PDF, your browser or operating system handles printing or creating the PDF. Spaces with Nexus does not upload that PDF. You control where you save it and who can access it.'],
  ['Accounts and service providers', 'The planner can be used without creating an account. The service is hosted by third-party providers, which may process technical data under their own privacy policies.'],
]

export function Privacy() {
  return (
    <main>
      <PageHead title="Your plan, handled with care">
        Learn what Spaces with Nexus stores in your browser and what information will be shared when AI layout suggestions become available.
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

const examples = [
  { number: '01', starter: 'small-bedroom', title: 'Make a small bedroom feel less cramped', situation: 'Your bed, wardrobe and desk all compete for the same floor space.', approach: 'Measure the room, add the furniture you already own, then try moving pieces around on a scaled plan before doing the heavy lifting.', takeaway: 'See where the room may feel more open and where the furniture could fit.', image: 'https://images.unsplash.com/photo-1718111990329-cfe23a502e06?auto=format&fit=crop&w=1200&q=80', imageAlt: 'A calm, carefully arranged bedroom with a bed and natural light', credit: 'Lawless Capture', creditUrl: 'https://unsplash.com/photos/a-bedroom-with-a-bed-and-a-window-teoPtsozZf8' },
  { number: '02', starter: 'desk-fit', title: 'Check whether that new desk will fit', situation: 'You have found a desk you like, but you are not sure there is room for it.', approach: 'Enter the desk measurements alongside your existing furniture and see how the pieces sit within the room.', takeaway: 'Make a more informed decision before you buy or bring it home.', image: 'https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59?auto=format&fit=crop&w=1200&q=80', imageAlt: 'A home office workspace with a laptop, monitor and wooden desk', credit: 'Max Andrey', creditUrl: 'https://unsplash.com/photos/home-office-workspace-with-wooden-desk-TlRQin0iwjE' },
  { number: '03', starter: 'moving-day', title: 'Plan a move before moving day', situation: 'You are moving into a new place and trying to work out what can go where.', approach: 'Start with the new room dimensions, add the bigger furniture, and explore a few possible arrangements.', takeaway: 'Arrive with a plan instead of figuring everything out while carrying boxes.', image: 'https://images.unsplash.com/photo-1560185009-5bf9f2849488?auto=format&fit=crop&w=1200&q=80', imageAlt: 'A welcoming living room with furniture arranged around the available space', credit: 'Francesca Tosolini', creditUrl: 'https://unsplash.com/photos/interior-of-a-living-room-XyGvEj587Mc' },
  { number: '04', starter: 'work-from-home', title: 'Make room for working from home', situation: 'Your room needs to handle work and everyday life without feeling like an office all the time.', approach: 'Try different positions for a desk, chair and storage, keeping the room’s actual size in mind.', takeaway: 'Explore options for fitting work into the space you already have.', image: 'https://images.unsplash.com/photo-1787112824729-f9328fe55661?auto=format&fit=crop&w=1200&q=80', imageAlt: 'A sunlit home office desk with a computer monitor, notebooks and a desk lamp', credit: 'Huy Phan', creditUrl: 'https://unsplash.com/photos/home-office-desk-with-computer-monitor-j6Xhy6Zr9mQ' },
]

export function Examples() {
  return (
    <main className="examples-page">
      <PageHead title="Real rooms. Real-life decisions.">
        You do not need to be an interior designer to make a room work better. Start with your measurements, explore furniture arrangements, and look ahead to AI-powered suggestions tailored to your space and goals.
      </PageHead>
      <section className="wrap examples-intro">
        <p className="eyebrow">A few ways to use the planner</p>
        <h2>Start with the thing you are trying to figure out.</h2>
      </section>
      <section className="wrap examples-grid">
        {examples.map((item) => (
          <article className="example-card" key={item.number}>
            <figure className="example-photo">
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
              <figcaption>Photo by <a href={item.creditUrl} target="_blank" rel="noreferrer">{item.credit}</a> on Unsplash</figcaption>
            </figure>
            <div className="example-card-top"><span>{item.number}</span><span>ROOM PLANNING</span></div>
            <h2>{item.title}</h2>
            <div className="example-detail"><h3>The situation</h3><p>{item.situation}</p></div>
            <div className="example-detail"><h3>Try this</h3><p>{item.approach}</p></div>
            <div className="example-takeaway"><strong>What you get</strong><p>{item.takeaway}</p></div>
            <Link to={`/workspace?starter=${item.starter}`} className="text-link">Open this starter floor plan</Link>
          </article>
        ))}
      </section>
      <section className="wrap examples-note">
        <p><strong>A useful note:</strong> the planner works from the measurements you enter. Measure carefully, and check doors, windows, walking space and other details in the actual room before committing to an arrangement.</p>
      </section>
      <CtaBand title="Your room does not need to be perfect to get started." />
    </main>
  )
}

const termsSections = [
  ['Using the planner', 'Spaces with Nexus helps you explore room dimensions, furniture placement and possible layouts. You may use it for personal, non-commercial room-planning purposes, subject to these terms and applicable law. You are responsible for the information you enter and for how you use the results.'],
  ['Measurements and real-world decisions', 'The floor plan and fit checks are planning aids, not a guarantee that furniture will fit or that a layout is safe or practical in the physical room. Measurements, product dimensions, doors, windows, sockets, access routes, ceiling height and other conditions may affect the result. Measure and verify important details yourself before buying, lifting, installing or moving anything.'],
  ['AI-assisted suggestions', 'If you request an AI-assisted layout, the details you provide may be processed by our layout service and its AI provider to generate a proposal. Suggestions can be incomplete, inaccurate or unsuitable for your room. Review them carefully; they are optional ideas, not professional interior-design, architectural, engineering or safety advice. Do not rely on them as the sole basis for a purchase or physical change.'],
  ['Plans and your responsibility', 'Plans you save are stored in your browser on the device you use. You are responsible for keeping your own copies of important plans. Clearing browser data, changing browsers or using another device may make saved plans unavailable. Do not enter confidential or sensitive information into the planner or an AI prompt.'],
  ['Acceptable use', 'Do not misuse the service, attempt to disrupt its operation, bypass security, interfere with other users, introduce malicious code, or use the service unlawfully. We may restrict access where reasonably necessary to protect the service or its users.'],
  ['Ownership and service availability', 'Spaces with Nexus and its original site content, branding and software are protected by applicable intellectual-property laws. These terms do not transfer ownership of them to you. We may change, suspend or discontinue features as the service develops, and we do not guarantee uninterrupted availability or that every feature will always work on every device.'],
  ['Disclaimers and liability', 'The service is provided on an “as available” basis to the extent permitted by law. We do not warrant that layouts, measurements, fit checks or AI suggestions will be error-free or suitable for every situation. To the extent permitted by applicable law, Spaces with Nexus is not liable for indirect or consequential loss, or for loss or damage arising from reliance on an unverified layout. Nothing in these terms excludes liability that cannot lawfully be excluded.'],
  ['Third-party services', 'The website may rely on hosting, analytics or AI providers. Those providers may have their own terms and privacy practices. Our handling of information is explained in the Privacy page.'],
  ['Changes to these terms', 'We may update these terms as the service changes. The “Last updated” date indicates when the current version was published. Your continued use of the service after an update means you accept the updated terms, to the extent permitted by law.'],
  ['Contact', 'Questions about these terms can be sent to contact@spaceswithnexus.com.'],
]

export function Terms() {
  return (
    <main>
      <PageHead title="Terms of Service">
        The terms for using Spaces with Nexus. Please read them before relying on a plan or layout suggestion.
      </PageHead>
      <section className="wrap policy">
        <p className="fine-print">Last updated: 20 October 2026</p>
        {termsSections.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export function Contact() {
  return (
    <main className="contact-page">
      <PageHead title="Tell us what you are trying to make room for.">
        Have a question, an idea, or a room that is proving difficult to arrange? We would like to hear what you are working on.
      </PageHead>
      <section className="wrap contact-grid">
        <div className="contact-panel contact-panel-primary">
          <p className="eyebrow">Start with the room</p>
          <h2>Sometimes the easiest way to explain it is to try it.</h2>
          <p>Open the planner, add your room measurements and furniture, and explore a layout. You can also use the contact link to send a note or question.</p>
          <Link to="/workspace" className="btn btn-primary">Open the room planner</Link>
        </div>
        <div className="contact-panel">
          <p className="eyebrow">Get in touch</p>
          <h2>Questions and feedback</h2>
          <p>We welcome feedback about the planning experience, ideas for making it more useful, and questions about how it works.</p>
          <a className="contact-email" href="mailto:contact@spaceswithnexus.com">contact@spaceswithnexus.com</a>
          <p className="contact-small">For the quickest help, include what you were trying to do and what happened.</p>
        </div>
      </section>
      <CtaBand title="Let’s make room for a better plan." />
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
