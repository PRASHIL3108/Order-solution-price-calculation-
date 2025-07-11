export enum Category {
  WALTZ = 'waltz',
  GLASS = 'glass',
  ACCESSORY_ONLY = 'accessory_only',
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
    doorSealPrice: number;
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

    // SqFt breakdown
    calculatedSquareFeet?: number;
    minSquareFeet?: number;
    chargeableSquareFeet?: number;

    // Category for result display
    category?: Category;
    // Quantity for Accessory Only
    quantity?: number;
  };
}

export interface AccessoryOnlyDetail {
  glassVariantId1?: string;
  glassFinishId1?: string;
  quantity: number;
}

export interface PV_VariantsEntity {
  variantId: string;
  price: string;
}

export interface PV_FinishesEntity {
  finishId: string;
  price: string;
}

export interface PV_HandlesEntity {
  handleId: string;
  price: number;
}

export interface PV_GeneralSettingsEntity {
  accessoryOnlyFactor: string;
  secondaryFactors?: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
}

export interface PricingVersionModelSchemaEntity {
  variants: PV_VariantsEntity[];
  finishes: PV_FinishesEntity[];
  handles: PV_HandlesEntity[];
  generalSettings: PV_GeneralSettingsEntity;
}

export interface AccessoryOnlyFormData {
  accessoryFactor: number;
  glassPrice: number;
  secondaryFactor: string;
  quantity: number;
}