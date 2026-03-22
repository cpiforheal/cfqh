import Taro from '@tarojs/taro';
import { Button, Text, View, Input } from '@tarojs/components';
import { useState } from 'react';
import { callCloudFunction } from '../../../services/cloud';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

interface PreviewData {
  format: string;
  headers: string[];
  columnMappings: Array<{
    original: string;
    mapped: string;
    confidence: number;
  }>;
  totalRows: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  cleanedData: Array<{
    lineNumber: number;
    status: string;
    questionId: string;
    questionType: string;
    stem: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    warnings: string[];
    errors: string[];
  }>;
  errors: Array<{
    lineNumber: number;
    message: string;
  }>;
}

export default function QuestionBankImportPage() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'excel' | 'csv' | 'text'>('excel');

  // 选择文件
  async function handleChooseFile() {
    try {
      const res = await Taro.chooseMessageFile({
        count: 1,
        type: 'file',
        extension: ['csv', 'txt', 'json']
      });

      if (res.tempFiles && res.tempFiles.length > 0) {
        const file = res.tempFiles[0];
        setFileName(file.name || '未命名文件');

        // 读取文件内容
        const fs = Taro.getFileSystemManager();
        fs.readFile({
          filePath: file.path,
          encoding: 'utf-8',
          success: (readRes) => {
            const content = readRes.data as string;
            setFileContent(content);
            handlePreview(content, file.name || '未命名文件');
          },
          fail: (error) => {
            Taro.showToast({ title: '读取文件失败', icon: 'none' });
            console.error('读取文件失败:', error);
          }
        });
      }
    } catch (error) {
      console.error('选择文件失败:', error);
    }
  }

  // 预览数据
  async function handlePreview(content: string, name: string) {
    setLoading(true);
    try {
      const result = await callCloudFunction('questionBankCleaner', {
        action: 'preview',
        fileContent: content,
        fileName: name,
        options: {
          autoGenerateId: true,
          normalizeAnswer: true,
          fixEncoding: true
        }
      });

      if (result.ok) {
        setPreviewData(result.data);
        Taro.showToast({ title: '解析成功', icon: 'success' });
      } else {
        Taro.showToast({ title: result.message || '解析失败', icon: 'none' });
      }
    } catch (error) {
      console.error('预览失败:', error);
      Taro.showToast({ title: '预览失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  }

  // 确认导入
  async function handleConfirmImport() {
    if (!previewData || !fileContent) return;

    setImporting(true);
    try {
      const result = await callCloudFunction('questionBankCleaner', {
        action: 'commit',
        fileContent: fileContent,
        fileName: fileName,
        options: {
          autoGenerateId: true,
          normalizeAnswer: true,
          fixEncoding: true
        }
      });

      if (result.ok) {
        Taro.showModal({
          title: '导入成功',
          content: `成功导入 ${result.data.importedCount} 道题目\n新增: ${result.data.createdCount} 道\n更新: ${result.data.updatedCount} 道\n试卷: ${result.data.paperCount} 份`,
          showCancel: false,
          success: () => {
            // 清空状态
            setFileName('');
            setFileContent('');
            setPreviewData(null);
          }
        });
      } else {
        Taro.showToast({ title: result.message || '导入失败', icon: 'none' });
      }
    } catch (error) {
      console.error('导入失败:', error);
      Taro.showToast({ title: '导入失败', icon: 'none' });
    } finally {
      setImporting(false);
    }
  }

  // 重新上传
  function handleReupload() {
    setFileName('');
    setFileContent('');
    setPreviewData(null);
  }

  // 获取状态样式
  function getStatusStyle(status: string) {
    switch (status) {
      case 'valid':
        return { backgroundColor: '#e6f7e6', color: '#52c41a' };
      case 'warning':
        return { backgroundColor: '#fff7e6', color: '#faad14' };
      case 'error':
        return { backgroundColor: '#fff1f0', color: '#ff4d4f' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#999' };
    }
  }

  // 获取状态文本
  function getStatusText(status: string) {
    switch (status) {
      case 'valid':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✗';
      default:
        return '-';
    }
  }

  return (
    <View style={{ ...pageStyle, padding: '28rpx 24rpx 56rpx' }}>
      {/* 文件上传区域 */}
      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg, marginBottom: '24rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '16rpx' }}>
          📁 选择文件
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, marginBottom: '20rpx' }}>
          支持格式：CSV、JSON、纯文本（.txt）
        </Text>

        {!fileName ? (
          <Button
            type="primary"
            onClick={handleChooseFile}
            style={{ marginBottom: '14rpx' }}
          >
            选择文件
          </Button>
        ) : (
          <View>
            <View style={{
              padding: '20rpx',
              backgroundColor: '#f8f9fa',
              borderRadius: ui.radius.sm,
              marginBottom: '16rpx'
            }}>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 600 }}>
                📄 {fileName}
              </Text>
            </View>
            <View style={{ display: 'flex', gap: '12rpx' }}>
              <Button onClick={handleReupload} style={{ flex: 1 }}>
                重新选择
              </Button>
              {previewData && (
                <Button
                  type="primary"
                  onClick={handleConfirmImport}
                  loading={importing}
                  style={{ flex: 1 }}
                >
                  {importing ? '导入中...' : `确认导入 ${previewData.validCount} 题`}
                </Button>
              )}
            </View>
          </View>
        )}
      </View>

      {/* 格式说明 */}
      <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg, marginBottom: '24rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '16rpx' }}>
          📝 支持格式说明
        </Text>

        {/* 格式切换标签 */}
        <View style={{ display: 'flex', marginBottom: '16rpx', borderBottom: '2rpx solid #f0f0f0' }}>
          {(['csv', 'text', 'excel'] as const).map((tab) => (
            <View
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16rpx 24rpx',
                borderBottom: activeTab === tab ? '4rpx solid #2f66ff' : '4rpx solid transparent',
                marginBottom: '-2rpx'
              }}
            >
              <Text style={{
                fontSize: ui.type.body,
                color: activeTab === tab ? '#2f66ff' : ui.colors.textMuted,
                fontWeight: activeTab === tab ? 700 : 400
              }}>
                {tab === 'csv' ? 'CSV格式' : tab === 'text' ? '纯文本' : 'Excel格式'}
              </Text>
            </View>
          ))}
        </View>

        {/* 格式内容 */}
        {activeTab === 'csv' && (
          <View>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '12rpx' }}>
              CSV格式示例（英文逗号分隔）：
            </Text>
            <View style={{
              padding: '16rpx',
              backgroundColor: '#f8f9fa',
              borderRadius: ui.radius.sm,
              fontFamily: 'monospace'
            }}>
              <Text style={{ fontSize: '22rpx', color: ui.colors.text }}>
                questionId,direction,questionType,stem,optionA,optionB,optionC,optionD,answer,explanation{'\n'}
                Q001,medical,single_choice,患者出现发热症状...,发热,咳嗽,头痛,腹痛,A,根据临床表现...
              </Text>
            </View>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#faad14', marginTop: '12rpx' }}>
              ⚠️ 需要UTF-8编码，表头支持中英文
            </Text>
          </View>
        )}

        {activeTab === 'text' && (
          <View>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '12rpx' }}>
              纯文本格式示例（自动识别）：
            </Text>
            <View style={{
              padding: '16rpx',
              backgroundColor: '#f8f9fa',
              borderRadius: ui.radius.sm
            }}>
              <Text style={{ fontSize: '22rpx', color: ui.colors.text }}>
                1. 患者出现发热症状，首先考虑（  ）{'\n'}
                A. 发热{'\n'}
                B. 咳嗽{'\n'}
                C. 头痛{'\n'}
                D. 腹痛{'\n'}
                答案：A{'\n'}
                解析：根据临床表现...
              </Text>
            </View>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#52c41a', marginTop: '12rpx' }}>
              ✅ 适合复制粘贴，系统自动识别题目结构
            </Text>
          </View>
        )}

        {activeTab === 'excel' && (
          <View>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '12rpx' }}>
              Excel格式说明：
            </Text>
            <View style={{
              padding: '16rpx',
              backgroundColor: '#f8f9fa',
              borderRadius: ui.radius.sm
            }}>
              <Text style={{ fontSize: '22rpx', color: ui.colors.text }}>
                第一行为表头，支持以下列名：{'\n'}
                • 题号：questionId、题号、编号{'\n'}
                • 方向：direction、方向、科目{'\n'}
                • 题型：questionType、题型{'\n'}
                • 题干：stem、题目、题干{'\n'}
                • 选项：optionA-D、选项A-D{'\n'}
                • 答案：answer、答案{'\n'}
                • 解析：explanation、解析
              </Text>
            </View>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#2f66ff', marginTop: '12rpx' }}>
              💡 建议先导出Excel模板再填写
            </Text>
          </View>
        )}
      </View>

      {/* 加载状态 */}
      {loading && (
        <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg, marginBottom: '24rpx' }}>
          <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, textAlign: 'center' }}>
            正在解析文件...
          </Text>
        </View>
      )}

      {/* 数据预览 */}
      {previewData && !loading && (
        <View style={{ ...surfaceCardStyle, padding: '28rpx', borderRadius: ui.radius.lg }}>
          <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '16rpx' }}>
            📊 数据预览
          </Text>

          {/* 统计信息 */}
          <View style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20rpx',
            padding: '20rpx',
            backgroundColor: '#f8f9fa',
            borderRadius: ui.radius.sm
          }}>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 700 }}>
                {previewData.totalRows}
              </Text>
              <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>总行数</Text>
            </View>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ display: 'block', fontSize: ui.type.section, color: '#52c41a', fontWeight: 700 }}>
                {previewData.validCount}
              </Text>
              <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>可导入</Text>
            </View>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ display: 'block', fontSize: ui.type.section, color: '#faad14', fontWeight: 700 }}>
                {previewData.warningCount}
              </Text>
              <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>需修正</Text>
            </View>
            <View style={{ textAlign: 'center' }}>
              <Text style={{ display: 'block', fontSize: ui.type.section, color: '#ff4d4f', fontWeight: 700 }}>
                {previewData.errorCount}
              </Text>
              <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>有错误</Text>
            </View>
          </View>

          {/* 列名映射 */}
          {previewData.columnMappings && previewData.columnMappings.length > 0 && (
            <View style={{ marginBottom: '20rpx' }}>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700, marginBottom: '12rpx' }}>
                📋 列名映射（系统自动识别）
              </Text>
              {previewData.columnMappings.slice(0, 5).map((mapping, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12rpx 16rpx',
                    backgroundColor: mapping.confidence > 80 ? '#e6f7e6' : '#fff7e6',
                    borderRadius: ui.radius.sm,
                    marginBottom: '8rpx'
                  }}
                >
                  <Text style={{ fontSize: ui.type.meta, color: ui.colors.text }}>
                    {mapping.original}
                  </Text>
                  <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>→</Text>
                  <Text style={{ fontSize: ui.type.meta, color: ui.colors.text, fontWeight: 600 }}>
                    {mapping.mapped}
                  </Text>
                  <Text style={{
                    fontSize: ui.type.meta,
                    color: mapping.confidence > 80 ? '#52c41a' : '#faad14'
                  }}>
                    {mapping.confidence}%
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* 数据预览表格 */}
          <View>
            <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700, marginBottom: '12rpx' }}>
              📋 数据预览（前5行）
            </Text>
            {previewData.cleanedData.slice(0, 5).map((row, index) => (
              <View
                key={index}
                style={{
                  padding: '16rpx',
                  border: '1rpx solid #f0f0f0',
                  borderRadius: ui.radius.sm,
                  marginBottom: '12rpx',
                  backgroundColor: row.status === 'error' ? '#fff1f0' : '#ffffff'
                }}
              >
                <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8rpx' }}>
                  <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>
                    第 {row.lineNumber} 行
                  </Text>
                  <View style={{
                    ...getStatusStyle(row.status),
                    padding: '4rpx 12rpx',
                    borderRadius: '20rpx'
                  }}>
                    <Text style={{ fontSize: ui.type.meta }}>
                      {getStatusText(row.status)}
                    </Text>
                  </View>
                </View>
                <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 600, marginBottom: '8rpx' }}>
                  {row.questionId} - {row.questionType === 'single_choice' ? '单选' : row.questionType === 'multiple_choice' ? '多选' : row.questionType === 'judge' ? '判断' : row.questionType}
                </Text>
                <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.text, marginBottom: '8rpx' }} numberOfLines={2}>
                  {row.stem}
                </Text>
                {row.optionA && (
                  <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted }}>
                    A. {row.optionA} | B. {row.optionB} | C. {row.optionC} | D. {row.optionD}
                  </Text>
                )}
                <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#52c41a', marginTop: '8rpx' }}>
                  答案：{row.answer}
                </Text>
                {row.warnings.length > 0 && (
                  <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#faad14', marginTop: '8rpx' }}>
                    ⚠️ {row.warnings.join(', ')}
                  </Text>
                )}
                {row.errors.length > 0 && (
                  <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#ff4d4f', marginTop: '8rpx' }}>
                    ❌ {row.errors.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* 错误详情 */}
          {previewData.errors && previewData.errors.length > 0 && (
            <View style={{ marginTop: '20rpx' }}>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: '#ff4d4f', fontWeight: 700, marginBottom: '12rpx' }}>
                ❌ 错误详情
              </Text>
              {previewData.errors.slice(0, 5).map((error, index) => (
                <View
                  key={index}
                  style={{
                    padding: '12rpx 16rpx',
                    backgroundColor: '#fff1f0',
                    borderRadius: ui.radius.sm,
                    marginBottom: '8rpx'
                  }}
                >
                  <Text style={{ fontSize: ui.type.meta, color: '#ff4d4f' }}>
                    第 {error.lineNumber} 行：{error.message}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}