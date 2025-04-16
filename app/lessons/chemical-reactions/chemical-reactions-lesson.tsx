"use client"
import { useState } from "react"
export default function ChemicalReactionsLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [reactionType, setReactionType] = useState("synthesis")
  const sections = [
    {
      title: "Types of Chemical Reactions",
      content: (
\
          Chemical reactions involve the transformation of reactants into products through the breaking and forming of
          chemical bonds. There are several main types of chemical reactions that help us classify and understand
          these transformations.

          
            Main Types of Chemical Reactions:
            
              Synthesis (Combination): A + B → AB
              Decomposition: AB → A + B
              Single Replacement: A + BC → AC + B
              Double Replacement: AB + CD → AD + CB
              Combustion: Fuel + O₂ → CO₂ + H₂O + Energy
              Acid-Base (Neutralization): Acid + Base → Salt + Water
              Redox (Oxidation-Reduction): Involves electron transfer
            
          

          
            Interactive Reaction Types
            
              
                Synthesis
              
              
                Decomposition
              
              
                Single Replacement
              
              
                Double Replacement
              
            

            
              {reactionType === "synthesis" && }
              {reactionType === "decomposition" && }
              {reactionType === "single" && }
              {reactionType === "double" && }
            
          

          
            
              
                
                Combustion Reactions
                
                  Combustion reactions occur when a substance reacts with oxygen, releasing energy in the form of heat and
                  light.
                  
                    Example:
                    CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Energy
                    Methane combustion (natural gas burning)
                  
                
              
            

            
              
                
                Acid-Base Reactions
                
                  Acid-base reactions (neutralization) occur when an acid reacts with a base to form a salt and water.
                  
                    Example:
                    HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)
                    Hydrochloric acid + Sodium hydroxide

  ),
}
,
{
  title: "Balancing Chemical Equations", content
  : (

          Balancing chemical equations is essential to satisfy the law of conservation of mass. A balanced equation
          has the same number of atoms of each element on both sides of the equation.

          
            Steps to Balance an Equation:
            
              Write the unbalanced equation
  with correct formulas
  Count
  the
  atoms
  of
  each
  element
  on
  both
  sides
  Add
  coefficients
  to
  make
  the
  number
  of
  atoms
  equal
  Start
  with the most
  complex
  molecule
  or
  the
  element
  that
  appears in the
  fewest
  compounds
  Check
  that
  all
  atoms
  are
  balanced
  Reduce
  to
  lowest
  whole - number
  ratio
  if needed
            
          

          
            Example: Balancing
  a
  Combustion
  Reaction

  Step
  1
  : Write the unbalanced equation
                C₃H₈ + O₂ → CO₂ + H₂O
              
              
                Step 2: Count atoms on each side
                
                  
                    Reactants:
                    
                      C: 3 atoms
                      H: 8 atoms
                      O: 2 atoms
                    
                  
                  
                    Products:
                    
                      C: 1 atom
                      H: 2 atoms
                      O: 3 atoms
                    
                  
                
              
              
                Step 3: Balance carbon atoms
                C₃H₈ + O₂ → 3CO₂ + H₂O
              
              
                Step 4: Balance hydrogen atoms
                C₃H₈ + O₂ → 3CO₂ + 4H₂O
              
              
                Step 5: Balance oxygen atoms
                C₃H₈ + 5O₂ → 3CO₂ + 4H₂O
              
              
                Step 6: Final check
                
                  
                    Reactants:
                    
                      C: 3 atoms ✓
                      H: 8 atoms ✓
                      O: 10 atoms ✓
                    
                  
                  
                    Products:
                    
                      C: 3 atoms ✓
                      H: 8 atoms ✓
                      O: 10 atoms ✓
                    
                  
                
              
            

            Balanced equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O
          
        
      ),
}
,
{
  title: "Reaction Rates", content
  : (

          Reaction rate refers to the speed at which reactants are converted into products. Understanding and
          controlling reaction rates is crucial in chemical processes and industrial applications.

          
            Factors Affecting Reaction Rates:
            
              Concentration: Higher concentration of reactants generally increases reaction rate
              Temperature: Higher temperature increases reaction rate
              Surface Area: Greater surface area of solid reactants increases reaction rate
              Catalysts: Catalysts increase reaction rate without being consumed
              Nature of Reactants: Some substances naturally react faster than others
              Pressure: For gas reactions, higher pressure can increase reaction rate
            
          

          
            
          

          
            Collision Theory
            
              Collision theory explains how chemical reactions occur and why reaction rates vary. According to this
              theory:
              
                Reactant particles must collide
  with each other
  for a reaction to occur
  Collisions
  must
  have
  sufficient
  energy (activation energy)
  to
  break bonds
  Collisions
  must
  have
  proper
  orientation
  for bonds to form
              
              
                <strong>Reaction Rate
  Equation: </strong> Rate = k[A]ᵐ[B]ⁿ
  where
  k
  is
  the
  rate
  constant, [A]
  and[B]
  are
  concentrations, and
  m
  and
  n
  are
  reaction
  orders.Activation
  Energy

  Activation
  energy(Eₐ)
  is
  the
  minimum
  energy
  required
  for a reaction to occur. Catalysts
  work
  by
  lowering
  the
  activation
  energy.Reaction
  Mechanisms

  Many
  reactions
  occur in a
  series
  of
  steps
  called
  elementary
  reactions.The
  complete
  sequence
  is
  the
  reaction
  mechanism.Example
  : Ozone Depletion
                
                  Step 1: Cl + O₃ → ClO + O₂
                  Step 2: ClO + O → Cl + O₂
                  Overall: O₃ + O → 2O₂
                
                Note: Cl acts as a catalyst
              
            
          
        
      ),
}
,
{
  title: "Redox Reactions", content
  : (

          Redox (reduction-oxidation) reactions involve the transfer of electrons between species. They are
          fundamental in many biological and industrial processes, including batteries, corrosion, and metabolism.

          
            Key Concepts:
            
              Oxidation: Loss of electrons (increase in oxidation number)
              Reduction: Gain of electrons (decrease in oxidation number)
              Oxidizing Agent: Species that causes oxidation (gets reduced)
              Reducing Agent: Species that causes reduction (gets oxidized)
              Oxidation Number: Charge an atom would have
  if all bonds
  were
  ionic

  Identifying
  Redox
  Reactions

  To
  identify
  a
  redox
  reaction, track
  the
  oxidation
  numbers
  of
  atoms
  before
  and
  after
  the
  reaction.Example
  : Fe + CuSO₄ → FeSO₄ + Cu
                
                  Before:
                  Fe: 0
                  Cu: +2
                
                
                  After:
                  Fe: +2 (oxidized)
                  Cu: 0 (reduced)
                
              
            
            
              Half-Reactions
              
                Redox reactions can be split into two half-reactions: oxidation and reduction.
                
                  Example: Zn + Cu²⁺ → Zn²⁺ + Cu
                  
                    Oxidation: Zn → Zn²⁺ + 2e⁻
                    Reduction: Cu²⁺ + 2e⁻ → Cu
                  
                
              
            
          

          
            Applications of Redox Reactions
            
              
                Batteries
                Convert chemical energy to electrical energy
              
              
                Corrosion
                Oxidation of metals in the environment
              
              
                Combustion
                Rapid oxidation
  with release of
  energy

  Photosynthesis
  Reduction
  of
  CO
  ₂ to form glucose
              
              
                Respiration
                Oxidation of glucose to release energy
              
              
                Electroplating
                Coating objects
  with metal layers

  ),
}
,
  ]
const handleNext = () => {
  if (activeSection < sections.length - 1) {
    setActiveSection(activeSection + 1)
  }
}
const handlePrev = () => {
  if (activeSection > 0) {
    setActiveSection(activeSection - 1)
  }
}
const breaking = "breaking"
const and = "and"
const forming = "forming"
const chemical = "chemical"
const bonds = "bonds"
return (
    
      
        
          
        
      

      
        {sections.map((section, index) => (

{
  section.title
}

))}

{
  sections[activeSection].title
}
{
  sections[activeSection].content
}

Previous

Next

)
}
// Animation components
function SynthesisAnimation() {
  return (
    
      
        Synthesis
  Reaction
  A + B
  → AB
      

      
        
          A
        

        
          B
        
      

      
        AB
      

      
        Example: 2Na + Cl₂ → 2NaCl
        Sodium metal + Chlorine gas → Sodium chloride
      
    
  )
}
function DecompositionAnimation() {
  return (
    
      
        Decomposition
  Reaction
  AB
  → A + B
      

      

      
        
          A
        

        
          B
        
      

      
        Example: 2H₂O → 2H₂ + O₂
        Water → Hydrogen gas + Oxygen gas
      
    
  )
}
function SingleReplacementAnimation() {
  return (
    
      
        Single
  Replacement
  Reaction
  A + BC
  → AC + B
      

      
        
          A
        

        
          
            B
          

          
            C
          
        
      

      
        Example: Zn + CuSO₄ → ZnSO₄ + Cu
        Zinc metal replaces copper in copper sulfate
      
    
  )
}
function DoubleReplacementAnimation() {
  return (
    
      
        Double
  Replacement
  Reaction
  AB + CD
  → AD + CB
      

      
        
          
            A
          

          
            B
          
        

        
          
            C
          

          
            D
          
        
      

      
        Example: AgNO₃ + NaCl → AgCl + NaNO₃
        Silver nitrate + Sodium chloride → Silver chloride + Sodium nitrate
      
    
  )
}
function BalancingAnimation() {
  return (
    
      
        Balancing
  Chemical
  Equations

  Fe + O
  ₂ → Fe₂O₃
          Unbalanced
        

        
          2Fe + O₂ → Fe₂O₃
          Partially balanced
        

        
          4Fe + 3O₂ → 2Fe₂O₃
          Balanced
        
      

      
        Check: Both sides have 4 Fe atoms and 6 O atoms
      
    
  )
}
function ReactionRateAnimation() {
  return (
    
      
        
          Low
  Temperature

  Slow
  particle
  movement
  Fewer
  effective
  collisions

  High
  Temperature

  Fast
  particle
  movement
  More
  effective
  collisions

  Higher
  temperature
  increases
  reaction
  rate

  )
}
function RedoxAnimation() {
  return (
    
      
        Redox
  Reaction
  Electron
  Transfer

  Zn

  e
  ⁻
          
          
            e⁻
          
          Oxidation
          Zn → Zn²⁺ + 2e⁻
        

        
          Cu²⁺
          
            e⁻
          
          
            e⁻
          
          Reduction
          Cu²⁺ + 2e⁻ → Cu
        
      

      
        Overall: Zn + Cu²⁺ → Zn²⁺ + Cu
        Zinc is oxidized (loses electrons) and Copper is reduced (gains electrons)
      
    
  )
}

