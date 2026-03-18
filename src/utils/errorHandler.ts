import Taro from '@tarojs/taro';

// 错误类型
export enum ErrorType {
  NETWORK = 'NETWORK',
  CLOUD_FUNCTION = 'CLOUD_FUNCTION',
  PERMISSION = 'PERMISSION',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN'
}

// 错误信息映射
const ERROR_MESSAGES: Record<ErrorType, string> = {
  [ErrorType.NETWORK]: '网络连接失败，请检查网络设置',
  [ErrorType.CLOUD_FUNCTION]: '服务请求失败，请稍后重试',
  [ErrorType.PERMISSION]: '权限不足，请联系管理员',
  [ErrorType.VALIDATION]: '数据验证失败，请检查输入',
  [ErrorType.UNKNOWN]: '操作失败，请稍后重试'
};

// 自定义错误类
export class AppError extends Error {
  type: ErrorType;
  originalError?: any;

  constructor(type: ErrorType, message?: string, originalError?: any) {
    super(message || ERROR_MESSAGES[type]);
    this.type = type;
    this.originalError = originalError;
    this.name = 'AppError';
  }
}

// 错误处理器
export class ErrorHandler {
  // 显示错误提示
  static showError(error: Error | AppError | string, duration: number = 2000) {
    let message: string;

    if (typeof error === 'string') {
      message = error;
    } else if (error instanceof AppError) {
      message = error.message;
      console.error(`[AppError] ${error.type}:`, error.originalError || error.message);
    } else {
      message = error.message || ERROR_MESSAGES[ErrorType.UNKNOWN];
      console.error('[Error]:', error);
    }

    Taro.showToast({
      title: message,
      icon: 'none',
      duration
    });
  }

  // 显示加载中
  static showLoading(title: string = '加载中...') {
    Taro.showLoading({ title, mask: true });
  }

  // 隐藏加载中
  static hideLoading() {
    Taro.hideLoading();
  }

  // 确认对话框
  static async confirm(content: string, title: string = '提示'): Promise<boolean> {
    try {
      await Taro.showModal({
        title,
        content,
        confirmText: '确定',
        cancelText: '取消'
      });
      return true;
    } catch {
      return false;
    }
  }

  // 解析云函数错误
  static parseCloudError(error: any): AppError {
    if (!error) {
      return new AppError(ErrorType.UNKNOWN);
    }

    // 网络错误
    if (error.errMsg && error.errMsg.includes('fail')) {
      return new AppError(ErrorType.NETWORK, '网络请求失败', error);
    }

    // 云函数返回的错误
    if (error.error || error.message) {
      const message = error.error || error.message;

      if (message.includes('权限') || message.includes('admin')) {
        return new AppError(ErrorType.PERMISSION, message, error);
      }

      return new AppError(ErrorType.CLOUD_FUNCTION, message, error);
    }

    return new AppError(ErrorType.UNKNOWN, undefined, error);
  }

  // 重试包装器（支持指数退避）
  static async retry<T>(
    fn: () => Promise<T>,
    options: {
      maxRetries?: number;
      delay?: number;
      backoff?: number;
      onRetry?: (attempt: number, error: any) => void;
    } = {}
  ): Promise<T> {
    const { maxRetries = 3, delay = 1000, backoff = 1, onRetry } = options;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries) {
          // 计算退避延迟：delay * (backoff ^ (attempt - 1))
          const retryDelay = backoff > 1
            ? delay * Math.pow(backoff, attempt - 1)
            : delay;

          console.log(`[Retry] 第 ${attempt} 次重试失败，${retryDelay}ms 后重试...`);
          onRetry?.(attempt, error);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    throw lastError;
  }

  // 安全执行包装器
  static async safeExecute<T>(
    fn: () => Promise<T>,
    options: {
      showLoading?: boolean;
      loadingText?: string;
      showError?: boolean;
      fallback?: T;
    } = {}
  ): Promise<T | undefined> {
    const {
      showLoading = false,
      loadingText = '加载中...',
      showError = true,
      fallback
    } = options;

    try {
      if (showLoading) {
        this.showLoading(loadingText);
      }

      const result = await fn();

      if (showLoading) {
        this.hideLoading();
      }

      return result;
    } catch (error) {
      if (showLoading) {
        this.hideLoading();
      }

      if (showError) {
        const appError = this.parseCloudError(error);
        this.showError(appError);
      }

      return fallback;
    }
  }
}

// 导出便捷方法
export const showError = ErrorHandler.showError.bind(ErrorHandler);
export const showLoading = ErrorHandler.showLoading.bind(ErrorHandler);
export const hideLoading = ErrorHandler.hideLoading.bind(ErrorHandler);
export const confirm = ErrorHandler.confirm.bind(ErrorHandler);
export const retry = ErrorHandler.retry.bind(ErrorHandler);
export const safeExecute = ErrorHandler.safeExecute.bind(ErrorHandler);
