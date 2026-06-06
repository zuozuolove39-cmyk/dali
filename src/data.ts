import { DayItinerary, ChecklistItem, ExpenseItem } from './types';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    id: 0,
    date: '6月17日',
    dayOfWeek: '周三',
    theme: '夜探斗南花市',
    summary: '抵达春城昆明，放下重担，直奔亚洲最大的鲜花交易市场，感受被万紫千红包围的震撼深夜。',
    locations: [
      {
        name: '昆明长水国际机场',
        type: 'transit',
        time: '21:00',
        description: '抵达昆明。下机后可自备一件外套（昆明夜间多雨、气温较低，约15°C~18°C）。',
        tags: ['首站抵达', '春城门户'],
      },
      {
        name: '出发前往斗南',
        type: 'transit',
        time: '21:30',
        description: '建议通过网约车或出租车直接前往斗南酒店，全程约35分钟，省时省力。',
        costInfo: '费用约 70 元',
        estimatedCost: 70,
        tags: ['网约车', '打车直达'],
      },
      {
        name: '入住斗南酒店并放下行李',
        type: 'hotel',
        time: '22:10',
        description: '建议选择花市周边的特色酒店或舒适客栈，放下行李，稍作整顿后轻装出发。',
        link: 'http://dpurl.cn/mfi8wzhz',
        tags: ['携程/美团可订', '周边住宿推荐'],
      },
      {
        name: '斗南花市主场馆一楼（晚市精华）',
        type: 'shopping',
        time: '22:30',
        description: '斗南的高潮在夜间（20:30 - 次日02:00）。此时是鲜花批发交易最火爆的黄金时段，成捆的玫瑰、百合、向日葵堆满地面，人潮涌动。可以随意闲逛拍照，花极其便宜，买一两把带回酒店。',
        costInfo: '买花自费 约 10~25 元',
        estimatedCost: 15,
        tags: ['免费入场', '浪漫花海', '夜间交易', '强烈推荐'],
      },
      {
        name: '夜宵推荐（斗南夜宵）',
        type: 'food',
        time: '23:30',
        description: '感受深夜市场边的人间烟火。可品尝云南特色烤豆腐、烧烤、热稀豆粉或烧饵块，满足深夜的味蕾。',
        link: 'http://dpurl.cn/2OLsknfz',
        costInfo: '人均 约 30 元',
        estimatedCost: 30,
        tags: ['大众点评高分', '深夜食堂'],
      }
    ],
    tips: [
      '昆明昼夜温差大，6月份下机后可能会感觉凉（约16°C左右），请随身带一件防风薄外套。',
      '斗南花市一楼主要卖鲜花和盆栽，花市地下有很大的停车场。买花可以大胆砍价，成捆购买最合算！',
      '深夜花市物流、推车极多，逛的时候注意避让，安全第一。'
    ]
  },
  {
    id: 1,
    date: '6月18日',
    dayOfWeek: '周四',
    theme: '湿地花海与滇池，夕发大理',
    summary: '清晨穿行在唯美的水上杉树森林中，午后漫步风景如画的海埂大坝，傍晚搭乘动车奔向风花雪月的大理古城。',
    locations: [
      {
        name: '捞鱼河湿地公园',
        type: 'spot',
        time: '08:30 - 10:15',
        description: '8:30开门。主要游览水上森林栈道，漫步长在水里的水杉树林，清晨的光影绝美，空气极清新。走到尽头可以远眺滇池的宽阔湖面。',
        costInfo: '免门票',
        tags: ['免费开放', '水上杉林', '清晨光影', '森系拍照'],
      },
      {
        name: '斗南湿地公园 / 王官湿地',
        type: 'spot',
        time: '10:30 - 11:30',
        description: '从捞鱼河步行或打车即可到达。在湖滨步道悠闲散步，观赏蔚蓝滇池水面。6月还有随风摇曳的成片芦苇，非常出片。',
        costInfo: '免门票',
        tags: ['免费开放', '湖滨步道', '芦苇荡映斜阳'],
      },
      {
        name: '享用特色午餐',
        type: 'food',
        time: '12:00',
        description: '打车前往附近精选餐厅，品尝地道云南过桥米线、野生菌菇宴、柴火鸡或家常滇菜。',
        link: 'http://dpurl.cn/F9NQSnPz',
        costInfo: '人均 约 50 元',
        estimatedCost: 50,
        tags: ['地道滇味', '口味推荐'],
      },
      {
        name: '滇池海埂公园',
        type: 'spot',
        time: '14:00 - 15:30',
        description: '车程约25分钟。在大草坪与海埂大坝散步。虽然6月份没有冬季的海鸥，但可以近距离亲水，眺望西山“睡美人”的巍峨轮廓，吹吹清凉的高原湖风，心旷神怡。',
        link: 'https://a.feizhu.com/39oz4m',
        costInfo: '免门票',
        tags: ['西山远眺', '海埂大坝', '滇池主景区'],
      },
      {
        name: '昆明站 ➔ 大理站',
        type: 'transit',
        time: '16:30 - 19:00',
        description: '提前一小时（16:30前）抵达昆明火车站，检票进站。乘坐17:30左右的动车，约2小时15分钟，19:00左右抵达大理。',
        costInfo: '火车票 约 145 元',
        estimatedCost: 145,
        tags: ['舒适高铁', '奔向大理'],
      },
      {
        name: '入住大理古城特色客栈',
        type: 'hotel',
        time: '19:40 - 20:10',
        description: '大理站打车直奔古城方向入住。推荐入住【大理栖池·花渡客栈】（古城南门，安静雅致）或【大理古城床单厂艺术区·旅马客栈】（文艺范十足，带独立天台）。',
        costInfo: '人均房费 约 150 元',
        estimatedCost: 150,
        tags: ['大理栖池花渡', '旅马客栈', '古城住宿'],
      },
      {
        name: '古城深夜食堂：野生菌火锅 / 融合西餐',
        type: 'food',
        time: '20:10 以后',
        description: '入住后直奔古城品尝大餐。推荐：【花意间·野生菌火锅】（古城内人民路，鸡汤拼火腿配新鲜菌菇，鲜掉眉毛，人均120）；或【向月球飞去】（文艺融合菜，烤肉拼盘和飞饼极受年轻人喜爱，人均90）。',
        costInfo: '人均 约 100 元',
        estimatedCost: 100,
        tags: ['花意间菌火锅', '向月球飞去', '古城必吃榜'],
      }
    ],
    tips: [
      '捞鱼河到斗南湿地非常近，建议拼车或步行，沿途有共享单车。',
      '大理站出站后，打车去大理古城大约需要30分钟。古城夜间车不能开进核心段，需在南门或北门附近下车步行入内。',
      '野生菌火锅味道极鲜，但煮菌菇时千万不能自己乱搅，务必耐心等服务员计时沙漏漏完再动筷，确保熟透！'
    ]
  },
  {
    id: 2,
    date: '6月19日',
    dayOfWeek: '周五',
    theme: '苍山雪影，洱海骑行',
    summary: '极速登顶海拔3920米的苍山洗马潭，品尝地道大理段公子武侠风味；午后深入大理地标三塔，傍晚乘海风骑行最美S弯道，下榻双廊看绝美洱海落日。',
    locations: [
      {
        name: '大理北门菜市场（市井早餐）',
        type: 'food',
        time: '07:30',
        description: '深度体验大理市井风情。推荐【杨记破酥粑粑】（咸甜皆有，外酥里嫩）配一碗热乎乎的【稀豆粉】，是大理最纯正最具人情味的早餐。',
        link: 'http://dpurl.cn/8o2LLogz',
        costInfo: '人均 约 15 元',
        estimatedCost: 15,
        tags: ['必吃早餐', '市井生活', '北门菜市'],
      },
      {
        name: '沧海一粟：苍山洗马潭索道',
        type: 'spot',
        time: '08:30 - 12:30',
        description: '乘坐大理最震撼的索道，海拔直升至3920米。俯瞰崇圣三塔与大理全景。高山杜鹃花海在六月依然绽放，山顶洗马潭冰蚀湖清澈如玉。需穿薄羽绒或冲锋衣外套防寒。',
        link: 'http://dpurl.cn/WWuvSE1z',
        costInfo: '索道及景区往返 335 元',
        estimatedCost: 335,
        tags: ['苍山大索道', '海拔3920米', '天龙八部', '雪山杜鹃'],
      },
      {
        name: '尝鲜大餐：大理段公子·天龙八部体验店',
        type: 'food',
        time: '13:00',
        description: '下山后享用武侠小说氛围大餐。招牌糯米排骨、风花雪月鱼（洱海酸辣鱼风格）不仅味道绝妙，分量也十分充足。店面装修全是原汁原味的江湖武侠风。',
        link: 'http://dpurl.cn/fsPk0nQz',
        costInfo: '人均 约 110 元',
        estimatedCost: 110,
        tags: ['天龙八部', '武侠主题', '必吃美食'],
      },
      {
        name: '崇圣寺三塔文化区',
        type: 'spot',
        time: '14:30 - 15:00',
        description: '大理唯一的5A级景区。古老高耸的三圣塔见证了大理百年的风雨。可以在三塔倒影纪念公园内，寻找最适合倒影拍摄的水池，配合背后的苍山主峰拍照，极其庄严。',
        link: 'http://dpurl.cn/eE0wzK3z',
        costInfo: '门票 75 元',
        estimatedCost: 75,
        tags: ['5A景区', '倒影经典', '妙香佛国'],
      },
      {
        name: '洱海生态廊道骑行（才村 ➔ 磻溪 ➔ 古生村）',
        type: 'spot',
        time: '15:20 - 17:30',
        description: '打车前往才村码头。扫码租一辆共享共享电动车或山地单车，骑行进入最唯美的洱海生态步道。本路段纯海景且禁行所有燃油民用车。中途会经过【磻溪村网红S弯】，顺路骑游到【古生村】，总长约12公里，随骑随停。',
        costInfo: '租车 约 20 元',
        estimatedCost: 20,
        tags: ['才村起点', '最美廊道', '磻溪S弯', '共享骑行'],
      },
      {
        name: '海景歇脚：洱朵花园海景餐厅',
        type: 'food',
        time: '17:30',
        description: '在磻溪S弯或者古生村，找一家临海的白族庭院餐厅。洱朵花园主打精美简餐与咖啡，那扇巨大的观海落地玻璃窗是绝佳的网络拍照机位。',
        costInfo: '人均 约 70 元',
        estimatedCost: 70,
        tags: ['观海餐吧', '网红取景窗', '悠闲落日'],
      },
      {
        name: '前往双廊古镇并入住海景客栈',
        type: 'hotel',
        time: '18:00 - 19:30',
        description: '归还电动车，打车或和旅伴拼客车前往洱海对岸的双廊古镇。入住订好的洱海海景度假客栈。傍晚，在古镇漫步，前往玉几岛欣赏著名的【双廊落日】，余晖会洒满苍山。',
        link: 'http://dpurl.cn/25hOwcbz',
        costInfo: '人均房费 约 250 元',
        estimatedCost: 250,
        tags: ['双廊落日', '海景大床房', '极致奢享'],
      },
      {
        name: '双廊晚餐推荐（白族菜 / 落日西餐）',
        type: 'food',
        time: '19:30 以后',
        description: '推荐：【吉祥红饭店】品尝超正规又实惠的白族菜，比如洱海酸辣鱼、黄焖土鸡肉、海菜芋头汤（人均80）；或者选择【木夕大里·点心园】，观赏洱海落日享用一流西餐，环境浪漫极顶，是求婚级别的仙境体验（人均300+）。',
        costInfo: '人均 约 120 元',
        estimatedCost: 120,
        tags: ['吉祥红白族菜', '木夕点心园', '海景餐厅'],
      }
    ],
    tips: [
      '苍山洗马潭索道因为海拔偏高（3920m），很容易由于山顶突发狂风而临时停运或只开半程。务必在早晨随时关注索道的运营公告，尽量提早去！',
      '山顶温度极低，建议直接在山下索道站租一件厚羽绒服（约50元），或者自己带上一件耐寒的连帽冲锋衣。',
      '生态廊道绝对禁止机动车通行，在才村或周边租车请和商家沟通好退还地点（最好可以廊道内异地还车，或者骑一个来回）。'
    ]
  },
  {
    id: 3,
    date: '6月20日',
    dayOfWeek: '周六',
    theme: '暮宿双廊，风花雪月收官',
    summary: '在大理最好的角度等待洱海朝阳，在蔚蓝的海景书馆或拱门餐厅闲度下午，漫步小巷寻觅古朴飞燕寺，在海街用烤乳扇和温情落日给大理画上圆满句号。',
    locations: [
      {
        name: '洱海晨曦：露台日出观礼',
        type: 'spot',
        time: '06:30',
        description: '日出时间约为清晨06:30。如果客栈带有面向东北方的海景露台，可以直接在露台静候。太阳会从你左前方的山峦背后攀升，金黄的光辉会首先点亮对面巍峨的苍山，然后再倒映拉长到脚下的湛蓝群光。',
        costInfo: '免费自然景观',
        tags: ['摄影必看', '洱海日出', '苍山雪顶'],
      },
      {
        name: '地道老街早餐：粑肉饵丝',
        type: 'food',
        time: '08:30',
        description: '漫步在阳光初显的双廊主街。推荐前往【玉几楼餐厅的早餐档】。尝一碗炖煮到烂熟黏嘴的地道耙肉饵丝，吃完浑身温暖。',
        costInfo: '人均 约 15 元',
        estimatedCost: 15,
        tags: ['地道饵丝', '本地风味', '暖胃晨食'],
      },
      {
        name: '南诏风情岛',
        type: 'spot',
        time: '09:30 - 11:30',
        description: '游人最少的时间。在双廊一期码头乘船几分钟，即可上岛。岛上有标志性的「汉白玉观音像」与精美的雕塑广场，是拍摄近景洱海的极佳处，约需2小时。',
        costInfo: '船票+门票 约 50 元',
        estimatedCost: 50,
        tags: ['乘船观光', '南诏岛', '岛屿风情'],
      },
      {
        name: '双廊意境午餐 ➔ 临海海景咖啡馆',
        type: 'food',
        time: '12:00',
        description: '推荐：【木夕大里·点心园】（顶级精致西餐，环境震撼，建议提前预约）；若钟意海景拱门，可选【世内桃源·落日餐厅】（人均150）；若偏好清静，可去【海之书馆】（海景书茶吧，喝茶吃简餐，人均60），伴随着洱海的水声发呆。',
        costInfo: '人均 约 100 元',
        estimatedCost: 100,
        tags: ['世内桃源拱门', '海之书馆', '木夕点心园'],
      },
      {
        name: '静谧午休与避暑',
        type: 'hotel',
        time: '14:00 - 16:00',
        description: '避开高原正午毒辣的暴晒烈日，回到精美的海景客栈喝上一杯凉茶、惬意午休。这是海滨度假的精髓——不要硬撑，保持松弛的旅游节奏。',
        tags: ['避暑防晒', '深度舒缓', '度假节奏'],
      },
      {
        name: '老街慢行：探索古戏台与飞燕寺',
        type: 'spot',
        time: '16:00 - 17:30',
        description: '再次出发，穿入双廊主街背后错落有致的原始白族小巷。寻找保存完好的老街古戏台以及低调而古旧的飞燕寺，体味古镇除了商业化海景外，最真实、传统的本地历史脉络。',
        tags: ['古朴民俗', '白族古巷', '老戏台', '飞燕寺'],
      },
      {
        name: '海街落日最终章 ➔ 醇美白族晚宴',
        type: 'food',
        time: '17:30 - 20:00',
        description: '傍晚时光，缓缓散步到海街。双廊的落日红霞百看不厌。晚餐推荐：到【双廊文化大院】体验地道的农家白族菜（招牌酸辣鱼、乳饼）；或者二刷【吉祥红饭店】，点一盘黄焖鸡配海菜豆腐汤。',
        costInfo: '人均 约 80 元',
        estimatedCost: 80,
        tags: ['落日伴餐', '双廊文化大院', '地道乳饼'],
      },
      {
        name: '街角美味：街头品尝烤乳扇',
        type: 'food',
        time: '20:30',
        description: '在码头或街口，买一串阿妈现烤的云南干酪【烤乳扇】，抹上玫瑰糖，边走边嚼着品味奶香。踩着清凉的海水月光，享受这段旅途的最后一个浪漫之夜。',
        costInfo: '买烤乳扇 约 10 元',
        estimatedCost: 10,
        tags: ['街头特色', '玫瑰烤乳扇', '经典奶酪'],
      }
    ],
    tips: [
      '双廊属于大理洱海边防晒的重灾区，下午两点到四点的太阳格外强烈，紫外线爆表，防晒霜和遮阳帽、墨镜绝对必不可少。',
      '南诏风情岛建议买包含登岛船票的套票。岛上步道有部分阶梯，穿舒适的平底运动鞋最适合。',
      '烤乳扇有浓郁的羊/牛发酵奶香以及独特的酸韧嚼劲，并不是每个人都能一口爱上，可以和同伴合订一串尝鲜。'
    ]
  },
  {
    id: 4,
    date: '6月21日',
    dayOfWeek: '周日',
    theme: '春城漫步，悠然返穗',
    summary: '最后望一眼晨曦中恬静的苍山洱海，带着满满的鲜花与香气启程，返回昆明高铁并悠闲地飞回广州（下站），旅途圆满。',
    locations: [
      {
        name: '双廊客栈大堂 ➔ 大理站',
        type: 'transit',
        time: '08:30',
        description: '在客栈享用最后一次精致早餐，退房。打车或通过客栈前台代订拼车（约 50分钟）直达大理站，准备动车回昆明。',
        costInfo: '拼车人均 约 40 元',
        estimatedCost: 40,
        tags: ['拼车/打车', '返程大理站'],
      },
      {
        name: '大理站 ➔ 昆明 or 机场返穗',
        type: 'transit',
        time: '10:00 以后',
        description: '登上返程高铁，大理飞速告别。动车2个多小时返回昆明（或返港），乘坐飞机悠闲地返回广州，圆满结束这次充满花香、涛声与苍山杜鹃的梦幻云南双城之约。',
        costInfo: '返程高铁/机票费用 约 1500 元',
        estimatedCost: 1500,
        tags: ['动车回昆', '飞返广州', '旅途圆满'],
      }
    ],
    tips: [
      '双廊去大理站稍微有些距离（约50公里），车程大约1小时，请根据买到的高铁票时间往前半小时出发，切勿卡点。',
      '在双廊随手买的鲜花或多肉植物可以办理托运或用包装箱快递直接寄回家，方便无忧。'
    ]
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // 证件与财务
  { id: 'item-1', category: 'essential', name: '身份证 / 学生证（景点门票买半价优惠）', packed: false, notes: '必备证件，建议随身携带' },
  { id: 'item-2', category: 'essential', name: '绿色出行码 & 携程/美团预订订单截图', packed: false },
  // 衣服鞋帽
  { id: 'item-3', category: 'clothing', name: '连帽冲锋衣 / 运动薄羽绒服（登苍山顶必备）', packed: false, notes: '苍山海拔3920m气温接近个位数' },
  { id: 'item-4', category: 'clothing', name: '防晒冰袖 / 墨镜 / 大帽檐遮阳帽', packed: false, notes: '高原紫外线极强' },
  { id: 'item-5', category: 'clothing', name: '仙女风浅色长裙 / 帅气防晒衫（洱海拍照绝配）', packed: false },
  { id: 'item-6', category: 'clothing', name: '好下脚的合脚平底运动鞋 / 休闲鞋', packed: false, notes: '廊道骑行与主场馆走路多' },
  // 电子设备
  { id: 'item-7', category: 'electronics', name: '大容量移动电源（Power Bank）', packed: false, notes: '拍照拍视频耗电快' },
  { id: 'item-8', category: 'electronics', name: '手机充电线、耳机、多卡位排插', packed: false },
  { id: 'item-9', category: 'electronics', name: '手持云台 / 自拍杆 / 相机', packed: false },
  // 医药与健康
  { id: 'item-10', category: 'medicine', name: '晕车药 / 晕船贴', packed: false, notes: '盘山路与乘船南诏风情岛可能晕' },
  { id: 'item-11', category: 'medicine', name: '高原安 / 红景天 / 布洛芬', packed: false, notes: '防止初到高原轻微高反、头疼' },
  { id: 'item-12', category: 'medicine', name: '防蚊液 / 驱蚊扣', packed: false, notes: '湿地公园和洱海生态廊道蚊虫较多' },
  // 个人洗护
  { id: 'item-13', category: 'toiletries', name: 'SPF50+ 高倍防晒霜', packed: false, notes: '高原烈日防护第一要务' },
  { id: 'item-14', category: 'toiletries', name: '补水面膜 / 晒后修护啫喱', packed: false, notes: '大理风大气候略干燥，高强度日晒后需修复' },
  { id: 'item-15', category: 'toiletries', name: '便携保温杯', packed: false, notes: '高原多饮温水能能效缓解疲劳' },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  // Day 0
  { id: 'exp-d0-1', dayId: 0, category: 'transit', title: '长水机场网约车往返斗南', amount: 70, isPreset: true },
  { id: 'exp-d0-2', dayId: 0, category: 'lodging', title: '昆明斗南舒适酒店/客栈', amount: 160, isPreset: true },
  { id: 'exp-d0-3', dayId: 0, category: 'shopping', title: '斗南花市鲜花采买', amount: 15, isPreset: true },
  { id: 'exp-d0-4', dayId: 0, category: 'dining', title: '斗南夜市烧烤小吃', amount: 30, isPreset: true },

  // Day 1
  { id: 'exp-d1-1', dayId: 1, category: 'transit', title: '昆明内打车往返捞鱼河、海埂', amount: 50, isPreset: true },
  { id: 'exp-d1-2', dayId: 1, category: 'dining', title: '昆明午餐特色小吃', amount: 50, isPreset: true },
  { id: 'exp-d1-3', dayId: 1, category: 'transit', title: '昆明大理动车二等座票', amount: 145, isPreset: true },
  { id: 'exp-d1-4', dayId: 1, category: 'lodging', title: '大理古城栖池或旅马客栈 (首晚)', amount: 260, isPreset: true },
  { id: 'exp-d1-5', dayId: 1, category: 'dining', title: '大理野生菌火锅/特色菜', amount: 100, isPreset: true },

  // Day 2
  { id: 'exp-d2-1', dayId: 2, category: 'dining', title: '北门菜市场经典破酥粑粑稀豆粉', amount: 15, isPreset: true },
  { id: 'exp-d2-2', dayId: 2, category: 'tickets', title: '苍山洗马潭大索道套票 (含往返)', amount: 335, isPreset: true },
  { id: 'exp-d2-3', dayId: 2, category: 'dining', title: '大理段公子天龙八部体验大餐', amount: 110, isPreset: true },
  { id: 'exp-d2-4', dayId: 2, category: 'tickets', title: '崇圣寺三塔文化景区门票', amount: 75, isPreset: true },
  { id: 'exp-d2-5', dayId: 2, category: 'transit', title: '生态廊道单车租金及零散打车', amount: 50, isPreset: true },
  { id: 'exp-d2-6', dayId: 2, category: 'dining', title: '洱朵花园海景咖啡/落日晚餐', amount: 70, isPreset: true },
  { id: 'exp-d2-7', dayId: 2, category: 'lodging', title: '双廊极简轻奢海景客栈', amount: 320, isPreset: true },
  { id: 'exp-d2-8', dayId: 2, category: 'dining', title: '双廊网红吉祥红白族饭馆', amount: 80, isPreset: true },

  // Day 3
  { id: 'exp-d3-1', dayId: 3, category: 'dining', title: '老街玉几楼耙肉饵丝早餐', amount: 15, isPreset: true },
  { id: 'exp-d3-2', dayId: 3, category: 'tickets', title: '南诏风情岛登岛门票与往返渡船', amount: 50, isPreset: true },
  { id: 'exp-d3-3', dayId: 3, category: 'dining', title: '世内桃源落日餐厅/海之书馆', amount: 100, isPreset: true },
  { id: 'exp-d3-4', dayId: 3, category: 'dining', title: '双廊文化大院白族晚宴', amount: 80, isPreset: true },
  { id: 'exp-d3-5', dayId: 3, category: 'shopping', title: '街头非遗烤乳扇甜品', amount: 10, isPreset: true },
  { id: 'exp-d3-6', dayId: 3, category: 'lodging', title: '双廊极简轻奢海景客栈 (续住)', amount: 320, isPreset: true },

  // Day 4
  { id: 'exp-d4-1', dayId: 4, category: 'transit', title: '双廊包车拼车至大理火车站', amount: 40, isPreset: true },
];
