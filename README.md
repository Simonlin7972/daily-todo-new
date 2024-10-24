<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
``` -->

# Simple Daily Todo

Simple Daily Todo 是一款精心設計的待辦事項管理應用，旨在幫助您輕鬆組織日常任務，提高工作效率，並追蹤您的進度。無論是工作、學習還是個人生活，這款應用都能成為您的得力助手。

## 主要特點

### 直觀的任務管理
- 簡潔明了的 UI 設計，讓您一目了然地查看所有待辦事項。
- 輕鬆新增、編輯和刪除任務，幫助您靈活管理日程。
- 拖放功能支持任務重新排序，讓您的待辦清單始終保持最優先級。

### 分類管理
- 創建自定義分類，更好地組織不同類型的任務。
- 靈活調整分類順序，適應您的工作流程。

### 進度追蹤
- 動態進度條直觀顯示您的完成情況。
- 自定義每日目標任務數，激勵自己不斷前進。
- 已完成任務列表，讓您回顧每日成就。

### 專注計時器
- 內置計時器功能，幫助您專注完成任務。
- 靈活的開始、暫停和重置選項，適應不同的工作節奏。

### 個性化體驗
- 支持淺色和深色模式，保護您的眼睛，適應不同的工作環境。
- 多語言支持（目前支持英文和繁體中文），滿足不同用戶的需求。

### 數據管理
- 一鍵添加示例數據，快速體驗應用功能。
- 重置功能，讓您隨時開始新的計劃。

## 技術亮點
- 使用 React 和 TypeScript 構建，確保代碼的可維護性和可擴展性。
- 採用 Tailwind CSS 和 shadcn/ui 組件，實現美觀且一致的用戶界面。
- 集成 i18next 實現國際化，輕鬆支持多語言。
- 使用 Vite 作為構建工具，提供快速的開發體驗和優化的生產構建。

Simple Daily Todo 不僅僅是一個待辦事項應用，它是您提高生產力、實現目標的得力助手。無論您是學生、專業人士還是任何需要管理日常任務的人，這款應用都能滿足您的需求。開始使用 Simple Daily Todo，讓每一天都充滿成就感！
