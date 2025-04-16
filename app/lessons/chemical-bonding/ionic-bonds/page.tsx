import { Atom, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function IonicBondsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/lessons/chemical-bonding">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} />
            <span>Back to Chemical Bonding</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Atom size={24} />
        </div>
        <h1 className="text-3xl font-bold">Ionic Bonds</h1>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          Ionic bonds form when electrons are transferred from one atom to another, creating positively and negatively
          charged ions that attract each other.
        </p>

        <h2>Formation of Ionic Bonds</h2>
        <p>
          Ionic bonds typically form between metals and nonmetals. Metals have few valence electrons and tend to lose
          them, while nonmetals have many valence electrons and tend to gain them.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg my-6">
          <h3>Example: Sodium Chloride (NaCl)</h3>
          <p>
            Sodium (Na) is a metal with one valence electron. It tends to lose this electron to achieve a stable
            electron configuration like neon.
          </p>
          <p>
            Chlorine (Cl) is a nonmetal with seven valence electrons. It tends to gain one electron to achieve a stable
            electron configuration like argon.
          </p>
          <p>
            When sodium and chlorine react, sodium loses an electron to become Na⁺, and chlorine gains that electron to
            become Cl⁻. The oppositely charged ions attract each other, forming an ionic bond.
          </p>
        </div>

        <h2>Properties of Ionic Compounds</h2>
        <ul>
          <li>
            <strong>High melting and boiling points</strong> - The strong electrostatic forces between ions require a
            lot of energy to break.
          </li>
          <li>
            <strong>Crystalline structure</strong> - Ions arrange in a regular, repeating pattern.
          </li>
          <li>
            <strong>Brittle</strong> - When force is applied, like ions can align and repel each other, causing the
            crystal to shatter.
          </li>
          <li>
            <strong>Conduct electricity when dissolved or melted</strong> - Free ions can carry charge.
          </li>
          <li>
            <strong>Soluble in water</strong> - Water molecules can surround and separate the ions.
          </li>
        </ul>

        <h2>Examples of Ionic Compounds</h2>
        <table className="w-full border-collapse my-6">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Compound</th>
              <th className="border p-2 text-left">Formula</th>
              <th className="border p-2 text-left">Cation</th>
              <th className="border p-2 text-left">Anion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Sodium Chloride (Table Salt)</td>
              <td className="border p-2">NaCl</td>
              <td className="border p-2">Na⁺</td>
              <td className="border p-2">Cl⁻</td>
            </tr>
            <tr>
              <td className="border p-2">Calcium Fluoride</td>
              <td className="border p-2">CaF₂</td>
              <td className="border p-2">Ca²⁺</td>
              <td className="border p-2">F⁻</td>
            </tr>
            <tr>
              <td className="border p-2">Magnesium Oxide</td>
              <td className="border p-2">MgO</td>
              <td className="border p-2">Mg²⁺</td>
              <td className="border p-2">O²⁻</td>
            </tr>
            <tr>
              <td className="border p-2">Potassium Bromide</td>
              <td className="border p-2">KBr</td>
              <td className="border p-2">K⁺</td>
              <td className="border p-2">Br⁻</td>
            </tr>
          </tbody>
        </table>

        <h2>Ionic Bond Strength</h2>
        <p>The strength of an ionic bond depends on several factors:</p>
        <ul>
          <li>
            <strong>Charge of the ions</strong> - Higher charges create stronger bonds (e.g., Mg²⁺ and O²⁻ form stronger
            bonds than Na⁺ and Cl⁻).
          </li>
          <li>
            <strong>Size of the ions</strong> - Smaller ions create stronger bonds because the charges are closer
            together.
          </li>
          <li>
            <strong>Lattice energy</strong> - The energy released when gaseous ions form a solid crystal. Higher lattice
            energy indicates stronger bonds.
          </li>
        </ul>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg my-6 border-l-4 border-yellow-500">
          <h3 className="text-yellow-800 dark:text-yellow-300">Important Concept: Electronegativity</h3>
          <p>
            Electronegativity is a measure of an atom's ability to attract electrons. The greater the difference in
            electronegativity between two atoms, the more ionic the bond between them.
          </p>
          <p>When the electronegativity difference is greater than 1.7, the bond is considered predominantly ionic.</p>
        </div>
      </div>
    </div>
  )
}

