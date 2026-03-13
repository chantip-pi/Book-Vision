import { useState } from 'react'
import SimulationForm from './components/SimulationForm'
import ResultsDisplay from './components/ResultsDisplay'
import { SimulateRequest, SimulationResponse } from './types'
import { simulateBook } from './services/calculations'
import { Book } from 'lucide-react'
import { Card } from  './components/ui/card'

function App() {
  const [results, setResults] = useState<SimulationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSimulate = (request: SimulateRequest) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = simulateBook({
        trimSize: request.trim_size,
        fontKey: request.font_key,
        fontSizePt: request.font_size_pt,
        lineSpacing: request.line_spacing,
        paperGSM: request.paper_gsm,
        pageGoal: request.page_goal,
        currentCharCount: request.current_char_count,
        dailyCharTarget: request.daily_char_target,
      })
      
      setResults(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Book className="w-10 h-10 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Book Vision
            </h1>
          </div>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Simulate your book's physical properties and track your writing progress
          </p>
        </header>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Column */}
          <Card className='bg-white rounded-xl shadow-xl p-8 border-l-8 border-purple-500'>
            <SimulationForm onSubmit={handleSimulate} loading={loading} />
          </Card>
          
          {/* Results Column */}
          <Card className='bg-white rounded-xl shadow-xl p-8 border-l-8 border-purple-500'>
            <ResultsDisplay results={results} loading={loading} />
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-purple-100">
          <p className="text-sm">
            Plan your perfect book with precise calculations and beautiful visualizations
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

