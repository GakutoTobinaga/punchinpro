/**
 * メッセージを生成する
 * @param {string} text - メッセージに含める文字列
 * @throws {Error} - textが空文字またはNGを含む場合にエラーを投げる
 * @returns {string} - 生成されたメッセージ
 */
export const generateMessage = (text: string): string => {
  if (!text || text.includes('NG')) {
    throw new Error('text is invalid');
  }
  return 'Hello, ' + text + '!';
};
