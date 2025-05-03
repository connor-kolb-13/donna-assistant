# 📘 Project Log: Donna AI Assistant

---

## 🔹 Project Origin

- **Inspiration:** Modeled after _Donna_ from _Suits_ — a confident, connected, and indispensable assistant.
- **Long-Term Vision:** Scalable to millions of users; supports personal + business workflows (e.g., scheduling, reminders, decisions, brand-aligned interaction).
- **Primary Branding:** `askdonna.app`

---

## ✅ First Week Summary

### 🧩 Infrastructure Setup

#### 🔧 Domain & DNS

- **Registrar:** Porkbun
- **Domain Registered:** `askdonna.app` (May 2, 2025)
- **DNS Records Configured:**
  - ✅ TXT (Google Workspace verification)
  - ✅ MX (Gmail via Google SMTP)
  - ✅ ALIAS and CNAME for default resolution
- **WHOIS Privacy:** Enabled by default

#### 📨 Email & Workspace

- **Google Workspace Admin:** `dev@askdonna.app`
- Display name updated to "Donna Assistant"
- MX records verified
- Gmail active and functional
- Workspace trial started (1 user to minimize cost)

---

### 🍎 Apple Developer Account

#### 🔐 Apple ID

- Created: `dev@askdonna.app`
- Phone number conflict resolved via Apple Support
- Identity set to "Donna Assistant"

#### 🧾 Enrollment

- Reached payment screen
- Awaiting activation of App Store Connect
- Will finalize EAS signing once Apple confirms

---

### 🧱 Codebase (React Native + Expo)

#### 🔨 Features Implemented

- `index.tsx`: Core chat UI, login/signup logic, GPT webhook integration
- `LoginForm.tsx`: Reusable auth UI component
- Avatar support (`DonnaAssistantAnime.png`)
- Hyperlink parsing and auto-link handling
- "Processing..." loading indicator

#### 🔐 Firebase Auth

- Firebase project: `donna-assistant-b9ce3`
- `initializeAuth()` with `AsyncStorage` for native apps
- Fallback to `getAuth()` for Expo Go
- `onAuthStateChanged()` handles auth state

---

### ⚙️ EAS Build System

#### 🛠 Expo Integration

- Expo Account: `largie13`
- EAS Project: `largie13/donna-assistant`
- Linked project ID: `409252c6-61da-4518-ad0d-5d190c3315d7`
- `eas.json`: Initialized with development profile

#### 📦 Build Process

- Initiated with `eas build -p ios --profile development`
- Bundle ID: `com.largie13.donnaassistant`
- Skipped signing until Apple Developer is finalized

---

### 🌐 Routing & GPT Integration

- **Webhook Endpoint:** `https://ckolb13.app.n8n.cloud/webhook/donna/router`
- **LLM Responses:** Handled via `fetch` → message → UI render
- Handles:
  - User prompts
  - Donna responses
  - Server error fallback

---

## 🔗 System Links

| Tool / Service         | URL                                                         |
| ---------------------- | ----------------------------------------------------------- |
| Expo Project Dashboard | https://expo.dev/accounts/largie13/projects/donna-assistant |
| App Store Connect      | https://appstoreconnect.apple.com (pending)                 |
| Firebase Console       | https://console.firebase.google.com                         |
| Google Admin Console   | https://admin.google.com                                    |
| Porkbun DNS Dashboard  | https://porkbun.com/account                                 |

---

## 📋 Technical Decisions

- **Email Structure:** All infrastructure tied to `dev@askdonna.app`
- **Domain Choice:** `.app` for brand trust + HTTPS enforcement
- **Expo EAS:** OTA updates + scalable iOS builds
- **Firebase:** Fast login/auth flow + expandable backend
- **LLM via n8n:** Frontend decoupling, future logic routing enabled

---

## 📈 Friday (May 2) Summary

### 🔧 Infra & Config

- Domain registered, Gmail activated
- Google Workspace display name → “Donna Assistant”
- DNS setup fully verified

### 🍎 Apple Dev Setup

- Apple ID: `dev@askdonna.app`
- Support call resolved phone # reuse
- Apple Developer flow stopped at payment/verification

### 💻 Codebase & Firebase

- `firebaseConfig.ts` finalized with `Auth` typing and fallbacks
- All code warnings fixed (tsconfig, aliasing, etc.)

### 🛠️ EAS Prep

- Project linked and ready
- First iOS build initiated
- Skipped signing pending Apple access
