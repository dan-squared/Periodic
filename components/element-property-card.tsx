"use client"

import type React from "react"
import { motion } from "framer-motion"
import { getBlockColor, getCategoryColor } from "@/lib/utils"
import type { Element, ElementGroup } from "@/lib/element-data"
import {
  Atom,
  Layers,
  Info,
  Radio,
  Thermometer,
  Zap,
  Gem,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

const AtomicStructureVisualization = dynamic(() => import("@/components/atomic-structure-visualization"), { 
  ssr: false,
  loading: () => <div className="w-full h-[320px] flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Loading Model...</div>
})

interface ElementPropertyCardProps {
  element: Element
  onClose?: () => void
}

/* ─── Primitives ─── */

function PropRow({ label, value, unit, mono, bold }: { label: string; value: any; unit?: string; mono?: boolean; bold?: boolean }) {
  if (value === null || value === undefined || value === '') return null
  const display = typeof value === 'number'
    ? (Math.abs(value) < 0.001 && value !== 0 ? value.toExponential(3) : value)
    : value
  return (
    <motion.div 
      className="flex items-baseline justify-between gap-4 py-2 border-b border-black/10 last:border-0 hover:bg-black/[0.02] px-2 -mx-2 rounded-sm transition-colors cursor-default"
    >
      <span className="text-[12px] font-semibold text-neutral-500 shrink-0">{label}</span>
      <span className={`text-[12px] text-right ${bold ? 'font-extrabold text-black' : 'font-bold text-neutral-800'} ${mono ? 'font-mono' : ''}`}>
        {display}{unit ? <span className="text-neutral-400 font-medium ml-1">{unit}</span> : ''}
      </span>
    </motion.div>
  )
}

function Section({ title, children, delay = 0, color }: { title: string; children: React.ReactNode; delay?: number; color?: string }) {
  return (
    <motion.div
      className="rounded-[6px] border-[2px] border-black bg-white overflow-hidden"
      style={{ boxShadow: '-4px 4px 0 0 #000' }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      <div className="px-4 py-2 border-b-[2px] border-black" style={{ backgroundColor: color || '#f5f5f5' }}>
        <h3 className="text-[11px] font-extrabold text-black uppercase tracking-[0.12em]">{title}</h3>
      </div>
      <div className="px-4 py-2">{children}</div>
    </motion.div>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <motion.div 
      className="rounded-[4px] border-[2px] border-black bg-white px-3 py-3 text-center cursor-default"
      style={{ boxShadow: '-3px 3px 0 0 #000' }}
    >
      <p className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-[0.12em] mb-1">{label}</p>
      <p className="text-base font-extrabold text-black leading-none">{value}</p>
    </motion.div>
  )
}

function BarProp({ label, value, displayValue, max }: { label: string; value: number; displayValue: string; max: number }) {
  const pct = Math.min((Math.abs(value) / max) * 100, 100)
  return (
    <motion.div className="py-2.5 border-b border-black/10 last:border-0 hover:bg-black/[0.02] px-2 -mx-2 rounded-sm transition-colors">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <span className="text-[12px] font-semibold text-neutral-500">{label}</span>
        <span className="text-[12px] font-bold text-black">{displayValue}</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-100 border border-black/20 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-black border-r border-black/20"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

function Chip({ children, highlight }: { children: React.ReactNode, highlight?: boolean }) {
  return (
    <motion.span 
      whileHover={{ y: -1 }}
      className={`inline-block px-2.5 py-1 rounded-[4px] border-[2px] border-black text-[11px] font-bold cursor-default ${
        highlight ? 'bg-[#ff6b6b] text-white' : 'bg-neutral-50 text-neutral-700'
      }`}
      style={{ boxShadow: '-1px 1px 0 0 #000' }}
    >
      {children}
    </motion.span>
  )
}

/* ─── Main ─── */
export default function ElementPropertyCard({ element, onClose }: ElementPropertyCardProps) {
  const blockColor = getBlockColor(element.block)
  const categoryColor = getCategoryColor(element.category as ElementGroup)
  const neutrons = Math.round(element.atomicMass) - element.atomicNumber

  const fmtTemp = (k: number | null) => {
    if (k === null) return null
    return `${k} K (${(k - 273.15).toFixed(1)} °C)`
  }

  return (
    <div className="bg-[#f5f5f5] rounded-[8px] border-[2px] border-black p-4 sm:p-6 max-w-5xl w-full mx-auto relative" style={{ boxShadow: '-6px 6px 0 0 #000' }}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full bg-white border-[2px] border-black flex items-center justify-center transition-all shadow-[-4px_4px_0_0_#000] hover:shadow-[0_0_0_0_#000] hover:-translate-x-[4px] hover:translate-y-[4px]"
        >
          <X size={20} strokeWidth={3} />
        </button>
      )}

      {/* ═══ HEADER ═══ */}
      <div className="flex items-start gap-4 mb-6 pr-12 sm:pr-14">
        {/* Element cell — neo-brutalist interaction */}
        <motion.div
          whileHover={{ rotate: -2, scale: 1.05 }}
          className="w-[85px] h-[93px] relative bg-white border-[2px] border-black rounded-[4px] flex flex-col items-center justify-center shrink-0 select-none cursor-default transition-all"
          style={{ boxShadow: '-4px 4px 0 0 #000' }}
        >
          <div className="absolute top-0.5 left-1 text-[11px] font-bold text-black font-roboto-slab">{element.atomicNumber}</div>
          <div className="absolute top-0 right-0 w-[24%] h-[24%] border-l-[2px] border-b-[2px] border-black rounded-bl-[4px] rounded-tr-[2px]" style={{ backgroundColor: blockColor }} />
          <div className="text-3xl font-bold leading-none mt-1.5 text-black font-roboto-slab">{element.symbol}</div>
          <div className="text-[8px] font-bold tracking-tight uppercase mt-1 leading-none text-center text-black">{element.name}</div>
          <div className="text-[7px] font-semibold mt-0.5 leading-none text-black/60">{element.atomicMass.toFixed(3)}</div>
        </motion.div>

        {/* Name + tags */}
        <div className="min-w-0 pt-0.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none text-black uppercase mb-1">{element.name}</h1>
          <p className="text-[13px] font-bold text-neutral-500 capitalize">
            {element.series || element.category.replace(/-/g, " ")}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="px-2 py-0.5 rounded-[4px] border-[2px] border-black text-[10px] font-extrabold bg-white text-black" style={{ boxShadow: '-1px 1px 0 0 #000' }}>#{element.atomicNumber}</span>
            {element.phase && <span className="px-2 py-0.5 rounded-[4px] border-[2px] border-black text-[10px] font-extrabold bg-white text-black" style={{ boxShadow: '-1px 1px 0 0 #000' }}>{element.phase}</span>}
            {element.block && (
              <span className="px-2 py-0.5 rounded-[4px] border-[2px] border-black text-[10px] font-extrabold text-white" style={{ backgroundColor: blockColor, boxShadow: '-1px 1px 0 0 #000' }}>
                {element.block}-block
              </span>
            )}
            {element.halfLife === 'Stable' && <span className="px-2 py-0.5 rounded-[4px] border-[2px] border-black text-[10px] font-extrabold bg-[#6bff9e] text-black" style={{ boxShadow: '-1px 1px 0 0 #000' }}>Stable</span>}
            {element.halfLife && element.halfLife !== 'Stable' && <span className="px-2 py-0.5 rounded-[4px] border-[2px] border-black text-[10px] font-extrabold bg-[#ffd56b] text-black" style={{ boxShadow: '-1px 1px 0 0 #000' }}>Radioactive</span>}
          </div>
        </div>
      </div>

      {/* ═══ TABS ═══ */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-5 bg-white p-1.5 rounded-[6px] border-[2px] border-black" style={{ boxShadow: '-3px 3px 0 0 #000' }}>
          {[
            { v: "overview",        icon: <Info size={14} />,        label: "Overview" },
            { v: "atomic",          icon: <Atom size={14} />,        label: "Atomic" },
            { v: "physical",        icon: <Layers size={14} />,      label: "Physical" },
            { v: "thermal",         icon: <Thermometer size={14} />, label: "Thermal" },
            { v: "electromagnetic", icon: <Zap size={14} />,         label: "EM" },
            { v: "nuclear",         icon: <Radio size={14} />,       label: "Nuclear" },
            { v: "crystal",         icon: <Gem size={14} />,         label: "Crystal" },
          ].map(t => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="rounded-[4px] text-[11px] gap-1.5 px-3 py-1.5 font-extrabold uppercase tracking-wide text-neutral-400 data-[state=active]:text-black data-[state=active]:bg-[#f5f5f5] data-[state=active]:border-black data-[state=active]:border-[2px] border-[2px] border-transparent transition-all"
            >
              {t.icon}<span className="hidden sm:inline">{t.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ═══ OVERVIEW ═══ */}
        <TabsContent value="overview" className="space-y-4">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCell label="Atomic Mass" value={`${element.atomicMass.toPrecision(6)} u`} />
            <StatCell label="Density" value={element.density != null ? `${element.density}` : '—'} />
            <StatCell label="Group / Period" value={`${element.group ?? '—'} / ${element.period}`} />
            <StatCell label="Valence e⁻" value={element.valenceElectrons != null ? String(element.valenceElectrons) : '—'} />
          </motion.div>

          {element.appearance && (
            <Section title="Appearance" delay={0.03} color={`${categoryColor}40`}>
              <p className="text-[13px] font-medium text-neutral-800 capitalize py-2 leading-relaxed">{element.appearance}</p>
            </Section>
          )}

          <Section title="Discovery" delay={0.06} color={`${categoryColor}40`}>
            <PropRow label="Year" value={element.yearDiscovered ?? 'Ancient'} bold />
            <PropRow label="By" value={element.discoverer ?? 'Unknown'} />
            <PropRow label="Location" value={element.discoveryLocation} />
          </Section>

          <Section title="Natural Abundance" delay={0.09} color={`${categoryColor}40`}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4">
              <PropRow label="Universe" value={element.abundanceUniverse != null ? `${element.abundanceUniverse}%` : null} />
              <PropRow label="Solar" value={element.abundanceSolar != null ? `${element.abundanceSolar}%` : null} />
              <PropRow label="Crust" value={element.abundanceCrust != null ? `${element.abundanceCrust}%` : null} />
              <PropRow label="Ocean" value={element.abundanceOcean != null ? `${element.abundanceOcean}%` : null} />
              <PropRow label="Human Body" value={element.abundanceHuman != null ? `${element.abundanceHuman}%` : null} />
              <PropRow label="Meteorites" value={element.abundanceMeteor != null ? `${element.abundanceMeteor}%` : null} />
            </div>
          </Section>

          <Section title="Identifiers" delay={0.12} color={`${categoryColor}40`}>
            <PropRow label="CAS Number" value={element.casNumber} mono />
            <PropRow label="CID Number" value={element.cidNumber} mono />
          </Section>
        </TabsContent>

        {/* ═══ ATOMIC ═══ */}
        <TabsContent value="atomic" className="space-y-4">
          <Section title="Subatomic Particles" color="#c5ff6b40">
            <div className="flex justify-center py-4 relative min-h-[340px]">
              <AtomicStructureVisualization 
                protons={element.atomicNumber} 
                neutrons={neutrons} 
                electrons={element.atomicNumber} 
                electronConfig={element.electronsPerShell}
                color={blockColor} 
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-1">
              <StatCell label="Protons" value={String(element.atomicNumber)} />
              <StatCell label="Neutrons" value={String(neutrons)} />
              <StatCell label="Electrons" value={String(element.atomicNumber)} />
            </div>
          </Section>

          <Section title="Electron Configuration" delay={0.04} color="#c5ff6b40">
            <PropRow label="Full" value={element.electronConfiguration} mono bold />
            <PropRow label="Semantic" value={element.electronConfigurationSemantic} mono />
            <PropRow label="Shells" value={element.electronsPerShell?.join(' · ')} mono />
            <PropRow label="Energy Levels" value={element.energyLevels} />
            <PropRow label="Valence e⁻" value={element.valenceElectrons} bold />
            <PropRow label="Quantum Numbers" value={element.quantumNumbers} mono />
          </Section>

          <Section title="Atomic Radii" delay={0.08} color="#c5ff6b40">
            <div className="grid grid-cols-2 gap-x-4">
              <PropRow label="Calculated" value={element.radiusCalculated} unit="pm" />
              <PropRow label="Empirical" value={element.radiusEmpirical} unit="pm" />
              <PropRow label="Covalent" value={element.radiusCovalent} unit="pm" />
              <PropRow label="Van der Waals" value={element.radiusVanDerWaals} unit="pm" />
            </div>
          </Section>

          <Section title="Reactivity" delay={0.12} color="#c5ff6b40">
            {element.electronegativity != null && (
              <BarProp label="Electronegativity (Pauling)" value={element.electronegativity} displayValue={String(element.electronegativity)} max={4} />
            )}
            <PropRow label="Electron Affinity" value={element.electronAffinity} unit="kJ/mol" />
            <PropRow label="Oxidation States" value={element.oxidationStates} bold />
          </Section>

          {element.ionizationEnergies.length > 0 && (
            <Section title="Ionization Energies (kJ/mol)" delay={0.16} color="#c5ff6b40">
              <div className="flex flex-wrap gap-2 py-2">
                {element.ionizationEnergies.map((ie, i) => (
                  <Chip key={i}>{ie}</Chip>
                ))}
              </div>
            </Section>
          )}
        </TabsContent>

        {/* ═══ PHYSICAL ═══ */}
        <TabsContent value="physical" className="space-y-4">
          <Section title="State & Density" color="#6bff9e40">
            <div className="grid grid-cols-2 gap-x-4">
              <PropRow label="Phase (STP)" value={element.phase} bold />
              <PropRow label="Molar Volume" value={element.molarVolume} unit="m³/mol" />
              <PropRow label="Density (STP)" value={element.density} unit="kg/m³" />
              <PropRow label="Density (Liquid)" value={element.densityLiquid} unit="kg/m³" />
            </div>
          </Section>

          <Section title="Phase Transitions" delay={0.04} color="#6bff9e40">
            <PropRow label="Melting Point" value={fmtTemp(element.meltingPoint)} bold />
            <PropRow label="Boiling Point" value={fmtTemp(element.boilingPoint)} bold />
            <PropRow label="Critical Temp." value={element.criticalTemperature} unit="K" />
            <PropRow label="Critical Pressure" value={element.criticalPressure} unit="MPa" />
          </Section>

          <Section title="Mechanical" delay={0.08} color="#6bff9e40">
            <div className="grid grid-cols-2 gap-x-4">
              <PropRow label="Speed of Sound" value={element.speedOfSound} unit="m/s" />
              <PropRow label="Poisson Ratio" value={element.poissonRatio} />
              <PropRow label="Bulk Modulus" value={element.modulusBulk} unit="GPa" />
              <PropRow label="Shear Modulus" value={element.modulusShear} unit="GPa" />
              <PropRow label="Young's Modulus" value={element.modulusYoung} unit="GPa" />
            </div>
          </Section>

          {(element.hardnessMohs != null || element.hardnessVickers != null || element.hardnessBrinell != null) && (
            <Section title="Hardness" delay={0.12} color="#6bff9e40">
              <div className="grid grid-cols-3 gap-3">
                {element.hardnessMohs != null && <StatCell label="Mohs" value={String(element.hardnessMohs)} />}
                {element.hardnessVickers != null && <StatCell label="Vickers" value={`${element.hardnessVickers}`} />}
                {element.hardnessBrinell != null && <StatCell label="Brinell" value={`${element.hardnessBrinell}`} />}
              </div>
            </Section>
          )}

          {element.allotropes && (
            <Section title="Allotropes" delay={0.16} color="#6bff9e40">
              <p className="text-[13px] font-medium text-neutral-800 py-2 leading-relaxed">{element.allotropes}</p>
            </Section>
          )}
        </TabsContent>

        {/* ═══ THERMAL ═══ */}
        <TabsContent value="thermal" className="space-y-4">
          <Section title="Heat Capacities & Enthalpy" color="#ffa06b40">
            <div className="grid grid-cols-2 gap-x-4">
              <PropRow label="Specific Heat" value={element.heatSpecific} unit="J/(kg·K)" />
              <PropRow label="Molar Heat" value={element.heatMolar} unit="J/(mol·K)" />
              <PropRow label="Heat of Fusion" value={element.heatFusion} unit="kJ/mol" bold />
              <PropRow label="Heat of Vaporization" value={element.heatVaporization} unit="kJ/mol" bold />
            </div>
          </Section>

          <Section title="Thermal Transport" delay={0.04} color="#ffa06b40">
            {element.thermalConductivity != null && (
              <BarProp label="Thermal Conductivity" value={element.thermalConductivity} displayValue={`${element.thermalConductivity} W/(m·K)`} max={430} />
            )}
            <PropRow label="Thermal Expansion" value={element.thermalExpansion} unit="1/K" />
            <PropRow label="Adiabatic Index" value={element.adiabaticIndex} />
          </Section>

          <Section title="Critical & Superconducting" delay={0.08} color="#ffa06b40">
            <PropRow label="Critical Temperature" value={element.criticalTemperature} unit="K" />
            <PropRow label="Critical Pressure" value={element.criticalPressure} unit="MPa" />
            <PropRow label="Superconducting Point" value={element.superconductingPoint} unit="K" bold />
          </Section>
        </TabsContent>

        {/* ═══ ELECTROMAGNETIC ═══ */}
        <TabsContent value="electromagnetic" className="space-y-4">
          <Section title="Electrical" color="#c56bff40">
            <PropRow label="Type" value={element.electricalType} bold />
            {element.electricalConductivity != null && (
              <BarProp label="Conductivity" value={element.electricalConductivity} displayValue={`${element.electricalConductivity} MS/m`} max={63} />
            )}
            <PropRow label="Resistivity" value={element.resistivity} unit="Ω·m" />
          </Section>

          <Section title="Magnetic" delay={0.04} color="#c56bff40">
            <PropRow label="Type" value={element.magneticType} bold />
            <PropRow label="Mass Susceptibility" value={element.magneticSusceptibilityMass} unit="m³/kg" />
            <PropRow label="Molar Susceptibility" value={element.magneticSusceptibilityMolar} unit="m³/mol" />
            <PropRow label="Volume Susceptibility" value={element.magneticSusceptibilityVolume} />
          </Section>

          <Section title="Optical" delay={0.08} color="#c56bff40">
            <PropRow label="Refractive Index" value={element.refractiveIndex} />
            {element.cpkHex && (
              <motion.div whileHover={{ scale: 1.01 }} className="flex items-center justify-between py-3 px-2 mt-2 border-[2px] border-black rounded-[4px] bg-white cursor-default" style={{ boxShadow: '-2px 2px 0 0 #000' }}>
                <span className="text-[12px] font-extrabold text-black uppercase tracking-wider">CPK Color</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-[2px] border-[2px] border-black" style={{ backgroundColor: `#${element.cpkHex}` }} />
                  <span className="text-[13px] font-mono font-bold text-black">#{element.cpkHex}</span>
                </div>
              </motion.div>
            )}
          </Section>
        </TabsContent>

        {/* ═══ NUCLEAR ═══ */}
        <TabsContent value="nuclear" className="space-y-4">
          <Section title="Stability" color="#ff6bdb40">
            <div className="grid grid-cols-3 gap-3">
              <StatCell label="Half-Life" value={element.halfLife || '—'} />
              <StatCell label="Lifetime" value={element.lifetime || '—'} />
              <StatCell label="Gas Phase" value={element.gasPhase || '—'} />
            </div>
          </Section>

          <Section title="Isotopes" delay={0.04} color="#ff6bdb40">
            {element.isotopesStable && (
              <div className="pb-4 mb-4 border-b-[2px] border-black/10">
                <p className="text-[10px] font-extrabold text-black uppercase tracking-[0.12em] mb-2">Stable Isotopes</p>
                <div className="flex flex-wrap gap-2">
                  {element.isotopesStable.split(',').map((iso, i) => (
                    <motion.span whileHover={{ y: -1 }} key={i} className="px-2.5 py-1 rounded-[4px] bg-[#6bff9e] border-[2px] border-black text-[11px] font-bold text-black" style={{ boxShadow: '-1px 1px 0 0 #000' }}>
                      {iso.trim()}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {element.isotopesKnown && (
              <div className="pb-4 mb-4 border-b-[2px] border-black/10">
                <p className="text-[10px] font-extrabold text-black uppercase tracking-[0.12em] mb-2">All Known</p>
                <div className="flex flex-wrap gap-1.5">
                  {element.isotopesKnown.split(',').map((iso, i) => (
                    <Chip key={i}>{iso.trim()}</Chip>
                  ))}
                </div>
              </div>
            )}

            {element.isotopicAbundances && (
              <div>
                <p className="text-[10px] font-extrabold text-black uppercase tracking-[0.12em] mb-2">Natural Abundances</p>
                <div className="flex flex-wrap gap-2">
                  {element.isotopicAbundances.split(',').map((ab, i) => (
                    <motion.div whileHover={{ y: -1 }} key={i} className="px-3 py-1.5 rounded-[4px] bg-white border-[2px] border-black" style={{ boxShadow: '-1px 1px 0 0 #000' }}>
                      <span className="text-[12px] font-mono font-bold text-black">{ab.trim()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section title="Neutron Properties" delay={0.08} color="#ff6bdb40">
            <PropRow label="Cross Section" value={element.neutronCrossSection} unit="σ" />
            <PropRow label="Mass Absorption" value={element.neutronMassAbsorption} />
          </Section>
        </TabsContent>

        {/* ═══ CRYSTAL ═══ */}
        <TabsContent value="crystal" className="space-y-4">
          <Section title="Crystal Structure" color="#6bffff40">
            {element.crystalStructure && (
              <motion.div whileHover={{ x: -2, y: 2, boxShadow: '-1px 1px 0 0 #000' }} className="flex items-center gap-3 py-3 px-3 mb-2 rounded-[4px] border-[2px] border-black bg-white transition-all" style={{ boxShadow: '-3px 3px 0 0 #000' }}>
                <div className="w-10 h-10 rounded-[2px] border-[2px] border-black flex items-center justify-center bg-[#f5f5f5]">
                  <Gem size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-black">{element.crystalStructure}</p>
                  <p className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-wider">Crystal System</p>
                </div>
              </motion.div>
            )}
            <PropRow label="Space Group" value={element.spaceGroupName} bold />
            <PropRow label="Space Group #" value={element.spaceGroupNumber} />
          </Section>

          <Section title="Lattice Parameters" delay={0.04} color="#6bffff40">
            <PropRow label="Constants" value={element.latticeConstants} unit="pm" />
            <PropRow label="Angles" value={element.latticeAngles} />
          </Section>
        </TabsContent>

      </Tabs>
    </div>
  )
}
