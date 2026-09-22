/**
 * Romantic Date Proposal - Configuration
 * Specially customized for Rabbit (Raisa) & Rakib Hassan Dipu
 */
const DATE_APP_CONFIG = {
  // Default names
  crushName: "Rabbit 🐰",
  crushFullName: "Raisa",
  senderName: "Rakib Hassan Dipu",
  
  // WhatsApp number (Include country code without '+' or '00')
  whatsappNumber: "8801734738311",

  // Language settings: 'en' for English, 'bn' for Banglish / Bengali
  defaultLanguage: "en",

  // Runaway button settings
  runawaySensitivity: 90,
  yesGrowStep: 0.16,
  maxYesScale: 2.6,

  // Personalized funny pleading phrases for the "No" button
  pleadingTexts: {
    en: [
      "No 🙈",
      "Are you sure, Rabbit? 🥺",
      "Really sure? 💔",
      "Think again, Raisa! 😭",
      "Rabbit pleaseee! 🐰🌹",
      "Don't break Dipu's heart! 😿",
      "Look at the big YES! 👉👈",
      "You can't catch me! 😜",
      "Wrong answer! Try again 💖",
      "Dipu will be super sad... 😢",
      "Give it another thought! ✨",
      "Still No? Impossible! 🙈",
      "Just click YES already! 🥰"
    ],
    bn: [
      "না 🙈",
      "সত্যি বলছো, র‍্যাবিট? 🥺",
      "আর একবার ভেবে দেখো! 💔",
      "এমন করোনা রাইসা প্লিজ! 😭",
      "আমার আদরের র‍্যাবিট রাজি হয়ে যাও! 🐰🌹",
      "দীপুর মন ভেঙে দিও না! 😿",
      "হ্যাঁ বাটনটা কত সুন্দর দেখো! 👉👈",
      "আমাকে তো ধরতেই পারবা না! 😜",
      "ভুল উত্তর! আবার ট্রাই করো 💖",
      "আমি অনেক কষ্ট পাবো... 😢",
      "একটু তো দয়া করো! ✨",
      "এখনো না? কোনো উপায় নাই! 🙈",
      "তাড়াতাড়ি 'হ্যাঁ' তে চাপ দাও! 🥰"
    ]
  },

  // Food options with emojis and descriptions
  foodOptions: [
    { id: "pizza", title: "Cheesy Pizza 🍕", desc: "Warm slices & cheesy pulls" },
    { id: "biryani", title: "Kacchi Biryani 🍛", desc: "Aromatic rice & tender meat" },
    { id: "burgers", title: "Juicy Burgers 🍔", desc: "Loaded burger & crispy fries" },
    { id: "sushi", title: "Sushi & Ramen 🍣", desc: "Cozy Japanese delicacies" },
    { id: "pasta", title: "Creamy Pasta 🍝", desc: "Rich alfredo or spicy arrabbiata" },
    { id: "fuchka", title: "Fuchka & Street Food 🍢", desc: "Spicy, tangy & mouthwatering" },
    { id: "dessert", title: "Ice Cream & Waffles 🍨", desc: "Sweet treats for my sweet Rabbit" },
    { id: "bbq", title: "Grilled BBQ / Kebab 🍢", desc: "Smoky goodness & naan" },
    { id: "surprise", title: "Surprise Me! 🎁", desc: "You pick whatever you crave" }
  ],

  // Activity options
  activityOptions: [
    { id: "movie", title: "Movie Date 🎬", desc: "Popcorn, drinks & a cozy film" },
    { id: "coffee", title: "Coffee & Long Talks ☕", desc: "Warm cup & deep conversations" },
    { id: "arcade", title: "Arcade & Games 🕹️", desc: "Claw machines & funny battles" },
    { id: "picnic", title: "Sunset Park Picnic 🧺", desc: "Breeze, mats & cute snacks" },
    { id: "drive", title: "Late Night Drive 🚗", desc: "Favorite songs & city lights" },
    { id: "stargazing", title: "Rooftop Stargazing 🌌", desc: "Chilly breeze under the night sky" },
    { id: "shopping", title: "Bookstore & Thrift 📚", desc: "Exploring cute little spots" },
    { id: "pottery", title: "Painting / Art Cafe 🎨", desc: "Making cute creative memories" }
  ],

  // Dress code vibes
  dressCodeOptions: [
    { id: "casual", title: "Casual & Comfy 👟", desc: "Sneakers, jeans & relaxed vibes" },
    { id: "fancy", title: "Fancy & Elegant 👗", desc: "Dressed to the nines, photo ready" },
    { id: "cozy", title: "Cozy Sweaters / Hoodies 🧸", desc: "Warm, fluffy & super comfortable" },
    { id: "matching", title: "Matching Aesthetic 👯", desc: "Color-coordinated couple fit" }
  ]
};
