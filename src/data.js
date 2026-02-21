// ============================================================
// MOCK DATA — edit anything here to update the whole demo
// ============================================================

export const farmer = {
  name: "Paj Ntaub Vang",
  farm: "Vang Family Farm",
  initials: "PV",
  acres: 3.5,
  crops: ["Hmong Eggplant", "Thai Basil", "Bitter Melon", "Lemongrass"],
  location: "Brooklyn Park, MN",
  partner: "Direct TGA Partner",
  premium: false,
  fulfillmentRate: 94,
  networkAvg: 87,
  joinedYear: 2021,
  totalRevenue: 18420,
  lbsDelivered: 2840,
  lbsDonated: 340,
  activeOrders: 4,
}

export const feedItems = [
  {
    id: 1,
    type: "alert",
    title: "Spring ordering window opens March 15",
    body: "Submit your crop plan to TGA by March 15 to lock in spring purchase orders. Bryceson is available for one-on-one planning sessions this week.",
    time: "2 hours ago",
    tag: "TGA Update",
    tagColor: "green",
    icon: "megaphone",
  },
  {
    id: 2,
    type: "market",
    title: "Thai Basil prices up 12% this week",
    body: "Strong demand from Twin Cities restaurants. Current TGA benchmark: $4.20/bunch. Consider allocating additional rows this season.",
    time: "Yesterday",
    tag: "Market Alert",
    tagColor: "gold",
    icon: "trending-up",
  },
  {
    id: 3,
    type: "community",
    title: "New message in Hmong Growers Circle",
    body: "Bao Vang shared a tip about overwintering lemongrass in MN climate. 12 members have replied.",
    time: "Yesterday",
    tag: "Community",
    tagColor: "sage",
    icon: "users",
  },
  {
    id: 4,
    type: "education",
    title: "Continue: Packaging Standards & Visual Grades",
    body: "You are 60% through Module 2. Complete before the spring submission deadline on March 15.",
    time: "2 days ago",
    tag: "Education",
    tagColor: "sage",
    icon: "book",
    progress: 60,
  },
  {
    id: 5,
    type: "event",
    title: "Spring Quarterly Retreat — April 12",
    body: "Save the date. TGA Falcon Heights facility. Buyer meet-and-greet with Lunds & Byerlys and North Memorial Hospital buyers.",
    time: "3 days ago",
    tag: "Event",
    tagColor: "green",
    icon: "calendar",
  },
  {
    id: 6,
    type: "market",
    title: "Bitter Melon: new buyer inquiry",
    body: "University of Minnesota Dining is interested in sourcing bitter melon for Asian-themed dining events. 30 lbs/week minimum.",
    time: "4 days ago",
    tag: "Market Alert",
    tagColor: "gold",
    icon: "trending-up",
  },
]

export const orders = [
  { id: "PO-2847", crop: "Hmong Eggplant",  qty: "80 lbs",      due: "Mar 8",  status: "confirmed", buyer: "Lunds & Byerlys" },
  { id: "PO-2851", crop: "Thai Basil",       qty: "40 bunches",  due: "Mar 10", status: "pending",   buyer: "North Memorial Hospital" },
  { id: "PO-2863", crop: "Bitter Melon",     qty: "30 lbs",      due: "Mar 15", status: "confirmed", buyer: "LEAFF Program" },
  { id: "PO-2871", crop: "Lemongrass",       qty: "25 bunches",  due: "Mar 18", status: "pending",   buyer: "U of M Dining" },
]

export const fulfillmentData = [
  { month: "Sep", you: 88, network: 82 },
  { month: "Oct", you: 91, network: 84 },
  { month: "Nov", you: 89, network: 83 },
  { month: "Dec", you: 95, network: 85 },
  { month: "Jan", you: 92, network: 86 },
  { month: "Feb", you: 94, network: 87 },
]

export const modules = {
  level1: [
    { id: 1, title: "How TGA Wholesale Works",               duration: "12 min", completed: true,  quizScore: 92 },
    { id: 2, title: "Packaging Standards & Visual Grades",   duration: "15 min", completed: true,  quizScore: 88 },
    { id: 3, title: "Cost of Production Fundamentals",       duration: "18 min", completed: false, progress: 60 },
    { id: 4, title: "Food Safety Essentials (GAP)",          duration: "20 min", completed: false, progress: 0 },
    { id: 5, title: "Gross vs. Net: Reading Your Invoice",   duration: "10 min", completed: false, progress: 0 },
  ],
  level2: [
    { id: 6,  title: "Crop Planning for Profitability",   duration: "25 min" },
    { id: 7,  title: "Scaling Your Operation",            duration: "30 min" },
    { id: 8,  title: "Securing Agricultural Loans",       duration: "22 min" },
    { id: 9,  title: "Grant Writing Basics for Farmers",  duration: "20 min" },
  ],
  level3: [
    { id: 10, title: "UMN Wholesale Readiness Certificate",         duration: "Self-paced" },
    { id: 11, title: "UMN Farm Business Management Certificate",    duration: "Self-paced" },
  ],
}

export const events = [
  {
    id: 1,
    title: "Spring Quarterly Retreat",
    date: "April 12, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "TGA Falcon Heights",
    type: "retreat",
    rsvpd: false,
    description: "Buyer meet-and-greet, crop planning session, networking lunch. Lunds & Byerlys and North Memorial Hospital attending.",
  },
  {
    id: 2,
    title: "Buyer Meet & Greet: Lunds & Byerlys",
    date: "March 22, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual (Zoom)",
    type: "buyer",
    rsvpd: true,
    description: "Meet the Lunds & Byerlys local produce buyer. Ask about packaging preferences, volume needs, and upcoming seasonal items.",
  },
  {
    id: 3,
    title: "Crop Planning Workshop",
    date: "March 28, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Big River Farms, Marine on St. Croix",
    type: "workshop",
    rsvpd: false,
    description: "Hands-on crop planning session with TGA advisors. Bring your planting calendar and last season's yield data.",
  },
]

export const groups = [
  { id: 1, name: "Hmong Growers Circle",     members: 28,  unread: 3, description: "Specialty vegetables & traditional crops" },
  { id: 2, name: "Brooklyn Park Farmers",    members: 12,  unread: 1, description: "Regional cluster - Brooklyn Park area" },
  { id: 3, name: "TGA Announcements",        members: 134, unread: 0, description: "Official TGA updates & broadcast messages" },
  { id: 4, name: "Organic Producers Network",members: 19,  unread: 0, description: "Certified and transitioning organic farms" },
]

export const recentMessages = [
  {
    group: "Hmong Growers Circle",
    sender: "Bao Vang",
    message: "Anyone tried covering lemongrass with row fabric before first frost? Lost mine last year.",
    time: "2h ago",
    initials: "BV",
  },
  {
    group: "Hmong Growers Circle",
    sender: "Lee Xiong",
    message: "Yes! 4oz fabric works well. Pull it right after temps stay above 40 consistently.",
    time: "1h ago",
    initials: "LX",
  },
  {
    group: "Brooklyn Park Farmers",
    sender: "Maria Gonzalez",
    message: "Is anyone else having trouble getting the spring order form to load on the TGA portal?",
    time: "Yesterday",
    initials: "MG",
  },
]

// Used by the Cost of Production Calculator
export const cropBenchmarks = {
  "Hmong Eggplant": { price: 2.80, unit: "lb",     demand: "high" },
  "Thai Basil":     { price: 4.20, unit: "bunch",  demand: "high" },
  "Bitter Melon":   { price: 3.50, unit: "lb",     demand: "medium" },
  "Lemongrass":     { price: 3.80, unit: "bunch",  demand: "medium" },
}
