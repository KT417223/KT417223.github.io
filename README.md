# Anywhere Web App

スマホからでもPCからでも見やすい、GitHub管理向けの軽量Webアプリスターターです。

## Start

依存関係なしで動きます。まずは `index.html` をブラウザで開いてください。

GitHub CodespacesやPythonが入っている環境でローカルサーバー確認する場合:

```powershell
python3 -m http.server 5173
```

そのあとブラウザで `http://localhost:5173` を開きます。

Windows環境でPythonやNodeがまだ無い場合は、`index.html` を直接ダブルクリックして確認できます。

## Structure

```text
.
├── index.html
├── src
│   ├── app.js
│   └── styles.css
├── .devcontainer
│   └── devcontainer.json
├── .github
│   ├── ISSUE_TEMPLATE
│   │   └── feature_request.md
│   └── pull_request_template.md
├── README.md
└── .gitignore
```

## GitHub Workflow

```powershell
git add .
git commit -m "Initial web app starter"
```

GitHubで空のリポジトリを作ったあと、表示された `git remote add origin ...` と `git push ...` を実行します。

## Deploy

GitHub Pagesで公開できます。

1. GitHubのリポジトリで `Settings` を開く
2. `Pages` を開く
3. Sourceを `Deploy from a branch` にする
4. Branchを `main`、folderを `/root` にする

## Next Ideas

- Vite + React / Vue / Svelte への移行
- GitHub Codespaces 用 `.devcontainer` の追加
- Issue / PR テンプレートの追加
- GitHub Actions による自動チェック
