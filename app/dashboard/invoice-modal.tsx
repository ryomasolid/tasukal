'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PDFDownloadLink } from '@react-pdf/renderer'
import { InvoicePDF } from './invoice-pdf'
import { Calculator, Calendar, Download, Loader2 } from 'lucide-react'

export function InvoiceModal({ project }: { project: any }) {
  const [amount, setAmount] = useState(0)
  const [dueDate, setDueDate] = useState('')
  const [profile, setProfile] = useState<any>(null)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 1. プロフィール情報を取得するロジックを追加
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const baseAmount = Math.round(amount)
  const tax = Math.floor(baseAmount * 0.1)
  const withholding = Math.floor(baseAmount * 0.1021)
  const total = baseAmount + tax - withholding

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* 入力エリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-3 h-3" /> 請求金額 (税抜)
          </label>
          <Input 
            type="number" 
            placeholder="0"
            className="h-12 rounded-xl border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 transition-all text-lg font-semibold"
            onChange={(e) => setAmount(Number(e.target.value))} 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-3 h-3" /> お支払い期限
          </label>
          <Input 
            type="date" 
            className="h-12 rounded-xl border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setDueDate(e.target.value)} 
          />
        </div>
      </div>

      {/* 計算プレビューエリア：ミニマルで清潔感のあるデザイン */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">業務報酬 (小計)</span>
            <span className="text-gray-900 font-semibold">¥{baseAmount.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">消費税 (10%)</span>
            <span className="text-gray-900 font-semibold">¥{tax.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">源泉徴収税 (10.21%)</span>
            <span className="text-red-500 font-medium">- ¥{withholding.toLocaleString()}</span>
          </div>
        </div>

        {/* 合計金額：コントラストを効かせたボトムセクション */}
        <div className="bg-blue-50/50 px-6 py-5 border-t border-blue-100/50 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
              Net Amount
            </span>
            <span className="text-sm font-bold text-gray-700">差引お振込額</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              <span className="text-sm mr-1">¥</span>
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ダウンロードボタン */}
      {baseAmount > 0 && (
        <PDFDownloadLink
          document={
            <InvoicePDF 
              project={project} 
              profile={profile} // 2. 取得したプロフィールをPDFに渡す
              amount={baseAmount} 
              tax={tax} 
              withholding={withholding} 
              total={total} 
              dueDate={dueDate} 
            />
          }
          fileName={`請求書_${project.name}.pdf`}
        >
          {({ loading }) => (
            <Button 
              className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all flex gap-2 items-center justify-center disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  PDFを生成中...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  PDFをダウンロード
                </>
              )}
            </Button>
          )}
        </PDFDownloadLink>
      )}

      {/* プロフィール未設定時の警告 */}
      {!profile && baseAmount > 0 && (
        <p className="text-center text-xs text-amber-600 bg-amber-50 py-2 rounded-lg border-amber-100">
          ⚠️ 設定画面から「送り主情報」を登録すると、PDFに自動反映されます。
        </p>
      )}
    </div>
  )
}