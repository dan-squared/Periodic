"use client"

import { useState } from "react"
import { Zap } from "lucide-react"

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "octet-rule", title: "Octet Rule" },
  { id: "ion-formation", title: "Ion Formation" },
  { id: "ionic-bond-formation", title: "Ionic Bond Formation" },
  { id: "properties", title: "Properties" },
]

const IonicBondingLesson = () => {
  const [activeSection, setActiveSection] = useState(0)

  return (
    <div className="container relative py-8">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">Ionic Bonding</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {activeSection + 1} of {sections.length}
          </div>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>

        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeSection === index ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setActiveSection(index)}
                disabled={index > activeSection + 1}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="mt-8">
        {activeSection === 0 && (
          <section id="introduction">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Introduction to Ionic Bonding
            </h2>
            <p>
              Ionic bonding is a type of chemical bond formed through the electrostatic attraction between oppositely
              charged ions. These ions are created when one atom transfers electrons to another.
            </p>
          </section>
        )}

        {activeSection === 1 && (
          <section id="octet-rule">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              The Octet Rule
            </h2>
            <p>
              The octet rule states that atoms tend to gain, lose, or share electrons in order to achieve a full outer
              electron shell with eight electrons, similar to the noble gases.
            </p>
          </section>
        )}

        {activeSection === 2 && (
          <section id="ion-formation">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Ion Formation
            </h2>
            <p>
              Ions are formed when atoms gain or lose electrons. Atoms that lose electrons become positively charged
              ions (cations), while atoms that gain electrons become negatively charged ions (anions).
            </p>
          </section>
        )}

        {activeSection === 3 && (
          <section id="ionic-bond-formation">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Ionic Bond Formation
            </h2>
            <p>
              Ionic bonds are formed when there is a transfer of electrons from one atom to another, resulting in the
              formation of oppositely charged ions that are attracted to each other.
            </p>
          </section>
        )}

        {activeSection === 4 && (
          <section id="properties">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Properties of Ionic Compounds
            </h2>
            <p>
              Ionic compounds typically have high melting and boiling points, are hard and brittle, and conduct
              electricity when dissolved in water or melted.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default IonicBondingLesson

