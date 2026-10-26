# Athlete Directory: Verified Registry & Marketplace for the Sports Industry

A verified registry and marketplace prototype for the sports industry in Qatar, featuring three end-to-end interactive flows across both client and provider perspectives:

1. **Flow A (B2B Facility Tender)**: A sports club or facility developer defines facility specifications, reviews illustrative cost models, and tenders packages to verified infrastructure suppliers.
2. **Flow B (Club Coach Recruitment)**: A sports club posts youth coaching vacancies, reviews candidates with verified coaching licenses, and extends contracts.
3. **Flow C (Private Coach Booking)**: A parent discovers verified private coaches for their child, books a trial session, and reviews booking confirmations.

## Sample Data Notice
All data, club names, supplier profiles, coach records, pricing estimates, specifications, and credentials in this prototype are **Sample data** designed for demonstration purposes only. All financial figures are illustrative estimates, not quotations.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

### Building for Production
```bash
npm run build
```

## Configuration & API Keys
No API key or external service credential is required to run this prototype. All features, workflows, and state interactions are self-contained.

## Data Model

The platform target data model is unified around generalized **Request / Response** pairs. Demand-side items across business, individual, and youth athletics workflows all represent structured requests with requirements and deadlines, while supply-side actions represent fulfillment responses with pricing, proposals, or credentials.

Existing prototype interfaces map directly to the unified model:
- `SupplierRequestItem` &rarr; `Request` (type: `'tender'`)
- `Vacancy` &rarr; `Request` (type: `'vacancy'`)
- `SessionRequest` &rarr; `Request` (type: `'session'`)
- `SupplierBid` &rarr; `Response` (type: `'bid'` or `'quote'`)
- `CoachApplication` &rarr; `Response` (type: `'application'`)

Accepted responses formalize into an `Agreement` tracking execution milestones and delivery steps.

