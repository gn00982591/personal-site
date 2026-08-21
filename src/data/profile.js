// 履歷公開內容集中在此檔案，避免版面元件混入業務資料。
export const profile = {
  title: '企業系統開發工程師',
  direction: '企業系統開發＋系統分析',
  summary: '結合系統分析、後端開發與資料流程整合，將複雜的企業規則轉換為穩定、可維護的系統。',
  about: '專注於企業內部系統的開發與維運，能從使用者操作與需求開始，依序追查前端、API、後端服務、Stored Procedure、Function 與資料表，並以最小修改方式改善既有系統。',
  // 專業定位避免使用未確認的年資或量化成果，只呈現實際工作能力。
  highlights: [
    { title: '系統分析', description: '釐清需求、規則與影響範圍' },
    { title: '跨層開發', description: '串接前端、API、後端與資料庫' },
    { title: '穩定維運', description: '最小修改、回歸測試與可回滾' }
  ],
  skills: [
    '需求釐清與業務流程分析',
    '跨層系統問題追查',
    'ASP.NET Core／ASP.NET MVC／C#',
    'Vue 3／JavaScript',
    'SQL Server／Stored Procedure／Function',
    'ERP／WMS 資料整合',
    '報表與列印流程',
    'API、授權與連線異常排查',
    '測試案例、回歸測試與上線管理'
  ],
  projects: [
    {
      title: '運輸與派車管理系統',
      context: '支援訂單、派車、轉運、合車與簽收的企業作業流程。',
      responsibility: '分析跨階段狀態與資料關聯，追查前端、API、後端服務與資料庫的一致性。',
      technologies: ['Vue 3', 'ASP.NET Core', 'EF Core', 'SQL Server'],
      approach: '從實際流程與狀態變化確認問題來源，以最小修改維持既有架構。'
    },
    {
      title: '外銷訂單與文件系統',
      context: '處理訂單合併規則、欄位檢核、文件列印及報表排版。',
      responsibility: '釐清訂單間的商業條件與資料關係，維持畫面、後端規則及報表結果一致。',
      technologies: ['ASP.NET MVC', 'C#', 'SQL Server', 'RDL'],
      approach: '保留既有結構，集中調整必要規則、顯示條件與資料來源。'
    },
    {
      title: 'ERP／WMS 資料整合',
      context: '串接企業系統間的排程轉入、欄位映射、資料檢核與異常追蹤。',
      responsibility: '確認來源欄位、轉換順序、寫入條件與失敗資料，降低跨系統落差。',
      technologies: ['SQL Server', '排程程序', '資料介接', '欄位映射'],
      approach: '先還原完整資料流，再針對缺漏欄位、型別與例外條件進行修正。'
    },
    {
      title: '系統穩定性與異常處理',
      context: '處理 API 授權、資料型別、Null、前後端欄位及資料庫連線問題。',
      responsibility: '從錯誤訊息、實際資料與呼叫順序定位原因，確認影響範圍。',
      technologies: ['C#', 'Vue', 'JavaScript', 'SQL Server', 'HTTP API'],
      approach: '以證據確認根因，避免無關重構，並補充回歸測試重點。'
    }
  ],
  workMethods: [
    '先讀取並確認既有程式與資料流程',
    '釐清需求、原有規則及影響範圍',
    '採取最小且可回滾的修改',
    '維持前端、後端與資料庫規則一致',
    '補充測試案例與回歸檢查'
  ],
  tools: ['ASP.NET Core', 'ASP.NET MVC', 'C#', 'Vue 3', 'JavaScript', 'EF Core', 'SQL Server', 'RDL', 'REST API', 'Git'],
  contact: {
    email: 'gn00982591@gmail.com',
    github: 'https://github.com/gn00982591'
  }
}
