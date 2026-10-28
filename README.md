# EEG Pretraining Atlas

用于展示 EEG 基础模型预训练权重价值的交互网页。首屏突出 PRR、ACS、PVS 和模型天梯榜，下方提供 PRR–ACS 分布图、跨数据集矩阵、原始性能图表、可排序结果表，以及七个模型的架构和原理介绍。

这是纯静态 HTML / CSS / JavaScript 项目，**不需要 npm install、不需要构建、不需要后端、不依赖 CDN**。页面默认英文，使用 Arial。所有静态资源使用相对路径，可部署于 GitHub Pages 的用户站点或项目子路径。

## 先看效果

直接双击 `index.html` 即可离线预览，图表和数据不依赖 fetch。

也可以在此目录运行（需要 Node.js 18 或更高版本）：

```bash
npm run preview
```

打开命令输出的 `http://127.0.0.1:4173/`。移动端会自动调整布局；宽结果表可横向滚动。

## 部署到 GitHub Pages

**将本目录中的内容放到目标 GitHub 仓库的根目录**，使 `index.html`、`package.json` 和 `.github/` 都位于仓库根目录。不要仅上传 `eeg-pretraining-atlas/` 外层文件夹而保持 workflow 不变。

### 推荐：GitHub Actions

1. 创建仓库，将本目录全部内容（包括 `.github/workflows/deploy.yml`）提交到 `main` 分支。
2. 在仓库中选择 **Settings → Pages → Build and deployment → Source → GitHub Actions**。
3. 在 **Actions** 中打开 `Deploy EEG Pretraining Atlas to GitHub Pages`，点击 **Run workflow**；后续推送到 `main` 会自动更新。
4. 成功后，Pages 和 workflow 的 deployment 输出会给出网址。项目站点通常位于 `https://USERNAME.github.io/REPOSITORY/`。

若默认分支不是 `main`，修改 `deploy.yml` 的 `branches` 字段。本 workflow 先核对数据和指标逻辑，再部署静态资源。它不上传原始工作簿，不需要任何 GitHub 个人访问令牌。

### 不使用 Actions

在 **Settings → Pages** 中选择 **Deploy from a branch**，再选择 `main` 和 `/(root)`。目录中已包含 `.nojekyll`，不需要 Jekyll 配置。此方式不运行数据检查，但展示内容一致。

GitHub 官方说明：<https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>

## 设置 GitHub 跳转链接

编辑 `config.js`，填写你自己创建的目标页面：

```javascript
window.ATLAS_CONFIG = {
  siteName: "EEG Pretraining Atlas",
  repositoryUrl: "https://github.com/OWNER/REPO",
  submissionUrl: "https://github.com/OWNER/REPO/blob/main/SUBMISSION.md",
  feedbackUrl: "https://github.com/OWNER/REPO/issues/new/choose",
  paperUrl: null,
};
```

`submissionUrl` 可以指向你准备的 Markdown 说明页，说明页中再链接评估模板 ZIP。`feedbackUrl` 可指向说明页或 Issues。提交说明页、反馈指南和评估包由你制作，网站没有擅自创建这些内容。地址尚未设置时，按钮会显示清晰的 “coming soon” 对话框，不会跳到假地址。网页仅跳转，不接收或存储读者上传的信息。

## 数据与指标口径

- `data/results.json`：规范化数据，保留源文件名、工作表、单元格范围、SHA-256、原始均值及 ± 数值。
- `data/results.js`：与 JSON 内容完全相同，用于无需服务端的本地预览。
- `data/results.csv`：全部 28 条模型 / 数据集结果，包含三个新指标及所有原始性能数值。单个数据集和当前排名也可在网页内下载。
- 原始输入：`logs/结果汇总.xlsx` 与 `logs/新指标单独汇总.xlsx`（在研究项目中，不在此网页包内）。导入过程不改写工作簿。
- PRR、ACS、PVS 采用单独指标表提供的完整精度值；导入脚本逐项与汇总表的均值 Kappa 重算结果比较，不静默修正不一致的数据。
- 当前的 84 个新指标值全部通过核对。指标是**均值之比**，不是逐被试比值的均值。
- PVS 与 PRR 降序；ACS 升序。相同数值共享名次，排名基于完整精度，页面显示四位小数。没有人为合并四个数据集的总排名。
- 汇总表的 `±` 数值保留原样。源文件未定义其为 SD、SE 或 CI，因此网页使用 “reported ± values”，不编造不确定性解释或显著性。
- BAC、Kappa，以及每个数据集提供的 Weighted F1 / ROC AUC 均可切换查看。
- Frozen、Fine-tuned、Scratch 比较同架构的不同训练设置。ACS 不解释为架构的因果贡献占比；PVS=0 也不意味着冻结表征完全无用。

## 从 Excel 更新数据

仅更新数据时，需要 Python 3.9+ 和 `openpyxl`。在线展示不需要 Python。

```bash
python -m pip install openpyxl
python scripts/import_results.py --performance "/path/to/结果汇总.xlsx" --metrics "/path/to/新指标单独汇总.xlsx"
```

如果网页文件夹仍位于原研究项目根目录，可直接运行 `python scripts/import_results.py` 使用默认路径。脚本更新 `data/results.json`、`data/results.js` 和 `data/results.csv`。遇到重名、缺失主指标、非法数字或两表不一致会停止并报告具体位置；不会把缺失数值改成零，也不会执行 Excel 外部链接。

更新后运行：

```bash
npm test
```

然后提交更新后的三个数据文件，即可触发重新部署。现有测试包含初始 7 模型 / 4 数据集的基准快照；增加模型或数据集时需要同步调整这些快照断言。

## 增加模型

1. 先按一致的实验协议完成三种设置；在两份工作簿中补全模型结果。
2. 执行导入脚本并核对结果。模型列表来自数据，不需要手动修改图表代码。
3. 在 `data/models.js` 中为新模型添加 `id`、`tags`、`family`、`description`、`feature`、`architecture`、`paper` 和 `code`。`id` 必须与数据中的名称一致。缺少介绍时会显示明确的待补充状态。
4. 核对原始论文和代码链接，调整测试中的覆盖数量后提交。

当前导入脚本要求每个模型都有四个数据集的结果，且三项新指标都可按本文定义计算。若未来要接收不完整覆盖或无定义的分数，应先明确页面排名与缺失值政策，再扩展导入校验。

## 页面结构与样式

- `index.html`：页面结构与学术说明。
- `styles.css`：布局、配色、响应式、打印样式及 reduced-motion 支持。
- `app.js`：筛选、图表、排序、模型交互、下载与按钮跳转。
- `core.js`：独立的计算、排名、CSV 导出逻辑。
- `config.js`：论文和 GitHub 地址。
- `data/models.js`：模型标签、简介及原始来源链接。
- `scripts/import_results.py`：只读导入 Excel 并校验指标。
- `scripts/serve.mjs`：可选的本地静态预览服务器。
- `tests/core.test.cjs`：使用 Node 内置测试框架，无额外依赖。

没有添加虚构作者、机构、论文地址、引用次数或“实时更新”声明。模型简介概述已发表架构，不代表识别了此次实验所用的 checkpoint 或复现实验配置。

## 模型介绍来源

网页的每张模型卡片均附原论文和官方代码。主要原始来源：

- BENDR: <https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2021.653659/full>
- BIOT: <https://papers.neurips.cc/paper_files/paper/2023/hash/f6b30f3e2dd9cb53bbf2024402d02295-Abstract-Conference.html>
- LaBraM: <https://arxiv.org/abs/2405.18765>
- EEGPT: <https://papers.nips.cc/paper_files/paper/2024/hash/4540d267eeec4e5dbd9dae9448f0b739-Abstract-Conference.html>
- CBraMod: <https://proceedings.iclr.cc/paper_files/paper/2025/hash/bbbd6d915cb90be21c1254a82d45cedd-Abstract-Conference.html>
- CodeBrain: <https://arxiv.org/abs/2506.09110>
- SingLEM: <https://ieeexplore.ieee.org/abstract/document/11683600>
