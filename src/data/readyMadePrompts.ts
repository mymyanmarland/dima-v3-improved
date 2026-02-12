export interface ReadyMadeProject {
  id: number;
  title: string;
  category: string;
  emoji: string;
  prompt: string;
}

export const CATEGORIES = [
  { id: "all", label: "အားလုံး", emoji: "📋" },
  { id: "ecommerce", label: "E-Commerce", emoji: "🛒" },
  { id: "social", label: "Social Media", emoji: "💬" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "health", label: "Health & Fitness", emoji: "💪" },
  { id: "finance", label: "Finance", emoji: "💰" },
  { id: "productivity", label: "Productivity", emoji: "⚡" },
  { id: "entertainment", label: "Entertainment", emoji: "🎮" },
  { id: "food", label: "Food & Restaurant", emoji: "🍔" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "realestate", label: "Real Estate", emoji: "🏠" },
  { id: "crm", label: "CRM & Business", emoji: "📊" },
  { id: "portfolio", label: "Portfolio & Blog", emoji: "🎨" },
  { id: "utility", label: "Utility & Tools", emoji: "🔧" },
  { id: "ai", label: "AI & ML", emoji: "🤖" },
];

export const READY_MADE_PROJECTS: ReadyMadeProject[] = [
  // === E-Commerce (10) ===
  {
    id: 1,
    title: "Multi-vendor Marketplace",
    category: "ecommerce",
    emoji: "🏪",
    prompt: `Build a full-featured multi-vendor e-commerce marketplace web application with the following features:

**User Roles:** Buyer, Seller, Admin
**Buyer Features:**
- Browse products with search, filters (price, category, rating), and sorting
- Product detail page with image gallery, reviews, and related products
- Shopping cart with quantity management and saved items/wishlist
- Checkout with multiple payment methods (Stripe integration)
- Order tracking with real-time status updates
- Review and rating system for products and sellers

**Seller Features:**
- Seller dashboard with sales analytics and revenue charts
- Product management (CRUD) with image upload, variants (size/color), and inventory tracking
- Order management with status updates and shipping label generation
- Earnings and payout management

**Admin Features:**
- Admin dashboard with platform-wide analytics
- Seller approval and management
- Category and product moderation
- Commission rate settings
- User management

**Technical Requirements:**
- Responsive design (mobile-first)
- Authentication with email/password and social login
- Real-time notifications for orders
- Image optimization and lazy loading
- SEO-friendly URLs and meta tags
- Pagination and infinite scroll for product listings`
  },
  {
    id: 2,
    title: "Subscription Box Platform",
    category: "ecommerce",
    emoji: "📦",
    prompt: `Build a subscription box e-commerce platform where customers can subscribe to curated monthly boxes:

**Features:**
- Landing page with subscription plan tiers (Basic, Premium, Deluxe)
- User registration and profile management
- Subscription management (pause, cancel, upgrade/downgrade)
- Box customization preferences (quiz-based personalization)
- Past box history with product details
- Recurring billing with Stripe Subscriptions
- Referral program with discount codes
- Gift subscription option
- Admin panel for box curation and subscriber management
- Email notifications for shipping, billing, and new box reveals
- Product review system for items in past boxes
- Responsive design with beautiful product photography layout`
  },
  {
    id: 3,
    title: "Digital Product Store",
    category: "ecommerce",
    emoji: "💾",
    prompt: `Build a digital product marketplace for selling downloadable items (templates, ebooks, courses, software):

**Features:**
- Product listings with preview/demo capability
- Secure file delivery after purchase (signed download URLs)
- License key generation and management
- Multiple file formats per product
- User library for purchased products with re-download capability
- Creator dashboard with sales analytics and earnings
- Rating and review system with verified purchase badges
- Discount codes and bundle deals
- Affiliate program for creators
- Search with category filters and tags
- Responsive grid/list view toggle
- Admin moderation panel for submitted products`
  },
  {
    id: 4,
    title: "Fashion E-Commerce Store",
    category: "ecommerce",
    emoji: "👗",
    prompt: `Build a modern fashion e-commerce store with these features:

**Shopping Experience:**
- Product catalog with size guide, color swatches, and zoom-able images
- Virtual try-on size recommendation based on measurements
- Outfit suggestions and "Complete the Look" sections
- Wishlist and save for later
- Recently viewed products
- Size and fit reviews from other customers

**Cart & Checkout:**
- Persistent cart across sessions
- Guest checkout option
- Multiple shipping options with estimated delivery
- Promo code and gift card support
- Order confirmation with email

**Account Features:**
- Order history and tracking
- Return/exchange request system
- Address book management
- Style preferences quiz
- Loyalty points program

**Admin:**
- Inventory management with low stock alerts
- Sales dashboard with charts
- Product and category management
- Customer management and segmentation`
  },
  {
    id: 5,
    title: "Grocery Delivery App",
    category: "ecommerce",
    emoji: "🥬",
    prompt: `Build an online grocery delivery web application:

**Customer Features:**
- Browse products by category (Fruits, Vegetables, Dairy, Meat, Snacks, etc.)
- Search with auto-suggestions
- Product details with nutritional information
- Smart cart with quantity controls and estimated total
- Delivery time slot selection
- Multiple delivery addresses
- Order tracking with live status updates
- Reorder from past orders (one-click reorder)
- Weekly deals and personalized recommendations

**Delivery Management:**
- Delivery partner assignment
- Route optimization display
- Delivery status updates

**Admin Panel:**
- Product and inventory management
- Order management dashboard
- Delivery zone configuration
- Pricing and offer management
- Analytics and reports (daily sales, popular items, peak hours)`
  },
  {
    id: 6,
    title: "Auction Platform",
    category: "ecommerce",
    emoji: "🔨",
    prompt: `Build a real-time online auction platform:

**Features:**
- Live auction listings with countdown timers
- Real-time bidding with WebSocket updates
- Auto-bid (proxy bidding) functionality
- Buy-it-now option alongside auctions
- Auction categories with search and filters
- Seller listing creation with starting price, reserve price, and duration
- Bid history and notifications (outbid alerts)
- Winner notification and payment processing
- Seller ratings and buyer feedback system
- Watchlist for favorite auctions
- Admin panel for auction moderation and dispute resolution
- Mobile-responsive design with real-time countdown animations`
  },
  {
    id: 7,
    title: "Print-on-Demand Store",
    category: "ecommerce",
    emoji: "👕",
    prompt: `Build a print-on-demand e-commerce platform:

**Features:**
- Product designer tool (upload artwork, position on product mockup)
- Multiple product types (t-shirts, mugs, phone cases, posters, tote bags)
- Live preview of custom designs on products
- Product listing with mockup generation
- Shopping cart and checkout with Stripe
- Order management with production status tracking
- Artist/designer profiles and storefronts
- Royalty tracking for designers
- Bulk order discounts
- Admin panel for production queue management
- Template gallery for quick designs
- Responsive design with canvas-based editor`
  },
  {
    id: 8,
    title: "Second-hand Marketplace",
    category: "ecommerce",
    emoji: "♻️",
    prompt: `Build a second-hand/used items marketplace (like Craigslist/Facebook Marketplace):

**Features:**
- Item listing with photos, description, condition rating, and price
- Location-based browsing with map view
- Category browsing (Electronics, Furniture, Clothing, Vehicles, etc.)
- In-app messaging between buyer and seller
- Make offer / negotiate price feature
- Saved searches with notification alerts
- User profiles with ratings and verification badges
- Report and flag inappropriate listings
- Featured/promoted listings (paid)
- Price history and similar item comparisons
- Admin moderation dashboard
- Mobile-responsive with swipe-able image galleries`
  },
  {
    id: 9,
    title: "B2B Wholesale Platform",
    category: "ecommerce",
    emoji: "🏭",
    prompt: `Build a B2B wholesale ordering platform:

**Features:**
- Business registration with verification workflow
- Tiered pricing based on order volume
- Bulk ordering with minimum order quantities
- Quote request system for custom orders
- Product catalog with SKU management
- Purchase order generation and tracking
- Invoice management and NET payment terms
- Reorder from past orders
- Account manager assignment
- Credit limit management
- Shipping integration with freight options
- Admin panel with business customer management and approval queue
- Reports: sales by customer, product performance, outstanding invoices`
  },
  {
    id: 10,
    title: "Handmade Crafts Store",
    category: "ecommerce",
    emoji: "🧶",
    prompt: `Build an Etsy-like handmade crafts marketplace:

**Features:**
- Artisan profiles with shop customization (banner, bio, story)
- Product listings with multiple photos, materials used, and crafting time
- Custom order requests with messaging
- Favorite shops and products
- Gift wrapping option and personalized messages
- Review system with photos
- Shop analytics for sellers
- Category browsing (Jewelry, Home Decor, Clothing, Art, Toys, etc.)
- Search with filters (price, shipping, handmade, vintage)
- Seasonal collections and featured artisans
- Admin curation and quality control
- Mobile-responsive masonry grid layout`
  },

  // === Social Media (8) ===
  {
    id: 11,
    title: "Photo Sharing Platform",
    category: "social",
    emoji: "📸",
    prompt: `Build an Instagram-like photo sharing social platform:

**Features:**
- Photo upload with filters and basic editing (crop, rotate, brightness)
- Feed with infinite scroll showing followed users' posts
- Like, comment, and share functionality
- User profiles with photo grid, followers/following counts
- Follow/unfollow system
- Stories feature (24-hour expiring content)
- Explore page with trending and suggested content
- Hashtag system with trending hashtags
- Direct messaging between users
- Notifications (likes, comments, follows, mentions)
- Search for users and hashtags
- Privacy settings (public/private profile)
- Report and block functionality
- Responsive design with mobile-first approach`
  },
  {
    id: 12,
    title: "Community Forum",
    category: "social",
    emoji: "🗣️",
    prompt: `Build a Reddit-like community forum platform:

**Features:**
- Community/subreddit creation with custom rules and descriptions
- Post creation (text, link, image, poll)
- Upvote/downvote system with karma points
- Threaded comment system with nested replies
- User profiles with post/comment history and karma
- Community moderation tools (remove posts, ban users, set rules)
- Hot/New/Top/Controversial sorting
- Search across communities and posts
- Flair system for posts and users
- Award system for quality posts
- Dark mode support
- Admin dashboard for site-wide moderation
- Responsive design with card and compact view options`
  },
  {
    id: 13,
    title: "Professional Networking Platform",
    category: "social",
    emoji: "💼",
    prompt: `Build a LinkedIn-like professional networking platform:

**Features:**
- Professional profile with experience, education, skills, and endorsements
- Connection system (send/accept/reject requests)
- News feed with posts, articles, and shared content
- Job listings and application system
- Company pages with follower system
- Messaging/inbox system
- Skill endorsement and recommendation letters
- Search for people, jobs, and companies
- Notifications for connections, messages, and job matches
- Content creation (articles, posts with rich text)
- Profile views analytics
- Admin panel for content moderation
- Responsive professional design`
  },
  {
    id: 14,
    title: "Micro-blogging Platform",
    category: "social",
    emoji: "🐦",
    prompt: `Build a Twitter/X-like micro-blogging platform:

**Features:**
- Short-form posts (280 character limit) with media attachments
- Timeline feed with real-time updates
- Repost/retweet and quote functionality
- Like and bookmark system
- Threaded conversations and replies
- Follow/follower system
- Trending topics and hashtags
- User verification badges
- Lists for organizing followed accounts
- Search with filters (people, posts, media)
- Notifications (mentions, likes, reposts, follows)
- Direct messages
- Profile customization (bio, banner, avatar)
- Analytics for post performance`
  },
  {
    id: 15,
    title: "Event Social Platform",
    category: "social",
    emoji: "🎉",
    prompt: `Build a social platform centered around events (like Meetup):

**Features:**
- Event creation with details, location (map), date/time, and capacity
- RSVP system with waitlist
- Event categories (Tech, Sports, Music, Art, Food, etc.)
- Group creation and management
- Event discovery by location and interests
- User profiles with attended events history
- Event comments and discussion boards
- Photo sharing from events
- Calendar integration
- Recurring event support
- Ticket pricing for paid events
- Organizer dashboard with attendee management
- Notifications and reminders
- Mobile-responsive with map integration`
  },
  {
    id: 16,
    title: "Anonymous Q&A Platform",
    category: "social",
    emoji: "❓",
    prompt: `Build an anonymous question-and-answer social platform:

**Features:**
- Ask questions anonymously or with username
- Category-based question organization
- Upvote/downvote answers
- Mark best answer functionality
- Follow questions for updates
- User expertise tags and reputation system
- Search with filters (unanswered, popular, recent)
- Bookmark favorite questions
- Report inappropriate content
- Trending questions section
- Related questions suggestions
- Rich text editor for answers with code highlighting
- Admin moderation dashboard
- Responsive card-based layout`
  },
  {
    id: 17,
    title: "Book Club Social Network",
    category: "social",
    emoji: "📖",
    prompt: `Build a Goodreads-like book social network:

**Features:**
- Book database with details (author, genre, synopsis, cover)
- Reading status tracking (Want to Read, Currently Reading, Read)
- Star rating and written review system
- Bookshelves/lists creation and sharing
- Reading challenges (yearly goals)
- Book clubs with discussion threads
- Friend system with activity feed
- Book recommendations based on reading history
- Author pages
- Search and browse by genre, author, rating
- Reading statistics and progress tracking
- Admin panel for book database management
- Responsive design with beautiful book cover displays`
  },
  {
    id: 18,
    title: "Music Sharing Community",
    category: "social",
    emoji: "🎵",
    prompt: `Build a SoundCloud-like music sharing community:

**Features:**
- Audio track upload with waveform visualization
- Play/pause with progress scrubbing
- Playlist creation and sharing
- Like, repost, and comment on tracks (timed comments)
- Artist profiles with discography
- Follow system and personalized feed
- Genre-based browsing and discovery
- Search for tracks, artists, and playlists
- Track analytics (plays, likes, reposts)
- Embed player for external sharing
- Download option (configurable by artist)
- Trending and new releases sections
- Responsive audio player that persists across navigation`
  },

  // === Education (8) ===
  {
    id: 19,
    title: "Online Learning Platform",
    category: "education",
    emoji: "🎓",
    prompt: `Build a Udemy-like online learning platform:

**Features:**
- Course creation with modules, lessons (video, text, quiz)
- Course catalog with search, filters (category, level, price, rating)
- Video player with progress tracking and notes
- Quiz and assignment system with auto-grading
- Course progress dashboard for students
- Certificate generation upon completion
- Rating and review system for courses
- Instructor dashboard with earnings and student analytics
- Shopping cart and course purchase with Stripe
- Wishlist and course recommendations
- Discussion forum per course
- Admin panel for course approval and platform management
- Responsive design with focus on video content delivery`
  },
  {
    id: 20,
    title: "Flashcard Study App",
    category: "education",
    emoji: "🃏",
    prompt: `Build a spaced repetition flashcard study application:

**Features:**
- Create flashcard decks with front/back content (text, images)
- Spaced repetition algorithm (SM-2) for optimal review scheduling
- Study session with flip animation and self-grading
- Progress tracking with mastery levels per card
- Statistics dashboard (cards studied, streak, accuracy)
- Public deck sharing and browsing
- Import/export decks (CSV format)
- Tags and categories for organization
- Search across personal and public decks
- Daily study reminders
- Deck collaboration (shared editing)
- Dark mode support
- Mobile-responsive with swipe gestures for card review`
  },
  {
    id: 21,
    title: "Language Learning App",
    category: "education",
    emoji: "🌍",
    prompt: `Build a Duolingo-like language learning web application:

**Features:**
- Lesson structure with levels and units
- Multiple exercise types (multiple choice, fill-in-blank, matching, listening)
- XP points and daily streak tracking
- Leaderboards (weekly, all-time)
- Heart/lives system with practice to earn more
- Progress tree visualization
- Achievement badges and milestones
- Vocabulary review with spaced repetition
- Audio pronunciation for words and sentences
- Multiple language support (at least 5 languages)
- User profiles with statistics
- Daily goals and reminders
- Gamified UI with animations and sound effects
- Mobile-responsive design`
  },
  {
    id: 22,
    title: "Online Exam Platform",
    category: "education",
    emoji: "📝",
    prompt: `Build an online examination and assessment platform:

**Features:**
- Exam creation with multiple question types (MCQ, true/false, short answer, essay)
- Question bank management with tags and difficulty levels
- Timed exams with auto-submission
- Randomized question order and answer shuffling
- Anti-cheating features (tab-switch detection, full-screen mode)
- Automatic grading for objective questions
- Manual grading interface for subjective questions
- Results dashboard with detailed analytics
- Certificate generation for passing candidates
- Student dashboard with exam history and performance trends
- Bulk student enrollment via CSV
- Admin panel for exam scheduling and management
- Responsive design that works on tablets and desktops`
  },
  {
    id: 23,
    title: "Tutoring Marketplace",
    category: "education",
    emoji: "👩‍🏫",
    prompt: `Build an online tutoring marketplace connecting tutors and students:

**Features:**
- Tutor profiles with subjects, qualifications, rates, and availability
- Student search for tutors by subject, price, rating, and availability
- Booking system with calendar integration
- Video call integration for online sessions
- In-session whiteboard and screen sharing
- Rating and review system for tutors
- Payment processing with tutor payouts
- Session history and notes
- Messaging system between tutor and student
- Tutor verification and background check status
- Subject category browsing
- Admin dashboard for tutor approval and dispute resolution
- Mobile-responsive booking interface`
  },
  {
    id: 24,
    title: "School Management System",
    category: "education",
    emoji: "🏫",
    prompt: `Build a comprehensive school management system:

**Features:**
- Student information management (enrollment, personal details, photos)
- Class and section management
- Teacher profiles and class assignments
- Attendance tracking with daily/monthly reports
- Grade book with assignment and exam score management
- Report card generation (PDF)
- Timetable/schedule management
- Parent portal with student progress viewing
- Announcement and notice board
- Fee management and payment tracking
- Library management (book catalog, issue/return)
- Admin dashboard with school-wide analytics
- Role-based access (Admin, Teacher, Student, Parent)
- Responsive design for all devices`
  },
  {
    id: 25,
    title: "Interactive Coding Playground",
    category: "education",
    emoji: "💻",
    prompt: `Build an interactive coding playground for learning programming:

**Features:**
- Code editor with syntax highlighting (Monaco/CodeMirror)
- Multiple language support (JavaScript, Python, HTML/CSS)
- Live preview panel for web technologies
- Console output display
- Pre-built coding challenges with difficulty levels
- Step-by-step tutorials with embedded code exercises
- Code sharing via unique URLs
- Save and manage code snippets
- Fork and modify shared snippets
- User profiles with completed challenges
- Leaderboard based on challenges completed
- Dark/light theme toggle
- Responsive split-pane layout`
  },
  {
    id: 26,
    title: "Research Paper Repository",
    category: "education",
    emoji: "📄",
    prompt: `Build an academic research paper repository platform:

**Features:**
- Paper upload with metadata (title, abstract, authors, keywords, DOI)
- PDF viewer with annotation support
- Search with filters (field, date, citations, author)
- Citation management and export (BibTeX, APA, MLA)
- Author profiles with publication list and h-index
- Paper collections/reading lists
- Peer review system (submit, review, revise)
- Reference graph visualization
- Related papers recommendations
- Download tracking and statistics
- Commenting and discussion per paper
- Admin panel for submission review
- Responsive document-focused design`
  },

  // === Health & Fitness (7) ===
  {
    id: 27,
    title: "Workout Tracker",
    category: "health",
    emoji: "🏋️",
    prompt: `Build a comprehensive workout tracking web application:

**Features:**
- Exercise library with muscle group categories and instructions
- Custom workout plan creation with sets, reps, and rest times
- Workout logging with timer and set completion tracking
- Progress tracking with charts (weight lifted, volume, PRs)
- Body measurement tracking (weight, body fat, measurements)
- Workout history calendar view
- Pre-built workout programs (Beginner, Intermediate, Advanced)
- Exercise substitution suggestions
- Workout sharing and community templates
- Personal records (PR) tracking and celebrations
- Rest timer with audio notifications
- Statistics dashboard with trends
- Dark mode and mobile-responsive design`
  },
  {
    id: 28,
    title: "Meal Planning & Nutrition Tracker",
    category: "health",
    emoji: "🥗",
    prompt: `Build a meal planning and nutrition tracking application:

**Features:**
- Food database with nutritional information (calories, macros, micros)
- Daily food logging with serving size selection
- Meal planning with weekly calendar view
- Recipe creation with automatic nutritional calculation
- Macro and calorie goal setting with progress bars
- Grocery list generation from meal plans
- Water intake tracking
- Weight tracking with trend charts
- Barcode scanner for food items (camera API)
- Saved meals and favorites
- Nutritional reports (daily, weekly, monthly)
- Recipe sharing community
- Dark mode and responsive design`
  },
  {
    id: 29,
    title: "Mental Health Journal",
    category: "health",
    emoji: "🧠",
    prompt: `Build a mental health journaling and mood tracking application:

**Features:**
- Daily mood check-in with emoji scale and notes
- Journal entry with rich text editor
- Mood trends chart (weekly, monthly)
- Gratitude list feature
- Breathing exercises with guided animations
- Meditation timer with ambient sounds
- Sleep tracking log
- Anxiety/stress level tracking
- Coping strategies library
- Daily affirmations
- Private and secure entries (encrypted)
- Export journal entries
- Streak tracking for consistent journaling
- Calming UI design with soft colors and smooth animations`
  },
  {
    id: 30,
    title: "Telemedicine Platform",
    category: "health",
    emoji: "🩺",
    prompt: `Build a telemedicine/online doctor consultation platform:

**Features:**
- Patient registration with medical history form
- Doctor profiles with specialization, experience, and ratings
- Appointment booking with available time slots
- Video consultation integration
- Prescription management (digital prescriptions)
- Medical records storage and sharing
- Symptom checker (guided questionnaire)
- Chat messaging with doctors
- Payment processing for consultations
- Follow-up appointment scheduling
- Doctor dashboard with patient queue
- Admin panel for doctor verification
- Emergency contact information
- HIPAA-aware design with data privacy focus`
  },
  {
    id: 31,
    title: "Yoga & Meditation App",
    category: "health",
    emoji: "🧘",
    prompt: `Build a yoga and meditation web application:

**Features:**
- Guided meditation library with audio tracks and duration options
- Yoga pose library with images, instructions, and difficulty levels
- Pre-built yoga sequences (Morning Flow, Stress Relief, etc.)
- Custom sequence builder (drag-and-drop poses)
- Session timer with bell sounds
- Progress tracking (total minutes, streak, sessions)
- Daily meditation reminders
- Breathing exercise animations (box breathing, 4-7-8)
- Favorites and bookmarks
- Calming ambient sound mixer
- Achievement badges and milestones
- User profiles with practice statistics
- Serene, minimalist responsive design`
  },
  {
    id: 32,
    title: "Habit Tracker",
    category: "health",
    emoji: "✅",
    prompt: `Build a habit tracking application:

**Features:**
- Create habits with custom icons, colors, and frequency (daily/weekly)
- Daily check-in dashboard with habit cards
- Streak tracking with visual calendar (GitHub-style contribution grid)
- Progress statistics with charts
- Habit categories (Health, Productivity, Learning, etc.)
- Reminders and notifications
- Weekly and monthly review reports
- Habit suggestions library
- Notes for each habit completion
- Archive completed/paused habits
- Data export (CSV)
- Dark mode support
- Motivational quotes
- Mobile-first responsive design with satisfying check animations`
  },
  {
    id: 33,
    title: "Pharmacy Management System",
    category: "health",
    emoji: "💊",
    prompt: `Build a pharmacy management system:

**Features:**
- Medicine inventory management with stock levels and expiry dates
- Prescription processing and verification
- Customer/patient database
- Medicine search with alternatives and interactions checker
- Sales and billing system
- Low stock and expiry alerts
- Supplier management and purchase orders
- Sales reports and analytics
- Barcode scanning for medicine lookup
- Prescription history per patient
- Drug interaction warnings
- Admin dashboard with business analytics
- Receipt generation
- Responsive design for counter use`
  },

  // === Finance (7) ===
  {
    id: 34,
    title: "Personal Finance Manager",
    category: "finance",
    emoji: "💳",
    prompt: `Build a comprehensive personal finance management application:

**Features:**
- Income and expense tracking with categories
- Multiple account management (bank, cash, credit card)
- Budget creation with monthly limits per category
- Budget vs actual spending comparison charts
- Transaction history with search and filters
- Recurring transactions (salary, rent, subscriptions)
- Financial reports (monthly, yearly) with charts
- Bill reminders and due date tracking
- Savings goals with progress tracking
- Net worth calculation
- Data export (CSV, PDF reports)
- Dashboard with spending overview and trends
- Dark mode and responsive design
- Currency support for multiple currencies`
  },
  {
    id: 35,
    title: "Invoice Generator",
    category: "finance",
    emoji: "🧾",
    prompt: `Build a professional invoice generator application:

**Features:**
- Create invoices with line items, tax, and discounts
- Client management database
- Invoice templates with customizable branding (logo, colors)
- Invoice status tracking (Draft, Sent, Paid, Overdue)
- Recurring invoice automation
- Payment recording and partial payment support
- PDF generation and email sending
- Expense tracking linked to clients/projects
- Revenue reports and charts
- Tax summary reports
- Multi-currency support
- Late payment reminders
- Dashboard with outstanding amount and monthly revenue
- Responsive design for mobile invoice creation`
  },
  {
    id: 36,
    title: "Cryptocurrency Portfolio Tracker",
    category: "finance",
    emoji: "₿",
    prompt: `Build a cryptocurrency portfolio tracking application:

**Features:**
- Portfolio dashboard with total value, 24h change, and allocation chart
- Add holdings with buy price, quantity, and date
- Real-time price updates from crypto APIs
- Profit/loss calculation per coin and total
- Price charts with multiple timeframes (1D, 1W, 1M, 1Y)
- Watchlist for tracking coins not in portfolio
- Transaction history with buy/sell/transfer
- Price alerts with customizable thresholds
- Market overview with top coins by market cap
- Portfolio comparison with market benchmarks
- News feed integration
- Multiple portfolio support
- Export transaction history
- Responsive dark-themed design`
  },
  {
    id: 37,
    title: "Expense Splitting App",
    category: "finance",
    emoji: "🤝",
    prompt: `Build a Splitwise-like expense splitting application:

**Features:**
- Create groups for trips, roommates, events
- Add expenses with payer and split options (equal, exact, percentage)
- Balance calculation showing who owes whom
- Settle up with payment recording
- Expense categories with icons
- Activity feed showing group transactions
- Simplified debt calculation (minimize transactions)
- Receipt photo upload
- Recurring expenses (rent, utilities)
- Export group expenses summary
- Friend system for quick expense sharing
- Push notification for new expenses
- Dashboard with personal balance overview
- Mobile-responsive with easy expense entry`
  },
  {
    id: 38,
    title: "Stock Market Dashboard",
    category: "finance",
    emoji: "📈",
    prompt: `Build a stock market dashboard and watchlist application:

**Features:**
- Real-time stock price display with change indicators
- Interactive candlestick and line charts
- Watchlist management with custom lists
- Stock search with company information
- Portfolio tracker with buy/sell recording
- Performance analytics (return, P&L)
- Market overview (indices, top gainers/losers)
- Stock comparison tool
- Financial news feed
- Price alerts
- Historical data analysis
- Sector performance heatmap
- Dark theme with financial data visualization
- Responsive grid layout for multiple stocks`
  },
  {
    id: 39,
    title: "Crowdfunding Platform",
    category: "finance",
    emoji: "🚀",
    prompt: `Build a Kickstarter-like crowdfunding platform:

**Features:**
- Campaign creation with story, images, video, and funding goal
- Reward tiers with descriptions and delivery dates
- Campaign progress bar and backer count
- Backer dashboard with pledged campaigns
- Campaign updates and comments
- Search and browse by category
- Featured and trending campaigns
- Creator dashboard with analytics
- Payment processing for pledges
- All-or-nothing and flexible funding models
- Social sharing integration
- Campaign timeline and milestones
- Admin panel for campaign review
- Responsive design with engaging campaign pages`
  },
  {
    id: 40,
    title: "Payroll Management System",
    category: "finance",
    emoji: "💵",
    prompt: `Build a payroll management system for small businesses:

**Features:**
- Employee database with personal and salary details
- Monthly payroll processing with automatic calculations
- Tax deductions and benefits management
- Payslip generation (PDF)
- Attendance integration for payroll calculation
- Overtime and bonus management
- Leave balance tracking affecting pay
- Year-end tax summaries
- Payment history and records
- Multi-department support
- Salary revision history
- Reports (monthly cost, department-wise, year comparison)
- Admin role-based access
- Responsive dashboard with payroll overview`
  },

  // === Productivity (8) ===
  {
    id: 41,
    title: "Project Management Tool",
    category: "productivity",
    emoji: "📋",
    prompt: `Build a Trello/Jira-like project management tool:

**Features:**
- Kanban board with drag-and-drop cards
- List view and calendar view options
- Task creation with title, description, priority, due date, and assignee
- Task labels/tags with colors
- Subtasks and checklists within tasks
- File attachments on tasks
- Comments and activity log per task
- Multiple boards/projects
- Team member management and invitation
- Filters and search across tasks
- Sprint/milestone management
- Time tracking per task
- Dashboard with project progress overview
- Notifications for assignments and due dates
- Responsive design with mobile-friendly board`
  },
  {
    id: 42,
    title: "Note-Taking App",
    category: "productivity",
    emoji: "📝",
    prompt: `Build a Notion-like note-taking application:

**Features:**
- Rich text editor with markdown support
- Block-based content (headings, text, lists, code, images, tables)
- Nested pages and subpages (tree structure)
- Sidebar navigation with page tree
- Full-text search across all notes
- Tags and categories
- Favorites/pinned notes
- Trash and restore functionality
- Template gallery for quick page creation
- Table/database view within notes
- Toggle/collapsible blocks
- Code blocks with syntax highlighting
- Export to PDF and Markdown
- Dark mode and responsive design
- Keyboard shortcuts for power users`
  },
  {
    id: 43,
    title: "Time Tracking App",
    category: "productivity",
    emoji: "⏱️",
    prompt: `Build a time tracking and timesheet application:

**Features:**
- Timer with start/stop/pause and manual entry
- Project and task categorization
- Daily, weekly, and monthly timesheet views
- Time reports with charts (by project, task, day)
- Team management with member time views
- Billable vs non-billable hour tracking
- Client and project management
- Invoice generation from tracked hours
- Idle time detection
- Calendar integration
- Export reports (CSV, PDF)
- Dashboard with today's summary and weekly trends
- Tags for additional categorization
- Responsive design with floating timer widget`
  },
  {
    id: 44,
    title: "Calendar & Scheduling App",
    category: "productivity",
    emoji: "📅",
    prompt: `Build a Google Calendar-like scheduling application:

**Features:**
- Monthly, weekly, daily, and agenda views
- Event creation with title, time, location, description, and color
- Recurring events (daily, weekly, monthly, custom)
- Drag-and-drop event rescheduling
- Event reminders and notifications
- Multiple calendars with color coding
- Calendar sharing and collaboration
- Availability scheduling for meetings
- Time zone support
- Search events
- Import/export calendar (ICS format)
- Mini calendar navigation
- All-day events and multi-day events
- Responsive design with touch-friendly interactions`
  },
  {
    id: 45,
    title: "Team Communication Hub",
    category: "productivity",
    emoji: "💬",
    prompt: `Build a Slack-like team communication platform:

**Features:**
- Channels (public and private) for organized discussions
- Direct messaging (1-on-1 and group)
- Real-time messaging with WebSocket
- Message formatting (bold, italic, code, links)
- File sharing and image preview in chat
- Thread replies for organized discussions
- @mentions with notifications
- Emoji reactions on messages
- Search across all messages
- User presence indicators (online/offline/away)
- Channel management (create, archive, invite)
- Pinned messages
- Message editing and deletion
- Responsive design with sidebar navigation`
  },
  {
    id: 46,
    title: "Document Collaboration Tool",
    category: "productivity",
    emoji: "📑",
    prompt: `Build a Google Docs-like document collaboration tool:

**Features:**
- Rich text editor with formatting toolbar
- Real-time collaborative editing with cursor presence
- Document organization with folders
- Share documents with permission levels (view, comment, edit)
- Comment and suggestion system
- Version history with restore capability
- Document templates
- Table of contents auto-generation
- Export to PDF and DOCX
- Full-text search across documents
- Starred/favorite documents
- Trash and recovery
- User avatars showing who's editing
- Responsive editor design`
  },
  {
    id: 47,
    title: "Password Manager",
    category: "productivity",
    emoji: "🔐",
    prompt: `Build a secure password manager web application:

**Features:**
- Encrypted vault for storing passwords
- Password entry with website, username, password, and notes
- Password generator with customizable rules (length, chars)
- Copy to clipboard functionality
- Search and filter passwords
- Category/folder organization
- Favorite/frequently used passwords
- Password strength indicator
- Master password authentication
- Auto-lock after inactivity
- Import/export passwords (CSV)
- Security audit (weak, reused, old passwords)
- Two-factor authentication support
- Responsive design with clean, secure feel`
  },
  {
    id: 48,
    title: "Wiki/Knowledge Base",
    category: "productivity",
    emoji: "📚",
    prompt: `Build a team wiki and knowledge base platform:

**Features:**
- Article creation with rich text editor and markdown
- Category and subcategory organization
- Full-text search with suggestions
- Table of contents per article
- Version history with diff comparison
- Article linking and cross-references
- File and image attachments
- Access control (public, team, restricted)
- Article templates for consistency
- Recently updated and popular articles
- Feedback system (helpful/not helpful)
- Print-friendly article views
- Breadcrumb navigation
- Admin panel for category and user management
- Clean, readable responsive design`
  },

  // === Entertainment (7) ===
  {
    id: 49,
    title: "Movie & TV Show Tracker",
    category: "entertainment",
    emoji: "🎬",
    prompt: `Build a movie and TV show tracking application (like Letterboxd/Trakt):

**Features:**
- Movie/TV database with details (poster, synopsis, cast, rating)
- Watchlist management (Want to Watch, Watching, Watched)
- Rating and review system (star rating + text)
- Personal watch history with statistics
- Lists/collections creation (Best Sci-Fi, Weekend Movies, etc.)
- Social features (follow users, see friends' activity)
- Discover page with recommendations
- Search with filters (genre, year, rating)
- Season/episode tracking for TV shows
- Watch statistics (total hours, genres breakdown, yearly stats)
- Integration with movie API (TMDB)
- Dark mode with poster-heavy design
- Responsive grid layout`
  },
  {
    id: 50,
    title: "Music Playlist Manager",
    category: "entertainment",
    emoji: "🎶",
    prompt: `Build a music playlist management and discovery application:

**Features:**
- Create and manage playlists with drag-and-drop ordering
- Song search and browsing by genre, artist, mood
- Song details with album art, lyrics, and artist info
- Like/favorite songs
- Playlist sharing with public/private toggle
- Collaborative playlists
- Music discovery (trending, new releases, recommended)
- Artist and album pages
- Play queue management
- User profiles with listening statistics
- Genre-based browsing
- Mood-based playlist suggestions
- Import/export playlists
- Responsive design with music player aesthetic`
  },
  {
    id: 51,
    title: "Online Quiz Game",
    category: "entertainment",
    emoji: "🧩",
    prompt: `Build an interactive online quiz game platform:

**Features:**
- Multiple quiz categories (Science, History, Sports, Entertainment, etc.)
- Single player and multiplayer modes
- Timed questions with scoring
- Difficulty levels (Easy, Medium, Hard)
- Real-time multiplayer with room system
- Leaderboards (global, category, friends)
- Quiz creation tool for user-generated content
- Streak and achievement system
- Daily challenge quizzes
- Lifelines (50/50, skip, extra time)
- Statistics and performance tracking
- Power-ups and rewards
- Animated question transitions and feedback
- Mobile-responsive with game-like UI`
  },
  {
    id: 52,
    title: "Podcast Directory",
    category: "entertainment",
    emoji: "🎙️",
    prompt: `Build a podcast directory and listener platform:

**Features:**
- Podcast catalog with cover art, description, and episodes
- Episode player with playback speed control
- Subscribe/follow podcasts
- Episode progress tracking (resume where you left off)
- Download episodes for offline indicator
- Playlist/queue management
- Category and genre browsing
- Search for podcasts and episodes
- User ratings and reviews
- Trending and new podcast discovery
- Listening history and statistics
- Personalized recommendations
- Share episodes
- Responsive design with persistent audio player`
  },
  {
    id: 53,
    title: "Recipe Sharing Platform",
    category: "entertainment",
    emoji: "👨‍🍳",
    prompt: `Build a recipe sharing and cooking community platform:

**Features:**
- Recipe creation with ingredients, steps (with photos), prep/cook time
- Serving size adjuster (auto-recalculate ingredients)
- Nutritional information display
- Recipe categories (Breakfast, Lunch, Dinner, Dessert, Snack)
- Search with filters (cuisine, diet, cooking time, difficulty)
- Save/bookmark favorite recipes
- Rating and review system with photos
- Weekly meal plan builder
- Grocery list generation from recipes
- User profiles with recipe collections
- Step-by-step cooking mode (large text, timer)
- Social features (follow cooks, activity feed)
- Print-friendly recipe view
- Responsive design with food photography focus`
  },
  {
    id: 54,
    title: "Virtual Pet Game",
    category: "entertainment",
    emoji: "🐾",
    prompt: `Build a Tamagotchi-like virtual pet web game:

**Features:**
- Choose and name your pet (cat, dog, bunny, dragon, etc.)
- Pet stats (Hunger, Happiness, Energy, Health, Cleanliness)
- Actions (Feed, Play, Sleep, Clean, Heal)
- Pet animations for different states and actions
- Stats decrease over time (real-time)
- Mini-games to earn coins (simple click/tap games)
- Shop to buy food, toys, and accessories
- Pet customization (hats, clothes, backgrounds)
- Pet evolution based on care quality
- Achievement system
- Daily login rewards
- Pet status notifications
- Multiple pets support
- Cute, colorful responsive design with animations`
  },
  {
    id: 55,
    title: "Meme Generator",
    category: "entertainment",
    emoji: "😂",
    prompt: `Build a meme generator and sharing platform:

**Features:**
- Meme template gallery with popular formats
- Text overlay editor (top/bottom text, custom positioning)
- Custom image upload for meme creation
- Font customization (size, color, outline, shadow)
- Sticker/emoji overlay
- Generated meme download (PNG/JPG)
- Meme gallery with community submissions
- Upvote/downvote system
- Categories and tags
- Trending memes section
- Search meme templates
- Share to social media
- User profiles with created memes
- Canvas-based editor with responsive design`
  },

  // === Food & Restaurant (7) ===
  {
    id: 56,
    title: "Restaurant Management System",
    category: "food",
    emoji: "🍽️",
    prompt: `Build a comprehensive restaurant management system:

**Features:**
- Digital menu management with categories, items, prices, and photos
- Table management with visual floor plan
- Order taking system (dine-in, takeaway, delivery)
- Kitchen display system (order queue with status)
- Bill generation with tax and tip calculation
- Staff management and shift scheduling
- Inventory tracking with low-stock alerts
- Daily/weekly/monthly sales reports
- Customer database with order history
- Reservation management
- Discount and promotion management
- Multi-branch support
- Receipt printing (PDF generation)
- Responsive design for tablet POS use`
  },
  {
    id: 57,
    title: "Food Delivery Platform",
    category: "food",
    emoji: "🛵",
    prompt: `Build an UberEats-like food delivery platform:

**Features:**
- Restaurant listings with menus, ratings, and delivery time
- Location-based restaurant discovery with map
- Menu browsing with item customization (size, toppings, special requests)
- Cart management with multi-restaurant support
- Checkout with delivery address and payment
- Real-time order tracking with status updates
- Delivery driver assignment and tracking
- Restaurant dashboard for order management
- Rating and review system for restaurants and drivers
- Promo codes and offers
- Order history with reorder option
- Search with filters (cuisine, price, rating, delivery time)
- Admin panel for restaurant onboarding
- Mobile-first responsive design`
  },
  {
    id: 58,
    title: "Restaurant Reservation System",
    category: "food",
    emoji: "📞",
    prompt: `Build an OpenTable-like restaurant reservation system:

**Features:**
- Restaurant profiles with photos, menu, hours, and location
- Real-time table availability checking
- Reservation booking with party size, date, and time
- Confirmation and reminder notifications
- Guest management and seating preferences
- Waitlist with estimated wait time
- Restaurant search by cuisine, location, price range
- User reviews and ratings
- Special occasion tags (birthday, anniversary)
- Booking modification and cancellation
- Restaurant dashboard with daily reservations view
- Floor plan with table assignment
- Analytics (no-shows, peak hours, covers)
- Responsive design with elegant restaurant aesthetic`
  },
  {
    id: 59,
    title: "Coffee Shop Ordering App",
    category: "food",
    emoji: "☕",
    prompt: `Build a Starbucks-like coffee shop ordering web app:

**Features:**
- Menu with categories (Coffee, Tea, Pastries, Seasonal)
- Drink customization (size, milk type, sweetness, extra shots, toppings)
- Order ahead for pickup with estimated time
- Loyalty rewards program (earn stars per purchase)
- Reward redemption for free items
- Order history with favorites and quick reorder
- Store locator with hours and amenities
- Gift card purchase and balance check
- Seasonal promotions and limited-time offerings
- User preferences and saved customizations
- Push notification for order ready
- Payment processing
- Clean, modern cafe-inspired responsive design`
  },
  {
    id: 60,
    title: "Recipe Box & Cookbook Creator",
    category: "food",
    emoji: "📕",
    prompt: `Build a personal recipe box and cookbook creation application:

**Features:**
- Add recipes with ingredients, instructions, photos, and notes
- Import recipes from URLs (web scraping metadata)
- Organize recipes in custom collections/cookbooks
- Tag system (cuisine, meal type, diet, season)
- Serving size calculator
- Cooking timer integration
- Meal planning calendar
- Shopping list generation from selected recipes
- Recipe scaling (halve, double)
- Personal notes and modifications per recipe
- Print-friendly recipe cards
- Share recipes with family/friends
- Search and filter personal recipes
- Beautiful recipe card responsive design`
  },
  {
    id: 61,
    title: "Nutrition Label Generator",
    category: "food",
    emoji: "🏷️",
    prompt: `Build a nutrition facts label generator for food businesses:

**Features:**
- Ingredient database with nutritional values
- Recipe/product creation with ingredient quantities
- Automatic nutrition calculation (calories, fat, protein, carbs, etc.)
- FDA-compliant nutrition facts label generation
- Allergen detection and warnings
- Serving size management
- Label customization (format, style)
- PDF and image export of labels
- Ingredient statement generation
- Product database management
- Cost calculation per serving
- Batch/recipe scaling
- Admin dashboard for ingredient database management
- Clean, professional responsive design`
  },
  {
    id: 62,
    title: "Food Waste Tracker",
    category: "food",
    emoji: "🗑️",
    prompt: `Build a food waste tracking and reduction application:

**Features:**
- Pantry inventory management with expiry dates
- Expiring soon alerts and notifications
- Recipe suggestions based on ingredients about to expire
- Food waste logging (what was wasted and why)
- Waste statistics and trends with charts
- Money saved/wasted calculation
- Tips for food storage and preservation
- Shopping list with smart suggestions (avoid overbuying)
- Community features (share surplus food)
- Environmental impact calculator (CO2, water saved)
- Weekly waste reports
- Goals and challenges for waste reduction
- Achievement badges
- Eco-friendly themed responsive design`
  },

  // === Travel (7) ===
  {
    id: 63,
    title: "Trip Planning Platform",
    category: "travel",
    emoji: "🗺️",
    prompt: `Build a comprehensive trip planning platform:

**Features:**
- Trip creation with destination, dates, and budget
- Day-by-day itinerary builder with drag-and-drop
- Place search and add to itinerary (attractions, restaurants, hotels)
- Map view with itinerary pins and route
- Budget tracker with expense categories
- Packing list with templates
- Travel document checklist
- Collaborative trip planning (invite travel companions)
- Notes and tips per destination
- Weather forecast for trip dates
- Trip sharing and publishing
- Past trips gallery
- Travel inspiration and destination guides
- Responsive design with map-centric layout`
  },
  {
    id: 64,
    title: "Hotel Booking System",
    category: "travel",
    emoji: "🏨",
    prompt: `Build a hotel booking platform:

**Features:**
- Hotel listings with photos, amenities, and room types
- Search with filters (location, dates, guests, price, rating)
- Room availability calendar
- Booking system with guest details and payment
- Price comparison for different room types
- Review and rating system
- Map-based hotel search
- Hotel detail page with photo gallery and amenities list
- Booking management (modify, cancel)
- Guest dashboard with upcoming and past stays
- Hotel admin panel for inventory and booking management
- Special offers and packages
- Loyalty program
- Responsive design with travel-inspired aesthetics`
  },
  {
    id: 65,
    title: "Flight Search Engine",
    category: "travel",
    emoji: "✈️",
    prompt: `Build a flight search and comparison platform:

**Features:**
- Flight search with origin, destination, dates, and passengers
- Round-trip, one-way, and multi-city options
- Results with filters (price, duration, stops, airline, time)
- Sort by price, duration, departure time
- Flight details with layover information
- Price calendar (cheapest dates)
- Price alerts for routes
- Booking flow with passenger details
- Saved searches and favorite routes
- Recent searches history
- Airport information and terminal maps
- Baggage allowance comparison
- Mobile boarding pass display
- Responsive design with flight-search focused UX`
  },
  {
    id: 66,
    title: "Travel Blog Platform",
    category: "travel",
    emoji: "✍️",
    prompt: `Build a travel blogging platform:

**Features:**
- Blog post creation with rich text, photos, and location tags
- Interactive map showing all visited places
- Trip reports with multi-post series
- Photo galleries with lightbox view
- Travel tips and destination guides
- Comments and social interaction
- Follow travelers and personalized feed
- Destination pages aggregating all content
- Travel statistics (countries, cities, distance)
- Category and tag system
- Search and discover posts
- Featured posts and trending destinations
- SEO-optimized post URLs and meta tags
- Magazine-style responsive layout`
  },
  {
    id: 67,
    title: "Car Rental Platform",
    category: "travel",
    emoji: "🚗",
    prompt: `Build a car rental booking platform:

**Features:**
- Vehicle listings with photos, specs, and pricing
- Search by location, dates, and vehicle type
- Vehicle categories (Economy, SUV, Luxury, Van)
- Booking system with pickup/drop-off locations
- Add-ons (GPS, child seat, insurance)
- Pricing calculator with duration discounts
- Customer reviews per vehicle
- Fleet management for rental companies
- Booking management (modify, cancel, extend)
- Driver's license verification upload
- Damage report system with photos
- Loyalty rewards program
- Admin dashboard with fleet analytics
- Responsive design for quick mobile booking`
  },
  {
    id: 68,
    title: "Currency Converter",
    category: "travel",
    emoji: "💱",
    prompt: `Build a currency converter and exchange rate tracking application:

**Features:**
- Real-time currency conversion with 150+ currencies
- Favorite currency pairs for quick access
- Historical exchange rate charts (1D, 1W, 1M, 1Y)
- Rate alerts (notify when rate reaches target)
- Multi-currency converter (convert to multiple at once)
- Offline mode with cached rates
- Travel budget calculator in local currency
- Cash vs card rate comparison
- Country-based currency information
- Fee/commission calculator
- Rate trend indicators (up/down)
- Widget-style quick converter
- API rate refresh indicator
- Clean, financial-data focused responsive design`
  },
  {
    id: 69,
    title: "Visa Requirements Checker",
    category: "travel",
    emoji: "🛂",
    prompt: `Build a visa requirements checker and application tracker:

**Features:**
- Country-to-country visa requirement lookup
- Visa types information (tourist, business, transit, student)
- Required documents checklist per visa type
- Application status tracker with timeline
- Document upload and organization
- Embassy/consulate finder with contact info
- Processing time estimates
- Fee information and comparison
- Travel advisory warnings
- Visa-free destination explorer based on passport
- Application deadline reminders
- Shared applications for group travel
- FAQ per country
- Clean, informational responsive design`
  },

  // === Real Estate (6) ===
  {
    id: 70,
    title: "Property Listing Platform",
    category: "realestate",
    emoji: "🏡",
    prompt: `Build a Zillow-like property listing platform:

**Features:**
- Property listings with photos, details, and pricing
- Advanced search with filters (type, price, bedrooms, area, amenities)
- Map-based property search with clustering
- Property detail page with photo gallery and virtual tour
- Save/favorite properties and saved searches
- Price history and estimate
- Neighborhood information (schools, transit, crime)
- Agent profiles and contact forms
- Mortgage calculator
- Compare properties side-by-side
- New listing alerts
- Property submission for sellers/agents
- Admin panel for listing moderation
- Responsive design with map-heavy layout`
  },
  {
    id: 71,
    title: "Property Management System",
    category: "realestate",
    emoji: "🔑",
    prompt: `Build a property management system for landlords:

**Features:**
- Property portfolio management with units
- Tenant management with lease details
- Rent collection tracking and reminders
- Maintenance request system with status tracking
- Financial reports (income, expenses, profit per property)
- Lease agreement generation
- Tenant screening checklist
- Document storage (leases, receipts, inspections)
- Expense tracking per property
- Vacancy management and listing
- Communication hub for tenant messaging
- Property inspection scheduling and reports
- Tax document preparation
- Dashboard with portfolio overview and responsive design`
  },
  {
    id: 72,
    title: "Interior Design Visualizer",
    category: "realestate",
    emoji: "🎨",
    prompt: `Build an interior design visualization and planning tool:

**Features:**
- Room planner with drag-and-drop furniture placement
- Furniture catalog with dimensions and styles
- Color palette selector for walls, floors, and accents
- Style presets (Modern, Minimalist, Industrial, Bohemian)
- Mood board creation with images and colors
- Save and share room designs
- Before/after comparison slider
- Budget tracker for renovation/decoration
- Shopping list from design items with links
- Multiple room projects per user
- Design templates for common room types
- Measurement input for accurate scaling
- Export designs as images
- Elegant, design-focused responsive layout`
  },
  {
    id: 73,
    title: "Roommate Finder",
    category: "realestate",
    emoji: "🤝",
    prompt: `Build a roommate finding platform:

**Features:**
- User profiles with lifestyle preferences (sleep schedule, cleanliness, pets, etc.)
- Room/apartment listings with photos and details
- Compatibility matching algorithm based on preferences
- Search with filters (location, price, move-in date, preferences)
- Messaging system between potential roommates
- Verification badges (ID, social media, employment)
- Room tour scheduling
- Roommate agreement template
- Review system from past roommates
- Map-based search
- Budget split calculator
- Favorite profiles and listings
- Safety tips and guidelines
- Friendly, modern responsive design`
  },
  {
    id: 74,
    title: "Construction Project Tracker",
    category: "realestate",
    emoji: "🏗️",
    prompt: `Build a construction project management tracker:

**Features:**
- Project dashboard with milestones and timeline (Gantt chart)
- Task management with assignments and dependencies
- Daily progress reports with photos
- Budget tracking with cost breakdown
- Material inventory and ordering
- Subcontractor management
- Document management (blueprints, permits, contracts)
- Weather impact tracking
- Safety incident reporting
- Client portal with progress viewing
- Change order management
- Equipment tracking
- Inspection scheduling and checklists
- Photo gallery per project phase
- Responsive design for on-site tablet use`
  },
  {
    id: 75,
    title: "Parking Space Rental",
    category: "realestate",
    emoji: "🅿️",
    prompt: `Build a parking space rental marketplace:

**Features:**
- List parking spaces with location, type (garage, open, covered), and pricing
- Map-based parking search near destination
- Hourly, daily, and monthly pricing options
- Real-time availability status
- Booking and payment system
- QR code access pass generation
- Space owner dashboard with earnings
- Renter dashboard with active bookings
- Reviews for parking spaces
- Favorite/saved locations
- Vehicle management (multiple cars)
- Cancellation policy management
- Admin panel for dispute resolution
- Mobile-responsive with map-first design`
  },

  // === CRM & Business (7) ===
  {
    id: 76,
    title: "CRM Dashboard",
    category: "crm",
    emoji: "📊",
    prompt: `Build a sales CRM (Customer Relationship Management) dashboard:

**Features:**
- Contact management with company and person records
- Deal/opportunity pipeline with drag-and-drop stages
- Activity logging (calls, emails, meetings, notes)
- Task and follow-up management
- Email integration for communication tracking
- Sales reports and forecasting
- Contact search with advanced filters
- Deal analytics (conversion rate, average deal size, sales cycle)
- Team performance leaderboard
- Custom fields for contacts and deals
- Import/export contacts (CSV)
- Dashboard with sales metrics and charts
- Activity timeline per contact
- Responsive design with sidebar navigation`
  },
  {
    id: 77,
    title: "HR Management System",
    category: "crm",
    emoji: "👥",
    prompt: `Build an HR management system for small-medium businesses:

**Features:**
- Employee directory with profiles and organizational chart
- Leave management (apply, approve, balance tracking)
- Attendance tracking with clock-in/out
- Performance review system with goals and feedback
- Recruitment pipeline (job postings, applicants, interviews)
- Onboarding checklist for new hires
- Document management (contracts, certificates)
- Payroll integration data
- Training and development tracking
- Company announcements and policies
- Employee self-service portal
- Reports (headcount, turnover, leave statistics)
- Role-based access (HR Admin, Manager, Employee)
- Professional responsive design`
  },
  {
    id: 78,
    title: "Appointment Booking System",
    category: "crm",
    emoji: "📅",
    prompt: `Build a Calendly-like appointment booking system:

**Features:**
- Customizable booking page with available time slots
- Multiple event types with different durations
- Calendar sync for availability
- Buffer time between appointments
- Booking confirmation and reminder emails
- Timezone auto-detection
- Custom questions for bookers
- Team scheduling with round-robin or specific member
- Booking management dashboard
- Reschedule and cancellation with policies
- Embed booking widget for external websites
- Analytics (bookings per day, popular times, no-shows)
- Payment collection for paid appointments
- Clean, professional responsive booking page`
  },
  {
    id: 79,
    title: "Customer Support Ticketing",
    category: "crm",
    emoji: "🎫",
    prompt: `Build a customer support ticketing system:

**Features:**
- Ticket creation with subject, description, priority, and category
- Ticket assignment to support agents
- Status workflow (Open, In Progress, Waiting, Resolved, Closed)
- Internal notes and customer communication thread
- SLA tracking with response/resolution time
- Canned responses for common issues
- Knowledge base integration
- Customer portal for ticket submission and tracking
- Agent dashboard with queue management
- Ticket tags and custom fields
- Reports (response time, resolution rate, agent performance)
- Email-to-ticket creation
- Satisfaction rating after resolution
- Responsive design for agent efficiency`
  },
  {
    id: 80,
    title: "Inventory Management System",
    category: "crm",
    emoji: "📦",
    prompt: `Build an inventory management system:

**Features:**
- Product catalog with SKU, barcode, and categories
- Stock level tracking with real-time quantities
- Stock in/out transactions with history
- Low stock alerts and reorder points
- Multiple warehouse/location support
- Purchase order management
- Supplier database
- Stock transfer between locations
- Batch/lot tracking with expiry dates
- Barcode generation and scanning
- Inventory valuation reports
- Stock take/audit functionality
- Reports (stock movement, valuation, turnover rate)
- Dashboard with inventory overview
- Responsive design for warehouse tablet use`
  },
  {
    id: 81,
    title: "Survey & Feedback Platform",
    category: "crm",
    emoji: "📋",
    prompt: `Build a Typeform-like survey and feedback platform:

**Features:**
- Survey builder with multiple question types (MCQ, rating, text, scale, matrix)
- Drag-and-drop question ordering
- Conditional logic (show/hide questions based on answers)
- Theme customization (colors, fonts, background)
- Survey preview and testing
- Shareable survey links
- Response collection and storage
- Real-time response analytics with charts
- Individual response viewing
- Export responses (CSV, PDF reports)
- Anonymous and authenticated response options
- Response rate tracking
- Thank you page customization
- Template gallery for common survey types
- Beautiful, distraction-free responsive survey experience`
  },
  {
    id: 82,
    title: "Newsletter Management Platform",
    category: "crm",
    emoji: "✉️",
    prompt: `Build a newsletter/email campaign management platform:

**Features:**
- Subscriber list management with tags and segments
- Email template builder with drag-and-drop blocks
- Campaign creation with subject, content, and scheduling
- A/B testing for subject lines
- Campaign analytics (open rate, click rate, unsubscribes)
- Subscriber sign-up forms (embeddable)
- Automation sequences (welcome series, drip campaigns)
- Unsubscribe management and compliance
- Subscriber import/export (CSV)
- Template gallery
- Personalization tokens (name, custom fields)
- Send test emails
- Campaign history and comparison
- Dashboard with subscriber growth and engagement metrics
- Responsive email preview and management interface`
  },

  // === Portfolio & Blog (6) ===
  {
    id: 83,
    title: "Developer Portfolio",
    category: "portfolio",
    emoji: "💻",
    prompt: `Build a stunning developer portfolio website:

**Features:**
- Hero section with animated name, title, and CTA
- About section with skills and tech stack (icon grid)
- Projects showcase with live demo links and GitHub repos
- Project detail modal/page with screenshots and description
- Experience timeline (work history)
- Education section
- Blog/articles section
- Contact form with email integration
- Social media links
- Resume/CV download
- Dark/light mode toggle
- Smooth scroll navigation
- Terminal-style interactive element
- Loading animations and page transitions
- SEO optimized with meta tags
- Responsive design with creative animations`
  },
  {
    id: 84,
    title: "Photography Portfolio",
    category: "portfolio",
    emoji: "📷",
    prompt: `Build a photography portfolio website:

**Features:**
- Full-screen hero with featured photo
- Photo gallery with masonry/grid layout
- Album/collection organization
- Lightbox viewer with navigation
- Photo details (camera, lens, settings, location)
- Category filtering (Landscape, Portrait, Street, Wedding, etc.)
- Client gallery with password protection
- Contact and booking form
- About page with photographer bio and equipment
- Blog with photo stories
- Print store integration
- Social media integration
- Lazy loading for performance
- Minimal, photo-focused responsive design`
  },
  {
    id: 85,
    title: "Creative Agency Website",
    category: "portfolio",
    emoji: "🎨",
    prompt: `Build a creative agency portfolio website:

**Features:**
- Bold hero section with video/animation background
- Services section with detailed descriptions
- Portfolio/case studies with project details
- Team members section with roles and bios
- Client testimonials carousel
- Process/workflow section
- Contact page with inquiry form
- Blog/insights section
- Client logos showcase
- Awards and recognition
- Career/jobs page
- FAQ section
- Newsletter signup
- Smooth animations and parallax scrolling
- Brand-consistent color scheme
- Responsive design with creative layout`
  },
  {
    id: 86,
    title: "Personal Blog Platform",
    category: "portfolio",
    emoji: "✏️",
    prompt: `Build a Medium-like personal blog platform:

**Features:**
- Article editor with rich text and markdown support
- Featured image and reading time calculation
- Category and tag system
- Table of contents for long articles
- Code block support with syntax highlighting
- Image galleries within posts
- Comment system with nested replies
- Like/clap system for articles
- Author profile page with all posts
- RSS feed generation
- SEO-friendly URLs and meta tags
- Social sharing buttons
- Newsletter subscription
- Related articles suggestions
- Archive page with search
- Clean, typography-focused responsive design`
  },
  {
    id: 87,
    title: "Digital Resume Builder",
    category: "portfolio",
    emoji: "📄",
    prompt: `Build an online resume/CV builder application:

**Features:**
- Multiple resume templates (Professional, Creative, Minimal, Modern)
- Section management (Experience, Education, Skills, Projects, etc.)
- Drag-and-drop section reordering
- Rich text editing for descriptions
- Live preview while editing
- PDF export with pixel-perfect rendering
- Multiple resume versions
- Custom color scheme per template
- Profile photo upload
- Skills with proficiency levels
- Language proficiency
- Social links and portfolio URL
- ATS-friendly template option
- Cover letter builder
- Shareable resume URL
- Responsive editor interface`
  },
  {
    id: 88,
    title: "Art Gallery Platform",
    category: "portfolio",
    emoji: "🖼️",
    prompt: `Build an online art gallery and marketplace:

**Features:**
- Artist profiles with biography and portfolio
- Artwork listings with high-res images, details, and pricing
- Virtual gallery view with room mockups
- Art categories (Painting, Sculpture, Digital, Photography)
- Search and filter by style, medium, price, size
- Purchase and commission request system
- Exhibition/collection curation
- Favorite artworks and follow artists
- Artist applications and approval
- Artwork zoom and detail view
- Price range exploration
- About the piece (artist statement, technique)
- Admin panel for gallery curation
- Elegant, gallery-inspired responsive design`
  },

  // === Utility & Tools (7) ===
  {
    id: 89,
    title: "URL Shortener",
    category: "utility",
    emoji: "🔗",
    prompt: `Build a URL shortener service with analytics:

**Features:**
- Shorten long URLs with custom aliases
- QR code generation for shortened URLs
- Click analytics (total clicks, daily chart, referrers)
- Geographic data for clicks (country, city)
- Device and browser statistics
- Link expiration settings
- Password-protected links
- Bulk URL shortening
- API access for developers
- Link management dashboard
- Custom domains support
- UTM parameter builder
- Link grouping and tags
- Export analytics data
- Clean, minimal responsive design`
  },
  {
    id: 90,
    title: "File Converter Tool",
    category: "utility",
    emoji: "🔄",
    prompt: `Build an online file converter tool:

**Features:**
- Image conversion (PNG, JPG, WebP, SVG, GIF)
- Document conversion (PDF to images, images to PDF)
- Image resizing and compression
- Batch conversion support
- Drag-and-drop file upload
- Format auto-detection
- Quality/compression settings
- Preview before download
- Conversion history
- File size comparison (before/after)
- Color space conversion
- Image cropping and rotation
- Watermark adding
- Progress indicator for large files
- Clean, tool-focused responsive design`
  },
  {
    id: 91,
    title: "Color Palette Generator",
    category: "utility",
    emoji: "🎨",
    prompt: `Build a color palette generator and manager tool:

**Features:**
- Random palette generation with lock/unlock colors
- Color harmony rules (complementary, analogous, triadic, etc.)
- Extract palette from uploaded image
- Color picker with HEX, RGB, HSL values
- Palette saving and collections
- Community palettes gallery
- Accessibility contrast checker (WCAG)
- CSS/Tailwind code generation for palettes
- Gradient generator
- Color blindness simulation
- Export palettes (PNG, SVG, ASE, CSS)
- Trending palettes
- Search by color or mood
- Palette variations (lighter, darker, desaturated)
- Responsive design with color-immersive UI`
  },
  {
    id: 92,
    title: "Markdown Editor",
    category: "utility",
    emoji: "📝",
    prompt: `Build an online markdown editor with live preview:

**Features:**
- Split-pane editor with live preview
- Full markdown syntax support (GFM)
- Toolbar with formatting buttons
- Syntax highlighting in editor
- Table editor with visual builder
- Image upload and embedding
- Code block with language selection
- Mermaid diagram support
- Table of contents generation
- Export to HTML, PDF, and raw Markdown
- Document management (save, load, organize)
- Auto-save with version history
- Focus/zen mode (distraction-free)
- Custom CSS for preview styling
- Keyboard shortcuts
- Responsive design with collapsible panels`
  },
  {
    id: 93,
    title: "QR Code Generator",
    category: "utility",
    emoji: "📱",
    prompt: `Build a QR code generator and scanner application:

**Features:**
- Generate QR codes for URLs, text, WiFi, vCard, email, phone
- QR code customization (color, background, logo overlay)
- Multiple QR code styles (square, rounded, dots)
- Download in PNG, SVG, and PDF formats
- Batch QR code generation
- QR code scanner using device camera
- Scan history
- Dynamic QR codes (editable destination)
- Analytics for dynamic codes (scans count)
- Template gallery for common use cases
- Print-ready QR code sheets
- Error correction level selection
- Size customization
- Clean, modern utility-focused responsive design`
  },
  {
    id: 94,
    title: "Screenshot & Mockup Tool",
    category: "utility",
    emoji: "🖥️",
    prompt: `Build a screenshot beautifier and mockup generator:

**Features:**
- Upload screenshot and add device frame (iPhone, MacBook, iPad)
- Background customization (gradient, solid, pattern, image)
- Add shadow and reflection effects
- Text annotations and arrows
- Browser mockup frame
- Social media post mockup templates
- Padding and border radius adjustment
- Multiple export sizes and formats
- Batch processing for multiple screenshots
- Preset styles for quick beautification
- Watermark option
- Comparison slider (before/after)
- Template saving for consistent branding
- Canvas-based editor with responsive design`
  },
  {
    id: 95,
    title: "Pomodoro Timer App",
    category: "utility",
    emoji: "🍅",
    prompt: `Build a Pomodoro technique productivity timer:

**Features:**
- Configurable work/break intervals (default 25/5/15)
- Visual circular countdown timer with animation
- Auto-transition between work and break sessions
- Session counter (pomodoros completed)
- Daily and weekly statistics with charts
- Task list with pomodoro estimation
- Sound notifications for session transitions
- Ambient sounds during work sessions (rain, cafe, nature)
- Focus mode (minimal UI)
- Daily streak tracking
- Category-based time tracking
- Keyboard shortcuts (start/pause/skip)
- Settings persistence
- Beautiful, distraction-free responsive design`
  },

  // === AI & ML (5) ===
  {
    id: 96,
    title: "AI Content Writer",
    category: "ai",
    emoji: "✍️",
    prompt: `Build an AI-powered content writing assistant:

**Features:**
- Content generation for various types (blog post, social media, email, ad copy)
- Tone selection (professional, casual, humorous, formal)
- Target audience specification
- Content length control
- Multiple variations generation
- Content editing with AI suggestions
- Grammar and style checking
- SEO optimization suggestions
- Headline generator
- Content templates (product description, press release, etc.)
- Save and organize generated content
- Export to multiple formats
- History of generated content
- Word count and readability score
- Clean, writer-focused responsive design`
  },
  {
    id: 97,
    title: "AI Image Analysis Tool",
    category: "ai",
    emoji: "🔍",
    prompt: `Build an AI-powered image analysis and description tool:

**Features:**
- Image upload with drag-and-drop
- AI-generated image descriptions
- Object detection with bounding box visualization
- Text extraction from images (OCR)
- Color palette extraction
- Image similarity search
- Face detection (count and positions)
- Scene classification
- Image metadata display (EXIF data)
- Batch image analysis
- Analysis history
- Export results as JSON/CSV
- Comparison between multiple images
- Accessibility alt-text generation
- Modern, tech-focused responsive design`
  },
  {
    id: 98,
    title: "AI Chatbot Builder",
    category: "ai",
    emoji: "🤖",
    prompt: `Build an AI chatbot builder platform (no-code):

**Features:**
- Visual conversation flow builder with drag-and-drop
- Message node types (text, buttons, carousel, quick replies)
- Conditional branching based on user input
- Variable storage and user context
- AI response integration for dynamic answers
- Knowledge base upload (FAQ, documents)
- Chat widget customization (colors, avatar, position)
- Embed code generation for websites
- Testing playground
- Conversation analytics (messages, users, drop-off)
- Template bots for common use cases
- Multi-language support
- User conversation history
- Admin dashboard with chatbot management
- Responsive builder interface`
  },
  {
    id: 99,
    title: "AI Study Notes Generator",
    category: "ai",
    emoji: "📓",
    prompt: `Build an AI-powered study notes generator:

**Features:**
- Input text/topic and generate structured study notes
- Multiple output formats (bullet points, flashcards, summary, mind map)
- Key concepts extraction and highlighting
- Quiz generation from notes
- Difficulty level adjustment
- Subject-specific formatting (science formulas, history timelines, etc.)
- Save and organize notes by subject
- Collaborative note sharing
- Spaced repetition review scheduling
- PDF and markdown export
- Image/diagram suggestions
- Glossary auto-generation
- Progress tracking per subject
- Search across all notes
- Student-friendly responsive design`
  },
  {
    id: 100,
    title: "AI Code Review Tool",
    category: "ai",
    emoji: "🔎",
    prompt: `Build an AI-powered code review assistant:

**Features:**
- Code input with syntax highlighting (multiple languages)
- AI-powered code review with suggestions
- Bug detection and potential issue flagging
- Performance optimization suggestions
- Security vulnerability scanning
- Code style and best practices checking
- Refactoring suggestions with before/after
- Complexity analysis (cyclomatic complexity)
- Documentation generation from code
- Code explanation in plain language
- Multiple language support (JS, Python, Java, Go, etc.)
- Review history and tracking
- Export review as PDF report
- Severity levels for issues (critical, warning, info)
- Developer-focused dark theme responsive design`
  },
];
