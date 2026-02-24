'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileForm() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    full_name: '',
    address: '',
    tax_registration_number: '',
    bank_info: ''
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (data) setProfile(data)
      }
      setLoading(false)
    }
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...profile, updated_at: new Date().toISOString() })

    if (error) alert('エラーが発生しました')
    else alert('プロフィールを更新しました！')
  }

  if (loading) return <p>読み込み中...</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle>送り主（自分）の情報設定</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">氏名 / 屋号</label>
            <Input 
              value={profile.full_name} 
              onChange={e => setProfile({...profile, full_name: e.target.value})} 
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="text-sm font-medium">住所</label>
            <Textarea 
              value={profile.address} 
              onChange={e => setProfile({...profile, address: e.target.value})} 
              placeholder="〒123-4567 東京都..."
            />
          </div>
          <div>
            <label className="text-sm font-medium">インボイス登録番号</label>
            <Input 
              value={profile.tax_registration_number} 
              onChange={e => setProfile({...profile, tax_registration_number: e.target.value})} 
              placeholder="T1234567890123"
            />
          </div>
          <div>
            <label className="text-sm font-medium">振込先情報</label>
            <Textarea 
              value={profile.bank_info} 
              onChange={e => setProfile({...profile, bank_info: e.target.value})} 
              placeholder="〇〇銀行 △△支店 普通 1234567"
            />
          </div>
          <Button type="submit" className="w-full">設定を保存する</Button>
        </form>
      </CardContent>
    </Card>
  )
}