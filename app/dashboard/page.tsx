'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'
import { createProject } from './actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InvoiceModal } from './invoice-modal'
import { DashboardNav } from './nav'
import { Plus, Briefcase, ChevronRight, FileText } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
        setProjects(data || [])
      }
    }
    getData()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <DashboardNav userEmail={user?.email || ''} />
      
      <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
        {/* セクション1: 新規登録 */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-bold text-gray-800">新規案件の登録</h2>
          </div>
          
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden outline outline-1 outline-gray-200/50">
            <CardContent className="p-8">
              <form action={createProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-1">プロジェクト名</label>
                    <Input name="name" placeholder="例: モバイルアプリ開発" className="h-12 rounded-xl border-gray-200 focus:ring-blue-500 transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 ml-1">クライアント名</label>
                    <Input name="client_name" placeholder="株式会社〇〇 御中" className="h-12 rounded-xl border-gray-200 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-1 italic">GitHub Repository (Optional)</label>
                  <Input name="github_repo" placeholder="username/project-repo" className="h-12 rounded-xl border-gray-200 focus:ring-blue-500 transition-all font-mono text-sm" />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold transition-all shadow-lg shadow-gray-200 flex gap-2">
                  <Plus className="w-5 h-5" /> 案件をリストに追加
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* セクション2: 案件一覧 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold text-gray-800">アクティブな案件</h2>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase tracking-wider">
              {projects.length} Total
            </span>
          </div>

          <div className="grid gap-4">
            {projects.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400">
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>まだ案件がありません。上のフォームから追加しましょう。</p>
              </div>
            ) : (
              projects.map((project) => (
                <Card key={project.id} className={`group border-none transition-all duration-300 rounded-2xl ${selectedProjectId === project.id ? 'shadow-xl ring-2 ring-blue-500/20' : 'shadow-sm hover:shadow-md'}`}>
                  <CardContent className="p-0">
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedProjectId === project.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.client_name || 'No Client Info'}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost"
                        size="sm" 
                        onClick={() => setSelectedProjectId(selectedProjectId === project.id ? null : project.id)}
                        className={`rounded-full gap-1 px-4 transition-all ${selectedProjectId === project.id ? 'bg-gray-100 text-gray-900' : 'text-blue-600 hover:bg-blue-50'}`}
                      >
                        {selectedProjectId === project.id ? "閉じる" : "請求書を発行"}
                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedProjectId === project.id ? 'rotate-90' : ''}`} />
                      </Button>
                    </div>

                    {selectedProjectId === project.id && (
                      <div className="px-6 pb-8 animate-in fade-in zoom-in-95 duration-200">
                        <div className="pt-6 border-t border-gray-100">
                          <InvoiceModal project={project} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}