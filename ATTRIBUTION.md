# Data attribution

DailyLingo includes a compact derivative dataset of English words, Vietnamese definitions, IPA, and example sentences from:

- **English–Vietnamese Dictionary Database** by Skypedia: https://github.com/skypediacode/english-vietnamese-dictionary
- Licensed under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**: https://creativecommons.org/licenses/by-sa/4.0/
- The upstream database incorporates and attributes data from MinhQND Dictionary, Wiktionary, vntk/dictionary, Hồ Ngọc Đức's Vietnamese Dictionary Project, WikDict, and OVDP. See the upstream `ATTRIBUTION.md` for full details.

Vocabulary frequency ordering is informed by:

- **google-10000-english** by Josh Kaufman / first20hours: https://github.com/first20hours/google-10000-english
- Derived from Peter Norvig's compilation of Google's Trillion Word Corpus frequency data.

Part-of-speech selection for ambiguous English headwords is informed by Princeton WordNet sense-tag frequency data:

- **Princeton WordNet**: https://wordnet.princeton.edu/
- WordNet license: https://wordnet.princeton.edu/license-and-commercial-use

The generated derivative dataset is stored in `dictionary.js`. Its source and build process are provided in `scripts/build_dictionary.py`.
 