# sentinel-docs — scope.md

## Purpose
Public documentation, developer portal, and trust-transparency site. Publishes the verification methodology and trust-score rubric (the credibility behind certification), the SDK/API reference, and buyer/developer guides.

## In scope
- Buyer guides: discover → connect (URL/widget/API/MCP/npx/A2A) → pay with credits → outcomes/disputes.
- Developer guides: install SDK → build → local verify → publish → get paid.
- SDK + CLI reference (Python + TS) and manifest schema reference.
- Trust section (flagship): pipeline stages, finding categories, versioned trust-score rubric + weights, cert tiers, continuous re-verification, dispute feedback.
- Pricing/settlement docs: take rates, credits, escrow, bonds/slashing, payout schedule.
- Security: isolation model, responsible disclosure / bug bounty, data handling.
- Compliance: data residency, GDPR/DPDP, EU AI Act transparency notes, SOC 2 status.
- API reference auto-generated from OpenAPI; changelog/RFCs; status link.

## Out of scope
- Exploitable detail (red-team prompts, specific bypasses).
- Marketing-only content masquerading as methodology.
- Any service logic.

## Interfaces
- Sources: sentinel-shared (OpenAPI/schemas), verify (rubric, versioned), sdk (reference), billing (pricing/policy), status page.

## Success criteria
- Published rubric version matches what verify actually runs (CI cross-check).
- No broken links; API reference auto-regenerated on schema change.
- Developer can go from zero to published agent following docs alone.

## Dependencies / blockers
- verify rubric versioning; sentinel-shared OpenAPI; SDK reference output.
