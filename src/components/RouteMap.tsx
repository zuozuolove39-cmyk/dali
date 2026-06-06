import { useState } from 'react';
import { Compass, MapPin, CheckCircle, Clock } from 'lucide-react';

interface RouteNode {
  id: string;
  name: string;
  phase: '昆明' | '动车线' | '大理';
  x: number; // SVG coordinate
  y: number; // SVG coordinate
  day: number;
  time: string;
  desc: string;
  highlight: string;
  iconType: 'airport' | 'flower' | 'park' | 'lake' | 'train' | 'town' | 'mountain' | 'temple' | 'bike';
}

const MAP_NODES: RouteNode[] = [
  // Kunming Phase
  {
    id: 'km-airport',
    name: '昆明长水机场',
    phase: '昆明',
    x: 690,
    y: 110,
    day: 0,
    time: 'Day 0 · 21:00到达',
    desc: '高原温差大，抵达时建议备上一件防寒衣。',
    highlight: '初入春城门户',
    iconType: 'airport'
  },
  {
    id: 'km-flower',
    name: '斗南花市',
    phase: '昆明',
    x: 640,
    y: 180,
    day: 0,
    time: 'Day 0 · 22:30夜探',
    desc: '亚洲最大的鲜花交易市场，感受万株鲜花交易的震撼深夜。',
    highlight: '玫瑰、百合便宜极顶',
    iconType: 'flower'
  },
  {
    id: 'km-wetland',
    name: '捞鱼河湿地公园',
    phase: '昆明',
    x: 630,
    y: 280,
    day: 1,
    time: 'Day 1 · 08:30森林水杉',
    desc: '漫步在长在水里的水杉树林，清晨的光影如入仙境。',
    highlight: '森系水上森林栈道',
    iconType: 'park'
  },
  {
    id: 'km-lake',
    name: '海埂大坝 / 公园',
    phase: '昆明',
    x: 550,
    y: 260,
    day: 1,
    time: 'Day 1 · 14:00海畔散步',
    desc: '在这里吹吹高原大湖的风，眺望著名的西山睡美人轮廓。',
    highlight: '眺望西山远景',
    iconType: 'lake'
  },
  {
    id: 'km-station',
    name: '昆明火车站',
    phase: '昆明',
    x: 480,
    y: 210,
    day: 1,
    time: 'Day 1 · 16:30进站',
    desc: '乘坐傍晚17:30的高铁，约2h15m奔赴苍山洱海的大理。',
    highlight: '高铁直通大理',
    iconType: 'train'
  },
  // Train Line Segment
  {
    id: 'train-journey',
    name: '昆明 ➔ 大理 高铁线',
    phase: '动车线',
    x: 350,
    y: 230,
    day: 1,
    time: '17:30 - 19:00 晚行车次',
    desc: '车窗外能看到滇西红土地山峦的广袤景色。',
    highlight: '穿越红土山丘速度极快',
    iconType: 'train'
  },
  // Dali Phase
  {
    id: 'dl-station',
    name: '大理火车站',
    phase: '大理',
    x: 230,
    y: 290,
    day: 1,
    time: 'Day 1 · 19:00抵达',
    desc: '出站后打车约30分钟前往安静的大理古城入住特色客栈。',
    highlight: '抵临大理国境',
    iconType: 'train'
  },
  {
    id: 'dl-town',
    name: '大理古城',
    phase: '大理',
    x: 180,
    y: 210,
    day: 1,
    time: 'Day 1/2 · 夜宿古城 & 早餐',
    desc: '古朴惬意的人民路。清晨在北门菜市尝鲜破酥粑粑稀豆粉。',
    highlight: '夜市与特色菌菇火锅',
    iconType: 'town'
  },
  {
    id: 'dl-cangshan',
    name: '苍山洗马潭索道',
    phase: '大理',
    x: 80,
    y: 190,
    day: 2,
    time: 'Day 2 · 08:30苍山大索道',
    desc: '大索道直上3920米。云烟漂浮，俯看洱海，观赏高山杜鹃。',
    highlight: '海拔3920m冰蚀湖杜鹃',
    iconType: 'mountain'
  },
  {
    id: 'dl-temple',
    name: '崇圣寺三塔',
    phase: '大理',
    x: 140,
    y: 140,
    day: 2,
    time: 'Day 2 · 14:30倒影打卡',
    desc: '大理唯一5A景区，在倒影公园拍摄三塔耸立和苍山映衬的经典构图。',
    highlight: '皇家国宝佛国瑰宝',
    iconType: 'temple'
  },
  {
    id: 'dl-caicun',
    name: '才村码头 (廊道起点)',
    phase: '大理',
    x: 220,
    y: 170,
    day: 2,
    time: 'Day 2 · 15:20廊道骑行',
    desc: '扫一辆共享电动车或单车，由此骑入禁行机动车的洱海生态走廊。',
    highlight: '海滨骑行第一站',
    iconType: 'bike'
  },
  {
    id: 'dl-s-curve',
    name: '磻溪村网红S弯',
    phase: '大理',
    x: 170,
    y: 100,
    day: 2,
    time: 'Day 2 · 16:30网红旅照',
    desc: '洱海畔最出名的S弯道，蓝天白云水天一色，拍照极为唯美。',
    highlight: '最美S弯打卡观海',
    iconType: 'bike'
  },
  {
    id: 'dl-gusheng',
    name: '古生白族村',
    phase: '大理',
    x: 210,
    y: 55,
    day: 2,
    time: 'Day 2 · 17:30沿海骑闲',
    desc: '古朴幽静的原生态白族古村，游人稀少，体验淳厚民俗风光。',
    highlight: '骑行终点与洱朵花园',
    iconType: 'town'
  },
  {
    id: 'dl-shuanglang',
    name: '双廊古镇',
    phase: '大理',
    x: 320,
    y: 65,
    day: 3,
    time: 'Day 3 · 暮宿双廊度落日',
    desc: '观赏大理最迷人的星空与黄昏日出。可乘船登临南诏风情岛，尽显安逸。',
    highlight: '玉几岛落日/海之书馆',
    iconType: 'town'
  }
];

interface RouteMapProps {
  visitedNodes: Record<string, boolean>;
  onToggleVisited: (nodeName: string) => void;
}

export default function RouteMap({ visitedNodes, onToggleVisited }: RouteMapProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>('dl-shuanglang');
  const activeNode = MAP_NODES.find(n => n.id === activeNodeId) || MAP_NODES[0];

  const getEmojiIcon = (type: RouteNode['iconType']) => {
    switch (type) {
      case 'airport': return '✈️';
      case 'flower': return '🌸';
      case 'park': return '🌲';
      case 'lake': return '🌊';
      case 'train': return '🚄';
      case 'town': return '🏡';
      case 'mountain': return '🏔️';
      case 'temple': return '🛕';
      case 'bike': return '🚴';
      default: return '📍';
    }
  };

  const isVisited = !!visitedNodes[activeNode.name];

  return (
    <div className="bg-[#fcfbf9] rounded-3xl border border-[#1A1A1A]/10 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1A1A1A]/10 pb-4">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1A1A1A] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#5A5A40]" />
            滇中-滇西自导通联路径手绘互图
          </h2>
          <p className="text-xs text-[#1A1A1A]/50 mt-1">
            点击地图上的精致图标或连线节点，可探查各个行驻点之考量，并盖印你的旅行足迹。
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] tracking-wider uppercase font-bold">
          <span className="flex items-center gap-1.5 bg-[#7A6C5D]/10 text-[#7A6C5D] px-2.5 py-1 rounded">
            <span className="h-2 w-2 rounded-full bg-[#7A6C5D]" />
            昆明滇池段
          </span>
          <span className="flex items-center gap-1.5 bg-[#5A5A40]/10 text-[#5A5A40] px-2.5 py-1 rounded">
            <span className="h-2 w-2 rounded-full bg-[#5A5A40]" />
            大理洱海段
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Full Interactive SVG Map Canvas */}
        <div className="lg:col-span-8 bg-[#F5F2ED] border border-[#1A1A1A]/10 rounded-2xl relative overflow-hidden flex items-center justify-center p-3 select-none">
          
          {/* Legend indicator */}
          <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm border border-[#1A1A1A]/10 rounded-xl p-3 shadow-sm text-[10px] space-y-1.5 pointer-events-none z-10 font-bold uppercase tracking-wide">
            <div className="font-serif italic text-xs text-[#1A1A1A]">Map Legend</div>
            <div className="flex items-center gap-2 text-[#7A6C5D]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7A6C5D]"></span>
              <span>昆明景点节点</span>
            </div>
            <div className="flex items-center gap-2 text-[#5A5A40]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5A5A40]"></span>
              <span>大理景点节点</span>
            </div>
            <div className="flex items-center gap-2 text-[#A88656]">
              <span className="border-t border-dashed border-[#A88656] w-6 h-0 inline-block" />
              <span>西行成昆铁路干线</span>
            </div>
          </div>

          {/* SVG Root */}
          <svg
            viewBox="0 0 800 380"
            className="w-full h-auto max-h-[380px] text-[#1A1A1A]"
          >
            {/* Background elements (Water bodies styled as washed out antique linen blue) */}
            {/* Dianchi Lake (Kunming, bottom right) */}
            <path
              d="M 520 280 Q 560 360 620 370 Q 670 340 640 290 Q 580 250 520 280 Z"
              fill="#E1EAEF"
              stroke="#BACFD9"
              strokeWidth="1.5"
              className="opacity-90"
            />
            <text x="560" y="325" fill="#5F6F7A" className="text-[10px] font-bold opacity-60 font-serif italic">
              昆明 · 滇池湖 (DIANCHI)
            </text>

            {/* Erhai Lake (Dali, top left/middle) */}
            <path
              d="M 190 190 Q 240 120 210 60 Q 250 40 280 60 Q 285 100 240 180 Q 210 210 190 190 Z"
              fill="#E1EAEF"
              stroke="#BACFD9"
              strokeWidth="1.5"
              className="opacity-95"
            />
            <text x="235" y="125" fill="#5F6F7A" className="text-[10px] font-bold opacity-60 font-serif italic" transform="rotate(-15 235 125)">
              大理 · 洱海 (ERHAI)
            </text>

            {/* Mountains (Cangshan, left of Erhai) */}
            <path d="M 40 220 L 70 140 L 100 220 Z M 70 230 L 100 160 L 130 230 Z" fill="#E8E4DA" stroke="#CBC5B9" strokeWidth="1.5" />
            <text x="65" y="235" fill="#7A6C5D" className="text-[9px] font-serif italic opacity-70">
              苍山 Range (3920m)
            </text>

            {/* Connecting Railway Line: Kunming to Dali */}
            <path
              d="M 480 210 Q 350 250 230 290"
              fill="none"
              stroke="#E2DCD2"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 480 210 Q 350 250 230 290"
              fill="none"
              stroke="#A88656"
              strokeWidth="2"
              strokeDasharray="6,4"
              className="opacity-80"
            />
            <text x="320" y="260" fill="#A88656" className="text-[9px] font-mono tracking-wider">
              高铁专线 · 2h 15m
            </text>

            {/* Kunming Itinerary Path */}
            <path
              d="M 690 110 L 640 180 L 630 280 M 640 180 Q 590 220 550 260 M 550 260 L 480 210"
              fill="none"
              stroke="#7A6C5D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4,2"
              className="opacity-50"
            />

            {/* Dali Itinerary Path */}
            <path
              d="M 230 290 L 180 210 L 80 190 M 180 210 L 140 140 L 220 170 L 170 100 L 210 55 M 210 55 Q 260 40 320 65"
              fill="none"
              stroke="#5A5A40"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4,2"
              className="opacity-50"
            />

            {/* Render Nodes with Editorial Palette */}
            {MAP_NODES.map((node) => {
              const isActive = node.id === activeNodeId;
              const hasChecked = !!visitedNodes[node.name];
              const isKunming = node.phase === '昆明';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => setActiveNodeId(node.id)}
                >
                  {/* Glowing Pulse Ring for active node */}
                  {isActive && (
                    <circle
                      r="14"
                      fill="none"
                      stroke={isKunming ? '#7A6C5D' : '#5A5A40'}
                      strokeWidth="1.5"
                      className="pulse-node"
                    />
                  )}

                  {/* Node Outer Circle */}
                  <circle
                     r={isActive ? '8' : '6'}
                     fill={hasChecked ? '#5A5A40' : (isKunming ? '#7A6C5D' : '#5C604D')}
                     stroke="#F5F2ED"
                     strokeWidth="1.5"
                     className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Star or dot center */}
                  {isActive && <circle r="3" fill="#ffffff" />}

                  {/* Marker Labels */}
                  <text
                    y={node.id === 'km-airport' || node.id === 'dl-gusheng' ? '-15' : '18'}
                    textAnchor="middle"
                    className={`text-[9px] font-semibold pointer-events-none transition-all ${
                      isActive
                        ? 'fill-[#1A1A1A] text-[10px] font-bold'
                        : 'fill-[#1A1A1A]/50'
                    }`}
                  >
                    {node.name.length > 5 ? node.name.substring(0, 5) + '..' : node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Route Node Sidebar Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#F5F2ED]/60 border border-[#1A1A1A]/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                activeNode.phase === '昆明'
                  ? 'bg-[#7A6C5D]/10 text-[#7A6C5D]'
                  : activeNode.phase === '动车线'
                  ? 'bg-[#A88656]/10 text-[#A88656]'
                  : 'bg-[#5A5A40]/10 text-[#5A5A40]'
              }`}>
                {activeNode.phase}纪行 · {activeNode.time.split('·')[0]}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="text-xl mr-2">{getEmojiIcon(activeNode.iconType)}</span>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  {activeNode.name}
                </h3>
              </div>
              <p className="text-[10px] tracking-wider text-[#1A1A1A]/40 font-bold mb-3 flex items-center gap-1 uppercase">
                <Clock className="w-3 h-3" />
                <span>{activeNode.time}</span>
              </p>
              <p className="font-serif text-sm text-[#1A1A1A]/80 leading-relaxed italic">
                {activeNode.desc}
              </p>
            </div>

            {/* Quick core highlight */}
            <div className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 flex gap-2.5 items-start">
              <Compass className="w-4 h-4 text-[#5A5A40] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-bold">游览风牌</div>
                <div className="text-xs text-[#1A1A1A]/80 font-serif italic mt-0.5">{activeNode.highlight}</div>
              </div>
            </div>

            {/* Stamp action */}
            {activeNode.phase !== '动车线' && (
              <button
                id="btn-map-node-visit"
                onClick={() => onToggleVisited(activeNode.name)}
                className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isVisited
                    ? 'bg-[#5A5A40] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F5F2ED] border border-[#1A1A1A]/20 text-[#1A1A1A]'
                }`}
              >
                {isVisited ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>已在此地印下足迹</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>我已到达 · 盖章足迹</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Quick interactive note */}
          <div className="bg-white border border-[#1A1A1A]/10 rounded-2xl p-4 text-[11px] text-[#1A1A1A]/70 flex gap-2.5 items-start">
            <span className="text-base text-[#5A5A40]">💡</span>
            <p className="leading-relaxed font-serif italic">
              昆明的主干在夜探鲜花与森野红杉林。大理的惬意核心则尽在环海走廊之上。廊道机动车禁行，租借单车慢慢探访，方能揽尽洱海风花雪月。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
