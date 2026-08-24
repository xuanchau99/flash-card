const CATEGORY_META = {
  basics: { name: "Giao tiếp cơ bản", emoji: "💬", color: "#e77861" },
  introductions: { name: "Chào hỏi & làm quen", emoji: "👋", color: "#d89845" },
  family: { name: "Gia đình & bạn bè", emoji: "👨‍👩‍👧", color: "#b46c78" },
  home: { name: "Nhà cửa & sinh hoạt", emoji: "🏠", color: "#7d9671" },
  food: { name: "Ăn uống", emoji: "🍜", color: "#d47452" },
  shopping: { name: "Mua sắm", emoji: "🛍️", color: "#9b78a5" },
  travel: { name: "Du lịch & đi lại", emoji: "✈️", color: "#4f88a3" },
  work: { name: "Công việc", emoji: "💼", color: "#5c7c70" },
  study: { name: "Học tập", emoji: "📚", color: "#7c79ae" },
  health: { name: "Sức khỏe", emoji: "💊", color: "#c96767" },
  feelings: { name: "Cảm xúc", emoji: "😊", color: "#db9e4b" },
  time: { name: "Thời gian & thời tiết", emoji: "⏰", color: "#5c94a5" },
  phone: { name: "Điện thoại & Internet", emoji: "📱", color: "#637da8" },
  social: { name: "Giao lưu & giải trí", emoji: "🎉", color: "#a56f93" },
  emergency: { name: "Tình huống khẩn cấp", emoji: "🆘", color: "#c45e52" }
};

const VOCABULARY = [];

function addWords(category, block) {
  block.trim().split("\n").forEach((line) => {
    const [word, ipa, meaning, example, exampleVi, level] = line.split("|");
    VOCABULARY.push({
      id: `word-${String(VOCABULARY.length + 1).padStart(3, "0")}`,
      word, ipa, meaning, example, exampleVi, level, category
    });
  });
}

addWords("basics", `
Hello|/həˈləʊ/|Xin chào|Hello! How are you today?|Xin chào! Hôm nay bạn khỏe không?|A1
Please|/pliːz/|Làm ơn|Please sit down for a moment.|Làm ơn ngồi xuống một lát.|A1
Thank you|/ˈθæŋk juː/|Cảm ơn bạn|Thank you for your help.|Cảm ơn bạn đã giúp đỡ.|A1
You're welcome|/jɔː ˈwelkəm/|Không có gì|You're welcome. Anytime!|Không có gì. Bất cứ lúc nào!|A1
Excuse me|/ɪkˈskjuːz miː/|Xin lỗi, cho hỏi|Excuse me, is this seat free?|Xin lỗi, ghế này có trống không?|A1
I'm sorry|/aɪm ˈsɒri/|Tôi xin lỗi|I'm sorry I'm late.|Tôi xin lỗi vì đến muộn.|A1
No problem|/nəʊ ˈprɒbləm/|Không vấn đề gì|No problem, I can wait.|Không sao, tôi có thể đợi.|A1
Of course|/əv kɔːs/|Tất nhiên|Of course you can join us.|Tất nhiên bạn có thể tham gia cùng chúng tôi.|A1
Maybe|/ˈmeɪbi/|Có lẽ|Maybe we can meet tomorrow.|Có lẽ chúng ta có thể gặp ngày mai.|A1
I understand|/aɪ ˌʌndəˈstænd/|Tôi hiểu|I understand what you mean.|Tôi hiểu ý bạn.|A1
I don't understand|/aɪ dəʊnt ˌʌndəˈstænd/|Tôi không hiểu|Sorry, I don't understand.|Xin lỗi, tôi không hiểu.|A1
Could you repeat that?|/kʊd juː rɪˈpiːt ðæt/|Bạn có thể nhắc lại không?|Could you repeat that more slowly?|Bạn có thể nhắc lại chậm hơn không?|A2
What does this mean?|/wɒt dʌz ðɪs miːn/|Cái này nghĩa là gì?|What does this word mean?|Từ này nghĩa là gì?|A1
How do you say...?|/haʊ duː juː seɪ/|Nói ... thế nào?|How do you say this in English?|Nói cái này bằng tiếng Anh thế nào?|A1
That's right|/ðæts raɪt/|Đúng vậy|That's right, you've got it.|Đúng vậy, bạn hiểu rồi đấy.|A1
I agree|/aɪ əˈɡriː/|Tôi đồng ý|I agree with your idea.|Tôi đồng ý với ý tưởng của bạn.|A2
I don't think so|/aɪ dəʊnt θɪŋk səʊ/|Tôi không nghĩ vậy|I don't think so, but let's check.|Tôi không nghĩ vậy, nhưng hãy kiểm tra.|A2
It depends|/ɪt dɪˈpendz/|Còn tùy|It depends on the weather.|Còn tùy vào thời tiết.|A2
Never mind|/ˌnevə ˈmaɪnd/|Đừng bận tâm|Never mind, it's not important.|Đừng bận tâm, chuyện đó không quan trọng.|A2
Take your time|/teɪk jɔː taɪm/|Cứ từ từ|Take your time. There's no rush.|Cứ từ từ. Không cần vội.|A2
Sounds good|/saʊndz ɡʊd/|Nghe hay đấy|Dinner at seven? Sounds good!|Ăn tối lúc bảy giờ nhé? Nghe hay đấy!|A1
That's okay|/ðæts əʊˈkeɪ/|Không sao|That's okay, mistakes happen.|Không sao, ai cũng có lúc mắc lỗi.|A1
Are you sure?|/ɑː juː ʃʊə/|Bạn chắc chứ?|Are you sure this is the right way?|Bạn chắc đây là đường đúng chứ?|A1
Absolutely|/ˌæbsəˈluːtli/|Chắc chắn rồi|Absolutely! I'd love to come.|Chắc chắn rồi! Tôi rất muốn đến.|B1
By the way|/baɪ ðə weɪ/|Nhân tiện|By the way, how is your sister?|Nhân tiện, em gái bạn khỏe không?|A2
`);

addWords("introductions", `
Good morning|/ɡʊd ˈmɔːnɪŋ/|Chào buổi sáng|Good morning, everyone!|Chào buổi sáng mọi người!|A1
Good afternoon|/ɡʊd ˌɑːftəˈnuːn/|Chào buổi chiều|Good afternoon, Mr. Brown.|Chào buổi chiều, ông Brown.|A1
Good evening|/ɡʊd ˈiːvnɪŋ/|Chào buổi tối|Good evening. Welcome to our hotel.|Chào buổi tối. Chào mừng đến khách sạn.|A1
Goodbye|/ˌɡʊdˈbaɪ/|Tạm biệt|Goodbye! See you next week.|Tạm biệt! Hẹn gặp tuần sau.|A1
See you later|/siː juː ˈleɪtə/|Hẹn gặp lại|I have to go. See you later!|Tôi phải đi rồi. Hẹn gặp lại!|A1
How are you?|/haʊ ɑː juː/|Bạn khỏe không?|Hi Anna, how are you?|Chào Anna, bạn khỏe không?|A1
I'm doing well|/aɪm ˈduːɪŋ wel/|Tôi vẫn khỏe|I'm doing well, thanks for asking.|Tôi vẫn khỏe, cảm ơn đã hỏi.|A1
What's your name?|/wɒts jɔː neɪm/|Bạn tên là gì?|Hi, what's your name?|Chào bạn, bạn tên là gì?|A1
My name is...|/maɪ neɪm ɪz/|Tên tôi là...|My name is Minh.|Tên tôi là Minh.|A1
Nice to meet you|/naɪs tə miːt juː/|Rất vui được gặp bạn|Nice to meet you, Maria.|Rất vui được gặp bạn, Maria.|A1
Where are you from?|/weər ɑː juː frɒm/|Bạn đến từ đâu?|Where are you from originally?|Quê gốc của bạn ở đâu?|A1
I'm from Vietnam|/aɪm frɒm ˌvjetˈnæm/|Tôi đến từ Việt Nam|I'm from Vietnam, but I live here.|Tôi đến từ Việt Nam, nhưng sống ở đây.|A1
What do you do?|/wɒt duː juː duː/|Bạn làm nghề gì?|So, what do you do?|Vậy bạn làm nghề gì?|A1
How old are you?|/haʊ əʊld ɑː juː/|Bạn bao nhiêu tuổi?|How old are you, if you don't mind?|Bạn bao nhiêu tuổi, nếu không phiền?|A1
This is my friend|/ðɪs ɪz maɪ frend/|Đây là bạn tôi|This is my friend, Linh.|Đây là bạn tôi, Linh.|A1
Have we met before?|/hæv wiː met bɪˈfɔː/|Chúng ta từng gặp chưa?|Have we met before? You look familiar.|Chúng ta từng gặp chưa? Trông bạn quen lắm.|B1
It's been a while|/ɪts biːn ə waɪl/|Lâu rồi không gặp|Hey! It's been a while.|Chào! Lâu rồi không gặp.|A2
How have you been?|/haʊ hæv juː biːn/|Dạo này bạn thế nào?|How have you been since college?|Bạn thế nào kể từ khi học đại học?|A2
Let me introduce myself|/let miː ˌɪntrəˈdjuːs maɪˈself/|Để tôi tự giới thiệu|Let me introduce myself. I'm Alex.|Để tôi tự giới thiệu. Tôi là Alex.|A2
What should I call you?|/wɒt ʃʊd aɪ kɔːl juː/|Tôi nên gọi bạn là gì?|What should I call you at work?|Ở chỗ làm tôi nên gọi bạn là gì?|A2
Pleased to meet you|/pliːzd tə miːt juː/|Hân hạnh được gặp bạn|Pleased to meet you, Dr. Lee.|Hân hạnh được gặp ông, tiến sĩ Lee.|A2
Welcome|/ˈwelkəm/|Chào mừng|Welcome to our neighborhood!|Chào mừng đến khu phố của chúng tôi!|A1
Make yourself at home|/meɪk jɔːˈself ət həʊm/|Cứ tự nhiên như ở nhà|Come in and make yourself at home.|Vào đi và cứ tự nhiên như ở nhà.|B1
Long time no see|/lɒŋ taɪm nəʊ siː/|Lâu rồi không gặp|Long time no see! You look great.|Lâu rồi không gặp! Trông bạn tuyệt lắm.|A2
Keep in touch|/kiːp ɪn tʌtʃ/|Giữ liên lạc nhé|It was great meeting you. Keep in touch!|Rất vui được gặp bạn. Giữ liên lạc nhé!|A2
`);

addWords("family", `
Parents|/ˈpeərənts/|Bố mẹ|My parents live in Da Nang.|Bố mẹ tôi sống ở Đà Nẵng.|A1
Husband|/ˈhʌzbənd/|Chồng|Her husband is a teacher.|Chồng cô ấy là giáo viên.|A1
Wife|/waɪf/|Vợ|My wife loves gardening.|Vợ tôi thích làm vườn.|A1
Son|/sʌn/|Con trai|Their son is five years old.|Con trai họ năm tuổi.|A1
Daughter|/ˈdɔːtə/|Con gái|She has a teenage daughter.|Cô ấy có một cô con gái tuổi teen.|A1
Brother|/ˈbrʌðə/|Anh/em trai|My brother works abroad.|Anh trai tôi làm việc ở nước ngoài.|A1
Sister|/ˈsɪstə/|Chị/em gái|I often call my older sister.|Tôi thường gọi cho chị gái.|A1
Grandparents|/ˈɡrænpeərənts/|Ông bà|We visit our grandparents on Sundays.|Chúng tôi thăm ông bà vào Chủ nhật.|A1
Relative|/ˈrelətɪv/|Họ hàng|A relative is staying with us.|Một người họ hàng đang ở cùng chúng tôi.|A2
Only child|/ˌəʊnli ˈtʃaɪld/|Con một|I'm an only child.|Tôi là con một.|A2
Get along with|/ɡet əˈlɒŋ wɪð/|Hòa thuận với|I get along well with my cousins.|Tôi rất hòa thuận với các anh chị em họ.|A2
Close friend|/kləʊs frend/|Bạn thân|Lan is one of my close friends.|Lan là một trong những người bạn thân của tôi.|A1
Best friend|/best frend/|Bạn thân nhất|We have been best friends for years.|Chúng tôi là bạn thân nhiều năm rồi.|A1
Roommate|/ˈruːmmeɪt/|Bạn cùng phòng|My roommate is very tidy.|Bạn cùng phòng của tôi rất gọn gàng.|A2
Neighbor|/ˈneɪbə/|Hàng xóm|Our new neighbor seems friendly.|Hàng xóm mới có vẻ thân thiện.|A2
Grow up|/ɡrəʊ ʌp/|Lớn lên|I grew up in a small town.|Tôi lớn lên ở một thị trấn nhỏ.|A2
Take after|/teɪk ˈɑːftə/|Giống ai trong nhà|You really take after your mother.|Bạn thật sự giống mẹ.|B1
Family gathering|/ˈfæməli ˈɡæðərɪŋ/|Họp mặt gia đình|We have a family gathering tonight.|Tối nay chúng tôi họp mặt gia đình.|A2
Hang out|/hæŋ aʊt/|Đi chơi cùng nhau|I hang out with my friends on weekends.|Tôi đi chơi với bạn vào cuối tuần.|A2
Have something in common|/hæv ˈsʌmθɪŋ ɪn ˈkɒmən/|Có điểm chung|We have a lot in common.|Chúng tôi có nhiều điểm chung.|B1
Count on|/kaʊnt ɒn/|Tin cậy, dựa vào|You can always count on me.|Bạn luôn có thể tin cậy tôi.|B1
Catch up|/kætʃ ʌp/|Hàn huyên, cập nhật chuyện|Let's meet and catch up soon.|Hãy sớm gặp nhau hàn huyên nhé.|B1
Look alike|/lʊk əˈlaɪk/|Trông giống nhau|You and your sister look alike.|Bạn và chị gái trông giống nhau.|A2
Supportive|/səˈpɔːtɪv/|Hay hỗ trợ|My family is very supportive.|Gia đình tôi luôn hỗ trợ tôi.|B1
Childhood friend|/ˈtʃaɪldhʊd frend/|Bạn thời thơ ấu|Mai is my childhood friend.|Mai là bạn thời thơ ấu của tôi.|A2
`);

addWords("home", `
Living room|/ˈlɪvɪŋ ruːm/|Phòng khách|We're watching TV in the living room.|Chúng tôi đang xem TV trong phòng khách.|A1
Bedroom|/ˈbedruːm/|Phòng ngủ|The bedroom is upstairs.|Phòng ngủ ở trên lầu.|A1
Kitchen|/ˈkɪtʃɪn/|Nhà bếp|Dinner is ready in the kitchen.|Bữa tối đã sẵn sàng trong bếp.|A1
Bathroom|/ˈbɑːθruːm/|Phòng tắm|Is there a bathroom nearby?|Có phòng tắm nào gần đây không?|A1
Balcony|/ˈbælkəni/|Ban công|I grow herbs on the balcony.|Tôi trồng rau thơm ở ban công.|A2
Furniture|/ˈfɜːnɪtʃə/|Đồ nội thất|We need some new furniture.|Chúng tôi cần vài món nội thất mới.|A2
Do the laundry|/duː ðə ˈlɔːndri/|Giặt quần áo|I do the laundry every Saturday.|Tôi giặt đồ mỗi thứ Bảy.|A2
Wash the dishes|/wɒʃ ðə ˈdɪʃɪz/|Rửa bát|Could you wash the dishes tonight?|Tối nay bạn rửa bát được không?|A1
Take out the trash|/teɪk aʊt ðə træʃ/|Đổ rác|Don't forget to take out the trash.|Đừng quên đổ rác.|A2
Clean up|/kliːn ʌp/|Dọn dẹp|Let's clean up after dinner.|Hãy dọn dẹp sau bữa tối.|A1
Make the bed|/meɪk ðə bed/|Dọn giường|I make the bed every morning.|Tôi dọn giường mỗi sáng.|A1
Turn on|/tɜːn ɒn/|Bật|Can you turn on the light?|Bạn bật đèn được không?|A1
Turn off|/tɜːn ɒf/|Tắt|Please turn off the fan.|Làm ơn tắt quạt.|A1
Lock the door|/lɒk ðə dɔː/|Khóa cửa|Remember to lock the door.|Nhớ khóa cửa nhé.|A1
Move in|/muːv ɪn/|Chuyển vào ở|We're moving in next month.|Tháng tới chúng tôi sẽ chuyển vào.|A2
Rent|/rent/|Thuê; tiền thuê|How much is the monthly rent?|Tiền thuê hằng tháng bao nhiêu?|A2
Landlord|/ˈlændlɔːd/|Chủ nhà|I need to call the landlord.|Tôi cần gọi cho chủ nhà.|A2
Cozy|/ˈkəʊzi/|Ấm cúng|Your apartment feels very cozy.|Căn hộ của bạn rất ấm cúng.|B1
Messy|/ˈmesi/|Bừa bộn|My desk is a little messy.|Bàn làm việc của tôi hơi bừa bộn.|A2
Tidy|/ˈtaɪdi/|Gọn gàng|Please keep your room tidy.|Hãy giữ phòng bạn gọn gàng.|A2
Fix|/fɪks/|Sửa chữa|Can you fix the leaking tap?|Bạn sửa vòi nước rò được không?|A2
Power outage|/ˈpaʊər ˈaʊtɪdʒ/|Mất điện|There was a power outage last night.|Tối qua bị mất điện.|B1
Housewarming|/ˈhaʊswɔːmɪŋ/|Tiệc tân gia|We're having a housewarming party.|Chúng tôi sẽ tổ chức tiệc tân gia.|B1
Feel at home|/fiːl ət həʊm/|Cảm thấy tự nhiên như ở nhà|They made me feel at home.|Họ khiến tôi cảm thấy như ở nhà.|B1
Chore|/tʃɔː/|Việc nhà|We share the household chores.|Chúng tôi chia sẻ việc nhà.|B1
`);

addWords("food", `
I'm hungry|/aɪm ˈhʌŋɡri/|Tôi đói|I'm hungry. Let's get lunch.|Tôi đói rồi. Đi ăn trưa nhé.|A1
I'm thirsty|/aɪm ˈθɜːsti/|Tôi khát|I'm thirsty. Can I have some water?|Tôi khát. Cho tôi chút nước được không?|A1
Breakfast|/ˈbrekfəst/|Bữa sáng|I usually have eggs for breakfast.|Tôi thường ăn trứng vào bữa sáng.|A1
Lunch|/lʌntʃ/|Bữa trưa|What do you want for lunch?|Bạn muốn ăn gì vào bữa trưa?|A1
Dinner|/ˈdɪnə/|Bữa tối|Dinner will be ready at seven.|Bữa tối sẽ sẵn sàng lúc bảy giờ.|A1
Menu|/ˈmenjuː/|Thực đơn|Could I see the menu, please?|Cho tôi xem thực đơn được không?|A1
Order|/ˈɔːdə/|Gọi món|Are you ready to order?|Bạn sẵn sàng gọi món chưa?|A1
I'd like...|/aɪd laɪk/|Tôi muốn...|I'd like a cup of coffee.|Tôi muốn một tách cà phê.|A1
Delicious|/dɪˈlɪʃəs/|Ngon|This soup is delicious!|Món súp này ngon quá!|A1
Spicy|/ˈspaɪsi/|Cay|Is this dish very spicy?|Món này có cay lắm không?|A1
Sweet|/swiːt/|Ngọt|This tea is too sweet for me.|Trà này quá ngọt với tôi.|A1
Vegetarian|/ˌvedʒəˈteəriən/|Người/đồ ăn chay|Do you have a vegetarian option?|Bạn có lựa chọn món chay không?|A2
Allergic to|/əˈlɜːdʒɪk tuː/|Dị ứng với|I'm allergic to peanuts.|Tôi dị ứng với đậu phộng.|A2
The bill, please|/ðə bɪl pliːz/|Cho tôi thanh toán|Could we have the bill, please?|Cho chúng tôi thanh toán được không?|A1
Keep the change|/kiːp ðə tʃeɪndʒ/|Giữ lại tiền thừa|Keep the change. Thank you.|Giữ lại tiền thừa nhé. Cảm ơn.|A2
Takeaway|/ˈteɪkəweɪ/|Đồ mang đi|Can I get this as a takeaway?|Tôi lấy món này mang đi được không?|A2
Reservation|/ˌrezəˈveɪʃən/|Đặt bàn|I have a reservation for two.|Tôi đã đặt bàn cho hai người.|A2
Recommend|/ˌrekəˈmend/|Gợi ý, đề xuất|What do you recommend here?|Ở đây bạn gợi ý món gì?|A2
Well done|/ˌwel ˈdʌn/|Chín kỹ|I'd like my steak well done.|Tôi muốn bít tết chín kỹ.|A2
Medium rare|/ˌmiːdiəm ˈreə/|Chín tái|Can I have it medium rare?|Cho tôi món này chín tái được không?|B1
Help yourself|/help jɔːˈself/|Cứ tự nhiên lấy đồ ăn|Please help yourself to some cake.|Cứ tự nhiên lấy bánh nhé.|A2
I'm full|/aɪm fʊl/|Tôi no rồi|Thanks, but I'm full.|Cảm ơn, nhưng tôi no rồi.|A1
Grab a bite|/ɡræb ə baɪt/|Ăn nhanh chút gì|Let's grab a bite after work.|Hãy ăn nhanh chút gì sau giờ làm.|B1
Eat out|/iːt aʊt/|Ăn ngoài|We eat out once a week.|Chúng tôi ăn ngoài mỗi tuần một lần.|A2
On the house|/ɒn ðə haʊs/|Miễn phí từ nhà hàng|Dessert is on the house tonight.|Tối nay món tráng miệng được miễn phí.|B1
`);

addWords("shopping", `
How much is it?|/haʊ mʌtʃ ɪz ɪt/|Cái này bao nhiêu tiền?|Excuse me, how much is it?|Xin lỗi, cái này bao nhiêu tiền?|A1
Price|/praɪs/|Giá|The price is clearly marked.|Giá được ghi rõ ràng.|A1
Cheap|/tʃiːp/|Rẻ|These shoes were really cheap.|Đôi giày này thật sự rẻ.|A1
Expensive|/ɪkˈspensɪv/|Đắt|That jacket is too expensive.|Áo khoác đó quá đắt.|A1
Discount|/ˈdɪskaʊnt/|Giảm giá|Is there a student discount?|Có giảm giá cho sinh viên không?|A2
Sale|/seɪl/|Đợt giảm giá|This bag is on sale today.|Hôm nay túi này đang giảm giá.|A1
Try on|/traɪ ɒn/|Thử đồ|Can I try this shirt on?|Tôi thử áo này được không?|A1
Fitting room|/ˈfɪtɪŋ ruːm/|Phòng thử đồ|Where is the fitting room?|Phòng thử đồ ở đâu?|A2
Size|/saɪz/|Kích cỡ|Do you have this in a larger size?|Bạn có cái này cỡ lớn hơn không?|A1
It fits|/ɪt fɪts/|Nó vừa|This dress fits me perfectly.|Chiếc váy này vừa tôi hoàn hảo.|A1
Too tight|/tuː taɪt/|Quá chật|These jeans are too tight.|Quần jean này quá chật.|A1
Too loose|/tuː luːs/|Quá rộng|The sleeves are too loose.|Tay áo quá rộng.|A1
Cash|/kæʃ/|Tiền mặt|Can I pay in cash?|Tôi trả bằng tiền mặt được không?|A1
Credit card|/ˈkredɪt kɑːd/|Thẻ tín dụng|Do you accept credit cards?|Bạn có nhận thẻ tín dụng không?|A1
Receipt|/rɪˈsiːt/|Hóa đơn|Can I have the receipt, please?|Cho tôi xin hóa đơn được không?|A2
Change|/tʃeɪndʒ/|Tiền thừa|Here's your change.|Đây là tiền thừa của bạn.|A1
Return|/rɪˈtɜːn/|Trả lại hàng|I'd like to return this item.|Tôi muốn trả lại món này.|A2
Exchange|/ɪksˈtʃeɪndʒ/|Đổi hàng|Can I exchange it for another color?|Tôi đổi sang màu khác được không?|A2
Out of stock|/aʊt əv stɒk/|Hết hàng|Sorry, that size is out of stock.|Xin lỗi, cỡ đó hết hàng rồi.|B1
Browse|/braʊz/|Xem hàng|I'm just browsing, thanks.|Tôi chỉ xem thôi, cảm ơn.|B1
Bargain|/ˈbɑːɡɪn/|Món hời|This coat was a real bargain.|Chiếc áo này đúng là món hời.|B1
Brand|/brænd/|Thương hiệu|Which brand do you prefer?|Bạn thích thương hiệu nào?|A2
Checkout|/ˈtʃekaʊt/|Quầy thanh toán|The checkout is near the exit.|Quầy thanh toán gần lối ra.|A2
Shopping cart|/ˈʃɒpɪŋ kɑːt/|Xe đẩy mua hàng|Put the milk in the shopping cart.|Đặt sữa vào xe đẩy mua hàng.|A2
Worth it|/wɜːθ ɪt/|Đáng tiền|It's expensive, but it's worth it.|Nó đắt nhưng đáng tiền.|B1
`);

addWords("travel", `
Ticket|/ˈtɪkɪt/|Vé|I'd like a ticket to London.|Tôi muốn một vé đi London.|A1
One-way|/ˌwʌn ˈweɪ/|Một chiều|Is that a one-way ticket?|Đó là vé một chiều phải không?|A2
Round trip|/ˌraʊnd ˈtrɪp/|Khứ hồi|A round-trip ticket is cheaper.|Vé khứ hồi rẻ hơn.|A2
Platform|/ˈplætfɔːm/|Sân ga|Which platform does the train leave from?|Tàu rời từ sân ga nào?|A2
Departure|/dɪˈpɑːtʃə/|Khởi hành|The departure time is 8:30.|Giờ khởi hành là 8:30.|A2
Arrival|/əˈraɪvəl/|Đến nơi|Our arrival was delayed.|Chúng tôi đến nơi muộn.|A2
Boarding pass|/ˈbɔːdɪŋ pɑːs/|Thẻ lên máy bay|Please show your boarding pass.|Vui lòng xuất trình thẻ lên máy bay.|A2
Gate|/ɡeɪt/|Cổng ra máy bay|Our flight leaves from gate 12.|Chuyến bay rời từ cổng 12.|A1
Luggage|/ˈlʌɡɪdʒ/|Hành lý|Where can I leave my luggage?|Tôi có thể để hành lý ở đâu?|A2
Passport|/ˈpɑːspɔːt/|Hộ chiếu|Keep your passport somewhere safe.|Hãy giữ hộ chiếu ở nơi an toàn.|A1
Book a room|/bʊk ə ruːm/|Đặt phòng|I'd like to book a room for two nights.|Tôi muốn đặt phòng hai đêm.|A1
Check in|/tʃek ɪn/|Làm thủ tục nhận phòng|What time can we check in?|Mấy giờ chúng tôi có thể nhận phòng?|A2
Check out|/tʃek aʊt/|Làm thủ tục trả phòng|We need to check out before noon.|Chúng tôi cần trả phòng trước trưa.|A2
Where is...?|/weər ɪz/|... ở đâu?|Excuse me, where is the station?|Xin lỗi, nhà ga ở đâu?|A1
How do I get to...?|/haʊ duː aɪ ɡet tuː/|Tôi đến ... bằng cách nào?|How do I get to the city center?|Tôi đến trung tâm thành phố bằng cách nào?|A1
Turn left|/tɜːn left/|Rẽ trái|Turn left at the traffic lights.|Rẽ trái ở đèn giao thông.|A1
Turn right|/tɜːn raɪt/|Rẽ phải|Turn right after the bank.|Rẽ phải sau ngân hàng.|A1
Go straight|/ɡəʊ streɪt/|Đi thẳng|Go straight for two blocks.|Đi thẳng hai dãy nhà.|A1
Nearby|/ˌnɪəˈbaɪ/|Gần đây|Is there an ATM nearby?|Có cây ATM nào gần đây không?|A2
Get lost|/ɡet lɒst/|Bị lạc|We got lost in the old town.|Chúng tôi bị lạc trong phố cổ.|A2
Traffic jam|/ˈtræfɪk dʒæm/|Tắc đường|I was late because of a traffic jam.|Tôi đến muộn vì tắc đường.|A2
Rent a car|/rent ə kɑː/|Thuê xe|We plan to rent a car tomorrow.|Ngày mai chúng tôi định thuê xe.|A2
Sightseeing|/ˈsaɪtsiːɪŋ/|Tham quan|We went sightseeing all day.|Chúng tôi đi tham quan cả ngày.|A2
Local|/ˈləʊkəl/|Địa phương|Ask a local for directions.|Hãy hỏi người địa phương đường đi.|A2
Itinerary|/aɪˈtɪnərəri/|Lịch trình|Our itinerary includes three cities.|Lịch trình có ba thành phố.|B1
`);

addWords("work", `
Job|/dʒɒb/|Công việc|I'm looking for a new job.|Tôi đang tìm công việc mới.|A1
Office|/ˈɒfɪs/|Văn phòng|I'll be at the office all morning.|Tôi sẽ ở văn phòng cả sáng.|A1
Colleague|/ˈkɒliːɡ/|Đồng nghiệp|She's a colleague from my team.|Cô ấy là đồng nghiệp trong nhóm tôi.|A2
Boss|/bɒs/|Sếp|My boss is away this week.|Sếp tôi đi vắng tuần này.|A1
Meeting|/ˈmiːtɪŋ/|Cuộc họp|We have a meeting at ten.|Chúng ta có cuộc họp lúc mười giờ.|A1
Schedule|/ˈʃedjuːl/|Lịch trình|Let me check my schedule.|Để tôi kiểm tra lịch.|A2
Deadline|/ˈdedlaɪn/|Hạn chót|The deadline is next Friday.|Hạn chót là thứ Sáu tới.|A2
Project|/ˈprɒdʒekt/|Dự án|This project is almost finished.|Dự án này gần hoàn thành.|A1
Task|/tɑːsk/|Nhiệm vụ|I have one more task to do.|Tôi còn một nhiệm vụ phải làm.|A2
Take a break|/teɪk ə breɪk/|Nghỉ giải lao|Let's take a short break.|Hãy nghỉ một lát.|A1
Work from home|/wɜːk frɒm həʊm/|Làm việc tại nhà|I work from home on Fridays.|Tôi làm việc tại nhà vào thứ Sáu.|A2
Day off|/deɪ ɒf/|Ngày nghỉ|I'm taking a day off tomorrow.|Ngày mai tôi xin nghỉ.|A2
Salary|/ˈsæləri/|Lương|They offered me a higher salary.|Họ đề nghị tôi mức lương cao hơn.|A2
Apply for|/əˈplaɪ fɔː/|Ứng tuyển|I'd like to apply for this position.|Tôi muốn ứng tuyển vị trí này.|B1
Interview|/ˈɪntəvjuː/|Phỏng vấn|My job interview is on Monday.|Buổi phỏng vấn của tôi vào thứ Hai.|A2
Experience|/ɪkˈspɪəriəns/|Kinh nghiệm|Do you have any sales experience?|Bạn có kinh nghiệm bán hàng không?|A2
Get promoted|/ɡet prəˈməʊtɪd/|Được thăng chức|She got promoted last month.|Cô ấy được thăng chức tháng trước.|B1
Resign|/rɪˈzaɪn/|Nghỉ việc|He decided to resign from his job.|Anh ấy quyết định nghỉ việc.|B1
Be in charge of|/biː ɪn tʃɑːdʒ əv/|Chịu trách nhiệm|I'm in charge of customer support.|Tôi phụ trách hỗ trợ khách hàng.|B1
Figure out|/ˈfɪɡər aʊt/|Tìm cách giải quyết|We'll figure out a solution.|Chúng ta sẽ tìm ra giải pháp.|B1
Follow up|/ˈfɒləʊ ʌp/|Theo dõi, liên hệ lại|I'll follow up by email.|Tôi sẽ liên hệ lại qua email.|B1
Workload|/ˈwɜːkləʊd/|Khối lượng công việc|My workload is heavy this week.|Tuần này khối lượng việc của tôi nhiều.|B1
Give feedback|/ɡɪv ˈfiːdbæk/|Đưa ra phản hồi|Could you give me some feedback?|Bạn có thể cho tôi phản hồi không?|B1
Call it a day|/kɔːl ɪt ə deɪ/|Kết thúc ngày làm việc|It's six. Let's call it a day.|Sáu giờ rồi. Hôm nay làm đến đây thôi.|B1
On the same page|/ɒn ðə seɪm peɪdʒ/|Cùng hiểu, cùng quan điểm|Let's make sure we're on the same page.|Hãy đảm bảo chúng ta hiểu giống nhau.|B2
`);

addWords("study", `
Class|/klɑːs/|Lớp học|Our English class starts at nine.|Lớp tiếng Anh bắt đầu lúc chín giờ.|A1
Teacher|/ˈtiːtʃə/|Giáo viên|The teacher explained it clearly.|Giáo viên giải thích rất rõ.|A1
Student|/ˈstjuːdənt/|Học sinh, sinh viên|She's an international student.|Cô ấy là sinh viên quốc tế.|A1
Homework|/ˈhəʊmwɜːk/|Bài tập về nhà|Have you finished your homework?|Bạn đã làm xong bài tập chưa?|A1
Exam|/ɪɡˈzæm/|Kỳ thi|I have an exam tomorrow.|Ngày mai tôi có kỳ thi.|A1
Grade|/ɡreɪd/|Điểm số|I got a good grade in math.|Tôi được điểm tốt môn toán.|A2
Subject|/ˈsʌbdʒɪkt/|Môn học|What's your favorite subject?|Môn học yêu thích của bạn là gì?|A1
Lesson|/ˈlesən/|Bài học|Today's lesson was interesting.|Bài học hôm nay rất thú vị.|A1
Take notes|/teɪk nəʊts/|Ghi chép|I always take notes in class.|Tôi luôn ghi chép trong lớp.|A2
Pay attention|/peɪ əˈtenʃən/|Chú ý|Please pay attention to this part.|Hãy chú ý phần này.|A2
Look up|/lʊk ʌp/|Tra cứu|Look up the word in a dictionary.|Tra từ này trong từ điển.|A2
Hand in|/hænd ɪn/|Nộp bài|Please hand in your essays by Friday.|Hãy nộp bài luận trước thứ Sáu.|B1
Catch up on|/kætʃ ʌp ɒn/|Học bù, làm bù|I need to catch up on my reading.|Tôi cần đọc bù.|B1
Learn by heart|/lɜːn baɪ hɑːt/|Học thuộc lòng|We had to learn the poem by heart.|Chúng tôi phải học thuộc bài thơ.|B1
Make progress|/meɪk ˈprəʊɡres/|Tiến bộ|You're making great progress.|Bạn đang tiến bộ rất tốt.|A2
Practice|/ˈpræktɪs/|Luyện tập|Practice speaking every day.|Luyện nói mỗi ngày.|A1
Improve|/ɪmˈpruːv/|Cải thiện|I want to improve my pronunciation.|Tôi muốn cải thiện phát âm.|A2
Concentrate|/ˈkɒnsəntreɪt/|Tập trung|I can't concentrate with this noise.|Tôi không thể tập trung vì tiếng ồn.|B1
Review|/rɪˈvjuː/|Ôn tập|Let's review what we learned.|Hãy ôn lại điều đã học.|A2
Assignment|/əˈsaɪnmənt/|Bài tập được giao|This assignment is due tomorrow.|Bài tập này phải nộp ngày mai.|A2
Research|/rɪˈsɜːtʃ/|Nghiên cứu|I'm doing research for my essay.|Tôi đang nghiên cứu cho bài luận.|B1
Scholarship|/ˈskɒləʃɪp/|Học bổng|She won a scholarship to study abroad.|Cô ấy giành học bổng du học.|B1
Graduate|/ˈɡrædʒueɪt/|Tốt nghiệp|I graduate from university next year.|Tôi tốt nghiệp đại học năm tới.|A2
Fluent|/ˈfluːənt/|Thông thạo|She is fluent in three languages.|Cô ấy thông thạo ba ngôn ngữ.|B1
Make a mistake|/meɪk ə mɪˈsteɪk/|Mắc lỗi|Don't be afraid to make a mistake.|Đừng sợ mắc lỗi.|A2
`);

addWords("health", `
How do you feel?|/haʊ duː juː fiːl/|Bạn cảm thấy thế nào?|How do you feel this morning?|Sáng nay bạn thấy thế nào?|A1
I feel sick|/aɪ fiːl sɪk/|Tôi thấy không khỏe|I feel sick and need to rest.|Tôi thấy không khỏe và cần nghỉ.|A1
Headache|/ˈhedeɪk/|Đau đầu|I have a terrible headache.|Tôi bị đau đầu khủng khiếp.|A1
Stomachache|/ˈstʌməkeɪk/|Đau bụng|This food gave me a stomachache.|Món này làm tôi đau bụng.|A1
Sore throat|/sɔː θrəʊt/|Đau họng|I've got a sore throat.|Tôi bị đau họng.|A2
Cough|/kɒf/|Ho|My cough is getting better.|Cơn ho của tôi đang đỡ hơn.|A1
Fever|/ˈfiːvə/|Sốt|She has a high fever.|Cô ấy bị sốt cao.|A1
Cold|/kəʊld/|Cảm lạnh|I think I've caught a cold.|Tôi nghĩ mình bị cảm lạnh.|A1
Medicine|/ˈmedsən/|Thuốc|Take this medicine after meals.|Uống thuốc này sau bữa ăn.|A1
Pharmacy|/ˈfɑːməsi/|Nhà thuốc|Is there a pharmacy nearby?|Có nhà thuốc nào gần đây không?|A2
Doctor's appointment|/ˈdɒktəz əˈpɔɪntmənt/|Lịch hẹn bác sĩ|I have a doctor's appointment at three.|Tôi có lịch bác sĩ lúc ba giờ.|A2
Get better|/ɡet ˈbetə/|Khỏe hơn|I hope you get better soon.|Mong bạn sớm khỏe.|A1
Take care|/teɪk keə/|Giữ gìn sức khỏe|Take care and get some rest.|Giữ sức khỏe và nghỉ ngơi nhé.|A1
Feel dizzy|/fiːl ˈdɪzi/|Cảm thấy chóng mặt|I suddenly feel dizzy.|Tôi đột nhiên thấy chóng mặt.|A2
In pain|/ɪn peɪn/|Đang đau|My shoulder is still in pain.|Vai tôi vẫn còn đau.|A2
Allergy|/ˈælədʒi/|Dị ứng|Do you have any allergies?|Bạn có dị ứng gì không?|A2
Prescription|/prɪˈskrɪpʃən/|Đơn thuốc|You need a prescription for this.|Bạn cần đơn thuốc cho loại này.|B1
Side effect|/saɪd ɪˈfekt/|Tác dụng phụ|This medicine can have side effects.|Thuốc này có thể có tác dụng phụ.|B1
Recover|/rɪˈkʌvə/|Hồi phục|It took me a week to recover.|Tôi mất một tuần để hồi phục.|B1
Stay healthy|/steɪ ˈhelθi/|Giữ sức khỏe|Exercise helps you stay healthy.|Tập thể dục giúp bạn khỏe mạnh.|A2
Work out|/wɜːk aʊt/|Tập thể dục|I work out three times a week.|Tôi tập thể dục ba lần mỗi tuần.|A2
Cut down on|/kʌt daʊn ɒn/|Cắt giảm|I'm trying to cut down on sugar.|Tôi đang cố giảm đường.|B1
Get enough sleep|/ɡet ɪˈnʌf sliːp/|Ngủ đủ giấc|Make sure you get enough sleep.|Hãy đảm bảo bạn ngủ đủ.|A2
Under the weather|/ˈʌndə ðə ˈweðə/|Cảm thấy không khỏe|I'm feeling a bit under the weather.|Tôi cảm thấy hơi không khỏe.|B1
I need an ambulance|/aɪ niːd ən ˈæmbjələns/|Tôi cần xe cấp cứu|I need an ambulance right away.|Tôi cần xe cấp cứu ngay.|A2
`);

addWords("feelings", `
Happy|/ˈhæpi/|Vui vẻ|I'm so happy to see you.|Tôi rất vui được gặp bạn.|A1
Sad|/sæd/|Buồn|Why do you look so sad?|Sao trông bạn buồn vậy?|A1
Excited|/ɪkˈsaɪtɪd/|Hào hứng|I'm excited about the trip.|Tôi hào hứng về chuyến đi.|A1
Tired|/ˈtaɪəd/|Mệt|I'm tired after a long day.|Tôi mệt sau một ngày dài.|A1
Bored|/bɔːd/|Chán|The kids are getting bored.|Bọn trẻ bắt đầu thấy chán.|A1
Worried|/ˈwʌrid/|Lo lắng|I'm worried about the exam.|Tôi lo về kỳ thi.|A1
Nervous|/ˈnɜːvəs/|Hồi hộp|I always feel nervous before interviews.|Tôi luôn hồi hộp trước phỏng vấn.|A2
Surprised|/səˈpraɪzd/|Ngạc nhiên|I was surprised by the news.|Tôi ngạc nhiên vì tin đó.|A2
Angry|/ˈæŋɡri/|Tức giận|Are you angry with me?|Bạn giận tôi à?|A1
Confused|/kənˈfjuːzd/|Bối rối|I'm confused by these instructions.|Tôi bối rối vì hướng dẫn này.|A2
Proud|/praʊd/|Tự hào|I'm proud of what you did.|Tôi tự hào về điều bạn làm.|A2
Disappointed|/ˌdɪsəˈpɔɪntɪd/|Thất vọng|We were disappointed with the result.|Chúng tôi thất vọng về kết quả.|A2
Relaxed|/rɪˈlækst/|Thư giãn|I feel relaxed after yoga.|Tôi thấy thư giãn sau khi tập yoga.|A2
Embarrassed|/ɪmˈbærəst/|Xấu hổ, ngượng|I felt embarrassed about my mistake.|Tôi thấy ngượng vì lỗi của mình.|B1
Grateful|/ˈɡreɪtfəl/|Biết ơn|I'm grateful for your support.|Tôi biết ơn sự hỗ trợ của bạn.|B1
Jealous|/ˈdʒeləs/|Ghen tị|There's no need to feel jealous.|Không cần phải ghen tị.|B1
Calm down|/kɑːm daʊn/|Bình tĩnh lại|Take a breath and calm down.|Hít thở và bình tĩnh lại.|A2
Cheer up|/tʃɪər ʌp/|Vui lên|Cheer up! Things will get better.|Vui lên! Mọi chuyện sẽ tốt hơn.|A2
Fed up with|/fed ʌp wɪð/|Chán ngấy|I'm fed up with this traffic.|Tôi chán ngấy cảnh tắc đường này.|B1
In a good mood|/ɪn ə ɡʊd muːd/|Tâm trạng tốt|You seem to be in a good mood.|Bạn có vẻ đang vui.|A2
It made my day|/ɪt meɪd maɪ deɪ/|Điều đó làm tôi rất vui|Your message really made my day.|Tin nhắn của bạn làm tôi vui cả ngày.|B1
I can't wait|/aɪ kɑːnt weɪt/|Tôi nóng lòng|I can't wait to see everyone.|Tôi nóng lòng gặp mọi người.|A2
What a relief|/wɒt ə rɪˈliːf/|Thật nhẹ nhõm|You found the keys? What a relief!|Bạn tìm thấy chìa khóa rồi? Thật nhẹ nhõm!|B1
Feel left out|/fiːl left aʊt/|Cảm thấy bị bỏ rơi|I felt left out of the conversation.|Tôi cảm thấy bị đứng ngoài cuộc trò chuyện.|B1
Overwhelmed|/ˌəʊvəˈwelmd/|Quá tải|I'm feeling overwhelmed with work.|Tôi cảm thấy quá tải vì công việc.|B2
`);

addWords("time", `
What time is it?|/wɒt taɪm ɪz ɪt/|Mấy giờ rồi?|Excuse me, what time is it?|Xin lỗi, mấy giờ rồi?|A1
It's half past seven|/ɪts hɑːf pɑːst ˈsevən/|Bảy giờ rưỡi|It's half past seven already.|Đã bảy giờ rưỡi rồi.|A1
Early|/ˈɜːli/|Sớm|I woke up early today.|Hôm nay tôi dậy sớm.|A1
Late|/leɪt/|Muộn|Sorry, the bus was late.|Xin lỗi, xe buýt đến muộn.|A1
On time|/ɒn taɪm/|Đúng giờ|Please try to be on time.|Hãy cố gắng đúng giờ.|A1
Right now|/raɪt naʊ/|Ngay bây giờ|I'm busy right now.|Ngay bây giờ tôi đang bận.|A1
In a minute|/ɪn ə ˈmɪnɪt/|Một lát nữa|I'll be there in a minute.|Tôi sẽ đến đó trong một lát.|A1
The day after tomorrow|/ðə deɪ ˈɑːftə təˈmɒrəʊ/|Ngày kia|We're leaving the day after tomorrow.|Chúng tôi sẽ đi vào ngày kia.|A2
The other day|/ði ˈʌðə deɪ/|Hôm nọ|I saw Nam the other day.|Hôm nọ tôi gặp Nam.|B1
Once in a while|/wʌns ɪn ə waɪl/|Thỉnh thoảng|We eat out once in a while.|Thỉnh thoảng chúng tôi ăn ngoài.|B1
What's the weather like?|/wɒts ðə ˈweðə laɪk/|Thời tiết thế nào?|What's the weather like today?|Hôm nay thời tiết thế nào?|A1
Sunny|/ˈsʌni/|Có nắng|It's warm and sunny outside.|Ngoài trời ấm và có nắng.|A1
Cloudy|/ˈklaʊdi/|Nhiều mây|It will be cloudy this afternoon.|Chiều nay trời nhiều mây.|A1
Rainy|/ˈreɪni/|Có mưa|It's a cold, rainy day.|Đó là một ngày lạnh và mưa.|A1
Windy|/ˈwɪndi/|Có gió|It's too windy for a picnic.|Trời quá gió để đi dã ngoại.|A1
Humid|/ˈhjuːmɪd/|Ẩm|Summers here are hot and humid.|Mùa hè ở đây nóng và ẩm.|A2
Forecast|/ˈfɔːkɑːst/|Dự báo thời tiết|Did you check the weather forecast?|Bạn xem dự báo thời tiết chưa?|A2
It looks like rain|/ɪt lʊks laɪk reɪn/|Có vẻ sắp mưa|Take an umbrella. It looks like rain.|Mang ô nhé. Có vẻ sắp mưa.|A2
Clear up|/klɪər ʌp/|Trời quang|It should clear up this afternoon.|Chiều nay trời sẽ quang.|B1
Freezing|/ˈfriːzɪŋ/|Lạnh cóng|It's absolutely freezing outside.|Ngoài trời lạnh cóng.|A2
Boiling hot|/ˈbɔɪlɪŋ hɒt/|Nóng như thiêu|It's boiling hot today.|Hôm nay nóng như thiêu.|A2
Time flies|/taɪm flaɪz/|Thời gian trôi nhanh|Time flies when you're having fun.|Thời gian trôi nhanh khi vui.|B1
No need to rush|/nəʊ niːd tə rʌʃ/|Không cần vội|There's no need to rush with the form.|Không cần vội điền biểu mẫu.|A2
For the time being|/fɔː ðə taɪm ˈbiːɪŋ/|Trong thời gian hiện tại|I'll stay here for the time being.|Hiện tại tôi sẽ ở đây.|B2
Better late than never|/ˈbetə leɪt ðæn ˈnevə/|Muộn còn hơn không|You finally started—better late than never.|Cuối cùng bạn đã bắt đầu—muộn còn hơn không.|B1
`);

addWords("phone", `
Call|/kɔːl/|Gọi điện|I'll call you after work.|Tôi sẽ gọi bạn sau giờ làm.|A1
Answer the phone|/ˈɑːnsə ðə fəʊn/|Nghe máy|Can you answer the phone?|Bạn nghe máy được không?|A1
Hang up|/hæŋ ʌp/|Cúp máy|Don't hang up. I'll be right back.|Đừng cúp máy. Tôi quay lại ngay.|A2
Hold on|/həʊld ɒn/|Chờ máy|Hold on a second, please.|Vui lòng chờ máy một chút.|A1
Call back|/kɔːl bæk/|Gọi lại|Can I call you back later?|Tôi gọi lại bạn sau được không?|A1
Leave a message|/liːv ə ˈmesɪdʒ/|Để lại lời nhắn|Would you like to leave a message?|Bạn có muốn để lại lời nhắn không?|A2
Wrong number|/rɒŋ ˈnʌmbə/|Nhầm số|Sorry, you have the wrong number.|Xin lỗi, bạn gọi nhầm số rồi.|A1
The line is busy|/ðə laɪn ɪz ˈbɪzi/|Máy bận|I tried calling, but the line was busy.|Tôi đã gọi nhưng máy bận.|A2
The signal is weak|/ðə ˈsɪɡnəl ɪz wiːk/|Tín hiệu yếu|The signal is weak in here.|Ở đây tín hiệu yếu.|A2
You're breaking up|/jɔː ˈbreɪkɪŋ ʌp/|Tiếng bạn bị ngắt quãng|Sorry, you're breaking up.|Xin lỗi, tiếng bạn bị ngắt quãng.|B1
Battery|/ˈbætəri/|Pin|My phone battery is almost dead.|Pin điện thoại tôi sắp hết.|A1
Charger|/ˈtʃɑːdʒə/|Bộ sạc|Can I borrow your charger?|Tôi mượn bộ sạc được không?|A2
Wi-Fi password|/ˈwaɪfaɪ ˈpɑːswɜːd/|Mật khẩu Wi-Fi|What's the Wi-Fi password?|Mật khẩu Wi-Fi là gì?|A1
Log in|/lɒɡ ɪn/|Đăng nhập|I can't log in to my account.|Tôi không đăng nhập được tài khoản.|A2
Sign up|/saɪn ʌp/|Đăng ký|You need to sign up first.|Bạn cần đăng ký trước.|A2
Download|/ˌdaʊnˈləʊd/|Tải xuống|Download the app from the website.|Tải ứng dụng từ trang web.|A1
Upload|/ˌʌpˈləʊd/|Tải lên|Please upload the file again.|Hãy tải tệp lên lại.|A2
Go online|/ɡəʊ ˈɒnlaɪn/|Lên mạng|I'll go online after dinner.|Tôi sẽ lên mạng sau bữa tối.|A2
Send a link|/send ə lɪŋk/|Gửi liên kết|Can you send me the link?|Bạn gửi liên kết cho tôi được không?|A1
Scroll down|/skrəʊl daʊn/|Cuộn xuống|Scroll down to see more photos.|Cuộn xuống để xem thêm ảnh.|A2
Mute|/mjuːt/|Tắt tiếng|Please mute your microphone.|Vui lòng tắt tiếng mic.|A2
Unmute|/ʌnˈmjuːt/|Bật tiếng|You're on mute. Please unmute.|Bạn đang tắt tiếng. Hãy bật tiếng.|A2
Video call|/ˈvɪdiəʊ kɔːl/|Cuộc gọi video|Let's have a video call tonight.|Tối nay hãy gọi video.|A1
Connection|/kəˈnekʃən/|Kết nối|My internet connection is unstable.|Kết nối Internet của tôi không ổn định.|B1
Go viral|/ɡəʊ ˈvaɪrəl/|Lan truyền mạnh|That funny video went viral.|Video hài đó đã lan truyền mạnh.|B1
`);

addWords("social", `
Are you free?|/ɑː juː friː/|Bạn có rảnh không?|Are you free this Saturday?|Thứ Bảy này bạn có rảnh không?|A1
Would you like to...?|/wʊd juː laɪk tuː/|Bạn có muốn... không?|Would you like to have coffee?|Bạn có muốn đi uống cà phê không?|A1
Let's go|/lets ɡəʊ/|Đi thôi|The movie starts soon. Let's go!|Phim sắp bắt đầu. Đi thôi!|A1
What are you up to?|/wɒt ɑː juː ʌp tuː/|Bạn đang làm gì vậy?|What are you up to this weekend?|Cuối tuần này bạn định làm gì?|A2
Do you have any plans?|/duː juː hæv ˈeni plænz/|Bạn có kế hoạch gì không?|Do you have any plans tonight?|Tối nay bạn có kế hoạch gì không?|A1
I'd love to|/aɪd lʌv tuː/|Tôi rất sẵn lòng|I'd love to join you for dinner.|Tôi rất sẵn lòng ăn tối cùng bạn.|A1
Maybe another time|/ˈmeɪbi əˈnʌðə taɪm/|Có lẽ để lần khác|I can't today. Maybe another time?|Hôm nay tôi không thể. Để lần khác nhé?|A2
Have fun|/hæv fʌn/|Chúc vui vẻ|Have fun at the concert!|Chúc bạn vui ở buổi hòa nhạc!|A1
Enjoy yourself|/ɪnˈdʒɔɪ jɔːˈself/|Chúc vui vẻ|Relax and enjoy yourself tonight.|Hãy thư giãn và tận hưởng tối nay.|A2
What do you think?|/wɒt duː juː θɪŋk/|Bạn nghĩ sao?|What do you think of this song?|Bạn nghĩ sao về bài hát này?|A1
It's up to you|/ɪts ʌp tuː juː/|Tùy bạn|We can eat anywhere. It's up to you.|Ăn ở đâu cũng được. Tùy bạn.|A2
That sounds fun|/ðæt saʊndz fʌn/|Nghe vui đấy|A beach picnic? That sounds fun!|Dã ngoại bãi biển à? Nghe vui đấy!|A1
Have a good time|/hæv ə ɡʊd taɪm/|Chúc vui vẻ|Have a good time on your trip.|Chúc bạn vui vẻ trong chuyến đi.|A1
Congratulations|/kənˌɡrætʃəˈleɪʃənz/|Chúc mừng|Congratulations on your new job!|Chúc mừng công việc mới của bạn!|A1
Happy birthday|/ˈhæpi ˈbɜːθdeɪ/|Chúc mừng sinh nhật|Happy birthday! Make a wish.|Chúc mừng sinh nhật! Hãy ước đi.|A1
Good luck|/ɡʊd lʌk/|Chúc may mắn|Good luck with your interview.|Chúc may mắn với buổi phỏng vấn.|A1
Have a safe trip|/hæv ə seɪf trɪp/|Thượng lộ bình an|Have a safe trip home!|Chúc bạn về nhà an toàn!|A2
I'm into...|/aɪm ˈɪntuː/|Tôi rất thích...|I'm really into photography.|Tôi rất thích nhiếp ảnh.|B1
Not really my thing|/nɒt ˈrɪəli maɪ θɪŋ/|Không hợp sở thích tôi|Camping is not really my thing.|Cắm trại không thật sự hợp tôi.|B1
Give it a try|/ɡɪv ɪt ə traɪ/|Thử xem|You've never danced? Give it a try!|Bạn chưa từng nhảy à? Thử xem!|A2
I'm just kidding|/aɪm dʒʌst ˈkɪdɪŋ/|Tôi chỉ đùa thôi|Don't worry, I'm just kidding.|Đừng lo, tôi chỉ đùa thôi.|A2
What a shame|/wɒt ə ʃeɪm/|Thật đáng tiếc|You can't come? What a shame.|Bạn không đến được à? Thật đáng tiếc.|B1
It's my treat|/ɪts maɪ triːt/|Tôi mời|Put your wallet away. It's my treat.|Cất ví đi. Tôi mời.|B1
Drop by|/drɒp baɪ/|Ghé qua|Feel free to drop by anytime.|Cứ tự nhiên ghé qua bất cứ lúc nào.|B1
Have a blast|/hæv ə blɑːst/|Vui hết mình|We had a blast at the party.|Chúng tôi đã vui hết mình ở bữa tiệc.|B1
`);

addWords("emergency", `
Help!|/help/|Cứu với!|Help! I can't swim!|Cứu với! Tôi không biết bơi!|A1
Be careful|/biː ˈkeəfəl/|Hãy cẩn thận|Be careful crossing the road.|Hãy cẩn thận khi qua đường.|A1
Watch out!|/wɒtʃ aʊt/|Coi chừng!|Watch out! There's a car coming.|Coi chừng! Có xe đang tới.|A1
Stop!|/stɒp/|Dừng lại!|Stop! Don't touch that wire.|Dừng lại! Đừng chạm vào dây đó.|A1
Call the police|/kɔːl ðə pəˈliːs/|Gọi cảnh sát|Someone stole my bag. Call the police!|Có người lấy túi tôi. Gọi cảnh sát đi!|A1
Call an ambulance|/kɔːl ən ˈæmbjələns/|Gọi xe cấp cứu|Call an ambulance immediately.|Gọi xe cấp cứu ngay lập tức.|A1
Fire|/ˈfaɪə/|Hỏa hoạn|Fire! Everyone get outside!|Cháy! Mọi người ra ngoài!|A1
Emergency exit|/ɪˈmɜːdʒənsi ˈeɡzɪt/|Lối thoát hiểm|The emergency exit is over there.|Lối thoát hiểm ở đằng kia.|A2
I'm lost|/aɪm lɒst/|Tôi bị lạc|I'm lost. Can you help me?|Tôi bị lạc. Bạn giúp tôi được không?|A1
I've lost my wallet|/aɪv lɒst maɪ ˈwɒlɪt/|Tôi mất ví|I've lost my wallet on the train.|Tôi bị mất ví trên tàu.|A2
My phone was stolen|/maɪ fəʊn wəz ˈstəʊlən/|Điện thoại tôi bị trộm|My phone was stolen at the market.|Điện thoại tôi bị trộm ở chợ.|A2
I need help|/aɪ niːd help/|Tôi cần giúp đỡ|I need help with my car.|Tôi cần giúp về chiếc xe.|A1
Is everyone okay?|/ɪz ˈevriwʌn əʊˈkeɪ/|Mọi người ổn chứ?|Is everyone okay after the accident?|Mọi người ổn sau vụ tai nạn chứ?|A2
It's an emergency|/ɪts ən ɪˈmɜːdʒənsi/|Đây là trường hợp khẩn cấp|Please hurry. It's an emergency.|Làm ơn nhanh lên. Đây là trường hợp khẩn cấp.|A2
Stay calm|/steɪ kɑːm/|Giữ bình tĩnh|Stay calm and follow me.|Giữ bình tĩnh và đi theo tôi.|A2
Are you hurt?|/ɑː juː hɜːt/|Bạn có bị thương không?|Are you hurt? Can you stand?|Bạn có bị thương không? Đứng được không?|A1
I can't breathe|/aɪ kɑːnt briːð/|Tôi không thở được|I can't breathe properly.|Tôi không thể thở bình thường.|A2
It hurts here|/ɪt hɜːts hɪə/|Tôi đau ở đây|It hurts here when I move.|Tôi đau ở đây khi cử động.|A1
Where is the hospital?|/weər ɪz ðə ˈhɒspɪtəl/|Bệnh viện ở đâu?|Please tell me where the hospital is.|Làm ơn cho tôi biết bệnh viện ở đâu.|A1
Report a theft|/rɪˈpɔːt ə θeft/|Trình báo mất cắp|I'd like to report a theft.|Tôi muốn trình báo một vụ mất cắp.|B1
First aid kit|/ˌfɜːst ˈeɪd kɪt/|Bộ sơ cứu|Bring the first aid kit quickly.|Mang bộ sơ cứu lại nhanh.|A2
Evacuate|/ɪˈvækjueɪt/|Sơ tán|We need to evacuate the building.|Chúng ta cần sơ tán khỏi tòa nhà.|B1
Out of danger|/aʊt əv ˈdeɪndʒə/|Thoát khỏi nguy hiểm|The patient is now out of danger.|Bệnh nhân giờ đã qua cơn nguy hiểm.|B1
Break down|/breɪk daʊn/|Hỏng xe|Our car broke down on the highway.|Xe chúng tôi hỏng trên cao tốc.|B1
What happened?|/wɒt ˈhæpənd/|Chuyện gì đã xảy ra?|Stay back and tell me what happened.|Lùi lại và nói tôi biết chuyện gì xảy ra.|A1
`);

const STUDY_TIPS = [
  "Đọc to từ mới và đặt một câu liên quan đến chính bạn.",
  "Ôn lại từ khó sau 10 phút để củng cố trí nhớ dài hạn.",
  "Nghe phát âm rồi bắt chước cả nhịp điệu, không chỉ từng âm.",
  "Học theo cụm từ sẽ giúp bạn nói tự nhiên hơn học từng từ riêng lẻ.",
  "Chỉ cần 15 phút đều đặn mỗi ngày hiệu quả hơn học dồn một buổi.",
  "Gắn một hình ảnh hài hước với từ mới để nhớ lâu hơn."
];

window.DAILY_LINGO_DATA = { vocabulary: VOCABULARY, categories: CATEGORY_META, tips: STUDY_TIPS };
