# PMO Portfolio

PMO、業務改善、インフラ運用、DX支援の経験をまとめたレスポンシブポートフォリオサイトです。

## Overview

- 業務経歴をもとにした匿名化プロジェクト実績
- 眼鏡店向け在庫・発注・販売管理モック
- スマホ、タブレット、PC対応のレスポンシブUI
- GitHub Pagesで公開しやすい静的サイト構成
- GitHub Codespaces対応

## Local Preview

依存関係なしで動きます。`index.html` をブラウザで直接開けます。

ローカルサーバーで確認する場合:

```powershell
python3 -m http.server 5173
```

そのあと `http://localhost:5173` を開きます。

## Structure

```text
.
├── assets
│   └── portfolio-hero.png
├── demos
│   └── optical-inventory.html
│   └── queue-ticket-system.html
│   └── member-lookup-system.html
│   └── frame-inventory-system.html
│   └── lens-inventory-system.html
├── index.html
├── src
│   ├── app.js
│   ├── optical-demo.css
│   ├── optical-demo.js
│   ├── queue-ticket-system.js
│   ├── member-lookup-system.js
│   ├── frame-inventory-system.js
│   ├── lens-inventory-system.js
│   └── styles.css
├── .devcontainer
│   └── devcontainer.json
├── .github
│   ├── ISSUE_TEMPLATE
│   │   └── feature_request.md
│   └── pull_request_template.md
└── README.md
```

## Deploy

GitHub Pagesで公開できます。

1. GitHubのリポジトリで `Settings` を開く
2. `Pages` を開く
3. Sourceを `Deploy from a branch` にする
4. Branchを `main`、folderを `/root` にする

## Notes

掲載内容は業務経歴書をもとに、企業名や詳細情報を出さない形で匿名化しています。
