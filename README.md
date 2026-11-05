# 词间 · WORDSPACE

面向 GitHub Pages 的免费、无依赖背词 Web App。无需构建、不设会员、不限词量。

## 已实现

- 每日新词目标、优先到期复习、按词书选词。
- 语境卡片：释义、音标、原创例句、翻译、句子分析、助记、个人笔记。
- 英式/美式浏览器语音合成、单词和例句朗读、自动发音。
- 认识/模糊/不认识/很熟悉四级反馈，公开 SM-2 风格间隔重复，错词本轮重现。
- 直接默写、听音拼写、背完再默写、错词与收藏分组强化。
- 熟词跳过和重新加入，收藏、中英文搜索、自建单词、JSON 词库导入。
- 学习天数、通过率、每日记录、未来到期复习量、估算记忆持久度。
- 本地自动存储、JSON 备份与恢复。
- 适配手机和桌面，支持键盘操作。

## 运行与部署

直接打开 index.html，或运行 `python3 -m http.server 8080`，访问 http://localhost:8080。

将本目录全部文件（包括 `.github`）上传到你的 GitHub 仓库 main 分支。进入 Settings → Pages → Source 选择 **GitHub Actions**，运行 Deploy Wordspace to GitHub Pages 工作流。

用户站仓库可命名为 `你的用户名.github.io`；项目仓库也支持，资源使用相对路径。请先备份已有站点；本目录不会自动合并已有主页。

## 词库格式

```json
{
  "name": "我的完整考研词库",
  "words": [{
    "word": "example",
    "meaning": "n. 例子",
    "phonetic": "/ɪɡˈzɑːmpəl/",
    "example": "This is an example.",
    "translation": "这是一个例子。",
    "analysis": "主系表结构。",
    "memory": "for example 例如"
  }]
}
```

`word`、`meaning` 必填，其他字段可选。在设置里下载模板。只导入自己有权使用的词库；词库会随公开仓库公开，个人笔记不会上传。

## 功能对照与边界

参考资料：
- 不背单词官网 https://bbdc.cn/
- 不背单词官方应用介绍 https://m.app.mi.com/details?id=cn.com.langeasy.LangEasyLexis
- 墨墨使用帮助 https://www.maimemo.com/help30
- 墨墨官方说明 https://memodocs.maimemo.com/docs/memo
- 墨墨更新记录 https://memodocs.maimemo.com/docs/product-log-memo-android/

不背的语境学习、词根助记、词书与拼写学习，以及墨墨的记忆反馈、动态复习、个人词本与统计，作为学习流程参考。公开页面无法核实两款 App 当前全部会员权益，不能称为完整复刻。未复制原产品界面、商标、专有算法、影视例句或授权词书。

当前每本内置 **12 词体验词表**，共 36 条，例句与分析为本项目编写。完整考研、四六级词库尚需导入；未包含真题语料、真人录音、完整词根数据库、云同步、账号、社交组队、文章提词、离线安装、考试日期倒排和跨设备自动同步。这些不是已经实现的功能。

记忆调度不是两款 App 的专有算法。初次记住间隔 1 天，连续记住为 6 天，之后按 ease 调整；模糊缩短，忘记 10 分钟后到期并加入本轮队尾。队尾重现是当轮强化，可早于 10 分钟；听写和默写同样影响记忆记录。估计保留率为 exp(-elapsedDays / interval)，只是模型值。

统计使用所有词书的记录。新词目标只作用于正常学习计划；主动默写与分组强化不受今日新词额度约束。

数据依赖当前浏览器 localStorage。换设备、清除数据或隐私模式可能丢失记录；定期导出备份。跨设备目前手动备份迁移。语音依赖系统 speechSynthesis，离线效果与可用音色因设备而异。字体在线加载失败时自动回退系统字体。

## 验证

`node --test memory.test.cjs` 检查复习调度。`node --check app.js` 检查语法。当前交付未进行真实浏览器视觉及语音兼容性验证，也未部署至 GitHub。
