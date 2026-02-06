# Oralix Documentation

> AI-Powered Language Coach for English Practice with Urdu Explanations

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [User Types & Roles](#user-types--roles)
5. [Features](#features)
6. [Database Schema](#database-schema)
7. [Application Routes](#application-routes)
8. [Component Library](#component-library)
9. [Design System](#design-system)
10. [AI Integration](#ai-integration)
11. [Setup & Installation](#setup--installation)
12. [API Reference](#api-reference)
13. [Security Considerations](#security-considerations)
14. [Future Roadmap](#future-roadmap)

---

## Project Overview

### What is Oralix?

Oralix is an AI-powered language coaching platform designed to help Urdu speakers practice and improve their English speaking skills. The application provides a judgment-free conversational environment where users can practice speaking English, with detailed feedback and corrections explained in their native Urdu language.

### Mission

To democratize English language learning for Urdu speakers by providing an accessible, AI-driven practice environment that feels like speaking with a patient, understanding tutor.

### Key Value Propositions

- **Native Language Explanations**: All grammar corrections and feedback are provided in Urdu
- **Judgment-Free Practice**: Conversational AI that never interrupts or criticizes during practice
- **Separated Feedback**: Corrections are only shown after the conversation ends
- **Progress Tracking**: Comprehensive analytics to measure improvement over time
- **B2B Ready**: Institute portal for language schools to manage students

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | Latest | Type Safety |
| Vite | Latest | Build Tool & Dev Server |
| Tailwind CSS | Latest | Utility-First Styling |
| Framer Motion | 12.28.1 | Animations & Transitions |
| React Router DOM | 6.30.1 | Client-Side Routing |
| TanStack React Query | 5.83.0 | Server State Management |

### UI Component Library

| Library | Purpose |
|---------|---------|
| shadcn/ui | Base Component System |
| Radix UI | Accessible Primitives |
| Lucide React | Icon Library |
| class-variance-authority | Component Variants |
| tailwind-merge | Class Merging |

### Backend (Planned)

| Technology | Purpose |
|------------|---------|
| PostgreSQL | Relational Database |
| Supabase | Backend-as-a-Service (Auth, DB, Storage) |
| Edge Functions | Serverless API Endpoints |

### AI Services (Planned)

| Service | Purpose |
|---------|---------|
| OpenAI GPT-4 | Conversational AI |
| Whisper API | Speech-to-Text |
| Web Speech API | Browser-based STT Fallback |

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (React SPA)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │   Context/State     │  │
│  │  - Landing  │  │  - UI       │  │  - AppContext       │  │
│  │  - Login    │  │  - Layout   │  │  - User State       │  │
│  │  - Convo    │  │  - Feedback │  │  - Session Data     │  │
│  │  - Feedback │  │  - Convo    │  │  - Preferences      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE BACKEND                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Auth      │  │  Database   │  │   Edge Functions    │  │
│  │  - Email    │  │  - Users    │  │  - AI Processing    │  │
│  │  - OAuth    │  │  - Convos   │  │  - Speech Analysis  │  │
│  │  - Session  │  │  - Mistakes │  │  - Feedback Gen     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  OpenAI     │  │   Stripe    │  │   Analytics         │  │
│  │  GPT-4      │  │  Payments   │  │   Tracking          │  │
│  │  Whisper    │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Speech → Web Speech API / Whisper → Text Transcript
                                              │
                                              ▼
                                    AI Conversation Engine
                                              │
                                              ▼
                                    AI Response (Text + Audio)
                                              │
                                              ▼
                                    Session Ends
                                              │
                                              ▼
                              Teacher Mode Analysis (GPT-4)
                                              │
                                              ▼
                              Feedback with Urdu Explanations
```

---

## User Types & Roles

### B2C Users (Individual Learners)

| Role | Description | Permissions |
|------|-------------|-------------|
| Free User | Basic access with daily limits | 5 min/day, basic feedback, no history |
| Pro User | Full access subscriber | Unlimited practice, full history, all features |
| Annual User | Pro with yearly subscription | Pro features + early access |

### B2B Users (Institutes)

| Role | Description | Permissions |
|------|-------------|-------------|
| Institute Admin | Language school administrator | Full dashboard, student management, branding |
| Institute Teacher | Instructor at institute | View student progress, assign exercises |
| Institute Student | Enrolled student | Practice with institute branding, tracked progress |

### System Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| Super Admin | Platform administrator | Full system access, institute management |
| Support | Customer support staff | View user data, resolve issues |

---

## Features

### Core Features

#### 1. Conversational Practice
- Real-time voice conversations with AI
- Natural, judgment-free speaking environment
- Visual audio waveform feedback
- Transcript display during conversation

#### 2. Post-Session Feedback
- Overall score calculation (0-100)
- Mistake categorization:
  - Grammar errors
  - Vocabulary issues
  - Pronunciation problems
  - Sentence structure mistakes
- Urdu explanations for each mistake
- Personalized improvement tips

#### 3. Progress Tracking
- Session history with scores
- Streak tracking (consecutive days)
- Total practice time
- Mistake trend analysis

### Premium Features

#### Pro Tier
- Unlimited speaking time
- Complete session history
- Priority AI responses
- All correction types
- Progress analytics

#### Annual Tier
- Everything in Pro
- 2 months free (33% savings)
- Early access to new features
- German language (coming soon)

### B2B Features

#### Institute Dashboard
- Student enrollment management
- Progress reporting and analytics
- Custom branding (logo, colors)
- Bulk user import
- Usage statistics

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  institutes │       │    users    │       │ user_roles  │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ institute_id│       │ id (PK)     │
│ name        │       │ id (PK)     │◄──────│ user_id(FK) │
│ subdomain   │       │ email       │       │ role        │
│ branding    │       │ full_name   │       └─────────────┘
│ settings    │       │ base_lang   │
└─────────────┘       │ target_lang │
                      │ goal        │
                      └─────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     conversations                        │
├─────────────────────────────────────────────────────────┤
│ id (PK) │ user_id (FK) │ started_at │ ended_at │ topic │
└─────────────────────────────────────────────────────────┘
        │                                      │
        ▼                                      ▼
┌─────────────────┐                   ┌─────────────────┐
│    messages     │                   │    feedback     │
├─────────────────┤                   ├─────────────────┤
│ id (PK)         │                   │ id (PK)         │
│ conversation_id │                   │ conversation_id │
│ role            │                   │ overall_score   │
│ content         │                   │ tips            │
│ audio_url       │                   │ created_at      │
│ timestamp       │                   └─────────────────┘
└─────────────────┘                           │
                                              ▼
                                    ┌─────────────────┐
                                    │    mistakes     │
                                    ├─────────────────┤
                                    │ id (PK)         │
                                    │ feedback_id     │
                                    │ incorrect_text  │
                                    │ correct_text    │
                                    │ explanation_en  │
                                    │ explanation_ur  │
                                    │ type            │
                                    └─────────────────┘
```

### Full Schema SQL

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'institute_admin', 'institute_teacher');
CREATE TYPE public.mistake_type AS ENUM ('grammar', 'vocabulary', 'pronunciation', 'sentence-structure');
CREATE TYPE public.subscription_tier AS ENUM ('free', 'pro', 'annual');

-- Institutes (B2B)
CREATE TABLE public.institutes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE,
    logo_url TEXT,
    primary_color VARCHAR(7) DEFAULT '#0D9488',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    base_language VARCHAR(50) DEFAULT 'Urdu',
    target_language VARCHAR(50) DEFAULT 'English',
    learning_goal VARCHAR(100) DEFAULT 'speaking-confidence',
    subscription_tier subscription_tier DEFAULT 'free',
    institute_id UUID REFERENCES public.institutes(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Roles (Security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Conversations
CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    topic VARCHAR(255),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER DEFAULT 0
);

-- Messages
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(10) CHECK (role IN ('user', 'ai')) NOT NULL,
    content TEXT NOT NULL,
    audio_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback
CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE UNIQUE NOT NULL,
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    tips TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mistakes
CREATE TABLE public.mistakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_id UUID REFERENCES public.feedback(id) ON DELETE CASCADE NOT NULL,
    incorrect_text TEXT NOT NULL,
    correct_text TEXT NOT NULL,
    explanation_en TEXT NOT NULL,
    explanation_ur TEXT NOT NULL,
    type mistake_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Progress (Aggregated Stats)
CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    total_sessions INTEGER DEFAULT 0,
    total_minutes INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0,
    last_practice_date DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_mistakes_feedback_id ON public.mistakes(feedback_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security Definer Function for Role Checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

---

## Application Routes

| Route | Page | Description | Auth Required |
|-------|------|-------------|---------------|
| `/` | Landing | Marketing page with app intro | No |
| `/login` | Login | User authentication | No |
| `/signup` | Signup | New user registration | No |
| `/onboarding` | Onboarding | Language & goal selection | No |
| `/dashboard` | Dashboard | User home with stats | Yes |
| `/conversation` | Conversation | Voice practice session | Yes* |
| `/feedback` | Feedback | Post-session analysis | Yes |
| `/pricing` | Pricing | Subscription plans | No |
| `*` | NotFound | 404 error page | No |

*Guest access available with limited features

---

## Component Library

### Layout Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `MobileLayout` | `src/components/layout/` | Responsive mobile-first wrapper |

### UI Components (shadcn/ui)

| Component | Purpose |
|-----------|---------|
| `Button` | Action triggers with variants |
| `Card` | Content containers |
| `Input` | Form text inputs |
| `Label` | Form field labels |
| `Badge` | Status indicators |
| `Progress` | Progress bars |
| `Dialog` | Modal dialogs |
| `Toast` | Notification messages |

### Custom Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Logo` | `src/components/ui/` | Brand logo display |
| `MicrophoneButton` | `src/components/conversation/` | Voice recording trigger |
| `Waveform` | `src/components/conversation/` | Audio visualization |
| `TranscriptPanel` | `src/components/conversation/` | Message display |
| `MistakeCard` | `src/components/feedback/` | Error analysis card |
| `ScoreCircle` | `src/components/feedback/` | Circular score display |

---

## Design System

### Color Palette

```css
/* Primary Colors (Teal/Emerald) */
--primary: 168 84% 36%        /* #0D9488 - Main teal */
--primary-glow: 160 84% 45%   /* #14B8A6 - Accent emerald */
--primary-foreground: 0 0% 100%

/* Semantic Colors */
--success: 142 76% 36%        /* Green for correct */
--warning: 38 92% 50%         /* Amber for tips */
--destructive: 0 84% 60%      /* Red for errors */

/* Neutrals */
--background: 220 20% 4%      /* Near black */
--foreground: 0 0% 95%        /* Off white */
--muted: 220 15% 15%          /* Dark gray */
--muted-foreground: 220 10% 60%
```

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Space Grotesk | 700 | 24-48px |
| Body | Inter | 400-500 | 14-16px |
| Urdu Text | Noto Nastaliq Urdu | 400 | 16-18px |

### Spacing Scale

```
4px  → 0.25rem (xs)
8px  → 0.5rem  (sm)
16px → 1rem   (md)
24px → 1.5rem (lg)
32px → 2rem   (xl)
48px → 3rem   (2xl)
```

### Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `fadeIn` | 300ms | ease-out | Page transitions |
| `slideUp` | 400ms | spring | Card entrances |
| `pulse-ring` | 1.5s | ease-in-out | Mic recording |
| `wave` | 1s | infinite | Audio waveform |

---

## AI Integration

### Conversation Mode

The AI operates as a friendly conversation partner:

- **Personality**: Patient, encouraging, natural
- **Behavior**: Never interrupts or corrects during conversation
- **Responses**: Contextual, engaging, promotes extended speaking
- **Language**: Simple English appropriate for learners

### Teacher Mode (Post-Session)

Analyzes the complete transcript to generate feedback:

```json
{
  "overallScore": 72,
  "mistakes": [
    {
      "incorrect": "Yesterday I goes to market",
      "correct": "Yesterday I went to the market",
      "explanationEn": "Use past tense 'went' for past actions",
      "explanationUr": "ماضی کے کاموں کے لیے 'went' استعمال کریں",
      "type": "grammar"
    }
  ],
  "tips": [
    "Practice past tense verbs consistently",
    "Remember article usage before nouns"
  ]
}
```

---

## Setup & Installation

### Prerequisites

- Node.js 18+ 
- npm or bun package manager
- Supabase account (for backend)

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/oralix.git
cd oralix

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Open http://localhost:5173
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key (server-side only)
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create new account |
| POST | `/auth/login` | Authenticate user |
| POST | `/auth/logout` | End session |
| POST | `/auth/reset-password` | Password recovery |

### Conversation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/conversations` | Start new session |
| PATCH | `/conversations/:id` | End session |
| POST | `/conversations/:id/messages` | Add message |
| GET | `/conversations/:id/feedback` | Get analysis |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user |
| PATCH | `/users/me` | Update profile |
| GET | `/users/me/progress` | Get statistics |
| GET | `/users/me/history` | Get past sessions |

---

## Security Considerations

### Authentication

- Email/password with Supabase Auth
- JWT tokens for session management
- Secure password requirements enforced
- Rate limiting on auth endpoints

### Authorization

- Role-based access control (RBAC)
- Roles stored in separate table (not user profile)
- Security definer functions for role checks
- Row Level Security (RLS) on all tables

### Data Protection

- All data encrypted at rest
- HTTPS enforced for all connections
- Audio files in secure storage buckets
- PII handled according to GDPR

### API Security

- API keys stored as secrets (never in code)
- CORS configured for allowed origins
- Input validation on all endpoints
- SQL injection prevention via parameterized queries

---

## Future Roadmap

### Phase 1: Core MVP ✅
- [x] Mobile-first UI design
- [x] Conversation interface
- [x] Feedback display with Urdu
- [x] User authentication flow
- [x] Pricing page

### Phase 2: Backend Integration 🔄
- [ ] Supabase connection
- [ ] User authentication
- [ ] Session persistence
- [ ] Progress tracking

### Phase 3: AI Features
- [ ] OpenAI GPT-4 integration
- [ ] Whisper speech-to-text
- [ ] Real-time conversation
- [ ] Automated feedback generation

### Phase 4: Premium Features
- [ ] Stripe payment integration
- [ ] Subscription management
- [ ] Usage metering
- [ ] Premium tier enforcement

### Phase 5: B2B Platform
- [ ] Institute dashboard
- [ ] Student management
- [ ] White-label branding
- [ ] Analytics reporting

### Phase 6: Expansion
- [ ] German language support
- [ ] Additional base languages
- [ ] Mobile app (React Native)
- [ ] Offline practice mode

---

## Contributing

### Code Style

- TypeScript strict mode
- ESLint + Prettier formatting
- Conventional commits
- Component-first architecture

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Submit PR with description
4. Pass CI checks
5. Obtain code review approval
6. Merge via squash

---

## License

Proprietary - All Rights Reserved

© 2024 Oralix. Unauthorized copying or distribution prohibited.

---

## Support

- **Documentation**: This file
- **Email**: support@oralix.app
- **Discord**: Coming soon

---

*Last Updated: January 2024*
*Version: 1.0.0*
