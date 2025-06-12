import { FormData, CalculationResult, ChargeBy, Category, GlassSolutionDrawing } from '../types';

const SUBFRAME_SUBTRACK_BASE_RATE = 29500;

export function calculatePrice(formData: FormData): CalculationResult {
  // Early return for LOCATION_DESCOPE
  if (formData.actionName) {
    return {
      finalSolutionPrice: SUBFRAME_SUBTRACK_BASE_RATE,
      breakdown: {
        hardwarePrice: 0,
        profilePrice: 0,
        lockPrice: 0,
        handlePrice: 0,
        doorCloserPrice: 0,
        doorSealPrice: 0,
        glassVariantPrice1: 0,
        glassVariantPrice2: 0,
        mattePrice1: 0,
        mattePrice2: 0,
        outerGlassVariantPrice: 0,
        outerGlassMattePrice: 0,
        designPrice: 0,
        accessoriesPrice: 0,
        totalBeforeFactor: SUBFRAME_SUBTRACK_BASE_RATE,
        factor: 1,
        secFactor: 1,
      }
    };
  }

  // Route to glass calculation if category is glass
  if (formData.category === Category.GLASS) {
    return calculateGlassOrder(formData);
  }

  // Original calculation logic for other categories
  return calculateStandardOrder(formData);
}

function calculateGlassOrder(formData: FormData): CalculationResult {
  let totalGlassPrice = 0;
  let mattePrice = 0;
  let glassVariantPrice = 0;
  let glassFinishPrice = 0;
  let totalPrice = 0;
  let finalPrice = 0;
  let solutionPrice = 0;
  let totalSqft = 0;

  const minSqftPrice = formData.minProfileSqFeetCost;
  const glassFactor = formData.glassFactor || 1;
  const secondaryFactorPrice = formData.secFactor || 1;

  // Calculate glass variant or finish price
  if (formData.glassVariantPrice1 > 0) {
    glassVariantPrice = formData.glassVariantPrice1;
    mattePrice = formData.mattePrice1;
  } else if (formData.glassFinishPrice1 > 0) {
    glassFinishPrice = formData.glassFinishPrice1;
    mattePrice = formData.mattePrice1;
  }

  const glassPrice = glassVariantPrice + glassFinishPrice;

  // Calculate total square feet from glass sizes
  if (formData.glassSizes && formData.glassSizes.length > 0) {
    for (const element of formData.glassSizes) {
      const customFactorMultiplier = element.drawing === GlassSolutionDrawing.CUSTOM
        ? 1 + (formData.customFactor / 100)
        : 1;

      const areaSquareMillimeters = element.height * element.width;
      const squareFeet = 0.00001076391042 * areaSquareMillimeters;
      const chargeableSqft = Math.max(minSqftPrice, squareFeet);

      totalSqft += Number((chargeableSqft * element.quantity * customFactorMultiplier).toFixed(2));
    }
  } else {
    // Fallback to single size calculation
    const areaSquareMillimeters = formData.width * formData.height;
    const squareFeet = formData.chargeBy === ChargeBy.SQFT
      ? formData.squareFeet
      : 0.00001076391042 * areaSquareMillimeters;
    totalSqft = Math.max(minSqftPrice, squareFeet);
  }

  // Calculate final glass price
  totalPrice = formData.matte1 ? glassPrice + mattePrice : glassPrice;
  finalPrice = totalPrice * glassFactor;
  totalGlassPrice = finalPrice * secondaryFactorPrice;

  solutionPrice = totalSqft * Math.round(totalGlassPrice);
  const finalSolutionPrice = Math.round(solutionPrice);

  return {
    finalSolutionPrice,
    totalSquareFeet: totalSqft,
    breakdown: {
      hardwarePrice: 0,
      profilePrice: 0,
      lockPrice: 0,
      handlePrice: 0,
      doorCloserPrice: 0,
      doorSealPrice: 0,
      glassVariantPrice1: glassVariantPrice,
      glassVariantPrice2: 0,
      mattePrice1: formData.matte1 ? mattePrice : 0,
      mattePrice2: 0,
      outerGlassVariantPrice: 0,
      outerGlassMattePrice: 0,
      designPrice: 0,
      accessoriesPrice: 0,
      totalBeforeFactor: totalPrice,
      factor: glassFactor,
      secFactor: secondaryFactorPrice,
      glassFinishPrice1: glassFinishPrice,
      totalGlassPrice,
      glassFactor,
    }
  };
}

function calculateStandardOrder(formData: FormData): CalculationResult {
  // Initialize all price variables
  let hardwarePrice = 0;
  let profilePrice = 0;
  let lockPrice = 0;
  let handlePrice = 0;
  let doorCloserPrice = 0;
  let doorSealPrice = 0;
  let glassVariantPrice1 = 0;
  let glassVariantPrice2 = 0;
  let mattePrice1 = 0;
  let mattePrice2 = 0;
  let outerGlassVariantPrice = 0;
  let outerGlassMattePrice = 0;
  let designPrice = 0;
  let accessoriesPrice = 0;

  // Count D and F in orientation
  const DCount = (formData.orientation.match(/D/g) || []).length;
  const FCount = (formData.orientation.match(/F/g) || []).length;

  // Calculate hardware costs
  const DCost = DCount * formData.doorCost;
  const FCost = FCount * formData.fixedpartitionCost;
  hardwarePrice = DCost + FCost;

  console.log('hardwarePrice', hardwarePrice);

  // Calculate square feet
  const areaSquareMillimeters = formData.width * formData.height;

  console.log('areaSquareMillimeters', areaSquareMillimeters);

  const squareFeet = formData.chargeBy === ChargeBy.SQFT
    ? formData.squareFeet
    : 0.00001076391042 * areaSquareMillimeters;

  console.log('squareFeet', squareFeet);

  // Calculate profile price
  const minSqft = Math.max(formData.minProfileSqFeetCost, squareFeet);

  console.log('minSqft', minSqft);

  profilePrice = formData.profileCost * minSqft;

  console.log('profilePrice', profilePrice);

  // Calculate individual prices
  lockPrice = formData.lockPrice;
  console.log('lockPrice', lockPrice);
  handlePrice = formData.handlePrice * DCount;
  console.log('handlePrice', handlePrice);
  doorCloserPrice = formData.doorCloserCost * DCount;
  console.log('doorCloserPrice', doorCloserPrice);
  doorSealPrice = formData.doorSealCost * DCount;
  console.log('doorSealPrice', doorSealPrice);

  // Calculate glass variant prices
  if (formData.glOnePercent > 0) {
    glassVariantPrice1 = formData.glassVariantPrice1 * squareFeet * (formData.glOnePercent / 100);
    mattePrice1 = formData.mattePrice1 * squareFeet * (formData.glOnePercent / 100);
    console.log('glassVariantPrice1', glassVariantPrice1);
    console.log('mattePrice1', mattePrice1);
  } else {
    glassVariantPrice1 = formData.glassVariantPrice1 * squareFeet;
    mattePrice1 = formData.mattePrice1 * squareFeet;

    console.log('glassVariantPrice1', glassVariantPrice1);
    console.log('mattePrice1', mattePrice1);

  }

  if (formData.glTwoPercent > 0) {
    glassVariantPrice2 = formData.glassVariantPrice2 * squareFeet * (formData.glTwoPercent / 100);
    mattePrice2 = formData.mattePrice2 * squareFeet * (formData.glTwoPercent / 100);
    console.log('glassVariantPrice2', glassVariantPrice2);
    console.log('mattePrice2', mattePrice2);
  } else {
    glassVariantPrice2 = formData.glassVariantPrice2 * squareFeet;
    mattePrice2 = formData.mattePrice2 * squareFeet;
    console.log('glassVariantPrice2', glassVariantPrice2);
    console.log('mattePrice2', mattePrice2);
  }

  // Calculate outer glass prices
  outerGlassVariantPrice = formData.outerVariantPrice * squareFeet;
  outerGlassMattePrice = formData.outerGlassMattePrice * squareFeet;

  console.log('outerGlassVariantPrice', outerGlassVariantPrice);
  console.log('outerGlassMattePrice', outerGlassMattePrice);

  // Calculate design price
  designPrice = formData.designPatternCost * squareFeet;

  console.log('designPrice', designPrice);

  // Calculate accessories price
  if (formData.accessories && formData.accessories.length > 0) {
    accessoriesPrice = formData.accessories.reduce((total, accessory) => {
      return total + (accessory.accVariantPrice * accessory.quantity);
    }, 0);
    console.log('accessoriesPrice', accessoriesPrice);
  }


  // Calculate total before factors
  const totalBeforeFactor = profilePrice + hardwarePrice + glassVariantPrice1 + mattePrice1 +
    glassVariantPrice2 + mattePrice2 + outerGlassVariantPrice + outerGlassMattePrice +
    designPrice + handlePrice + lockPrice + doorCloserPrice + doorSealPrice + accessoriesPrice;

  console.log('totalBeforeFactor', totalBeforeFactor);

  // Apply factors
  const finalAmount = totalBeforeFactor * formData.factor * formData.secFactor;
  const finalSolutionPrice = Math.floor(finalAmount);

  console.log('finalSolutionPrice', finalSolutionPrice);

  return {
    finalSolutionPrice,
    breakdown: {
      hardwarePrice,
      profilePrice,
      lockPrice,
      handlePrice,
      doorCloserPrice,
      doorSealPrice,
      glassVariantPrice1,
      glassVariantPrice2,
      mattePrice1,
      mattePrice2,
      outerGlassVariantPrice,
      outerGlassMattePrice,
      designPrice,
      accessoriesPrice,
      totalBeforeFactor,
      factor: formData.factor,
      secFactor: formData.secFactor,
    }
  };
}