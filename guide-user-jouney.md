# MVP - User Journey Flow

## 🚀 COMPLETE USER JOURNEY

### 📱 App Launch → Topic Selection → Lesson Learning

---

## 🏠 HOME SCREEN

### UI Elements:
```
┌─────────────────────────────────┐
│ 🔥 5 DAY STREAK     ❤️❤️❤️❤️❤️ │
│                                 │
│ 📊 Daily Goal: 2/3 lessons ✅  │
│ Progress: ████████░░ 67%        │
│                                 │
│ 🎯 TOPICS:                      │
│                                 │
│ ✅ 1. Basic Shopping 🥉         │
│    Progress: 3/3 lessons        │
│                                 │
│ 🔓 2. Family & Friends 🔒       │
│    Progress: 0/3 lessons        │
│                                 │
│ 🔒 3. Food & Dining 🔒          │
│    Progress: 0/4 lessons        │
│                                 │
│ [Practice] [Profile] [Settings] │
└─────────────────────────────────┘
```

### User Actions:
- **Tap topic** → Go to Topic Detail
- **Tap Practice** → Daily Practice
- **Tap Profile** → Stats & Achievements

---

## 📚 TOPIC DETAIL SCREEN

### When user taps "2. Family & Friends":
```
┌─────────────────────────────────┐
│ ← FAMILY & FRIENDS              │
│                                 │
│ 📊 Topic Progress: 0/12 words   │
│ 🎯 Estimated time: 30 minutes   │
│                                 │
│ 📖 LESSONS:                     │
│                                 │
│ 🔓 Lesson 1: Family Members     │
│    └ 4 new words • 10 mins     │
│    └ [START]                    │
│                                 │
│ 🔒 Lesson 2: Relationships      │
│    └ 4 new words • 10 mins     │
│    └ Complete Lesson 1 first    │
│                                 │
│ 🔒 Lesson 3: Activities         │
│    └ 4 new words • 10 mins     │
│    └ Complete Lesson 2 first    │
│                                 │
│ [Back to Home]                  │
└─────────────────────────────────┘
```

### User Actions:
- **Tap START** → Begin Lesson
- **Tap locked lesson** → Show unlock requirement
- **Tap Back** → Return to Home

---

## 🎯 LESSON FLOW

### Pre-Lesson Screen:
```
┌─────────────────────────────────┐
│ LESSON 1: FAMILY MEMBERS        │
│                                 │
│ 🎯 You'll learn:                │
│ • Father (Bố)                   │
│ • Mother (Mẹ)                   │
│ • Sister (Chị/Em gái)           │
│ • Brother (Anh/Em trai)         │
│                                 │
│ ⏱️ Time: ~10 minutes            │
│ 🏆 XP: +30 points               │
│                                 │
│ [START LESSON]                  │
│ [Back]                          │
└─────────────────────────────────┘
```

### During Lesson:
```
┌─────────────────────────────────┐
│ Lesson 1: Family Members        │
│ Progress: ████████░░ 8/12       │
│                                 │
│ Activity 8/12                   │
│ Chọn từ đúng:                   │
│                                 │
│ "My ___ is a doctor."           │
│                                 │
│ [A] Father ✓                    │
│ [B] Mother                      │
│ [C] Sister                      │
│ [D] Brother                     │
│                                 │
│ ❤️❤️❤️❤️❤️                      │
│ 🔥 5 day streak                 │
└─────────────────────────────────┘
```

### Activity Feedback:
```
┌─────────────────────────────────┐
│ ✅ CORRECT!                     │
│                                 │
│ "Father" means "Bố"             │
│                                 │
│ 🔊 Listen: "Father"             │
│ /ˈfɑːðər/                       │
│                                 │
│ Example:                        │
│ "My father is tall."            │
│ "Bố tôi rất cao."               │
│                                 │
│ [CONTINUE]                      │
└─────────────────────────────────┘
```

### Wrong Answer:
```
┌─────────────────────────────────┐
│ ❌ INCORRECT                    │
│                                 │
│ Correct answer: "Father"        │
│                                 │
│ 💡 Tip: "Father" = "Bố"        │
│                                 │
│ ❤️❤️❤️❤️ (Lives: 4/5)          │
│                                 │
│ [TRY AGAIN]                     │
└─────────────────────────────────┘
```

---

## 🏆 LESSON COMPLETION

### Success Screen:
```
┌─────────────────────────────────┐
│ 🎉 LESSON COMPLETE!             │
│                                 │
│ 📊 Your Results:                │
│ ✅ Accuracy: 92%                │
│ ⏱️ Time: 9 min 15 sec          │
│ 🏆 XP Earned: +30               │
│                                 │
│ 📚 Words Learned:               │
│ ✅ Father (Bố)                  │
│ ✅ Mother (Mẹ)                  │
│ ✅ Sister (Chị/Em gái)          │
│ ✅ Brother (Anh/Em trai)        │
│                                 │
│ 🔓 Lesson 2 Unlocked!           │
│                                 │
│ [CONTINUE] [REVIEW WORDS]       │
└─────────────────────────────────┘
```

### Return to Topic:
```
┌─────────────────────────────────┐
│ ← FAMILY & FRIENDS              │
│                                 │
│ 📊 Topic Progress: 4/12 words   │
│ 🎯 Estimated time: 20 minutes   │
│                                 │
│ 📖 LESSONS:                     │
│                                 │
│ ✅ Lesson 1: Family Members     │
│    └ 4 words learned • 9 mins  │
│    └ [REVIEW] 🥉               │
│                                 │
│ 🔓 Lesson 2: Relationships      │
│    └ 4 new words • 10 mins     │
│    └ [START]                    │
│                                 │
│ 🔒 Lesson 3: Activities         │
│    └ 4 new words • 10 mins     │
│    └ Complete Lesson 2 first    │
│                                 │
│ [Back to Home]                  │
└─────────────────────────────────┘
```

---

## 🔄 DAILY PRACTICE FLOW

### Practice Screen:
```
┌─────────────────────────────────┐
│ 📝 DAILY PRACTICE               │
│                                 │
│ 🎯 Review words you've learned  │
│                                 │
│ 📚 Today's Review:              │
│ • 8 words from Basic Shopping   │
│ • 4 words from Family & Friends │
│                                 │
│ ⏱️ Time: ~5 minutes             │
│ 🏆 XP: +15 points               │
│                                 │
│ [START PRACTICE]                │
│ [Skip Today]                    │
└─────────────────────────────────┘
```

---

## 📊 PROGRESS TRACKING

### Home Screen Updates:
```
After completing lesson:
┌─────────────────────────────────┐
│ 🔥 5 DAY STREAK     ❤️❤️❤️❤️❤️ │
│                                 │
│ 📊 Daily Goal: 3/3 lessons ✅  │
│ Progress: ████████████ 100% 🎉 │
│                                 │
│ 🎯 TOPICS:                      │
│                                 │
│ ✅ 1. Basic Shopping 🥇         │
│    Progress: 3/3 lessons        │
│                                 │
│ 🔓 2. Family & Friends 🥉       │
│    Progress: 1/3 lessons        │
│                                 │
│ 🔓 3. Food & Dining 🔒          │
│    Progress: 0/4 lessons        │
│                                 │
│ [Practice] [Profile] [Settings] │
└─────────────────────────────────┘
```

---

## 🎮 ERROR HANDLING

### No Internet Connection:
```
┌─────────────────────────────────┐
│ 📡 NO CONNECTION                │
│                                 │
│ You're offline. Some features   │
│ may not work properly.          │
│                                 │
│ • Lessons: Available ✅         │
│ • Audio: Limited ⚠️            │
│ • Progress sync: Disabled ❌    │
│                                 │
│ [CONTINUE OFFLINE] [RETRY]      │
└─────────────────────────────────┘
```

### Failed Lesson:
```
┌─────────────────────────────────┐
│ 💔 LESSON FAILED                │
│                                 │
│ You ran out of hearts!          │
│                                 │
│ Don't worry, you can:           │
│ • Try again in 4 hours          │
│ • Practice previous lessons     │
│ • Review vocabulary             │
│                                 │
│ ❤️ Hearts refill at 2:30 PM     │
│                                 │
│ [PRACTICE] [REVIEW] [WAIT]      │
└─────────────────────────────────┘
```

---

## 🎯 KEY USER ACTIONS

### Primary Flow:
1. **Launch app** → See daily goal & streak
2. **Choose topic** → See lesson progression
3. **Start lesson** → See preview & commitment
4. **Complete activities** → Get immediate feedback
5. **Finish lesson** → See results & next steps
6. **Return to home** → See updated progress

### Secondary Actions:
- **Practice** → Review old words
- **Review** → Repeat completed lessons
- **Profile** → See stats & achievements
- **Settings** → Adjust preferences

### Error Recovery:
- **Wrong answer** → Show correct answer + tip
- **No hearts** → Suggest alternatives
- **Offline** → Continue with limitations
- **Stuck** → Provide hints or skip option