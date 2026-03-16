import { 
  TrimSizes, 
  FontRegistry,
  TrimConfig, 
  FontMeta, 
  PT_TO_MM, 
  MARGIN_TOP_MM, 
  MARGIN_BOTTOM_MM, 
  MARGIN_OUTSIDE_MM, 
  MARGIN_INSIDE_MM, 
  THAI_COMBINING_REDUCTION, 
  PUNCTUATION_FACTOR, 
  DEFAULT_TRACKING,
  calcThickness 
} from '../constants';

export interface PageLayout {
  charsPerLine: number;
  linesPerPage: number;
  charsPerPage: number;
  usableWidthMM: number;
  usableHeightMM: number;
  lineHeightMM: number;
  charWidthMM: number;
  wordsPerPage: number;
}

export interface BookPhysics {
  spineWidthMm: number;
  totalWeightG: number;
  thicknessMm: number;
  pageCount: number;
}

export const calcPageLayout = (
  trim: TrimConfig,
  font: FontMeta,
  fontSizePt: number,
  lineSpacing: number,
): PageLayout => {
  // correct pt → mm
  const fontSizeMM = fontSizePt * PT_TO_MM;

  // base glyph width
  const baseCharWidth = fontSizeMM * font.avgCharWidthRatio;

  // apply typography corrections
  const charWidthMM = baseCharWidth *
    THAI_COMBINING_REDUCTION *
    PUNCTUATION_FACTOR *
    (1 + DEFAULT_TRACKING);

  const lineHeightMM = fontSizeMM * lineSpacing;

  const usableWidthMM = trim.widthMM - MARGIN_INSIDE_MM - MARGIN_OUTSIDE_MM;
  const usableHeightMM = trim.heightMM - MARGIN_TOP_MM - MARGIN_BOTTOM_MM;

  const charsPerLine = Math.floor(usableWidthMM / charWidthMM);
  const linesPerPage = Math.floor(usableHeightMM / lineHeightMM);

  return {
    charsPerLine,
    linesPerPage,
    charsPerPage: charsPerLine * linesPerPage,
    usableWidthMM,
    usableHeightMM,
    lineHeightMM: Math.round(lineHeightMM * 100) / 100,
    charWidthMM: Math.round(charWidthMM * 100) / 100,
    wordsPerPage: Math.floor((charsPerLine * linesPerPage) / 5), // Assuming 5 chars per word
  };
};

export const calcFromPages = (
  trim: TrimConfig,
  gsm: number,
  pageCount: number,
): BookPhysics => {
  const thicknessMM = calcThickness(gsm);
  const spineMM = (pageCount / 2) * thicknessMM;
  const areaMM2 = (trim.widthMM / 1000) * (trim.heightMM / 1000);
  const weightG = pageCount * (gsm / 2) * areaMM2;

  return {
    spineWidthMm: Math.round(spineMM * 100) / 100,
    totalWeightG: Math.round(weightG * 10) / 10,
    thicknessMm: Math.round(spineMM * 100) / 100,
    pageCount,
  };
};

export const simulateBook = (params: {
  trimSize: string;
  fontKey: string;
  fontSizePt: number;
  lineSpacing: number;
  paperGSM: number;
  pageGoal?: number;
  currentCharCount?: number;
  dailyCharTarget?: number;
}) => {
  const { trimSize, fontKey, fontSizePt, lineSpacing, paperGSM, pageGoal, currentCharCount, dailyCharTarget } = params;
  
  // Get trim and font from constants
  const trim = TrimSizes[trimSize];
  const font = FontRegistry[fontKey];

  if (!trim) {
    throw new Error(`Invalid trim_size: ${trimSize}`);
  }

  if (!font) {
    throw new Error(`Unknown font_key: ${fontKey}`);
  }

  if (!pageGoal && !currentCharCount) {
    throw new Error('Provide either page_goal or current_char_count');
  }

  // calculate page layout from physical properties
  const layout = calcPageLayout(trim, font, fontSizePt, lineSpacing);

  // resolve page count — current progress path or goal path
  let pageCount = pageGoal || 0;
  if (currentCharCount && currentCharCount > 0) {
    pageCount = Math.ceil(currentCharCount / layout.charsPerPage);
  }

  // calculate physical book properties
  const physics = calcFromPages(trim, paperGSM, pageCount);

  // calculate progress if both values are present
  let pctOfGoal: number | undefined;
  let daysRemaining: number | undefined;

  if (pageGoal && currentCharCount && currentCharCount > 0) {
    pctOfGoal = Math.round((pageCount / pageGoal) * 1000) / 10;

    if (dailyCharTarget && dailyCharTarget > 0) {
      const charsLeft = (pageGoal - pageCount) * layout.charsPerPage;
      if (charsLeft > 0) {
        daysRemaining = Math.ceil(charsLeft / dailyCharTarget);
      }
    }
  } else if (pageGoal && dailyCharTarget && dailyCharTarget > 0) {
    // goal path — no current progress, just days to finish from zero
    const charsNeeded = pageGoal * layout.charsPerPage;
    daysRemaining = Math.ceil(charsNeeded / dailyCharTarget);
  }

  // Calculate total word count based on goal or current progress
  const pageCountForWords = pageGoal || pageCount;
  const totalWords = Math.floor((pageCountForWords * layout.charsPerPage) / 5);

  const result = {
    layout: {
      CharsPerPage: layout.charsPerPage,
      LinesPerPage: layout.linesPerPage,
      WordsPerPage: layout.wordsPerPage,
    },
    physics: {
      SpineWidthMm: physics.spineWidthMm,
      TotalWeightG: physics.totalWeightG,
      ThicknessMm: physics.thicknessMm,
    },
    pct_of_goal: pctOfGoal,
    days_remaining: daysRemaining,
    total_words: totalWords,
  };

  console.log('Simulation result:', result);
  return result;
};
