import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Sparkles, 
  RotateCcw, 
  Plus, 
  ExternalLink,
  Check,
  Briefcase
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications,
    setGlobalSearchOpen,
    setCreatePositionModalOpen,
    setAddEmployeeModalOpen,
    resetToDefaults
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const viewTitles: Record<AppView, { title: string; subtitle: string }> = {
    landing: { title: 'PathMatch Tanıtım', subtitle: 'Dışarıda arama, içeriden yükselt' },
    dashboard: { title: 'İK Dashboard', subtitle: 'Kurumunuzdaki yetenekleri doğru pozisyonlarla eşleştirin' },
    employees: { title: 'Çalışanlar & Yetenekler', subtitle: 'Kurum içi yetkinlik envanteri ve kariyer hedefleri' },
    positions: { title: 'Açık Pozisyonlar', subtitle: 'İç aday bekleyen stratejik şirket rolleri' },
    matching: { title: 'Akıllı Eşleştirme Motoru', subtitle: 'Ağırlıklı yapay zeka algoritması ile yüzdelik uygunluk analizi' },
    'career-map': { title: 'Kariyer Gelişim Haritası', subtitle: 'Mevcut pozisyondan hedef pozisyona gelişim rotası' },
    'talent-pool': { title: 'Yetenek Havuzu & Analitik', subtitle: 'Departmanlar arası yetkinlik dağılımı ve iç mobilite akışı' },
    reports: { title: 'Raporlar & ROI Analizi', subtitle: 'İç atama maliyet tasarrufu ve bağlılık kazanımları' },
    settings: { title: 'Algoritma & Ayarlar', subtitle: 'Ağırlıklı eşleştirme parametreleri ve sistem tercihleri' }
  };

  const currentInfo = viewTitles[activeView] || viewTitles.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs / Title */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
            <span className="font-medium text-slate-700">PathMatch</span>
            <span aria-hidden="true">/</span>
            <span className="truncate">{currentInfo.title}</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight truncate">
            {currentInfo.title}
          </h1>
        </div>

        {/* Center: Search button trigger */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={() => setGlobalSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Çalışan, pozisyon veya yetkinlik ara...</span>
            </div>
            <kbd className="font-mono text-[10px] bg-white text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              /
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Create Button */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setCreatePositionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-slate-600" />
              <span>Pozisyon Aç</span>
            </button>
            <button
              onClick={() => setAddEmployeeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Çalışan Ekle</span>
            </button>
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={resetToDefaults}
            title="Demo verilerini sıfırla"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Bildirimler"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </button>

            {notificationsOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="text-sm font-bold text-slate-900">
                    Bildirimler {unreadCount > 0 && `(${unreadCount})`}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={clearAllNotifications}
                      className="text-slate-500 hover:text-slate-800"
                    >
                      Temizle
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      Yeni bildiriminiz bulunmuyor.
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`py-3 flex items-start gap-3 transition-colors ${n.read ? 'opacity-70' : 'bg-slate-50/50'}`}
                      >
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-emerald-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 leading-snug">{n.title}</p>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                        </div>
                        {!n.read && (
                          <button
                            onClick={() => markNotificationAsRead(n.id)}
                            title="Okundu olarak işaretle"
                            className="p-1 text-slate-400 hover:text-slate-700"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Landing / Demo toggle */}
          <button
            onClick={() => setActiveView(activeView === 'landing' ? 'dashboard' : 'landing')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{activeView === 'landing' ? 'İK Portalı' : 'Ürün Tanıtımı'}</span>
            <ExternalLink className="w-3 h-3 text-emerald-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
