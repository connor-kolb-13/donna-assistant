# Donna AI Assistant: Project Scope

## 🔑 Vision & Purpose

**Inspiration:** The assistant is modeled after _Donna Paulsen_ from the TV series _Suits_. The goal is to build an always-available, highly capable AI assistant that handles tasks, decisions, and communication with the same confidence, memory, and intuition as the character.

**Core Idea:** Create a personal and business assistant powered by GPT and n8n, deployed as a mobile app (initially iOS), that users can chat with via text or voice and use for scheduling, reminders, file processing, and smart decision support.

---

## 🌎 Target Audience

- Busy professionals looking to delegate daily admin
- Entrepreneurs and small teams needing better workflow automation
- Long-term: general users seeking a smarter, more intuitive assistant

---

## 🚀 Product Summary

### MVP Features:

- Chat interface with GPT-4 and memory
- Secure login with Firebase Auth
- Natural language scheduling → Outlook Calendar
- Smart reminders
- File uploads (PDF, DOCX, images)
- Memory module for facts, preferences, and event history
- Voice input using Whisper (optional)
- Admin UI to update resource files
- Push notifications

### Stretch Goals:

- Team collaboration mode (shared memory)
- API integrations with CRMs (e.g., HubSpot)
- Web dashboard
- Multi-turn voice dialog
- Fitness & habit tracking

### Key Use Cases:

- "Schedule lunch tomorrow at noon"
- "Remind me to call Peter Wednesday at 3pm"
- "Summarize this uploaded meeting note"
- "What tasks are overdue?"
- "What are the steps for a customer refund?"

---

## 🤖 Assistant Behaviors

- Personal/business context switching
- Quote recognition from Donna (Suits) for tone, branding
- Self-aware prompts: knows current date/time and pulls from calendar/memory
- Memory logging in Notion or Google Sheets
- Intent classification via GPT

---

## ⚖️ Technical Architecture

### Backend (n8n)

- Hosted via n8n Cloud (ckolb13.app.n8n.cloud)
- Main webhook router with GPT-connected nodes
- Calendar event creation via Outlook
- Date parser using custom logic + timezone adjustments
- Intent router (create event, get agenda, update memory, fallback)
- Memory via Google Sheets or Notion

### Frontend (iOS React Native App)

- Built with Expo + TypeScript
- EAS Build system for iOS deployment
- Firebase Auth with persistent session via AsyncStorage
- UI:

  - Avatar (Donna)
  - Login form
  - Chat screen (text input, chat bubbles, hyperlink support)
  - Intro message if no chat yet
  - Loading indicator while processing

### Hosting / DevOps

- Expo.dev: project ID `largie13/donna-assistant`
- Firebase: Project `donna-assistant-b9ce3`
- Porkbun domain: `askdonna.app`
- Google Workspace: `dev@askdonna.app`
- Apple Developer account: Under verification ([dev@askdonna.app](mailto:dev@askdonna.app))

---

## 📅 Timeline: Key Phases

### Phase 1: Infrastructure Setup ✅

- Domain purchased + DNS configured (Porkbun)
- Workspace email active (Google)
- Firebase project + Auth setup
- n8n webhook + Outlook flows live

### Phase 2: App MVP ✅

- Login, chat, GPT integration working
- Firebase Auth working in Expo (initializeAuth fallback logic)
- Test build with EAS initiated

### Phase 3: Backend Logic Finalization

- Clean up date parser
- Expand routing logic
- Connect Whisper for voice input
- Add basic memory logging in Sheets/Notion

### Phase 4: Polish + Push to TestFlight

- Sign and release first .ipa
- Add logout, animation, and secure storage to auth
- Improve error handling and fallback responses

### Phase 5: Beyond MVP

- Reminder loop flows
- Voice-first mode
- Branding enhancements (quotes/personality)
- Admin resource upload

---

## 🔗 System URLs

- [n8n Webhook Router](https://ckolb13.app.n8n.cloud/webhook/donna/router)
- [Expo Dashboard](https://expo.dev/accounts/largie13/projects/donna-assistant)
- [Firebase Console](https://console.firebase.google.com/project/donna-assistant-b9ce3)
- [App Store Connect](https://appstoreconnect.apple.com/) (pending access)
- [Porkbun Account](https://porkbun.com/account)
- [Google Admin Console](https://admin.google.com)

---

## 📆 Final Notes

This assistant is intended to become a trusted digital partner. From scheduling to memory, Donna should _feel_ like an intuitive extension of the user. The system must be proactive, brand-aligned, context-aware, and constantly improving.

This document should be versioned and updated as features roll out.
