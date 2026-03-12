import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Compass, 
  Users, 
  Award, 
  Info, 
  Phone, 
  Image as ImageIcon,
  Settings,
  RefreshCw,
  ChevronRight,
  Bell,
  Search
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Mock Data ---
const trendData = [
  { name: 'Mon', views: 4000, updates: 2400 },
  { name: 'Tue', views: 3000, updates: 1398 },
  { name: 'Wed', views: 2000, updates: 9800 },
  { name: 'Thu', views: 2780, updates: 3908 },
  { name: 'Fri', views: 1890, updates: 4800 },
  { name: 'Sat', views: 2390, updates: 3800 },
  { name: 'Sun', views: 3490, updates: 4300 },
];

const healthData = [
  { name: '首页配置', status: 'healthy', value: 100 },
  { name: '师资团队', status: 'warning', value: 85 },
  { name: '开设方向', status: 'healthy', value: 98 },
  { name: '媒体资源', status: 'healthy', value: 92 },
];

const recentUpdates = [
  { id: 1, title: '更新了"2024秋季招生简章"', module: '首页配置', time: '10分钟前', user: 'Admin' },
  { id: 2, title: '新增了3位特聘教授信息', module: '师资团队', time: '2小时前', user: 'Editor_Li' },
  { id: 3, title: '修改了联系方式电话', module: '联系方式', time: '5小时前', user: 'Admin' },
  { id: 4, title: '上传了校园风光宣传片', module: '媒体资源', time: '昨天 14:30', user: 'Editor_Wang' },
];

// --- Components ---

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: '总览', active: true },
    { icon: Compass, label: '方向' },
    { icon: Users, label: '师资' },
    { icon: Award, label: '成果' },
    { icon: Info, label: '关于' },
    { icon: Phone, label: '联系' },
    { icon: ImageIcon, label: '媒体' },
  ];

  return (
    <aside className="w-20 flex-shrink-0 flex flex-col items-center py-6 glass-panel border-l-0 border-y-0 rounded-none rounded-r-3xl z-20">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 mb-8">
        <span className="text-white font-bold text-xl">E</span>
      </div>
      
      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        {navItems.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full aspect-square flex flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300 group relative
              ${item.active 
                ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] border border-white/80' 
                : 'hover:bg-white/40 hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-transparent'}`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-700'}`} strokeWidth={item.active ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${item.active ? 'text-indigo-700' : 'text-slate-500'}`}>{item.label}</span>
            {item.active && (
              <motion.div layoutId="active-indicator" className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4 w-full px-3">
        <button className="w-full aspect-square flex items-center justify-center rounded-2xl hover:bg-white/40 transition-all text-slate-500 hover:text-slate-700 border border-transparent">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden mx-auto cursor-pointer">
          <img src="https://picsum.photos/seed/admin/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between z-10 sticky top-0 backdrop-blur-md bg-slate-50/50 border-b border-slate-200/50">
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm font-medium text-slate-500">
          <span>CMS</span>
          <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
          <span className="text-slate-800">Dashboard</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 ml-4 tracking-tight">总览</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-xs font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          系统运行正常
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 rounded-xl glass-button text-slate-500 hover:text-slate-800">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl glass-button text-slate-500 hover:text-slate-800 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
          </button>
          <button className="p-2 rounded-xl glass-button text-slate-500 hover:text-slate-800">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ title, value, subValue, trend, icon: Icon, colorClass }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel p-5 flex flex-col gap-3 relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150 ${colorClass}`} />
    
    <div className="flex justify-between items-start relative z-10">
      <span className="text-sm font-medium text-slate-500">{title}</span>
      <div className={`p-2 rounded-xl bg-white/60 shadow-sm border border-white/80 ${colorClass.replace('bg-', 'text-').replace('-500', '-600')}`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    
    <div className="relative z-10 mt-1">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-slate-800 tracking-tight">{value}</span>
        {subValue && <span className="text-sm text-slate-500 font-medium">/ {subValue}</span>}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
          <span className={trend > 0 ? 'text-emerald-600' : 'text-rose-600'}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-slate-400">较上周</span>
        </div>
      )}
    </div>
  </motion.div>
);

const TrendChart = () => (
  <div className="glass-panel p-6 flex flex-col gap-6">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-base font-semibold text-slate-800">访问与更新趋势</h3>
        <p className="text-xs text-slate-500 mt-1">过去 7 天的门户访问量与内容更新频次</p>
      </div>
      <div className="flex gap-2 p-1 rounded-lg bg-slate-100/50 border border-slate-200/50">
        <button className="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-slate-800">7天</button>
        <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-700">30天</button>
      </div>
    </div>
    
    <div className="h-56 w-full neo-inset p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorUpdates" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
            itemStyle={{ fontSize: '13px', fontWeight: 500 }}
            labelStyle={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}
          />
          <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" activeDot={{ r: 6, strokeWidth: 0 }} />
          <Area type="monotone" dataKey="updates" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorUpdates)" activeDot={{ r: 6, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const HealthModule = () => (
  <div className="glass-panel p-6 flex flex-col gap-5 h-full">
    <div>
      <h3 className="text-base font-semibold text-slate-800">模块健康度</h3>
      <p className="text-xs text-slate-500 mt-1">各内容模块的信息完整度</p>
    </div>
    
    <div className="flex flex-col gap-4 flex-1 justify-center">
      {healthData.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 group">
          <div className="w-20 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{item.name}</div>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              className={`h-full rounded-full ${item.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'}`}
            />
          </div>
          <div className="w-10 text-right text-xs font-semibold text-slate-500">{item.value}%</div>
        </div>
      ))}
    </div>
  </div>
);

const RecentUpdatesList = () => (
  <div className="glass-panel p-6 flex flex-col gap-5 h-full">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-base font-semibold text-slate-800">最近更新</h3>
        <p className="text-xs text-slate-500 mt-1">团队协作动态</p>
      </div>
      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">查看全部</button>
    </div>
    
    <div className="flex flex-col gap-4 relative mt-2">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200/60" />
      {recentUpdates.map((update) => (
        <div key={update.id} className="flex gap-4 relative z-10">
          <div className="w-6 h-6 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
          </div>
          <div className="flex flex-col gap-1 pb-1">
            <p className="text-sm font-medium text-slate-800 leading-snug">{update.title}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200/50">{update.module}</span>
              <span>•</span>
              <span>{update.user}</span>
              <span>•</span>
              <span>{update.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SystemOverview = () => (
  <div className="glass-panel p-6 flex flex-col gap-5 h-full">
    <h3 className="text-base font-semibold text-slate-800">运行概况</h3>
    
    <div className="grid grid-cols-2 gap-4 flex-1">
      <div className="neo-inset p-4 flex flex-col justify-center gap-2">
        <span className="text-xs font-medium text-slate-500">存储空间</span>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-semibold text-slate-700">45</span>
          <span className="text-sm text-slate-500 mb-0.5">/ 100 GB</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-indigo-400 w-[45%] rounded-full" />
        </div>
      </div>
      
      <div className="neo-inset p-4 flex flex-col justify-center gap-2">
        <span className="text-xs font-medium text-slate-500">数据库负载</span>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-semibold text-slate-700">12</span>
          <span className="text-sm text-slate-500 mb-0.5">%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-emerald-400 w-[12%] rounded-full" />
        </div>
      </div>
    </div>
    
    <div className="mt-2 flex gap-2">
      <button className="flex-1 py-2 rounded-xl glass-button text-sm font-medium text-slate-700 flex items-center justify-center gap-2">
        <span>清理缓存</span>
      </button>
      <button className="flex-1 py-2 rounded-xl glass-button text-sm font-medium text-slate-700 flex items-center justify-center gap-2">
        <span>备份数据</span>
      </button>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative">
        <Header />
        
        <div className="p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="内容总数" value="1,284" trend={12} icon={LayoutDashboard} colorClass="bg-indigo-500" />
            <StatCard title="已发布 / 草稿" value="1,042" subValue="242" icon={Compass} colorClass="bg-emerald-500" />
            <StatCard title="媒体资源" value="3,492" trend={5} icon={ImageIcon} colorClass="bg-sky-500" />
            <StatCard title="今日更新" value="24" trend={-2} icon={RefreshCw} colorClass="bg-purple-500" />
          </div>

          {/* Middle Row: Chart & Health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TrendChart />
            </div>
            <div className="lg:col-span-1">
              <HealthModule />
            </div>
          </div>

          {/* Bottom Row: Updates & System */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
            <div className="lg:col-span-2">
              <RecentUpdatesList />
            </div>
            <div className="lg:col-span-1">
              <SystemOverview />
            </div>
          </div>
          
          {/* Design Explanation Section (For the prompt requirement) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-8 glass-panel border-indigo-100/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-bl-full pointer-events-none" />
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-500" />
              设计说明 (Design Rationale)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">1. 布局逻辑 (Layout Logic)</h4>
                <p>采用经典的左窄右宽结构。左侧细窄导航保持安静，不抢夺视线；顶部 Header 承载全局状态与操作；内容区采用栅格布局（4-2-1/3-2-1），首屏高度控制在 1080p 下无需滚动即可总览全局。横向趋势图高度被刻意压低（h-56），避免图表喧宾夺主，确保下方辅助模块（最近更新、运行概况）能在首屏露出。</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">2. 卡片层级逻辑 (Card Hierarchy)</h4>
                <p>底层为带微弱网格渐变的浅色背景（Base）；中层为统一的玻璃态面板（Glass Panel），承载各个独立模块；顶层为轻拟物凹陷区域（Neo-inset）或凸起按钮，用于包裹图表、进度条或具体数据。层级通过极轻的阴影（0.02-0.03透明度）和 1px 的白色内发光（inset shadow）来区分，而非生硬的边框。</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">3. 材质与渐变应用 (Materials & Gradients)</h4>
                <p><strong>毛玻璃：</strong>应用于所有主卡片（bg-white/65 + backdrop-blur-xl），透出底层微弱的冷色渐变。<br/><strong>轻拟态：</strong>应用于图表容器、运行概况的小卡片（bg-slate-50/50 + inset shadow），形成“挖空”的视觉错觉。<br/><strong>渐变：</strong>极其克制地用作卡片右上角的模糊光晕（blur-2xl），以及趋势图的柔和填充，颜色选用雾蓝、淡紫、冰青，避免高饱和度。</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">4. 懒加载与自然过渡 (Lazy Loading & Transitions)</h4>
                <p><strong>懒加载：</strong>趋势图（Recharts）和底部的最近更新列表适合做懒加载（Intersection Observer），在进入视口时渲染。<br/><strong>自然过渡：</strong>卡片入场采用错落的向上浮现（y: 10 -&gt; 0, opacity: 0 -&gt; 1）；健康度进度条采用宽度缓动（duration: 1s）；左侧导航激活状态使用 Framer Motion 的 layoutId 实现指示器的平滑滑动（Magic Motion）。</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

