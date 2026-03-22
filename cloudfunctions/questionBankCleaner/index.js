const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

// ==================== 列名映射配置 ====================

const COLUMN_MAPPINGS = {
  questionId: ['questionId', 'question_id', 'id', '题目编号', '题号', '编号', 'ID'],
  direction: ['direction', 'dir', '方向', '科目', '学科', '类别', '分类'],
  questionType: ['questionType', 'question_type', 'type', '题型', '类型', '题目类型'],
  stem: ['stem', 'question', 'content', '题目', '题干', '问题', '内容', '题目内容'],
  optionA: ['optionA', 'option_a', 'a', 'A', '选项A', '选项1', '第一项'],
  optionB: ['optionB', 'option_b', 'b', 'B', '选项B', '选项2', '第二项'],
  optionC: ['optionC', 'option_c', 'c', 'C', '选项C', '选项3', '第三项'],
  optionD: ['optionD', 'option_d', 'd', 'D', '选项D', '选项4', '第四项'],
  optionE: ['optionE', 'option_e', 'e', 'E', '选项E', '选项5', '第五项'],
  optionF: ['optionF', 'option_f', 'f', 'F', '选项F', '选项6', '第六项'],
  answer: ['answer', 'ans', 'correct', '答案', '正确答案', '标准答案'],
  explanation: ['explanation', 'explain', 'analysis', '解析', '解答', '答案解析', '题目解析'],
  year: ['year', '年份', '年', '考试年份'],
  paperId: ['paperId', 'paper_id', '试卷编号', '试卷ID', '套卷编号'],
  paperTitle: ['paperTitle', 'paper_title', '试卷标题', '试卷名称', '套卷名称'],
  paperDescription: ['paperDescription', 'paper_description', '试卷说明', '试卷描述', '套卷说明'],
  tags: ['tags', 'tag', '标签', '知识点', '考点'],
  status: ['status', 'state', '状态', '发布状态']
};

// ==================== 数据清洗器 ====================

class DataCleaner {
  constructor(options = {}) {
    this.options = {
      autoGenerateId: true,
      normalizeAnswer: true,
      fixEncoding: true,
      ...options
    };
  }

  // 主清洗入口
  async clean(rawData) {
    console.log(`[DataCleaner] 开始清洗，行数: ${rawData.length}`);
    
    const results = {
      totalRows: rawData.length,
      validCount: 0,
      warningCount: 0,
      errorCount: 0,
      cleanedData: [],
      errors: [],
      warnings: []
    };

    for (let i = 0; i < rawData.length; i++) {
      try {
        const cleaned = this.cleanRow(rawData[i], i + 1);
        
        if (cleaned.status === 'valid') {
          results.validCount++;
        } else if (cleaned.status === 'warning') {
          results.warningCount++;
        } else {
          results.errorCount++;
        }
        
        results.cleanedData.push(cleaned);
      } catch (error) {
        results.errorCount++;
        results.errors.push({
          lineNumber: i + 1,
          message: error.message,
          rawData: rawData[i]
        });
      }
    }

    console.log(`[DataCleaner] 清洗完成: 有效=${results.validCount}, 警告=${results.warningCount}, 错误=${results.errorCount}`);
    return results;
  }

  // 单行清洗
  cleanRow(row, lineNumber) {
    const cleaned = {
      lineNumber,
      status: 'valid',
      warnings: [],
      errors: []
    };

    // 1. 清洗题号
    cleaned.questionId = this.cleanQuestionId(row.questionId || row.id, lineNumber);
    
    // 2. 清洗方向
    cleaned.direction = this.cleanDirection(row.direction);
    
    // 3. 清洗题型
    cleaned.questionType = this.cleanQuestionType(row.questionType || row.type);
    
    // 4. 清洗题干
    cleaned.stem = this.cleanStem(row.stem || row.question || row.content);
    
    // 5. 清洗选项
    const options = this.cleanOptions(row, cleaned.stem);
    cleaned.optionA = options.A;
    cleaned.optionB = options.B;
    cleaned.optionC = options.C;
    cleaned.optionD = options.D;
    cleaned.optionE = options.E || '';
    cleaned.optionF = options.F || '';
    
    // 如果选项是从题干提取的，更新题干
    if (options.extracted) {
      cleaned.stem = options.cleanStem;
    }
    
    // 6. 清洗答案
    cleaned.answer = this.cleanAnswer(row.answer, cleaned.questionType);
    
    // 7. 清洗解析
    cleaned.explanation = this.cleanExplanation(row.explanation || row.analysis);
    
    // 8. 清洗年份
    cleaned.year = this.cleanYear(row.year);
    
    // 9. 清洗试卷信息
    cleaned.paperId = this.cleanPaperId(row.paperId || row.paper_id);
    cleaned.paperTitle = this.cleanPaperTitle(row.paperTitle || row.paper_title);
    cleaned.paperDescription = this.cleanPaperDescription(
      row.paperDescription || row.paper_description
    );
    
    // 10. 清洗标签
    cleaned.tags = this.cleanTags(row.tags || row.tag);
    
    // 11. 清洗状态
    cleaned.status = this.cleanStatus(row.status) || 'draft';

    // 12. 验证数据完整性
    const validation = this.validate(cleaned);
    cleaned.status = validation.status;
    cleaned.warnings = validation.warnings;
    cleaned.errors = validation.errors;

    return cleaned;
  }

  // 清洗题号
  cleanQuestionId(value, lineNumber) {
    if (!value || String(value).trim() === '') {
      if (this.options.autoGenerateId) {
        return `Q${String(lineNumber).padStart(3, '0')}`;
      }
      return '';
    }

    let cleaned = String(value).trim().toUpperCase();
    cleaned = cleaned.replace(/[^A-Z0-9\-]/g, '');
    
    if (!cleaned) {
      return `Q${String(lineNumber).padStart(3, '0')}`;
    }

    return cleaned;
  }

  // 清洗方向
  cleanDirection(value) {
    if (!value) return 'medical';

    const normalized = String(value).trim().toLowerCase();
    
    const mapping = {
      '数学': 'math', '高数': 'math', '高等数学': 'math',
      '医护': 'medical', '护理': 'medical', '医学': 'medical', '综合': 'medical'
    };

    for (const [key, result] of Object.entries(mapping)) {
      if (normalized.includes(key.toLowerCase())) {
        return result;
      }
    }

    return 'medical';
  }

  // 清洗题型
  cleanQuestionType(value) {
    if (!value) return 'single_choice';

    const normalized = String(value).trim().toLowerCase();
    
    const mapping = {
      '单选': 'single_choice', '单选题': 'single_choice', '选择': 'single_choice',
      '多选': 'multiple_choice', '多选题': 'multiple_choice',
      '判断': 'judge', '判断题': 'judge', '对错': 'judge',
      '案例': 'case_analysis', '案例题': 'case_analysis', '分析': 'case_analysis'
    };

    for (const [key, result] of Object.entries(mapping)) {
      if (normalized.includes(key.toLowerCase())) {
        return result;
      }
    }

    return 'single_choice';
  }

  // 清洗题干
  cleanStem(value) {
    if (!value) return '';

    let cleaned = String(value);
    cleaned = cleaned.trim();
    cleaned = cleaned.replace(/\s+/g, ' ');
    cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');
    
    // 修复常见编码问题
    cleaned = cleaned
      .replace(/＆/g, '&')
      .replace(/＂/g, '"')
      .replace(/＇/g, "'")
      .replace(/＜/g, '<')
      .replace(/＞/g, '>');

    return cleaned;
  }

  // 清洗选项
  cleanOptions(row, stem) {
    const result = {
      A: '', B: '', C: '', D: '', E: '', F: '',
      extracted: false,
      cleanStem: stem
    };

    // 尝试从单独的列获取选项
    result.A = this.cleanOptionText(row.optionA || row.a || row['选项A'] || row['选项1']);
    result.B = this.cleanOptionText(row.optionB || row.b || row['选项B'] || row['选项2']);
    result.C = this.cleanOptionText(row.optionC || row.c || row['选项C'] || row['选项3']);
    result.D = this.cleanOptionText(row.optionD || row.d || row['选项D'] || row['选项4']);
    result.E = this.cleanOptionText(row.optionE || row.e || row['选项E'] || row['选项5']);
    result.F = this.cleanOptionText(row.optionF || row.f || row['选项F'] || row['选项6']);

    // 如果选项列为空，尝试从题干提取
    if (!result.A && !result.B && !result.C && !result.D) {
      const extracted = this.extractOptionsFromStem(stem);
      if (extracted.success) {
        result.A = extracted.A;
        result.B = extracted.B;
        result.C = extracted.C;
        result.D = extracted.D;
        result.extracted = true;
        result.cleanStem = extracted.cleanStem;
      }
    }

    return result;
  }

  // 清洗单个选项文本
  cleanOptionText(value) {
    if (!value) return '';
    
    let cleaned = String(value).trim();
    cleaned = cleaned.replace(/^[A-F][\.\、\s]+/i, '');
    cleaned = cleaned.replace(/^\d+[\.\、\s]+/, '');
    
    return cleaned.trim();
  }

  // 从题干提取选项
  extractOptionsFromStem(stem) {
    const result = { success: false, A: '', B: '', C: '', D: '', cleanStem: stem };
    
    // 模式1：A.xxx B.xxx C.xxx D.xxx
    const pattern1 = /[A-D][\.\、]([^\n\r]+?)(?=[A-D][\.\、]|$)/gi;
    const matches1 = stem.match(pattern1);
    
    if (matches1 && matches1.length >= 4) {
      result.success = true;
      matches1.forEach((match, index) => {
        const letter = String.fromCharCode(65 + index);
        result[letter] = match.replace(/^[A-D][\.\、]/, '').trim();
      });
      
      result.cleanStem = stem.split(/[A-D][\.\、]/i)[0].trim();
      return result;
    }
    
    // 模式2：（A）xxx （B）xxx （C）xxx （D）xxx
    const pattern2 = /[（(]([A-D])[）)]([^\n\r]+?)(?=[（(][A-D][）)]|$)/gi;
    const matches2 = [...stem.matchAll(pattern2)];
    
    if (matches2.length >= 4) {
      result.success = true;
      matches2.forEach(match => {
        result[match[1].toUpperCase()] = match[2].trim();
      });
      
      result.cleanStem = stem.split(/[（(][A-D][）)]/i)[0].trim();
      return result;
    }
    
    return result;
  }

  // 清洗答案
  cleanAnswer(value, questionType) {
    if (!value) return '';

    let cleaned = String(value).trim().toUpperCase();
    
    const mapping = {
      '1': 'A', '2': 'B', '3': 'C', '4': 'D',
      '①': 'A', '②': 'B', '③': 'C', '④': 'D',
      '对': 'T', '错': 'F', '正确': 'T', '错误': 'F',
      '√': 'T', '×': 'F', 'Y': 'T', 'N': 'F'
    };

    for (const [key, result] of Object.entries(mapping)) {
      cleaned = cleaned.replace(new RegExp(key, 'g'), result);
    }

    // 多选题答案标准化
    if (questionType === 'multiple_choice') {
      if (/^[A-F]{2,}$/.test(cleaned)) {
        cleaned = cleaned.split('').join('|');
      }
      cleaned = cleaned.replace(/[,，\s]+/g, '|');
    }

    // 判断题答案标准化
    if (questionType === 'judge') {
      if (cleaned === 'T' || cleaned === 'F') {
        return cleaned;
      }
      return 'T';
    }

    return cleaned;
  }

  // 清洗解析
  cleanExplanation(value) {
    if (!value) return '';
    return this.cleanStem(value);
  }

  // 清洗年份
  cleanYear(value) {
    if (!value) {
      return new Date().getFullYear();
    }

    const yearMatch = String(value).match(/\d{4}/);
    if (yearMatch) {
      const year = parseInt(yearMatch[0]);
      if (year >= 2020 && year <= 2030) {
        return year;
      }
    }

    return new Date().getFullYear();
  }

  // 清洗试卷ID
  cleanPaperId(value) {
    if (!value) return '';
    return String(value).trim().replace(/[^A-Z0-9\-_]/g, '');
  }

  // 清洗试卷标题
  cleanPaperTitle(value) {
    if (!value) return '';
    return this.cleanStem(value);
  }

  // 清洗试卷说明
  cleanPaperDescription(value) {
    if (!value) return '';
    return this.cleanStem(value);
  }

  // 清洗标签
  cleanTags(value) {
    if (!value) return '';
    
    let cleaned = String(value).trim();
    cleaned = cleaned.replace(/[|;；、\s]+/g, ',');
    
    const tags = cleaned.split(',').filter(tag => tag.trim());
    
    return tags.join(',');
  }

  // 清洗状态
  cleanStatus(value) {
    if (!value) return 'draft';
    
    const normalized = String(value).trim().toLowerCase();
    
    const mapping = {
      '已发布': 'published', '发布': 'published', '启用': 'published',
      '草稿': 'draft', '未发布': 'draft', '待发布': 'draft',
      '归档': 'archived', '废弃': 'archived'
    };

    for (const [key, result] of Object.entries(mapping)) {
      if (normalized.includes(key.toLowerCase())) {
        return result;
      }
    }

    return 'draft';
  }

  // 验证数据完整性
  validate(data) {
    const result = {
      status: 'valid',
      warnings: [],
      errors: []
    };

    // 必填字段检查
    if (!data.stem || data.stem.length < 5) {
      result.errors.push('题干内容过短或为空');
      result.status = 'error';
    }

    if (!data.answer) {
      result.errors.push('答案为空');
      result.status = 'error';
    }

    // 选项检查
    const hasOptions = data.optionA || data.optionB || data.optionC || data.optionD;
    if (!hasOptions && data.questionType !== 'judge') {
      result.warnings.push('没有选项内容');
      if (result.status === 'valid') result.status = 'warning';
    }

    // 答案格式检查
    if (data.questionType === 'single_choice' && data.answer.length > 1) {
      result.warnings.push('单选题答案应该只有一个字母');
      if (result.status === 'valid') result.status = 'warning';
    }

    return result;
  }
}

// ==================== 格式解析器 ====================

class FormatParser {
  // 解析CSV文本
  static parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV文件至少需要包含表头和一行数据');
    }

    // 检测分隔符
    const delimiter = this.detectDelimiter(lines[0]);
    
    const headers = this.parseCSVLine(lines[0], delimiter);
    const rows = lines.slice(1).map(line => {
      const values = this.parseCSVLine(line, delimiter);
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });

    return { headers, rows };
  }

  // 检测CSV分隔符
  static detectDelimiter(line) {
    const delimiters = [',', '\t', ';', '|'];
    
    let maxCount = 0;
    let detected = ',';
    
    for (const delim of delimiters) {
      const count = (line.match(new RegExp(delim, 'g')) || []).length;
      if (count > maxCount) {
        maxCount = count;
        detected = delim;
      }
    }
    
    return detected;
  }

  // 解析单行CSV
  static parseCSVLine(line, delimiter = ',') {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  // 解析JSON
  static parseJSON(text) {
    try {
      const data = JSON.parse(text);
      
      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error('JSON数组为空');
        }
        return {
          headers: Object.keys(data[0]),
          rows: data
        };
      }
      
      if (data.questions && Array.isArray(data.questions)) {
        return {
          headers: Object.keys(data.questions[0] || {}),
          rows: data.questions
        };
      }
      
      throw new Error('JSON格式不正确，需要包含题目数组');
    } catch (error) {
      throw new Error(`JSON解析失败: ${error.message}`);
    }
  }

  // 解析纯文本
  static parsePlainText(text) {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    
    // 模式1：每道题有明显的分隔（数字开头）
    const numberedPattern = /^\d+[\.\、]/;
    if (lines.some(line => numberedPattern.test(line))) {
      return this.parseNumberedQuestions(lines);
    }
    
    // 模式2：选项格式（A. B. C. D.）
    const optionPattern = /^[A-D][\.\、]/;
    if (lines.some(line => optionPattern.test(line))) {
      return this.parseOptionFormatQuestions(lines);
    }
    
    // 默认：每行一道题
    return {
      headers: ['stem'],
      rows: lines.map(line => ({ stem: line }))
    };
  }

  // 解析编号格式的题目
  static parseNumberedQuestions(lines) {
    const questions = [];
    let currentQuestion = null;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // 新题目开始
      if (/^\d+[\.\、]/.test(trimmed)) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          stem: trimmed.replace(/^\d+[\.\、]\s*/, ''),
          optionA: '', optionB: '', optionC: '', optionD: '',
          answer: '', explanation: ''
        };
      }
      // 选项
      else if (/^[A-D][\.\、]/.test(trimmed) && currentQuestion) {
        const option = trimmed.charAt(0).toUpperCase();
        const content = trimmed.substring(2).trim();
        currentQuestion[`option${option}`] = content;
      }
      // 答案
      else if (/^答案[:：]/.test(trimmed) && currentQuestion) {
        currentQuestion.answer = trimmed.replace(/^答案[:：]\s*/, '');
      }
      // 解析
      else if (/^解析[:：]/.test(trimmed) && currentQuestion) {
        currentQuestion.explanation = trimmed.replace(/^解析[:：]\s*/, '');
      }
    }
    
    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return {
      headers: ['stem', 'optionA', 'optionB', 'optionC', 'optionD', 'answer', 'explanation'],
      rows: questions
    };
  }

  // 解析选项格式的题目
  static parseOptionFormatQuestions(lines) {
    return this.parseNumberedQuestions(lines);
  }
}

// ==================== 列名映射器 ====================

function generateColumnMappings(headers) {
  const mappings = [];
  
  for (const header of headers) {
    const mapping = {
      original: header,
      mapped: findBestMapping(header),
      confidence: calculateConfidence(header)
    };
    mappings.push(mapping);
  }
  
  return mappings;
}

function findBestMapping(header) {
  const normalized = header.toLowerCase().trim();
  
  for (const [field, aliases] of Object.entries(COLUMN_MAPPINGS)) {
    for (const alias of aliases) {
      if (normalized === alias.toLowerCase()) {
        return field;
      }
    }
  }
  
  return header;
}

function calculateConfidence(header) {
  const normalized = header.toLowerCase().trim();
  
  for (const [field, aliases] of Object.entries(COLUMN_MAPPINGS)) {
    for (const alias of aliases) {
      if (normalized === alias.toLowerCase()) {
        return 100;
      }
      if (normalized.includes(alias.toLowerCase())) {
        return 80;
      }
    }
  }
  
  return 50;
}

// ==================== 数据导入 ====================

async function importToDatabase(cleanedData) {
  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  const paperIds = new Set();
  
  console.log(`[importToDatabase] 开始导入 ${cleanedData.length} 条数据`);
  
  for (const item of cleanedData) {
    if (item.status === 'error') {
      skippedCount++;
      continue;
    }
    
    try {
      // 检查是否已存在（基于questionId）
      const existing = await db.collection('medical_questions')
        .where({ questionId: item.questionId })
        .get();
      
      if (existing.data.length > 0) {
        // 如果已存在，询问是否更新（这里默认追加，不覆盖）
        // 可以根据需要修改为更新逻辑
        console.log(`[importToDatabase] 题目 ${item.questionId} 已存在，跳过`);
        skippedCount++;
      } else {
        // 新增（追加到现有数据）
        await db.collection('medical_questions').add({
          data: {
            ...item,
            createdAt: db.serverDate(),
            updatedAt: db.serverDate()
          }
        });
        createdCount++;
        console.log(`[importToDatabase] 新增题目 ${item.questionId}`);
      }
      
      // 收集试卷ID
      if (item.paperId) {
        paperIds.add(item.paperId);
      }
    } catch (error) {
      console.error(`[importToDatabase] 导入失败: ${item.questionId}`, error);
      skippedCount++;
    }
  }
  
  // 同步试卷信息（追加模式）
  for (const paperId of paperIds) {
    await syncPaperInfo(paperId, cleanedData);
  }
  
  console.log(`[importToDatabase] 导入完成: 新增=${createdCount}, 更新=${updatedCount}, 跳过=${skippedCount}`);
  
  return {
    importedCount: createdCount + updatedCount,
    createdCount,
    updatedCount,
    skippedCount,
    paperCount: paperIds.size
  };
}

// 同步试卷信息
async function syncPaperInfo(paperId, questions) {
  const paperQuestions = questions.filter(q => q.paperId === paperId);
  if (paperQuestions.length === 0) return;
  
  const firstQuestion = paperQuestions[0];
  
  // 检查试卷是否存在
  const existing = await db.collection('past_papers')
    .where({ paperId })
    .get();
  
  const paperData = {
    paperId,
    title: firstQuestion.paperTitle || `试卷 ${paperId}`,
    description: firstQuestion.paperDescription || '',
    direction: firstQuestion.direction,
    year: firstQuestion.year,
    questionIds: paperQuestions.map(q => q.questionId),
    status: 'published',
    updatedAt: db.serverDate()
  };
  
  if (existing.data.length > 0) {
    await db.collection('past_papers')
      .doc(existing.data[0]._id)
      .update({ data: paperData });
  } else {
    await db.collection('past_papers').add({
      data: {
        ...paperData,
        createdAt: db.serverDate()
      }
    });
  }
}

// ==================== 云函数入口 ====================

exports.main = async (event) => {
  const { action, fileContent, fileName, options } = event;
  
  try {
    if (action === 'preview') {
      // 预览和清洗
      const format = detectFormat(fileName);
      const parsed = parseFile(fileContent, format);
      const cleaner = new DataCleaner(options);
      const cleaned = await cleaner.clean(parsed.rows);
      
      // 生成列名映射建议
      const columnMappings = generateColumnMappings(parsed.headers);
      
      return {
        ok: true,
        data: {
          format,
          headers: parsed.headers,
          columnMappings,
          ...cleaned
        }
      };
    }
    
    if (action === 'commit') {
      // 确认导入
      const format = detectFormat(fileName);
      const parsed = parseFile(fileContent, format);
      const cleaner = new DataCleaner(options);
      const cleaned = await cleaner.clean(parsed.rows);
      
      // 写入数据库
      const result = await importToDatabase(cleaned.cleanedData);
      
      return {
        ok: true,
        data: {
          importedCount: result.importedCount,
          createdCount: result.createdCount,
          updatedCount: result.updatedCount,
          paperCount: result.paperCount
        }
      };
    }
    
    throw new Error('不支持的操作');
  } catch (error) {
    console.error('[questionBankCleaner] 错误:', error);
    return {
      ok: false,
      message: error.message
    };
  }
};

// 检测文件格式
function detectFormat(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  
  const formatMap = {
    'csv': 'csv',
    'xlsx': 'excel',
    'xls': 'excel',
    'json': 'json',
    'txt': 'text',
    'docx': 'word'
  };
  
  return formatMap[ext] || 'text';
}

// 解析文件
function parseFile(content, format) {
  switch (format) {
    case 'csv':
      return FormatParser.parseCSV(content);
    case 'json':
      return FormatParser.parseJSON(content);
    case 'text':
    default:
      return FormatParser.parsePlainText(content);
  }
}