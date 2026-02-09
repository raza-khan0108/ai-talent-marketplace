
# 🚀 AI Talent Marketplace on Internet Computer (ICP)

A **fully decentralized AI talent marketplace** built on the **Internet Computer Protocol (ICP)** that connects AI professionals with companies through **on-chain profiles, smart contract–based engagements, escrow payments, and AI-powered talent matching**.

This platform removes intermediaries, ensures transparency, and enables trustless hiring using blockchain-native primitives.

---

## 🔗 Tech Badges

- **Blockchain:** Internet Computer Protocol (ICP)
- **Smart Contracts:** Motoko
- **Frontend:** React + TypeScript
- **Auth:** Internet Identity
- **CI/CD:** GitHub Actions

---

## ✨ Key Features

### 🔐 On-Chain Profiles
- Immutable talent and company profiles stored in ICP canisters  
- Verifiable skills, experience, and reputation

### 🤖 AI Matching Engine
- Matches project requirements with talent skill vectors  
- Optimized for relevance, experience, and availability

### 💰 Smart Contract Escrow
- Milestone-based payments using canister-controlled escrow  
- Funds released only after milestone approval

### 🪪 Internet Identity Authentication
- Passwordless Web3 login using Internet Identity  
- Secure, decentralized authentication

### 🌐 Fully Decentralized Storage
- All data stored on-chain via ICP canisters  
- No centralized backend or database

---

## 🧱 Architecture Overview

```
User (Browser)
   |
   | Internet Identity
   v
React Frontend (TypeScript)
   |
   | Canister Calls (HTTP / AgentJS)
   v
ICP Canisters (Motoko)
   ├── Profiles Canister
   ├── Projects Canister
   ├── Escrow / Payments Canister
   └── AI Matching Engine Canister
```

---

## 🛠️ Tech Stack

| Layer            | Technology |
|------------------|------------|
| Blockchain       | Internet Computer Protocol (ICP) |
| Smart Contracts  | Motoko |
| Frontend         | React + TypeScript |
| Authentication   | Internet Identity |
| AI Logic         | On-chain matching canister |
| CI/CD            | GitHub Actions |

---

## 📁 Project Structure

```
ai-talent-marketplace/
│
├── src/
│   ├── ai_engine/        # AI matching algorithm canister
│   ├── backend/          # Core Motoko canisters (profiles, projects, escrow)
│   └── frontend/         # React frontend application
│
├── dfx.json              # DFX configuration
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- **DFX SDK**  
  https://smartcontracts.org/docs/current/developer-docs/setup/install/
- **Node.js** ≥ 16  
- **Git**
- **GitHub account**

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/raza-khan0108/ai-talent-marketplace.git
cd ai-talent-marketplace
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Local ICP Network
```bash
dfx start --background
```

### 4️⃣ Deploy Canisters
```bash
dfx deploy
```

### 5️⃣ Start Frontend
```bash
cd src/frontend
npm install
npm start
```

Frontend will be available at:
```
http://localhost:3000
```

---

## 🔍 Example Use Cases

- Hire AI engineers securely with escrow-backed contracts  
- Freelancers showcase verified on-chain profiles  
- DAOs sourcing AI talent without intermediaries  
- Transparent milestone-based project execution  

---

## 🧠 Future Enhancements

- Reputation scoring system  
- DAO-based dispute resolution  
- Tokenized incentives for talent  
- Multi-chain interoperability  
- Advanced ML-based recommendation engine  

---

## 🧪 Testing

```bash
dfx test
```

---

## 📜 License

MIT License

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests.

---

## 👤 Author

**Raza Khan**  
- GitHub: https://github.com/raza-khan0108

---

⭐ If you find this project useful, give it a star!
