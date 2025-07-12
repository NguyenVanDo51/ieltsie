# MVP - Cấu trúc hoạt động 1 lesson

## 📋 OVERVIEW
- **Thời gian:** 8-10 phút
- **Số từ mới:** 3-4 từ
- **Số hoạt động:** 12 activities
- **Mục tiêu:** Học và ghi nhớ từ vựng cơ bản

---

## 🎯 CẤU TRÚC LESSON (12 Activities)

### 📚 PHASE 1: INTRODUCTION (3 activities)
**Mục tiêu:** Giới thiệu từ mới

#### Activity 1-3: Word Introduction
**Format:**
```
[Từ tiếng Anh] 
[Phiên âm] 
[Nghĩa tiếng Việt]
[Ví dụ tiếng Anh]
[Dịch tiếng Việt]
🔊 [Audio button]
```

**Ví dụ:**
```
BUY
/baɪ/
Mua

"I want to buy a book."
"Tôi muốn mua một cuốn sách."
🔊
```

---

### 🎯 PHASE 2: RECOGNITION (4 activities)
**Mục tiêu:** Nhận biết từ vựng

#### Activity 4: Matching
**UI:** Drag & drop
```
Nối từ tiếng Anh với nghĩa tiếng Việt:

Buy          Bán
Sell         Mua
Shop         Cửa hàng
```

#### Activity 5: Multiple Choice (Context)
```
Chọn từ đúng:
"I want to ___ this shirt."

A) Buy ✓
B) Sell  
C) Shop
D) Price
```

#### Activity 6: Audio Recognition
```
🔊 Nghe và chọn từ đúng:
[Audio: "Buy"]

A) Buy ✓    B) Sell    C) Shop
```

#### Activity 7: Word Bank
```
Điền từ vào chỗ trống:
[Buy] [Sell] [Shop]

"The ___ is open until 9 PM."
→ Đáp án: Shop
```

---

### ✍️ PHASE 3: PRODUCTION (3 activities)
**Mục tiêu:** Sử dụng từ vựng

#### Activity 8: Translation (Easy)
```
Dịch sang tiếng Anh:
"Tôi muốn mua"

→ "I want to buy"
```

#### Activity 9: Sentence Building
```
Sắp xếp từ thành câu:
[want] [to] [I] [buy] [this]

→ "I want to buy this"
```

#### Activity 10: Fill in Conversation
```
Hoàn thành đoạn hội thoại:
A: "What do you want to ___?"
B: "I want to buy a book."

→ Đáp án: buy
```

---

### 🔍 PHASE 4: REVIEW (2 activities)
**Mục tiêu:** Củng cố kiến thức

#### Activity 11: Mixed Review
```
Chọn đáp án đúng:
"Cửa hàng" trong tiếng Anh là:

A) Buy
B) Sell  
C) Shop ✓
D) Price
```

#### Activity 12: Final Challenge
```
Dịch câu hoàn chỉnh:
"Tôi muốn mua sắm ở cửa hàng này."

→ "I want to shop at this store."
```

---

## 📊 LESSON COMPLETION

### Results Screen:
```
🎉 LESSON HOÀN THÀNH!

📊 Kết quả:
✅ Độ chính xác: 85%
⏱️ Thời gian: 9 phút 30 giây
🏆 XP nhận được: +30

📝 Từ đã học:
✅ Buy (Mua)
✅ Sell (Bán)  
✅ Shop (Cửa hàng)

[Tiếp tục] [Ôn tập]
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### Activity Types cần code:
1. **WordIntroduction** - Static display với audio
2. **Matching** - Drag & drop interface
3. **MultipleChoice** - Button selection
4. **AudioRecognition** - Audio player + selection
5. **WordBank** - Word selection + fill blank
6. **Translation** - Text input với validation
7. **SentenceBuilding** - Drag & drop words
8. **Conversation** - Fill in blank

### Data Structure:
```json
{
  "lesson_id": "shopping_lesson_1",
  "activities": [
    {
      "id": 1,
      "type": "WordIntroduction",
      "word": "buy",
      "phonetic": "/baɪ/",
      "meaning": "Mua",
      "example_en": "I want to buy a book.",
      "example_vn": "Tôi muốn mua một cuốn sách.",
      "audio_url": "audio/buy.mp3"
    },
    {
      "id": 4,
      "type": "Matching",
      "items": [
        {"en": "Buy", "vn": "Mua"},
        {"en": "Sell", "vn": "Bán"},
        {"en": "Shop", "vn": "Cửa hàng"}
      ]
    }
  ]
}
```

### Scoring System:
- **Correct answer:** +1 point
- **Incorrect answer:** -0.5 points
- **Minimum score:** 0 points
- **Perfect bonus:** +3 points (100% accuracy)

### Progress Tracking:
- **Activity completion:** Boolean
- **Accuracy per activity:** Percentage
- **Time spent:** Seconds
- **Attempts per activity:** Integer