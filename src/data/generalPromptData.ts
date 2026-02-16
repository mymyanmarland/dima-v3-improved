export interface CategoryItem {
  id: string;
  label: string;
  description: string;
}

export interface CategoryGroup {
  category: string;
  emoji: string;
  items: CategoryItem[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    category: "Content & Writing",
    emoji: "✍️",
    items: [
      { id: "writing", label: "✍️ Writing", description: "Content & Creative Writing" },
      { id: "copywriting", label: "✏️ Copywriting", description: "Sales & Ad Copy" },
      { id: "storytelling", label: "📖 Storytelling", description: "Narrative & Stories" },
      { id: "poetry", label: "🎭 Poetry", description: "Poems & Lyrics" },
      { id: "blogging", label: "📝 Blogging", description: "Blog Posts & Articles" },
      { id: "scriptwriting", label: "🎬 Scriptwriting", description: "Video & Film Scripts" },
      { id: "journalism", label: "📰 Journalism", description: "News & Reporting" },
    ],
  },
  {
    category: "Marketing & Business",
    emoji: "💼",
    items: [
      { id: "marketing", label: "📢 Marketing", description: "Marketing & Advertising" },
      { id: "business", label: "💼 Business", description: "Business & Strategy" },
      { id: "seo", label: "🔍 SEO", description: "Search Engine Optimization" },
      { id: "social-media", label: "📱 Social Media", description: "Social Media Content" },
      { id: "email", label: "📧 Email", description: "Email Writing & Campaigns" },
      { id: "branding", label: "🏷️ Branding", description: "Brand Identity & Voice" },
      { id: "sales", label: "💵 Sales", description: "Sales Pitches & Proposals" },
      { id: "ecommerce", label: "🛒 E-Commerce", description: "Product Listings & Descriptions" },
    ],
  },
  {
    category: "Technical & Development",
    emoji: "💻",
    items: [
      { id: "coding", label: "💻 Coding", description: "Programming & Development" },
      { id: "data", label: "📊 Data", description: "Data Analysis & Science" },
      { id: "automation", label: "🤖 Automation", description: "Bots & Workflows" },
      { id: "devops", label: "⚙️ DevOps", description: "CI/CD & Infrastructure" },
      { id: "api-design", label: "🔗 API Design", description: "REST & GraphQL APIs" },
      { id: "database", label: "🗄️ Database", description: "SQL & Schema Design" },
      { id: "testing", label: "🧪 Testing", description: "QA & Test Automation" },
    ],
  },
  {
    category: "Education & Research",
    emoji: "📚",
    items: [
      { id: "education", label: "📚 Education", description: "Teaching & Learning" },
      { id: "research", label: "🔬 Research", description: "Research & Analysis" },
      { id: "summarization", label: "📝 Summarization", description: "Text Summarization" },
      { id: "translation", label: "🌍 Translation", description: "Language Translation" },
      { id: "tutoring", label: "🎓 Tutoring", description: "1-on-1 Teaching" },
      { id: "exam-prep", label: "📋 Exam Prep", description: "Study Guides & Quizzes" },
      { id: "lesson-plan", label: "📖 Lesson Plan", description: "Course Design" },
    ],
  },
  {
    category: "Creative & Design",
    emoji: "🎨",
    items: [
      { id: "creative", label: "🎨 Creative", description: "Art & Design" },
      { id: "music", label: "🎵 Music", description: "Music Theory & Lyrics" },
      { id: "gaming", label: "🎮 Gaming", description: "Game Design & Reviews" },
      { id: "ux-design", label: "🖌️ UX Design", description: "User Experience & UI" },
      { id: "photography", label: "📷 Photography", description: "Photo Direction" },
      { id: "animation", label: "🎞️ Animation", description: "Motion & Animation" },
    ],
  },
  {
    category: "Professional Services",
    emoji: "🏢",
    items: [
      { id: "legal", label: "⚖️ Legal", description: "Legal Documents & Advice" },
      { id: "medical", label: "🏥 Medical", description: "Healthcare & Medical" },
      { id: "finance", label: "💰 Finance", description: "Finance & Accounting" },
      { id: "hr", label: "👥 HR", description: "Human Resources" },
      { id: "customer-service", label: "🎧 Customer Service", description: "Support & Service" },
      { id: "consulting", label: "📊 Consulting", description: "Advisory & Strategy" },
      { id: "real-estate", label: "🏠 Real Estate", description: "Property & Listings" },
    ],
  },
  {
    category: "Science & Logic",
    emoji: "🧪",
    items: [
      { id: "science", label: "🧪 Science", description: "Science & Discovery" },
      { id: "math", label: "🔢 Math", description: "Mathematics & Logic" },
      { id: "philosophy", label: "💭 Philosophy", description: "Philosophy & Ethics" },
      { id: "psychology", label: "🧠 Psychology", description: "Mental Health & Behavior" },
      { id: "statistics", label: "📈 Statistics", description: "Statistical Analysis" },
    ],
  },
  {
    category: "Lifestyle & Personal",
    emoji: "🌟",
    items: [
      { id: "productivity", label: "⚡ Productivity", description: "Workflow & Efficiency" },
      { id: "cooking", label: "🍳 Cooking", description: "Recipes & Food" },
      { id: "travel", label: "✈️ Travel", description: "Travel Planning & Guides" },
      { id: "fitness", label: "💪 Fitness", description: "Health & Exercise" },
      { id: "parenting", label: "👶 Parenting", description: "Childcare & Family" },
      { id: "resume", label: "📄 Resume", description: "CV & Job Applications" },
      { id: "presentation", label: "📊 Presentation", description: "Slides & Pitches" },
      { id: "debate", label: "🗣️ Debate", description: "Arguments & Persuasion" },
      { id: "general", label: "🌐 General", description: "General Purpose" },
    ],
  },
];

// Flattened categories for backward compat
export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.items);

export const TONES = [
  "Professional", "Casual", "Technical", "Creative", "Persuasive", "Educational",
  "Formal", "Friendly", "Humorous", "Inspirational", "Analytical", "Conversational",
];

export const PROMPT_METHODS = [
  { id: "standard", label: "📝 Standard", desc: "Basic prompt generation" },
  { id: "chain-of-thought", label: "🔗 Chain-of-Thought", desc: "Step-by-step reasoning" },
  { id: "few-shot", label: "🎯 Few-Shot", desc: "With examples included" },
  { id: "role-play", label: "🎭 Role-Play", desc: "Expert persona assignment" },
  { id: "tree-of-thought", label: "🌳 Tree-of-Thought", desc: "Multi-path exploration" },
  { id: "socratic", label: "❓ Socratic", desc: "Question-driven exploration" },
  { id: "mega-prompt", label: "📖 Mega Prompt", desc: "Extremely comprehensive" },
  { id: "react", label: "⚡ ReAct", desc: "Reasoning + Action steps" },
  { id: "constraint", label: "🔒 Constraint-Based", desc: "With strict rules" },
  { id: "iterative", label: "🔄 Iterative Refinement", desc: "Progressive improvement" },
];

export const OUTPUT_FORMATS = [
  { id: "default", label: "📝 Default", desc: "Natural prose" },
  { id: "markdown", label: "📋 Markdown", desc: "Structured with headings" },
  { id: "json", label: "🔧 JSON", desc: "Structured data format" },
  { id: "step-by-step", label: "📊 Step-by-Step", desc: "Numbered instructions" },
  { id: "bullet-points", label: "• Bullet Points", desc: "Concise list format" },
  { id: "essay", label: "📄 Essay", desc: "Long-form article" },
  { id: "table", label: "📊 Table", desc: "Tabular comparison" },
  { id: "checklist", label: "✅ Checklist", desc: "Actionable task list" },
  { id: "qa", label: "❓ Q&A", desc: "Question & Answer pairs" },
  { id: "outline", label: "📑 Outline", desc: "Hierarchical structure" },
];

export const AUDIENCES = [
  { id: "general", label: "🌐 General", desc: "Anyone" },
  { id: "beginner", label: "🟢 Beginner", desc: "New learners" },
  { id: "intermediate", label: "🟡 Intermediate", desc: "Some experience" },
  { id: "expert", label: "🔴 Expert", desc: "Advanced users" },
  { id: "kids", label: "🧒 Kids", desc: "Children (5-12)" },
  { id: "teens", label: "🎒 Teens", desc: "Teenagers (13-18)" },
  { id: "academic", label: "🎓 Academic", desc: "Scholars & researchers" },
  { id: "business", label: "💼 Business", desc: "Professionals" },
];

export const OUTPUT_LANGUAGES = [
  { id: "english", label: "🇬🇧 English" },
  { id: "myanmar", label: "🇲🇲 Myanmar" },
  { id: "chinese", label: "🇨🇳 Chinese" },
  { id: "japanese", label: "🇯🇵 Japanese" },
  { id: "korean", label: "🇰🇷 Korean" },
  { id: "thai", label: "🇹🇭 Thai" },
  { id: "spanish", label: "🇪🇸 Spanish" },
  { id: "french", label: "🇫🇷 French" },
  { id: "german", label: "🇩🇪 German" },
  { id: "hindi", label: "🇮🇳 Hindi" },
  { id: "arabic", label: "🇸🇦 Arabic" },
  { id: "portuguese", label: "🇧🇷 Portuguese" },
];

export const DETAIL_LEVELS = [
  { id: "brief", label: "📝 Brief", desc: "Short & focused (200-400 words)" },
  { id: "detailed", label: "📋 Detailed", desc: "Step-by-step (400-800 words)" },
  { id: "mega", label: "📖 Mega", desc: "Comprehensive (800-1500 words)" },
];
