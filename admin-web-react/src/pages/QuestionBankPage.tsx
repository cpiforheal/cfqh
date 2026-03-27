import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  App,
  Button,
  Card,
  Drawer,
  Empty,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Result,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type TableProps
} from 'antd';
import { EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type {
  AuthState,
  QuestionBankImportCommitSummary,
  QuestionBankImportPreview
} from '../api';
import { api } from '../api';
import { formatDateTime, matchesKeyword, toStringArray } from '../utils';
import {
  defaultMedicalQuestion,
  defaultPastPaper,
  defaultQuestionBankPage,
  defaultQuestionImport,
  importSourceTypeLabels,
  importSourceTypeOptions,
  normalizeMedicalQuestion,
  normalizePastPaper,
  normalizeQuestionBankPage,
  normalizeQuestionDirection,
  normalizeQuestionImport,
  parseQuestionOptionsText,
  publishStatusLabels,
  publishStatusOptions,
  questionBankSectionModels,
  questionDirectionLabels,
  questionTypeLabels,
  questionTypeOptions,
  toQuestionIdsText,
  toQuestionOptionsText,
  toTagsText,
  type MedicalQuestionRecord,
  type PastPaperRecord,
  type QuestionBankPageContent,
  type QuestionBankSectionId,
  type QuestionImportRecord,
  type QuestionDirection
} from './question-bank/types';

type QuestionBankPageProps = {
  auth: AuthState;
};

type QuestionBankSectionRow = {
  id: QuestionBankSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  summary: string;
  editFields: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
};

type EditingRecordState =
  | { kind: 'medicalQuestions'; record: MedicalQuestionRecord }
  | { kind: 'pastPapers'; record: PastPaperRecord }
  | { kind: 'questionImports'; record: QuestionImportRecord };

type SectionEditorValues = {
  chip?: string;
  title: string;
  desc: string;
  buttonText?: string;
  note?: string;
  templateText?: string;
  pendingLabel?: string;
  todayLabel?: string;
  totalLabel?: string;
  eyebrow?: string;
  reasonLabel?: string;
  estimateLabel?: string;
  sourceLabel?: string;
  lastAnsweredLabel?: string;
  answerLabel?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  queueTitle?: string;
  sortHint?: string;
  queuePendingLabel?: string;
  queueTodayLabel?: string;
  masteredLabel?: string;
  emptyTitle?: string;
  emptyDesc?: string;
};

function buildSectionRows(page: QuestionBankPageContent): QuestionBankSectionRow[] {
  return questionBankSectionModels.map((section) => {
    if (section.id === 'hero') {
      const ready = Boolean(page.hero.title && page.hero.desc);
      return {
        ...section,
        summary: `${page.hero.chip || '未填写短标签'} / ${page.hero.title || '未填写标题'}`,
        editFields: '短标签、标题、说明',
        statusLabel: ready ? '顶部说明已完整' : '建议先补齐顶部说明',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'dailyQuestionCard') {
      const ready = Boolean(page.dailyQuestionCard.title && page.dailyQuestionCard.buttonText);
      return {
        ...section,
        summary: `${page.dailyQuestionCard.title || '未填写标题'} / ${page.dailyQuestionCard.note || '未填写右侧短字'}`,
        editFields: '标题、说明、按钮文案、短标签',
        statusLabel: ready ? '每日一题卡已完整' : '建议补齐每日一题卡',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'pastPapersCard') {
      const ready = Boolean(page.pastPapersCard.title && page.pastPapersCard.buttonText);
      return {
        ...section,
        summary: `${page.pastPapersCard.title || '未填写标题'} / ${page.pastPapersCard.note || '未填写右侧短字'}`,
        editFields: '标题、说明、按钮文案、短标签',
        statusLabel: ready ? '模拟题卡已完整' : '建议补齐模拟题卡',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'wrongBookCard') {
      const ready = Boolean(page.wrongBookCard.title && page.wrongBookCard.buttonText && page.wrongBookCard.queueSection.title);
      return {
        ...section,
        summary: `${page.wrongBookCard.title || '未填写标题'} / ${page.wrongBookCard.queueSection.title || '未填写队列标题'}`,
        editFields: '入口文案、统计标签、主任务卡、队列区提示',
        statusLabel: ready ? '错题本说明已完整' : '建议补齐错题本说明',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    const ready = Boolean(page.importGuide.title && page.importGuide.templateText);
    return {
      ...section,
      summary: `${page.importGuide.title || '未填写标题'} / ${page.importGuide.desc || '未填写说明'}`,
      editFields: '导入标题、导入说明、CSV 模板',
      statusLabel: ready ? '导入说明已完整' : '建议补齐导入说明',
      statusTone: ready ? 'success' : 'warning'
    };
  });
}

function buildSectionInitialValues(
  page: QuestionBankPageContent,
  sectionId: QuestionBankSectionId | null
): Partial<SectionEditorValues> {
  if (!sectionId) return {};

  if (sectionId === 'hero') {
    return {
      chip: page.hero.chip,
      title: page.hero.title,
      desc: page.hero.desc
    };
  }

  if (sectionId === 'dailyQuestionCard') {
    return {
      title: page.dailyQuestionCard.title,
      desc: page.dailyQuestionCard.desc,
      buttonText: page.dailyQuestionCard.buttonText,
      note: page.dailyQuestionCard.note
    };
  }

  if (sectionId === 'pastPapersCard') {
    return {
      title: page.pastPapersCard.title,
      desc: page.pastPapersCard.desc,
      buttonText: page.pastPapersCard.buttonText,
      note: page.pastPapersCard.note
    };
  }

  if (sectionId === 'wrongBookCard') {
    return {
      title: page.wrongBookCard.title,
      desc: page.wrongBookCard.desc,
      buttonText: page.wrongBookCard.buttonText,
      note: page.wrongBookCard.note,
      pendingLabel: page.wrongBookCard.stats.pendingLabel,
      todayLabel: page.wrongBookCard.stats.todayLabel,
      totalLabel: page.wrongBookCard.stats.totalLabel,
      eyebrow: page.wrongBookCard.taskSection.eyebrow,
      reasonLabel: page.wrongBookCard.taskSection.reasonLabel,
      estimateLabel: page.wrongBookCard.taskSection.estimateLabel,
      sourceLabel: page.wrongBookCard.taskSection.sourceLabel,
      lastAnsweredLabel: page.wrongBookCard.taskSection.lastAnsweredLabel,
      answerLabel: page.wrongBookCard.taskSection.answerLabel,
      primaryButtonText: page.wrongBookCard.taskSection.primaryButtonText,
      secondaryButtonText: page.wrongBookCard.taskSection.secondaryButtonText,
      queueTitle: page.wrongBookCard.queueSection.title,
      sortHint: page.wrongBookCard.queueSection.sortHint,
      queuePendingLabel: page.wrongBookCard.queueSection.pendingLabel,
      queueTodayLabel: page.wrongBookCard.queueSection.todayLabel,
      masteredLabel: page.wrongBookCard.queueSection.masteredLabel,
      emptyTitle: page.wrongBookCard.queueSection.emptyTitle,
      emptyDesc: page.wrongBookCard.queueSection.emptyDesc
    };
  }

  return {
    title: page.importGuide.title,
    desc: page.importGuide.desc,
    templateText: page.importGuide.templateText
  };
}

function buildNextQuestionBankPage(
  page: QuestionBankPageContent,
  sectionId: QuestionBankSectionId,
  values: SectionEditorValues
): QuestionBankPageContent {
  if (sectionId === 'hero') {
    return {
      ...page,
      hero: {
        chip: values.chip || '',
        title: values.title || '',
        desc: values.desc || ''
      }
    };
  }

  if (sectionId === 'dailyQuestionCard') {
    return {
      ...page,
      dailyQuestionCard: {
        title: values.title || '',
        desc: values.desc || '',
        buttonText: values.buttonText || '',
        note: values.note || ''
      }
    };
  }

  if (sectionId === 'pastPapersCard') {
    return {
      ...page,
      pastPapersCard: {
        title: values.title || '',
        desc: values.desc || '',
        buttonText: values.buttonText || '',
        note: values.note || ''
      }
    };
  }

  if (sectionId === 'wrongBookCard') {
    return {
      ...page,
      wrongBookCard: {
        ...page.wrongBookCard,
        title: values.title || '',
        desc: values.desc || '',
        buttonText: values.buttonText || '',
        note: values.note || '',
        stats: {
          pendingLabel: values.pendingLabel || '',
          todayLabel: values.todayLabel || '',
          totalLabel: values.totalLabel || ''
        },
        taskSection: {
          eyebrow: values.eyebrow || '',
          reasonLabel: values.reasonLabel || '',
          estimateLabel: values.estimateLabel || '',
          sourceLabel: values.sourceLabel || '',
          lastAnsweredLabel: values.lastAnsweredLabel || '',
          answerLabel: values.answerLabel || '',
          primaryButtonText: values.primaryButtonText || '',
          secondaryButtonText: values.secondaryButtonText || ''
        },
        queueSection: {
          title: values.queueTitle || '',
          sortHint: values.sortHint || '',
          pendingLabel: values.queuePendingLabel || '',
          todayLabel: values.queueTodayLabel || '',
          masteredLabel: values.masteredLabel || '',
          emptyTitle: values.emptyTitle || '',
          emptyDesc: values.emptyDesc || ''
        }
      }
    };
  }

  return {
    ...page,
    importGuide: {
      title: values.title || '',
      desc: values.desc || '',
      templateText: values.templateText || ''
    }
  };
}

function sortBySort<T extends { sort?: number }>(items: T[]) {
  return [...items].sort((left, right) => Number(left.sort || 0) - Number(right.sort || 0));
}

function QuestionBankSectionEditorDrawer({
  open,
  sectionId,
  page,
  canWrite,
  saving,
  onClose,
  onSave
}: {
  open: boolean;
  sectionId: QuestionBankSectionId | null;
  page: QuestionBankPageContent;
  canWrite: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (nextPage: QuestionBankPageContent) => Promise<void>;
}) {
  const [form] = Form.useForm<SectionEditorValues>();
  const sectionModel = questionBankSectionModels.find((item) => item.id === sectionId) || null;

  useEffect(() => {
    if (!sectionId) {
      form.resetFields();
      return;
    }
    form.setFieldsValue(buildSectionInitialValues(page, sectionId));
  }, [form, page, sectionId]);

  async function handleSubmit() {
    if (!sectionId) return;
    const values = await form.validateFields();
    await onSave(buildNextQuestionBankPage(page, sectionId, values));
  }

  return (
    <Drawer
      open={open}
      width={560}
      title={sectionModel ? `编辑 ${sectionModel.title}` : '编辑题库区块'}
      onClose={onClose}
      destroyOnClose
      footer={
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" loading={saving} onClick={() => void handleSubmit()} disabled={!canWrite}>
            保存这一块
          </Button>
        </Space>
      }
    >
      {sectionModel ? (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message={`你正在修改：${sectionModel.step} ${sectionModel.title}`}
            description={`前台位置：${sectionModel.location}。这里先让老师改文案和标签，复杂题目内容仍在下面三张数据表里维护。`}
          />
          <Form form={form} layout="vertical" disabled={!canWrite}>
            {sectionId === 'hero' ? (
              <>
                <Form.Item label="顶部短标签" name="chip" rules={[{ required: true, message: '请填写顶部短标签' }]}>
                  <Input placeholder="例如：医护轻题库" />
                </Form.Item>
                <Form.Item label="顶部标题" name="title" rules={[{ required: true, message: '请填写顶部标题' }]}>
                  <Input placeholder="例如：题库入口配置" />
                </Form.Item>
                <Form.Item label="顶部说明" name="desc" rules={[{ required: true, message: '请填写顶部说明' }]}>
                  <Input.TextArea rows={4} placeholder="告诉老师这个页面集中维护什么内容" />
                </Form.Item>
              </>
            ) : null}

            {sectionId === 'dailyQuestionCard' || sectionId === 'pastPapersCard' ? (
              <>
                <Form.Item label="卡片标题" name="title" rules={[{ required: true, message: '请填写卡片标题' }]}>
                  <Input placeholder="例如：每日一题" />
                </Form.Item>
                <Form.Item label="卡片说明" name="desc" rules={[{ required: true, message: '请填写卡片说明' }]}>
                  <Input.TextArea rows={4} placeholder="告诉学生这一块适合做什么" />
                </Form.Item>
                <Form.Item label="按钮上显示什么字" name="buttonText" rules={[{ required: true, message: '请填写按钮文案' }]}>
                  <Input placeholder="例如：进入每日一题" />
                </Form.Item>
                <Form.Item label="右上角小提示" name="note">
                  <Input placeholder="例如：固定题源 / 支持 CSV 热更新" />
                </Form.Item>
              </>
            ) : null}

            {sectionId === 'wrongBookCard' ? (
              <>
                <Alert
                  type="warning"
                  showIcon
                  message="这块会同时影响题库入口卡和错题本页面里的老师语言说明。"
                />
                <Form.Item label="入口卡标题" name="title" rules={[{ required: true, message: '请填写入口卡标题' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="入口卡说明" name="desc" rules={[{ required: true, message: '请填写入口卡说明' }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item label="按钮上显示什么字" name="buttonText" rules={[{ required: true, message: '请填写按钮文案' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="入口卡右上角短字" name="note">
                  <Input />
                </Form.Item>

                <Typography.Title level={5}>顶部三个统计标签</Typography.Title>
                <Form.Item label="待复习标签" name="pendingLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="今日新增标签" name="todayLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="累计错题标签" name="totalLabel">
                  <Input />
                </Form.Item>

                <Typography.Title level={5}>主任务卡文案</Typography.Title>
                <Form.Item label="主任务卡小眉题" name="eyebrow">
                  <Input />
                </Form.Item>
                <Form.Item label="为什么先做" name="reasonLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="预计耗时" name="estimateLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="题目来源" name="sourceLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="上次作答" name="lastAnsweredLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="我的答案" name="answerLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="主按钮文案" name="primaryButtonText">
                  <Input />
                </Form.Item>
                <Form.Item label="次按钮文案" name="secondaryButtonText">
                  <Input />
                </Form.Item>

                <Typography.Title level={5}>待复习队列文案</Typography.Title>
                <Form.Item label="队列标题" name="queueTitle">
                  <Input />
                </Form.Item>
                <Form.Item label="排序提示" name="sortHint">
                  <Input />
                </Form.Item>
                <Form.Item label="队列里的待复习标签" name="queuePendingLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="队列里的今日新增标签" name="queueTodayLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="队列里的已掌握标签" name="masteredLabel">
                  <Input />
                </Form.Item>
                <Form.Item label="清空状态标题" name="emptyTitle">
                  <Input />
                </Form.Item>
                <Form.Item label="清空状态说明" name="emptyDesc">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </>
            ) : null}

            {sectionId === 'importGuide' ? (
              <>
                <Form.Item label="导入区标题" name="title" rules={[{ required: true, message: '请填写导入区标题' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="导入区说明" name="desc" rules={[{ required: true, message: '请填写导入区说明' }]}>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  label="示例 CSV 模板"
                  name="templateText"
                  rules={[{ required: true, message: '请填写示例 CSV 模板' }]}
                >
                  <Input.TextArea rows={8} />
                </Form.Item>
              </>
            ) : null}
          </Form>
        </Space>
      ) : null}
    </Drawer>
  );
}

function QuestionBankRecordEditorDrawer({
  open,
  state,
  canWrite,
  saving,
  onClose,
  onSubmit
}: {
  open: boolean;
  state: EditingRecordState | null;
  canWrite: boolean;
  saving: boolean;
  onClose: () => void;
  onSubmit: (nextState: EditingRecordState) => Promise<void>;
}) {
  const [form] = Form.useForm<Record<string, unknown>>();

  useEffect(() => {
    if (!state) {
      form.resetFields();
      return;
    }

    if (state.kind === 'medicalQuestions') {
      form.setFieldsValue({
        ...state.record,
        optionsText: toQuestionOptionsText(state.record.options),
        tagsText: toTagsText(state.record.tags)
      });
      return;
    }

    if (state.kind === 'pastPapers') {
      form.setFieldsValue({
        ...state.record,
        questionIdsText: toQuestionIdsText(state.record.questionIds)
      });
      return;
    }

    form.setFieldsValue({ ...state.record });
  }, [form, state]);

  async function handleSubmit() {
    if (!state) return;
    const values = await form.validateFields();

    if (state.kind === 'medicalQuestions') {
      await onSubmit({
        kind: state.kind,
        record: {
          ...state.record,
          questionId: String(values.questionId || '').trim(),
          direction: String(values.direction || 'medical') === 'math' ? 'math' : 'medical',
          questionType: String(values.questionType || 'single_choice') as MedicalQuestionRecord['questionType'],
          stem: String(values.stem || '').trim(),
          options: parseQuestionOptionsText(values.optionsText),
          answer: String(values.answer || '').trim(),
          explanation: String(values.explanation || '').trim(),
          year: Number(values.year || new Date().getFullYear()),
          paperId: String(values.paperId || '').trim(),
          tags: toStringArray(values.tagsText),
          sort: Number(values.sort || 100),
          status: String(values.status || 'draft') === 'published' ? 'published' : 'draft'
        }
      });
      return;
    }

    if (state.kind === 'pastPapers') {
      await onSubmit({
        kind: state.kind,
        record: {
          ...state.record,
          paperId: String(values.paperId || '').trim(),
          title: String(values.title || '').trim(),
          direction: String(values.direction || 'medical') === 'math' ? 'math' : 'medical',
          year: Number(values.year || new Date().getFullYear()),
          description: String(values.description || '').trim(),
          questionIds: toStringArray(values.questionIdsText),
          sort: Number(values.sort || 100),
          status: String(values.status || 'draft') === 'published' ? 'published' : 'draft'
        }
      });
      return;
    }

    await onSubmit({
      kind: state.kind,
      record: {
        ...state.record,
        title: String(values.title || '').trim(),
        direction: String(values.direction || 'medical') === 'math' ? 'math' : 'medical',
        sourceType: String(values.sourceType || 'paper') as QuestionImportRecord['sourceType'],
        rawText: String(values.rawText || '').trim(),
        note: String(values.note || '').trim(),
        sort: Number(values.sort || 100),
        status: String(values.status || 'draft') === 'published' ? 'published' : 'draft'
      }
    });
  }

  const titleMap = {
    medicalQuestions: state?.record._id ? '编辑题目' : '新建题目',
    pastPapers: state?.record._id ? '编辑模拟卷' : '新建模拟卷',
    questionImports: state?.record._id ? '编辑导入记录' : '新建导入记录'
  };

  return (
    <Drawer
      open={open}
      width={600}
      title={state ? titleMap[state.kind] : '编辑记录'}
      onClose={onClose}
      destroyOnClose
      footer={
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" loading={saving} onClick={() => void handleSubmit()} disabled={!canWrite}>
            保存记录
          </Button>
        </Space>
      }
    >
      {state ? (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message={
              state.kind === 'medicalQuestions'
                ? '题目会直接进入当前题目表和小程序题源。'
                : state.kind === 'pastPapers'
                  ? '模拟卷会按试卷维度承接题目集合。'
                  : '导入记录主要给老师留痕，方便回看这次导入做了什么。'
            }
          />
          <Form form={form} layout="vertical" disabled={!canWrite}>
            {state.kind === 'medicalQuestions' ? (
              <>
                <Form.Item label="题目编号" name="questionId" rules={[{ required: true, message: '请填写题目编号' }]}>
                  <Input placeholder="例如：medical_2025_001" />
                </Form.Item>
                <Form.Item label="所属学科" name="direction" rules={[{ required: true, message: '请选择所属学科' }]}>
                  <Select
                    options={[
                      { label: '医护', value: 'medical' },
                      { label: '高数', value: 'math' }
                    ]}
                  />
                </Form.Item>
                <Form.Item label="题型" name="questionType" rules={[{ required: true, message: '请选择题型' }]}>
                  <Select options={questionTypeOptions} />
                </Form.Item>
                <Form.Item label="题干" name="stem" rules={[{ required: true, message: '请填写题干' }]}>
                  <Input.TextArea rows={5} />
                </Form.Item>
                <Form.Item
                  label="选项列表"
                  name="optionsText"
                  rules={[{ required: true, message: '请填写选项列表' }]}
                  extra="一行一个选项，例如：A. 选项一"
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item label="正确答案" name="answer" rules={[{ required: true, message: '请填写正确答案' }]}>
                  <Input placeholder="例如：A 或 A,C" />
                </Form.Item>
                <Form.Item label="解析说明" name="explanation">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Space size="middle" style={{ width: '100%' }}>
                  <Form.Item label="年份" name="year" style={{ flex: 1 }}>
                    <InputNumber min={2000} max={2099} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="所属试卷编号" name="paperId" style={{ flex: 1 }}>
                    <Input placeholder="例如：medical_paper_2025" />
                  </Form.Item>
                </Space>
                <Form.Item label="标签" name="tagsText" extra="可用换行、逗号或中文逗号分隔">
                  <Input.TextArea rows={3} />
                </Form.Item>
                <Space size="middle" style={{ width: '100%' }}>
                  <Form.Item label="排序" name="sort" style={{ flex: 1 }}>
                    <InputNumber min={0} step={10} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="状态" name="status" style={{ flex: 1 }}>
                    <Select options={publishStatusOptions} />
                  </Form.Item>
                </Space>
              </>
            ) : null}

            {state.kind === 'pastPapers' ? (
              <>
                <Form.Item label="试卷编号" name="paperId" rules={[{ required: true, message: '请填写试卷编号' }]}>
                  <Input placeholder="例如：medical_paper_2025" />
                </Form.Item>
                <Form.Item label="试卷标题" name="title" rules={[{ required: true, message: '请填写试卷标题' }]}>
                  <Input placeholder="例如：2025 医护综合模拟卷" />
                </Form.Item>
                <Space size="middle" style={{ width: '100%' }}>
                  <Form.Item label="所属学科" name="direction" style={{ flex: 1 }}>
                    <Select
                      options={[
                        { label: '医护', value: 'medical' },
                        { label: '高数', value: 'math' }
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="年份" name="year" style={{ flex: 1 }}>
                    <InputNumber min={2000} max={2099} style={{ width: '100%' }} />
                  </Form.Item>
                </Space>
                <Form.Item label="试卷说明" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="包含哪些题目编号" name="questionIdsText" extra="一行一个题目编号">
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Space size="middle" style={{ width: '100%' }}>
                  <Form.Item label="排序" name="sort" style={{ flex: 1 }}>
                    <InputNumber min={0} step={10} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="状态" name="status" style={{ flex: 1 }}>
                    <Select options={publishStatusOptions} />
                  </Form.Item>
                </Space>
              </>
            ) : null}

            {state.kind === 'questionImports' ? (
              <>
                <Form.Item label="这次导入的名称" name="title" rules={[{ required: true, message: '请填写导入名称' }]}>
                  <Input placeholder="例如：2025 医护模拟卷第一批" />
                </Form.Item>
                <Space size="middle" style={{ width: '100%' }}>
                  <Form.Item label="所属学科" name="direction" style={{ flex: 1 }}>
                    <Select
                      options={[
                        { label: '医护', value: 'medical' },
                        { label: '高数', value: 'math' }
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="来源类型" name="sourceType" style={{ flex: 1 }}>
                    <Select options={importSourceTypeOptions} />
                  </Form.Item>
                </Space>
                <Form.Item label="原始内容或记录摘要" name="rawText">
                  <Input.TextArea rows={8} />
                </Form.Item>
                <Form.Item label="老师备注" name="note">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Space size="middle" style={{ width: '100%' }}>
                  <Form.Item label="排序" name="sort" style={{ flex: 1 }}>
                    <InputNumber min={0} step={10} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="状态" name="status" style={{ flex: 1 }}>
                    <Select options={publishStatusOptions} />
                  </Form.Item>
                </Space>
              </>
            ) : null}
          </Form>
        </Space>
      ) : null}
    </Drawer>
  );
}

function QuestionBankImportDrawer({
  open,
  direction,
  canWrite,
  canPublish,
  onClose,
  onPreview,
  onCommit
}: {
  open: boolean;
  direction: QuestionDirection;
  canWrite: boolean;
  canPublish: boolean;
  onClose: () => void;
  onPreview: (payload: { fileName?: string; csvText: string; direction: string }) => Promise<QuestionBankImportPreview>;
  onCommit: (payload: { fileName?: string; csvText: string; direction: string }) => Promise<QuestionBankImportCommitSummary>;
}) {
  const { message } = App.useApp();
  const [form] = Form.useForm<{ fileName?: string; csvText: string; direction: string }>();
  const [preview, setPreview] = useState<QuestionBankImportPreview | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [committing, setCommitting] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      direction,
      fileName: `question-bank-${new Date().toISOString().slice(0, 10)}.csv`,
      csvText: ''
    });
    if (open) {
      setPreview(null);
    }
  }, [direction, form, open]);

  async function handlePreview() {
    const values = await form.validateFields();
    setPreviewing(true);
    try {
      const result = await onPreview(values);
      setPreview(result);
      if (result.invalidCount) {
        message.warning(`预校验完成，有 ${result.invalidCount} 行需要先修正`);
      } else {
        message.success('预校验通过，可以继续导入');
      }
    } finally {
      setPreviewing(false);
    }
  }

  async function handleCommit() {
    const values = await form.validateFields();
    setCommitting(true);
    try {
      const summary = await onCommit(values);
      message.success(`导入完成：新增 ${summary.createdCount} 题，更新 ${summary.updatedCount} 题`);
      onClose();
      setPreview(null);
    } finally {
      setCommitting(false);
    }
  }

  const previewColumns: TableProps<QuestionBankImportPreview['previewRows'][number]>['columns'] = [
    { title: 'CSV 行', dataIndex: 'lineNumber', width: 80 },
    { title: '题目编号', dataIndex: 'questionId', width: 180 },
    { title: '试卷编号', dataIndex: 'paperId', width: 180 },
    { title: '题型', dataIndex: 'questionType', width: 120 },
    { title: '题干摘要', dataIndex: 'stem', ellipsis: true },
    { title: '选项数', dataIndex: 'optionsCount', width: 90 },
    { title: '年份', dataIndex: 'year', width: 90 },
    { title: '状态', dataIndex: 'status', width: 100 }
  ];

  return (
    <Drawer
      open={open}
      width={760}
      title="CSV 导入题库"
      onClose={onClose}
      destroyOnClose
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography.Text type="secondary">先预校验，再正式导入。</Typography.Text>
          <Space>
            <Button onClick={onClose}>关闭</Button>
            <Button onClick={() => void handlePreview()} loading={previewing} disabled={!canWrite}>
              先看预校验结果
            </Button>
            <Button type="primary" onClick={() => void handleCommit()} loading={committing} disabled={!canPublish}>
              正式导入
            </Button>
          </Space>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Alert
          type="info"
          showIcon
          message="推荐先把 CSV 粘贴进来做一次预校验，再正式导入。"
          description="导入成功后，会自动同步题目、模拟卷和导入记录三张表。"
        />
        <Form form={form} layout="vertical" disabled={!canWrite}>
          <Form.Item label="这次导入的文件名" name="fileName">
            <Input placeholder="例如：2025-医护-模拟卷.csv" />
          </Form.Item>
          <Form.Item label="所属学科" name="direction" rules={[{ required: true, message: '请选择所属学科' }]}>
            <Select
              options={[
                { label: '医护', value: 'medical' },
                { label: '高数', value: 'math' }
              ]}
            />
          </Form.Item>
          <Form.Item label="CSV 内容" name="csvText" rules={[{ required: true, message: '请先粘贴 CSV 内容' }]}>
            <Input.TextArea rows={12} placeholder="请粘贴完整 CSV 内容" />
          </Form.Item>
        </Form>

        {preview ? (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              type={preview.invalidCount ? 'warning' : 'success'}
              showIcon
              message={`预校验结果：共 ${preview.totalRows} 行，成功 ${preview.validCount} 行，异常 ${preview.invalidCount} 行`}
              description={`当前按 ${preview.direction === 'math' ? '高数' : '医护'} 学科校验，来源格式：${preview.sourceFormat}`}
            />

            <Card className="home-workspace-card" title="前 6 行预览">
              <Table
                rowKey={(record) => `${record.lineNumber}-${record.questionId}`}
                size="small"
                pagination={false}
                columns={previewColumns}
                dataSource={preview.previewRows}
                scroll={{ x: 980 }}
              />
            </Card>

            <Card className="home-workspace-card" title="表头要求">
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                {preview.expectedHeaders.join(' , ')}
              </Typography.Paragraph>
            </Card>

            <Card className="home-workspace-card" title="异常提示">
              {preview.errors.length ? (
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  {preview.errors.map((item) => (
                    <Alert key={`${item.lineNumber}-${item.message}`} type="error" showIcon message={`第 ${item.lineNumber} 行：${item.message}`} />
                  ))}
                </Space>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前没有异常行，可以直接导入" />
              )}
            </Card>
          </Space>
        ) : null}
      </Space>
    </Drawer>
  );
}

export function QuestionBankPage({ auth }: QuestionBankPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingSection, setEditingSection] = useState<QuestionBankSectionId | null>(null);
  const [editingRecord, setEditingRecord] = useState<EditingRecordState | null>(null);
  const [importDrawerOpen, setImportDrawerOpen] = useState(false);
  const [questionKeyword, setQuestionKeyword] = useState('');
  const [paperKeyword, setPaperKeyword] = useState('');
  const [importKeyword, setImportKeyword] = useState('');
  const [questionStatusFilter, setQuestionStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [paperStatusFilter, setPaperStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [importStatusFilter, setImportStatusFilter] = useState<'all' | 'draft' | 'published'>('all');

  const direction = normalizeQuestionDirection(searchParams.get('subject'));

  const pageQuery = useQuery({
    queryKey: ['page', 'questionBank'],
    queryFn: () => api.getPage('questionBank')
  });

  const questionsQuery = useQuery({
    queryKey: ['collection', 'medicalQuestions'],
    queryFn: () => api.listCollection('medicalQuestions')
  });

  const papersQuery = useQuery({
    queryKey: ['collection', 'pastPapers'],
    queryFn: () => api.listCollection('pastPapers')
  });

  const importsQuery = useQuery({
    queryKey: ['collection', 'questionImports'],
    queryFn: () => api.listCollection('questionImports')
  });

  const updatePageMutation = useMutation({
    mutationFn: (payload: QuestionBankPageContent) => api.updatePage('questionBank', payload as unknown as Record<string, unknown>),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'questionBank'] });
    }
  });

  const createQuestionMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('medicalQuestions', payload)
  });
  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('medicalQuestions', id, payload)
  });
  const deleteQuestionMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('medicalQuestions', id)
  });

  const createPaperMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('pastPapers', payload)
  });
  const updatePaperMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => api.updateCollectionItem('pastPapers', id, payload)
  });
  const deletePaperMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('pastPapers', id)
  });

  const createImportMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('questionImports', payload)
  });
  const updateImportMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('questionImports', id, payload)
  });
  const deleteImportMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('questionImports', id)
  });

  const page = useMemo(() => normalizeQuestionBankPage(pageQuery.data || defaultQuestionBankPage), [pageQuery.data]);
  const sectionRows = useMemo(() => buildSectionRows(page), [page]);
  const readySectionCount = useMemo(
    () => sectionRows.filter((item) => item.statusTone === 'success').length,
    [sectionRows]
  );

  const questionRows = useMemo(
    () => sortBySort((questionsQuery.data || []).map((item) => normalizeMedicalQuestion(item))),
    [questionsQuery.data]
  );
  const paperRows = useMemo(
    () => sortBySort((papersQuery.data || []).map((item) => normalizePastPaper(item))),
    [papersQuery.data]
  );
  const importRows = useMemo(
    () => sortBySort((importsQuery.data || []).map((item) => normalizeQuestionImport(item))).reverse(),
    [importsQuery.data]
  );

  const filteredQuestions = useMemo(
    () =>
      questionRows.filter((item) => {
        if (item.direction !== direction) return false;
        if (questionStatusFilter !== 'all' && item.status !== questionStatusFilter) return false;
        return matchesKeyword(
          {
            questionId: item.questionId,
            stem: item.stem,
            paperId: item.paperId,
            answer: item.answer
          },
          questionKeyword,
          ['questionId', 'stem', 'paperId', 'answer']
        );
      }),
    [direction, questionKeyword, questionRows, questionStatusFilter]
  );

  const filteredPapers = useMemo(
    () =>
      paperRows.filter((item) => {
        if (item.direction !== direction) return false;
        if (paperStatusFilter !== 'all' && item.status !== paperStatusFilter) return false;
        return matchesKeyword(
          {
            paperId: item.paperId,
            title: item.title,
            description: item.description
          },
          paperKeyword,
          ['paperId', 'title', 'description']
        );
      }),
    [direction, paperKeyword, paperRows, paperStatusFilter]
  );

  const filteredImports = useMemo(
    () =>
      importRows.filter((item) => {
        if (item.direction !== direction) return false;
        if (importStatusFilter !== 'all' && item.status !== importStatusFilter) return false;
        return matchesKeyword(
          {
            title: item.title,
            rawText: item.rawText,
            note: item.note
          },
          importKeyword,
          ['title', 'rawText', 'note']
        );
      }),
    [direction, importKeyword, importRows, importStatusFilter]
  );

  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取题库配置。" />;
  }

  if (pageQuery.isError || questionsQuery.isError || papersQuery.isError || importsQuery.isError) {
    return <Result status="error" title="题库数据读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSavePage(nextPage: QuestionBankPageContent) {
    await updatePageMutation.mutateAsync(nextPage);
    message.success('题库页文案已保存');
    setEditingSection(null);
  }

  async function handleSaveRecord(nextState: EditingRecordState) {
    if (nextState.kind === 'medicalQuestions') {
      if (nextState.record._id) {
        await updateQuestionMutation.mutateAsync({
          id: nextState.record._id,
          payload: nextState.record as unknown as Record<string, unknown>
        });
        message.success('题目已保存');
      } else {
        await createQuestionMutation.mutateAsync(nextState.record as unknown as Record<string, unknown>);
        message.success('题目已创建');
      }
      await queryClient.invalidateQueries({ queryKey: ['collection', 'medicalQuestions'] });
    }

    if (nextState.kind === 'pastPapers') {
      if (nextState.record._id) {
        await updatePaperMutation.mutateAsync({
          id: nextState.record._id,
          payload: nextState.record as unknown as Record<string, unknown>
        });
        message.success('模拟卷已保存');
      } else {
        await createPaperMutation.mutateAsync(nextState.record as unknown as Record<string, unknown>);
        message.success('模拟卷已创建');
      }
      await queryClient.invalidateQueries({ queryKey: ['collection', 'pastPapers'] });
    }

    if (nextState.kind === 'questionImports') {
      if (nextState.record._id) {
        await updateImportMutation.mutateAsync({
          id: nextState.record._id,
          payload: nextState.record as unknown as Record<string, unknown>
        });
        message.success('导入记录已保存');
      } else {
        await createImportMutation.mutateAsync(nextState.record as unknown as Record<string, unknown>);
        message.success('导入记录已创建');
      }
      await queryClient.invalidateQueries({ queryKey: ['collection', 'questionImports'] });
    }

    setEditingRecord(null);
  }

  async function handleDelete(kind: EditingRecordState['kind'], id?: string) {
    if (!id) return;

    if (kind === 'medicalQuestions') {
      await deleteQuestionMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ['collection', 'medicalQuestions'] });
      message.success('题目已删除');
      return;
    }

    if (kind === 'pastPapers') {
      await deletePaperMutation.mutateAsync(id);
      await queryClient.invalidateQueries({ queryKey: ['collection', 'pastPapers'] });
      message.success('模拟卷已删除');
      return;
    }

    await deleteImportMutation.mutateAsync(id);
    await queryClient.invalidateQueries({ queryKey: ['collection', 'questionImports'] });
    message.success('导入记录已删除');
  }

  const sectionColumns: TableProps<QuestionBankSectionRow>['columns'] = [
    { title: '前台顺序', dataIndex: 'step', width: 110 },
    {
      title: '前台区块',
      dataIndex: 'title',
      width: 280,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title}</Typography.Text>
          <Typography.Text type="secondary">{record.desc}</Typography.Text>
        </Space>
      )
    },
    { title: '前台位置', dataIndex: 'location', width: 180 },
    { title: '老师当前会看到', dataIndex: 'summary', ellipsis: true },
    { title: '点开后会改什么', dataIndex: 'editFields', width: 260 },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      width: 160,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size={12}>
          <a onClick={() => setEditingSection(record.id)}>编辑</a>
          {record.id === 'importGuide' ? <a onClick={() => setImportDrawerOpen(true)}>CSV 导入</a> : null}
        </Space>
      )
    }
  ];

  const questionColumns: TableProps<MedicalQuestionRecord>['columns'] = [
    { title: '排序', dataIndex: 'sort', width: 86 },
    {
      title: '题目摘要',
      dataIndex: 'stem',
      width: 360,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong ellipsis>{record.stem || '未填写题干'}</Typography.Text>
          <Typography.Text type="secondary">{record.questionId || '未填写题目编号'}</Typography.Text>
        </Space>
      )
    },
    {
      title: '题型 / 答案',
      dataIndex: 'questionType',
      width: 160,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text>{questionTypeLabels[record.questionType]}</Typography.Text>
          <Typography.Text type="secondary">{record.answer || '未填写答案'}</Typography.Text>
        </Space>
      )
    },
    { title: '试卷编号', dataIndex: 'paperId', width: 180 },
    { title: '年份', dataIndex: 'year', width: 90 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 110,
      render: (_, record) => <Tag color={record.status === 'published' ? 'success' : 'default'}>{publishStatusLabels[record.status]}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space size={12}>
          <a onClick={() => setEditingRecord({ kind: 'medicalQuestions', record })}>编辑</a>
          <Popconfirm
            title="确定删除这道题目吗？"
            okButtonProps={{ danger: true }}
            disabled={!auth.permissions.canWrite}
            onConfirm={() => void handleDelete('medicalQuestions', record._id)}
          >
            <a style={{ color: '#cf1322' }}>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const paperColumns: TableProps<PastPaperRecord>['columns'] = [
    { title: '排序', dataIndex: 'sort', width: 86 },
    {
      title: '模拟卷',
      dataIndex: 'title',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title || '未填写试卷标题'}</Typography.Text>
          <Typography.Text type="secondary">{record.paperId || '未填写试卷编号'}</Typography.Text>
        </Space>
      )
    },
    { title: '年份', dataIndex: 'year', width: 90 },
    {
      title: '题目数',
      dataIndex: 'questionIds',
      width: 110,
      render: (_, record) => record.questionIds.length
    },
    {
      title: '说明',
      dataIndex: 'description',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 110,
      render: (_, record) => <Tag color={record.status === 'published' ? 'success' : 'default'}>{publishStatusLabels[record.status]}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space size={12}>
          <a onClick={() => setEditingRecord({ kind: 'pastPapers', record })}>编辑</a>
          <Popconfirm
            title="确定删除这套模拟卷吗？"
            okButtonProps={{ danger: true }}
            disabled={!auth.permissions.canWrite}
            onConfirm={() => void handleDelete('pastPapers', record._id)}
          >
            <a style={{ color: '#cf1322' }}>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const importColumns: TableProps<QuestionImportRecord>['columns'] = [
    {
      title: '导入记录',
      dataIndex: 'title',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title || '未填写导入记录标题'}</Typography.Text>
          <Typography.Text type="secondary">{importSourceTypeLabels[record.sourceType]}</Typography.Text>
        </Space>
      )
    },
    {
      title: '老师备注',
      dataIndex: 'note',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 110,
      render: (_, record) => <Tag color={record.status === 'published' ? 'success' : 'default'}>{publishStatusLabels[record.status]}</Tag>
    },
    {
      title: '最近更新',
      dataIndex: '_updatedAt',
      width: 160,
      render: (_, record) => formatDateTime(record._updatedAt || record._meta?.updatedAt)
    },
    {
      title: '操作',
      key: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space size={12}>
          <a onClick={() => setEditingRecord({ kind: 'questionImports', record })}>编辑</a>
          <Popconfirm
            title="确定删除这条导入记录吗？"
            okButtonProps={{ danger: true }}
            disabled={!auth.permissions.canWrite}
            onConfirm={() => void handleDelete('questionImports', record._id)}
          >
            <a style={{ color: '#cf1322' }}>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const recordSaving =
    createQuestionMutation.isPending ||
    updateQuestionMutation.isPending ||
    createPaperMutation.isPending ||
    updatePaperMutation.isPending ||
    createImportMutation.isPending ||
    updateImportMutation.isPending;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">题库主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              先改入口文案，再维护题目、模拟卷和导入记录
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              主表继续只保留前台顺序和老师摘要，细字段全部放进二级抽屉；下面三张数据表负责真实题库逻辑。
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle" style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space wrap>
              <Segmented
                value={direction}
                options={[
                  { label: '医护题库', value: 'medical' },
                  { label: '高数题库', value: 'math' }
                ]}
                onChange={(value) => {
                  setSearchParams((current) => {
                    const next = new URLSearchParams(current);
                    next.set('subject', String(value));
                    return next;
                  });
                }}
              />
              <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
                {auth.permissions.canWrite ? '可直接保存' : '当前只读'}
              </Tag>
              <Tag>{`最近更新 ${lastUpdated}`}</Tag>
            </Space>
            <Space wrap>
              <Button type="primary" icon={<UploadOutlined />} onClick={() => setImportDrawerOpen(true)} disabled={!auth.permissions.canWrite}>
                CSV 导入题目
              </Button>
            </Space>
          </Space>

          <div className="home-workspace-compact-bar">
            <Typography.Text type="secondary">{`${questionDirectionLabels[direction]}题目 ${filteredQuestions.length} 道`}</Typography.Text>
            <Typography.Text type="secondary">{`模拟卷 ${filteredPapers.length} 套`}</Typography.Text>
            <Typography.Text type="secondary">{`导入记录 ${filteredImports.length} 条`}</Typography.Text>
            <Typography.Text type="secondary">{`入口区块已成型 ${readySectionCount}/${sectionRows.length}`}</Typography.Text>
          </div>

          <div className="workspace-guide-grid">
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">第一次进入先做什么</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                先看第 3 行模拟题卡，再看下面试卷表
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                这样老师会先理解前台入口写了什么，再继续补真正展示给学生的模拟卷数据。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">1:1 映射怎么理解</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                上面改入口，下方改真实题库内容
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                老师先顺着入口区块表理解前台顺序，再在题目表、模拟卷表和导入表里维护真实数据。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">保存后会影响哪里</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                当前只影响 {questionDirectionLabels[direction]} 题库
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                你现在看到的是 {questionDirectionLabels[direction]} 视角，新增题目、模拟卷和导入记录都会落到当前学科。
              </Typography.Paragraph>
            </div>
          </div>
        </Space>
      </Card>

      {pageQuery.isLoading || questionsQuery.isLoading || papersQuery.isLoading || importsQuery.isLoading ? (
        <div className="center-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Card
            className="home-workspace-card"
            title="题库入口区块总表"
            extra={
              <Button type="primary" icon={<EditOutlined />} disabled={!auth.permissions.canWrite} onClick={() => setEditingSection('hero')}>
                从第一行开始编辑
              </Button>
            }
          >
            <Table
              rowKey="id"
              columns={sectionColumns}
              dataSource={sectionRows}
              pagination={false}
              scroll={{ x: 1180 }}
            />
          </Card>

          <Card
            className="home-workspace-card"
            title={`${questionDirectionLabels[direction]}题目表`}
            extra={
              <Space wrap>
                <Input
                  allowClear
                  value={questionKeyword}
                  onChange={(event) => setQuestionKeyword(event.target.value.trim().toLowerCase())}
                  placeholder="搜题目编号 / 题干 / 试卷"
                  style={{ width: 220 }}
                />
                <Select
                  value={questionStatusFilter}
                  onChange={(value) => setQuestionStatusFilter(value)}
                  style={{ width: 120 }}
                  options={[
                    { label: '全部状态', value: 'all' },
                    ...publishStatusOptions
                  ]}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  disabled={!auth.permissions.canWrite}
                  onClick={() => setEditingRecord({ kind: 'medicalQuestions', record: { ...defaultMedicalQuestion, direction } })}
                >
                  新建题目
                </Button>
              </Space>
            }
          >
            <Table
              rowKey={(record) => record._id || record.questionId}
              columns={questionColumns}
              dataSource={filteredQuestions}
              pagination={{ pageSize: 8, showSizeChanger: false }}
              scroll={{ x: 1240 }}
            />
          </Card>

          <Card
            className="home-workspace-card"
            title={`${questionDirectionLabels[direction]}模拟卷表`}
            extra={
              <Space wrap>
                <Input
                  allowClear
                  value={paperKeyword}
                  onChange={(event) => setPaperKeyword(event.target.value.trim().toLowerCase())}
                  placeholder="搜试卷编号 / 标题"
                  style={{ width: 220 }}
                />
                <Select
                  value={paperStatusFilter}
                  onChange={(value) => setPaperStatusFilter(value)}
                  style={{ width: 120 }}
                  options={[
                    { label: '全部状态', value: 'all' },
                    ...publishStatusOptions
                  ]}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  disabled={!auth.permissions.canWrite}
                  onClick={() => setEditingRecord({ kind: 'pastPapers', record: { ...defaultPastPaper, direction } })}
                >
                  新建模拟卷
                </Button>
              </Space>
            }
          >
            <Table
              rowKey={(record) => record._id || record.paperId}
              columns={paperColumns}
              dataSource={filteredPapers}
              pagination={{ pageSize: 6, showSizeChanger: false }}
              scroll={{ x: 1140 }}
            />
          </Card>

          <Card
            className="home-workspace-card"
            title={`${questionDirectionLabels[direction]}导入记录`}
            extra={
              <Space wrap>
                <Input
                  allowClear
                  value={importKeyword}
                  onChange={(event) => setImportKeyword(event.target.value.trim().toLowerCase())}
                  placeholder="搜导入名称 / 备注"
                  style={{ width: 220 }}
                />
                <Select
                  value={importStatusFilter}
                  onChange={(value) => setImportStatusFilter(value)}
                  style={{ width: 120 }}
                  options={[
                    { label: '全部状态', value: 'all' },
                    ...publishStatusOptions
                  ]}
                />
                <Button type="primary" icon={<UploadOutlined />} disabled={!auth.permissions.canWrite} onClick={() => setImportDrawerOpen(true)}>
                  去做 CSV 导入
                </Button>
                <Button
                  disabled={!auth.permissions.canWrite}
                  onClick={() => setEditingRecord({ kind: 'questionImports', record: { ...defaultQuestionImport, direction } })}
                >
                  手动补一条记录
                </Button>
              </Space>
            }
          >
            <Table
              rowKey={(record) => record._id || `${record.title}-${record.sort}`}
              columns={importColumns}
              dataSource={filteredImports}
              pagination={{ pageSize: 6, showSizeChanger: false }}
              scroll={{ x: 1100 }}
            />
          </Card>
        </>
      )}

      <QuestionBankSectionEditorDrawer
        open={Boolean(editingSection)}
        sectionId={editingSection}
        page={page}
        canWrite={auth.permissions.canWrite}
        saving={updatePageMutation.isPending}
        onClose={() => setEditingSection(null)}
        onSave={handleSavePage}
      />

      <QuestionBankRecordEditorDrawer
        open={Boolean(editingRecord)}
        state={editingRecord}
        canWrite={auth.permissions.canWrite}
        saving={recordSaving}
        onClose={() => setEditingRecord(null)}
        onSubmit={handleSaveRecord}
      />

      <QuestionBankImportDrawer
        open={importDrawerOpen}
        direction={direction}
        canWrite={auth.permissions.canWrite}
        canPublish={auth.permissions.canPublish}
        onClose={() => setImportDrawerOpen(false)}
        onPreview={(payload) => api.previewQuestionBankCsvImport(payload)}
        onCommit={async (payload) => {
          const summary = await api.commitQuestionBankCsvImport(payload);
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['collection', 'medicalQuestions'] }),
            queryClient.invalidateQueries({ queryKey: ['collection', 'pastPapers'] }),
            queryClient.invalidateQueries({ queryKey: ['collection', 'questionImports'] })
          ]);
          return summary;
        }}
      />
    </Space>
  );
}

export default QuestionBankPage;
