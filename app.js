(() => {
  "use strict";

  const { vocabulary, categories, tips } = window.DAILY_LINGO_DATA;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const DICTIONARY_VERSION = 2;

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function yesterdayKey() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return localDateKey(date);
  }

  const defaultStore = {
    saved: [],
    mastered: [],
    dailyGoal: 20,
    dailyReviews: {},
    exerciseWrong: [],
    exampleTranslations: {},
    dictionaryVersion: DICTIONARY_VERSION,
    streak: 0,
    lastStudyDate: "",
    theme: "light"
  };

  function loadStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem("dailyLingoStore")) || {};
      if (parsed.dictionaryVersion !== DICTIONARY_VERSION) {
        const keepCuratedId = (id) => String(id).startsWith("word-");
        parsed.saved = (parsed.saved || []).filter(keepCuratedId);
        parsed.mastered = (parsed.mastered || []).filter(keepCuratedId);
        parsed.exerciseWrong = (parsed.exerciseWrong || []).filter(keepCuratedId);
        parsed.exampleTranslations = {};
        Object.keys(parsed.dailyReviews || {}).forEach((date) => {
          parsed.dailyReviews[date] = parsed.dailyReviews[date].filter(keepCuratedId);
        });
        parsed.dictionaryVersion = DICTIONARY_VERSION;
      }
      const merged = { ...defaultStore, ...parsed };
      const validIds = new Set(vocabulary.map((item) => item.id));
      const keepValidId = (id) => validIds.has(id);
      merged.saved = (merged.saved || []).filter(keepValidId);
      merged.mastered = (merged.mastered || []).filter(keepValidId);
      merged.exerciseWrong = (merged.exerciseWrong || []).filter(keepValidId);
      Object.keys(merged.dailyReviews || {}).forEach((date) => {
        merged.dailyReviews[date] = merged.dailyReviews[date].filter(keepValidId);
      });
      return merged;
    } catch {
      return { ...defaultStore };
    }
  }

  let store = loadStore();
  let activeView = "learn";
  let currentCategory = "basics";
  let deck = vocabulary.filter((item) => item.category === currentCategory);
  let currentIndex = 0;
  let isFlipped = false;
  let sessionAnswers = {};
  let libraryCategory = "all";
  let libraryLevel = "all";
  let libraryQuery = "";
  let visibleLibraryItems = 24;
  let toastTimer;
  let exerciseAmount = 10;
  let exerciseDeck = [];
  let exerciseIndex = 0;
  let exerciseResults = [];
  let translationRequestId = 0;

  const elements = {
    sidebar: $("#sidebar"),
    mobileOverlay: $("#mobileOverlay"),
    navTotal: $("#navTotal"),
    navSaved: $("#navSaved"),
    navWrong: $("#navWrong"),
    sidebarCategories: $("#sidebarCategories"),
    categorySelect: $("#categorySelect"),
    activeCategoryEmoji: $("#activeCategoryEmoji"),
    flashcard: $("#flashcard"),
    flashcardScene: $("#flashcardScene"),
    cardLevel: $("#cardLevel"),
    backLevel: $("#backLevel"),
    cardCategory: $("#cardCategory"),
    cardWord: $("#cardWord"),
    cardIpa: $("#cardIpa"),
    backWord: $("#backWord"),
    cardMeaning: $("#cardMeaning"),
    cardExample: $("#cardExample"),
    cardExampleVi: $("#cardExampleVi"),
    bookmarkButton: $("#bookmarkButton"),
    currentNumber: $("#currentNumber"),
    deckTotal: $("#deckTotal"),
    deckProgress: $("#deckProgress"),
    knownCount: $("#knownCount"),
    hardCount: $("#hardCount"),
    againCount: $("#againCount"),
    sessionPercent: $("#sessionPercent"),
    radialProgress: $("#radialProgress"),
    dailyDone: $("#dailyDone"),
    dailyGoal: $("#dailyGoal"),
    dailyProgress: $("#dailyProgress"),
    goalMessage: $("#goalMessage"),
    streakCount: $("#streakCount"),
    studyTip: $("#studyTip"),
    categoryFilters: $("#categoryFilters"),
    librarySearch: $("#librarySearch"),
    levelFilter: $("#levelFilter"),
    resultCount: $("#resultCount"),
    vocabularyGrid: $("#vocabularyGrid"),
    loadMoreButton: $("#loadMoreButton"),
    savedGrid: $("#savedGrid"),
    savedEmpty: $("#savedEmpty"),
    toast: $("#toast"),
    toastMessage: $("#toastMessage"),
    toastIcon: $("#toastIcon"),
    goalDialog: $("#goalDialog"),
    globalSearch: $("#globalSearch"),
    exerciseSetup: $("#exerciseSetup"),
    exerciseSession: $("#exerciseSession"),
    exerciseComplete: $("#exerciseComplete"),
    exerciseSource: $("#exerciseSource"),
    exerciseSourceNote: $("#exerciseSourceNote"),
    exitExerciseButton: $("#exitExerciseButton"),
    exerciseCurrent: $("#exerciseCurrent"),
    exerciseTotal: $("#exerciseTotal"),
    exerciseProgress: $("#exerciseProgress"),
    exerciseAnsweredCount: $("#exerciseAnsweredCount"),
    exercisePointValue: $("#exercisePointValue"),
    writingCard: $("#writingCard"),
    writingCategory: $("#writingCategory"),
    exerciseMeaning: $("#exerciseMeaning"),
    exerciseHint: $("#exerciseHint"),
    exerciseForm: $("#exerciseForm"),
    exerciseAnswer: $("#exerciseAnswer"),
    answerInputWrap: $("#answerInputWrap"),
    checkAnswerButton: $("#checkAnswerButton"),
    skipExerciseButton: $("#skipExerciseButton"),
    exerciseReview: $("#exerciseReview")
  };

  function saveStore() {
    localStorage.setItem("dailyLingoStore", JSON.stringify(store));
  }

  function normalize(value) {
    return value
      .toLocaleLowerCase("vi")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
  }

  function normalizeEnglish(value) {
    return value.normalize("NFKC").toLocaleLowerCase("en")
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, "");
  }

  function levelLabel(level) {
    return `${level} · ${{ A1: "CƠ BẢN", A2: "SƠ CẤP", B1: "TRUNG CẤP", B2: "KHÁ" }[level]}`;
  }

  function showToast(message, icon = "✓") {
    clearTimeout(toastTimer);
    elements.toastMessage.textContent = message;
    elements.toastIcon.textContent = icon;
    elements.toast.classList.add("show");
    toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
  }

  function updateStreakForStudy() {
    const today = localDateKey();
    if (store.lastStudyDate === today) return;
    store.streak = store.lastStudyDate === yesterdayKey() ? (store.streak || 0) + 1 : 1;
    store.lastStudyDate = today;
  }

  function markStudied(id) {
    const today = localDateKey();
    updateStreakForStudy();
    const reviewed = new Set(store.dailyReviews[today] || []);
    reviewed.add(id);
    store.dailyReviews[today] = [...reviewed];
    const oldDates = Object.keys(store.dailyReviews).sort().slice(0, -14);
    oldDates.forEach((date) => delete store.dailyReviews[date]);
    saveStore();
    renderDailyProgress();
  }

  function renderDailyProgress() {
    const today = localDateKey();
    const done = (store.dailyReviews[today] || []).length;
    const goal = store.dailyGoal;
    const percent = Math.min(100, Math.round((done / goal) * 100));
    elements.dailyDone.textContent = done;
    elements.dailyGoal.textContent = goal;
    elements.dailyProgress.style.width = `${percent}%`;
    const activeStreak = store.lastStudyDate === today || store.lastStudyDate === yesterdayKey();
    elements.streakCount.textContent = activeStreak ? (store.streak || 0) : 0;
    if (done === 0) elements.goalMessage.textContent = "Bắt đầu thật nhẹ nhàng nhé!";
    else if (done < goal) elements.goalMessage.textContent = `Còn ${goal - done} từ nữa — bạn làm được!`;
    else elements.goalMessage.textContent = "Tuyệt vời! Bạn đã đạt mục tiêu 🎉";
  }

  function renderCategories() {
    const categoryEntries = Object.entries(categories);
    elements.sidebarCategories.innerHTML = categoryEntries.slice(0, 8).map(([key, meta]) => {
      const count = vocabulary.filter((item) => item.category === key).length;
      return `<button class="category-button ${key === currentCategory ? "active" : ""}" data-category="${key}">
        <span>${meta.emoji}</span><span>${meta.name}</span><small>${count}</small>
      </button>`;
    }).join("");

    elements.categorySelect.innerHTML = `<option value="all">Tất cả chủ đề (${vocabulary.length})</option>` + categoryEntries.map(([key, meta]) => {
      const count = vocabulary.filter((item) => item.category === key).length;
      return `<option value="${key}">${meta.name} (${count})</option>`;
    }).join("");
    elements.categorySelect.value = currentCategory;

    elements.categoryFilters.innerHTML = `<button class="filter-pill ${libraryCategory === "all" ? "active" : ""}" data-filter-category="all">✨ Tất cả</button>` + categoryEntries.map(([key, meta]) =>
      `<button class="filter-pill ${libraryCategory === key ? "active" : ""}" data-filter-category="${key}">${meta.emoji} ${meta.name}</button>`
    ).join("");
  }

  function setDeck(items, categoryValue = "all") {
    if (!items.length) {
      showToast("Bộ từ này chưa có thẻ nào", "!");
      return false;
    }
    deck = [...items];
    currentIndex = 0;
    currentCategory = categoryValue;
    sessionAnswers = {};
    elements.categorySelect.value = categoryValue;
    elements.activeCategoryEmoji.textContent = categoryValue === "all" ? "✨" : (categories[categoryValue]?.emoji || "📚");
    renderCard();
    renderSessionStats();
    renderCategories();
    return true;
  }

  function currentCard() {
    return deck[currentIndex];
  }

  function renderCard() {
    if (!deck.length) return;
    const card = currentCard();
    isFlipped = false;
    elements.flashcard.classList.remove("flipped");
    elements.cardLevel.textContent = levelLabel(card.level);
    elements.backLevel.textContent = levelLabel(card.level);
    elements.cardCategory.textContent = categories[card.category].name;
    elements.cardWord.textContent = card.word;
    elements.cardIpa.textContent = card.ipa;
    elements.backWord.textContent = card.word;
    elements.cardMeaning.textContent = card.meaning;
    elements.cardExample.textContent = card.example;
    renderExampleTranslation(card, false, false);
    elements.currentNumber.textContent = currentIndex + 1;
    elements.deckTotal.textContent = deck.length;
    elements.deckProgress.style.width = `${((currentIndex + 1) / deck.length) * 100}%`;
    elements.bookmarkButton.classList.toggle("saved", store.saved.includes(card.id));
  }

  function decodeHtmlEntities(value) {
    const parser = document.createElement("textarea");
    parser.innerHTML = value;
    return parser.value;
  }

  function selectBestTranslation(payload, sourceText) {
    const matches = Array.isArray(payload?.matches) ? payload.matches : [];
    const qualified = matches
      .map((match) => ({
        text: decodeHtmlEntities(match.translation || "").trim(),
        quality: Number(match.quality) || 0,
        confidence: Number(match.match) || 0
      }))
      .filter((match) => match.text && normalizeEnglish(match.text) !== normalizeEnglish(sourceText))
      .sort((left, right) => right.quality - left.quality || right.confidence - left.confidence);
    const highQuality = qualified.find((match) => match.quality > 0);
    return highQuality?.text || decodeHtmlEntities(payload?.responseData?.translatedText || "").trim();
  }

  function setExampleTranslation(text, state = "ready") {
    elements.cardExampleVi.textContent = text;
    elements.cardExampleVi.classList.toggle("translation-loading", state === "loading");
    elements.cardExampleVi.classList.toggle("translation-error", state === "error");
    elements.cardExampleVi.title = state === "error" ? "Nhấn để thử dịch lại" : "";
  }

  function cacheExampleTranslation(cardId, translation) {
    const cache = store.exampleTranslations || {};
    delete cache[cardId];
    cache[cardId] = translation;
    const keys = Object.keys(cache);
    if (keys.length > 400) keys.slice(0, keys.length - 400).forEach((key) => delete cache[key]);
    store.exampleTranslations = cache;
    saveStore();
  }

  async function renderExampleTranslation(card, forceRefresh = false, allowNetwork = true) {
    const requestId = ++translationRequestId;
    if (card.exampleVi) {
      setExampleTranslation(card.exampleVi);
      return;
    }
    const cached = store.exampleTranslations?.[card.id];
    if (cached && !forceRefresh) {
      setExampleTranslation(cached);
      return;
    }
    if (!card.example) {
      setExampleTranslation("Chưa có câu ví dụ để dịch.", "error");
      return;
    }
    if (!allowNetwork) {
      setExampleTranslation("Bản dịch sẽ hiển thị khi lật thẻ.");
      return;
    }

    setExampleTranslation("Đang dịch câu ví dụ", "loading");
    try {
      const query = encodeURIComponent(card.example);
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${query}&langpair=en%7Cvi`);
      if (!response.ok) throw new Error(`Translation request failed: ${response.status}`);
      const payload = await response.json();
      const translated = selectBestTranslation(payload, card.example);
      if (!translated || normalizeEnglish(translated) === normalizeEnglish(card.example)) throw new Error("Empty translation");
      cacheExampleTranslation(card.id, translated);
      if (requestId === translationRequestId && currentCard()?.id === card.id) setExampleTranslation(translated);
    } catch {
      if (requestId === translationRequestId && currentCard()?.id === card.id) {
        setExampleTranslation("Không tải được bản dịch — nhấn để thử lại.", "error");
      }
    }
  }

  function flipCard(force) {
    isFlipped = typeof force === "boolean" ? force : !isFlipped;
    elements.flashcard.classList.toggle("flipped", isFlipped);
    if (isFlipped) renderExampleTranslation(currentCard());
  }

  function moveCard(direction) {
    if (!deck.length) return;
    currentIndex = (currentIndex + direction + deck.length) % deck.length;
    renderCard();
  }

  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    currentIndex = 0;
    renderCard();
    showToast("Đã xáo thứ tự flashcard", "↝");
  }

  function answerCard(answer) {
    const card = currentCard();
    sessionAnswers[card.id] = answer;
    markStudied(card.id);
    if (answer === "known" && !store.mastered.includes(card.id)) {
      store.mastered.push(card.id);
      saveStore();
    } else if (answer !== "known" && store.mastered.includes(card.id)) {
      store.mastered = store.mastered.filter((id) => id !== card.id);
      saveStore();
    }
    renderSessionStats();
    setTimeout(() => moveCard(1), 140);
  }

  function renderSessionStats() {
    const answers = Object.values(sessionAnswers);
    const counts = {
      known: answers.filter((value) => value === "known").length,
      hard: answers.filter((value) => value === "hard").length,
      again: answers.filter((value) => value === "again").length
    };
    const percent = deck.length ? Math.round((answers.length / deck.length) * 100) : 0;
    elements.knownCount.textContent = counts.known;
    elements.hardCount.textContent = counts.hard;
    elements.againCount.textContent = counts.again;
    elements.sessionPercent.textContent = `${percent}%`;
    elements.radialProgress.style.setProperty("--progress", `${percent * 3.6}deg`);
    $("span", elements.radialProgress).textContent = `${percent}%`;
  }

  function speak(card = currentCard()) {
    if (!("speechSynthesis" in window)) {
      showToast("Trình duyệt chưa hỗ trợ phát âm", "!");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(card.word.replace(/\.\.\./g, ""));
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1;
    const voice = speechSynthesis.getVoices().find((item) => item.lang.startsWith("en-US")) || speechSynthesis.getVoices().find((item) => item.lang.startsWith("en"));
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  }

  function speakText(text, language = "en-US", rate = 0.82) {
    if (!("speechSynthesis" in window)) {
      showToast("Trình duyệt chưa hỗ trợ phát âm", "!");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    const prefix = language.split("-")[0];
    const voice = speechSynthesis.getVoices().find((item) => item.lang === language)
      || speechSynthesis.getVoices().find((item) => item.lang.startsWith(prefix));
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  }

  function toggleSaved(id = currentCard().id) {
    const wasSaved = store.saved.includes(id);
    store.saved = wasSaved ? store.saved.filter((item) => item !== id) : [...store.saved, id];
    saveStore();
    elements.navSaved.textContent = store.saved.length;
    if (currentCard()?.id === id) elements.bookmarkButton.classList.toggle("saved", !wasSaved);
    showToast(wasSaved ? "Đã bỏ khỏi danh sách lưu" : "Đã lưu để ôn tập", wasSaved ? "−" : "✓");
    if (activeView === "library") renderLibrary();
    if (activeView === "saved") renderSaved();
  }

  function getFilteredVocabulary() {
    const query = normalize(libraryQuery);
    return vocabulary.filter((item) => {
      const categoryMatch = libraryCategory === "all" || item.category === libraryCategory;
      const levelMatch = libraryLevel === "all" || item.level === libraryLevel;
      const searchable = normalize(`${item.word} ${item.meaning} ${item.example} ${item.exampleVi}`);
      return categoryMatch && levelMatch && (!query || searchable.includes(query));
    });
  }

  function vocabCardTemplate(item) {
    const meta = categories[item.category];
    const isSaved = store.saved.includes(item.id);
    return `<article class="vocab-card" data-word-id="${item.id}">
      <div class="vocab-top">
        <span>${meta.emoji} ${escapeHtml(meta.name)} · ${escapeHtml(item.level)}</span>
        <div class="vocab-actions">
          <button data-speak="${item.id}" aria-label="Nghe phát âm ${escapeHtml(item.word)}"><svg aria-hidden="true"><use href="#icon-volume"></use></svg></button>
          <button data-save="${item.id}" class="${isSaved ? "saved" : ""}" aria-label="${isSaved ? "Bỏ lưu" : "Lưu"} ${escapeHtml(item.word)}"><svg aria-hidden="true"><use href="#icon-bookmark"></use></svg></button>
        </div>
      </div>
      <h3>${escapeHtml(item.word)}</h3>
      <span class="vocab-ipa">${escapeHtml(item.ipa)}</span>
      <p class="vocab-meaning">${escapeHtml(item.meaning)}</p>
      <p class="vocab-example">“${escapeHtml(item.example)}”</p>
    </article>`;
  }

  function shuffleItems(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  }

  function getExercisePool(source = elements.exerciseSource.value) {
    if (source === "curated") return vocabulary.filter((item) => !item.extended);
    if (source === "saved") return store.saved.map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
    if (source === "wrong") return store.exerciseWrong.map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
    return vocabulary;
  }

  function updateExerciseSourceNote() {
    const source = elements.exerciseSource.value;
    const counts = {
      curated: vocabulary.filter((item) => !item.extended).length,
      all: vocabulary.length,
      saved: store.saved.length,
      wrong: store.exerciseWrong.length
    };
    const notes = {
      curated: `${counts.curated.toLocaleString("vi-VN")} từ giao tiếp được tuyển chọn, có ví dụ và cấp độ.`,
      all: `${counts.all.toLocaleString("vi-VN")} từ và cụm từ trong toàn bộ kho Anh–Việt.`,
      saved: `${counts.saved.toLocaleString("vi-VN")} từ bạn đã đánh dấu để ôn tập.`,
      wrong: `${counts.wrong.toLocaleString("vi-VN")} từ từng trả lời sai đang chờ bạn chinh phục.`
    };
    elements.exerciseSourceNote.textContent = notes[source];
  }

  function showExerciseSetup() {
    elements.exerciseSetup.hidden = false;
    elements.exerciseSession.hidden = true;
    elements.exerciseComplete.hidden = true;
    elements.exitExerciseButton.hidden = true;
    updateExerciseSourceNote();
  }

  function startExercise(overrideItems = null) {
    const pool = overrideItems || getExercisePool();
    if (!pool.length) {
      const source = elements.exerciseSource.value;
      const message = source === "wrong" ? "Chưa có từ sai để làm lại" : source === "saved" ? "Bạn chưa lưu từ nào" : "Bộ từ này đang trống";
      showToast(message, "!");
      return;
    }
    const count = overrideItems ? overrideItems.length : Math.min(exerciseAmount, pool.length);
    exerciseDeck = shuffleItems(pool).slice(0, count);
    exerciseIndex = 0;
    exerciseResults = [];
    elements.exerciseSetup.hidden = true;
    elements.exerciseComplete.hidden = true;
    elements.exerciseSession.hidden = false;
    elements.exitExerciseButton.hidden = false;
    elements.exerciseTotal.textContent = exerciseDeck.length;
    renderExerciseQuestion();
  }

  function exerciseCard() {
    return exerciseDeck[exerciseIndex];
  }

  function renderExerciseQuestion() {
    const card = exerciseCard();
    if (!card) return;
    const meta = categories[card.category] || categories.dictionary;
    const letters = (card.word.match(/[a-z]/gi) || []).length;
    const wordCount = card.word.trim().split(/\s+/).length;
    elements.exerciseCurrent.textContent = exerciseIndex + 1;
    elements.exerciseProgress.style.width = `${(exerciseResults.length / exerciseDeck.length) * 100}%`;
    elements.exerciseAnsweredCount.textContent = exerciseResults.length;
    elements.exercisePointValue.textContent = `${formatDecimal(10 / exerciseDeck.length)} điểm/câu`;
    elements.writingCategory.textContent = `${meta.emoji} ${meta.name}${card.pos ? ` · ${card.pos}` : ""}`;
    elements.exerciseMeaning.textContent = card.meaning;
    const lengthHint = wordCount > 1 ? `Gồm ${wordCount} từ · ${letters} chữ cái` : `Gồm ${letters} chữ cái`;
    elements.exerciseHint.textContent = `${lengthHint} · Không phân biệt hoa/thường và khoảng trắng`;
    elements.exerciseAnswer.value = "";
    elements.answerInputWrap.className = "answer-input-wrap";
    elements.checkAnswerButton.textContent = exerciseIndex === exerciseDeck.length - 1 ? "Hoàn thành" : "Lưu & tiếp tục";
    setTimeout(() => elements.exerciseAnswer.focus(), 80);
  }

  function submitExerciseAnswer(skipped = false) {
    const card = exerciseCard();
    const answer = elements.exerciseAnswer.value;
    if (!skipped && !answer.trim()) {
      elements.exerciseAnswer.focus();
      showToast("Hãy nhập đáp án hoặc chọn bỏ qua", "!");
      return;
    }
    exerciseResults.push({ id: card.id, answer, skipped });
    markStudied(card.id);
    if (exerciseIndex >= exerciseDeck.length - 1) {
      finishExercise();
      return;
    }
    exerciseIndex += 1;
    renderExerciseQuestion();
  }

  function formatDecimal(value) {
    return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 }).format(value);
  }

  function gradeExerciseResults() {
    exerciseResults = exerciseResults.map((result) => {
      const card = vocabulary.find((item) => item.id === result.id);
      const passed = !result.skipped && normalizeEnglish(result.answer) === normalizeEnglish(card.word);
      return { ...result, passed };
    });
  }

  function renderExerciseReview() {
    elements.exerciseReview.innerHTML = `<h3>Chi tiết đáp án</h3>${exerciseResults.map((result, index) => {
      const card = vocabulary.find((item) => item.id === result.id);
      const answer = result.skipped ? "Đã bỏ qua" : escapeHtml(result.answer);
      return `<article class="review-item ${result.passed ? "pass" : "fail"}">
        <span class="review-number">${index + 1}</span>
        <span class="review-state">${result.passed ? "✓" : "×"}</span>
        <div><strong>${escapeHtml(card.meaning)}</strong>
          <small>Bạn trả lời: <b>${answer}</b></small>
          <small>Đáp án: <b>${escapeHtml(card.word)}</b>${card.ipa ? ` · ${escapeHtml(card.ipa)}` : ""}</small>
        </div>
      </article>`;
    }).join("")}`;
  }

  function finishExercise() {
    gradeExerciseResults();
    const passed = exerciseResults.filter((result) => result.passed).length;
    const failed = exerciseResults.length - passed;
    const score = exerciseResults.length ? (passed / exerciseResults.length) * 10 : 0;
    const wrong = new Set(store.exerciseWrong);
    exerciseResults.forEach((result) => result.passed ? wrong.delete(result.id) : wrong.add(result.id));
    store.exerciseWrong = [...wrong];
    elements.navWrong.textContent = store.exerciseWrong.length;
    saveStore();
    elements.exerciseSession.hidden = true;
    elements.exerciseComplete.hidden = false;
    elements.exitExerciseButton.hidden = true;
    $("#completeScore").textContent = `${formatDecimal(score)}/10`;
    $("#completePass").textContent = passed;
    $("#completeFail").textContent = failed;
    $("#completeTitle").textContent = score >= 8 ? "Xuất sắc!" : score >= 6 ? "Làm tốt lắm!" : "Cố thêm một chút nhé!";
    $("#completeMessage").textContent = failed
      ? `Bạn đạt ${formatDecimal(score)}/10 và có ${failed} từ cần luyện lại.`
      : "Bạn đạt 10/10 và trả lời đúng toàn bộ bài luyện.";
    $("#retryWrongButton").hidden = failed === 0;
    renderExerciseReview();
    updateExerciseSourceNote();
  }

  function renderLibrary() {
    const filtered = getFilteredVocabulary();
    elements.resultCount.textContent = filtered.length;
    elements.vocabularyGrid.innerHTML = filtered.slice(0, visibleLibraryItems).map(vocabCardTemplate).join("");
    elements.loadMoreButton.hidden = visibleLibraryItems >= filtered.length;
    $$(".filter-pill", elements.categoryFilters).forEach((pill) => pill.classList.toggle("active", pill.dataset.filterCategory === libraryCategory));
  }

  function renderSaved() {
    const savedItems = store.saved.map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
    elements.savedGrid.innerHTML = savedItems.map(vocabCardTemplate).join("");
    elements.savedEmpty.classList.toggle("show", savedItems.length === 0);
    $("#studySavedButton").disabled = savedItems.length === 0;
  }

  function showView(viewName) {
    activeView = viewName;
    $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${viewName}View`));
    $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
    if (viewName === "library") renderLibrary();
    if (viewName === "saved") renderSaved();
    if (viewName === "exercise" && elements.exerciseSession.hidden && elements.exerciseComplete.hidden) showExerciseSetup();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMobileMenu();
  }

  function openMobileMenu() {
    elements.sidebar.classList.add("open");
    elements.mobileOverlay.classList.add("show");
  }

  function closeMobileMenu() {
    elements.sidebar.classList.remove("open");
    elements.mobileOverlay.classList.remove("show");
  }

  function resetSession() {
    sessionAnswers = {};
    currentIndex = 0;
    renderCard();
    renderSessionStats();
    showToast("Buổi học đã được làm mới", "↻");
  }

  function bindVocabGridEvents(grid) {
    grid.addEventListener("click", (event) => {
      const speakButton = event.target.closest("[data-speak]");
      const saveButton = event.target.closest("[data-save]");
      if (speakButton) {
        const item = vocabulary.find((word) => word.id === speakButton.dataset.speak);
        if (item) speak(item);
      }
      if (saveButton) toggleSaved(saveButton.dataset.save);
    });
  }

  function initializeEvents() {
    $$(".nav-item").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
    $("#menuButton").addEventListener("click", openMobileMenu);
    elements.mobileOverlay.addEventListener("click", closeMobileMenu);

    elements.sidebarCategories.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      const key = button.dataset.category;
      setDeck(vocabulary.filter((item) => item.category === key), key);
      showView("learn");
    });

    elements.categorySelect.addEventListener("change", (event) => {
      const key = event.target.value;
      const items = key === "all" ? vocabulary : vocabulary.filter((item) => item.category === key);
      setDeck(items, key);
    });

    elements.flashcardScene.addEventListener("click", (event) => {
      if (!event.target.closest("button")) flipCard();
    });
    elements.cardExampleVi.addEventListener("click", (event) => {
      if (!event.currentTarget.classList.contains("translation-error")) return;
      event.stopPropagation();
      renderExampleTranslation(currentCard(), true);
    });
    elements.bookmarkButton.addEventListener("click", (event) => { event.stopPropagation(); toggleSaved(); });
    $("#soundButton").addEventListener("click", (event) => { event.stopPropagation(); speak(); });
    $("#backSoundButton").addEventListener("click", (event) => { event.stopPropagation(); speak(); });
    $("#previousButton").addEventListener("click", () => moveCard(-1));
    $("#nextButton").addEventListener("click", () => moveCard(1));
    $("#againButton").addEventListener("click", () => answerCard("again"));
    $("#hardButton").addEventListener("click", () => answerCard("hard"));
    $("#knownButton").addEventListener("click", () => answerCard("known"));
    $("#shuffleButton").addEventListener("click", shuffleDeck);
    $("#resetSessionButton").addEventListener("click", resetSession);

    elements.categoryFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter-category]");
      if (!button) return;
      libraryCategory = button.dataset.filterCategory;
      visibleLibraryItems = 24;
      renderLibrary();
    });
    elements.librarySearch.addEventListener("input", (event) => {
      libraryQuery = event.target.value;
      visibleLibraryItems = 24;
      renderLibrary();
    });
    elements.levelFilter.addEventListener("change", (event) => {
      libraryLevel = event.target.value;
      visibleLibraryItems = 24;
      renderLibrary();
    });
    $("#clearFilters").addEventListener("click", () => {
      libraryCategory = "all";
      libraryLevel = "all";
      libraryQuery = "";
      visibleLibraryItems = 24;
      elements.librarySearch.value = "";
      elements.levelFilter.value = "all";
      renderLibrary();
    });
    elements.loadMoreButton.addEventListener("click", () => {
      visibleLibraryItems += 24;
      renderLibrary();
    });
    bindVocabGridEvents(elements.vocabularyGrid);
    bindVocabGridEvents(elements.savedGrid);

    $("#studyFilteredButton").addEventListener("click", () => {
      if (setDeck(getFilteredVocabulary(), libraryCategory)) showView("learn");
    });
    $("#studySavedButton").addEventListener("click", () => {
      const savedItems = store.saved.map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
      if (setDeck(savedItems, "all")) showView("learn");
    });
    $("[data-go-learn]").addEventListener("click", () => showView("learn"));

    $("#exerciseAmounts").addEventListener("click", (event) => {
      const button = event.target.closest("[data-amount]");
      if (!button) return;
      exerciseAmount = Number(button.dataset.amount);
      $$("[data-amount]", $("#exerciseAmounts")).forEach((item) => item.classList.toggle("active", item === button));
    });
    elements.exerciseSource.addEventListener("change", updateExerciseSourceNote);
    $("#startExerciseButton").addEventListener("click", () => startExercise());
    elements.exitExerciseButton.addEventListener("click", showExerciseSetup);
    elements.exerciseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitExerciseAnswer();
    });
    elements.skipExerciseButton.addEventListener("click", () => submitExerciseAnswer(true));
    $("#exerciseMeaningSound").addEventListener("click", () => speakText(exerciseCard().meaning, "vi-VN", .88));
    $("#backToSetupButton").addEventListener("click", showExerciseSetup);
    $("#retryWrongButton").addEventListener("click", () => {
      const failedIds = exerciseResults.filter((result) => !result.passed).map((result) => result.id);
      const failedItems = failedIds.map((id) => vocabulary.find((item) => item.id === id)).filter(Boolean);
      startExercise(failedItems);
    });

    elements.globalSearch.addEventListener("input", (event) => {
      libraryQuery = event.target.value;
      elements.librarySearch.value = libraryQuery;
      visibleLibraryItems = 24;
      if (libraryQuery.trim()) showView("library");
      else if (activeView === "library") renderLibrary();
    });

    $("#themeToggle").addEventListener("click", () => {
      store.theme = document.body.classList.toggle("dark") ? "dark" : "light";
      saveStore();
    });

    $("#editGoal").addEventListener("click", () => {
      const input = $(`input[name="goal"][value="${store.dailyGoal}"]`);
      if (input) input.checked = true;
      elements.goalDialog.showModal();
    });
    $("#saveGoal").addEventListener("click", (event) => {
      event.preventDefault();
      const selected = $("input[name='goal']:checked");
      if (selected) store.dailyGoal = Number(selected.value);
      saveStore();
      renderDailyProgress();
      elements.goalDialog.close();
      showToast("Đã cập nhật mục tiêu mỗi ngày", "🎯");
    });

    document.addEventListener("keydown", (event) => {
      const tag = event.target.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        elements.globalSearch.focus();
        return;
      }
      if (typing || activeView !== "learn") return;
      if (event.code === "Space") { event.preventDefault(); flipCard(); }
      else if (event.key === "ArrowLeft") moveCard(-1);
      else if (event.key === "ArrowRight") moveCard(1);
      else if (event.key === "1") answerCard("again");
      else if (event.key === "2") answerCard("hard");
      else if (event.key === "3") answerCard("known");
      else if (event.key.toLowerCase() === "s") speak();
      else if (event.key.toLowerCase() === "b") toggleSaved();
    });

  }

  function initialize() {
    elements.navTotal.textContent = vocabulary.length;
    elements.navSaved.textContent = store.saved.length;
    elements.navWrong.textContent = store.exerciseWrong.length;
    elements.studyTip.textContent = tips[new Date().getDay() % tips.length];
    document.body.classList.toggle("dark", store.theme === "dark");
    renderCategories();
    renderCard();
    renderSessionStats();
    renderDailyProgress();
    renderLibrary();
    renderSaved();
    updateExerciseSourceNote();
    initializeEvents();
    saveStore();
    const requestedView = window.location.hash.slice(1);
    if (["learn", "library", "exercise", "saved"].includes(requestedView)) showView(requestedView);
  }

  initialize();
})();
