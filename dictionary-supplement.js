(() => {
  "use strict";

  const rows = [
    ["490528f36deb", "there", "/ðeə(r)/", "Ở đó, tại đó, chỗ đó, chỗ ấy, đấy.", "I saw some flowers here and there.", "D", 61],
    ["3d637fc60499", "see", "/siː/", "Thấy, trông thấy, nhìn thấy; xem, quan sát, xem xét.", "I can see the mountains from my window.", "V", 62],
    ["f8969a18a0da", "only", "/ˈəʊnli/", "chỉ; duy nhất", "Only you can guess what happened last night.", "D", 63],
    ["cd1b646ebd1f", "so", "/səʊ/", "vì vậy; rất; như thế", "If so, we should start our meeting now.", "D", 64],
    ["30603fa9e0f6", "when", "/wen/", "khi; khi nào", "When will you go to the new library?", "D", 66],
    ["1a73af9e7ae0", "contact", "/ˈkɒntækt/", "liên hệ; tiếp xúc", "Our troops are in contact with the enemy now.", "N", 67],
    ["0154c0dabe71", "here", "/hɪə(r)/", "Đây, ở đây, ở chỗ này.", "Please put your heavy bags here.", "D", 68],
    ["6a577a7743f4", "business", "/ˈbɪznəs/", "kinh doanh; công việc", "They want to do business with your company.", "N", 69],
    ["b7adf77905f5", "who", "/huː/", "ai; người nào", "Who is waiting outside the door?", "P", 70],
    ["ca84d1343b96", "web", "/web/", "mạng lưới; trang web", "A spider spun a web in the corner.", "N", 71],
    ["09706c418809", "also", "/ˈɔːlsəʊ/", "Cũng, cũng vầy, cũng thế.", "He came early, and I did also.", "D", 72],
    ["c9bc849a968f", "now", "/naʊ/", "Bây giờ, lúc này, hiện nay.", "I need to finish my homework now.", "D", 73],
    ["92005ecf3788", "help", "/help/", "Giúp đỡ, cứu giúp.", "Please help me carry these heavy bags outside.", "V", 74],
    ["783923e57ba5", "get", "/ɡet/", "nhận được; có được; lấy được", "You need to get a job to support yourself.", "V", 75],
    ["c4dcbb4b94a4", "pm", "/ˌpiː ˈem/", "từ 12 giờ trưa đến trước 12 giờ đêm.", "The meeting starts at 3 pm.", "N", 76],
    ["8f3a07543988", "view", "/ˈvjuː/", "quan điểm; tầm nhìn; xem", "The mountains went out of view as we drove.", "N", 77],
    ["2dbc2fd2358e", "online", "/ˌɒnˈlaɪn/", "Trực tuyến.", "The class met online after lunch.", "A", 78],
    ["e0996a37c13d", "first", "/fɜːst/", "đầu tiên; thứ nhất", "She was first in line.", "D", 79],
    ["96e8155732e8", "am", "/əm/", "là; thì; ở (ngôi thứ nhất của be)", "I am hungry. Is there any food around?", "V", 80],
    ["0d25cda1b818", "been", "/biːn/", "đã từng; phân từ quá khứ của be", "I have been busy all day long.", "V", 81],
    ["0955dd818206", "would", "/wʊd/", "sẽ; sẽ… nếu; thường", "He said he would help after work.", "V", 82],
    ["0b064373fb4d", "how", "/haʊ/", "thế nào; bằng cách nào", "Do you know how to fix this old car?", "D", 83],
    ["a315dee0bd22", "were", "/wə(r)/", "đã là; đã ở", "They were happy after the long walk.", "V", 84],
    ["b1c1d8736f20", "me", "/miː/", "tôi; cho tôi", "The letter was addressed to me.", "P", 85],
    ["3e7aaa79601a", "services", "/ˈsɜːvɪsɪz/", "các dịch vụ", "The city offers many services for families.", "N", 86],
    ["eb875812858d", "some", "/səm/", "một số; một vài", "Please ask some experienced person for help.", "A", 87],
    ["b93ec56608fb", "click", "/klɪk/", "nhấp chuột; tiếng tách", "Please click the button to continue.", "V", 89],
    ["f803b2638836", "its", "/ɪts/", "của nó", "The dog wagged its tail.", "P", 90],
    ["c4eb7d7fea3c", "like", "/laɪk/", "thích; giống như", "Do you like fish for dinner?", "V", 91],
    ["4cf5bc59bee9", "service", "/ˈsɜːvɪs/", "dịch vụ; sự phục vụ", "The restaurant provides excellent service.", "N", 92],
    ["d820aa5f8750", "than", "/ðən/", "hơn; so với", "She is taller than her brother.", "C", 93],
    ["ded8dae5786f", "find", "/faɪnd/", "tìm; tìm thấy", "I can find my keys now.", "V", 94],
    ["2097c33723b6", "price", "/praɪs/", "giá; giá cả", "The price of this new car is too high.", "N", 95],
    ["e927d0677c77", "date", "/deɪt/", "ngày tháng; cuộc hẹn", "Please write today's date at the top.", "N", 96],
    ["61bb8d29b5be", "back", "/bæk/", "phía sau; trở lại", "Please come back tomorrow.", "D", 97],
    ["af2c7b4ca07a", "top", "/tɒp/", "đỉnh; phía trên cùng", "Put the book on the top shelf.", "N", 98],
    ["ab3ccc8dba2a", "people", "/ˈpiːpəl/", "người; mọi người; dân chúng", "Many people visit the park each day.", "N", 99],
    ["85d72cb875cd", "had", "/hæd/", "đã có; dạng quá khứ của have", "We had a wonderful time yesterday.", "V", 100],
    ["38b62be4bdda", "list", "/lɪst/", "danh sách; liệt kê", "Write your name on the list.", "N", 101],
    ["6ae999552a0d", "name", "/neɪm/", "tên; đặt tên", "Please tell me your name.", "N", 102],
    ["d95b79cfc988", "just", "/dʒʌst/", "vừa mới; chỉ; công bằng", "I just finished my work.", "D", 103],
    ["f0fed7e49323", "over", "/ˈəʊvə(r)/", "trên; qua; kết thúc", "The meeting is finally over.", "D", 104],
    ["aa4a5f8125f2", "state", "/steɪt/", "trạng thái; tình trạng", "The building is in a poor state.", "N", 105],
    ["4ff0b1538469", "year", "/jɪə(r)/", "năm", "We moved here last year.", "N", 106],
    ["a2620cbc10f5", "day", "/deɪ/", "ngày; ban ngày", "It was a beautiful sunny day.", "N", 107],
    ["a379c85f8c69", "into", "/ˈɪntuː/", "vào trong; thành", "She walked into the room.", "E", 108],
    ["a88b7dcd1a9e", "email", "/ˈiːmeɪl/", "thư điện tử; gửi email", "Please send me an email tomorrow.", "N", 109],
    ["ad782ecdac77", "two", "/tuː/", "hai; đôi", "I bought two tickets for the show.", "A", 110],
    ["834b34f16f45", "health", "/helθ/", "sức khỏe", "Regular exercise is good for your health.", "N", 111],
    ["7c211433f020", "world", "/wɜːld/", "thế giới", "People around the world use the internet.", "N", 112],
    ["c387c982a132", "re", "/riː/", "về; liên quan đến", "Re your message, I will reply tomorrow.", "E", 113],
    ["edee9402d198", "next", "/nekst/", "tiếp theo; kế tiếp", "See you again next week.", "A", 114],
    ["192a56759d36", "used", "/juːzd/", "đã dùng; đã quen", "This tool is used to open bottles.", "V", 115],
    ["1ec558a60b5d", "go", "/ɡəʊ/", "đi; đi đến", "I need to go home now.", "V", 116],
    ["e274eeff768c", "work", "/wɜːk/", "công việc; làm việc", "I work in a small office.", "N", 117],
    ["213ed3ea453b", "last", "/lɑːst/", "cuối cùng; gần nhất; kéo dài", "The meeting lasted one hour.", "A", 118],
    ["d00ef164202a", "most", "/məʊst/", "hầu hết; nhiều nhất", "Most people agreed with the plan.", "D", 119],
    ["3a01be17246d", "music", "/ˈmjuːzɪk/", "âm nhạc", "She listens to music every evening.", "N", 121],
    ["a066f070178f", "buy", "/baɪ/", "mua", "I want to buy a new car.", "V", 122]
  ];

  const data = window.DAILY_LINGO_DATA;
  data.vocabulary = data.vocabulary.filter((item) => item.id !== "dict-490528f36deb");
  const wordKey = (word) => word.toLocaleLowerCase("en").trim().replace(/\s+/g, " ");
  const knownWords = new Set(data.vocabulary.map((item) => wordKey(item.word)));
  let duplicatesRemoved = 0;

  rows.forEach(([hash, word, ipa, meaning, example, pos, rank]) => {
    const key = wordKey(word);
    if (knownWords.has(key)) {
      duplicatesRemoved += 1;
      return;
    }
    knownWords.add(key);
    data.vocabulary.push({
      id: `dict-${hash}`,
      word,
      ipa,
      meaning,
      example,
      exampleVi: "",
      level: "A1",
      category: "dictionary",
      pos,
      rank,
      extended: true
    });
  });

  data.vocabulary.sort((left, right) => {
    if (!left.extended && !right.extended) return 0;
    if (!left.extended) return -1;
    if (!right.extended) return 1;
    return left.rank - right.rank;
  });
  data.dictionarySize = data.vocabulary.filter((item) => item.extended).length;
  data.dictionaryDuplicatesRemoved += duplicatesRemoved;
})();
