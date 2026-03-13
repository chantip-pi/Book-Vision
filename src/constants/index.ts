export interface TrimConfig {
  name: string;
  widthMM: number;
  heightMM: number;
  thicknessMM: number; // per sheet (2 pages)
  paperWeightG: number; // gsm
}

export interface FontMeta {
  key: string;
  displayName: string;
  avgCharWidthRatio: number; // avg char width ÷ font size
}

export const TrimSizes: Record<string, TrimConfig> = {
  // ISO A series
  "A4": { name: "A4", widthMM: 210, heightMM: 297, thicknessMM: 0.115, paperWeightG: 75 },
  "A5": { name: "A5", widthMM: 148, heightMM: 210, thicknessMM: 0.115, paperWeightG: 75 },
  "A6": { name: "A6 Pocket", widthMM: 105, heightMM: 148, thicknessMM: 0.100, paperWeightG: 80 },

  // ISO B series (very common for books)
  "B5": { name: "B5", widthMM: 176, heightMM: 250, thicknessMM: 0.115, paperWeightG: 75 },
  "B6": { name: "B6 (Light Novel)", widthMM: 125, heightMM: 176, thicknessMM: 0.110, paperWeightG: 75 },

  // Thai publishing common
  "16k": { name: "16k (Thai Book)", widthMM: 185, heightMM: 260, thicknessMM: 0.115, paperWeightG: 75 },
  "14.5x21": { name: "Thai Novel 14.5x21", widthMM: 145, heightMM: 210, thicknessMM: 0.115, paperWeightG: 75 },

  // Pocket book
  "pocket": { name: "Pocket Book", widthMM: 110, heightMM: 178, thicknessMM: 0.105, paperWeightG: 70 },
};

export const FontRegistry: Record<string, FontMeta> = {
  "sarabun": {
    key: "sarabun",
    displayName: "Sarabun",
    avgCharWidthRatio: 0.52,
  },
  "cordia": {
    key: "cordia",
    displayName: "Cordia New",
    avgCharWidthRatio: 0.35,
  },
  "thsarabun": {
    key: "thsarabun",
    displayName: "TH Sarabun New",
    avgCharWidthRatio: 0.50,
  },
  "angsana": {
    key: "angsana",
    displayName: "Angsana New",
    avgCharWidthRatio: 0.47,
  },
  "browallia": {
    key: "browallia",
    displayName: "Browallia New",
    avgCharWidthRatio: 0.49,
  },
  "tahoma": {
    key: "tahoma",
    displayName: "Tahoma",
    avgCharWidthRatio: 0.54,
  },
  "kanit": {
    key: "kanit",
    displayName: "Kanit",
    avgCharWidthRatio: 0.53,
  },
  "prompt": {
    key: "prompt",
    displayName: "Prompt",
    avgCharWidthRatio: 0.51,
  },
  "mitr": {
    key: "mitr",
    displayName: "Mitr",
    avgCharWidthRatio: 0.52,
  },
  "noto_sans_thai": {
    key: "noto_sans_thai",
    displayName: "Noto Sans Thai",
    avgCharWidthRatio: 0.53,
  },
  "noto_serif_thai": {
    key: "noto_serif_thai",
    displayName: "Noto Serif Thai",
    avgCharWidthRatio: 0.55,
  },
};

// Typography constants
export const PT_TO_MM = 0.352778;

export const MARGIN_TOP_MM = 17.5;
export const MARGIN_BOTTOM_MM = 17.5;
export const MARGIN_OUTSIDE_MM = 17.5;
export const MARGIN_INSIDE_MM = 22.5;

// Typography correction factors
export const THAI_COMBINING_REDUCTION = 0.93; // Thai marks reduce avg width
export const PUNCTUATION_FACTOR = 0.97; // punctuation slightly shrinks avg width
export const DEFAULT_TRACKING = 0.02; // ~2% spacing typical for print

// Paper constants
export const UNCOATED_CALIPER_FACTOR = 0.00138; // mm per g/m²

export const calcThickness = (gsm: number): number => {
  return gsm * UNCOATED_CALIPER_FACTOR;
};
