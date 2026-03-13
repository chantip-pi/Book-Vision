import { SimulationResponse } from '../types';
import { BookOpen, Ruler, Weight, TrendingUp, FileText } from 'lucide-react';

interface ResultsDisplayProps {
  results: SimulationResponse | null;
  loading: boolean;
}

export default function ResultsDisplay({ results, loading }: ResultsDisplayProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-blue-500">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-gray-600" />
          Simulation Results
        </h2>
        <p className="text-gray-600">Run a simulation to see the results here.</p>
      </div>
    );
  }

  const spineWidth = results.physics?.SpineWidthMm || 0;
  const spineWidthPx = Math.max(30, Math.min(150, spineWidth * 3));

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-green-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-green-600" />
        Simulation Results
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Layout Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold mb-4 text-purple-800 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Layout Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Characters per Page:</span>
              <span className="font-mono font-bold text-purple-700 text-lg">
                {results.layout.CharsPerPage.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Lines per Page:</span>
              <span className="font-mono font-bold text-purple-700 text-lg">
                {results.layout.LinesPerPage}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Words per Page:</span>
              <span className="font-mono font-bold text-purple-700 text-lg">
                {results.layout.WordsPerPage}
              </span>
            </div>
          </div>
        </div>

        {/* Physics Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Physical Properties
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Spine Width:</span>
              <span className="font-mono font-bold text-blue-700 text-lg">
                {results.physics.SpineWidthMm.toFixed(1)} mm
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Total Weight:</span>
              <span className="font-mono font-bold text-blue-700 text-lg">
                {results.physics.TotalWeightG.toFixed(0)} g
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Thickness:</span>
              <span className="font-mono font-bold text-blue-700 text-lg">
                {results.physics.ThicknessMm.toFixed(1)} mm
              </span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progress & Goals
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">Total Words:</span>
              <span className="font-mono font-bold text-green-700 text-lg">
                {results.total_words.toLocaleString()}
              </span>
            </div>
            {results.pct_of_goal !== undefined && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-gray-700 font-medium">Progress:</span>
                <span className="font-mono font-bold text-green-700 text-lg">
                  {results.pct_of_goal.toFixed(1)}%
                </span>
              </div>
            )}
            {results.days_remaining !== undefined && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-gray-700 font-medium">Days Remaining:</span>
                <span className="font-mono font-bold text-green-700 text-lg">
                  {results.days_remaining}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Book Visualization - Full Width */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 text-amber-800 flex items-center gap-2">
            <Weight className="w-5 h-5" />
            Book Visualization
          </h3>
          
          <div className="flex flex-col items-center space-y-4">
            {/* Book Container */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 shadow-inner">
              {/* Book Spine */}
              <div className="relative">
                <div 
                  className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 rounded shadow-2xl border border-amber-900"
                  style={{
                    width: `${spineWidthPx}px`,
                    height: '180px',
                    minWidth: '30px'
                  }}
                >
                  {/* Spine Details */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <div className="w-4/5 h-1 bg-amber-900 opacity-20 rounded mb-2"></div>
                    <div className="w-3/5 h-1 bg-amber-900 opacity-20 rounded mb-2"></div>
                    <div className="w-2/5 h-1 bg-amber-900 opacity-20 rounded"></div>
                  </div>
                  
                  {/* Highlight Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 rounded"></div>
                </div>
                
                {/* Book Pages (peeking from sides) */}
                <div 
                  className="absolute top-0 -left-1 bg-white border border-gray-300 rounded-l"
                  style={{
                    width: '3px',
                    height: '180px'
                  }}
                ></div>
                <div 
                  className="absolute top-0 -right-1 bg-white border border-gray-300 rounded-r"
                  style={{
                    width: '3px',
                    height: '180px'
                  }}
                ></div>
              </div>
            </div>
            
            {/* Measurements */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-amber-700 font-semibold text-lg">
                  Spine Width: {spineWidth.toFixed(1)} mm
                </div>
                <div className="text-gray-500 text-sm">
                  ({spineWidthPx}px displayed)
                </div>
              </div>
              
              {/* Scale Reference */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="w-10 h-0.5 bg-gray-400"></div>
                <span>10mm reference</span>
                <div className="w-10 h-0.5 bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

