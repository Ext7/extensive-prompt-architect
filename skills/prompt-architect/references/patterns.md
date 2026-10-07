# Prompt patterns

Choose by the work the next model must perform, not by keywords. Patterns can combine. Use only the steps that serve the user's goal, and preserve any stronger constraints in the user's input.

## Generic task

State the outcome, supplied context, inputs, sequence of concrete actions, deliverables, format, boundaries, and checks. Replace vague verbs such as “analyze deeply” with observable methods and outputs. If important context is absent, put a labeled assumption or placeholder in the prompt.

## Research and comparisons

Define questions, scope, time period, comparison criteria, source quality, and the form of the synthesis. Ask the target to separate sourced findings, inference, and uncertainty; cite evidence where sources are available; flag contradictions and information gaps. For recommendations, connect each option to the user's decision criteria rather than producing a generic list.

## Coding and software engineering

Specify the existing repository or starting point, behavior to add or fix, constraints, affected interfaces, expected artifacts, and smallest meaningful verification. Instruct the target to inspect relevant project instructions and current code before editing. For a bug, require a reproducible symptom and a causal fix. For a new feature, require a usable implementation and tests or checks proportionate to the change. Do not invent filenames, APIs, library versions, or passing test results.

## Agent and MCP design

Define the agent's goal, authority, inputs, available tools, decision points, state, output, and stopping conditions. Identify trust boundaries between user instructions, tool results, retrieved pages, and uploaded material. Specify how the agent handles failed tools, missing permissions, ambiguous requests, and human approval for consequential actions. If MCP or function calling matters, ask for tool schemas and current official compatibility only when the user is asking to build or integrate it.

## Automation and n8n

Model the path as trigger → input normalization → optional speech-to-text → AI processing → structured parsing → validation → output formatting → Telegram/API response → logging → errors → tests, omitting unused stages. For implementation prompts, request current node names or equivalents, expressions, data schemas, credentials strategy, idempotency or retries where relevant, failure branches, and a test with sample input and expected output. Do not demand credentials in the prompt.

## Data analysis

Inventory datasets, columns, units, dates, missing values, duplicates, and definitions. Specify segmentation and calculations relevant to the question, plus checks for outliers and data quality. Ask for reproducible tables or charts with denominators and time windows. Distinguish observed association from causal claims. For a business analysis, connect metric changes to known events only when evidence supports it.

## Content and marketing

Define audience, channel, intent, angle, voice, source claims, length or format, and deliverables. For a series, request a coherent sequence rather than unrelated posts. Require factual claims to be supported or marked for verification. Match the user's language and audience; do not invent testimonials, results, pricing, or brand facts.

## Document analysis

Inventory the actual documents, state the question and comparison dimensions, and require citations to supplied passages, pages, or sections when available. Separate direct quotations, summary, inference, and unanswered questions. For legal, medical, or financial topics, ask the target to avoid unsupported conclusions and verify current authoritative sources when needed. If a document is unreadable, name it and continue with the rest without implying full coverage.

## Complex multi-source synthesis

For projects, courses, or businesses with heterogeneous material, instruct the target to: (1) inventory sources and coverage; (2) normalize names and entities; (3) build a timeline when timestamps exist; (4) map relationships among sources; (5) cluster feedback or issues; (6) quantify patterns where data supports it; (7) distinguish correlation from causation; (8) surface conflicting evidence; (9) identify gaps; (10) tie recommendations to evidence; and (11) produce prioritized implementation artifacts. Do not merely say “analyze all files.”

## Course redesign

Relevant sources can include old and new curricula, lesson descriptions, landing pages, advertising posts, sales logs and dates, videos, publication dates, forms, pre- and post-course feedback, GetCourse comments, and Notion documents. Request ingestion and normalization, lesson mapping, feedback clusters, praise/problem mapping, temporal and sales/content analysis where data allows, curriculum gap analysis, and a redesign. Possible deliverables: revised syllabus; keep/add/remove/merge table; lesson backlog; landing-page and copy map; content and advertising plans; validation plan. Do not require every artifact when the user's scope is narrower.

## Video production

For a transcript-based production plan, preserve the original sequence and cover every meaningful passage. Group tiny fragments logically without dropping content. A useful table may contain `Short Phrase | Animation | B-roll | Engagement Insert`. Keep the short phrase around 4–6 words only when the user requests that size, and leave columns blank when the user wants to fill them manually. Distinguish ideas for visuals from facts established by the transcript.

## Product specification

Define the user problem, users, key flows, first-version scope, requirements, non-goals, edge states, constraints, measurable acceptance criteria, and validation plan. Separate agreed requirements from assumptions or options. For a design/build handoff, specify deliverables for each role and avoid claiming an implementation exists. When the user asks for a detailed implementation blueprint across multiple subsystems, use the separate [technical blueprint guide](technical-blueprints.md) instead of stopping at this product-level summary.
