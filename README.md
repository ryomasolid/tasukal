
---

# tasukal (たすかる)

**エンジニアによる、エンジニアのための、確定申告を見据えた請求書管理システム**

`tasukal` は、フリーランスや副業エンジニアが直面する「請求書作成」と「確定申告の準備」を劇的にシンプルにするWebアプリケーションです。

## 🌟 主な機能

* **モダンな案件管理**: 直感的なUIで進行中のプロジェクトを一元管理。
* **インテリジェントPDF生成**: 源泉徴収税（10.21%）や消費税を自動計算し、プロ仕様のPDFを発行。
* **2026年基準のモダンUI**: Glassmorphismとクリーンなタイポグラフィを採用した洗練されたインターフェース。
* **確定申告アシスト**: 請求書発行と同時に売上データをDBに自動記録。年間収益や源泉徴収額をリアルタイムに集計。
* **セキュアなプロフィール管理**: 送り主情報や振込先情報を暗号化されたDBで安全に保管。

## 🛠 技術スタック

* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
* **Database / Auth**: [Supabase](https://supabase.com/)
* **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
* **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/tasukal.git
cd tasukal

```

### 2. 依存関係のインストール

```bash
npm install

```

### 3. 環境変数の設定

`.env.local` ファイルを作成し、Supabaseの情報を設定してください。

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

```

### 4. データベースの構築

SupabaseのSQL Editorで、以下のテーブルを作成してください。

* `profiles`: ユーザー情報、振込先、登録番号など
* `projects`: 案件名、クライアント名など
* `invoices`: 売上履歴（確定申告用）

### 5. 開発サーバーの起動

```bash
npm run dev

```