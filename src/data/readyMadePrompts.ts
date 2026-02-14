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

  // ===== NEW 100 PROMPTS (101-200) =====

  // === E-Commerce (7) ===
  {
    id: 101,
    title: "Luxury Watch Marketplace",
    category: "ecommerce",
    emoji: "⌚",
    prompt: `Build a luxury watch marketplace for authenticated pre-owned timepieces:

**Features:**
- Watch listings with 360° image viewer, certificate of authenticity upload
- Price comparison with market trends and historical prices
- Authentication verification workflow with expert review
- Escrow payment system for high-value transactions
- Seller reputation scoring with transaction history
- Watch condition grading system (mint, excellent, good, fair)
- Brand filtering (Rolex, Omega, Patek Philippe, Audemars Piguet, etc.)
- Watchlist alerts for price drops
- Insurance integration for shipped items
- Expert appraisal request feature
- Admin panel with fraud detection dashboard
- Responsive design with high-resolution image zoom`
  },
  {
    id: 102,
    title: "Pet Supplies Subscription",
    category: "ecommerce",
    emoji: "🐾",
    prompt: `Build a pet supplies subscription and e-commerce platform:

**Features:**
- Pet profile creation (species, breed, age, dietary needs, allergies)
- Personalized product recommendations based on pet profile
- Auto-replenishment subscriptions for food, treats, and supplies
- Vet-approved product badges and nutritional info
- Photo sharing community for pet owners
- Loyalty rewards program with pet milestones
- Same-day delivery scheduling
- Product bundles and seasonal boxes
- Vet consultation booking integration
- Admin dashboard with subscription analytics and churn prediction
- Mobile-responsive with cute pet-themed UI`
  },
  {
    id: 103,
    title: "Vintage Vinyl Record Shop",
    category: "ecommerce",
    emoji: "🎵",
    prompt: `Build an online vintage vinyl record marketplace:

**Features:**
- Record listings with Discogs-style grading (M, NM, VG+, VG, G)
- Audio preview clips for listed records
- Want-list management with availability notifications
- Genre deep-dive browsing (Jazz, Rock, Soul, Classical, Hip-Hop)
- Seller storefront with collection showcase
- Price guide integration with market value estimates
- Collection tracker and value calculator
- Trade/swap matching system between collectors
- Shipping calculator with fragile item handling
- Advanced search by artist, label, year, pressing country
- Admin moderation with counterfeit detection flags
- Retro-themed responsive design`
  },
  {
    id: 104,
    title: "Custom Furniture Builder",
    category: "ecommerce",
    emoji: "🪑",
    prompt: `Build a custom furniture design and ordering platform:

**Features:**
- 3D furniture configurator (choose wood type, dimensions, finish, fabric)
- Real-time price calculation based on customizations
- AR preview to visualize furniture in room (upload room photo)
- Material sample request system
- Artisan maker profiles with portfolio
- Production timeline tracking from order to delivery
- Customer review gallery with photos of delivered items
- Interior design consultation booking
- Room planning tool with furniture placement
- Sustainable materials certification badges
- Admin panel with production queue and material inventory
- Elegant responsive design with product visualizations`
  },
  {
    id: 105,
    title: "Farm-to-Table Marketplace",
    category: "ecommerce",
    emoji: "🌾",
    prompt: `Build a farm-to-table local produce marketplace:

**Features:**
- Farmer profiles with farm location, certifications, farming practices
- Seasonal produce availability calendar
- Community Supported Agriculture (CSA) box subscriptions
- Farm visit and event booking
- Real-time harvest updates from farmers
- Delivery route optimization for local delivery
- Recipe suggestions based on available seasonal produce
- Carbon footprint calculator per order
- Bulk ordering for restaurants with wholesale pricing
- Customer reviews and farm ratings
- Admin dashboard with farmer verification and quality control
- Fresh, organic-themed responsive design`
  },
  {
    id: 106,
    title: "Sneaker Resale Platform",
    category: "ecommerce",
    emoji: "👟",
    prompt: `Build a sneaker authentication and resale marketplace:

**Features:**
- AI-powered authenticity verification with photo upload
- Real-time market price tracking per model/size
- Bid/ask trading system like StockX
- Sneaker portfolio value tracker
- Release calendar with drop notifications
- Size conversion chart (US, UK, EU, JP)
- Seller payout management with instant cash-out
- Condition grading with detailed photo requirements
- Trending sneaker charts and price history graphs
- Push notification for price movements on watched items
- Admin panel with authentication queue and dispute resolution
- Streetwear-inspired dark theme responsive design`
  },
  {
    id: 107,
    title: "Art Commission Platform",
    category: "ecommerce",
    emoji: "🖼️",
    prompt: `Build an art commission marketplace connecting artists with clients:

**Features:**
- Artist portfolio with style showcase and commission pricing tiers
- Commission request form with reference images, style preferences
- Milestone-based payment system (sketch approval → lineart → final)
- Real-time progress sharing with revision rounds
- Artist availability calendar and queue management
- Client review and rating system
- Style matching AI that suggests artists based on description
- Digital download delivery with licensing terms
- Print-on-demand integration for physical prints
- Dispute resolution system
- Admin panel with artist verification and quality curation
- Gallery-inspired responsive design`
  },

  // === Social Media (7) ===
  {
    id: 108,
    title: "Language Exchange Social Network",
    category: "social",
    emoji: "🌐",
    prompt: `Build a language exchange social platform:

**Features:**
- User profiles with native language, learning languages, proficiency levels
- Smart matching algorithm pairing native speakers with learners
- Video/voice call integration for conversation practice
- Text chat with built-in translation and grammar correction
- Flashcard sharing between partners
- Progress tracking with CEFR level milestones
- Cultural exchange forum with discussion threads
- Language challenge events and group sessions
- Speaking time balance tracker (fair exchange)
- Pronunciation feedback with speech recognition
- Admin panel with user verification and report management
- Multi-lingual responsive UI`
  },
  {
    id: 109,
    title: "Neighborhood Community App",
    category: "social",
    emoji: "🏘️",
    prompt: `Build a neighborhood community social platform:

**Features:**
- Geo-fenced community groups based on residential area
- Bulletin board for local announcements and events
- Buy/sell/trade board for neighbors
- Lost & found pet alerts with photo and location
- Service provider recommendations (plumber, electrician, babysitter)
- Community polls and voting on local issues
- Emergency alerts and safety notifications
- Carpool coordination for school and commute
- Gardening/composting sharing programs
- Noise and issue reporting with resolution tracking
- Admin tools for community moderation and verification
- Map-centric responsive design`
  },
  {
    id: 110,
    title: "Creative Writing Community",
    category: "social",
    emoji: "✍️",
    prompt: `Build a creative writing social platform:

**Features:**
- Story publishing with chapters, genres, and tags
- Rich text editor with formatting and inline images
- Reading lists and bookshelf organization
- Comment system with inline annotations on paragraphs
- Writing challenges with community voting
- Collaborative writing rooms (real-time co-authoring)
- Writer analytics (reads, engagement, follower growth)
- Beta reader matching system
- Writing prompt generator with daily challenges
- Genre leaderboards and featured stories
- Admin panel with content moderation and featured picks
- Book-themed elegant responsive design`
  },
  {
    id: 111,
    title: "Fitness Social Network",
    category: "social",
    emoji: "💪",
    prompt: `Build a fitness-focused social platform:

**Features:**
- Workout logging with exercise library and custom routines
- Progress photo timeline with body composition tracking
- Workout sharing feed with likes, comments, and form tips
- Challenge creation (30-day abs, running milestones)
- Gym buddy matching by location and fitness level
- Leaderboards for various fitness metrics
- Trainer profiles with client management
- Meal prep sharing with macro breakdowns
- Transformation stories showcase
- Exercise form check video sharing
- Admin dashboard with content moderation
- Energetic, motivational responsive design`
  },
  {
    id: 112,
    title: "Plant Parent Community",
    category: "social",
    emoji: "🪴",
    prompt: `Build a plant care and trading social platform:

**Features:**
- Plant collection gallery with species identification
- Care schedule reminders (watering, fertilizing, repotting)
- Plant identification from photo upload (AI-powered)
- Plant swap/trade system with local matching
- Growth progress journals with photo timelines
- Community Q&A for plant care troubleshooting
- Local plant shop and nursery directory
- Propagation guides and tutorial sharing
- Rare plant marketplace with verified sellers
- Seasonal care guides by climate zone
- Admin panel with community moderation
- Nature-inspired green responsive design`
  },
  {
    id: 113,
    title: "Podcast Community Platform",
    category: "social",
    emoji: "🎙️",
    prompt: `Build a podcast discovery and discussion social platform:

**Features:**
- Podcast directory with genre browsing and search
- Episode discussion threads with timestamp-linked comments
- Clip sharing (highlight 30-60 second segments)
- Listening lists and queue management
- Podcast rating and review system
- Host/creator profiles with episode analytics
- Live listening parties with synchronized playback
- Recommendation engine based on listening history
- Transcription search across episodes
- Guest booking marketplace for podcasters
- Admin panel with podcast verification
- Audio-focused dark theme responsive design`
  },
  {
    id: 114,
    title: "Travel Story Sharing Platform",
    category: "social",
    emoji: "🗺️",
    prompt: `Build a travel story and itinerary sharing social platform:

**Features:**
- Trip story creation with photos, maps, and day-by-day itineraries
- Interactive trip map with pinned locations and routes
- Budget breakdown sharing per trip
- Packing list templates and sharing
- Local tips and hidden gem recommendations
- Travel buddy matching by destination and dates
- Country/city guides crowdsourced from travelers
- Photo contests for best travel shots
- Trip planning collaboration tools
- Follow travelers with similar interests
- Admin panel with content moderation and featured trips
- Map-centric wanderlust responsive design`
  },

  // === Education (7) ===
  {
    id: 115,
    title: "Interactive Math Tutor",
    category: "education",
    emoji: "🧮",
    prompt: `Build an interactive math tutoring platform:

**Features:**
- Step-by-step problem solving with visual explanations
- Handwriting recognition for math input (draw equations)
- Adaptive difficulty based on student performance
- Topic tree covering arithmetic through calculus
- Practice problem generator with infinite variations
- Mistake analysis showing common error patterns
- Virtual whiteboard for teacher-student sessions
- Progress reports with skill gap identification
- Gamification with math badges and streaks
- Parent dashboard with child's progress overview
- Graphing calculator integration
- Admin panel with curriculum management
- Clean, distraction-free responsive learning UI`
  },
  {
    id: 116,
    title: "Virtual Science Lab",
    category: "education",
    emoji: "🔬",
    prompt: `Build a virtual science laboratory simulation platform:

**Features:**
- Physics simulations (pendulum, circuits, optics, mechanics)
- Chemistry lab with virtual mixing, reactions, and safety protocols
- Biology dissection and cell exploration simulations
- Experiment procedure builder with hypothesis tracking
- Data collection and graphing tools
- Lab report generator with proper scientific format
- Pre-lab quizzes and post-lab assessments
- Safety training modules
- Teacher dashboard to assign and grade experiments
- Collaborative lab sessions for group work
- Admin panel with simulation management
- Scientific, professional responsive UI`
  },
  {
    id: 117,
    title: "Language Learning RPG",
    category: "education",
    emoji: "🗡️",
    prompt: `Build a gamified language learning platform with RPG elements:

**Features:**
- Character creation with avatar customization
- Language quests organized by difficulty levels (villages to castles)
- Vocabulary battles (word combat system)
- Grammar dungeons with puzzle-based learning
- NPC conversations for speaking practice
- Party system for group learning challenges
- Experience points, leveling, and skill trees
- Daily quest system with streak rewards
- Boss battles (comprehensive tests)
- Leaderboards and guild rankings
- Multiple language support (Japanese, Korean, Spanish, French)
- Admin panel with content and quest management
- Fantasy RPG-themed responsive design`
  },
  {
    id: 118,
    title: "Music Theory Trainer",
    category: "education",
    emoji: "🎼",
    prompt: `Build an interactive music theory learning platform:

**Features:**
- Interactive piano/guitar keyboard for note identification
- Ear training exercises (intervals, chords, scales)
- Rhythm practice with metronome and beat counting
- Music notation reader and writer
- Chord progression builder with audio playback
- Scale and mode explorer with fingering charts
- Composition exercises with theory constraints
- Progress tracking across all theory topics
- Practice session timer with daily goals
- Theory quiz generator with instant feedback
- Integration with MIDI controllers
- Admin panel with lesson management
- Musical, elegant responsive design`
  },
  {
    id: 119,
    title: "Debate Practice Platform",
    category: "education",
    emoji: "🎤",
    prompt: `Build a debate practice and tournament platform:

**Features:**
- Topic database with pro/con argument banks
- Timed debate rounds with speech timer
- AI opponent for practice sessions
- Tournament bracket creation and management
- Judge scoring system with criteria rubrics
- Video recording of practice sessions with playback
- Research tools with source citation management
- Argument strength analyzer
- Community voting on debate topics
- Debate club management tools
- Performance analytics and improvement tracking
- Admin panel with tournament oversight
- Professional, academic responsive design`
  },
  {
    id: 120,
    title: "History Timeline Explorer",
    category: "education",
    emoji: "📜",
    prompt: `Build an interactive history timeline exploration platform:

**Features:**
- Zoomable timeline spanning from ancient history to modern era
- Interactive map showing historical events geographically
- Event cards with primary sources, images, and context
- Cause-and-effect chain visualization between events
- Compare timelines across different civilizations
- Quiz mode testing chronological knowledge
- User-created timeline sharing
- Historical figure biography explorer
- "This day in history" daily feature
- Source credibility rating system
- Collaborative annotation on events
- Admin panel with content curation
- Vintage map-inspired responsive design`
  },
  {
    id: 121,
    title: "Coding Bootcamp Platform",
    category: "education",
    emoji: "👨‍💻",
    prompt: `Build a self-paced coding bootcamp platform:

**Features:**
- Structured learning paths (Frontend, Backend, Full-Stack, Data Science)
- In-browser code editor with live preview
- Project-based curriculum with milestone submissions
- Automated code grading with test suites
- Peer code review system
- Mock interview preparation with coding challenges
- Portfolio builder from completed projects
- Mentor matching and 1-on-1 session booking
- Job board integration for graduates
- Community forum with topic-specific channels
- Certificate and badge system
- Admin panel with curriculum management and student tracking
- Developer-focused dark mode responsive design`
  },

  // === Health & Fitness (7) ===
  {
    id: 122,
    title: "Mental Health Journal",
    category: "health",
    emoji: "🧠",
    prompt: `Build a mental health journaling and mood tracking application:

**Features:**
- Daily mood check-in with emotion wheel selection
- Guided journaling prompts based on CBT techniques
- Mood pattern visualization over time (charts, heatmaps)
- Anxiety and stress level tracking
- Breathing exercises with guided animations
- Sleep quality logging and analysis
- Gratitude journal section
- Trigger identification and coping strategy database
- Therapist sharing (export journal entries securely)
- Crisis resources and helpline quick access
- Medication reminder integration
- Admin panel with content management
- Calming, accessible responsive design with soft colors`
  },
  {
    id: 123,
    title: "Yoga & Meditation Studio",
    category: "health",
    emoji: "🧘",
    prompt: `Build an online yoga and meditation studio platform:

**Features:**
- Video class library organized by style (Vinyasa, Hatha, Yin, Kundalini)
- Live class streaming with instructor interaction
- Meditation timer with ambient sounds (rain, bowls, forest)
- Personalized practice recommendations based on goals
- 30-day challenge programs
- Progress tracking (flexibility, mindfulness minutes, streak)
- Instructor profiles with specialization and certifications
- Community forum for practice discussions
- Class scheduling and reminder system
- Subscription tiers (free, premium, unlimited)
- Admin panel with class and instructor management
- Zen, minimalist responsive design`
  },
  {
    id: 124,
    title: "Nutrition Macro Tracker",
    category: "health",
    emoji: "🥗",
    prompt: `Build a comprehensive nutrition and macro tracking application:

**Features:**
- Food database with barcode scanner integration
- Meal logging with portion size estimation
- Macro breakdown (protein, carbs, fat) with daily goals
- Micronutrient tracking (vitamins, minerals)
- Meal prep planning with grocery list generation
- Recipe database with nutritional analysis
- Custom diet plan support (keto, vegan, paleo, IF)
- Water intake tracking with reminders
- Weight and body measurement logging
- Progress photos with side-by-side comparison
- AI meal suggestions to hit remaining macros
- Admin panel with food database management
- Clean, health-focused responsive design`
  },
  {
    id: 125,
    title: "Physical Therapy Tracker",
    category: "health",
    emoji: "🏥",
    prompt: `Build a physical therapy exercise and recovery tracking platform:

**Features:**
- Exercise library with video demonstrations and proper form guides
- Custom rehab program builder for therapists
- Pain level tracking with body map visualization
- Range of motion measurement logging
- Session notes and progress documentation
- Patient-therapist secure messaging
- Appointment scheduling and reminders
- Exercise completion tracking with adherence reports
- Insurance and billing integration
- Home exercise program (HEP) sharing
- Recovery milestone celebrations
- Admin panel with patient and therapist management
- Medical-professional responsive design`
  },
  {
    id: 126,
    title: "Running Training App",
    category: "health",
    emoji: "🏃",
    prompt: `Build a running training and race preparation platform:

**Features:**
- Training plan generator (5K, 10K, half marathon, marathon)
- GPS route tracking with pace, distance, elevation
- Run logging with weather and terrain conditions
- Interval and tempo workout builder
- Race calendar with registration links
- Personal records tracking and milestones
- Running shoe mileage tracker
- Heart rate zone training guides
- Social running groups and challenges
- Post-run analytics with split times
- Injury prevention tips and stretching routines
- Admin panel with race and content management
- Energetic, athletic responsive design`
  },
  {
    id: 127,
    title: "Sleep Optimization App",
    category: "health",
    emoji: "😴",
    prompt: `Build a sleep tracking and optimization application:

**Features:**
- Sleep logging with bedtime/wake time, quality rating
- Sleep stage estimation and analysis
- Sleep environment optimization tips
- Bedtime routine builder with reminders
- Sleep debt calculator
- Dream journal integration
- White noise and sleep sound library
- Smart alarm (wake during light sleep window)
- Caffeine and screen time impact tracking
- Weekly and monthly sleep reports
- Sleep hygiene education modules
- Admin panel with content management
- Relaxing, dark-mode-first responsive design`
  },
  {
    id: 128,
    title: "Allergy Management App",
    category: "health",
    emoji: "🤧",
    prompt: `Build an allergy tracking and management application:

**Features:**
- Allergen profile with known allergies and sensitivities
- Daily symptom logging with severity tracking
- Pollen count and air quality dashboard by location
- Food diary with ingredient scanning
- Medication tracking with dosage reminders
- Allergy-safe restaurant finder
- Emergency action plan storage (EpiPen instructions)
- Doctor appointment tracking and visit notes
- Seasonal allergy forecast notifications
- Community tips for managing specific allergies
- Emergency contact quick-dial
- Admin panel with allergen database management
- Clean, medical-professional responsive design`
  },

  // === Finance (7) ===
  {
    id: 129,
    title: "Freelancer Invoice Manager",
    category: "finance",
    emoji: "📋",
    prompt: `Build a freelancer invoicing and financial management platform:

**Features:**
- Professional invoice template builder with branding
- Recurring invoice automation
- Time tracking integration with hourly billing
- Expense categorization and receipt scanning
- Client management with payment history
- Tax estimation and quarterly payment reminders
- Multiple currency support
- Payment gateway integration (Stripe, PayPal)
- Overdue payment reminders and follow-ups
- Annual income and expense reports
- Profit and loss statements
- Contract and proposal template library
- Admin panel with system configuration
- Professional, minimal responsive design`
  },
  {
    id: 130,
    title: "Cryptocurrency Portfolio Tracker",
    category: "finance",
    emoji: "₿",
    prompt: `Build a cryptocurrency portfolio tracking and analytics platform:

**Features:**
- Multi-exchange portfolio aggregation
- Real-time price tracking with customizable watchlists
- Profit/loss calculation with cost basis methods (FIFO, LIFO)
- Tax report generation for crypto transactions
- Price alert system with push notifications
- DeFi position tracking (staking, lending, LP)
- NFT collection valuation
- Market sentiment analysis dashboard
- Portfolio allocation pie charts and rebalancing suggestions
- Historical performance charts with benchmarks
- News aggregation for tracked assets
- Admin panel with exchange integration management
- Dark-mode crypto-themed responsive design`
  },
  {
    id: 131,
    title: "Family Budget Planner",
    category: "finance",
    emoji: "👨‍👩‍👧‍👦",
    prompt: `Build a family budget planning and financial goal application:

**Features:**
- Shared family budget with member contributions
- Envelope budgeting system with visual envelopes
- Savings goal tracker with progress animations
- Bill calendar with due date reminders
- Allowance management for children
- Subscription tracker with cancellation recommendations
- Net worth calculator with asset tracking
- Financial milestone celebrations
- Comparison shopping tool for big purchases
- Emergency fund progress tracker
- Family meeting agenda generator for budget reviews
- Admin panel for family account management
- Friendly, family-oriented responsive design`
  },
  {
    id: 132,
    title: "Stock Market Simulator",
    category: "finance",
    emoji: "📈",
    prompt: `Build a stock market trading simulator for learning:

**Features:**
- Virtual portfolio with play money ($100K starting balance)
- Real-time stock data with charts (candlestick, line, volume)
- Buy/sell/short selling simulation
- Options trading simulator
- Portfolio performance vs S&P 500 benchmark
- Trading journal with strategy notes
- Leaderboard for top performers
- Educational modules on trading strategies
- Risk assessment tools
- Dividend tracking and reinvestment
- News feed integration for market events
- Admin panel with simulation and user management
- Financial terminal-inspired responsive design`
  },
  {
    id: 133,
    title: "Debt Payoff Planner",
    category: "finance",
    emoji: "💳",
    prompt: `Build a debt payoff strategy and tracking application:

**Features:**
- Debt inventory with balances, rates, and minimum payments
- Payoff strategy comparison (avalanche vs snowball vs hybrid)
- Payoff timeline calculator with extra payment scenarios
- Visual debt-free countdown timer
- Payment scheduling with bank integration
- Interest saved calculator
- Milestone celebrations as debts are paid off
- Motivational progress charts and graphs
- Refinancing opportunity alerts
- Credit score impact estimation
- Community success stories
- Admin panel with financial resource management
- Motivational, progress-focused responsive design`
  },
  {
    id: 134,
    title: "Expense Splitting App",
    category: "finance",
    emoji: "🤝",
    prompt: `Build a group expense splitting and settlement application:

**Features:**
- Group creation for trips, roommates, events
- Expense logging with receipt photo upload
- Smart splitting (equal, percentage, exact amounts, shares)
- Running balance between all group members
- Optimal settlement calculation (minimize transactions)
- Payment recording and confirmation
- Expense categories and spending analytics per group
- Recurring expense support (rent, utilities)
- Multi-currency support with auto conversion
- Export expense reports as PDF/CSV
- Push notifications for new expenses and settlements
- Admin panel with user management
- Clean, intuitive responsive design`
  },
  {
    id: 135,
    title: "Retirement Planning Calculator",
    category: "finance",
    emoji: "🏖️",
    prompt: `Build a comprehensive retirement planning and projection tool:

**Features:**
- Current financial snapshot input (savings, investments, debts)
- Retirement goal calculator (target age, lifestyle, location)
- Monte Carlo simulation for portfolio projections
- Social Security benefit estimator
- 401k/IRA contribution optimizer
- Healthcare cost projections
- Inflation-adjusted spending calculator
- Withdrawal strategy comparison (4% rule, bucket, guardrails)
- Tax-efficient withdrawal sequencing
- Part-time income scenario modeling
- Visual timeline from now to retirement
- Admin panel with financial model configuration
- Trust-inspiring, professional responsive design`
  },

  // === Productivity (7) ===
  {
    id: 136,
    title: "OKR Tracking System",
    category: "productivity",
    emoji: "🎯",
    prompt: `Build an OKR (Objectives and Key Results) tracking platform:

**Features:**
- Company, team, and individual OKR creation
- Key result progress tracking with percentage completion
- OKR alignment visualization (cascading goals)
- Check-in scheduling with progress updates
- Scoring system (0.0 to 1.0 scale)
- Quarterly planning and review workflows
- Team dashboard with aggregate progress
- Historical OKR archive and reflection
- Integration with project management tools
- Automated progress reminders
- Analytics on goal completion rates
- Admin panel with organizational structure management
- Clean, focused professional responsive design`
  },
  {
    id: 137,
    title: "Meeting Notes Manager",
    category: "productivity",
    emoji: "📝",
    prompt: `Build a smart meeting notes and action item tracking application:

**Features:**
- Meeting template library (standup, retrospective, 1:1, brainstorm)
- Real-time collaborative note-taking
- Action item extraction with assignee and deadline
- Meeting agenda builder with time allocations
- Automatic meeting summary generation
- Action item tracking across all meetings
- Integration with calendar for scheduling
- Meeting effectiveness scoring
- Follow-up reminder automation
- Searchable meeting archive
- Attendee participation tracking
- Admin panel with template and team management
- Distraction-free, minimal responsive design`
  },
  {
    id: 138,
    title: "Habit Tracker Pro",
    category: "productivity",
    emoji: "📊",
    prompt: `Build an advanced habit tracking and behavior change application:

**Features:**
- Habit creation with frequency, time, and cue settings
- Streak tracking with visual calendar heatmap
- Habit stacking and routine builder
- Accountability partner matching
- Progress analytics with completion rate trends
- Habit category organization (health, learning, mindfulness)
- Morning and evening routine checklists
- Missed habit reflection prompts
- Scientific habit formation tips
- Weekly and monthly review reports
- Gamification with levels and achievement badges
- Admin panel with content and challenge management
- Motivational, clean responsive design`
  },
  {
    id: 139,
    title: "Personal Knowledge Base",
    category: "productivity",
    emoji: "🧠",
    prompt: `Build a personal knowledge management system (second brain):

**Features:**
- Note creation with bi-directional linking (wiki-style)
- Knowledge graph visualization of connected notes
- Daily notes and fleeting thoughts capture
- Tagging system with tag-based exploration
- Full-text search across all notes
- Web clipper for saving articles and snippets
- Templates for different note types (book notes, meeting, project)
- Spaced repetition review for important concepts
- PDF and image annotation
- Export to markdown, PDF, HTML
- Offline support with sync
- Admin panel for user and storage management
- Notion-inspired clean responsive design`
  },
  {
    id: 140,
    title: "Time Blocking Planner",
    category: "productivity",
    emoji: "⏰",
    prompt: `Build a time blocking and deep work planning application:

**Features:**
- Visual day planner with drag-and-drop time blocks
- Color-coded block categories (deep work, meetings, admin, personal)
- Focus timer with Pomodoro and custom intervals
- Daily and weekly time block templates
- Time tracking with automatic categorization
- Distraction blocker integration suggestions
- Energy level tracking to optimize block placement
- Weekly review with time allocation analysis
- Goal linking (connect blocks to larger objectives)
- Calendar integration for syncing commitments
- Productivity score and trends
- Admin panel with workspace management
- Minimalist, focus-oriented responsive design`
  },
  {
    id: 141,
    title: "Remote Team Dashboard",
    category: "productivity",
    emoji: "🌍",
    prompt: `Build a remote team collaboration and status dashboard:

**Features:**
- Team timezone visualization with world clock
- Status updates (working, in meeting, away, deep focus)
- Async standup check-ins with daily updates
- Team availability calendar overlay
- Virtual water cooler / random coffee matching
- Project progress at-a-glance widgets
- Document collaboration links hub
- Meeting-free time finder across timezones
- Team celebrations and shout-outs board
- Work hours overlap calculator
- Communication preference profiles
- Admin panel with team and workspace management
- Modern, collaborative responsive design`
  },
  {
    id: 142,
    title: "Digital Declutter Tool",
    category: "productivity",
    emoji: "🧹",
    prompt: `Build a digital decluttering and organization application:

**Features:**
- Email subscription audit with one-click unsubscribe
- App usage audit with delete recommendations
- File duplicate finder and cleanup
- Cloud storage analyzer with size visualization
- Social media account cleanup checklist
- Password audit (weak, reused, compromised)
- Browser bookmark organizer
- Digital footprint assessment
- Photo library duplicate and blur detection
- Notification audit and optimization
- Monthly digital declutter challenge
- Admin panel with feature management
- Clean, spacious, calming responsive design`
  },

  // === Entertainment (7) ===
  {
    id: 143,
    title: "Movie Watchlist & Reviews",
    category: "entertainment",
    emoji: "🎬",
    prompt: `Build a movie discovery, watchlist, and review platform:

**Features:**
- Movie database with details (cast, crew, genre, runtime, ratings)
- Watchlist management with priority ordering
- Rating and detailed review system
- Movie recommendation engine based on taste profile
- Watch party scheduling with friends
- Streaming availability checker (Netflix, Disney+, etc.)
- Movie diary with watch date and mood logging
- Annual statistics (movies watched, genres, total hours)
- List creation and sharing (Best Sci-Fi, Comfort Movies, etc.)
- Spoiler-tagged discussion threads
- Award season prediction game
- Admin panel with movie database management
- Cinematic dark-theme responsive design`
  },
  {
    id: 144,
    title: "Board Game Companion",
    category: "entertainment",
    emoji: "🎲",
    prompt: `Build a board game companion and collection management app:

**Features:**
- Game collection catalog with BGG integration
- Score tracking for multiple game sessions
- Game night planner with RSVP and game voting
- Player statistics and win/loss records
- Game recommendation based on player count and preferences
- Rules quick-reference cards
- Timer and turn tracker for long games
- Trade/sell/lend tracking between friends
- New release alerts for wishlisted games
- Teaching guides for complex games
- House rules documentation
- Admin panel with game database management
- Playful, tabletop-inspired responsive design`
  },
  {
    id: 145,
    title: "Virtual Karaoke Platform",
    category: "entertainment",
    emoji: "🎤",
    prompt: `Build an online karaoke and singing platform:

**Features:**
- Song library with lyrics display and backing tracks
- Real-time pitch detection and scoring
- Recording and playback of performances
- Duet mode for remote singing together
- Genre and decade browsing (Pop, Rock, K-Pop, Oldies)
- Performance sharing with community
- Karaoke room creation for private sessions
- Leaderboards and singing competitions
- Voice effects and filters
- Favorite songs and playlist creation
- Challenge friends to song battles
- Admin panel with song and content management
- Neon-lit karaoke bar responsive design`
  },
  {
    id: 146,
    title: "Trivia Quiz Platform",
    category: "entertainment",
    emoji: "❓",
    prompt: `Build a multiplayer trivia quiz platform:

**Features:**
- Quiz categories (Science, History, Pop Culture, Sports, Geography)
- Real-time multiplayer quiz rooms
- Question creation and submission by users
- Difficulty levels with adaptive questioning
- Daily quiz challenge with leaderboard
- Tournament brackets for competitive play
- Lifelines (50/50, skip, hint)
- Statistics dashboard (accuracy by category, streaks)
- Custom quiz creation for parties/events
- Image and video-based questions
- Achievement badges and XP system
- Admin panel with question review and moderation
- Fun, game-show-inspired responsive design`
  },
  {
    id: 147,
    title: "Meme Generator & Gallery",
    category: "entertainment",
    emoji: "😂",
    prompt: `Build a meme creation and sharing platform:

**Features:**
- Meme template library with popular formats
- Text overlay editor with font, size, and position controls
- Image upload for custom meme creation
- Meme feed with trending, new, and top sorting
- Upvote/downvote and comment system
- Meme collections and albums
- AI meme caption generator
- GIF meme support
- Watermark option for creators
- Share to social media integration
- Meme contest events
- Admin panel with content moderation
- Fun, meme-culture responsive design`
  },
  {
    id: 148,
    title: "Virtual Escape Room Builder",
    category: "entertainment",
    emoji: "🔐",
    prompt: `Build a virtual escape room creation and play platform:

**Features:**
- Room builder with puzzle creation tools (logic, cipher, visual)
- Multiple puzzle types (combination lock, jigsaw, riddle, hidden object)
- Room linking for multi-room adventures
- Hint system with progressive clues
- Timer with difficulty-based time limits
- Multiplayer support for team solving
- Leaderboards by room and completion time
- Room rating and review system
- Story/narrative wrapper for puzzles
- Creator analytics (plays, completion rate, average time)
- Seasonal themed rooms
- Admin panel with room moderation and quality control
- Mysterious, atmospheric responsive design`
  },
  {
    id: 149,
    title: "Interactive Fiction Engine",
    category: "entertainment",
    emoji: "📖",
    prompt: `Build an interactive fiction / choose-your-own-adventure platform:

**Features:**
- Story creation with branching narrative editor (node-based)
- Rich text with embedded images, sound, and character portraits
- Character stats and inventory system
- Decision tracking with story analytics
- Multiple endings with achievement system
- Community story sharing and browsing
- Reader bookmarking and save states
- Collaborative story writing
- Genre categorization (Fantasy, Sci-Fi, Romance, Mystery)
- Story length and branch complexity indicators
- Reader ratings and reviews
- Admin panel with content moderation
- Storybook-themed responsive design`
  },

  // === Food & Restaurant (7) ===
  {
    id: 150,
    title: "Recipe Social Network",
    category: "food",
    emoji: "👨‍🍳",
    prompt: `Build a recipe sharing and cooking social platform:

**Features:**
- Recipe publishing with step-by-step instructions and photos
- Ingredient list with auto-scaling for servings
- Cooking timer integration for each step
- Nutritional info auto-calculation
- Meal planning calendar with recipe scheduling
- Grocery list generation from selected recipes
- Community recipe ratings and reviews
- Cook-along mode with hands-free voice guidance
- Recipe collections and cookbooks
- Ingredient substitution suggestions
- Cooking technique video library
- Admin panel with recipe moderation
- Warm, kitchen-inspired responsive design`
  },
  {
    id: 151,
    title: "Food Truck Finder",
    category: "food",
    emoji: "🚚",
    prompt: `Build a food truck location and ordering platform:

**Features:**
- Real-time food truck map with current locations
- Menu browsing with photos and dietary filters
- Mobile pre-ordering for pickup
- Food truck schedule and route planning
- Customer reviews and ratings
- Favorite trucks with notification alerts
- Event booking for private catering
- Food truck owner dashboard (location updates, menu management)
- Push notifications when favorite trucks are nearby
- Festival and event listings with participating trucks
- Revenue analytics for truck owners
- Admin panel with truck verification and management
- Street food-themed vibrant responsive design`
  },
  {
    id: 152,
    title: "Wine & Spirits Cellar",
    category: "food",
    emoji: "🍷",
    prompt: `Build a wine and spirits collection management application:

**Features:**
- Bottle inventory with label photo scanning
- Tasting notes with aroma wheel and flavor profile
- Cellar organization (rack position, temperature zone)
- Drinking window recommendations
- Food pairing suggestions
- Price tracking and collection valuation
- Wine region explorer with interactive maps
- Vintage chart reference
- Wishlist with purchase alerts
- Social sharing of tasting notes
- Wine club and tasting event management
- Admin panel with wine database management
- Elegant, vineyard-inspired responsive design`
  },
  {
    id: 153,
    title: "Meal Kit Service Platform",
    category: "food",
    emoji: "📦",
    prompt: `Build a meal kit delivery service platform:

**Features:**
- Weekly menu selection with dietary customization
- Recipe cards with step-by-step instructions and videos
- Ingredient sourcing transparency (farm origins)
- Subscription management (pause, skip, change plan)
- Dietary preference profiles (vegan, gluten-free, keto)
- Calorie and macro information per meal
- Customer reviews and recipe ratings
- Delivery tracking with time slot selection
- Gift card and referral program
- Leftover recipe suggestions from extra ingredients
- Chef profiles and story behind each recipe
- Admin panel with menu planning and logistics
- Fresh, appetizing responsive design`
  },
  {
    id: 154,
    title: "Restaurant Table Reservation",
    category: "food",
    emoji: "🪑",
    prompt: `Build a restaurant table reservation and management system:

**Features:**
- Restaurant search with filters (cuisine, price, location, rating)
- Real-time table availability display
- Online reservation with party size, date, time
- Special requests and occasion notes
- Waitlist management with estimated wait times
- Table layout management for restaurant owners
- SMS/email confirmation and reminders
- Walk-in queue management
- Customer history and preferences for returning guests
- Peak hours analytics and demand forecasting
- Menu preview and pre-ordering
- Admin panel with multi-restaurant management
- Sophisticated dining-themed responsive design`
  },
  {
    id: 155,
    title: "Barista Coffee Guide",
    category: "food",
    emoji: "☕",
    prompt: `Build a coffee brewing guide and café discovery application:

**Features:**
- Brewing method guides (pour-over, espresso, French press, AeroPress)
- Bean database with origin, roast level, flavor notes
- Brew recipe calculator (ratio, grind, temperature, time)
- Local café directory with specialty drink menus
- Coffee tasting journal with flavor wheel
- Equipment reviews and recommendations
- Subscription coffee delivery matching
- Latte art tutorial library
- Barista certification progress tracking
- Community bean reviews and recommendations
- Coffee origin country explorer with maps
- Admin panel with café and bean database management
- Warm, coffeehouse-inspired responsive design`
  },
  {
    id: 156,
    title: "Dietary Restriction Restaurant Finder",
    category: "food",
    emoji: "🥜",
    prompt: `Build a restaurant finder specialized for dietary restrictions:

**Features:**
- Search by dietary need (celiac, nut allergy, vegan, halal, kosher)
- Menu item filtering with allergen warnings
- User-verified safe dishes at restaurants
- Allergy card generator in multiple languages
- Restaurant allergen training certification display
- Community reviews focused on dietary safety
- Chef Q&A for specific allergy concerns
- Cross-contamination risk ratings
- Emergency nearby hospital/pharmacy locator
- Travel mode for finding safe food abroad
- Restaurant partner program for verified menus
- Admin panel with restaurant verification
- Safe, trustworthy responsive design`
  },

  // === Travel (7) ===
  {
    id: 157,
    title: "Digital Nomad Hub",
    category: "travel",
    emoji: "💻",
    prompt: `Build a digital nomad destination guide and community platform:

**Features:**
- City profiles with cost of living, internet speed, safety scores
- Coworking space directory with reviews and pricing
- Visa requirement checker by nationality
- Monthly cost calculator per destination
- Community forums organized by city
- Coliving space listings and reviews
- Meetup events for nomads in each city
- Internet speed test aggregation and reliability ratings
- Tax implications guide by country
- Flight deal alerts between nomad-popular cities
- Weather and climate comparison tools
- Admin panel with city data and community management
- Wanderlust-inspiring responsive design`
  },
  {
    id: 158,
    title: "Road Trip Planner",
    category: "travel",
    emoji: "🚗",
    prompt: `Build a road trip planning and navigation companion:

**Features:**
- Route planning with multiple waypoints on interactive map
- Points of interest discovery along route (scenic, food, gas, rest)
- Fuel cost calculator with gas station pricing
- Drive time estimates with traffic consideration
- Hotel/camping spot booking along route
- Packing checklist generator based on trip type
- Trip budget tracker (gas, food, lodging, activities)
- Offline map download for areas without signal
- Photo journal tied to map locations
- Road trip game suggestions for passengers
- Vehicle maintenance checklist before departure
- Admin panel with POI and content management
- Adventure-themed responsive design`
  },
  {
    id: 159,
    title: "Cultural Experience Marketplace",
    category: "travel",
    emoji: "🎭",
    prompt: `Build a cultural experience and local tour booking platform:

**Features:**
- Experience listings (cooking classes, art tours, music workshops)
- Local host profiles with verification and reviews
- Small group size guarantees
- Instant and request booking options
- Multi-language experience offerings
- Experience gifting with custom greeting cards
- Weather-dependent alternative suggestions
- Accessibility information for each experience
- Cultural etiquette guides for travelers
- Photo and video reviews from past participants
- Seasonal and festival-based experience collections
- Admin panel with host verification and quality control
- Culturally rich responsive design`
  },
  {
    id: 160,
    title: "Airport Companion App",
    category: "travel",
    emoji: "✈️",
    prompt: `Build an airport navigation and services companion application:

**Features:**
- Airport terminal maps with indoor navigation
- Flight status tracking with delay notifications
- Gate change alerts with walking time estimates
- Lounge finder with access eligibility checker
- Restaurant and shop directory with reviews
- Duty-free price comparison
- Power outlet and WiFi spot locator
- TSA/security wait time estimates
- Parking spot reservation
- Ground transportation options comparison
- Currency exchange rate comparison within airport
- Admin panel with airport data management
- Travel-efficient responsive design`
  },
  {
    id: 161,
    title: "Sustainable Travel Guide",
    category: "travel",
    emoji: "🌱",
    prompt: `Build a sustainable and eco-friendly travel planning platform:

**Features:**
- Carbon footprint calculator for flights, trains, buses
- Eco-certified accommodation directory
- Sustainable tour operator listings
- Carbon offset purchasing integration
- Low-impact activity suggestions per destination
- Responsible wildlife tourism guidelines
- Plastic-free travel tips and packing guides
- Local community support initiatives
- Public transportation guides for each city
- Sustainable restaurant finder (farm-to-table, zero-waste)
- Travel impact dashboard for personal tracking
- Admin panel with certification verification
- Nature-inspired, green responsive design`
  },
  {
    id: 162,
    title: "Group Travel Organizer",
    category: "travel",
    emoji: "👥",
    prompt: `Build a group travel planning and coordination platform:

**Features:**
- Trip creation with itinerary collaboration
- Voting system for destinations, activities, restaurants
- Shared expense tracking with splitting
- Group chat with trip-specific channels
- Accommodation comparison and group booking
- Activity scheduling with preference matching
- Document sharing (passports, tickets, reservations)
- Countdown timer to trip date
- Packing list collaboration
- Photo album sharing after trip
- Task assignment for trip preparation
- Admin panel with trip and user management
- Fun, collaborative responsive design`
  },
  {
    id: 163,
    title: "Travel Insurance Comparison",
    category: "travel",
    emoji: "🛡️",
    prompt: `Build a travel insurance comparison and management platform:

**Features:**
- Trip details input for accurate quotes
- Side-by-side policy comparison
- Coverage breakdown (medical, cancellation, baggage, delays)
- Pre-existing condition coverage finder
- Adventure sports coverage options
- Family and group policy options
- Claim filing system with document upload
- Policy document storage and quick access
- Emergency assistance contact directory
- Travel advisory integration by destination
- Review system for insurance providers
- Admin panel with provider and policy management
- Trustworthy, professional responsive design`
  },

  // === Real Estate (7) ===
  {
    id: 164,
    title: "Property Management Dashboard",
    category: "realestate",
    emoji: "🏢",
    prompt: `Build a property management dashboard for landlords:

**Features:**
- Property portfolio overview with occupancy status
- Tenant management with lease tracking
- Rent collection with online payment portal
- Maintenance request system with priority and status
- Financial reporting (income, expenses, profit per property)
- Document storage (leases, insurance, inspections)
- Tenant communication portal
- Vacancy listing and application management
- Lease renewal reminders and automation
- Vendor management for repairs and services
- Property value tracking with market comparisons
- Admin panel with multi-property management
- Professional, dashboard-focused responsive design`
  },
  {
    id: 165,
    title: "Home Renovation Planner",
    category: "realestate",
    emoji: "🔨",
    prompt: `Build a home renovation planning and project management tool:

**Features:**
- Room-by-room project planning
- Budget tracker with cost estimates and actuals
- Contractor directory with reviews and quotes
- Before and after photo comparison
- Material selection with price comparisons
- Project timeline with Gantt chart visualization
- Permit requirement checklist by project type
- DIY tutorial library with difficulty ratings
- Inspiration gallery organized by room and style
- Shopping list aggregation across projects
- ROI calculator for renovation investments
- Admin panel with contractor and content management
- Home-improvement-themed responsive design`
  },
  {
    id: 166,
    title: "Real Estate Investment Analyzer",
    category: "realestate",
    emoji: "📊",
    prompt: `Build a real estate investment analysis platform:

**Features:**
- Property analysis calculator (cap rate, cash-on-cash, IRR)
- Rental income projections with vacancy assumptions
- Mortgage comparison with multiple scenarios
- Neighborhood data analysis (crime, schools, amenities)
- Comparable property analysis (comps)
- Portfolio tracking with total return calculations
- Market trend charts and forecasting
- 1031 exchange planning tool
- Property management expense estimation
- Tax benefit calculator (depreciation, deductions)
- Investment property report generation
- Admin panel with market data management
- Data-driven, analytical responsive design`
  },
  {
    id: 167,
    title: "Roommate Matching Platform",
    category: "realestate",
    emoji: "🤝",
    prompt: `Build a roommate matching and shared housing platform:

**Features:**
- Detailed profile with lifestyle preferences (sleep, cleanliness, pets, noise)
- Compatibility scoring algorithm
- Room/apartment listing with virtual tour photos
- Budget range matching
- Lease term preference matching
- In-app messaging for potential matches
- Roommate agreement template builder
- Shared expense setup integration
- House rules preference quiz
- Safety features (background check integration, verified profiles)
- University/college housing specific mode
- Admin panel with user verification and moderation
- Friendly, approachable responsive design`
  },
  {
    id: 168,
    title: "Vacation Rental Manager",
    category: "realestate",
    emoji: "🏖️",
    prompt: `Build a vacation rental property management platform:

**Features:**
- Multi-platform listing sync (Airbnb, VRBO, Booking.com)
- Unified calendar with availability management
- Dynamic pricing engine based on demand and season
- Automated guest communication templates
- Check-in/check-out instruction automation
- Cleaning schedule coordination with service providers
- Review management across platforms
- Revenue reporting and tax document generation
- Guest screening and verification
- Maintenance scheduling between bookings
- Smart lock integration for keyless entry
- Admin panel with property and booking management
- Hospitality-themed professional responsive design`
  },
  {
    id: 169,
    title: "Construction Project Tracker",
    category: "realestate",
    emoji: "🏗️",
    prompt: `Build a construction project tracking and management platform:

**Features:**
- Project phases with milestone tracking
- Daily progress logs with photo documentation
- Budget tracking with change order management
- Subcontractor management and scheduling
- Material ordering and delivery tracking
- Inspection scheduling and compliance checklist
- Blueprint and document version management
- Weather delay impact assessment
- Safety incident reporting
- Client portal for progress updates
- Punch list management for project completion
- Admin panel with multi-project oversight
- Industrial, professional responsive design`
  },
  {
    id: 170,
    title: "Smart Home Dashboard",
    category: "realestate",
    emoji: "🏠",
    prompt: `Build a smart home device management dashboard:

**Features:**
- Device discovery and registration
- Room-by-room device organization
- Scene creation (movie night, good morning, away mode)
- Automation rules builder (if this, then that)
- Energy consumption monitoring with cost estimates
- Temperature and thermostat control
- Security camera feed viewing
- Door lock status and control
- Light dimming and color control
- Usage analytics and energy saving recommendations
- Voice command integration
- Admin panel with device and user management
- Futuristic, smart-home responsive design`
  },

  // === CRM & Business (7) ===
  {
    id: 171,
    title: "Client Onboarding System",
    category: "crm",
    emoji: "🎯",
    prompt: `Build a client onboarding and project kickoff platform:

**Features:**
- Customizable onboarding checklist templates
- Welcome packet generation with branding
- Document collection and e-signature integration
- Client questionnaire builder
- Onboarding progress tracking per client
- Automated welcome email sequences
- Team member introduction and role assignment
- Kickoff meeting scheduler with agenda template
- Knowledge base with FAQ for new clients
- Client portal with onboarding status
- SLA setup and milestone definitions
- Admin panel with template and workflow management
- Professional, welcoming responsive design`
  },
  {
    id: 172,
    title: "Sales Pipeline Manager",
    category: "crm",
    emoji: "🔄",
    prompt: `Build a visual sales pipeline and deal management platform:

**Features:**
- Kanban board with customizable deal stages
- Deal card with value, probability, and close date
- Drag-and-drop deal movement between stages
- Revenue forecasting based on pipeline
- Activity logging (calls, emails, meetings)
- Contact and company management
- Email template library with merge fields
- Task and follow-up reminders
- Win/loss analysis with reason tracking
- Sales rep performance dashboard
- Custom pipeline creation per product line
- Admin panel with team and pipeline management
- Sales-focused, data-rich responsive design`
  },
  {
    id: 173,
    title: "Customer Feedback Hub",
    category: "crm",
    emoji: "💬",
    prompt: `Build a customer feedback collection and analysis platform:

**Features:**
- Multi-channel feedback collection (email, in-app, QR code, link)
- NPS, CSAT, and CES survey builders
- Sentiment analysis on text feedback
- Feature request board with voting
- Bug report management with status tracking
- Feedback categorization and tagging
- Response management with SLA tracking
- Trends dashboard with satisfaction over time
- Integration with support ticket systems
- Customer journey touchpoint mapping
- Automated feedback request triggers
- Admin panel with survey and response management
- Customer-centric responsive design`
  },
  {
    id: 174,
    title: "HR Employee Portal",
    category: "crm",
    emoji: "👥",
    prompt: `Build an HR employee self-service portal:

**Features:**
- Employee directory with org chart visualization
- Leave request and approval workflow
- Timesheet management with project allocation
- Pay stub and tax document access
- Benefits enrollment and management
- Company policy and handbook library
- Performance review cycle management
- Training and certification tracking
- Expense report submission and approval
- Employee onboarding checklist
- Announcement and company news feed
- Admin panel with HR management tools
- Corporate, professional responsive design`
  },
  {
    id: 175,
    title: "Event Management Platform",
    category: "crm",
    emoji: "🎪",
    prompt: `Build a comprehensive event management and ticketing platform:

**Features:**
- Event creation with multi-day and multi-track support
- Ticket types (early bird, VIP, group, student)
- Seating chart designer for assigned seating
- Attendee registration with custom form fields
- Check-in system with QR code scanning
- Speaker/performer management and scheduling
- Sponsor management with tier levels
- Email campaign builder for attendees
- Event analytics (registrations, check-ins, revenue)
- Post-event survey integration
- Badge and certificate generation
- Admin panel with multi-event management
- Event-branded responsive design`
  },
  {
    id: 176,
    title: "Inventory Management System",
    category: "crm",
    emoji: "📦",
    prompt: `Build a comprehensive inventory management system:

**Features:**
- Product catalog with SKU, barcode, and image management
- Stock level tracking with low-stock alerts
- Multi-warehouse/location management
- Purchase order creation and tracking
- Supplier management with lead time tracking
- Batch/lot tracking with expiration dates
- Stock transfer between locations
- Cycle counting and stock adjustment
- Inventory valuation (FIFO, LIFO, weighted average)
- Barcode scanning for quick operations
- Report generation (stock aging, turnover, reorder)
- Admin panel with warehouse and user management
- Industrial, efficient responsive design`
  },
  {
    id: 177,
    title: "Appointment Booking System",
    category: "crm",
    emoji: "📅",
    prompt: `Build a versatile appointment booking and scheduling system:

**Features:**
- Service catalog with duration and pricing
- Staff management with individual availability calendars
- Online booking widget embeddable on websites
- Calendar view with day, week, and month layouts
- Automated email and SMS reminders
- Buffer time configuration between appointments
- Group booking and class scheduling
- Recurring appointment support
- Waitlist management
- No-show tracking and cancellation policies
- Payment collection at booking
- Admin panel with multi-location management
- Professional, calendar-focused responsive design`
  },

  // === Portfolio & Blog (7) ===
  {
    id: 178,
    title: "Developer Portfolio Builder",
    category: "portfolio",
    emoji: "💻",
    prompt: `Build a developer portfolio generator and hosting platform:

**Features:**
- GitHub integration for project import
- Multiple portfolio themes and templates
- Project showcase with live demo links and tech stack tags
- Blog section with markdown editor
- Skills visualization (charts, progress bars, tag clouds)
- Work experience timeline
- Testimonial section with client quotes
- Contact form with spam protection
- Resume/CV download generation
- Analytics dashboard (page views, project clicks)
- Custom domain support
- Admin panel with theme and template management
- Developer-focused, modern responsive design`
  },
  {
    id: 179,
    title: "Photography Portfolio",
    category: "portfolio",
    emoji: "📸",
    prompt: `Build a photography portfolio and client gallery platform:

**Features:**
- Photo galleries with masonry/grid/slideshow layouts
- Client proofing galleries with selection and commenting
- EXIF data display (camera, lens, settings)
- Watermarking system for proofing
- Print ordering integration
- Photo categories and series organization
- Full-screen lightbox viewer
- Client login for private galleries
- Download permissions management
- Social media sharing integration
- SEO-optimized with Open Graph images
- Admin panel with gallery and client management
- Minimal, image-first responsive design`
  },
  {
    id: 180,
    title: "Newsletter Publishing Platform",
    category: "portfolio",
    emoji: "📧",
    prompt: `Build a newsletter creation and publishing platform:

**Features:**
- Rich text newsletter editor with templates
- Subscriber management with segmentation
- Scheduling and automated sending
- A/B testing for subject lines
- Analytics (open rate, click rate, unsubscribe rate)
- Free and paid newsletter tiers
- Subscriber growth analytics
- Archive of past newsletters with public access
- Referral program for subscriber growth
- Embeddable signup forms
- Integration with website/blog
- Admin panel with publisher and content management
- Editorial, clean responsive design`
  },
  {
    id: 181,
    title: "Podcast Hosting Platform",
    category: "portfolio",
    emoji: "🎧",
    prompt: `Build a podcast hosting and distribution platform:

**Features:**
- Episode upload with audio processing and optimization
- RSS feed generation for distribution (Apple, Spotify, Google)
- Episode page with show notes, transcript, and links
- Podcast analytics (downloads, listeners, geography)
- Website builder for podcast landing page
- Monetization tools (premium episodes, donations, sponsorships)
- Episode scheduling and auto-publish
- Guest management and booking
- Listener comments and reviews
- Chapter markers and timestamps
- Embeddable player widget
- Admin panel with podcast and analytics management
- Audio-focused, modern responsive design`
  },
  {
    id: 182,
    title: "Online Magazine Builder",
    category: "portfolio",
    emoji: "📰",
    prompt: `Build a digital magazine creation and publishing platform:

**Features:**
- Visual page layout editor (drag-and-drop)
- Article templates for different content types
- Cover design tool with image and typography
- Issue management with table of contents
- Multi-author collaboration with roles
- Reader subscription management
- Ad placement and sponsorship management
- Social sharing with article excerpts
- Print-ready PDF export
- Reader analytics per article and issue
- Archive browsing by issue/date
- Admin panel with editorial workflow management
- Magazine-quality typography responsive design`
  },
  {
    id: 183,
    title: "Recipe Blog Platform",
    category: "portfolio",
    emoji: "🍴",
    prompt: `Build a recipe blogging and food content platform:

**Features:**
- Recipe card format with structured data (schema.org)
- Step-by-step instructions with photos
- Nutritional information calculator
- Print-friendly recipe layout
- Recipe scaling for different serving sizes
- Ingredient shopping list export
- Search by ingredient, cuisine, dietary restriction
- Meal planning integration
- User recipe collections and favorites
- Rating and review system
- Video recipe support
- Admin panel with content management
- Food photography-focused responsive design`
  },
  {
    id: 184,
    title: "Artist Portfolio & Store",
    category: "portfolio",
    emoji: "🎨",
    prompt: `Build an artist portfolio with integrated online store:

**Features:**
- Gallery display with fullscreen viewing
- Series and collection organization
- Art print store with size and framing options
- Original artwork sales with certificate of authenticity
- Commission inquiry form
- Artist bio and exhibition history
- Press and media page
- Newsletter signup for new releases
- Instagram feed integration
- Collector account with purchase history
- Virtual exhibition walkthrough
- Admin panel with gallery and store management
- Gallery-quality responsive design`
  },

  // === Utility & Tools (7) ===
  {
    id: 185,
    title: "URL Shortener & Analytics",
    category: "utility",
    emoji: "🔗",
    prompt: `Build a URL shortener with comprehensive analytics:

**Features:**
- Custom short URL creation with vanity slugs
- Bulk URL shortening
- Click analytics (total, unique, over time)
- Geographic breakdown of clicks (country, city)
- Device and browser analytics
- Referrer tracking
- QR code generation for each short URL
- Link expiration and scheduling
- Password-protected links
- A/B testing with traffic splitting
- API access for programmatic use
- Admin panel with link and user management
- Data-driven, minimal responsive design`
  },
  {
    id: 186,
    title: "File Conversion Tool",
    category: "utility",
    emoji: "🔄",
    prompt: `Build a web-based file conversion utility platform:

**Features:**
- Image conversion (PNG, JPG, WebP, SVG, ICO)
- Document conversion (PDF, DOCX, TXT, Markdown)
- Video format conversion with compression options
- Audio format conversion (MP3, WAV, FLAC, OGG)
- Batch conversion support
- Drag-and-drop upload interface
- Conversion quality/size presets
- Preview before and after conversion
- Download history with re-download option
- API access for developers
- Client-side processing for privacy (where possible)
- Admin panel with usage analytics
- Clean, utility-focused responsive design`
  },
  {
    id: 187,
    title: "Color Palette Generator",
    category: "utility",
    emoji: "🎨",
    prompt: `Build a color palette generation and management tool:

**Features:**
- AI-powered palette generation from keywords or mood
- Extract colors from uploaded images
- Color harmony rules (complementary, analogous, triadic)
- Accessibility contrast checker (WCAG AA/AAA)
- Palette saving and collection management
- Export formats (CSS variables, Tailwind config, SCSS, JSON)
- Color blindness simulation preview
- Gradient generator with CSS output
- Brand color system builder
- Community palette sharing and trending
- Color naming and categorization
- Admin panel with content management
- Colorful, design-tool responsive design`
  },
  {
    id: 188,
    title: "Regex Builder & Tester",
    category: "utility",
    emoji: "🔍",
    prompt: `Build a visual regex pattern builder and tester:

**Features:**
- Visual regex construction with building blocks
- Real-time pattern testing against sample text
- Match highlighting with group extraction
- Regex explanation in plain language
- Common pattern library (email, phone, URL, date)
- Multiple regex flavors (JavaScript, Python, Go, Java)
- Regex cheat sheet reference
- Save and share regex patterns
- Substitution preview
- Performance benchmarking for patterns
- Step-by-step match debugging
- Admin panel with pattern library management
- Developer-focused dark theme responsive design`
  },
  {
    id: 189,
    title: "API Documentation Generator",
    category: "utility",
    emoji: "📄",
    prompt: `Build an API documentation creation and hosting platform:

**Features:**
- OpenAPI/Swagger spec import and editor
- Interactive API explorer with try-it-out requests
- Multiple documentation themes and layouts
- Code example generation in multiple languages
- Authentication setup guides
- Endpoint grouping and versioning
- Search across all endpoints
- Changelog management
- SDK generation links
- Rate limit and pricing tier documentation
- Custom domain support
- Admin panel with project and team management
- Developer-focused responsive documentation design`
  },
  {
    id: 190,
    title: "Screenshot & Mockup Tool",
    category: "utility",
    emoji: "📱",
    prompt: `Build a screenshot beautifier and device mockup generator:

**Features:**
- Upload screenshot and place in device frames (iPhone, MacBook, iPad)
- Background customization (gradients, images, patterns)
- Shadow and reflection effects
- Text and annotation overlay
- Browser frame mockup generator
- Social media post size templates
- Batch processing for multiple screenshots
- App store screenshot layout generator
- Custom watermark addition
- Export in multiple resolutions
- Template saving and reuse
- Admin panel with template management
- Design-tool responsive creative design`
  },
  {
    id: 191,
    title: "Markdown Editor & Preview",
    category: "utility",
    emoji: "📝",
    prompt: `Build a feature-rich markdown editor with live preview:

**Features:**
- Split-pane editor with live preview
- Syntax highlighting for code blocks
- Table editor with visual builder
- Image upload and embedding
- Document outline/table of contents generation
- Multiple export formats (HTML, PDF, DOCX)
- Custom CSS theme application to preview
- Vim and Emacs keybinding modes
- Collaborative editing with real-time sync
- Version history with diff viewer
- Template library for common document types
- Admin panel with user and storage management
- Distraction-free writing responsive design`
  },

  // === AI & ML (9) ===
  {
    id: 192,
    title: "AI Writing Assistant",
    category: "ai",
    emoji: "✍️",
    prompt: `Build an AI-powered writing assistant application:

**Features:**
- Document editor with AI-powered writing suggestions
- Tone adjustment (formal, casual, persuasive, academic)
- Grammar and spell checking with explanations
- Content expansion and summarization
- Plagiarism detection
- Readability scoring (Flesch-Kincaid)
- Multi-language translation
- SEO optimization suggestions for web content
- Writing templates (blog post, email, report, social media)
- Version history with AI suggestion tracking
- Word count and reading time estimation
- Admin panel with model and feature management
- Clean, writer-focused responsive design`
  },
  {
    id: 193,
    title: "AI Resume Builder",
    category: "ai",
    emoji: "📄",
    prompt: `Build an AI-powered resume and cover letter builder:

**Features:**
- Multiple professional resume templates
- AI content suggestions based on job title and experience
- Job description analyzer with skill matching
- Cover letter generator tailored to specific job postings
- ATS (Applicant Tracking System) optimization scoring
- Keyword optimization suggestions
- Multiple export formats (PDF, DOCX)
- LinkedIn profile import
- Portfolio link integration
- Reference management
- Interview preparation tips based on resume content
- Admin panel with template and AI model management
- Professional, career-focused responsive design`
  },
  {
    id: 194,
    title: "AI Data Visualization",
    category: "ai",
    emoji: "📊",
    prompt: `Build an AI-assisted data visualization and dashboard builder:

**Features:**
- CSV/JSON/API data source import
- AI-suggested chart types based on data patterns
- Natural language query to chart (ask questions about data)
- Drag-and-drop dashboard builder
- Multiple chart types (bar, line, pie, scatter, heatmap, treemap)
- Interactive filters and drill-down
- Dashboard sharing with embed codes
- Automated insight generation from data
- Anomaly detection highlighting
- Data transformation and pivot tools
- Scheduled report generation
- Admin panel with data source and user management
- Data-centric, analytical responsive design`
  },
  {
    id: 195,
    title: "AI Meeting Transcriber",
    category: "ai",
    emoji: "🎙️",
    prompt: `Build an AI-powered meeting transcription and analysis platform:

**Features:**
- Audio/video upload for transcription
- Real-time transcription during meetings
- Speaker diarization (identify who said what)
- Action item extraction with assignees
- Key topic and decision identification
- Meeting summary generation
- Searchable transcript archive
- Highlight and bookmark important moments
- Integration with calendar for meeting context
- Sentiment analysis per speaker
- Follow-up task tracking from meetings
- Admin panel with transcription and user management
- Professional, productivity-focused responsive design`
  },
  {
    id: 196,
    title: "AI Story Generator",
    category: "ai",
    emoji: "📚",
    prompt: `Build an AI-powered creative story generation platform:

**Features:**
- Story prompt builder with genre, setting, characters, and themes
- Chapter-by-chapter story generation with branching options
- Character profile manager with personality traits
- World-building tools (maps, lore, timelines)
- Writing style customization (Hemingway, Tolkien, sci-fi, noir)
- Illustration generation for story scenes
- Story outline and beat sheet generator
- Dialogue enhancer and character voice differentiation
- Plot hole detection
- Community sharing and reading
- Export as ebook format (ePub, PDF)
- Admin panel with model and content management
- Storybook-themed responsive design`
  },
  {
    id: 197,
    title: "AI Logo Generator",
    category: "ai",
    emoji: "🎯",
    prompt: `Build an AI-powered logo design and branding tool:

**Features:**
- Logo generation from business name and description
- Style preference quiz (modern, vintage, playful, corporate)
- Color palette suggestions based on industry
- Multiple logo variations (icon, wordmark, combination)
- Logo editing with element repositioning
- Font pairing suggestions
- Brand guideline document generation
- Social media avatar and cover generation from logo
- Business card mockup with logo
- Favicon and app icon generation
- High-resolution export (SVG, PNG, PDF)
- Admin panel with model and asset management
- Creative, brand-focused responsive design`
  },
  {
    id: 198,
    title: "AI Language Translator Hub",
    category: "ai",
    emoji: "🌍",
    prompt: `Build a comprehensive AI translation and localization platform:

**Features:**
- Text translation with multiple AI model options
- Document translation with formatting preservation
- Website translation with URL input
- Translation memory for consistent terminology
- Glossary management for specialized terms
- Context-aware translation with domain selection
- Side-by-side original and translation view
- Collaborative translation review
- Translation quality scoring
- Batch file translation
- API access for developer integration
- Admin panel with language and model management
- Multi-lingual, accessible responsive design`
  },
  {
    id: 199,
    title: "AI Music Generator",
    category: "ai",
    emoji: "🎵",
    prompt: `Build an AI-powered music composition and generation platform:

**Features:**
- Text-to-music generation (describe the music you want)
- Genre and mood selection for music generation
- Instrument and arrangement customization
- Melody and chord progression generator
- Beat and rhythm pattern creator
- Music length and tempo control
- Audio waveform editor for fine-tuning
- Royalty-free music library from generated tracks
- Project saving and version management
- Export in multiple audio formats
- Community sharing and collaboration
- Admin panel with model and content management
- Music studio-inspired dark responsive design`
  },
  {
    id: 200,
    title: "AI Personal Finance Advisor",
    category: "ai",
    emoji: "💡",
    prompt: `Build an AI-powered personal finance advisory platform:

**Features:**
- Financial health assessment questionnaire
- AI chatbot for financial questions and advice
- Budget recommendation based on income and goals
- Investment portfolio suggestions by risk tolerance
- Debt payoff strategy optimizer
- Tax optimization suggestions
- Savings goal planning with AI projections
- Spending pattern analysis with improvement tips
- Financial literacy quiz and education modules
- Scenario modeling (what-if analysis)
- Monthly financial health reports
- Admin panel with AI model and content management
- Trust-inspiring, professional responsive design`
  },
];
