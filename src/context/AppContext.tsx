import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Employee, 
  Position, 
  Skill, 
  Training, 
  MobilityRecord, 
  NotificationItem, 
  AlgorithmWeights,
  CandidateStatus 
} from '../types';
import { 
  INITIAL_EMPLOYEES, 
  INITIAL_POSITIONS, 
  INITIAL_SKILLS, 
  INITIAL_TRAININGS, 
  INITIAL_MOBILITY_RECORDS 
} from '../data/seedData';
import { DEFAULT_WEIGHTS } from '../services/matchingAlgorithm';

export type AppView = 
  | 'landing' 
  | 'dashboard' 
  | 'employees' 
  | 'positions' 
  | 'matching' 
  | 'career-map' 
  | 'talent-pool' 
  | 'reports' 
  | 'settings';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  employees: Employee[];
  positions: Position[];
  skills: Skill[];
  trainings: Training[];
  mobilityRecords: MobilityRecord[];
  notifications: NotificationItem[];
  algorithmWeights: AlgorithmWeights;
  activeView: AppView;
  selectedPositionId: string;
  selectedEmployeeId: string;
  inspectingMatch: { candidateId: string; positionId: string } | null;
  toasts: Toast[];
  globalSearchOpen: boolean;
  addEmployeeModalOpen: boolean;
  createPositionModalOpen: boolean;
  
  // Actions
  setActiveView: (view: AppView) => void;
  setSelectedPositionId: (id: string) => void;
  setSelectedEmployeeId: (id: string) => void;
  setInspectingMatch: (match: { candidateId: string; positionId: string } | null) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  createPosition: (position: Omit<Position, 'id' | 'openSince'>) => void;
  updateCandidateStatus: (employeeId: string, newStatus: CandidateStatus, positionId?: string) => void;
  revertCandidateStatus: (employeeId: string) => void;
  updateAlgorithmWeights: (weights: AlgorithmWeights) => void;
  resetToDefaults: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  setGlobalSearchOpen: (open: boolean) => void;
  setAddEmployeeModalOpen: (open: boolean) => void;
  setCreatePositionModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Yeni Yüksek Uyumlu Eşleşme!',
    message: 'Ahmet Yılmaz, Senior Data Analyst pozisyonu için %94 uyum skoruna ulaştı.',
    timestamp: '10 dakika önce',
    type: 'match',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Mülakat Hatırlatması',
    message: 'Zeynep Kaya ile Senior Data Analyst rolü için iç mülakat planlandı.',
    timestamp: '2 saat önce',
    type: 'interview',
    read: false
  },
  {
    id: 'notif-3',
    title: 'İç Atama Başlatıldı',
    message: 'Elif Şahin için Acil Servis Koordinatörlüğü atama süreci onay bekliyor.',
    timestamp: '1 gün önce',
    type: 'assignment',
    read: true
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('pathmatch_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [positions, setPositions] = useState<Position[]>(() => {
    const saved = localStorage.getItem('pathmatch_positions');
    return saved ? JSON.parse(saved) : INITIAL_POSITIONS;
  });

  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [trainings, setTrainings] = useState<Training[]>(INITIAL_TRAININGS);
  const [mobilityRecords, setMobilityRecords] = useState<MobilityRecord[]>(INITIAL_MOBILITY_RECORDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [algorithmWeights, setAlgorithmWeights] = useState<AlgorithmWeights>(DEFAULT_WEIGHTS);

  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [selectedPositionId, setSelectedPositionId] = useState<string>('pos-1');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('emp-1');
  const [inspectingMatch, setInspectingMatch] = useState<{ candidateId: string; positionId: string } | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState<boolean>(false);
  const [createPositionModalOpen, setCreatePositionModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pathmatch_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('pathmatch_positions', JSON.stringify(positions));
  }, [positions]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addEmployee = (newEmpData: Omit<Employee, 'id'>) => {
    const newId = `emp-${Date.now()}`;
    const newEmp: Employee = {
      ...newEmpData,
      id: newId
    };
    setEmployees(prev => [newEmp, ...prev]);
    addToast(`${newEmp.name} sisteme başarıyla kaydedildi.`, 'success');

    // Add notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Yeni Çalışan Eklendi',
      message: `${newEmp.name} (${newEmp.title}) yetenek havuzuna dahil edildi.`,
      timestamp: 'Az önce',
      type: 'system',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const createPosition = (newPosData: Omit<Position, 'id' | 'openSince'>) => {
    const newId = `pos-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newPos: Position = {
      ...newPosData,
      id: newId,
      openSince: today,
      candidateInterviewsCount: 0
    };
    setPositions(prev => [newPos, ...prev]);
    setSelectedPositionId(newId);
    addToast(`'${newPos.title}' açık pozisyonu oluşturuldu. Akıllı eşleştirme hazır!`, 'success');

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Yeni Açık Pozisyon',
      message: `${newPos.title} (${newPos.department}) için iç yetenek eşleştirmesi başlatıldı.`,
      timestamp: 'Az önce',
      type: 'match',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateCandidateStatus = (employeeId: string, newStatus: CandidateStatus, positionId?: string) => {
    const targetPosId = positionId || selectedPositionId;
    const pos = positions.find(p => p.id === targetPosId);
    const emp = employees.find(e => e.id === employeeId);

    if (!emp) return;

    setEmployees(prev => prev.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          currentStatus: newStatus,
          targetRoleId: targetPosId
        };
      }
      return e;
    }));

    // Update position status if applicable
    if (pos) {
      setPositions(prev => prev.map(p => {
        if (p.id === targetPosId) {
          if (newStatus === 'Mülakat Aşamasında') {
            return { ...p, status: 'Mülakat', candidateInterviewsCount: (p.candidateInterviewsCount || 0) + 1 };
          }
          if (newStatus === 'İç Atama Sürecinde') {
            return { ...p, status: 'Atama', assignedCandidateId: employeeId };
          }
          if (newStatus === 'Atandı') {
            return { ...p, status: 'Kapatıldı', assignedCandidateId: employeeId };
          }
        }
        return p;
      }));
    }

    if (newStatus === 'Mülakat Aşamasında') {
      addToast(`${emp.name} için '${pos?.title || 'Pozisyon'}' mülakat süreci başlatıldı.`, 'info');
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: 'Mülakata Çağrıldı',
          message: `${emp.name}, ${pos?.title || ''} pozisyonu iç mülakat listesine alındı.`,
          timestamp: 'Az önce',
          type: 'interview',
          read: false
        },
        ...prev
      ]);
    } else if (newStatus === 'İç Atama Sürecinde') {
      addToast(`${emp.name} için iç atama onayı başlatıldı!`, 'success');
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: 'İç Atama Süreci',
          message: `${emp.name} adayının ${pos?.title || ''} rolüne transfer protokolü hazırlandı.`,
          timestamp: 'Az önce',
          type: 'assignment',
          read: false
        },
        ...prev
      ]);
    } else if (newStatus === 'Atandı') {
      addToast(`Tebrikler! ${emp.name} yeni görevine atandı.`, 'success');
      // Add mobility record
      if (pos) {
        const mobRecord: MobilityRecord = {
          id: `mob-${Date.now()}`,
          employeeName: emp.name,
          fromDepartment: emp.department,
          toDepartment: pos.department,
          fromRole: emp.title,
          toRole: pos.title,
          date: new Date().toISOString().split('T')[0],
          matchScore: 94
        };
        setMobilityRecords(prev => [mobRecord, ...prev]);
      }
    }
  };

  const revertCandidateStatus = (employeeId: string) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;

    setEmployees(prev => prev.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          currentStatus: 'Aktif'
        };
      }
      return e;
    }));

    addToast(`${emp.name} adayının durumu 'Aktif' olarak geri alındı.`, 'info');
  };

  const updateAlgorithmWeights = (newWeights: AlgorithmWeights) => {
    setAlgorithmWeights(newWeights);
    addToast('Eşleştirme algoritması ağırlıkları güncellendi.', 'success');
  };

  const resetToDefaults = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setPositions(INITIAL_POSITIONS);
    setAlgorithmWeights(DEFAULT_WEIGHTS);
    setMobilityRecords(INITIAL_MOBILITY_RECORDS);
    localStorage.removeItem('pathmatch_employees');
    localStorage.removeItem('pathmatch_positions');
    addToast('Tüm demo verileri varsayılan ayarlara sıfırlandı.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast('Tüm bildirimler temizlendi.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        positions,
        skills,
        trainings,
        mobilityRecords,
        notifications,
        algorithmWeights,
        activeView,
        selectedPositionId,
        selectedEmployeeId,
        inspectingMatch,
        toasts,
        globalSearchOpen,
        addEmployeeModalOpen,
        createPositionModalOpen,
        setActiveView,
        setSelectedPositionId,
        setSelectedEmployeeId,
        setInspectingMatch,
        addEmployee,
        createPosition,
        updateCandidateStatus,
        revertCandidateStatus,
        updateAlgorithmWeights,
        resetToDefaults,
        addToast,
        removeToast,
        markNotificationAsRead,
        clearAllNotifications,
        setGlobalSearchOpen,
        setAddEmployeeModalOpen,
        setCreatePositionModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
