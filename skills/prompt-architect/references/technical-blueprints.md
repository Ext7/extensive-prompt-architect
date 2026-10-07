# Deep technical blueprints

Use this guide when the user requests a detailed technical specification or end-to-end development plan for a complex product or integration. The generated output is still a prompt for the target assistant unless the user explicitly asks for the specification itself. Aim for enough detail that product, backend, frontend, data, QA, and operations teams can each identify their work. Expand the relevant parts; omit genuinely irrelevant parts and avoid padding or fabricated facts.

## Reconstruct the full operating cycle

Turn the short request into a sequence from inputs and business decisions through calculation, approval, external actions, physical or human operations, monitoring, reconciliation, and closure. Name the actors and the handoffs. Identify what is automatic, what needs permission, and what remains manual. Do not stop at the three actions mentioned in the user's sentence if those actions cannot work without surrounding stages.

## Demand concrete design artifacts

For each important subsystem, have the target model specify its inputs, outputs, business rules or algorithm, state changes, failure behavior, audit trail, and acceptance checks. Consider separate artifacts for:

- Domain model and terminology, including distinctions that are easy to conflate.
- External capabilities: current official documentation, exact operations and constraints **only after verification**, permissions, limits, and manual fallbacks for unavailable APIs.
- Source inventory, data ownership, sync cadence, history, freshness, quality checks, and provenance.
- Calculations and optimization: definitions, formulas, constraints, objective or scoring functions, pseudocode when useful, worked numerical examples, sensitivity and edge cases.
- Operational flow: state diagram, permitted transitions, retries, timeouts, concurrency, idempotency, duplicate prevention, reconciliation after ambiguous results, human intervention.
- Architecture and ownership of components; internal API or event contracts with example payloads when useful; database tables, keys, indexes and history; background jobs and their triggers.
- UI screens and user decisions, including explanations of automated recommendations, exceptional states, notifications, and settings precedence.
- Security, access, secrets, tenant isolation if applicable, observability, audit and recovery.
- Incremental release plan, dependencies, exclusions, acceptance criteria, scenario matrix, prioritized backlog, risks and unresolved questions.

For a large design, request explicit tables, JSON examples, formulas, pseudocode, and Mermaid state or sequence diagrams where they clarify implementation. An output outline should give these items their own sections when they are substantial. Do not substitute a long list of nouns for the mechanics of how the system works.

For an **explicitly exhaustive** brief, use a detailed section map rather than a 10-part summary. As applicable, separate: goals and full workflow; verified external capabilities; domain entities; data sources and history; core calculations; allocation of scarce resources; physical packaging or fulfillment; draft/transaction creation; reservation or booking; watchers and rescheduling; state machine; automation modes and safeguards; duplicate prevention; recalculation events; settings inheritance; UI; explanation trace; backend components; jobs; internal APIs and payloads; database tables and constraints; error taxonomy; reconciliation; audit; notifications; metrics; edge cases; tenants; security; staged MVP; prioritized backlog; unknowns; worked example; final quality checklist. For a marketplace supply system, these are often distinct deliverables. For other domains, replace them with analogous subsystems rather than copying irrelevant headings. In each section, identify the decisions, calculations, interfaces, failures or examples the target model must actually produce.

## Preserve and propagate revisions

When the user adds a new cross-cutting constraint to an existing prompt, produce the complete revised prompt. Retain still-valid requirements, examples, guardrails, and deliverables. Thread the new concern through the end-to-end flow, domain entities, data model, calculations or eligibility, state machine, API integration, physical or human workflow, UI, errors, security, audit, tests, release plan, and backlog wherever it affects them. Do not merely append a standalone section or return a change summary. Check for contradictions introduced by the revision and update worked examples accordingly.

## Depth check before returning

Ask: Could a competent team use the generated prompt to obtain *how the whole process should work* rather than only *what features exist*? Are the hardest algorithms and failure states specified as work to be performed? Are external claims explicitly contingent on current source verification? Are assumptions, unknowns, and acceptance checks visible? If the prompt collapses several needed artifacts into one vague line, expand it before returning. Length is a consequence of coverage, not a target.
