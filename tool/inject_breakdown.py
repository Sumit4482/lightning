#!/usr/bin/env python3
"""One-off: inject sentenceBreakdown into assets/data/content.json"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "assets/data/content.json"
data = json.loads(path.read_text(encoding="utf-8"))

BREAKDOWNS = {
    "2026-04-08": [
        {"telugu": "నమస్కారం", "pronunciation": "Namaskāram", "english": "Hello / greetings", "hindi": "नमस्ते", "hinglish": "Namaste"},
        {"telugu": "మీరు", "pronunciation": "mīru", "english": "you (respectful)", "hindi": "आप", "hinglish": "aap"},
        {"telugu": "ఎలా", "pronunciation": "elā", "english": "how", "hindi": "कैसे", "hinglish": "kaise"},
    ],
    "2026-04-09": [
        {"telugu": "నాకు", "pronunciation": "nāku", "english": "to me / for me", "hindi": "मुझे", "hinglish": "mujhe"},
        {"telugu": "తెలుగు", "pronunciation": "Telugu", "english": "Telugu (language)", "hindi": "तेलुगु", "hinglish": "Telugu"},
        {"telugu": "నేర్చుకోవాలి", "pronunciation": "nērchukōvāli", "english": "should learn / want to learn", "hindi": "सीखना चाहिए", "hinglish": "seekhna hai"},
    ],
    "2026-04-10": [
        {"telugu": "ఈరోజు", "pronunciation": "īrōju", "english": "today", "hindi": "आज", "hinglish": "aaj"},
        {"telugu": "వాతావరణం", "pronunciation": "vātāvaraṇaṁ", "english": "weather / climate", "hindi": "मौसम", "hinglish": "mausam"},
        {"telugu": "బాగుంది", "pronunciation": "bāgundi", "english": "is good", "hindi": "अच्छा है", "hinglish": "achha hai"},
    ],
    "2026-04-11": [
        {"telugu": "నేను", "pronunciation": "nēnu", "english": "I", "hindi": "मैं", "hinglish": "main"},
        {"telugu": "అన్నం", "pronunciation": "annaṁ", "english": "cooked rice / meal", "hindi": "चावल", "hinglish": "chawal"},
        {"telugu": "తింటాను", "pronunciation": "tiṇṭānu", "english": "I eat", "hindi": "खाता/खाती हूँ", "hinglish": "khata hoon"},
    ],
    "2026-04-12": [
        {"telugu": "మీ", "pronunciation": "mī", "english": "your", "hindi": "आपका", "hinglish": "aapka"},
        {"telugu": "పేరు", "pronunciation": "pēru", "english": "name", "hindi": "नाम", "hinglish": "naam"},
        {"telugu": "ఏమిటి", "pronunciation": "ēmiṭi", "english": "what", "hindi": "क्या", "hinglish": "kya"},
    ],
    "2026-04-13": [
        {"telugu": "నేను", "pronunciation": "nēnu", "english": "I", "hindi": "मैं", "hinglish": "main"},
        {"telugu": "ఇప్పుడు", "pronunciation": "ippuḍu", "english": "now", "hindi": "अभी", "hinglish": "abhi"},
        {"telugu": "ఆఫీసుకు", "pronunciation": "āphīsuku", "english": "to the office", "hindi": "ऑफिस", "hinglish": "office"},
    ],
    "2026-04-14": [
        {"telugu": "నాకు", "pronunciation": "nāku", "english": "to me", "hindi": "मुझे", "hinglish": "mujhe"},
        {"telugu": "కాఫీ", "pronunciation": "kāphī", "english": "coffee", "hindi": "कॉफ़ी", "hinglish": "coffee"},
        {"telugu": "ఇష్టం", "pronunciation": "iṣṭaṁ", "english": "like / fondness", "hindi": "पसंद", "hinglish": "pasand"},
    ],
    "2026-04-15": [
        {"telugu": "మనం", "pronunciation": "manaṁ", "english": "we", "hindi": "हम", "hinglish": "hum"},
        {"telugu": "కలిసి", "pronunciation": "kalisi", "english": "together", "hindi": "साथ", "hinglish": "saath"},
        {"telugu": "తెలుగు", "pronunciation": "Telugu", "english": "Telugu", "hindi": "तेलुगु", "hinglish": "Telugu"},
    ],
}

for k, v in BREAKDOWNS.items():
    data[k]["sentenceBreakdown"] = v

path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("updated", path)
