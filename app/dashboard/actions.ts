'use client' // クライアント側で実行するためのマーク

import { createBrowserClient } from '@supabase/ssr'

export async function createProject(formData: FormData) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const name = formData.get('name') as string
  const client_name = formData.get('client_name') as string
  const github_repo = formData.get('github_repo') as string

  // 現在のユーザーIDを取得
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('projects')
    .insert({
      name,
      client_name,
      github_repo,
      user_id: user.id
    })

  if (error) {
    console.error(error)
    alert('保存に失敗しました')
  } else {
    alert('案件を登録しました！')
    window.location.reload() // 簡易的にリロードで更新
  }
}