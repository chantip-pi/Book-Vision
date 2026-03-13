import { useState } from 'react';
import { SimulateRequest } from '../types';
import { Book, Type, Ruler, Zap } from 'lucide-react';
import { TrimSizes, FontRegistry } from '../constants';

interface SimulationFormProps {
  onSubmit: (request: SimulateRequest) => void;
  loading: boolean;
}

const TRIM_SIZES = Object.entries(TrimSizes).map(([key, value]) => ({
  value: key,
  label: `${value.name} (${value.widthMM}x${value.heightMM}mm)`,
}));

const FONTS = Object.entries(FontRegistry).map(([key, value]) => ({
  value: key,
  label: value.displayName,
}));

export default function SimulationForm({ onSubmit, loading }: SimulationFormProps) {
  const [formData, setFormData] = useState<SimulateRequest>({
    trim_size: 'B5',
    font_key: 'sarabun',
    font_size_pt: 11,
    line_spacing: 1.2,
    paper_gsm: 75,
    page_goal: 200,
    current_char_count: 0,
    daily_char_target: 1000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-purple-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Book className="w-6 h-6 text-purple-600" />
        Book Simulation Parameters
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Trim Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Trim Size
            </label>
            <select
              value={formData.trim_size}
              onChange={(e) => setFormData({ ...formData, trim_size: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {TRIM_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Font
            </label>
            <select
              value={formData.font_key}
              onChange={(e) => setFormData({ ...formData, font_key: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {FONTS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size (pt)
            </label>
            <input
              type="number"
              min="8"
              max="18"
              step="0.5"
              value={formData.font_size_pt}
              onChange={(e) => setFormData({ ...formData, font_size_pt: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Line Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Line Spacing
            </label>
            <input
              type="number"
              min="1"
              max="2"
              step="0.1"
              value={formData.line_spacing}
              onChange={(e) => setFormData({ ...formData, line_spacing: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Paper GSM */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paper Weight (GSM)
            </label>
            <input
              type="number"
              min="60"
              max="120"
              step="5"
              value={formData.paper_gsm}
              onChange={(e) => setFormData({ ...formData, paper_gsm: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Page Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Goal
            </label>
            <input
              type="number"
              min="50"
              max="1000"
              value={formData.page_goal}
              onChange={(e) => setFormData({ ...formData, page_goal: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Current Character Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Character Count
            </label>
            <input
              type="number"
              min="0"
              value={formData.current_char_count}
              onChange={(e) => setFormData({ ...formData, current_char_count: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Daily Character Target */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Daily Character Target
            </label>
            <input
              type="number"
              min="100"
              max="10000"
              step="100"
              value={formData.daily_char_target}
              onChange={(e) => setFormData({ ...formData, daily_char_target: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Simulating...' : 'Simulate by Page Goal'}
          </button>
          
          <button
            type="button"
            onClick={() => onSubmit({ ...formData, page_goal: 0 })}
            disabled={loading || formData.current_char_count === 0}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Simulating...' : 'Simulate by Current Progress'}
          </button>
        </div>
      </form>
    </div>
  );
}

