# SEVA SPHERE

> **Fairer opportunities. Trusted services. Stronger cooperatives.**

A cooperative-owned digital service marketplace connecting consumers with verified skilled workers associated with Labour Cooperative Federations / Labour Cooperative Societies through an intelligent and fair job allocation engine.

---

## 📌 Problem Statement

1. **Predatory Aggregator Commissions:** Commercial gig platforms (Urban Company, TaskRabbit, etc.) extract 20% to 35% commission margins from unorganized blue-collar workers.
2. **Algorithmic Monopolization ("Winner-Takes-All"):** Dispatch algorithms on standard gig apps exclusively reward the top 5% of workers with highest ratings and nearest proximity. Newer, returning, or slightly farther workers are starved of work, resulting in burnout for some and unemployment for others.
3. **Lack of Social Security:** Commercial platforms classify workers as independent contractors without collective bargaining, welfare reserves, or health safety nets.

---

## 💡 Solution: The Cooperative Digital Marketplace

**SEVA SPHERE** transitions digital service platforms from corporate extraction to **Worker-Owned Labour Cooperative Federations**:
- **Cooperative Ownership:** 90% direct payout to workers; 10% stays within the Federation's collective accident insurance, tools, and pension fund.
- **Fair Job Allocation Engine:** Replaces ruthless nearest/highest-rating dispatch with an ethical multi-factor allocation formula that balances equity, proximity, and quality.
- **Federation Verification:** All service partners are registered, verified members of certified Labour Cooperative Societies.
- **Multilingual AI Access:** Natural language understanding in English and Hindi for barrier-free access.

---

## ⚙️ Core Differentiator: Fair Job Allocation Engine

The engine is implemented in `src/utils/allocation.ts` as a pure, deterministic mathematical algorithm:

### 1. Strict Eligibility Filter
A worker is eligible if and only if:
- `worker.skill === requestedService`
- `worker.verified === true`
- `worker.available === true`
- `worker.distance <= maxRadius` (default: 10.0 km)

### 2. Multi-Factor Mathematical Scoring
$$\text{Fairness Score} = \frac{1}{1 + \text{recentJobs}}$$
$$\text{Distance Score} = \max\left(0, \min\left(1, 1 - \frac{\text{distance}}{\text{maxRadius}}\right)\right)$$
$$\text{Rating Score} = \frac{\text{rating}}{5.0}$$

$$\text{Final Score} = 0.40 \times \text{Fairness} + 0.30 \times \text{Distance} + 0.30 \times \text{Rating}$$

> *Note: These are prototype weights designed to balance equity without compromising quality.*

### 3. Intelligent Tie-Breaker
When composite scores are tied within $\pm 0.005$, the tie is broken by:
1. Lower recent workload (`recentJobs`)
2. Closer proximity (`distance`)

### 4. Underutilized Worker Boost
Workers with zero or low recent jobs naturally receive a high fairness score (+40% weighting), ensuring equitable distribution of livelihoods across the cooperative roster.

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS & Glassmorphism design tokens
- **Routing:** React Router v6
- **Icons:** Lucide React
- **State Management:** React Context API with LocalStorage synchronization

---

## 🚀 How to Run the Project

### Prerequisites
Node.js (v18+ or v20+) and npm.

### Quick Start
```bash
# 1. Navigate to the project directory
cd seva-sphere

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎬 End-to-End Demo Story

1. **Landing & Role Gateway:**
   - Open `http://localhost:5173/` or `/role-selection`
   - Select **Customer**
2. **Customer Service Request:**
   - Enter: `"I need an electrician to repair my ceiling fan."` (or click the quick demo preset button in the bottom demo bar)
   - View the AI understanding breakdown (Service: Electrician, Task: Ceiling Fan Repair, Urgency: Normal)
3. **Fair Job Allocation Screen:**
   - Click "Analyze Request & Match"
   - Inspect the live Fair Job Allocation score breakdown table and explainability callouts
   - Click **[Assign Worker]** (Raj Kumar is dynamically selected with his composite score)
4. **Synchronized Worker Flow:**
   - Click **Worker** in the navbar or demo bar
   - Worker Raj Kumar sees the incoming job alert with customer distance and tariff
   - Click **[Accept Job]** $\to$ status transitions to "Job Accepted"
   - Click **[Start Service]** $\to$ status transitions to "Service In Progress"
   - Click **[Complete Job]** $\to$ status transitions to "Service Completed"
5. **Customer Payment & Review:**
   - Switch back to **Customer**
   - Live status reflects "Service Completed"
   - Click **[Simulate Secure Payment]** (90% to worker: ₹405, 10% to cooperative fund: ₹45)
   - Submit 5-star rating and written review
6. **Cooperative Governance Audit:**
   - Switch to **Cooperative** dashboard
   - View live workload distribution bars across members
   - Toggle verification or online availability for any member to witness instant state updates

---

## ⚠️ Prototype Limitations & Transparency

- **Simulated Payment Gateway:** Payment flows are simulated with direct ledger calculation (no live Razorpay/Stripe API).
- **Simulated Location / GPS:** Distances (e.g. 1.2 km, 2.1 km) are pre-calculated demo coordinates centered around Bilaspur, Chhattisgarh.
- **Local Rule-Based Parser:** Intent parsing uses high-speed local regex/taxonomy dictionaries rather than external commercial LLM APIs.
- **Identity & Verification:** Aadhaar e-KYC and police verification statuses are mock flags representing planned integrations with state cooperative registries and e-Shram.
