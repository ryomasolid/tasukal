'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Settings, LogOut, User, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardNav({ userEmail }: { userEmail: string }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-3 transition-transform">
            <span className="text-white font-black text-xl">t</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            tasukal
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-600">{userEmail}</span>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl transition-all">
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-gray-100 p-0">
              <div className="flex flex-col h-full bg-white">
                <SheetHeader className="p-6 text-left border-b border-gray-50">
                  <SheetTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Menu</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 p-4 space-y-1">
                  <Link href="/dashboard" className="block">
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                  
                  <Link href="/dashboard/settings" className="block">
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      <Settings className="h-5 w-5" />
                      Settings
                    </Button>
                  </Link>
                </div>

                <div className="p-4 border-t border-gray-50 space-y-4">
                  <div className="px-4 py-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-gray-900 truncate">Current User</p>
                      <p className="text-[10px] text-gray-500 truncate">{userEmail}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all">
                    <LogOut className="h-5 w-5" />
                    Sign out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}