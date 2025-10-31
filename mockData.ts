import type { CardData } from './types';

export const mockCardData: CardData[] = [
  {
    id: '1',
    title: 'Identifying Constraints',
    summary: 'The initial and most critical step in system analysis. Constraints define the boundaries and shape all subsequent decisions.',
    fullContent: `The first principle of systems thinking is to start by identifying and defining constraints. These are not merely limitations but the very framework upon which a successful project is built. Constraints can be technical (e.g., legacy systems, chosen technology stack), financial (budget), temporal (deadlines), or even organizational (team skills, company culture).

By defining these parameters upfront, we create an architectural framework that is grounded in reality. This prevents scope creep, aligns stakeholders, and ensures that engineering efforts are focused on viable solutions. Ignoring constraints leads to architectural drift, wasted resources, and solutions that are elegant in theory but impractical in application.`
  },
  {
    id: '2',
    title: 'Architectural Frameworks',
    summary: 'Developing a robust framework based on identified constraints. This structure guides the entire engineering process.',
    fullContent: `An architectural framework is the blueprint derived from the project's constraints. It's not a rigid set of rules but a collection of guiding principles and high-level structures. A good framework promotes consistency, scalability, and maintainability.

Key elements include:
- **Component Boundaries:** Clearly defined responsibilities for each part of the system.
- **Data Flow Patterns:** How information moves through the system.
- **Technology Choices:** Justified selections of libraries, languages, and platforms that serve the constraints.
- **Decision Reasoning:** Documenting *why* decisions were made is as important as the decisions themselves.`
  },
  {
    id: '3',
    title: 'The Power of Types',
    summary: 'Ensuring consistency and reducing errors through a strong typing system. A cornerstone of maintainable code.',
    fullContent: `A well-defined type system is a powerful leverage point. By defining all data structures and interfaces as types, we create a contract that is enforced by the compiler. This has several compounding benefits:

- **Reduces Runtime Errors:** Many potential bugs are caught during development, not in production.
- **Improves Developer Experience:** Autocomplete and static analysis make the codebase easier to navigate and understand.
- **Self-Documenting Code:** Types describe the shape of data, reducing the need for verbose comments.
- **Facilitates Refactoring:** Changes can be made with confidence, as the type checker will flag any inconsistencies.`
  },
  {
    id: '4',
    title: 'Leverage Points',
    summary: 'Finding the points in a system where a small change can lead to a large effect. The essence of strategic engineering.',
    fullContent: `In any complex system, not all parts are created equal. Leverage points are places where a small shift can produce big changes. Identifying them requires a deep understanding of the system's dynamics.

Examples include:
- **A core algorithm:** Optimizing it can have system-wide performance benefits.
- **A central data structure:** Changing it can simplify dozens of functions.
- **The build and deploy pipeline:** Automating it can increase development velocity exponentially.

The goal is not to work harder, but to apply force where it has the most impact, harnessing momentum rather than fighting against it.`
  },
  {
    id: '5',
    title: 'Elegant Simplicity',
    summary: 'The ultimate goal: sophisticated thinking expressed through simple, robust, and maintainable solutions.',
    fullContent: `Complexity is easy to create but hard to manage. Elegant simplicity is the practice of distilling a complex problem down to its essential components and building a solution that is clear, direct, and effective.

This principle manifests in:
- **Minimalism:** Fewer moving parts mean fewer points of failure.
- **Clarity:** The code's intent should be immediately obvious.
- **Composability:** Small, single-purpose components can be combined to create complex behaviors without complex code.

As Antoine de Saint-Exupéry said, "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."`
  },
    // Add 5 more cards to meet the 10 card requirement
  {
    id: '6',
    title: 'Testing Protocols',
    summary: 'A comprehensive testing strategy is not an afterthought but a core part of the design process, ensuring reliability.',
    fullContent: 'A robust testing protocol validates features as they are written. It encompasses unit tests for individual components, integration tests for component interactions, and end-to-end tests that simulate real user workflows. This layered approach builds confidence and catches regressions before they reach users, forming a critical feedback loop in the development cycle.'
  },
  {
    id: '7',
    title: 'Feedback Loops',
    summary: 'Creating tight feedback loops in development, from code compilation to user analytics, to enable rapid iteration.',
    fullContent: 'The speed and quality of feedback loops determine the agility of a project. This includes fast local development servers, automated testing, continuous integration, and production monitoring. The faster a team can see the impact of a change, the faster they can learn and adapt. The goal is to reduce the cycle time from idea to validated learning.'
  },
  {
    id: '8',
    title: 'Asynchronous Communication',
    summary: 'Structuring teams and systems to thrive on asynchronous communication, reducing bottlenecks and increasing autonomy.',
    fullContent: 'In a global, distributed world, relying on synchronous meetings is a major constraint. Designing for asynchronous communication—through clear documentation, well-defined tasks, and empowered teams—allows progress to happen in parallel across time zones. This is as much an organizational architecture principle as it is a technical one.'
  },
  {
    id: '9',
    title: 'State Management',
    summary: 'Consciously choosing a state management strategy that matches the application’s complexity to avoid common pitfalls.',
    fullContent: 'State is the source of much complexity in applications. A deliberate approach to state management is crucial. Whether using local component state, context APIs, or dedicated libraries, the chosen strategy should make state changes predictable and debuggable. The right choice simplifies component logic and improves application stability.'
  },
  {
    id: '10',
    title: 'User-Centric Design',
    summary: 'Ensuring all technical decisions ultimately serve the end-user, creating an intuitive and valuable experience.',
    fullContent: "The most elegant technical architecture is meaningless if it doesn't result in a great user experience. User-centric design principles must be woven into the entire process. This means considering performance, accessibility, and intuitive interfaces from day one. The user's goals are the ultimate context for every line of code written."
  }
];

export const mockReportExcerpt = {
  title: 'Excerpt: The Core Principle of Systemic Deconstruction',
  content: `At the heart of our methodology is a single, guiding principle: to understand a system, one must first deconstruct it to its most fundamental components. We do not reach for solutions; we seek to understand the intricate web of interactions, dependencies, and constraints that define the problem space. It is only through this deep, contextual understanding that the true leverage points—those areas where minimal effort yields maximal impact—reveal themselves. This approach stands in stark contrast to conventional problem-solving, which often treats symptoms rather than addressing the underlying structure. Our focus is on harnessing the inherent momentum of the system, redirecting its forces through precise, strategic interventions rather than opposing them with brute force.`
};

export const mockSystemInstruction = `You are an expert AI assistant for a deep research report on systems thinking and software architecture. Your knowledge base is the provided report content. The core principles are: identifying constraints, creating architectural frameworks from those constraints, using strong typing, finding leverage points, and striving for elegant simplicity. Answer user questions based *only* on this context. Be concise by default, but elaborate when asked.`;

export const mockFullReport = {
    title: 'Full Research Report: Deconstructing Complex Systems',
    // Combine the full content from all cards into a single string
    content: mockCardData.map(card => `### ${card.title}\n\n${card.fullContent}`).join('\n\n---\n\n'),
};