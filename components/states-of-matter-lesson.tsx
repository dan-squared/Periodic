const StatesOfMatterLesson = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">States of Matter</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">
          Matter exists in different states, primarily solid, liquid, and gas. Each state has unique properties and
          characteristics.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Solid</h2>
        <p className="mb-4">
          Solids have a fixed shape and volume. Their particles are tightly packed and vibrate in fixed positions.
        </p>
        <div className="relative w-48 h-48 border rounded-lg bg-gray-100">
          {/* Solid state visualization */}
          <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1">
            {Array(25)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary animate-pulse"
                  style={{
                    animationDuration: "3s",
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Liquid</h2>
        <p className="mb-4">
          Liquids have a fixed volume but take the shape of their container. Their particles are close together but can
          move around.
        </p>
        <div className="relative w-48 h-48 border rounded-lg bg-gray-100 overflow-hidden">
          {/* Liquid state visualization */}
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full w-3 h-3 bg-primary"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  animation: `float ${2 + Math.random() * 3}s infinite ease-in-out`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Gas</h2>
        <p className="mb-4">
          Gases have no fixed shape or volume and can be easily compressed. Their particles are far apart and move
          randomly.
        </p>
        <div className="relative w-48 h-48 border rounded-lg bg-gray-100 overflow-hidden">
          {/* Gas state visualization */}
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full w-2 h-2 bg-primary"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 90 + 5}%`,
                  animation: `bounce ${0.8 + Math.random() * 1.2}s infinite linear`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Phase Changes</h2>
        <p className="mb-4">
          Phase changes occur when matter transitions between states due to changes in temperature or pressure.
        </p>

        <div className="w-full p-6 border rounded-lg bg-card bg-opacity-50 mb-6">
          <h3 className="text-xl font-medium mb-4">Phase Change Diagram</h3>
          <p>Content about phase change diagram goes here.</p>
        </div>
      </section>
    </div>
  )
}

export default StatesOfMatterLesson

