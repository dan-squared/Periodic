import pTableDataRaw from '../pTable.json'

export type ElementGroup =
  | "alkali-metal"
  | "alkaline-earth-metal"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "diatomic-nonmetal"
  | "polyatomic-nonmetal"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown"

export const elementGroups: ElementGroup[] = [
  "alkali-metal",
  "alkaline-earth-metal",
  "transition-metal",
  "post-transition-metal",
  "metalloid",
  "diatomic-nonmetal",
  "polyatomic-nonmetal",
  "noble-gas",
  "lanthanide",
  "actinide",
  "unknown"
]

export interface Element {
  atomicNumber: number
  symbol: string
  name: string
  atomicMass: number
  category: ElementGroup
  group: number | null
  period: number
  block: string
  electronConfiguration: string
  electronConfigurationSemantic: string
  electronegativity: number | null
  oxidationStates: string | null
  density: number | null
  densityLiquid: number | null
  meltingPoint: number | null
  boilingPoint: number | null
  yearDiscovered: number | null
  discoverer: string | null
  discoveryLocation: string | null
  description: string
  appearance: string
  phase: string
  // Atomic
  valenceElectrons: number | null
  electronsPerShell: number[]
  energyLevels: string
  electronAffinity: number | null
  ionizationEnergies: number[]
  quantumNumbers: string
  // Radii
  radiusCalculated: number | null
  radiusEmpirical: number | null
  radiusCovalent: number | null
  radiusVanDerWaals: number | null
  // Isotope
  isotopesKnown: string
  isotopesStable: string
  isotopicAbundances: string
  halfLife: string
  lifetime: string
  // Thermal
  heatSpecific: number | null
  heatVaporization: number | null
  heatFusion: number | null
  heatMolar: number | null
  thermalConductivity: number | null
  thermalExpansion: number | null
  adiabaticIndex: string
  // Electromagnetic
  electricalConductivity: number | null
  electricalType: string
  resistivity: number | null
  magneticType: string
  magneticSusceptibilityMass: number | null
  magneticSusceptibilityMolar: number | null
  magneticSusceptibilityVolume: number | null
  superconductingPoint: number | null
  refractiveIndex: number | null
  // Mechanical
  modulusBulk: number | null
  modulusShear: number | null
  modulusYoung: number | null
  poissonRatio: number | null
  hardnessMohs: number | null
  hardnessVickers: number | null
  hardnessBrinell: number | null
  speedOfSound: number | null
  // Crystal
  crystalStructure: string
  latticeAngles: string
  latticeConstants: string
  spaceGroupName: string
  spaceGroupNumber: number | null
  // Other
  molarVolume: number | null
  allotropes: string
  gasPhase: string
  cpkHex: string
  criticalPressure: number | null
  criticalTemperature: number | null
  neutronCrossSection: number | null
  neutronMassAbsorption: number | null
  abundanceUniverse: number | null
  abundanceSolar: number | null
  abundanceMeteor: number | null
  abundanceCrust: number | null
  abundanceOcean: number | null
  abundanceHuman: number | null
  // Classifications
  casNumber: string
  cidNumber: string
  series: string
  source: string
}

function mapCategory(series: string, group: number | null): ElementGroup {
  if (!series) return "unknown"
  const s = series.toLowerCase()
  if (s.includes("alkali metal")) return "alkali-metal"
  if (s.includes("alkaline earth metal")) return "alkaline-earth-metal"
  if (s.includes("transition metal")) return "transition-metal"
  if (s.includes("post-transition metal")) return "post-transition-metal"
  if (s.includes("metalloid")) return "metalloid"
  if (s.includes("diatomic nonmetal")) return "diatomic-nonmetal"
  if (s.includes("polyatomic nonmetal")) return "polyatomic-nonmetal"
  if (s.includes("noble gas")) return "noble-gas"
  if (s.includes("lanthanide")) return "lanthanide"
  if (s.includes("actinide")) return "actinide"
  return "unknown"
}

const pTableData: any[] = pTableDataRaw as any[]

function n(v: any): number | null {
  return typeof v === 'number' ? v : null
}

export const elements: Element[] = pTableData.filter((e: any) => e.atomic_number <= 118).map((e: any) => ({
  atomicNumber: e.atomic_number,
  symbol: e.symbol,
  name: e.name,
  atomicMass: typeof e.atomic_mass === 'number' ? e.atomic_mass : parseFloat(e.atomic_mass) || 0,
  category: mapCategory(e.series, e.group || null),
  group: (e.series && (e.series.toLowerCase().includes('lanthanide') || e.series.toLowerCase().includes('actinide'))) ? null : (e.group || null),
  period: e.period,
  block: e.block ? e.block.replace('-block', '') : '',
  electronConfiguration: e.electron_configuration || '',
  electronConfigurationSemantic: e.electron_configuration_semantic || '',
  electronegativity: n(e.electronegativity_pauling),
  oxidationStates: e.oxidation_states || null,
  density: e.density?.stp != null ? e.density.stp : null,
  densityLiquid: e.density?.liquid != null ? e.density.liquid : null,
  meltingPoint: n(e.melting_point),
  boilingPoint: n(e.boiling_point),
  yearDiscovered: e.discovered?.year != null ? e.discovered.year : null,
  discoverer: e.discovered?.by || null,
  discoveryLocation: e.discovered?.location || null,
  description: e.summary ? e.summary.replace(/<[^>]*>?/gm, '') : '',
  appearance: e.appearance || '',
  phase: e.phase || '',
  valenceElectrons: n(e.valence_electrons),
  electronsPerShell: e.electrons_per_shell || [],
  energyLevels: e.energy_levels || '',
  electronAffinity: n(e.electron_affinity),
  ionizationEnergies: e.ionization_energies || [],
  quantumNumbers: e.quantum_numbers || '',
  radiusCalculated: e.radius?.calculated != null ? e.radius.calculated : null,
  radiusEmpirical: e.radius?.empirical != null ? e.radius.empirical : null,
  radiusCovalent: e.radius?.covalent != null ? e.radius.covalent : null,
  radiusVanDerWaals: e.radius?.vanderwaals != null ? e.radius.vanderwaals : null,
  isotopesKnown: e.isotopes_known || '',
  isotopesStable: e.isotopes_stable || '',
  isotopicAbundances: e.isotopic_abundances || '',
  halfLife: e.half_life || '',
  lifetime: e.lifetime || '',
  heatSpecific: e.heat?.specific != null ? e.heat.specific : null,
  heatVaporization: e.heat?.vaporization != null ? e.heat.vaporization : null,
  heatFusion: e.heat?.fusion != null ? e.heat.fusion : null,
  heatMolar: e.heat?.molar != null ? e.heat.molar : null,
  thermalConductivity: e.conductivity?.thermal != null ? e.conductivity.thermal : null,
  thermalExpansion: n(e.thermal_expansion),
  adiabaticIndex: e.adiabatic_index || '',
  electricalConductivity: e.conductivity?.electric != null ? e.conductivity.electric : null,
  electricalType: e.electrical_type || '',
  resistivity: n(e.resistivity),
  magneticType: e.magnetic_type || '',
  magneticSusceptibilityMass: e.magnetic_susceptibility?.mass != null ? e.magnetic_susceptibility.mass : null,
  magneticSusceptibilityMolar: e.magnetic_susceptibility?.molar != null ? e.magnetic_susceptibility.molar : null,
  magneticSusceptibilityVolume: e.magnetic_susceptibility?.volume != null ? e.magnetic_susceptibility.volume : null,
  superconductingPoint: n(e.superconducting_point),
  refractiveIndex: n(e.refractive_index),
  modulusBulk: e.modulus?.bulk != null ? e.modulus.bulk : null,
  modulusShear: e.modulus?.shear != null ? e.modulus.shear : null,
  modulusYoung: e.modulus?.young != null ? e.modulus.young : null,
  poissonRatio: n(e.poisson_ratio),
  hardnessMohs: e.hardness?.mohs != null ? e.hardness.mohs : null,
  hardnessVickers: e.hardness?.vickers != null ? e.hardness.vickers : null,
  hardnessBrinell: e.hardness?.brinell != null ? e.hardness.brinell : null,
  speedOfSound: n(e.speed_of_sound),
  crystalStructure: e.crystal_structure || '',
  latticeAngles: e.lattice_angles || '',
  latticeConstants: e.lattice_constants || '',
  spaceGroupName: e.space_group_name || '',
  spaceGroupNumber: n(e.space_group_number),
  molarVolume: n(e.molar_volume),
  allotropes: e.allotropes || '',
  gasPhase: e.gas_phase || '',
  cpkHex: e.cpk_hex || '',
  criticalPressure: n(e.critical_pressure),
  criticalTemperature: n(e.critical_temperature),
  neutronCrossSection: n(e.neutron_cross_section),
  neutronMassAbsorption: n(e.neutron_mass_absorption),
  abundanceUniverse: e.abundance?.universe != null ? e.abundance.universe : null,
  abundanceSolar: e.abundance?.solar != null ? e.abundance.solar : null,
  abundanceMeteor: e.abundance?.meteor != null ? e.abundance.meteor : null,
  abundanceCrust: e.abundance?.crust != null ? e.abundance.crust : null,
  abundanceOcean: e.abundance?.ocean != null ? e.abundance.ocean : null,
  abundanceHuman: e.abundance?.human != null ? e.abundance.human : null,
  casNumber: e.classifications?.cas_number || '',
  cidNumber: e.classifications?.cid_number || '',
  series: e.series || '',
  source: e.source || ''
}))
