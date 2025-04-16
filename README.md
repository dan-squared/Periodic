
 # Interactive Periodic Table Application

An educational web application featuring an interactive periodic table and comprehensive chemistry lessons built with Next.js, React, and TypeScript.

![Interactive Periodic Table](https://github.com/dan-squared/Periodic/blob/7ff54f1c8d0f4333883f9178cfd1c8497f45d9bb/PT.png)

## Features

### Interactive Periodic Table
![Periodic Table Interface](https://github.com/dan-squared/Periodic/blob/cf09a96c7480db539fb49013a008cc78e4c3baf9/Properties.png)
- **Complete Element Data**: All 118 elements with detailed properties including atomic number, symbol, name, mass, electron configuration, and more
- **Interactive Element Cells**: Click on any element to view comprehensive details
- **Visual Element Categories**: Color-coded element categorization (metals, non-metals, metalloids, etc.)
- **Responsive Design**: Optimized for both desktop and mobile viewing
- **Element Searching**: Find elements through search functionality
- **Element Filtering**: Filter elements by category, state, or properties

### Detailed Element Information
- **Physical Properties**: Melting point, boiling point, density
![Element Details](https://github.com/dan-squared/Periodic/blob/2dde2fa0629470479ed5a44d3b9073a39e9d5499/Temprature.png)
- **Atomic Properties**: Electron configuration, atomic radius, ionization energy
- **Historical Information**: Discovery, naming, and historical significance
- **Visual Representations**: Atom structure visualizations
![Atom Visualization](https://i.imgur.com/LiIMjnt)
- **Real-world Applications**: Common uses and applications

### Chemistry Lessons
![Chemistry Lessons](https://github.com/dan-squared/Periodic/blob/e2f4b3eeb0bb7f87f64956e4f6a1ce0263583d15/Lessons.png)
#### Organic Chemistry Lesson
- **Interactive Functional Groups**: Visual exploration of different functional groups
- **Molecular Structure Visualization**: 2D representations of chemical structures
- **IUPAC Nomenclature Guide**: Systematic naming system explanations
- **Isomerism Exploration**: Interactive visualization of different isomer types
- **Self-assessment Quizzes**: Test knowledge with interactive quizzes

#### Chemical Bonding Lesson
- **Animated Bond Visualizations**: Dynamic animations for different bond types
- **Interactive Molecular Simulations**: Manipulate atoms to see bonding effects
- **Comprehensive Content**: Covers ionic, covalent, metallic bonds, and intermolecular forces
- **Canvas-based Animations**: Custom HTML5 Canvas animations for:
  - Electron transfer in ionic bonds
  - Electron sharing in covalent bonds
  - Sea of electrons in metallic bonds
  - London dispersion forces
  - Dipole-dipole interactions
  - Hydrogen bonding
- **Interactive Controls**: Adjust parameters to see effects on bonding


## Technical Stack

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **UI Components**: Custom Shadcn UI components
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for component transitions
- **Canvas Animations**: Custom HTML5 Canvas for molecular visualizations
- **State Management**: React hooks for local state management

## Installation and Setup

### Prerequisites
- Node.js 18+ 
- npm

### Installation Steps

1. Clone the repository:

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`



## Project Structure

```
/
├── app/                  # Next.js app directory
│   ├── lessons/          # Chemistry lesson pages
│   └── page.tsx          # Home page with periodic table
├── components/           # React components
│   ├── element-cell.tsx  # Individual element cell component
│   ├── element-details.tsx # Element details modal
│   ├── periodic-table.tsx # Main periodic table component
│   ├── lessons/          # Lesson-specific components
│   └── ui/               # UI components (buttons, cards, etc.)
├── lib/                  # Utility functions and data
│   └── element-data.ts   # Element data and types
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


