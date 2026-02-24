'use client'
import { ProfileForm } from "../profile-form"
import { ChevronLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { DashboardNav } from "../nav"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <DashboardNav userEmail="" />
      
      <main className="p-6 md:p-10 max-w-2xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          ダッシュボードに戻る
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Account Settings</h1>
          <p className="text-gray-500">請求書に記載されるあなたの情報を管理します。</p>
        </header>
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <ProfileForm />
          </div>
          <div className="bg-blue-50/50 p-6 border-t border-blue-100/50 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              ここで保存された情報は、暗号化されてSupabaseに保管されます。
              請求書生成時にのみ使用され、第三者に公開されることはありません。
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}