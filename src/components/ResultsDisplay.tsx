import { SimulationResponse } from '../types';
import { BookOpen, Ruler, TrendingUp, FileText } from 'lucide-react';

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
          ผลลัพธ์การจำลอง
        </h2>
        <p className="text-gray-600">กรุณากรอกข้อมูลและกดปุ่ม Simulate เพื่อดูผลลัพธ์</p>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-green-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-green-600" />
        ผลลัพธ์การจำลอง
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Progress Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            เป้าหมาย
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">จำนวนคำทั้งหมด:</span>
              <span className="font-mono font-bold text-green-700 text-lg">
                {results.total_words.toLocaleString()}
              </span>
            </div>
            {results.pct_of_goal !== undefined && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-gray-700 font-medium">ความคืบหน้า:</span>
                <span className="font-mono font-bold text-green-700 text-lg">
                  {results.pct_of_goal.toFixed(1)}%
                </span>
              </div>
            )}
            {results.days_remaining !== undefined && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-gray-700 font-medium">จำนวนวันที่ต้องใช้: </span>
                <span className="font-mono font-bold text-green-700 text-lg">
                  {results.days_remaining}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Layout Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold mb-4 text-purple-800 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            ตัวอักษร
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">ตัวอักษรต่อหน้า:</span>
              <span className="font-mono font-bold text-purple-700 text-lg">
                {results.layout.CharsPerPage.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">บรรทัดต่อหน้า:</span>
              <span className="font-mono font-bold text-purple-700 text-lg">
                {results.layout.LinesPerPage}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">คำต่อหน้า:</span>
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
            จำลองลักษณะหนังสือ
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">น้ำหนัก:</span>
              <span className="font-mono font-bold text-blue-700 text-lg">
                {results.physics.TotalWeightG.toFixed(0)} g
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700 font-medium">ความหนา:</span>
              <span className="font-mono font-bold text-blue-700 text-lg">
                {results.physics.ThicknessMm.toFixed(1)} mm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

