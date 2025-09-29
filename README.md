# AI Talent Marketplace on ICP

A decentralized platform connecting AI professionals with companies using the Internet Computer Protocol (ICP), featuring on-chain profiles, smart contract engagements, and AI-powered matching.

![ICP Blockchain](https://img.shields.io/badge/Blockchain-Internet_Computer_Protocol-blue)
![Motoko](https://img.shields.io/badge/Smart_Contracts-Motoko-orange)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)

## Features

- **On-Chain Profiles**  
  Talent and company profiles stored securely on ICP blockchain
- **AI Matching Engine**  
  Algorithm matching skills to project requirements
- **Smart Contract Escrow**  
  Secure milestone-based payments
- **Internet Identity**  
  Passwordless authentication using Web3 identity
- **Decentralized Storage**  
  All data stored on-chain via ICP canisters

## Tech Stack

| Component          | Technology |
|--------------------|------------|
| Blockchain         | Internet Computer Protocol (ICP) |
| Smart Contracts   | Motoko |
| Frontend          | React + TypeScript |
| Authentication    | Internet Identity |
| CI/CD             | GitHub Actions |

## Project Structure
ai-talent-marketplace/
├── src/
│ ├── ai_engine/ # Matching algorithm canister
│ ├── backend/ # Core canisters (profiles, projects, contracts)
│ └── frontend/ # React frontend application
├── dfx.json # DFX configuration
├── .gitignore
└── README.md


## Getting Started

### Prerequisites
- [DFX SDK](https://smartcontracts.org/docs/current/developer-docs/setup/install/)
- Node.js ≥16
- GitHub account

### Installation
```bash
# Clone repository
git clone https://github.com/raza-khan0108/ai-talent-marketplace.git
cd ai-talent-marketplace

# Install dependencies
npm install

# Start local ICP network
dfx start --background

# Deploy canisters
dfx deploy

# Start frontend
cd src/frontend
npm start
