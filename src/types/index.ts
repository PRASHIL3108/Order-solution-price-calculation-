export enum Category {
  WALTZ = 'waltz',
  GLASS = 'glass',
  ACCESSORY = 'accessory'
}

export enum ChargeBy {
  SQFT = 'sqft',
  DIMENSION = 'dimension'
}

export enum GlassSolutionDrawing {
  STANDARD = 'STANDARD',
  CUSTOM = 'CUSTOM'
}

export interface Accessory {
  accVariantPrice: number;
  quantity: number;
}

export interface GlassSize {
  width: number;
  height: number;
  quantity: number;
  drawing: GlassSolutionDrawing;
}

export interface FormData {
  category: Category;
  orientation: string;
  doorCost: number;
  fixedpartitionCost: number;
  width: number;
  height: number;
  chargeBy: ChargeBy;
  squareFeet: number;
  minProfileSqFeetCost: number;
  profileCost: number;
  actionName: boolean; // LOCATION_DESCOPE checkbox
  lockPrice: number;
  handlePrice: number;
  doorCloserCost: number;
  doorSealCost: number;
  factor: number;
  glassVariantPrice1: number;
  glOnePercent: number;
  mattePrice1: number;
  glassVariantPrice2: number;
  glTwoPercent: number;
  mattePrice2: number;
  outerVariantPrice: number;
  outerGlassMattePrice: number;
  designPatternCost: number;
  accessories: Accessory[];
  secFactor: number;
  
  // Glass-specific fields
  glassFactor: number;
  customFactor: number;
  glassFinishPrice1: number;
  matte1: boolean;
  glassSizes: GlassSize[];
}

export interface CalculationResult {
  finalSolutionPrice: number;
  totalSquareFeet?: number;
  breakdown: {
    hardwarePrice: number;
    profilePrice: number;
    lockPrice: number;
    handlePrice: number;
    doorCloserPrice: number;
    dropSealPrice: number;
    glassVariantPrice1: number;
    glassVariantPrice2: number;
    mattePrice1: number;
    mattePrice2: number;
    outerGlassVariantPrice: number;
    outerGlassMattePrice: number;
    designPrice: number;
    accessoriesPrice: number;
    totalBeforeFactor: number;
    factor: number;
    secFactor: number;
    
    // Glass-specific breakdown
    glassFinishPrice1?: number;
    totalGlassPrice?: number;
    glassFactor?: number;
  };
}