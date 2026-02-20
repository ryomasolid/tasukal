'use client'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  // ブラウザ用クライアントの作成
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // ログイン後の戻り先URL
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button 
        onClick={handleGitHubLogin}
        className="bg-[#24292e] text-white px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-black transition-colors"
      >
        <span>GitHubで tasukal を始める</span>
      </button>
    </div>
  )
}