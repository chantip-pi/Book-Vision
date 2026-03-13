export interface SimulateRequest {
  trim_size: string;
  font_key: string;
  font_size_pt: number;
  line_spacing: number;
  paper_gsm: number;
  page_goal?: number;
  current_char_count?: number;
  daily_char_target?: number;
}

export interface PageLayout {
  CharsPerPage: number;
  LinesPerPage: number;
  WordsPerPage: number;
}

export interface BookPhysics {
  SpineWidthMm: number;
  TotalWeightG: number;
  ThicknessMm: number;
}

export interface SimulationResponse {
  layout: PageLayout;
  physics: BookPhysics;
  pct_of_goal?: number;
  days_remaining?: number;
  total_words: number;
}
