import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: any) => void;
  initialData?: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    competencyLevel: '中等',
    learningGoal: '',
    preferredStyle: '讲解+计划'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">定制你的学习助手</h2>
          {!initialData && (
             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
               <X size={24} />
             </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              当前掌握水平
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['初学', '中等', '精通'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, competencyLevel: level })}
                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    formData.competencyLevel === level
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              近期学习目标
            </label>
            <input
              type="text"
              required
              placeholder="例如：巩固一次函数与应用题"
              value={formData.learningGoal}
              onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              偏好学习方式
            </label>
            <select
              value={formData.preferredStyle}
              onChange={(e) => setFormData({ ...formData, preferredStyle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none bg-white"
            >
              <option value="讲解+计划">讲解 + 复盘计划</option>
              <option value="练习为主">大量练习题</option>
              <option value="概念解析">深度概念解析</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            开始学习 <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;