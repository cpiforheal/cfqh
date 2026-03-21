/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Target, 
  Award, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Sparkles, 
  Search, 
  BookMarked, 
  GraduationCap,
  Headphones,
  LayoutGrid,
  Eye
} from 'lucide-react';

// --- Mock Data ---
const packageData = {
  math: {
    foundation: {
      main: {
        id: 'm-f-1',
        title: '2027版 高数全程通关尊享包',
        badge: '零基础首选',
        target: '基础薄弱、跨考、需要从零系统构建知识体系的同学',
        solves: '知识点零散无从下手、缺乏系统训练、做题没思路',
        features: ['名师主编', '阶梯式训练', '全真模拟'],
        contents: [
          { 
            type: '核心教材', 
            name: '高数核心考点精编 (上/下册)', 
            desc: '涵盖100%大纲考点，通俗易懂', 
            coverColor: 'from-blue-500 to-blue-700',
            details: '本书由前命题组专家联合编写，针对专转本考试大纲，将高等数学分为12个核心模块。包含知识点精讲、例题剖析、易错点提示等板块。上册主讲函数、极限、微积分基础；下册主讲多元函数、微分方程等进阶内容。全书采用双色印刷，重点突出。'
          },
          { 
            type: '配套习题', 
            name: '基础必刷1000题', 
            desc: '按章节分层训练，夯实基础', 
            coverColor: 'from-indigo-500 to-indigo-700',
            details: '与《核心考点精编》完全同步，分为“基础过关”、“能力提升”、“历年真题”三个梯度。每道题均配有详细的解析过程，部分重难点题目配有视频讲解二维码，扫码即可观看名师解题思路。'
          },
          { 
            type: '阶段测评', 
            name: '模块通关测评卷 (6套)', 
            desc: '检验阶段学习成果，查漏补缺', 
            coverColor: 'from-emerald-500 to-emerald-700',
            details: '包含6套严格按照真实考试难度命制的阶段性测试卷。建议在完成每个大模块学习后进行限时闭卷测试。附赠答题卡与评分标准，帮助考生提前适应考场节奏，精准定位薄弱环节。'
          }
        ]
      },
      secondary: {
        id: 'm-f-2',
        title: '高数基础精讲包',
        badge: '夯实基础',
        target: '有一定基础，只需巩固核心考点的同学',
        contents: ['高数核心考点精编', '基础必刷1000题']
      }
    },
    reinforcement: {
      main: {
        id: 'm-r-1',
        title: '高数强化提分突击包',
        badge: '突破瓶颈',
        target: '基础已过完，需要掌握解题技巧、提高做题速度的同学',
        solves: '做题慢、遇到综合题没思路、容易掉入陷阱',
        features: ['题型归纳', '秒杀技巧', '重难点突破'],
        contents: [
          { 
            type: '强化教材', 
            name: '高数题型与技巧精粹', 
            desc: '120种常考题型全面归纳', 
            coverColor: 'from-blue-600 to-indigo-800',
            details: '打破传统章节顺序，按“题型”重新串联知识点。总结了120种专转本常考题型及对应的“秒杀”技巧。'
          },
          { 
            type: '真题演练', 
            name: '历年真题分类汇编', 
            desc: '近10年真题深度解析', 
            coverColor: 'from-amber-500 to-orange-600',
            details: '收录近10年真实考卷，按考点分类汇编，洞悉命题规律。'
          },
          { 
            type: '专项突破', 
            name: '易错题与压轴题集', 
            desc: '攻克失分重灾区', 
            coverColor: 'from-rose-500 to-red-700',
            details: '专门针对历年考生得分率低于30%的题目进行专项特训。'
          }
        ]
      }
    },
    sprint: {
      main: {
        id: 'm-s-1',
        title: '高数考前冲刺押题包',
        badge: '考前必刷',
        target: '即将参加考试，需要全真模拟、调整应试状态的同学',
        solves: '时间分配不合理、缺乏临场经验、对最新考情不敏感',
        features: ['全真模拟', '名师押题', '考前点拨'],
        contents: [
          { 
            type: '冲刺卷', 
            name: '考前全真模拟卷 (8套)', 
            desc: '严格按照真题难度与题型命制', 
            coverColor: 'from-blue-500 to-cyan-600',
            details: '8套高质量模拟卷，难度与真题高度一致。'
          },
          { 
            type: '押题卷', 
            name: '名师终极密押卷 (3套)', 
            desc: '直击今年命题趋势', 
            coverColor: 'from-purple-600 to-purple-800',
            details: '教研团队结合最新考纲与命题动向，精心打磨的3套押题卷。'
          },
          { 
            type: '背诵手册', 
            name: '考前必背公式与定理', 
            desc: '口袋书，随时随地记忆', 
            coverColor: 'from-emerald-500 to-teal-700',
            details: '浓缩全书精华，便携式口袋书设计。'
          }
        ]
      }
    }
  },
  medical: {
    foundation: {
      main: {
        id: 'med-f-1',
        title: '医护综合系统精讲包',
        badge: '跨考福音',
        target: '护理/医学类专业，需要系统掌握解剖、生理等基础知识的同学',
        solves: '医学名词难记、知识点繁杂、缺乏临床联系',
        features: ['图文并茂', '口诀记忆', '考纲全覆盖'],
        contents: [
          { 
            type: '核心教材', 
            name: '医护综合核心考点 (全彩版)', 
            desc: '全彩图解，直观易懂', 
            coverColor: 'from-teal-500 to-teal-700',
            details: '采用全彩印刷，包含大量高清解剖图与生理机制示意图。'
          },
          { 
            type: '配套习题', 
            name: '章节同步练习册', 
            desc: '学练结合，加深记忆', 
            coverColor: 'from-cyan-500 to-blue-600',
            details: '与主教材完美同步的课后练习。'
          },
          { 
            type: '记忆手册', 
            name: '高频考点速记手册', 
            desc: '独家记忆口诀', 
            coverColor: 'from-blue-400 to-indigo-600',
            details: '教研团队总结的数百个顺口溜与记忆口诀。'
          }
        ]
      }
    }
  }
};

type Direction = 'math' | 'medical';
type Stage = 'foundation' | 'reinforcement' | 'sprint';

export default function App() {
  const [direction, setDirection] = useState<Direction>('math');
  const [stage, setStage] = useState<Stage>('foundation');
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);

  // Fallback to foundation if a stage doesn't exist for a direction
  const currentData = packageData[direction][stage] || packageData[direction]['foundation'];

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center font-sans text-slate-900">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-slate-50 min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* --- Header --- */}
        <header className="bg-white px-5 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold tracking-tight">教材资料库</h1>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* 1. Direction Selection (Top Level) */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
            <button
              onClick={() => setDirection('math')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                direction === 'math' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={16} />
              高等数学
            </button>
            <button
              onClick={() => setDirection('medical')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                direction === 'medical' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap size={16} />
              医护综合
            </button>
          </div>

          {/* 2. Stage Selection (Second Level) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {[
              { id: 'foundation', label: '基础阶段', desc: '打牢根基' },
              { id: 'reinforcement', label: '强化阶段', desc: '突破重难点' },
              { id: 'sprint', label: '冲刺阶段', desc: '考前模拟' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStage(s.id as Stage)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm border transition-all ${
                  stage === s.id 
                    ? direction === 'math' 
                      ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                      : 'bg-teal-50 border-teal-200 text-teal-700 font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </header>

        {/* --- Main Content --- */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${direction}-${stage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* --- Main Recommended Package --- */}
              {currentData.main && (
                <section>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <Sparkles className={direction === 'math' ? 'text-blue-500' : 'text-teal-500'} size={18} />
                    <h2 className="text-lg font-bold text-slate-800">核心主推套系</h2>
                    <span className="text-xs text-slate-400 font-normal ml-auto">最适合当前阶段</span>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Card Header */}
                    <div className={`p-5 ${direction === 'math' ? 'bg-gradient-to-br from-blue-50 to-indigo-50/30' : 'bg-gradient-to-br from-teal-50 to-emerald-50/30'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${direction === 'math' ? 'bg-blue-600 text-white' : 'bg-teal-600 text-white'}`}>
                          {currentData.main.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-tight">
                        {currentData.main.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {currentData.main.features.map((feat, idx) => (
                          <span key={idx} className="flex items-center text-xs text-slate-600 bg-white/60 px-2 py-1 rounded-md border border-white/40">
                            <CheckCircle2 size={12} className={direction === 'math' ? 'text-blue-500 mr-1' : 'text-teal-500 mr-1'} />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Target & Solves */}
                    <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50">
                      <div className="mb-3">
                        <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                          <Target size={12} /> 适合人群
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {currentData.main.target}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                          <Award size={12} /> 解决问题
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {currentData.main.solves}
                        </p>
                      </div>
                    </div>

                    {/* Included Contents (The "What's inside" section - Shelf View) */}
                    <div className="pt-5 pb-6">
                      <div className="text-sm font-bold text-slate-800 mb-3 px-5 flex justify-between items-end">
                        <span>套系包含以下资料：</span>
                        <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
                          左右滑动查看 <ChevronRight size={12} />
                        </span>
                      </div>
                      
                      {/* Horizontal Scroll Shelf */}
                      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x scrollbar-hide px-5">
                        {currentData.main.contents.map((item: any, idx: number) => (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedMaterial(item)}
                            className="min-w-[140px] w-[140px] snap-start flex flex-col gap-3 group cursor-pointer"
                          >
                            {/* Book Cover Simulation */}
                            <div className={`aspect-[3/4] rounded-r-lg rounded-l-sm shadow-md bg-gradient-to-br ${item.coverColor} relative overflow-hidden flex flex-col justify-between p-3 border-l-[6px] border-white/20 group-hover:-translate-y-1 transition-transform duration-300`}>
                              <div className="flex justify-between items-start">
                                <span className="text-white/90 text-[10px] font-medium bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                  {item.type}
                                </span>
                              </div>
                              <h4 className="text-white font-bold text-sm leading-snug drop-shadow-md">
                                {item.name}
                              </h4>
                              {/* Decorative elements for book cover */}
                              <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-tl-full blur-xl"></div>
                              <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
                            </div>
                            
                            {/* Text Info Below Cover */}
                            <div>
                              <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="px-5 mt-2">
                        <button className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98] ${
                          direction === 'math' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
                        }`}>
                          获取完整套系
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* --- Secondary Package (Optional) --- */}
              {currentData.secondary && (
                <section className="pt-2">
                  <h2 className="text-sm font-bold text-slate-500 mb-3 px-1">其他精选方案</h2>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between active:bg-slate-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-800">{currentData.secondary.title}</h3>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          {currentData.secondary.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{currentData.secondary.target}</p>
                      <div className="flex gap-2 mt-2">
                        {currentData.secondary.contents.map((c: string, i: number) => (
                          <span key={i} className="text-[10px] text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 shrink-0" />
                  </div>
                </section>
              )}

              {/* Bottom padding for scroll */}
              <div className="h-8"></div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* --- Bottom Consultation Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-20">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">不知道怎么选？</p>
              <p className="text-xs text-slate-500">专业老师为您1对1定制资料方案</p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95">
              <Headphones size={16} />
              免费咨询
            </button>
          </div>
        </div>

        {/* --- Material Detail Overlay --- */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-slate-50 flex flex-col"
            >
              {/* Overlay Header */}
              <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between shadow-sm z-10">
                <button 
                  onClick={() => setSelectedMaterial(null)}
                  className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-1"
                >
                  <ChevronLeft size={24} />
                  <span className="text-sm font-medium">返回</span>
                </button>
                <div className="font-bold text-slate-800">资料详情</div>
                <div className="w-10"></div> {/* Spacer for centering */}
              </div>

              {/* Overlay Content */}
              <div className="flex-1 overflow-y-auto pb-24">
                {/* Big Book Cover Presentation */}
                <div className="bg-slate-100 py-10 flex justify-center items-center px-8 border-b border-slate-200">
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className={`w-48 aspect-[3/4] rounded-r-xl rounded-l-sm shadow-2xl bg-gradient-to-br ${selectedMaterial.coverColor} relative overflow-hidden flex flex-col justify-between p-5 border-l-[8px] border-white/20`}
                  >
                    <span className="text-white/90 text-xs font-medium bg-black/20 px-2 py-1 rounded backdrop-blur-sm self-start">
                      {selectedMaterial.type}
                    </span>
                    <h4 className="text-white font-bold text-xl leading-snug drop-shadow-lg">
                      {selectedMaterial.name}
                    </h4>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-tl-full blur-2xl"></div>
                  </motion.div>
                </div>

                {/* Details Section */}
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {selectedMaterial.type}
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">
                      {selectedMaterial.name}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {selectedMaterial.desc}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <BookOpen size={16} className="text-slate-400" />
                        内容简介
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                        {selectedMaterial.details}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Eye size={16} className="text-slate-400" />
                        资料亮点
                      </h3>
                      <ul className="space-y-2">
                        {[
                          '紧扣最新专转本考试大纲',
                          '名师团队历时1年精心打磨',
                          '配套线上答疑与视频解析'
                        ].map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay Bottom Action */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] flex gap-3">
                <button 
                  onClick={() => setSelectedMaterial(null)}
                  className="flex-1 py-3.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  返回套系
                </button>
                <button className="flex-1 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-transform active:scale-[0.98]">
                  咨询此资料
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

